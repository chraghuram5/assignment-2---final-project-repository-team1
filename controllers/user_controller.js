'use strict';
let openDBConnection = require('../config/sqllite3');
const bcrypt = require('bcrypt');
const axios = require('axios');
const config = require('config');
let db;
let init = async function () {
    db = await openDBConnection();
}
init();

//render the sign Up page
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        req.flash('success', 'Signed In');
        return res.status(200).redirect('/users/home');
    }
    return res.status(200).render('sign_up');
}

//render sign-in page
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        req.flash('success', 'Signed In');
        return res.status(200).redirect('/users/home');
    }
    return res.status(200).render('sign_in');
}

module.exports.home = async function (req, res) {
    if (req.isAuthenticated()) {
        let user={};
        let data = [];
        try {
            user.username = res.locals.user.username;
            let sql = "SELECT sourceId FROM user_preferences where username=?";
            let sourceIds = await db.all(sql, [res.locals.user.username]);

            if (sourceIds.length == 0) {
                let response = await axios.get('https://newsapi.org/v2/top-headlines?country=us&pageSize=100&apiKey=' + config.apiKey);
                data = response.data.articles;
                return res.render('home', { data: data });
            }
            else {
                let sources = new Array();
                for (let i = 0; i < sourceIds.length; i++) {
                    let sourcesSql = "SELECT * from sources where sourceId=?";
                    let source = await db.get(sourcesSql, [sourceIds[i].sourceId]);
                    sources.push(source);
                }
                res.locals.user.sources=sources;
                let url='https://newsapi.org/v2/top-headlines?sources=';
                for(let i=0;i<sources.length;i++){
                    if(i==0)
                        url=url+sources[i].source;
                    else
                        url = url+','+sources[i].source;
                }
                let response = await axios.get(url +'&apiKey='+ config.apiKey);
                data = response.data.articles;
                return res.render('home', { data: data, user:user });
            }
        }
        catch (error) {
            console.log(error);
            return res.render('home', { data: "NoData" });
        }
    }
    req.flash('error', 'Please SignIn/SignUp');
    return res.redirect('/users/sign-in');
}

function isValidPassword(req, password, confirm_password) {
    if (password != confirm_password) {
        req.flash('error', 'Passwords do not match');
        return false;
    }
    if (password.length < 6) {
        req.flash('error', 'Password too small');
        return false;
    }
    return true;
}

module.exports.createUser = async function (req, res) {
    try {
        if (!isValidPassword(req, req.body.password, req.body.confirm_password))
            return res.redirect('/users/sign-up');

        let sql = `SELECT username from users where username = ?`;

        let user = await db.get(sql, [req.body.username]);

        if (user != null) {
            req.flash('error', 'User already present');
            return res.status(200).redirect('/users/sign-in');
        }
        else {
            let createUserSql = `INSERT INTO users(username, email, password) VALUES(?,?,?)`;
            const salt = await bcrypt.genSalt(10);
            const encryptedPassword = await bcrypt.hash(req.body.password, salt);
            await db.run(createUserSql, [req.body.username, req.body.email, encryptedPassword]);
            req.flash('success', 'Successfully signed Up');
            let user = {};
            user.username = req.body.username;
            user.email = req.body.email;
            console.log(user);
            req.user = user;
            let sourceSql = `SELECT * FROM sources`;
            let sources = await db.all(sourceSql);
            let data = {};
            data.sources = sources;
            return res.render('preference', { data: data, user: user });
        }
    }
    catch (err) {
        console.log("Error in creating user" + err.message);
    }
}

module.exports.createSession = async function (req, res) {
    try {
        if (req.isAuthenticated()) {
            req.flash('success', 'Logged In');
            return res.redirect('/users/home');
        }
        res.status(200).redirect('/users/sign-up')
    }
    catch (err) {
        console.log('Error logging in user' + err.message);
    }
}

module.exports.update = async function (req, res) {
    if (req.isAuthenticated()) {
        return res.render('update');
    }
    return res.redirect('/users/sign-in')
}

module.exports.chart = async function (req, res) {
    if (req.isAuthenticated()) {
        return res.render('chart');
    }
    return res.redirect('/users/sign-in')
}

module.exports.updateUser = async function (req, res) {
    try {
        if (req.isAuthenticated()) {
            if (!isValidPassword(req, req.body.password, req.body.confirm_password))
                return res.redirect('/users/update');
            let sql = `UPDATE users SET email=?, password=? WHERE username = ?`;
            const salt = await bcrypt.genSalt(10);
            const encryptedPassword = await bcrypt.hash(req.body.password, salt);
            await db.run(sql, [req.body.email, encryptedPassword, req.body.username]);
            res.locals.user.email = req.body.email;
            req.flash('success', 'Details updated');
            res.redirect('/users/home');
        }
        else
            return res.redirect('/users/sign-in');
    }
    catch (err) {
        console.log('Error updating email' + err.message);
    }
}

module.exports.deleteUser = async function (req, res) {
    try {
        if (req.isAuthenticated()) {
            req.logout();
            let sql = `DELETE from users where username=?`;
            await db.run(sql, [res.locals.user.username]);
            sql = `DELETE from user_preferences where username=?`;
            await db.run(sql, [res.locals.user.username]);
            req.flash('error', 'Sorry to see you go');
            return res.redirect('/users/sign-up');
        }
    }
    catch (err) {
        console.log('Error deleting in user' + err.message);
    }
}

module.exports.pageNotFound = function (req, res) {
    if (req.isAuthenticated)
        res.redirect('/users/home');
    else
        res.redirect('users/sign-in')
}

//destroys the session when user clicks logout
module.exports.destroySession = function (req, res) {
    req.logout();
    req.flash('error', 'Logged out');
    return res.redirect('/users/sign-in');
}

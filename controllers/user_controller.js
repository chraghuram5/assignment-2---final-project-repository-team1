'use strict';
let openDBConnection = require('../config/sqllite3');
const bcrypt = require('bcrypt');
const axios = require('axios');

let db;
let init = async function () {
    db = await openDBConnection();
}

init();

//render the sing Up page
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
        let data = [];
        // let results=[];
        // let dates=[];
        try {
            
            let response = await axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=ee098898970340a19e3743edfb785269');
            //console.log(response.data.articles);
            data = response.data.articles;
            /*
            for (var i = 0; i < 7; i++) {
                var d = new Date();
                d.setDate(d.getDate() - i);
                var date = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
                dates.push(date)
            }
            console.log(dates);
            for(var i=0;i<7;i++){
                let responseObject = await axios.get('https://newsapi.org/v2/everything?q=bitcoin&from='+dates[i]+'&to='+dates[i]+'&apiKey=e00bbb6c015c4498b9e05f58e8a047f3');
                console.log(responseObject.data.totalResults);
                var resultsData = responseObject.data.totalResults;
                results.push(resultsData);
            }
            console.log(results); 
            //return res.render('chart',{dates:dates, results:results});
            var obj = {};
            obj.results=results;
            obj.dates=dates;
            res.locals.obj={
                'dates':dates,
                'results':results
            };
            */
            return res.render('home', {data: data});
        }
        catch (error) {
            console.log("error");
            console.log(error);
            return res.render('home', {data: "NoData"});
        }
    }
    req.flash('error', 'Please SignIn/SignUp');
    return res.redirect('/users/sign-in');
}

module.exports.createUser = async function (req, res) {
    try {
        if (req.body.password != req.body.confirm_password) {
            console.log('Passwords do not match. Please enter again');
            req.flash('error', 'Passwords do not match');
            return res.status(200).redirect('/users/sign-up');
        }

        if (req.body.password.length < 6) {
            req.flash('error', 'Password too small');
            return res.status(200).redirect('/users/sign-up');
        }

        let sql = `SELECT username from users where username = ?`;

        let user = await db.get(sql, [req.body.username]);

        if (user != null) {
            console.log("User already present");
            req.flash('error', 'User already present');
            return res.status(200).redirect('/users/sign-in');
        }
        else {
            let createUserSql = `INSERT INTO users(username, email, password) VALUES(?,?,?)`;
            //let encryptedPassword = CryptoJS.AES.encrypt(req.body.password, 'authentication').toString();
            const salt = await bcrypt.genSalt(10);
            const encryptedPassword = await bcrypt.hash(req.body.password, salt);
            await db.run(createUserSql, [req.body.username, req.body.email, encryptedPassword]);
            console.log('User created');
            req.flash('success', 'Successfully signed Up');
            return res.status(200).redirect('/users/sign-in');
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

module.exports.chart = async function(req, res){
    if(req.isAuthenticated()){
        return res.render('chart');
    }
    return res.redirect('/users/sign-in')
}

module.exports.updateUser = async function (req, res) {
    try {
        if (req.isAuthenticated()) {
            let sql = `UPDATE users SET email=? WHERE username = ?`;
            await db.run(sql, [req.body.email, req.body.username]);
            res.locals.user.email = req.body.email;
            req.flash('success', 'email updated');
            res.redirect('/users/home');
        }
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
            req.flash('error', 'Sorry to see you go');
            return res.redirect('/users/sign-up');
        }
    }
    catch (err) {
        console.log('Error deleting in user' + err.message);
    }
}

//destroys the session when user clicks logout
module.exports.destroySession = function (req, res) {
    req.logout();
    req.flash('error', 'Logged out');
    return res.redirect('/');
}

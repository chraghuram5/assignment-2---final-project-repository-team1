'use strict';
let openDBConnection=require('../config/sqllite3');
//var CryptoJS = require("crypto-js");
const bcrypt = require('bcrypt');

let db;
let init = async function(){
    db = await openDBConnection();
}

init();

//render the sing Up page
module.exports.signUp = function (req, res) {
    if(req.isAuthenticated()){
        req.flash('success','Signed In');
        return res.redirect('/users/home');
    }
    return res.render('sign_up');
}

//render sign-in page
module.exports.signIn = function (req, res) {
    if(req.isAuthenticated()){
        req.flash('success','Signed In');
        return res.redirect('/users/home');
    }
    return res.render('sign_in');
}

module.exports.home= function(req,res){
    if(req.isAuthenticated()){
        req.flash('success','Signed In');
        return res.render('home');
    }
    req.flash('error','Please SignIn/SignUp');
    return res.redirect('/users/sign-in');
}

module.exports.createUser = async function (req, res) {
    try {
        if (req.body.password != req.body.confirm_password) {
            console.log('Passwords do not match. Please enter again');
            req.flash('error','Passwords do not match');
            return res.redirect('/users/sign-up');
        }

        let sql = `SELECT username from users where username = ?`;

        let user = await db.get(sql, [req.body.username]);

        if (user!=null) {
            console.log("User already present");
            req.flash('error','User already present');
            return res.render('sign_in');
        }
        else {
            let createUserSql = `INSERT INTO users(username, email, password) VALUES(?,?,?)`;
            //let encryptedPassword = CryptoJS.AES.encrypt(req.body.password, 'authentication').toString();
            const salt = await bcrypt.genSalt(10);
            const encryptedPassword = await bcrypt.hash(req.body.password, salt);
            db.run(createUserSql, [req.body.username, req.body.email, encryptedPassword]);
            console.log('User created');
            req.flash('success','Successfully signed Up');
            return res.redirect('/users/sign-in');
        }
    }
    catch (err) {
        console.log("Error in creating user" + err.message);
    }

}

module.exports.createSession = async function (req, res) {
    try {
        if(req.isAuthenticated()){
            req.flash('success','Logged In');
            return res.redirect('/users/home');
        }
        res.redirect('/users/sign-up')
    }
    catch (err) {
        console.log('Error logging in user' + err.message);
    }
}

//destroys the session when user clicks logout
module.exports.destroySession=function(req,res){
    req.logout();
    req.flash('error','Logged out');
    return res.redirect('/');
}

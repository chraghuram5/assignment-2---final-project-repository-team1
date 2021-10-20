'use strict';
let openDBConnection=require('../config/sqllite3');
//var CryptoJS = require("crypto-js");
const bcrypt = require('bcrypt')

let db;
let init = async function(){
    db = await openDBConnection();
}

init();

//render the sing Up page
module.exports.signUp = function (req, res) {
    return res.render('sign_up');
}

module.exports.createUser = async function (req, res) {
    try {
        if (req.body.password != req.body.confirm_password) {
            console.log('Passwords do not match. Please enter again');
            return res.render('sign_up');
        }

        let sql = `SELECT username from users where username = ?`;

        let user = await db.get(sql, [req.body.username]);

        if (user!=null) {
            console.log("User already present");
            return res.render('sign_in');
        }
        else {
            let createUserSql = `INSERT INTO users(username, email, password) VALUES(?,?,?)`;
            //let encryptedPassword = CryptoJS.AES.encrypt(req.body.password, 'authentication').toString();
            const salt = await bcrypt.genSalt(10);
            const encryptedPassword = await bcrypt.hash(req.body.password, salt);
            db.run(createUserSql, [req.body.username, req.body.email, encryptedPassword]);
            console.log('User created');
            return res.render('sign_in');
        }
    }
    catch (err) {
        console.log("Error in creating user" + err.message);
    }

}

module.exports.loginUser = async function (req, res) {
    try {
        let sql = `SELECT * from users where email=?`;
        let user = await db.get(sql, [req.body.email]);
        if (user) {
            //let encryptedPassword = user.password;
            //let decryptedPassword = CryptoJS.AES.decrypt(encryptedPassword, 'authentication').toString(CryptoJS.enc.Utf8);

            const isSame = await bcrypt.compare(req.body.password, user.password);
            if(isSame){
                console.log('User successfully authenticated');
                return res.render('home');
            }
            else{
                console.log('Incorrect credentials');
                return res.render('sign_in');
            }
        }
        else {
            console.log('User not present. Please sign up');
            return res.render('sign_in');
        }
    }
    catch (err) {
        console.log('Error logging in user' + err.message);
    }
}

//render sign-in page
module.exports.signIn = function (req, res) {
    return res.render('sign_in');
}
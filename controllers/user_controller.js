'use strict';
let openDBConnection=require('../config/sqllite3');

let db;
let connect = async function(){
    db = await openDBConnection();
}

connect();

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
            db.run(createUserSql, [req.body.username, req.body.email, req.body.password]);
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
        let sql = `SELECT username from users where email=? and password=?`;
        let user = await db.get(sql, [req.body.email, req.body.password]);
        if (user) {
            console.log(user);
            console.log('User successfully loggedIn');
            return res.render('home');
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
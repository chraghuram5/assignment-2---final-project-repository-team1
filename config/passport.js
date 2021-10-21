const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

let openDBConnection = require('../config/sqllite3');
//var CryptoJS = require("crypto-js");
const bcrypt = require('bcrypt');
let db;
let init = async function () {
    db = await openDBConnection();
}

init();

passport.use(
    new LocalStrategy({passReqToCallback: true},async function (req, username, password, callback) {
        try {
            console.log("local strategy called");
            let sql = `SELECT * from users where username = ?`;

            let user = await db.get(sql, [username]);
            console.log(user);
            if (!user) {
                return callback(null, false);
            }
            const isValid = await bcrypt.compare(password, user.password);

            if (isValid) {
                return callback(null, user);
            }
            else {
                req.flash('error','Passwords do not match');
                return callback(null, false);
            }
        }
        catch (err) {
            console.log(err);
        }
    })
)

passport.serializeUser(function (user, callback) {
    callback(null, user.username);
});

passport.deserializeUser(async function (username, callback) {

    try {
        let sql = `SELECT * from users where username = ?`;
        let user = await db.get(sql, [username]);

        if (user) {
            callback(null, user);
        }
    }
    catch (err) {
        return callback(err);
    }
});

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie
        res.locals.user=req.user;
    }
    next();
}

module.exports = passport;

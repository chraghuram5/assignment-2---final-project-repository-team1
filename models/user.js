// module.exports = (sequelize, type) => {
//     return sequelize.define('user', {
//         username: {
//             type: type.STRING,
//             primaryKey: true
//         },
//         email: {
//             type: type.STRING,
//             allowNull: false
//         },
//         password: {
//             type: type.STRING,
//             allowNull: false
//         },
//         timestamps: false,
//         createdAt: false,
//         updatedAt: false
//     })
// };
let openDBConnection = require('../config/sqllite3');
const bcrypt = require('bcrypt');
let db;
let init = async function () {
    db = await openDBConnection();
}
init();

class User {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
    getUserName() {
        return this.username
    }
    getEmail() {
        return this.email;
    }
    getPassword() {
        return this.password;
    }
    setUserName(username) {
        this.username = username;
    }
    setPassword(password) {
        this.password = password;
    }
    setEmail(email) {
        this.email = email;
    }
}

module.exports.getUser = async function (username) {
    try {
        let sql = `SELECT * from users where username = ?`;
        let user = await db.get(sql, [username]);
        if(user==undefined)
            return null;
        return new User(user.username, user.email, user.password);
    }
    catch (err) {
        console.log(err);
    }
}

module.exports.isUserPresent = async function(username){
    try{
        let sql = `SELECT * from users where username = ?`;
        let user = await db.get(sql, [username]);
        if(user==undefined)
            return true;
        return false;
    }
    catch(err){
        console.log(err);
    }
}

module.exports.createUser = async function (username, email, password) {
    try {
        let createUserSql = `INSERT INTO users(username, email, password) VALUES(?,?,?)`;
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);
        let user = new User(username, email, encryptedPassword);
        await db.run(createUserSql, [user.username, user.email, user.password]);
        return user;
    }
    catch (err) {
        console.log(err);
    }
}

module.exports.updateUser = async function (username, email, password) {
    try {
        let sql = `UPDATE users SET email=?, password=? WHERE username = ?`;
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);
        let user = new User(username, email, encryptedPassword);
        await db.run(sql, [user.email, user.password, user.username]);
        return user;
    }
    catch(err){
        console.log(err);
    }
}

module.exports.deleteUser = async function(username){
    try {
        let sql = `DELETE from users where username=?`;
        await db.run(sql, username);
    }
    catch(err){
        console.log(err);
    }
}
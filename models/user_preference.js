let openDBConnection = require('../config/sqllite3');
let db;
let init = async function () {
    db = await openDBConnection();
}
init();

class UserPreference {
    constructor(username, sourceId) {
        this.username = username;
        this.sourceId = sourceId;
    }
    getSourceId() {
        return this.sourceId;
    }
    getUserName() {
        return this.username;
    }
    setSourceId(sourceId) {
        this.sourceId = sourceId;
    }
    setUserName(username) {
        this.username = username;
    }
}

module.exports.updatePreferences = async function (preferences, username) {
    try {
        let deleteSql = 'DELETE from user_preferences where username=?';
        await db.run(deleteSql, [username]);
        for (let i = 0; i < preferences.length; i++) {
            let createUserSql = `INSERT INTO user_preferences(username, sourceId) VALUES(?,?)`;
            await db.run(createUserSql, [username, preferences[i]]);
        }
    }
    catch (err) {
        console.log(err);
    }
}

module.exports.getSourceIds = async function (username) {
    try {
        let sql = "SELECT sourceId FROM user_preferences where username=?";
        let sourceIds = await db.all(sql, [username]);
        return sourceIds;
    }
    catch (err) {
        console.log(err);
    }
}

module.exports.createUserPreferences = async function (preferences, username) {
    try {
        for (let i = 0; i < preferences.length; i++) {
            let createUserSql = `INSERT INTO user_preferences(username, sourceId) VALUES(?,?)`;
            await db.run(createUserSql, [username, preferences[i]]);
        }
    }
    catch (err) {
        console.log(err);
    }
}
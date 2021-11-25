let openDBConnection = require('../config/sqllite3').openDBConnection;

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
        let db = await openDBConnection();
        let deleteSql = 'DELETE from user_preferences where username=?';
        await db.run(deleteSql, [username]);
        for (let i = 0; i < preferences.length; i++) {
            let createUserSql = `INSERT INTO user_preferences(username, sourceId) VALUES(?,?)`;
            await db.run(createUserSql, [username, preferences[i]]);
        }
        db.close();
    }
    catch (err) {
        console.log(err);
    }
}

module.exports.getSourceIds = async function (username) {
    try {
        let db = await openDBConnection();
        let sql = "SELECT sourceId FROM user_preferences where username=?";
        let sourceIds = await db.all(sql, [username]);
        db.close();
        return sourceIds;
    }
    catch (err) {
        console.log(err);
    }
}

module.exports.createUserPreferences = async function (preferences, username) {
    try {
        let db = await openDBConnection();
        for (let i = 0; i < preferences.length; i++) {
            let createUserSql = `INSERT INTO user_preferences(username, sourceId) VALUES(?,?)`;
            await db.run(createUserSql, [username, preferences[i]]);
        }
        db.close();
    }
    catch (err) {
        console.log(err);
    }
}
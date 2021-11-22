let openDBConnection = require('../config/sqllite3');
let db;
let init = async function () {
    db = await openDBConnection();
}
init();

module.exports.preferencePage = function (req, res) {
    return res.render('preference');
}

module.exports.savePreferences = async function (req, res) {
    console.log(req.body);
    let preferences = req.body.preference;
    for (let i = 0; i < preferences.length; i++) {
        let createUserSql = `INSERT INTO user_preferences(username, sourceId) VALUES(?,?)`;
        await db.run(createUserSql, [req.body.username, preferences[i]]);
    }
    return res.redirect('/users/sign-in');
}

module.exports.updatePage = async function (req, res) {
    let user = {};
    user.username = res.locals.user.username;
    console.log(user);
    req.user = user;
    console.log('user sources');
    console.log(res.locals.user.username);
    let sql = "SELECT sourceId FROM user_preferences where username=?";
    let sourceIds = await db.all(sql, [res.locals.user.username]);
    let selectedSources = new Array();
    for (let i = 0; i < sourceIds.length; i++) {
        //console.log(sourceIds.get(i));
        let sourcesSql = "SELECT * from sources where sourceId=?";
        let source = await db.get(sourcesSql, [sourceIds[i].sourceId]);
        selectedSources.push(source.source);
    }
    let sourceSql = `SELECT * FROM sources`;
    let sources = await db.all(sourceSql);
    let data = {};
    data.sources = sources;
    data.selectedSources = selectedSources;
    return res.render('preferences-update', { data: data, user: user });
}

module.exports.updatePreferences = async function(req, res){
    let preferences = req.body.preference;
    let deleteSql = 'DELETE from user_preferences where username=?';
    await db.run(deleteSql, [req.body.username]);
    for (let i = 0; i < preferences.length; i++) {
        let createUserSql = `INSERT INTO user_preferences(username, sourceId) VALUES(?,?)`;
        await db.run(createUserSql, [req.body.username, preferences[i]]);
    }
    return res.redirect('/users/home');
}
let openDBConnection = require('../config/sqllite3');
let db;
let init = async function () {
    db = await openDBConnection();
}
init();

module.exports.preferencePage = function (req, res) {
    return res.render('preference');
}

module.exports.savePreferences = async function(req, res){
    console.log(req.body);
    let preferences = req.body.preference;
    for(let i=0;i<preferences.length;i++){
        let createUserSql = `INSERT INTO user_preferences(username, sourceId) VALUES(?,?)`;
        await db.run(createUserSql, [req.body.username, preferences[i]]);
    }
    return res.redirect('/users/sign-in');
}
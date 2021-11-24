let openDBConnection = require('../config/sqllite3');
const bcrypt = require('bcrypt');
let db;
let init = async function () {
    db = await openDBConnection();
}
init();

class Boomark {
    constructor(username, title, imageUrl, description, url, source) {
        this.source = source;
        this.username = username;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.url = url;
    }
    getSource() {
        return this.source
    }
    setSource(source) {
        this.source = source;
    }
}

module.exports.addBookmark = async function (username, title, imageUrl, description, url, source) {
    try {
        let bookmarksql = `INSERT INTO bookmarks VALUES(?,?,?,?,?,?)`;
        await db.run(bookmarksql, [username, title, imageUrl, description, url, source]);
    }
    catch (err) {
        console.log(err);
    }
}


module.exports.getBookMarks = async function(username){
    try{
        let sql = `SELECT * from bookmarks where username=?`;
        let bookmarks = await db.all(sql, [username]);
        return bookmarks;
    }
    catch(err){
        console.log(err);
    }
}
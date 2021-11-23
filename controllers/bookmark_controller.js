let openDBConnection = require('../config/sqllite3');
let db;
let init = async function () {
    db = await openDBConnection();
}
init();

module.exports.addBookmark = async function (req, res) {
    console.log(req.body);
    let bookmark={};
    bookmark.username = req.body.username;
    bookmark.title = req.body.title;
    bookmark.url = req.body.url;
    bookmark.imageUrl = req.body.imageUrl,
    bookmark.description = req.body.description;
    bookmark.source = req.body.source;
    let bookmarksql = `INSERT INTO bookmarks VALUES(?,?,?,?,?,?)`;
    await db.run(bookmarksql, [bookmark.username, bookmark.title, bookmark.imageUrl, bookmark.description, bookmark.url, bookmark.source]);
    return res.redirect("/users/home");
}

module.exports.bookmarksPage = async function (req, res) {
    let data ={};
    let username = res.locals.user.username;
    let sql = `SELECT * from bookmarks where username=?`;
    let bookmarks = await db.all(sql, [username]);
    console.log(bookmarks);
    return res.render('bookmarks', { data: bookmarks });
}
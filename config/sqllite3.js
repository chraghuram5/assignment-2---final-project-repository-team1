const sqlite3 = require('sqlite3');
const {open} = require ('sqlite');

let openDBConnection = async function() {
  return open({
    filename: './db/users.sqlite',
    driver: sqlite3.Database
  })
}

let createTable=async function(){
  let db = await openDBConnection();
  const sql=`CREATE TABLE IF NOT EXISTS users(
    username TEXT PRIMARY KEY,
    email TEXT NOT NULL,
    password TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS sources(
    sourceId INTEGER NOT NULL,
    source TEXT NOT NULL,
    PRIMARY KEY (sourceId),
    UNIQUE (source)
  );
  CREATE TABLE IF NOT EXISTS user_preferences(
    username TEXT NOT NULL,
    sourceId INT NOT NULL
  );
  INSERT OR IGNORE INTO sources (source)
  VALUES ('Bloomberg'),('BBC News'),('Bloomberg'),('Business Insider'),('CBC News'),('CNN'),('Engadget'),('ESPN'),('Reuters')`;

  db.exec(sql, function(err){
    if(err){
      console.log('Unable to create a table'+err.message);
    }
    else{
      console.log('Table initialised successfully');
    }
  });

  // const sourceSql=`CREATE TABLE IF NOT EXISTS sources(
  //   sourceId int NOT NULL AUTOINCREMENT,
  //   source TEXT NOT NULL,
  //   PRIMARY KEY (sourceId)
  // )`;

  // db.exec(sourceSql, function(err){
  //   if(err){
  //     console.log('Unable to create a sources Table'+err.message);
  //   }
  //   else{
  //     console.log('Table initialised successfully');
  //   }
  // });


}

createTable();

module.exports=openDBConnection;
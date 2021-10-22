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
  )`;

  db.exec(sql, function(err){
    if(err){
      console.log('Unable to create a table'+err.message);
    }
    else{
      console.log('Table initialised successfully');
    }
  });
}

createTable();

module.exports=openDBConnection;
const express=require('express');
const port= 8000;
const expressLayouts = require('express-ejs-layouts');
const app=express();

//Parse URL-encoded bodies
app.use(express.urlencoded()); 
app.use(express.json())
app.use(express.static('./assets'));
//layouts setup
app.use(expressLayouts);

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//setting view engine 
app.set('view engine','ejs');
app.set('views','./views');

//use express router
app.use('/',require('./routes/index.js'));
app.listen(port, function(err){
    if(err){
        console.log("error in runnning the server",err);
        return;
    }

    console.log("Express Server is running on port",port);
})
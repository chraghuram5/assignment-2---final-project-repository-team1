const express=require('express');
const port= 8000;

const app=express();

//use express router
app.use('/',require('./routes/index.js'));

app.listen(port, function(err){
    if(err){
        console.log("error in runnning the server",err);
        return;
    }

    console.log("Express Server is running on port",port);
})
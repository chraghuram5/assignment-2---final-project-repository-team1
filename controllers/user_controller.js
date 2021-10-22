'use strict';

const fs = require('fs');

//render the sing Up page
module.exports.signUp=function(req,res){
    console.log("sign in page");
    return res.render('sign_up');
    
}

module.exports.createUser=async function(req,res){
    if(req.body.password!=req.body.confirm_password){
        req.flash('error','passwords dont match');
        console.log("Please enter again");
        return res.render('sign_up');
    }

    let rawdata =await fs.readFileSync('./model/user.json');
    let users = JSON.parse(rawdata);

    console.log(users.some(user => user.username===req.body.username));

    if(!users.some(user => user.username===req.body.username)){
        //encrypting password before creating of the record
        let userObject={};
        userObject.username=req.body.username;
        userObject.password=req.body.password;
        userObject.email=req.body.email;
        users.push(userObject);
        let data = JSON.stringify(users);
        fs.writeFileSync('./model/user.json', data);
        return res.render('sign_in');
    }
    else{
        console.log("User already present");
        return res.render('sign_up');
    }
}

module.exports.loginUser=async function(req,res){

    let rawdata =await fs.readFileSync('./model/user.json');
    let users = JSON.parse(rawdata);

    if(users.some(user => ((user.email===req.body.email) && (user.password===req.body.password)))){
        //encrypting password before creating of the record
        return res.render('home');
    }
    else{
        console.log("wrong credetials");
        return res.render('sign_in');
    }
}

//render sign-in page
module.exports.signIn=function(req,res){
    return res.render('sign_in');
}
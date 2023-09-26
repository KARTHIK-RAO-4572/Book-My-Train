const models = require('./../../app_api/models/models')
require('multer')
/* controller for Lander page */
var Lander = function(req,res){
    res.render('index',{title:"Home page ra babu"})
}
// GET login page
var getLogin = function(req,res){
    res.render('index',{title:"This is login Page"});
}

//POST login page
var postLogin = function(req,res){
    try{
        models.userInfo.create(
            {
                "username": username,
                "password": password,
                "phone": phone,
                "email": email
            }
        )
        res.status(200).json({message:"successful insertion"});
    }
    catch(err)
    {
        res.status(500).send(err);
    }
    
}

// GET signup page
var getSignup = function(req,res){
    res.render("index",{title:'this is signup page'});
}

//POST signup page
var postSignup = function(req,res){
    try{
        models.userInfo.create(
            {
                "username": req.body.username,
                "password": req.body.password,
                "phone": req.body.phone,
                "email": req.body.email
            }
        )
        res.status(200).json({message:"successful insertion"});
    }
    catch(err)
    {
        res.status(500).send(err);
    }
    res.render('index',{title:"This is to validating and creating users"});
}

//TEST 
var test = function(req,res){
    var username = "Karthik Rao";
    var password = "Helloworld";
    var phone = 6304228571;
    var email = "test@123";
    try{
        models.userInfo.create(
            {
                "username": username,
                "password": password,
                "phone": phone,
                "email": email
            }
        )
        res.status(200).json({message:"suceesful insertion"});
    }
    catch(err)
    {
        res.status(500).send(err);
    }

    }
    


module.exports = {
    Lander,
    getLogin,postLogin,
    getSignup,postSignup,
    test
}
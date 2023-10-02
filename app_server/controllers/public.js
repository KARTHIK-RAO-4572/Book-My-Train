const models = require('./../../app_api/models/models')
require('multer')
//GET Lander Page
var Lander = function(req,res){
    res.render('Lander.ejs');
}
// GET login page
var getLogin = function(req,res){
    res.render('Login.ejs');
}

//POST login page
var postLogin = async function(req,res){
    const entered_email = req.body.email;
    const entered_password = req.body.password;
    try{
    const docu = await models.userInfo.findOne({email:entered_email},{password:1}).exec();
        if(docu.password === entered_password){
            res.render('index.jade',{title:"This is home page"});
        }
        else{
            res.render('index.jade',{title:"Email or password is wrong"});
        }
    }
    catch(err){
        console.log(err);
        res.render('index.jade',{title:"Email or password is wrong"});
    }
   

    
}

// GET signup page
var getSignup = function(req,res){
    res.render('signup.ejs');
}

//GET Test route
var test = function(req,res){
    res.render('index.jade',{title:"This is jade"});
}

//POST signup page
var postSignup = function(req,res){
    try{
        models.userInfo.create({
            "username":req.body.username,
            "password":req.body.password,
            "phone":req.body.phone,
            "email":req.body.email

        });
        res.render('index',"Created sucessfully");
    }
    catch(err){
        res.sendStatus(404).json({error:err});
    }
}

//TEST 
var test1 = function(req,res){
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
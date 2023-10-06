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
    const docu = await models.userInfo.findOne({email:entered_email},{password:1,username:1}).exec();
        if(docu.password === entered_password){
            res.render('Home.ejs');
        }
        else{
            res.render('wrong_pass.ejs');
        }
    }
    catch(err){
        console.log(err);
        res.render('wrong_pass.ejs');
    }
}
// POST show trains
var getTrain = async function(req,res){
    const docu = await models.trainInfo.findOne({train_number:1,train_name:1,cost:1});
    res.render('getTrain.jade',{trains:[{train_name:"Ajantha",train_no:17064,cost:4000},{train_name:"Duronto",train_no:17065,cost:5000}]});
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
var postSignup = async function(req,res){
    entered_email = req.body.email;
    var docu = await models.userInfo.findOne({email:entered_email},{email:1}).exec();
    if(!docu)
    {
        try{
            await models.userInfo.create({
                username:req.body.username,
                password:req.body.password,
                phone:req.body.phone,
                email:req.body.email
    
            });
            res.render('signup_success.ejs');
        }
        catch(err){
            console.log(err);
            res.render('Lander.ejs');
        }
    }
    else if(docu.email === entered_email)
    {   console.log(docu.email);
        console.log("entered");
        res.render('User_already.ejs');
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
    test,
    getTrain
};
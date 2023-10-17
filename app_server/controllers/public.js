const models = require('./../../app_api/models/models')
require('multer')
//GET Lander Page
var Lander = function(req,res){
    res.render('Lander.ejs');
}

// GET Login page
var getLogin = function(req,res){
    res.render('Login.ejs');
}

//POST Login page
var postLogin = async function(req,res){
    console.log(req.body.email);
    if(!req.body.email || !req.body.password){
        res.status(400).json({"message":"All Fields are mandatory"});
    }
    //Check user is there or not
    const docu = await models.userInfo.findOne({email:req.body.email}).exec();
    if(docu){
        try {
        if(docu.validatePassword(req.body.password)){
            //return JWT token also
            res.status(200);
            res.render('Home.ejs');
        }
        else{
            res.status(200);
            res.render('wrong_pass.ejs');
        }}
        catch(err){
            console.log("Error at Post Login Page : "+err);
            res.status(500).json({"message":"Sorry! We have a Technical glitch"});
        }
    }
    else{
        res.status(400).json({"message":"User Do not Exist!"});
    }

}

// GET Signup page
var getSignup = function(req,res){
    res.render('signup.ejs');
}

//POST Signup page
var postSignup = async function(req,res){
    const email = req.body.email;
    if(!req.body.email || !req.body.password || !req.body.phone || !req.body.username){
        res.status(400).json({"message":"All fields are mandatory to fill!"});
    }
    //Check for existing user
    var docu = await models.userInfo.findOne({email:email},{email:1}).exec();
    if(!docu){
        try{
             //instantiate model
             var newUser = models.userInfo();
             newUser.email = email;
             newUser.phone = req.body.phone;
             newUser.username = req.body.username;
             newUser.setPassword(req.body.password);
             newUser.save();
             res.status(201);
             res.render('signup_success.ejs');
        }
        catch(err){
            console.log("error occured: "+err);
            res.status(500).json({"message":"error occured: "+err});
        }
    }
    else
    {
        res.render('User_already.ejs');
    }
}

// GET show trains
var getTrain = async function(req,res){
    var fromm = req.body.from
    var tooo = req.body.to
    if(fromm === "Secunderabad"){
         fromm = "SC";
    }
    else if(fromm === "Mumbai"){
        fromm = "MCC";
    }
    else if(fromm === "Chennai"){
        fromm = "MAS";
    }
    else if(fromm === "Kacheguda"){
        fromm = "KCG";
    }
    else if(fromm === "hyb"){
        fromm = "HYB";
    }
    if(tooo === "Secunderabad"){
        tooo = "SC";
    }
    else if(tooo === "Mumbai"){
       tooo = "MCC";
    }
    else if(tooo === "Chennai"){
       tooo = "MAS";
    }
    else if(tooo === "Kacheguda"){
       tooo = "KCG";
    }
    else if(tooo === "hyb"){
       tooo = "HYB";
    }

    const datee = req.body.date
    if(fromm === tooo)
    {
        res.render('same_src.ejs');
    }
    else{
        var titlee = " "
    const docu = await models.trainInfo.find({from:fromm,to:tooo,boarding_date:datee})
    // const docu = await models.trainInfo.findOne({train_number:1,train_name:1,cost:1});
    console.log(docu)
    if(!docu.length){
        titlee="Sorry! There are no trains between "+req.body.from+" and "+req.body.to;
    }
    res.render('getTrain.jade',{
        title:titlee,
        from:req.body.from,
        to:req.body.to,
        trains:docu,
        date:req.body.date});
}
}

// PUT BOOK TICKET
var bookTicket = async function(req,res){
    var docu = await models.trainInfo.findOne({train_no:req.body.number,boarding_date:req.body.datee});
    console.log(docu);
    console.log(docu.no_of_seats);
    if(docu.no_of_seats === 0){
        res.render('no_ticket.ejs');
    }
    else{
        const number = docu.no_of_seats;
        docu.no_of_seats = docu.no_of_seats -1;
        docu.save();
        res.status(200);
        res.render('ticket_success.jade',{seat_number:number,
        template:docu });   
    }
}

//GET Test route
var test = function(req,res){
    res.render('index.jade',{title:"This is jade"});
}

//GET Train Details
var show

module.exports = {
    Lander,
    getLogin,postLogin,
    getSignup,postSignup,
    test,
    getTrain,
    bookTicket
};
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
    res.render('getTrain.jade',{title:titlee,trains:docu});
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
    
// PUT BOOK TICKET
var bookTicket = async function(req,res){
    const docu = await models.trainInfo.find({from:req.body.from,to:req.body.to,train_no:req.body.trainnumber})
    if(!docu.number_of_seats){
        const number = docu.number_of_seats;
        models.trainInfo.update({from:req.body.from,to:req.body.to,train_no:req.body.trainnumber},{number_of_seats:number-1});
        res.render('ticket_success.ejs',{seat_number:number});
    }
    else{
        res.render('no_ticket.ejs');
    }

}

module.exports = {
    Lander,
    getLogin,postLogin,
    getSignup,postSignup,
    test,
    getTrain,
    bookTicket
};
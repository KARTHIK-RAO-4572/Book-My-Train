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
    emaill = req.body.email;
    console.log(emaill);
    res.render('index',{title:"hello"})
}

// GET signup page
var getSignup = function(req,res){
    res.render("index",{title:'this is signup page'});
}

//POST signup page
var postSignup = function(req,res){
    res.render('index',{title:"This is to validating and creating users"});
}


module.exports = {
    Lander,
    getLogin,postLogin,
    getSignup,postSignup
}
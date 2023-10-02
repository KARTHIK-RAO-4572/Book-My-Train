// GET admin Page
var getAdminPage = function(req,res){
    res.render('index',{title:"This is admin login page"});
}

//POST admin Page for Login
var postAdminPage = function(req,res){
    res.render('index',{title:"This is for validating"});
}
module.exports = {
    getAdminPage,
    postAdminPage
};
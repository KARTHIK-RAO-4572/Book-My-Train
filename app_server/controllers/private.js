const models = require('./../../app_api/models/models')
require('multer')

// GET admin Page
var getAdminPage = function(req,res){
    res.render('admin_login.ejs');
}

//POST admin Page for Login
var postAdminPage = async function(req,res){
    const entered_id = req.body.id;
    const entered_password = req.body.password;
    try{
    const docu = await models.adminInfo.findOne({employeeId:entered_id},{password:1}).exec();
        if(docu.password === entered_password){
            res.render('train_enter.ejs');
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

// PUT TRAIN DATA
const putTrain = async function(req,res){
    try{
        await model.trainInfo.create(
            {
                train_name:req.body.train_name,
                train_no:req.body.train_no,
                cost:req.body.cost,
                from:req.body.from,
                to:req.body.to,
                boarding_date:req.body.boarding_date,
                boarding_time:req.body.boarding_time,
                no_of_seats:req.body.no_of_seats
                
            }
        )
        res.render('train_enter.ejs');
    }
    catch(err)
    {
        console.log(err);
        res.render("train_enter.ejs");
    }
}
module.exports = {
    getAdminPage,
    postAdminPage,
    putTrain
};
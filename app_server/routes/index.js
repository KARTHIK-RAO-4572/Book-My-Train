var express = require('express');
var multer = require('multer')
var router = express.Router();
var ctrls = require('../controllers/public')
/* GET home page. */
router.get('/', ctrls.Lander);

/* GET login Page */
router.get('/Login',ctrls.getLogin);

// POST Login details
router.post('/Login',ctrls.postLogin);

// GET Sign up page
router.get("/Signup",ctrls.getSignup) ;

//POST signup details
router.post("/Signup",ctrls.postSignup)


module.exports = router;

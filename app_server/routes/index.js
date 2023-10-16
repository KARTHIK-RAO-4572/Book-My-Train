var express = require('express');
var multer = require('multer')
const upload = multer();
var router = express.Router();
var ctrls = require('../controllers/public')
/* GET home page. */
router.get('/', ctrls.Lander);

//POST test
//router.post('/test',upload.none(),ctrls.jwtTest)
/* GET login Page */
router.get('/Login',ctrls.getLogin);

// POST Login details
router.post('/Login',upload.none(),ctrls.postLogin);

// GET Sign up page
router.get("/Signup",ctrls.getSignup) ;

//POST signup details
router.post("/Signup",upload.none(),ctrls.postSignup)

// Test Route
router.post("/test",ctrls.bookTicket);

// Show Trains page
router.post("/Showtrains",ctrls.getTrain);

module.exports = router;

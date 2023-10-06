var express = require('express');
var multer = require('multer')
const upload = multer();
var router = express.Router();
var ctrls = require('../controllers/public')
/* GET home page. */
router.get('/', ctrls.Lander);

//GET test
router.get('/test',ctrls.test)
/* GET login Page */
router.get('/Login',ctrls.getLogin);

// POST Login details
router.post('/Login',upload.none(),ctrls.postLogin);

// GET Sign up page
router.get("/Signup",ctrls.getSignup) ;

//POST signup details
router.post("/Signup",upload.none(),ctrls.postSignup)

// Test Route
router.get("/test",ctrls.test);

// Show Trains page
router.post("/Showtrains",ctrls.getTrain);

module.exports = router;

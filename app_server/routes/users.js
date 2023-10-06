var express = require('express');
var router = express.Router();
var private = require('../controllers/private')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// GET ADMIN
router.get('/admin',private.getAdminPage);
//POST ADMIN
router.post('/admin',private.postAdminPage);
//PUT TRAIN
router.post('admin/push',private.putTrain)
module.exports = router;

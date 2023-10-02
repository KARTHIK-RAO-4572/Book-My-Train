const mongoose = require('mongoose');
const { UserSchema, TrainSchema, AdminSchema } = require('./schemas');
var userInfo = mongoose.model('userInfo',UserSchema);
var trainInfo = mongoose.model('trainInfo',TrainSchema);
var adminInfo = mongoose.model('adminInfo',AdminSchema);
module.exports = {
    userInfo,
    trainInfo,
    adminInfo
};
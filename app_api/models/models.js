const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const { UserSchema, TrainSchema, AdminSchema, jwtUserSchema } = require('./schemas');
var userInfo = mongoose.model('userInfo',UserSchema);
var trainInfo = mongoose.model('trainInfo',TrainSchema);
var adminInfo = mongoose.model('adminInfo',AdminSchema);
var jwtUser = mongoose.model("jwtUser",jwtUserSchema);
module.exports = {
    userInfo,
    trainInfo,
    adminInfo,
    jwtUser
};
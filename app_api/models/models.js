const mongoose = require('mongoose');
const { UserSchema } = require('./schemas');
var userInfo = mongoose.model('userInfo',UserSchema);

module.exports = {
    userInfo
}
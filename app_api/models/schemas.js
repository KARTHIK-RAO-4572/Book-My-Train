const mongoose = require('mongoose');
var UserSchema = mongoose.Schema(
    {
        username:{
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
            min: 8,
            max: 12
        },
        phone: {
            type: Number,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        }
    }
)

module.exports = {
    UserSchema
}
const mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var UserSchema = mongoose.Schema(
    {
        username:{
            type: String,
            required: true
        },
        hash: String,
        salt: String,
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
var TrainSchema = {
    "train_no":{
        type: Number,
        required : true

    },
    "train_name":{
        type: String,
        required: true
    },
    "cost":{
        type:Number,
        required: true
    },
    "from":{
        type: String,
        required: true
    },
    "to":{
        type: String,
        required: true
    },
    "boarding_date":{
        type: Date,
        required: true
    },
    "boarding_time":{
        type: String,
        required: true
    },
    "no_of_seats":{
        type: Number,
        required: true
    }
}
var AdminSchema = mongoose.Schema(
    {
        employeeId:{
            type: Number,
            required: true
        },
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
var jwtUserSchema = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    hash: String,
    salt: String
})
jwtUserSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7); 
    return jwt.sign({ 
    _id: this._id, 
    email: this.email, 
    name: this.username, 
    exp: parseInt(expiry.getTime() / 1000), 
    }, 'codeisred' ); 
   };
//SCHEMA METHODS
UserSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000,64,'sha1').toString('hex');
}

UserSchema.methods.validatePassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64,'sha1').toString('hex');
    return this.hash === hash;
   };




module.exports = {
    UserSchema,
    TrainSchema,
    AdminSchema,
    jwtUserSchema
}
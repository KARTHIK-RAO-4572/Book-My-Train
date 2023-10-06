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
        type: String,
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
module.exports = {
    UserSchema,
    TrainSchema,
    AdminSchema
}
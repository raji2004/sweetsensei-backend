const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'email is required'],
        trim: true,
        text: true
    },
    password: {
        type: String,
        text: true,
        trim: true
    },
    verified:{
        type:Boolean,
        default:false
    },
    vcode:{
        type:Number,
        
    },
    fullname:{
        type:String,
        text:true,
        trim:true
        
    },
    transaction:{
        type:[Object]
    }

});
module.exports = mongoose.model("Admin", adminSchema);

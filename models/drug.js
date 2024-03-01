const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const drugSchema = mongoose.Schema({
    name: {
        type: String,
        text: true,
        trim: true
    },
    description: {
        type: String,
        text: true,
        trim: true
    },
    price: {
        type: Number,

    },
    quantity: {
        type: Number,
    },
    adminID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Admin'

    },
    image:{
        type:String,
        text:true,
        trim:true
    },
    
});
module.exports = mongoose.model("Drug", drugSchema);

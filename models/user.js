const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
  },
  gender: {
    type: String,
  },
  dateOfBirth: {
    type: String,
  },
  location: {
    type: String,
  },

  address: {
    type: [{
      pinCode: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      town: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      }
    }],
    default: [],
  },
  defaultAdress:{
    type:Number,
    default:0
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);

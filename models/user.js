const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const referralCodes = require("referral-codes");

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
  referralCode: {
    type: String,
    unique: true,
  },
  accountBalance: {
    type: Number,
    default: 0,
  },
});
UserSchema.pre('save', function(next) {
  if (!this.referralCode) {
    // Generate referral code logic
    this.referralCodes = generateReferralCode();
  }
  next();
});

function generateReferralCode() {
 const code=  referralCodes.generate({
    length: 5,
    count: 1,
  });
  return code[0];
}
UserSchema.methods.calculateReferralBonus = function(amount) {
  // Calculate the percentage of the amount to award as a referral bonus
  const referralBonusPercentage = 0.1; // For example, 10% referral bonus
  return amount * referralBonusPercentage;
};


module.exports = mongoose.model("User", UserSchema);

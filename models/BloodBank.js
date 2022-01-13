const mongoose = require('mongoose');
const validator = require('validator');

const bloodBankSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is Invalid");
      }
    },
  },
  phoneNumber: {
    type: String,
    unique: true,
    trim: true,
    validate(value) {
      if (!validator.isMobilePhone(value)) {
        throw new Error("Mobile number is Invalid!")
      }
    }
  },
  landmark: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
  },
  city: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
  },
  district: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
  },
  state: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
  },
  active: {
    type: Boolean,
    required: true,
    default:false,
  },
  location: {
    latitude: {
      type:Number
    },
    longitude: {
      type:Number
    } 
  },
});

const BloodBank = mongoose.model('BloodBank', bloodBankSchema);

module.exports = BloodBank;
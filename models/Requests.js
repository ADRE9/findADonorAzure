const mongoose = require('mongoose');
const validator = require('validator');

const requestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  age: {
    type: Number,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate(value) {
      if (!validator.isMobilePhone(value)) {
        throw new Error("Mobile number is Invalid!")
      }
    }
  },
  bloodGroupRequired: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
  }
});

const Request = mongoose.model('Request', requestSchema);
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
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
    required: true,
    unique: true,
    trim: true,
    validate(value) {
      if (!validator.isMobilePhone(value)) {
        throw new Error("Mobile number is Invalid!")
      }
    }
  },
  bloodGroup: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
  },
  gender: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
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
  // USER,DONOR,BLOOD BANK
  role: {
    type: String,
    default:'user',
    trim: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
    minlength: 7
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
  tokens: [
    {
      token: {
        type: String,
        required:true,
      }
    }
  ]
});

//generating auth tokens
userSchema.methods.generateAuthTokens= async function(){
  const user = this;
  // console.log(findADonor);
  const token = jwt.sign({ _id: user._id.toString() }, "findADonor");
  user.tokens = user.tokens.concat({ token :token });
  await user.save();
  return token;
}

//REMOVING PASSWORD AND OTHER TOKENS FROM REQUESTS
userSchema.methods.toJSON = function () {
  const user = this;

  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

//hash the password
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
})

//check user credentials for authentication
userSchema.statics.findByCredentials = async (email,password)=> {
  const user = await User.findOne({ email: email });

  if (!user) {
    throw new Error("No user found with that email");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Email and password donot match, Please Try again")
  }
  return user;
}

const User = mongoose.model('User', userSchema);

module.exports = User;
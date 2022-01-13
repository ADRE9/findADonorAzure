const express = require('express');
const User = require('../models/User');

//Creating New User
const createUser = async (req, res) => {
  //waits creation of index before entering new user to prevent duplication of users
  await User.init();

  const user = new User({ ...req.body });
  try {
    await user.save();
    const token = await user.generateAuthTokens();
    console.log(token);
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(500).send({ msg: "User Already Exist", error });
  }
};

//Logging in new user
const logInUser = async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthTokens();
    res.status(200).send({ user, token });
  } catch (error) {
    res.status(401).send({msg:"User Login Failed!",error:error})
  }
}


//Updating User data
const updateUser = async (req, res) => {
  const updates = Object.keys(req.body);
  const validUpdates = ['name', 'age', 'bloodGroup', 'landmark', 'city', 'district', 'state', 'password','location'];
  const isValidOperation = updates.every(update => {
    return validUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(500).send();
  }
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
      return res.status(404).send({ msg: "No such user found" });
    }
    updates.forEach(update => {
      user[update] = req.body[update];
    });
    await user.save();
    res.status(200).send({ msg: "Updated Sucessfully", user: user });
  } catch (e) {
    res.status(400).send({ msg: "Bad Request", error: e });
  }
};

//logout user
const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token != req.token
    });
    await req.user.save();
    res.status(200).send({ msg: "Logged Out Sucessfully!" });
  } catch (error) {
    res.status(400).send({ msg: "Unable to logout",error })
  }
};

//logout from all devices
const logoutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).send({ msg: "Logged out from all devices!" })
  } catch (e) {
    res.status(400).send({ msg: "Unable to logout from all devices",error:e })
  }
};

//get User Data
const userData = async (req, res) => {
  try {
    res.status(200).send({ user: req.user, token: req.token });
  } catch (e) {
    res.status(400).send({ msg: "Unable to fetch user data", error: e })
  }
};

//remove user
const removeUser = async (req, res) => {
  try {
    await req.user.remove();
    res.status(200).send(req.user);
  } catch (error) {
    res.status(400).send({ msg: "Unable to delete user", error })
  }
};

const findADonor = async (req, res) => {
  try {
    const donors = await User.find({ role: "donor",active:true });
    res.status(200).send(donors);
  } catch (error) {
    res.status(404).send({ msg: "Unable to find donors", error })
  }
};

const registerAsADonor = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
      return res.status(404).send({ msg: "No such user found" });
    }
    user['role'] = "donor";
    user['active'] = true;
    user['location'] = { "longitude": req.body.longitude, "latitude": req.body.latitude };
    console.log(user);
    await user.save();
    res.status(200).send({ msg: "Sucessfully registered as donor!", user: user });
  } catch (error) {
    res.status(400).send({ msg: "Unable to register as donor", error })
  }
}

module.exports={createUser,logInUser,updateUser,logout,logoutAll,userData,removeUser,findADonor,registerAsADonor}
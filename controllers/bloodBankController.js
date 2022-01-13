const BloodBank = require('../models/BloodBank');

const createBloodBank = async (req, res) => {
  try {
    await BloodBank.init();
    const bloodBank = new BloodBank({ ...req.body });
    await bloodBank.save();
    res.status(200).send({ bloodBank });
  } catch (e) {
    res.status(400).send({ msg: "Cannot Create Blood Bank", e });
  }
};

const getAllBloodBankData = async (req, res) => {
  try {
    const bloodBankData = await BloodBank.find({})
    res.status(200).send({ bloodBankData});
  } catch (e) {
    res.status(400).send({ msg: "Data Not Available", e });
  }
};

const updateBloodBank = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const validUpdates = ['name','email', 'landmark','phoneNumber','city', 'district', 'state', 'password','location'];
    const isValidOperation = updates.every(update => {
      return validUpdates.includes(update);
    });
    if (!isValidOperation) {
      return res.status(500).send();
    }
    const bloodBank = await BloodBank.findOne({ _id: req.params.id });
    if (!bloodBank) {
      return res.status(404).send({ msg: "No such Blood Bank found" });
    }
    updates.forEach(update => {
      bloodBank[update] = req.body[update];
    });
    await bloodBank.save();
    res.status(200).send({ msg: "Updated Sucessfully", bloodBank:bloodBank });
  } catch (e) {
    res.status(400).send({ msg: "Bad Request", error: e });
  }
};

const removeBloodBank = async (req, res) => {
  try {
    await req.params.id.remove();
    res.status(200).send({ msg: "Removed Sucessfully"});
  } catch (e) {
    res.status(400).send({ msg: "Bad Request", error: e });
  }
};

module.exports={createBloodBank,updateBloodBank,removeBloodBank,getAllBloodBankData}
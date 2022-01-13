const express = require('express');
const router = new express.Router();
const auth = require('../middlewares/authMiddleware');
const { createBloodBank, updateBloodBank, removeBloodBank, getAllBloodBankData } = require('../controllers/bloodBankController');

router.post('/api/bloodbank/register', auth, createBloodBank);
router.patch('/api/bloodbank/update/:id', auth, updateBloodBank);
router.get('/api/bloodbank/all', auth, getAllBloodBankData);
router.delete('/api/bloodbank/remove', auth, removeBloodBank);


module.exports = router;
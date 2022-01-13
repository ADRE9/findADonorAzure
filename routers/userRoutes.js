const express = require('express');
const router = new express.Router();
const auth = require('../middlewares/authMiddleware');
const { createUser,logInUser,updateUser,logout,logoutAll,userData,removeUser,findADonor,registerAsADonor } = require('../controllers/userController');

router.post('/api/user/register', createUser);
router.post("/api/auth/login", logInUser);
router.post("/api/auth/logout", auth, logout);
router.post('/api/auth/logoutall', auth, logoutAll);
router.patch('/api/user/update', auth, updateUser);
router.get('/api/auth/userData', auth, userData);
router.delete('/api/auth/removeUser', auth, removeUser);
router.get('/api/auth/findADonor', auth, findADonor);
router.patch('/api/auth/registerAsDonor', auth, registerAsADonor);

module.exports = router;
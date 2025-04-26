
const router = require('express').Router();
const userControllers = require('../controllers/user');

// Register User 
router.post('/user/register', userControllers.register);

// Login User
router.post('/user/login', userControllers.login);

module.exports = router;
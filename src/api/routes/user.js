
const router = require('express').Router();
const userControllers = require('../controllers/user');

router.post('/user/register', userControllers.register);

router.post('/user/login', userControllers.login);

module.exports = router;
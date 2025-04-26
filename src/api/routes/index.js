
const router = require('express').Router();

router.use('/', require('./item'));
router.use('/', require('./user'));

module.exports = router;
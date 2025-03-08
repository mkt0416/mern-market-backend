
const router = require('express').Router();
const itemControllers = require('../controllers/item');
const auth = require('../utils/auth');

router.get('/', itemControllers.readAll);

router.get('/item/:id', itemControllers.readSingle);

router.post('/item/create', auth, itemControllers.create);

router.put('/item/update/:id', auth, itemControllers.update);

router.delete('/item/delete/:id', auth, itemControllers.delete);

module.exports = router;
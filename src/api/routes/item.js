
const router = require('express').Router();
const itemControllers = require('../controllers/item');
const auth = require('../utils/auth');

// Create Item
router.post('/item/create', auth, itemControllers.create);

// ReadAll Items 
router.get('/', itemControllers.readAll);

// ReadSingle Item 
router.get('/item/:id', itemControllers.readSingle);

// Update Item 
router.put('/item/update/:id', auth, itemControllers.update);

// Delete Item 
router.delete('/item/delete/:id', auth, itemControllers.delete);

module.exports = router;
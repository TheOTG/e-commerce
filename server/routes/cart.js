const express = require('express');
const router = express.Router();
const Cart = require('../controllers/cart');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

router.use(authenticate);

router.post('/', Cart.create);

router.delete('/:id', authorize, Cart.delete);

router.put('/:id/addProduct', authorize, Cart.addProduct);

router.put('/:id/subtractProduct', authorize, Cart.subtractProduct);

router.delete('/:id/deleteProduct', authorize, Cart.removeProduct);

module.exports = router;

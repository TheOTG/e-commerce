const express = require('express');
const router = express.Router();
const Cart = require('../controllers/cart');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorizeCart');

router.use(authenticate);

router.post('/', Cart.create);

router.delete('/:id', authorize, Cart.delete);

router.put('/:id/addProduct', authorize, Cart.addProduct);

router.put('/:id/addQuantity', authorize, Cart.addQuantity);

router.put('/:id/subtractQuantity', authorize, Cart.subtractQuantity);

router.delete('/:id/deleteProduct', authorize, Cart.removeProduct);

module.exports = router;

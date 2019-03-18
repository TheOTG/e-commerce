const express = require('express');
const router = express.Router();
const Product = require('../controllers/product');

router.get('/', Product.list);

router.get('/:id', Product.findOne);

router.post('/', Product.create);

router.put('/:id', Product.update);

router.delete('/:id', Product.delete);

module.exports = router;

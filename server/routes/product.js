const express = require('express');
const router = express.Router();
const Product = require('../controllers/product');
const image = require('../middlewares/image');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorizeProduct');

router.get('/', Product.list);

router.get('/myList', authenticate, Product.myProducts);

router.get('/:id', Product.findOne);

router.use(authenticate);

router.post('/', image.multer.single('file'), image.sendUploadToGCS, Product.create);

router.put('/:id', authorize, image.multer.single('file'), image.sendUploadToGCS, Product.update);

router.delete('/:id', authorize, Product.delete);

module.exports = router;

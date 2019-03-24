const Product = require('../models/product');

class ProductController {
    static list(req, res) {
        Product
            .find({})
            .populate('seller')
            .then(products => {
                res.status(200).json(products);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }

    static create(req, res) {
        let imageUrl = null
        if(req.file) {
            imageUrl = req.file.cloudStoragePublicUrl
            req.body.image = imageUrl
        }
        Product
            .create({
                ...req.body,
                seller: req.user,
            })
            .then(product => {
                res.status(201).json(product);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }

    static myProducts(req, res) {
        Product
            .find({
                seller: req.user
            })
            .populate('seller')
            .then(products => {
                res.status(200).json(products);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    }

    static findOne(req, res) {
        Product
            .findOne({
                _id: req.params.id
            })
            .populate('seller')
            .then(product => {
                res.status(200).json(product);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }

    static update(req, res) {
        let imageUrl = null
        if(req.file) {
            imageUrl = req.file.cloudStoragePublicUrl
            req.body.image = imageUrl
        }
        Product
            .findByIdAndUpdate({
                _id: req.params.id
            }, {
                ...req.body
            }, {
                new: true,
                runValidators: true
            })
            .then(product => {
                res.status(200).json(product);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }

    static delete(req, res) {
        Product
            .deleteOne({
                _id: req.params.id
            })
            .then(() => {
                res.status(200).json({
                    message: 'Product successfully deleted'
                })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = ProductController;
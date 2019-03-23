const Product = require('../models/product');

class ProductController {
    static list(req, res) {
        Product
            .find({})
            .then(products => {
                res.status(200).json(products);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }

    static create(req, res) {
        Product
            .create({
                ...req.body
            })
            .then(product => {
                res.status(201).json(product);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }

    static findOne(req, res) {
        Product
            .findOne({
                _id: req.params.id
            })
            .then(product => {
                res.status(200).json(product);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }

    static update(req, res) {
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
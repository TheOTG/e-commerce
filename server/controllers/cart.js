const Cart = require('../models/cart')

class CartController {
    static create(req, res) {
        Cart
            .create({
                ...req.body
            })
            .then(cart => {
                res.status(201).json(cart);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }

    static delete(req, res) {
        Cart
            .deleteOne({
                _id: req.params.id
            })
            .then(() => {
                res.status(200).json({
                    message: 'Cart successfully deleted'
                })
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }

    static addProduct(req, res) {
        Cart
            .findOneAndUpdate({
                _id: req.params.id
            }, {
                $push: {
                    products: {
                        productId: req.body.product,
                        quantity: 1
                    }
                }
            }, {
                upsert: true,
                new: true
            })
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }

    static addQuantity(req, res) {
        Cart
            .findOneAndUpdate({
                _id: req.params.id,
                'products.productId': req.body.product
            }, {
                $inc: {
                    'products.$.quantity': 1
                }
            }, {
                new: true
            })
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }

    static subtractQuantity(req, res) {
        Cart
            .findOneAndUpdate({
                _id: req.params.id,
                'products.productId': req.body.product
            }, {
                $inc: {
                    'products.$.quantity': -1
                }
            }, {
                new: true
            })
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }

    static removeProduct(req, res) {
        Cart
            .findOneAndUpdate({
                _id: req.params.id,
                'products.productId': req.body.product
            }, {
                $unset: {
                    'products.$': null
                }
            }, {
                new: true
            })
            .then(result => {
                return Cart
                    .findOneAndUpdate({
                        _id: req.params.id
                    }, {
                        $pull: {
                            products: null
                        }
                    }, {
                        new: true
                    });
            })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                console.log(err.message)
                res.status(500).json(err);
            });
    }
}

module.exports = CartController
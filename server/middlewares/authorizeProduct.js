const Product = require('../models/product')

module.exports = function(req, res, next) {
    try {
        Product.findOne({
            _id: req.params.id
        })
        .then(product => {
            if(product.seller.toString() === req.user.toString()) {
                next();
            } else {
                throw new Error(`Forbidden`);
            }
        })
        .catch(err => {
            res.status(403).json({
                message: err.message
            });
        });
    } catch(err) {
        res.status(403).json({
            message: 'Forbidden'
        });
    }
}
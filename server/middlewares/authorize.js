const Cart = require('../models/cart')

module.exports = function(req, res, next) {
    try {
        Cart.findOne({
            _id: req.params.id
        })
        .then(cart => {
            if(cart.owner.toString() === req.user.toString()) {
                next()
            } else {
                throw new Error(`Forbidden`)
            }
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        })
    } catch(err) {
        res.status(403).json({
            message: 'Forbidden'
        })
    }
}
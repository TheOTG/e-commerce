const Cart = require('../models/cart')

module.exports = function(req, res, next) {
    try {
        Cart.findOne({
            _id: req.params.id
        })
        .then(cart => {
            console.log(cart.owner)
            console.log(req.user.toString())
            if(cart.owner.toString() === req.user.toString()) {
                next()
            } else {
                throw new Error(`Forbidden`)
            }
        })
        .catch(err => {
            res.status(403).json({
                message: err.message
            })
        })
    } catch(err) {
        res.status(403).json({
            message: 'Forbidden'
        })
    }
}
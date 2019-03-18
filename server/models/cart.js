const mongoose = require('mongoose')
const Schema = mongoose.Schema

let cartSchema = new Schema({
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }
})

let Cart = mongoose.model('Carts', cartSchema)

module.exports = Cart
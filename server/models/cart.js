const mongoose = require('mongoose')
const Schema = mongoose.Schema

let cartSchema = new Schema({
    products: [{
        quantity: {
            type: Number,
            required: [true, 'Quantity is required'],
            min: [1, 'Invalid input']
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products',
            required: [true, 'Product is required']
        }
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }
})

let Cart = mongoose.model('Carts', cartSchema)

module.exports = Cart
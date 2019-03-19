const mongoose = require('mongoose')
const Schema = mongoose.Schema

let productSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Product name is required']
    },
    price: {
      type: Number,
      required: [true, 'Price is required']
    }
})

const Product = mongoose.model('Products', productSchema)

module.exports = Product
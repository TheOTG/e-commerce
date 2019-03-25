require('dotenv').config()
const express = require('express');
const productRouter = require('./routes/product');
const cartRouter = require('./routes/cart');
const userRouter = require('./routes/user');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

// mongoose.connect(`mongodb://localhost/${DB_NAME}`, { useNewUrlParser: true });
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DATABASE}?retryWrites=true`, { useNewUrlParser: true })

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/products', productRouter);
app.use('/cart', cartRouter);
app.use('/user', userRouter)

module.exports = app;

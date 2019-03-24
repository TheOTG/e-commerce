require('dotenv').config()
const express = require('express');
const productRouter = require('./routes/product');
const cartRouter = require('./routes/cart');
const userRouter = require('./routes/user');
const mongoose = require('mongoose');
const cors = require('cors');

const DB_NAME = process.env.MONGO_DATABASE;

mongoose.connect(`mongodb://localhost/${DB_NAME}`, { useNewUrlParser: true });

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/products', productRouter);
app.use('/cart', cartRouter);
app.use('/user', userRouter)

module.exports = app;

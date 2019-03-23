const chai = require('chai');
const chaihttp = require('chai-http');
const app = require('../app');
const should = chai.should();
const db = require('../helpers/dropCollection');

chai.use(chaihttp);

let productId = null;

describe('/POST products', function() {
    before('create product', function() {
        db.dropCollection('product');
    });
    describe('success', function() {
        it('should return an object and status 201', function(done) {
            chai
                .request(app)
                .post('/products')
                .send({
                    name: 'Samsung S9',
                    price: 8000000,
                    image: 'image link to google cloud storage',
                    stock: 10
                })
                .then(response => {
                    response.should.have.status(201);
                    response.body.should.be.an('object');
                    response.body.should.have.property('name');
                    response.body.name.should.equal('Samsung S9');
                    response.body.should.have.property('price');
                    response.body.price.should.equal(8000000);
                    response.body.should.have.property('image');
                    response.body.image.should.equal('image link to google cloud storage');
                    response.body.should.have.property('stock');
                    response.body.stock.should.equal(10);
                    productId = response.body._id
                    done();
                })
                .catch(err => {
                    console.log(err);
                });
        });
    });
    describe('fail', function() {
        it('should return an error and status 500', function(done) {
            chai
                .request(app)
                .post('/products')
                .send({
                    name: '',
                    price: '',
                    stock: ''
                })
                .then(response => {
                    response.should.have.status(500);
                    response.body.should.have.property('errors');
                    response.body.errors.should.have.property('name');
                    response.body.errors.name.message.should.equal('Product name is required');
                    response.body.errors.should.have.property('price');
                    response.body.errors.price.message.should.equal('Price is required');
                    response.body.errors.should.have.property('stock');
                    response.body.errors.stock.message.should.equal('Stock is required');
                    done();
                })
                .catch(err => {
                    console.log(err);
                });
        });
        it('should return an error and status 500', function(done) {
            chai
                .request(app)
                .post('/products')
                .send({
                    name: '',
                    price: -1,
                    stock: -1
                })
                .then(response => {
                    response.should.have.status(500);
                    response.body.should.have.property('errors');
                    response.body.errors.should.have.property('name');
                    response.body.errors.name.message.should.equal('Product name is required');
                    response.body.errors.should.have.property('price');
                    response.body.errors.price.message.should.equal('Invalid input');
                    response.body.errors.should.have.property('stock');
                    response.body.errors.stock.message.should.equal('Invalid input');
                    done();
                })
                .catch(err => {
                    console.log(err);
                });
        });
    });
});

describe('/GET products', function() {
    describe('success', function() {
        it('should return an array and status 200', function(done) {
            chai
                .request(app)
                .get('/products')
                .then(response => {
                    response.should.have.status(200);
                    response.body.should.be.an('array');
                    done();
                })
                .catch(err => {
                    console.log(err);
                });
        });
    });
});

describe('/GET products/:id', function() {
    describe('success', function() {
        it('should return an object and status 200', function(done) {
            chai
                .request(app)
                .get(`/products/${productId}`)
                .then(response => {
                    response.should.have.status(200);
                    response.body.should.be.an('object');
                    response.body.should.have.property('name');
                    response.body.should.have.property('price');
                    done();
                })
                .catch(err => {
                    console.log(err);
                });
        });
    });
});

describe('/PUT products/:id', function() {
    describe('success', function() {
        it('should return an object and status 200', function(done) {
            chai
                .request(app)
                .put(`/products/${productId}`)
                .send({
                    name: 'Vivo 1714',
                    price: 4000000,
                    image: 'new image link',
                    stock: 20
                })
                .then(response => {
                    response.should.have.status(200);
                    response.body.should.have.property('name');
                    response.body.name.should.equal('Vivo 1714');
                    response.body.should.have.property('price');
                    response.body.price.should.equal(4000000);
                    response.body.should.have.property('image');
                    response.body.image.should.equal('new image link');
                    response.body.should.have.property('stock');
                    response.body.stock.should.equal(20);
                    done();
                })
                .catch(err => {
                    console.log(err);
                });
        });
    });
    describe('fail', function() {
        it('should return an error and status 500', function(done) {
            chai
                .request(app)
                .put(`/products/${productId}`)
                .send({
                    name: '',
                    price: -100,
                    stock: -1
                })
                .then(response => {
                    response.should.have.status(500);
                    response.body.should.have.property('errors');
                    response.body.errors.should.have.property('name');
                    response.body.errors.name.message.should.equal('Product name is required');
                    response.body.errors.should.have.property('price');
                    response.body.errors.price.message.should.equal('Invalid input');
                    response.body.errors.should.have.property('stock');
                    response.body.errors.stock.message.should.equal('Invalid input');
                    done();
                })
                .catch(err => {
                    console.log(err);
                });
        });
    });
});

describe('/DELETE products/:id', function() {
    describe('success', function() {
        it('should return an object and status 200', function(done) {
            chai
                .request(app)
                .delete(`/products/${productId}`)
                .then(response => {
                    response.should.have.status(200);
                    response.body.should.have.property('message');
                    response.body.message.should.equal('Product successfully deleted');
                    done();
                })
                .catch(err => {
                    console.log(err);
                });
        });
    });
});

describe('/GET products', function() {
    describe('fail', function() {
        it('should return an empty array and status code 200', function(done) {
            chai
                .request(app)
                .get('/products')
                .then(response => {
                    response.should.have.status(200);
                    response.body.should.be.an('array');
                    response.body.length.should.equal(0);
                    done();
                })
                .catch(err => {
                    console.log(err);
                });
        });
    });
});
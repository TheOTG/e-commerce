const chai = require('chai');
const chaihttp = require('chai-http');
const app = require('../app');
const should = chai.should();

chai.use(chaihttp);

let cartId = null;

let productId = '5c8f38e7f0ece549dd1bd83d';

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjOGY3YzQ3MTExNzA5N2E5M2ViMTVlNCIsImlhdCI6MTU1MjkwNzc5M30.qZUBYkrMdWua_1zMNgcD20i-eTytajFIhW3wy-ynhnw';

let owner = '5c8f7c471117097a93eb15e4';

describe('/POST cart', function() {
    describe('success', function() {
        it('should create a cart and return an object and status 200', function(done) {
            chai
                .request(app)
                .post('/cart')
                .set('access_token', token)
                .send({
                    products: [{
                        quantity: 1,
                        productId
                    }],
                    owner
                })
                .then(response => {
                    response.should.have.status(201);
                    response.body.should.have.property('products');
                    response.body.products[0].should.have.property('quantity');
                    response.body.products[0].quantity.should.equal(1);
                    response.body.products[0].should.have.property('productId');
                    response.body.products[0].productId.toString().should.equal(productId);
                    response.body.should.have.property('owner');
                    response.body.owner.toString().should.equal(owner);
                    cartId = response.body._id;
                    done();
                })
                .catch(err => {
                    console.log(err);
                });
        });
    });
    describe('fail because no token', function() {
        it('should return an error and status 401', function(done) {
            chai
                .request(app)
                .post('/cart')
                .send({
                    products: [{
                        quantity: 1,
                        productId
                    }],
                    owner
                })
                .then(response => {
                    response.should.have.status(401);
                    response.body.should.have.property('message');
                    response.body.message.should.equal('Unauthorized');
                    done();
                })
                .catch(err => {
                    console.log(err);
                });
        });
    });
});

describe('/PUT cart/:id/addQuantity', function() {
    describe('success', function() {
        it('should add a product to the cart and return the updated cart and status 200', function(done) {
            chai
                .request(app)
                .put(`/cart/${cartId}/addQuantity`)
                .set('access_token', token)
                .send({
                    product: productId
                })
                .then(response => {
                    response.should.have.status(200);
                    response.body.should.have.property('products');
                    response.body.products[0].quantity.should.equal(2);
                    done();
                })
                .catch(err => {
                    console.log(err);
                })
        });
        describe('fail because no token', function() {
            it('should return an error and status 401', function(done) {
                chai
                    .request(app)
                    .put(`/cart/${cartId}/addQuantity`)
                    .send({
                        product: productId
                    })
                    .then(response => {
                        response.should.have.status(401);
                        response.body.should.have.property('message');
                        response.body.message.should.equal('Unauthorized');
                        done();
                    })
                    .catch(err => {
                        console.log(err);
                    });
            });
        });
        describe('fail because different user', function() {
            it('should return an error and status 401', function(done) {
                chai
                    .request(app)
                    .put(`/cart/${cartId}/addQuantity`)
                    .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjOGY3YzQ3MTExNzA5N2E5M2ViMTVlNSIsImlhdCI6MTU1MjkwNzc5M30.cRD95eChAnMU7v7uTuZ0SUMIAWmbA3C26w_-K062EE4')
                    .send({
                        product: productId
                    })
                    .then(response => {
                        response.should.have.status(403);
                        response.body.should.have.property('message');
                        response.body.message.should.equal('Forbidden');
                        done();
                    })
                    .catch(err => {
                        console.log(err);
                    });
            });
        });
    });
});

describe('/PUT cart/:id/subtractQuantity', function() {
    describe('success', function() {
        it('should subtract a product from a cart and return the updated cart and status 200', function(done) {
            chai
                .request(app)
                .put(`/cart/${cartId}/subtractQuantity`)
                .set('access_token', token)
                .send({
                    product: productId
                })
                .then(response => {
                    response.should.have.status(200);
                    response.body.should.have.property('products');
                    response.body.products[0].quantity.should.equal(1);
                    done();
                })
                .catch(err => {
                    console.log(err);
                });
        });
    });
    describe('fail because no token', function() {
        it('should return an error and status 401', function(done) {
            chai
                .request(app)
                .put(`/cart/${cartId}/subtractQuantity`)
                .send({
                    products: productId,
                })
                .then(response => {
                    response.should.have.status(401);
                    response.body.should.have.property('message');
                    response.body.message.should.equal('Unauthorized');
                    done();
                })
                .catch(err => {
                    console.log(err);
                });
        });
    });
    describe('fail because different user', function() {
        it('should return an error and status 401', function(done) {
            chai
                .request(app)
                .put(`/cart/${cartId}/addQuantity`)
                .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjOGY3YzQ3MTExNzA5N2E5M2ViMTVlNSIsImlhdCI6MTU1MjkwNzc5M30.cRD95eChAnMU7v7uTuZ0SUMIAWmbA3C26w_-K062EE4')
                .send({
                    products: productId,
                    owner
                })
                .then(response => {
                    response.should.have.status(403);
                    response.body.should.have.property('message');
                    response.body.message.should.equal('Forbidden');
                    done();
                })
                .catch(err => {
                    console.log(err);
                });
        });
    });
});

describe('/PUT cart/:id/addProduct', function() {
    describe('success', function() {
        it('should add a product to the cart and return the updated cart and status 200', function(done) {
            chai
                .request(app)
                .put(`/cart/${cartId}/addProduct`)
                .set('access_token', token)
                .send({
                    product: '5c8f38e7f0ece549dd1bd83e'
                })
                .then(response => {
                    console.log(response.body)
                    response.should.have.status(200);
                    response.body.should.have.property('products');
                    response.body.products.length.should.equal(2);
                    done();
                })
                .catch(err => {
                    console.log(err);
                })
        });
        describe('fail because no token', function() {
            it('should return an error and status 401', function(done) {
                chai
                    .request(app)
                    .put(`/cart/${cartId}/addQuantity`)
                    .send({
                        product: productId
                    })
                    .then(response => {
                        response.should.have.status(401);
                        response.body.should.have.property('message');
                        response.body.message.should.equal('Unauthorized');
                        done();
                    })
                    .catch(err => {
                        console.log(err);
                    });
            });
        });
        describe('fail because different user', function() {
            it('should return an error and status 401', function(done) {
                chai
                    .request(app)
                    .put(`/cart/${cartId}/addQuantity`)
                    .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjOGY3YzQ3MTExNzA5N2E5M2ViMTVlNSIsImlhdCI6MTU1MjkwNzc5M30.cRD95eChAnMU7v7uTuZ0SUMIAWmbA3C26w_-K062EE4')
                    .send({
                        product: productId
                    })
                    .then(response => {
                        response.should.have.status(403);
                        response.body.should.have.property('message');
                        response.body.message.should.equal('Forbidden');
                        done();
                    })
                    .catch(err => {
                        console.log(err);
                    });
            });
        });
    });
});

describe('/DELETE cart/:id/deleteProduct', function() {
    describe('success', function() {
        it('should delete a product from a cart and return the updated cart and status 200', function(done) {
            chai
                .request(app)
                .delete(`/cart/${cartId}/deleteProduct`)
                .set('access_token', token)
                .send({
                    product: productId
                })
                .then(response => {
                    response.should.have.status(200);
                    response.body.should.have.property('products');
                    response.body.products.length.should.equal(1);
                    done();
                })
                .catch(err => {
                    console.log(err);
                });
        });
    });
    describe('fail because no token', function() {
        it('should return an error and status 401', function(done) {
            chai
                .request(app)
                .delete(`/cart/${cartId}/deleteProduct`)
                .send({
                    product: productId
                })
                .then(response => {
                    response.should.have.status(401);
                    response.body.should.have.property('message');
                    response.body.message.should.equal('Unauthorized');
                    done();
                })
                .catch(err => {
                    console.log(err);
                });
        });
    });
    describe('fail because different user', function() {
        it('should return an error and status 403', function(done) {
            chai
                .request(app)
                .delete(`/cart/${cartId}/deleteProduct`)
                .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjOGY3YzQ3MTExNzA5N2E5M2ViMTVlNSIsImlhdCI6MTU1MjkwNzc5M30.cRD95eChAnMU7v7uTuZ0SUMIAWmbA3C26w_-K062EE4')
                .send({
                    product: productId
                })
                .then(response => {
                    response.should.have.status(403);
                    response.body.should.have.property('message');
                    response.body.message.should.equal('Forbidden');
                    done();
                })
                .catch(err => {
                    console.log(err);
                });
        });
    });
});

describe('/DELETE cart/:id', function() {
    describe('fail because no token', function() {
        it('should return an error and status 401', function(done) {
            chai
                .request(app)
                .delete(`/cart/${cartId}`)
                .then(response => {
                    response.should.have.status(401);
                    response.body.should.have.property('message');
                    response.body.message.should.equal('Unauthorized');
                    done();
                })
                .catch(err => {
                    console.log(err);
                });
        });
    });
    describe('fail because different user', function() {
        it('should return an error and status 401', function(done) {
            chai
                .request(app)
                .delete(`/cart/${cartId}`)
                .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjOGY3YzQ3MTExNzA5N2E5M2ViMTVlNSIsImlhdCI6MTU1MjkwNzc5M30.cRD95eChAnMU7v7uTuZ0SUMIAWmbA3C26w_-K062EE4')
                .then(response => {
                    response.should.have.status(403);
                    response.body.should.have.property('message');
                    response.body.message.should.equal('Forbidden');
                    done();
                })
                .catch(err => {
                    console.log(err);
                });
        });
    });
    describe('success', function() {
        it('should delete a cart and return a message and status 200', function(done) {
            chai
                .request(app)
                .delete(`/cart/${cartId}`)
                .set('access_token', token)
                .then(response => {
                    response.should.have.status(200);
                    response.body.should.have.property('message');
                    response.body.message.should.equal('Cart successfully deleted');
                    done();
                })
                .catch(err => {
                    console.log(err);
                });
        });
    });
});
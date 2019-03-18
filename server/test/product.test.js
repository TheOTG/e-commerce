const chai = require('chai');
const chaihttp = require('chai-http');
const app = require('../app');
const should = chai.should();

chai.use(chaihttp);

let productId = null;

describe('/POST products', function() {
    describe('success', function() {
        it('should return an object and status 201', function(done) {
            chai
                .request(app)
                .post('/products')
                .send({
                    name: 'Samsung S9',
                    price: 8000000
                })
                .then(response => {
                    response.should.have.status(201);
                    response.body.should.be.an('object');
                    response.body.should.have.property('name');
                    response.body.name.should.equal('Samsung S9');
                    response.body.should.have.property('price');
                    response.body.price.should.equal(8000000);
                    productId = response.body._id
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
                    price: 4000000
                })
                .then(response => {
                    response.should.have.status(200);
                    response.body.should.have.property('name');
                    response.body.name.should.equal('Vivo 1714');
                    response.body.should.have.property('price');
                    response.body.price.should.equal(4000000);
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
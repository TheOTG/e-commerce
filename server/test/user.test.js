const chai = require('chai');
const chaihttp = require('chai-http');
const app = require('../app');
const should = chai.should();
const db = require('../helpers/dropCollection');

chai.use(chaihttp);

describe('/POST user/register', function() {
    before('register test', function() {
        db.dropCollection('user');
    });
    describe('success', function() {
        it('should create a new user with a hashed password and return an object and status 201', function(done) {
            chai
                .request(app)
                .post('/user/register')
                .send({
                    email: 'ken@mail.com',
                    password: '123456'
                })
                .then(response => {
                    response.should.have.status(201);
                    response.body.should.be.an('object');
                    response.body.should.have.property('email');
                    response.body.email.should.equal('ken@mail.com');
                    response.body.should.have.property('password');
                    response.body.password.should.not.equal('123456');
                    done();
                })
                .catch(err => {
                    console.log(err)
                });
        });
    });
    describe('fail', function() {
        it('should return an error message and status 500', function(done) {
            chai
                .request(app)
                .post('/user/register')
                .send({
                    email: 'ken@mail.com',
                    password: '1'
                })
                .then(response => {
                    response.should.have.status(500);
                    response.body.should.have.property('errors');
                    response.body.errors.should.have.property('email');
                    response.body.errors.email.message.should.equal('Email has been used');
                    response.body.errors.should.have.property('password');
                    response.body.errors.password.message.should.equal('Password minimum length must be 6')
                    done();
                });
        });
        it('should return an error message and status 500', function(done) {
            chai
                .request(app)
                .post('/user/register')
                .send({
                    email: 'a@a',
                    password: ''
                })
                .then(response => {
                    response.should.have.status(500);
                    response.body.should.have.property('errors');
                    response.body.errors.should.have.property('email');
                    response.body.errors.email.message.should.equal('Invalid email format');
                    response.body.errors.should.have.property('password');
                    response.body.errors.password.message.should.equal('Password is required')
                    done();
                });
        });
        it('should return an error message and status 500', function(done) {
            chai
                .request(app)
                .post('/user/register')
                .send({
                    email: '',
                    password: ''
                })
                .then(response => {
                    response.should.have.status(500);
                    response.body.should.have.property('errors');
                    response.body.errors.should.have.property('email');
                    response.body.errors.email.message.should.equal('Email is required');
                    response.body.errors.should.have.property('password');
                    response.body.errors.password.message.should.equal('Password is required')
                    done();
                });
        });
    });
});

describe('/POST user/login', function() {
    describe('success', function() {
        it('should return a jwt token and status 200', function(done) {
            chai
                .request(app)
                .post('/user/login')
                .send({
                    email: 'ken@mail.com',
                    password: '123456'
                })
                .then(response => {
                    response.should.have.status(200);
                    response.body.should.be.a('string');
                    done();
                })
                .catch(err => {
                    console.log(err);
                });
        });
    });
    describe('fail', function() {
        it('should return an error and status 400', function(done) {
            chai
                .request(app)
                .post('/user/login')
                .send({
                    email: 'ken@mail.com',
                    password: '123111'
                })
                .then(response => {
                    response.should.have.status(400);
                    response.body.should.have.property('message');
                    response.body.message.should.equal('Wrong username/password');
                    done();
                })
                .catch(err => {
                    console.log(err)
                });
        });
        it('should return an error and status 400', function(done) {
            chai
                .request(app)
                .post('/user/login')
                .send({
                    email: 'kenn@mail.com',
                    password: '123456'
                })
                .then(response => {
                    response.should.have.status(400);
                    response.body.should.have.property('message');
                    response.body.message.should.equal('Wrong username/password');
                    done();
                })
                .catch(err => {
                    console.log(err)
                });
        });
        it('should return an error and status 400', function(done) {
            chai
                .request(app)
                .post('/user/login')
                .send({
                    email: '',
                    password: ''
                })
                .then(response => {
                    response.should.have.status(400);
                    response.body.should.have.property('message');
                    response.body.message.should.equal('Wrong username/password');
                    done();
                })
                .catch(err => {
                    console.log(err)
                });
        });
        after('login test', function() {
            db.dropCollection('user');
        });
    });
});
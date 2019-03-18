const chai = require('chai');
const chaihttp = require('chai-http');
const app = require('../app');
const should = chai.should();

chai.use(chaihttp);

describe('/POST user/register', function() {
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
});
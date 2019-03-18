const User = require('../models/user');
const bcrypt = require('../helpers/bcrypt');
const jwt = require('../helpers/jwt');

class UserController {
    static register(req, res) {
        User.create({
            ...req.body
        })
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            res.status(500).json(err);
        });
    }

    static login(req, res) {
        const { email, password } = req.body
        User.findOne({
            email
        })
        .then(user => {
            if(user && bcrypt.compare(password, user.password)) {
                const payload = { id: user._id };
                const access_token = jwt.sign(payload);
                res.status(200).json(access_token);
            } else {
                res.status(400).json({
                    message: 'Wrong username/password'
                });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
    }
}

module.exports = UserController
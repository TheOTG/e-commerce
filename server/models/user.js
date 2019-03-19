const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('../helpers/bcrypt');

let userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: [
            {
                validator: function(value) {
                    return /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(value);
                },
                message: 'Invalid email format'
            },
            {
                validator: function(value) {
                    return mongoose.model('Users', userSchema).find({
                        _id: {
                            $ne: this._id
                        },
                        email: value
                    })
                    .then(data => {
                        if(data.length !== 0) {
                            return false;
                        }
                    })
                    .catch(err => {
                        return err.message;
                    });
                },
                message: 'Email has been used'
            }
        ]
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        validate: [
            {
                validator: function(value) {
                    return value.length >= 6;
                },
                message: 'Password minimum length must be 6'
            }
        ]
    }
});

userSchema.post('validate', function(doc) {
    this.password = bcrypt.hash(this.password);
    this.email = this.email.toLowerCase();
})

let User = mongoose.model('Users', userSchema);

module.exports = User;
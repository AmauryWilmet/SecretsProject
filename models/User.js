let mongoose = require('mongoose');
let encrypt = require('mongoose-encryption');
require('dotenv').config();

let userSchema = new mongoose.Schema({
    email: String,
    password: String
});

let secret = process.env.SECRET;
userSchema.plugin(encrypt, {secret: secret, encryptedFields: ['password']});

module.exports = mongoose.model('User', userSchema);
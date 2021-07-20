let mongoose = require('mongoose');
let encrypt = require('mongoose-encryption');

let userSchema = new mongoose.Schema({
    email: String,
    password: String
});

let secret = "RickItsVeryIntelligent.";
userSchema.plugin(encrypt, {secret: secret, encryptedFields: ['password']});

module.exports = mongoose.model('User', userSchema);
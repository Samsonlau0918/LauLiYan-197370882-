const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validemailFromat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        unique: true,
        required: true,
        match: validemailFromat
    },
    username: {
        type: String,
        required: true
    }, 
    password: {
        type: String,
        required: true,
    }
});
 
module.exports = mongoose.model('users', userSchema);
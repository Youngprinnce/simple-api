const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        maxlength: 30,
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        maxlength: 30,
        trim: true,
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        required: [true, 'Email is required'],
    },
    mobile: {
        type: Number,
        required: true,
    } 
});

module.exports = mongoose.model('User', UserSchema);

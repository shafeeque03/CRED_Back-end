const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    }
})

const user = mongoose.model('user',userSchema);
module.exports = user
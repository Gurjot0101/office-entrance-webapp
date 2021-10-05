const mongoose = require("mongoose");

const UserdataSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: Number,
        required: true,
        trim: true
    },
    date: {
        type: String,
        required: true
    },
    time_i: {
        type: String,
        required: true,
    },
    time_o: {
        type: String,
        default: '-'
    },
    status: {
        type: String,
        default: 'Not in-Office'
    }
})

const Userdata = mongoose.model('Userdata', UserdataSchema);

module.exports = Userdata;
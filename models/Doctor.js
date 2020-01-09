const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    practice_name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    new_patients: {
        type: String,
        default: 'Yes'
    },
    grad_year: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Doctor', doctorSchema);
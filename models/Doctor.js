const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: [true, 'Please tell us your full_name']
    },
    category: {
        type: String,
        required: [true, 'Please select a category']
    },
    practice_name: {
        type: String,
        required: [true, 'Please tell us your practice_name']
    },
    city: {
        type: String,
        required: [true, 'Please tell us your city']
    },
    state: {
        type: String,
        required: [true, 'Please tell us your state']
    },
    new_patients: {
        type: String,
        default: 'Yes'
    },
    grad_year: {
        type: Number,
        required: [true, 'Please provide your graduation year']
    }
});

module.exports = mongoose.model('Doctor', doctorSchema);
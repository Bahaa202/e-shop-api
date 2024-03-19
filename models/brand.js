const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    image:{
        type: String,
    },
    name: {
    type: String,
    required: true,
    unique: true
    },
    description: String,
    createdAt: {
    type: Date,
    default: Date.now
    }
});

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;

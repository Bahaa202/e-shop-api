const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
        },
        quantity: {
        type: Number,
        required: true,
        min: 1
        }
    }],
    status: {
    type: String,
    required: true,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending'
    },
    createdAt: {
    type: Date,
    default: Date.now
    },
    totalAmount: {
    type: Number,
    required: true
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

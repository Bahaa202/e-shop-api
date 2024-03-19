const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    passwordHash: {type: 'string', required: true},
    role: {
        type: String,
        enum: ['user', 'admin'], // Adjust roles as needed
        default: 'user'
    },
    createdAt: {type: Date, default: Date.now}
});

userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

userSchema.set('toJSON', {
    virtuals: true,
});

exports.User = mongoose.model('User', userSchema);
exports.userSchema = userSchema;

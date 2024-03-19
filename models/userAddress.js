const mongoose = require('mongoose');

// const userAddressSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   userAddress:[
//     {
//       street: {type: String},
//       city: {type: String},
//       state: {type: String},
//       country: {type: String},
//     }
//   ],
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

const userAddressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  Address: [{
    street: {
      type: String
    },
    city: {
      type: String,
    },
    governorate:{
      type: String,
    },
    country: {
      type: String,
      default: 'Egypt'
    }
  }],
  createdAt: {
        type: Date,
        default: Date.now
      }
});

const UserAddress = mongoose.model('UserAddress', userAddressSchema);

module.exports = UserAddress;

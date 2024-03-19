const express = require('express');
const router = express.Router();
const UserAddress = require('../models/userAddress');

// Get all addresses for a user
router.get('/:userId', async (req, res) => {
  try {
    const addresses = await UserAddress.find({ user: req.params.userId });
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new address for a user
router.post('/:userId', async (req, res) => {
  try {
    const { userId, Address } = req.body;
    const userAddress = new UserAddress({
    userId,
    Address
  });
  await userAddress.save();
  
  res.status(201).json(userAddress);
} catch (error) {
  res.status(500).json({ message: error.message });
}
});

// Update an address for a user
router.patch('/:userId/:addressId', async (req, res) => {
  try {
    const address = await UserAddress.findByIdAndUpdate(req.params.addressId, req.body, { new: true });
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }
    res.json(address);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Delete an address for a user
router.delete('/:userId/:addressId', async (req, res) => {
  try {
    const address = await UserAddress.findById(req.params.addressId);
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }
    await address.remove();
    res.json({ message: 'Address deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

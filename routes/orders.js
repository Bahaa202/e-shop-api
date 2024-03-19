const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const stripe = require('stripe')(process.env.SECRET_KEY); // Set your Stripe secret key

const YOUR_DOMAIN = 'http://localhost:8080/orders';

// Create an order
router.post('/:userId', async (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
  try {
    const { products, totalAmount } = req.body;
    const order = new Order({
      userId:req.params.userId,
      products,
      totalAmount,
    });

    await order.save();

  } catch(err) {
    return res.status(500).json({success: false, error: err}) 
  }
});

// Get all orders for a user
router.get('/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).populate('items.product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an order status
router.patch('/:orderId', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (order == null) {
      return res.status(404).json({ message: 'Cannot find order' });
    }
    order.status = req.body.status || order.status;
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete an order
router.delete('/:orderId', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (order == null) {
      return res.status(404).json({ message: 'Cannot find order' });
    }
    await order.remove();
    res.json({ message: 'Deleted Order' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const User = require("../models/user");


router.post('/', async (req, res) => {
  try {
    const userId = req.user._id; // Retrieve user ID from token
    // Assuming you store the customer ID retrieved from Stripe in your User model
    const user = await User.findById(userId);
    if (!user.stripeCustomerId) return res.json({ message: 'No payment methods found' });

    const paymentMethods = await stripe.paymentMethods.list({
      customer: user.stripeCustomerId,
      type: 'card', // Retrieve only card payment methods (optional)
    });

    res.json(paymentMethods.data); // Return list of payment methods
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving payment methods', error: err.message });
  }
});


module.exports = router;

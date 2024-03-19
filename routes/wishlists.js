const Wishlist = require("../models/wishlist");
const express = require('express');
const router = require("express").Router();

//CREATE
router.post('/wishlist', async (req, res) => {
  try {
    const { userId, name, products } = req.body;

    // Create a new wishlist instance
    const newWishlist = new Wishlist({
      userId,
      name,
      products
    });

    // Save the wishlist to the database
    const savedWishlist = await newWishlist.save();

    // Send back the created wishlist
    res.status(201).json(savedWishlist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//UPDATE
router.patch(`/:id`, async (req, res) => {
  try {
    const updatedWishlist = await Wishlist.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedWishlist);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete(`/:id`, async (req, res) => {
  try {
    await Wishlist.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});


//GET USER CART
router.get("/find/:userId", async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.params.userId });
    res.status(200).json(wishlist);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL

router.get("/", async (req, res) => {
  try {
    const carts = await Wishlist.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

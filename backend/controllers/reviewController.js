// reviewController.js

import Product from '../models/productModel.js';

// GET /api/product/:productId/reviews
export const getReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    // Find product and populate or fetch reviews from a separate Review model if you have one
    const product = await Product.findById(productId).populate('reviews'); 
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.json(product.reviews || []);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

// POST /api/product/:productId/reviews
export const createReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const { rating, comment } = req.body;
    // Basic validation
    if (!rating || !comment) {
      return res.status(400).json({ message: 'Rating and comment are required' });
    }

    // Find the product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Create and push the review object 
    const newReview = {
      rating,
      comment,
      // Add user info if you have authentication (e.g., user: req.user._id)
    };

    product.reviews.push(newReview);
    await product.save();

    // Return the newly created review
    res.status(201).json(product.reviews[product.reviews.length - 1]);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

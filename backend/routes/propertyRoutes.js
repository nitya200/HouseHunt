const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { 
  createProperty, 
  getProperties, 
  updateProperty, 
  deleteProperty 
} = require('../controllers/propertyController');

// Public route
router.get('/', getProperties);

// Protected routes
router.post('/', authMiddleware, createProperty);
router.put('/:id', authMiddleware, updateProperty);
router.delete('/:id', authMiddleware, deleteProperty); // <-- This is what was missing!

module.exports = router;
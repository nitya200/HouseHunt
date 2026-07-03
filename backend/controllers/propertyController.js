const Property = require('../models/Property');

// @desc    Create a new property listing
// @route   POST /api/properties
// @access  Private (Requires Login)
exports.createProperty = async (req, res) => {
  try {
    const { title, description, location, price, type } = req.body;

    const property = new Property({
      title,
      description,
      location,
      price,
      type,
      owner: req.user.id
    });

    const createdProperty = await property.save();
    res.status(201).json(createdProperty);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while creating property' });
  }
};

// @desc    Get all properties
// @route   GET /api/properties
// @access  Public
exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate('owner', 'name email');
    res.json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching properties' });
  }
};

// @desc    Update a property
// @route   PUT /api/properties/:id
// @access  Private
exports.updateProperty = async (req, res) => {
  try {
    let property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Make sure user is the property owner OR an admin
    if (property.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized to update this property' });
    }

    property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while updating property' });
  }
};

// @desc    Delete a property
// @route   DELETE /api/properties/:id
// @access  Private
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Make sure user is the property owner OR an admin
    if (property.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized to delete this property' });
    }

    await property.deleteOne();
    res.json({ message: 'Property removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while deleting property' });
  }
};
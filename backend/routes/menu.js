const express = require('express');
const Menu = require('../models/Menu');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const menuItems = await Menu.find();
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  const { name, category, price, availability } = req.body;

  try {
    const newMenuItem = new Menu({
      name,
      category,
      price,
      availability: availability !== undefined ? availability : true,
    });
    
    await newMenuItem.save();
    res.status(201).json(newMenuItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const { name, category, price, availability } = req.body;
  
  try {
    const updatedMenuItem = await Menu.findByIdAndUpdate(
      req.params.id,
      { name, category, price, availability },
      { new: true }
    );
    
    if (!updatedMenuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    
    res.status(200).json(updatedMenuItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedMenuItem = await Menu.findByIdAndDelete(req.params.id);
    
    if (!deletedMenuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    
    res.status(200).json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

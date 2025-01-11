const express = require('express');
const Order = require('../models/Order');
const Menu = require('../models/Menu');
const mongoose = require('mongoose');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, async (req, res) => {
  const { items } = req.body;
  const userId = req.userId; 
console.log(items);
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Order must contain at least one item' });
  }

  try {
    const menuItems = await Menu.find({ '_id': { $in: items.map(item => item.menuItemId) } });

    if (menuItems.length !== items.length) {
      return res.status(400).json({ error: 'Some menu items are invalid' });
    }
    let totalAmount = 0;
    items.forEach(item => {
      const menuItem = menuItems.find(m => m._id.toString() === item.menuItemId);
      if (menuItem) {
        totalAmount += menuItem.price * item.quantity;
      }
    });
    const newOrder = new Order({
      userId,
      items,
      totalAmount,
      status: 'Pending',
      createdAt: new Date(),
    });

    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  const userId = req.userId; 

  try {
    const orders = await Order.find({ userId }).populate('items.menuItemId'); 
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

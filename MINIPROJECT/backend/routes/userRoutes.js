const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();
require('dotenv').config();

router.post('/signup', async (req, res) => {
  const { User_Name, Email, Password, confirmPassword, Phone } = req.body;

  if (!User_Name || !Email || !Password || !confirmPassword || !Phone) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (Password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ User_Name }, { Email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    const lastUser = await User.findOne().sort({ UserID: -1 });
    const newUserID = lastUser ? lastUser.UserID + 1 : 1;

    const newUser = new User({
      UserID: newUserID,
      User_Name,
      Email,
      Password,
      Phone,
      Expenses: []
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.post('/login', async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  if (!usernameOrEmail || !password) {
    return res.status(400).json({ message: 'Both fields are required' });
  }

  try {
    const user = await User.findOne({
      $or: [{ User_Name: usernameOrEmail }, { Email: usernameOrEmail }]
    });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (password !== user.Password) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'Aman', { expiresIn: '1h' });
    res.json({ token, userId: user._id, userName: user.User_Name });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

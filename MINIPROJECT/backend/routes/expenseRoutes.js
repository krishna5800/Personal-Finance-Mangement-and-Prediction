const express = require('express');
const router = express.Router();
const Expense = require('/models/Expense'); 

router.post('/api/expenses', async (req, res) => {
  try {
    const { amount, category, date } = req.body;

    const newExpense = new Expense({ amount, category, date });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(400).json({ message: 'Error adding expense', error });
  }
});

module.exports = router;

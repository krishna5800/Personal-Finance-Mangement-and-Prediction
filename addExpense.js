import React, { useState } from 'react';
import axios from 'axios';

const AddExpense = () => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/expenses', {
        amount,
        category,
        date
      });
      alert('Expense added successfully');
      setAmount('');
      setCategory('');
      setDate('');
    } catch (error) {
      console.error('Error adding expense:', error);
      alert('Failed to add expense');
    }
  };

  return (
    <div>
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            <option value="Food">Food</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Miscellaneous">Miscellaneous</option>
            <option value="Utilities">Utilities</option>
          </select>
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default AddExpense;

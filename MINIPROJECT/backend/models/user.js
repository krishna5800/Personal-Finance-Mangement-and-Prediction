const mongoose = require('mongoose');

// Expense sub-schema
const expenseSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true }
});

// Main user schema
const userSchema = new mongoose.Schema({
  UserID: { type: Number, required: true, unique: true },  
  User_Name: { type: String, required: true, unique: true },  
  Email: { type: String, required: true, unique: true }, 
  Phone: { type: String, required: true },
  Password: { type: String, required: true },
  Expenses: [expenseSchema]  
});


const User = mongoose.model('users', userSchema);  // Collection name is 'users'

module.exports = User;

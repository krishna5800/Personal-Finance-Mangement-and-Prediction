import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/add-expense">Add Expense</Link></li>
        <li><Link to="/update-account">Update Account</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

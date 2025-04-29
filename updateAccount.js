import React, { useState } from 'react';
import axios from 'axios';

const UpdateAccount = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      await axios.put('/api/updateAccount', {
        username,
        password
      });
      alert('Account updated successfully');
      setUsername('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error updating account:', error);
      alert('Failed to update account');
    }
  };

  return (
    <div>
      <h2>Update Account</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Account</button>
      </form>
    </div>
  );
};

export default UpdateAccount;

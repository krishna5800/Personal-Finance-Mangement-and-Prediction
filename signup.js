import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    User_Name: '',
    Email: '',
    Password: '',
    confirmPassword: '',
    Phone: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const { User_Name, Email, Password, confirmPassword, Phone } = formData;

    if (!User_Name.trim() || !Email.trim() || !Password.trim() || !confirmPassword.trim() || !Phone.trim()) {
      setErrorMessage('All fields are required');
      return;
    }

    if (Password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    const newUserData = {
      User_Name: User_Name.trim(),
      Email: Email.trim(),
      Password: Password.trim(),
      confirmPassword: confirmPassword.trim(),
      Phone: Phone.trim()
    };

    try {
      const response = await axios.post('http://localhost:5001/api/users/signup', newUserData);
      alert(response.data.message);
    } catch (error) {
      console.error('Signup error:', error);
      setErrorMessage(error.response?.data?.message || 'Signup failed. Try again.');
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleSubmit}>
        <h1>Create Account</h1>
        <div className="social-container">
          
          <button type="button" className="social" aria-label="Facebook">
            <i className="fab fa-facebook-f"></i>
          </button>
          <button type="button" className="social" aria-label="Google">
            <i className="fab fa-google-plus-g"></i>
          </button>
          <button type="button" className="social" aria-label="LinkedIn">
            <i className="fab fa-linkedin-in"></i>
          </button>
        </div>
        <span></span>
        <input
          type="text"
          name="User_Name"
          placeholder="Name"
          value={formData.User_Name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="Email"
          placeholder="Email"
          value={formData.Email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="Password"
          placeholder="Password"
          value={formData.Password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <input
          type="text"
          name="Phone"
          placeholder="Phone"
          value={formData.Phone}
          onChange={handleChange}
        />
        <button type="submit">Sign Up</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default Signup;


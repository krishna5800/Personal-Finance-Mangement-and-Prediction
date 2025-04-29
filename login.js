import React, { useState } from 'react';
import axios from 'axios';
import '/Volumes/AkDrive/MINIPROJECT/front_end/src/App.css'; 

const Login = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const { usernameOrEmail, password } = formData;

    if (!usernameOrEmail.trim() || !password.trim()) {
      setErrorMessage('Both fields are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5001/api/users/login', formData);

      
      const { token, userId, userName } = response.data;
      localStorage.setItem('authToken', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('userName', userName);

      
      if (onLoginSuccess) {
        onLoginSuccess();
      }

      alert('Logged in successfully');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Login failed. Try again.');
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-header">Login</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="usernameOrEmail"
          placeholder="Username or Email"
          value={formData.usernameOrEmail}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button className="auth-button" type="submit">Login</button>
      </form>
      {errorMessage && <p className="auth-error">{errorMessage}</p>}
      <button className="link-button" onClick={() => window.location.href='/signup'}>
        Don't have an account? Sign up here!
      </button>
    </div>
  );
};

export default Login;
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './components/signup';
import Login from './components/login';
import Home from './components/home';
import AddExpense from './components/addExpense';
import UpdateAccount from './components/updateAccount';
import Navbar from './components/Navbar';
import './App.css';  

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);  
  };

  return (
    <Router>
      {isAuthenticated && <Navbar />}  
      
      <div className="app-container">
        <Routes>
          
          <Route 
            path="/" 
            element={!isAuthenticated ? <AuthPage onLoginSuccess={handleLoginSuccess} /> : <Navigate to="/home" />} 
          />
          <Route 
            path="/home" 
            element={isAuthenticated ? <Home /> : <Navigate to="/" />} 
          />
          <Route 
            path="/add-expense" 
            element={isAuthenticated ? <AddExpense /> : <Navigate to="/" />} 
          />
          <Route 
            path="/update-account" 
            element={isAuthenticated ? <UpdateAccount /> : <Navigate to="/" />} 
          />
        </Routes>
      </div>
    </Router>
  );
};

const AuthPage = ({ onLoginSuccess }) => {
  const [showSignup, setShowSignup] = useState(false);  

  return (
    <div className="auth-page">
      <div className="auth-toggle-buttons">
        
        <button 
          className={`auth-toggle-button ${!showSignup ? 'active' : ''}`} 
          onClick={() => setShowSignup(false)}
        >
          Login
        </button>
        <button 
          className={`auth-toggle-button ${showSignup ? 'active' : ''}`} 
          onClick={() => setShowSignup(true)}
        >
          Sign Up
        </button>
      </div>

      
      <div className="auth-form-container">
        {showSignup ? <Signup /> : <Login onLoginSuccess={onLoginSuccess} />}
      </div>
    </div>
  );
};

export default App;

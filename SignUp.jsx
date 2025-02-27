import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import './SignUp.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const clientId = "315124824926-eojplkm74o08v3qrsqjuudqbkfctmnhl.apps.googleusercontent.com";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    navigate('/dashboard'); // Redirect to the dashboard after successful signup
  };

  const handleGoogleSignIn = async (credentialResponse) => {
    // Mock Google Sign-In function
    console.log('Google Sign-In successful:', credentialResponse);
    navigate('/dashboard'); // Redirect to the dashboard after successful Google Sign-In
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="signup-container">
        <h1 className="signup-header">Sign Up</h1>
        <form className="signup-form" onSubmit={handleSubmit}>
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            variant="filled"
            className="signup-input"
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            variant="filled"
            className="signup-input"
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            variant="filled"
            className="signup-input"
            required
          />
          <Button type="submit" variant="contained" className="signup-button">
            Sign Up
          </Button>
        </form>
        <div className="google-login">
          <GoogleLogin
            onSuccess={handleGoogleSignIn}
            onError={() => alert("Google Sign Up Failed")}
          />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default SignUp;
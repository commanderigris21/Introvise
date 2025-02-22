import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from 'react-router-dom';  // Importing useNavigate from react-router-dom
import axios from "axios";
import "./login.css";

const clientId = "315124824926-eojplkm74o08v3qrsqjuudqbkfctmnhl.apps.googleusercontent.com";

function Login() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  // Handle Google Login Success
  const handleLoginSuccess = async (credentialResponse) => {
    try {
        const res = await axios.post("http://localhost:8080/api/users/login", {
            token: credentialResponse.credential,
        });

        console.log("Backend Response:", res.data); // Debugging

        if (res.data.email) {
            localStorage.setItem("userEmail", res.data.email); // Store email
            // Navigate to the Resume page
            navigate('/resume');
        } else {
            console.error("Email not found in backend response");
        }
    } catch (error) {
        console.error("OAuth login failed:", error);
    }
  };

  // Fetch user profile from backend
  const fetchUserProfile = async (email) => {
    try {
        const res = await axios.get(`http://localhost:8080/api/users/me?email=${email}`);
        
        console.log("User Profile:", res.data); // Debugging

        if (res.status === 200) {
            setUser(res.data);  // Store user in state
        } else {
            console.error("User not found");
        }
    } catch (error) {
        console.error("Error fetching user profile:", error);
    }
  };

  // Auto-fetch profile if user is already logged in
  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
        fetchUserProfile(storedEmail);
    }
  }, []);

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div>
        <nav className="Nav">
          <img src="logo.png" alt="Logo" />
          <h1 className="Inrovise">Introvise</h1>
          </nav>

        <div className="half">
          <div className="ad">
            <h1>AI-Powered Question Generation</h1> <br />
            <p>🧠 Uses AI & NLP to generate <br /> customized questions across <br /> various categories.</p>
          </div>
        </div>

        <p className="head">Welcome Back to <span>Introvise!</span></p>
        <p className="sec">Sign in with </p>

        {/* Google Login Button */}
        <div className="google-login">
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={() => console.log("Login Failed")}
            render={(renderProps) => (
              <img
                className="img"
                src="gog.png"
                alt="Google Logo"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              />
            )}
          />
        </div>

        <span className="border">
          <p className="text"> OR </p>
        </span>

        <p className="E">Email</p>
        <input className="Email" type="text" placeholder="Enter Email" />

        <p className="P">Password</p>
        <input className="Pass" type="password" placeholder="Enter Password" />

        {/* Add onClick to navigate to the Resume page */}
        <button className="btnSign" onClick={() => navigate('/resume')}>Sign In</button>
        <a href="#" className="a">Forgot password?</a>

        <p className="np">Don&lsquo;t have an account?<a href="#">Sign Up</a></p>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;

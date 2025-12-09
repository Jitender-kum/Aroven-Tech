import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        // 🔥 Success: Token browser me save karo
        localStorage.setItem('token', data.token);
        alert("Login Successful! Welcome Boss. 😎");
        navigate('/admin'); // Admin panel par bhej do
      } else {
        alert("Invalid Email or Password ❌");
      }
    } catch (error) {
      console.log(error);
      alert("Server Error. Is Backend Running?");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="section-title" style={{fontSize: '2rem'}}>Admin <span className="gradient-text">Login</span></h2>
        
        <form onSubmit={handleLogin} className="contact-form">
          <input 
            type="email" 
            placeholder="Admin Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button type="submit" className="btn btn-primary" style={{width: '100%'}}>Unlock Dashboard 🔓</button>
        </form>
        <p style={{marginTop: '20px', color: '#888'}}>
  <Link to="/forgot-password" style={{color: '#ef4444', marginRight: '15px'}}>Forgot Password?</Link>
  | 
  <Link to="/register" style={{color: '#3b82f6', marginLeft: '15px'}}>Create Account</Link>
</p>
      </div>
    </div>
  );
};

export default Login;
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://aroven-tech.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        // Token save karo aur andar bhejo
        localStorage.setItem('token', data.token);
        alert("Account Created Successfully! Welcome. 🎉");
        navigate('/admin');
      } else {
        alert(data.message || "Registration Failed ❌");
      }
    } catch (error) {
      console.log(error);
      alert("Server Error.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="section-title" style={{fontSize: '2rem'}}>Admin <span className="gradient-text">Register</span></h2>
        
        <form onSubmit={handleRegister} className="contact-form">
          <input 
            type="email" 
            placeholder="New Admin Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Create Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button type="submit" className="btn btn-primary" style={{width: '100%'}}>Create Account 🚀</button>
        </form>

        <p style={{marginTop: '20px', color: '#888'}}>
          Already have an account? <Link to="/login" style={{color: '#3b82f6'}}>Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
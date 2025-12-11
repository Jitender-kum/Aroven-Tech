import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import Footer from './components/Footer';
import Admin from './components/Admin';
import AllProjects from './components/AllProjects';
import Contact from './components/Contact'; // Contact import rehne dena
import Login from './components/Login';
import Register from './components/Register';
import WhatsAppBtn from './components/WhatsAppBtn';
import Chatbot from './components/Chatbot';
import Shop from './components/Shop';
import './App.css';

// 1. Home se Contact hata diya (Clean Home)
const Home = () => (
  <>
    <Hero />
    <Services />
    <Projects />
    <Footer />
  </>
);

function App() {
  return (
    <div>
      <Navbar /> 
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        
        {/* 2. Contact ka naya Page bana diya */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/all-projects" element={<AllProjects />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/forgot-password" element={<h2 style={{color:'white', textAlign:'center', marginTop:'100px'}}>Work in Progress 🛠️</h2>} />
      </Routes>
      <WhatsAppBtn />
      <Chatbot />
    </div>
  );
}

export default App;
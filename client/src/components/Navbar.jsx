import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // <--- YE IMPORT ZAROORI HAI

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container nav-content">

        {/* Logo -> Home Page */}
        <Link to="/" className="logo" style={{ textDecoration: 'none', color: 'white' }}>
          AROVEN <span>TECH</span>
        </Link>

        {/* Mobile Toggle Button */}
        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          )}
        </div>

        {/* Menu Links */}
        <ul className={`nav-links ${isOpen ? "active" : ""}`}>

          {/* Home Link */}
          <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>

          {/* Services Link (Updated) */}
          <li>
            <a href="/#services" onClick={() => setIsOpen(false)}>Services</a>
          </li>

          {/* Projects Link (Updated - Ye Home page ke featured projects par le jayega) */}
          <li>
            <a href="/#projects" onClick={() => setIsOpen(false)}>Projects</a>
          </li>

          <li>
            <Link 
                to="/shop" 
                onClick={() => setIsOpen(false)} 
                style={{color: '#9333ea', fontWeight: 'bold'}} // Highlight karne ke liye
            >
                Digital Store
            </Link>
          </li>

          {/* Contact Link */}
          <li><Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>

          {/* Mobile Button */}
          <li>
            <Link to="/contact" onClick={() => setIsOpen(false)}>
              <button className="btn btn-primary mobile-btn">Let's Talk</button>
            </Link>
          </li>
        </ul>

        {/* Desktop Button Link */}
        <Link to="/contact">
          <button className="btn btn-primary desktop-btn">Let's Talk</button>
        </Link>

      </div>
    </nav>
  );
};

export default Navbar;
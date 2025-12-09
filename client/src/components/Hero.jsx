import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal'; // <--- Animation Import kiya

const Hero = () => {
  return (
    <section className="hero" id="hero1"> 
      {/* Flexbox add kiya taaki animations center mein aayein */}
      <div className="container" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        
        {/* 1. Badge (Sabse pehle aayega) */}
        <Reveal>
          <div className="badge">
            <span>NEW</span> Accepting Projects for 2025
          </div>
        </Reveal>

        {/* 2. Heading (Thodi der baad) */}
        <Reveal delay={0.2}>
          <h1>
            Innovating Your <br />
            <span className="gradient-text">Digital Future</span>
          </h1>
        </Reveal>

        {/* 3. Text (Aur thodi der baad) */}
        <Reveal delay={0.4}>
          <p>
            We fuse Creative Web Development with Artificial Intelligence to build 
            startup-level products for your business.
          </p>
        </Reveal>

        {/* 4. Buttons (Sabse last mein) */}
        <Reveal delay={0.6}>
          <div className="hero-buttons">
            <Link to="/all-projects">
              <button className="btn btn-primary">View Our Work</button>
            </Link>
            
            <Link to="/contact">
              <button className="btn btn-secondary">Book Consultation</button>
            </Link>
          </div>
        </Reveal>

      </div>
    </section>
  );
};

export default Hero;
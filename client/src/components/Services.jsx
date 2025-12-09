import React from 'react';

const Services = () => {
  return (
    <section className="services-section" id="services">
      <h2 className="section-title">
        Our <span className="gradient-text">Expertise</span>
      </h2>

      <div className="services-grid">
        
        {/* Card 1: Web Dev */}
        <div className="service-card">
          <div className="icon-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
          </div>
          <h3>Custom Web Dev</h3>
          <p>
            We build lightning-fast websites using MERN Stack. 
            From Corporate sites to complex SaaS platforms, we handle it all.
          </p>
        </div>

        {/* Card 2: AI Solutions */}
        <div className="service-card">
          <div className="icon-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"></path><path d="M12 18a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2z"></path><path d="M22 12a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2 2 2 0 0 1 2-2h2a2 2 0 0 1 2 2z"></path><path d="M6 12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2 2 2 0 0 1 2-2h2a2 2 0 0 1 2 2z"></path></svg>
          </div>
          <h3>AI Integration</h3>
          <p>
            Automate your business with Smart Chatbots and AI tools. 
            Save time and reduce costs with intelligent automation.
          </p>
        </div>

        {/* Card 3: UI/UX */}
        <div className="service-card">
          <div className="icon-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>
          </div>
          <h3>Product Design</h3>
          <p>
            User-centric designs that convert visitors into customers. 
            We focus on clean aesthetics and smooth user experience.
          </p>
        </div>

      </div>
    </section>
  );
};

export default Services;
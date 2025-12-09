import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState(null); // To show Success/Error message

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' }); // Form clear kar do
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.log(error);
      setStatus('error');
    }
  };

  return (
    <section className="contact-section">
      <div className="container">
        <h2 className="section-title">
          Get In <span className="gradient-text">Touch</span>
        </h2>
        
        <div className="contact-wrapper">
          {/* Form Side */}
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <input 
                type="text" 
                name="name" 
                placeholder="Your Name" 
                required 
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input 
                type="email" 
                name="email" 
                placeholder="Your Email" 
                required 
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <textarea 
                name="message" 
                placeholder="Tell us about your project..." 
                required 
                rows="5"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary submit-btn" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : 'Send Message 🚀'}
            </button>

            {status === 'success' && <p className="success-msg">Message sent! We'll get back to you soon.</p>}
            {status === 'error' && <p className="error-msg">Something went wrong. Please try again.</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
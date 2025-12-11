import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import Reveal from './Reveal'; // 🔥 REMOVED
import { Helmet } from 'react-helmet-async'; // Assuming HelmetProvider is used for SEO

const Shop = () => {
  const [saleProjects, setSaleProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // API URL ab automatically 'vite.config.js' aur 'vercel.json' se manage hoga
  const API_ENDPOINT = '/api/projects?forSale=true'; 

  useEffect(() => {
    const fetchSaleProjects = async () => {
      try {
        // Relative path use kiya, jo sirf forSale items fetch karega
        const response = await fetch(API_ENDPOINT); 
        const data = await response.json();
        setSaleProjects(data);
      } catch (error) {
        console.error("Error fetching sale projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSaleProjects();
  }, []);

  if (loading) return (
    <div style={{height: '80vh', display:'flex', justifyContent:'center', alignItems:'center', color: '#ccc'}}>
      <div className="loader"></div>
      <p style={{marginLeft: '15px'}}>Loading Digital Store...</p>
    </div>
  );

  return (
    <section className="shop-section">
      <Helmet>
        <title>Aroven Digital Store | Buy Ready-Made Templates</title>
        <meta name="description" content="Buy instant, high-quality MERN stack templates and digital assets for quick startup launches. View demos and prices." />
      </Helmet>

      <div className="container" style={{paddingTop: '80px'}}>
        {/* 🔥 Reveal Hata Diya Gaya */}
        <h2 className="section-title">
          Aroven <span className="gradient-text">Digital Store</span>
        </h2>
        
        {/* 🔥 Reveal Hata Diya Gaya */}
        <p style={{textAlign: 'center', color: '#ccc', marginBottom: '50px'}}>
          High-performance, ready-to-deploy assets to launch your business today.
        </p>

        {saleProjects.length === 0 ? (
          <p className="no-projects-msg" style={{textAlign: 'center', color: '#999', marginTop: '50px', fontSize: '1.2rem'}}>
            No digital assets available for sale right now. Check back soon!
          </p>
        ) : (
          <div className="project-grid">
            {saleProjects.map((project, index) => (
              // 🔥 Reveal Hata Diya Gaya
              <div key={index} className="project-card"> 
                
                {/* Image Area */}
                <div className="project-image" style={{ background: project.imageColor || project.image || 'linear-gradient(45deg, #111, #222)', position: 'relative' }}>
                    
                    {/* Price Tag */}
                    {project.salePrice && (
                        <div className="price-tag">
                            {project.salePrice}
                        </div>
                    )}
                    
                    <span style={{color: 'rgba(255,255,255,0.2)', fontSize: '2rem', fontWeight:'bold', letterSpacing: '2px'}}>
                      {project.category?.toUpperCase() || 'TEMPLATE'}
                    </span>
                </div>

                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>
                  
                  {/* FIX: Conditional Rendering for Arrays */}
                  <div className="tech-stack">
                    {/* Assuming projects use 'tags' or 'tech' array */}
                    {(project.tags || project.tech) && (project.tags || project.tech).map((item, i) => (
                        <span className="tech-tag" key={i}>{item}</span>
                    ))}
                  </div>

                  <div className="project-links" style={{marginTop: 'auto'}}>
                    <a href={project.liveLink} className="link-btn demo" target="_blank" rel="noopener noreferrer">
                      Live Demo
                    </a>
                    {/* BUY NOW BUTTON */}
                    <Link 
                      to={`/contact?query=Inquiry for: ${project.title} (${project.salePrice})`} 
                      className="link-btn code" 
                      style={{background: '#9333ea', color: 'white'}}
                    >
                      Buy/Inquire
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Shop;
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // 🔥 FIX 1: Koi filter nahi, saare projects fetch karo
        const res = await fetch('/api/projects'); 
        const data = await res.json();
        setProjects(data);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };
    fetchProjects();
  }, []); 

  return (
    <div style={{ backgroundColor: '#050505', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <section className="projects-section" style={{ flex: 1, paddingTop: '140px', paddingBottom: '80px' }}>
        <div className="container">
          
          {/* ... Header ... */}

          {/* ... Loading Messages ... */}

          <div className="project-grid">
            {projects.map((project) => (
              <div className="project-card" key={project._id}>
                
                {/* Image Area (unchanged) */}
                <div className="project-image" style={{ height: '220px', overflow: 'hidden' }}>
                  {/* ... image logic ... */}
                </div>

                {/* Content Area */}
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>
                  
                  {/* Tags (unchanged) */}
                  <div className="tech-stack">
                    {project.tags && project.tags.map((tag, i) => (
                      <span className="tech-tag" key={i}>{tag}</span>
                    ))}
                  </div>

                  {/* Buttons: Sale logic yahan se hata diya hai */}
                  <div className="project-links">
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noreferrer" className="link-btn demo">
                        {/* Live Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                        Live Demo
                      </a>
                    )}
                     
                     {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noreferrer" className="link-btn code">
                        {/* GitHub Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                        Code
                      </a>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AllProjects;
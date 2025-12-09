import React from 'react';
import { Link } from 'react-router-dom'; // Button link ke liye

const Projects = () => {
  // Ye wahi purane 3 STATIC projects hain (MoodFlix, etc.)
  // Inme humne specific color gradients use kiye the jo sunder lag rahe the
  const projectList = [
    {
      title: "AI Movie Recommender",
      desc: "A smart movie suggestion engine that uses AI to recommend films based on your current mood. Built with MERN stack and OpenAI API.",
      tech: ["React", "Node.js", "MongoDB", "OpenAI"],
      imageColor: "linear-gradient(to right, #240b36, #c31432)", // Red/Purple
      liveLink: "#",
      githubLink: "#"
    },
    {
      title: "Influencer Connect",
      desc: "A marketplace connecting brands with influencers. Features include real-time chat, payment integration, and analytics dashboard.",
      tech: ["React", "Redux", "Express", "Stripe"],
      imageColor: "linear-gradient(to right, #0f2027, #203a43, #2c5364)", // Dark Blue
      liveLink: "#",
      githubLink: "#"
    },
    {
      title: "GitHub Profile Analyzer",
      desc: "A developer tool that fetches GitHub data to generate a professional resume and activity insights automatically.",
      tech: ["React", "GitHub API", "Tailwind"],
      imageColor: "linear-gradient(to right, #141e30, #243b55)", // Navy Blue
      liveLink: "#",
      githubLink: "#"
    }
  ];

  return (
    <section className="projects-section" id="projects">
      <div className="container">
        <h2 className="section-title">
          Featured <span className="gradient-text">Work</span>
        </h2>
        
        <div className="project-grid">
          {projectList.map((project, index) => (
            <div className="project-card" key={index}>
              
              {/* Image Area: Yahan humne Gradient wapas laga diya */}
              <div className="project-image" style={{ background: project.imageColor, height: '220px' }}>
                <span style={{
                  color: 'rgba(255,255,255,0.2)', 
                  fontSize: '2.5rem', 
                  fontWeight:'bold',
                  letterSpacing: '2px'
                }}>
                  PREVIEW
                </span>
              </div>

              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                
                <div className="tech-stack">
                  {project.tech.map((tech, i) => (
                    <span className="tech-tag" key={i}>{tech}</span>
                  ))}
                </div>

                <div className="project-links">
                  <a href={project.liveLink} className="link-btn demo">
                    {/* SVG Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    Live Demo
                  </a>
                  <a href={project.githubLink} className="link-btn code">
                    {/* SVG Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- View More Button (Ye raha naya addition) --- */}
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <Link to="/all-projects">
            <button className="btn btn-secondary" style={{ padding: '15px 40px', fontSize: '1.1rem' }}>
              View All Projects &rarr;
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Projects;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  
  // Data States
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);
  
  // Form State
  const [project, setProject] = useState({
    title: '', description: '', image: '', tags: '', liveLink: ''
  });
  
  // Edit Mode State 
  const [editingId, setEditingId] = useState(null);

  // --- 1. Security & Fetch ---
  useEffect(() => {
    const token = localStorage.getItem('token');
    // Abhi alert nahi lagaya, par security fix ke liye lagana chahiye
    if (!token) navigate('/login'); 
    else fetchData();
  }, [navigate]); // navigate dependency array mein zaroori hai

  const fetchData = async () => {
    try {
      // 🔥 FIX 1: Hardcoded URL hata kar sirf relative path use kiya
      const msgRes = await fetch('/api/contact');
      const projRes = await fetch('/api/projects');
      setMessages(await msgRes.json());
      setProjects(await projRes.json());
    } catch (err) { console.error(err); alert("Failed to fetch data."); }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // --- 2. EDIT MODE START ---
  const handleEditClick = (proj) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setEditingId(proj._id); 
    setProject({
      title: proj.title,
      description: proj.description,
      image: proj.image,
      tags: proj.tags.join(', '), 
      liveLink: proj.liveLink || ''
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setProject({ title: '', description: '', image: '', tags: '', liveLink: '' });
  };

  // --- 3. SUBMIT (ADD or UPDATE) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    const tagsArray = project.tags.split(',').map(tag => tag.trim());
    
    // 🔥 FIX 2: Hardcoded URL hata kar sirf relative path use kiya
    const url = editingId 
      ? `/api/projects/${editingId}`
      : '/api/projects';
      
    const method = editingId ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...project, tags: tagsArray })
    });

    if (res.ok) {
      alert(editingId ? "Project Updated! 🔄" : "Project Added! 🚀");
      cancelEdit(); 
      fetchData();  
    } else {
      alert("Submission Failed.");
    }
  };

  // --- 4. DELETE ---
  const deleteProject = async (id) => {
    if(!window.confirm("Delete this project?")) return;
    // 🔥 FIX 3: Hardcoded URL hata kar sirf relative path use kiya
    await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    setProjects(projects.filter(p => p._id !== id));
  };

  const deleteMessage = async (id) => {
    if(!window.confirm("Delete message?")) return;
    // 🔥 FIX 4: Hardcoded URL hata kar sirf relative path use kiya
    await fetch(`/api/contact/${id}`, { method: 'DELETE' });
    setMessages(messages.filter(m => m._id !== id));
  };

  return (
    <div className="admin-page">
      {/* ... baaki return code wahi rahega ... */}
      <div className="container">
        
        {/* Header */}
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid #333', paddingBottom: '20px'}}>
           <h1 className="admin-title" style={{marginBottom: 0, border: 'none'}}>Admin Dashboard 🛡️</h1>
           <button onClick={handleLogout} className="btn btn-secondary" style={{borderColor: '#ef4444', color: '#ef4444'}}>Logout 🚪</button>
        </div>

        <div className="admin-grid">
          
          {/* --- FORM SECTION --- */}
          <div className="admin-card">
            <h2 className="card-title">
              {editingId ? "Edit Project ✏️" : "Add New Project 🚀"}
            </h2>
            
            <form onSubmit={handleSubmit} className="admin-form">
              <input type="text" placeholder="Project Title" className="form-input" 
                value={project.title} onChange={e => setProject({...project, title: e.target.value})} required />
              
              <textarea placeholder="Description" className="form-input textarea"
                value={project.description} onChange={e => setProject({...project, description: e.target.value})} required></textarea>
              
              <input type="text" placeholder="Image URL" className="form-input"
                value={project.image} onChange={e => setProject({...project, image: e.target.value})} required />
              
              <input type="text" placeholder="Tags (React, Node)" className="form-input"
                value={project.tags} onChange={e => setProject({...project, tags: e.target.value})} required />
              
              <input type="text" placeholder="Live Link" className="form-input"
                value={project.liveLink} onChange={e => setProject({...project, liveLink: e.target.value})} />

              {/* Dynamic Buttons */}
              <button type="submit" className="btn btn-primary submit-btn">
                {editingId ? "Update Project 🔄" : "Upload Project 🚀"}
              </button>
              
              {/* Cancel Button */}
              {editingId && (
                <button type="button" onClick={cancelEdit} className="btn btn-secondary" style={{width: '100%', marginTop: '10px'}}>
                  Cancel Edit ❌
                </button>
              )}
            </form>
          </div>

          {/* --- LIST SECTION --- */}
          <div className="admin-right-column">
            
            {/* Messages */}
            <div className="admin-card mb-10">
              <h2 className="card-title">Inquiries ({messages?.length || 0})</h2>
              <div className="list-container">
                {messages?.map((msg) => (
                  <div key={msg._id} className="item-card">
                    <div style={{overflow: 'hidden'}}>
                      <h3 className="item-name">{msg.name}</h3>
                      <p className="item-sub" style={{color: '#3b82f6'}}>{msg.email}</p>
                      <p className="item-sub">{msg.message}</p>
                    </div>
                    <button onClick={() => deleteMessage(msg._id)} className="delete-btn">🗑️</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects List with EDIT Button */}
            <div className="admin-card">
              <h2 className="card-title">Manage Projects ({projects?.length || 0})</h2>
              <div className="list-container">
                {projects?.map((proj) => (
                  <div key={proj._id} className="item-card">
                    <div style={{overflow: 'hidden'}}>
                      <h3 className="item-name">{proj.title}</h3>
                      <p className="item-sub" style={{color:'#666'}}>{proj.tags?.join(', ')}</p>
                    </div>
                    
                    {/* Action Buttons */}
                    <div style={{display: 'flex', gap: '10px'}}>
                      {/* Edit Button */}
                      <button 
                        onClick={() => handleEditClick(proj)} 
                        className="edit-btn" 
                        style={{background: '#1e3a8a', border: '1px solid #3b82f6', color: '#60a5fa', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer'}}>
                        ✏️
                      </button>
                      
                      {/* Delete Button */}
                      <button onClick={() => deleteProject(proj._id)} className="delete-btn">🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
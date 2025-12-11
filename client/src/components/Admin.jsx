import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  
  // Data States
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);
  // 🔥 NEW STATE: Kaunsa tab active hai (all / shop)
  const [activeTab, setActiveTab] = useState('all'); 

  // Form State (Store Fields ke saath)
  const [project, setProject] = useState({
    title: '', description: '', image: '', tags: '', liveLink: '',
    isForSale: false, salePrice: '', category: '',
  });
  
  const [editingId, setEditingId] = useState(null);

  // --- 1. Security & Fetch (Clean API Path: /api/...) ---
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login'); 
    else fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      // API Path is clean
      const msgRes = await fetch('/api/contact');
      const projRes = await fetch('/api/projects'); // Saare projects fetch kiye
      setMessages(await msgRes.json());
      setProjects(await projRes.json());
    } catch (err) { console.error(err); alert("Failed to fetch data."); }
  };

  // 🔥 FILTER LOGIC: Sirf active tab ke projects dikhayega
  const filteredProjects = useMemo(() => {
    if (activeTab === 'shop') {
      return projects.filter(proj => proj.isForSale);
    }
    return projects;
  }, [projects, activeTab]);
  
  // --- Baaki functions (handleLogout, handleEditClick, handleSubmit, deleteProject, deleteMessage) wahi rahenge ---

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleEditClick = (proj) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setEditingId(proj._id); 
    setProject({
      title: proj.title,
      description: proj.description,
      image: proj.image,
      tags: proj.tags.join(', '), 
      liveLink: proj.liveLink || '',
      isForSale: proj.isForSale || false, 
      salePrice: proj.salePrice || '',
      category: proj.category || '',
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setProject({ 
      title: '', description: '', image: '', tags: '', liveLink: '',
      isForSale: false, salePrice: '', category: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tagsArray = project.tags.split(',').map(tag => tag.trim());
    
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

  const deleteProject = async (id) => {
    if(!window.confirm("Delete this project?")) return;
    await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    setProjects(projects.filter(p => p._id !== id));
  };

  const deleteMessage = async (id) => {
    if(!window.confirm("Delete message?")) return;
    await fetch(`/api/contact/${id}`, { method: 'DELETE' });
    setMessages(messages.filter(m => m._id !== id));
  };

  // --- Rendering ---
  return (
    <div className="admin-page">
      <div className="container">
        
        {/* Header */}
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid #333', paddingBottom: '20px'}}>
           <h1 className="admin-title" style={{marginBottom: 0, border: 'none'}}>Admin Dashboard 🛡️</h1>
           <button onClick={handleLogout} className="btn btn-secondary" style={{borderColor: '#ef4444', color: '#ef4444'}}>Logout 🚪</button>
        </div>

        <div className="admin-grid">
          
          {/* --- FORM SECTION (Project/Store Item Add/Edit) --- */}
          <div className="admin-card">
            <h2 className="card-title">
              {editingId ? "Edit Project ✏️" : "Add New Project/Store Item 🚀"}
            </h2>
            
            <form onSubmit={handleSubmit} className="admin-form">
              {/* ... Basic Inputs ... */}
              <input type="text" placeholder="Project Title" className="form-input" 
                value={project.title} onChange={e => setProject({...project, title: e.target.value})} required />
              
              <textarea placeholder="Description" className="form-input textarea"
                value={project.description} onChange={e => setProject({...project, description: e.target.value})} required></textarea>
              
              <input type="text" placeholder="Image URL / Color Code" className="form-input"
                value={project.image} onChange={e => setProject({...project, image: e.target.value})} required />
              
              <input type="text" placeholder="Tags (React, Node)" className="form-input"
                value={project.tags} onChange={e => setProject({...project, tags: e.target.value})} required />
              
              <input type="text" placeholder="Live Link" className="form-input"
                value={project.liveLink} onChange={e => setProject({...project, liveLink: e.target.value})} />

              {/* 🔥 DIGITAL STORE FIELDS */}
              <label style={{ display: 'flex', alignItems: 'center', margin: '20px 0', color: '#ccc' }}>
                <input
                  type="checkbox"
                  checked={project.isForSale}
                  onChange={(e) => setProject({ ...project, isForSale: e.target.checked })}
                  style={{ marginRight: '10px' }}
                />
                Mark as "For Sale" (Appears in Digital Store)
              </label>

              {project.isForSale && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '15px' }}>
                  <input
                    type="text"
                    placeholder="Sale Price (e.g., ₹25,000 / $300)"
                    value={project.salePrice}
                    onChange={e => setProject({ ...project, salePrice: e.target.value })}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Category (e.g., E-commerce, SaaS Template)"
                    value={project.category}
                    onChange={e => setProject({ ...project, category: e.target.value })}
                    required
                  />
                </div>
              )}

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

          {/* --- LISTS SECTION (Messages & Projects/Store) --- */}
          <div className="admin-right-column">
            
            {/* Messages */}
            <div className="admin-card mb-10">
              <h2 className="card-title">Inquiries ({messages?.length || 0})</h2>
              {/* ... Message List ... */}
              <div className="list-container">
                {messages?.map((msg) => (
                  <div key={msg._id} className="item-card">
                    {/* ... */}
                  </div>
                ))}
              </div>
            </div>

            {/* Projects/Store List */}
            <div className="admin-card">
              
              {/* 🔥 FIX 6: TABS ADD KIYE GAYE */}
              <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
                <h2 
                  className="card-title" 
                  onClick={() => setActiveTab('all')}
                  style={{ cursor: 'pointer', borderBottom: activeTab === 'all' ? '2px solid #3b82f6' : 'none', paddingBottom: '10px', color: activeTab === 'all' ? 'white' : '#888' }}
                >
                  All Projects ({projects?.length || 0})
                </h2>
                <h2 
                  className="card-title" 
                  onClick={() => setActiveTab('shop')}
                  style={{ cursor: 'pointer', borderBottom: activeTab === 'shop' ? '2px solid #9333ea' : 'none', paddingBottom: '10px', color: activeTab === 'shop' ? 'white' : '#888' }}
                >
                  Digital Store ({projects.filter(p => p.isForSale).length})
                </h2>
              </div>
              
              <h3 style={{color: '#999', fontSize: '1rem', marginBottom: '15px'}}>
                Managing: {activeTab === 'all' ? 'Portfolio and Store Items' : 'Only For Sale Items'}
              </h3>

              <div className="list-container">
                {/* 🔥 FIX 7: Filtered Projects list use ki */}
                {filteredProjects.map((proj) => (
                  <div key={proj._id} className="item-card">
                    <div style={{overflow: 'hidden'}}>
                      <h3 className="item-name">
                        {proj.title}
                        {proj.isForSale && (
                          <span style={{marginLeft: '10px', fontSize: '0.7rem', color: '#4ade80'}}>
                            (${proj.salePrice || 'N/A'})
                          </span>
                        )}
                      </h3>
                      <p className="item-sub" style={{color:'#666'}}>{proj.tags?.join(', ')}</p>
                    </div>
                    
                    {/* Action Buttons */}
                    <div style={{display: 'flex', gap: '10px'}}>
                      <button 
                        onClick={() => handleEditClick(proj)} 
                        className="edit-btn" 
                        style={{background: '#1e3a8a', border: '1px solid #3b82f6', color: '#60a5fa', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer'}}>
                        ✏️
                      </button>
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
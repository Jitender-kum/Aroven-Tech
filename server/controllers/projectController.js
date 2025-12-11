import Project from '../models/Project.js';

// @desc    Get all projects (Filtering is correct)
// @route   GET /api/projects
export const getProjects = async (req, res) => {
  try {
    const { forSale } = req.query; 

    let filter = {};
    
    if (forSale === 'true') {
      filter.isForSale = true;
    } 
    
    const projects = await Project.find(filter).sort({ date: -1 }); 
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Add a new project (Admin ke liye)
// @route   POST /api/projects
export const addProject = async (req, res) => {
  try {
    // 🔥 FIX 1: Naye Store fields yahan include kiye gaye
    const { title, description, tags, image, liveLink, githubLink, isForSale, salePrice, category } = req.body;

    const project = new Project({
      title,
      description,
      tags,
      image,
      liveLink,
      githubLink,
      // 🔥 FIX 2: Naye fields Project object mein pass kiye gaye
      isForSale,
      salePrice,
      category
    });

    const createdProject = await project.save();
    res.status(201).json(createdProject);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (project) {
      await Project.deleteOne({ _id: req.params.id });
      res.json({ message: 'Project removed' });
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
}

// @desc    Update a project (This function is correct)
// @route   PUT /api/projects/:id
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    
    const { title, description, tags, imageColor, liveLink, githubLink, isForSale, salePrice, category } = req.body; 

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { 
        title, description, tags, imageColor, liveLink, githubLink,
        isForSale, salePrice, category 
      },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: 'Server Error during update' });
  }
};
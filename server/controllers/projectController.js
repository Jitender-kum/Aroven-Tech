import Project from '../models/Project.js';

// @desc    Get all projects
// @route   GET /api/projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find(); // Saare projects dhund ke lao
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Add a new project (Admin ke liye)
// @route   POST /api/projects
export const addProject = async (req, res) => {
  try {
    const { title, description, tags, image, liveLink, githubLink } = req.body;

    const project = new Project({
      title,
      description,
      tags,
      image,
      liveLink,
      githubLink
    });

    const createdProject = await project.save();
    res.status(201).json(createdProject);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

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

export const updateProject = async (req, res) => {
  const { title, description, image, tags, liveLink } = req.body;

  try {
    const project = await Project.findById(req.params.id);

    if (project) {
      project.title = title || project.title;
      project.description = description || project.description;
      project.image = image || project.image;
      project.tags = tags || project.tags;
      project.liveLink = liveLink || project.liveLink;

      const updatedProject = await project.save();
      res.json(updatedProject);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
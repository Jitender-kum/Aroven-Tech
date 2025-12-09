import express from 'express';
import { getProjects, addProject, deleteProject, updateProject} from '../controllers/projectController.js';
const router = express.Router();

router.route('/')
  .get(getProjects)
  .post(addProject);

router.route('/:id')
  .delete(deleteProject)
  .put(updateProject);

export default router;
const express = require('express');
const {
  getProjects,
  getProjectBySlug,
  getProjectByIdAdmin,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');
const { protect } = require('../middleware/auth');
const optionalAuth = require('../middleware/optionalAuth');
const { projectValidator } = require('../validators/projectValidators');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

// Public/admin-aware list (unpublished + all statuses only visible when authenticated)
router.get('/', optionalAuth, getProjects);
router.get('/slug/:slug', optionalAuth, getProjectBySlug);

// Admin-only
router.get('/:id', protect, getProjectByIdAdmin);
router.post('/', protect, projectValidator, validateRequest, createProject);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);

module.exports = router;

const { body } = require('express-validator');

const CATEGORIES = ['Web Development', 'Full Stack', 'Frontend', 'Backend', 'Dashboard', 'E-commerce', 'UI/UX'];
const STATUSES = ['Planning', 'In Development', 'Completed', 'Maintenance', 'Archived'];

const projectValidator = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 120 }),
  body('shortDescription').trim().notEmpty().withMessage('Short description is required').isLength({ max: 200 }),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('category').isIn(CATEGORIES).withMessage('Invalid category'),
  body('image').trim().notEmpty().withMessage('Cover image is required'),
  body('status').optional().isIn(STATUSES).withMessage('Invalid status'),
  body('technologies').optional().isArray().withMessage('Technologies must be an array'),
  body('githubUrl').optional({ checkFalsy: true }).isURL().withMessage('GitHub URL must be valid'),
  body('liveUrl').optional({ checkFalsy: true }).isURL().withMessage('Live URL must be valid'),
];

module.exports = { projectValidator };

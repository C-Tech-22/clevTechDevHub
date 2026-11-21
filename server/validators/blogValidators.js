const { body } = require('express-validator');

const CATEGORIES = [
  'Web Development',
  'React',
  'JavaScript',
  'Node.js',
  'MongoDB',
  'APIs',
  'Software Engineering',
  'Career',
  'ClevTech News',
];

const blogPostValidator = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 150 }),
  body('excerpt').trim().notEmpty().withMessage('Excerpt is required').isLength({ max: 300 }),
  body('content').trim().notEmpty().withMessage('Content is required'),
  body('coverImage').trim().notEmpty().withMessage('Cover image is required'),
  body('category').isIn(CATEGORIES).withMessage('Invalid category'),
  body('status').optional().isIn(['draft', 'published']).withMessage('Invalid status'),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
];

module.exports = { blogPostValidator };

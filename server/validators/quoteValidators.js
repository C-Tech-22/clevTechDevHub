const { body } = require('express-validator');

const quoteValidator = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
  body('email').isEmail().withMessage('A valid email is required').normalizeEmail(),
  body('projectType').trim().notEmpty().withMessage('Project type is required'),
  body('budget').trim().notEmpty().withMessage('Budget range is required'),
  body('description').trim().notEmpty().withMessage('Project description is required').isLength({ max: 3000 }),
  body('referenceWebsite').optional({ checkFalsy: true }).isURL().withMessage('Reference website must be a valid URL'),
];

const statusValidator = [
  body('status')
    .isIn(['New', 'Contacted', 'In Discussion', 'Approved', 'In Progress', 'Completed', 'Rejected'])
    .withMessage('Invalid status'),
];

module.exports = { quoteValidator, statusValidator };

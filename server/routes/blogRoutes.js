const express = require('express');
const {
  getPosts,
  getPostBySlug,
  getPostByIdAdmin,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/blogController');
const { protect } = require('../middleware/auth');
const optionalAuth = require('../middleware/optionalAuth');
const { blogPostValidator } = require('../validators/blogValidators');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

router.get('/', optionalAuth, getPosts);
router.get('/slug/:slug', optionalAuth, getPostBySlug);

router.get('/:id', protect, getPostByIdAdmin);
router.post('/', protect, blogPostValidator, validateRequest, createPost);
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);

module.exports = router;

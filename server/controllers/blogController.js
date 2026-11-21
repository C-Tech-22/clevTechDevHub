const blogService = require('../services/blogService');
const AnalyticsEvent = require('../models/AnalyticsEvent');
const asyncHandler = require('../utils/asyncHandler');
const { success } = require('../utils/apiResponse');

const getPosts = asyncHandler(async (req, res) => {
  const publicOnly = !req.user;
  const { items, meta } = await blogService.listPosts(req.query, { publicOnly });
  success(res, 200, 'Blog posts fetched successfully', items, { meta });
});

const getPostBySlug = asyncHandler(async (req, res) => {
  const publicOnly = !req.user;
  const post = await blogService.getPostBySlug(req.params.slug, { publicOnly });
  await blogService.incrementViews(post._id);
  AnalyticsEvent.create({ type: 'blog_view', path: `/blog/${post.slug}`, refId: post._id }).catch(() => {});
  success(res, 200, 'Blog post fetched successfully', post);
});

const getPostByIdAdmin = asyncHandler(async (req, res) => {
  const post = await blogService.getPostById(req.params.id);
  success(res, 200, 'Blog post fetched successfully', post);
});

const createPost = asyncHandler(async (req, res) => {
  const post = await blogService.createPost(req.body, req.user._id);
  success(res, 201, 'Blog post created successfully', post);
});

const updatePost = asyncHandler(async (req, res) => {
  const post = await blogService.updatePost(req.params.id, req.body);
  success(res, 200, 'Blog post updated successfully', post);
});

const deletePost = asyncHandler(async (req, res) => {
  await blogService.deletePost(req.params.id);
  success(res, 200, 'Blog post deleted successfully');
});

module.exports = { getPosts, getPostBySlug, getPostByIdAdmin, createPost, updatePost, deletePost };

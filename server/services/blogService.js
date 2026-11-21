const BlogPost = require('../models/BlogPost');
const AppError = require('../utils/AppError');
const { paginate, buildMeta } = require('../utils/paginate');
const { uniqueSlug } = require('../utils/slugify');

const estimateReadingTime = (content) => {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
};

const listPosts = async (query, { publicOnly }) => {
  const filter = {};
  if (publicOnly) filter.status = 'published';
  else if (query.status) filter.status = query.status;
  if (query.category && query.category !== 'All') filter.category = query.category;
  if (query.tag) filter.tags = query.tag.toLowerCase();
  if (query.search) filter.$text = { $search: query.search };

  const { page, limit, skip } = paginate(query);
  const sort = { publishedAt: -1, createdAt: -1 };

  const [items, total] = await Promise.all([
    BlogPost.find(filter).populate('author', 'name avatar title').sort(sort).skip(skip).limit(limit),
    BlogPost.countDocuments(filter),
  ]);

  return { items, meta: buildMeta(total, page, limit) };
};

const getPostBySlug = async (slug, { publicOnly }) => {
  const filter = { slug };
  if (publicOnly) filter.status = 'published';
  const post = await BlogPost.findOne(filter).populate('author', 'name avatar title bio');
  if (!post) throw new AppError('Blog post not found', 404);
  return post;
};

const getPostById = async (id) => {
  const post = await BlogPost.findById(id).populate('author', 'name avatar title');
  if (!post) throw new AppError('Blog post not found', 404);
  return post;
};

const createPost = async (data, authorId) => {
  data.slug = await uniqueSlug(BlogPost, data.slug || data.title);
  data.author = authorId;
  data.readingTime = estimateReadingTime(data.content);
  return BlogPost.create(data);
};

const updatePost = async (id, data) => {
  if (data.title && !data.slug) {
    data.slug = await uniqueSlug(BlogPost, data.title, id);
  }
  if (data.content) {
    data.readingTime = estimateReadingTime(data.content);
  }
  const post = await BlogPost.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!post) throw new AppError('Blog post not found', 404);
  return post;
};

const deletePost = async (id) => {
  const post = await BlogPost.findByIdAndDelete(id);
  if (!post) throw new AppError('Blog post not found', 404);
  return post;
};

const incrementViews = async (id) => {
  await BlogPost.findByIdAndUpdate(id, { $inc: { views: 1 } });
};

module.exports = { listPosts, getPostBySlug, getPostById, createPost, updatePost, deletePost, incrementViews };

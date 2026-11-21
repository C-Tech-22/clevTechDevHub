const Project = require('../models/Project');
const AppError = require('../utils/AppError');
const { paginate, buildMeta } = require('../utils/paginate');
const { uniqueSlug } = require('../utils/slugify');

// publicOnly=true restricts to published projects, used on all public-facing routes.
const listProjects = async (query, { publicOnly }) => {
  const filter = {};
  if (publicOnly) filter.published = true;
  if (query.category && query.category !== 'All') filter.category = query.category;
  if (query.status) filter.status = query.status;
  if (query.featured) filter.featured = query.featured === 'true';
  if (query.search) filter.$text = { $search: query.search };

  const { page, limit, skip } = paginate(query);
  const sort = query.sort === 'oldest' ? { createdAt: 1 } : { order: 1, createdAt: -1 };

  const [items, total] = await Promise.all([
    Project.find(filter).sort(sort).skip(skip).limit(limit),
    Project.countDocuments(filter),
  ]);

  return { items, meta: buildMeta(total, page, limit) };
};

const getProjectBySlug = async (slug, { publicOnly }) => {
  const filter = { slug };
  if (publicOnly) filter.published = true;
  const project = await Project.findOne(filter);
  if (!project) throw new AppError('Project not found', 404);
  return project;
};

const getProjectById = async (id) => {
  const project = await Project.findById(id);
  if (!project) throw new AppError('Project not found', 404);
  return project;
};

const createProject = async (data) => {
  data.slug = await uniqueSlug(Project, data.slug || data.title);
  return Project.create(data);
};

const updateProject = async (id, data) => {
  if (data.title && !data.slug) {
    data.slug = await uniqueSlug(Project, data.title, id);
  }
  const project = await Project.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!project) throw new AppError('Project not found', 404);
  return project;
};

const deleteProject = async (id) => {
  const project = await Project.findByIdAndDelete(id);
  if (!project) throw new AppError('Project not found', 404);
  return project;
};

const incrementViews = async (id) => {
  await Project.findByIdAndUpdate(id, { $inc: { views: 1 } });
};

const getRelatedProjects = async (project, limit = 3) => {
  return Project.find({
    _id: { $ne: project._id },
    category: project.category,
    published: true,
  }).limit(limit);
};

module.exports = {
  listProjects,
  getProjectBySlug,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  incrementViews,
  getRelatedProjects,
};

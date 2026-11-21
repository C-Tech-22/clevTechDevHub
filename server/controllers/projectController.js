const projectService = require('../services/projectService');
const AnalyticsEvent = require('../models/AnalyticsEvent');
const asyncHandler = require('../utils/asyncHandler');
const { success } = require('../utils/apiResponse');

const getProjects = asyncHandler(async (req, res) => {
  const publicOnly = !req.user;
  const { items, meta } = await projectService.listProjects(req.query, { publicOnly });
  success(res, 200, 'Projects fetched successfully', items, { meta });
});

const getProjectBySlug = asyncHandler(async (req, res) => {
  const publicOnly = !req.user;
  const project = await projectService.getProjectBySlug(req.params.slug, { publicOnly });
  await projectService.incrementViews(project._id);
  AnalyticsEvent.create({ type: 'project_view', path: `/projects/${project.slug}`, refId: project._id }).catch(() => {});
  const related = await projectService.getRelatedProjects(project);
  success(res, 200, 'Project fetched successfully', { project, related });
});

const getProjectByIdAdmin = asyncHandler(async (req, res) => {
  const project = await projectService.getProjectById(req.params.id);
  success(res, 200, 'Project fetched successfully', project);
});

const createProject = asyncHandler(async (req, res) => {
  const project = await projectService.createProject(req.body);
  success(res, 201, 'Project created successfully', project);
});

const updateProject = asyncHandler(async (req, res) => {
  const project = await projectService.updateProject(req.params.id, req.body);
  success(res, 200, 'Project updated successfully', project);
});

const deleteProject = asyncHandler(async (req, res) => {
  await projectService.deleteProject(req.params.id);
  success(res, 200, 'Project deleted successfully');
});

module.exports = {
  getProjects,
  getProjectBySlug,
  getProjectByIdAdmin,
  createProject,
  updateProject,
  deleteProject,
};

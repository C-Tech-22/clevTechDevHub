const Service = require('../models/Service');
const AppError = require('../utils/AppError');
const { uniqueSlug } = require('../utils/slugify');

const listServices = async ({ publicOnly }) => {
  const filter = publicOnly ? { published: true } : {};
  return Service.find(filter).sort({ order: 1, createdAt: 1 });
};

const getServiceById = async (id) => {
  const service = await Service.findById(id);
  if (!service) throw new AppError('Service not found', 404);
  return service;
};

const createService = async (data) => {
  data.slug = await uniqueSlug(Service, data.slug || data.title);
  return Service.create(data);
};

const updateService = async (id, data) => {
  if (data.title && !data.slug) {
    data.slug = await uniqueSlug(Service, data.title, id);
  }
  const service = await Service.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!service) throw new AppError('Service not found', 404);
  return service;
};

const deleteService = async (id) => {
  const service = await Service.findByIdAndDelete(id);
  if (!service) throw new AppError('Service not found', 404);
  return service;
};

module.exports = { listServices, getServiceById, createService, updateService, deleteService };

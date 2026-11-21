const serviceOfferingService = require('../services/serviceOfferingService');
const asyncHandler = require('../utils/asyncHandler');
const { success } = require('../utils/apiResponse');

const getServices = asyncHandler(async (req, res) => {
  const publicOnly = !req.user;
  const services = await serviceOfferingService.listServices({ publicOnly });
  success(res, 200, 'Services fetched successfully', services);
});

const createService = asyncHandler(async (req, res) => {
  const service = await serviceOfferingService.createService(req.body);
  success(res, 201, 'Service created successfully', service);
});

const updateService = asyncHandler(async (req, res) => {
  const service = await serviceOfferingService.updateService(req.params.id, req.body);
  success(res, 200, 'Service updated successfully', service);
});

const deleteService = asyncHandler(async (req, res) => {
  await serviceOfferingService.deleteService(req.params.id);
  success(res, 200, 'Service deleted successfully');
});

module.exports = { getServices, createService, updateService, deleteService };

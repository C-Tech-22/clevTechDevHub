const testimonialService = require('../services/testimonialService');
const asyncHandler = require('../utils/asyncHandler');
const { success } = require('../utils/apiResponse');

const getTestimonials = asyncHandler(async (req, res) => {
  const publicOnly = !req.user;
  const testimonials = await testimonialService.listTestimonials({ publicOnly });
  success(res, 200, 'Testimonials fetched successfully', testimonials);
});

const createTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await testimonialService.createTestimonial(req.body);
  success(res, 201, 'Testimonial created successfully', testimonial);
});

const updateTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await testimonialService.updateTestimonial(req.params.id, req.body);
  success(res, 200, 'Testimonial updated successfully', testimonial);
});

const deleteTestimonial = asyncHandler(async (req, res) => {
  await testimonialService.deleteTestimonial(req.params.id);
  success(res, 200, 'Testimonial deleted successfully');
});

module.exports = { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial };

const Testimonial = require('../models/Testimonial');
const AppError = require('../utils/AppError');

const listTestimonials = async ({ publicOnly }) => {
  const filter = publicOnly ? { published: true } : {};
  return Testimonial.find(filter).sort({ order: 1, createdAt: -1 });
};

const getTestimonialById = async (id) => {
  const testimonial = await Testimonial.findById(id);
  if (!testimonial) throw new AppError('Testimonial not found', 404);
  return testimonial;
};

const createTestimonial = async (data) => Testimonial.create(data);

const updateTestimonial = async (id, data) => {
  const testimonial = await Testimonial.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!testimonial) throw new AppError('Testimonial not found', 404);
  return testimonial;
};

const deleteTestimonial = async (id) => {
  const testimonial = await Testimonial.findByIdAndDelete(id);
  if (!testimonial) throw new AppError('Testimonial not found', 404);
  return testimonial;
};

module.exports = { listTestimonials, getTestimonialById, createTestimonial, updateTestimonial, deleteTestimonial };

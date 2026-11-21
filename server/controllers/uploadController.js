const asyncHandler = require('../utils/asyncHandler');
const { success } = require('../utils/apiResponse');
const AppError = require('../utils/AppError');

// Returns a locally-served URL in development. Swap in your Cloudinary/S3
// upload call here for production — everything downstream just consumes a URL string.
const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) throw new AppError('No file uploaded', 400);
  const fileUrl = `/uploads/${req.file.filename}`;
  success(res, 201, 'Image uploaded successfully', { url: fileUrl });
});

module.exports = { uploadImage };

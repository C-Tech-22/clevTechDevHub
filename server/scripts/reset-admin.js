require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/User');

const run = async () => {
  await connectDB();

  const email = (process.argv[2] || process.env.SEED_ADMIN_EMAIL || 'admin@clevtechdevhub.com').toLowerCase();
  const password = process.argv[3] || process.env.SEED_ADMIN_PASSWORD || 'ChangeThisPassword123!';

  let user = await User.findOne({ email }).select('+password');
  if (!user) {
    user = await User.create({
      name: 'ClevTech Admin',
      email,
      password,
      role: 'superadmin',
    });
    console.log(`Created admin user: ${email}`);
  } else {
    user.password = password;
    await user.save();
    console.log(`Updated password for admin: ${email}`);
  }

  await mongoose.connection.close();
  process.exit(0);
};

run().catch((err) => {
  console.error('Failed to reset admin password:', err);
  process.exit(1);
});

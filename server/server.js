const app = require('./app');
const connectDB = require('./config/db');
const { PORT, NODE_ENV } = require('./config/env');

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`ClevTech DevHub API running in ${NODE_ENV} mode on port ${PORT}`);
  });
};

startServer();

// Prevent the process from crashing silently on unexpected promise rejections.
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
});

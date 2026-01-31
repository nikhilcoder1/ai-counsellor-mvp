import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import appConfig from './config/app.config.js';
import analysisRoutes from './routes/analysis.routes.js';
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js';
import logger from './utils/logger.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: appConfig.corsOrigin }));
app.use(express.json());

// Routes
app.use('/api', analysisRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
const PORT = appConfig.port;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  logger.info(`AI Mode: ${appConfig.ai.mode}`);
  logger.info(`CORS Origin: ${appConfig.corsOrigin}`);
});
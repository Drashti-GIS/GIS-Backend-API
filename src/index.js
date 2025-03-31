/**
 * Attach global utilities
 */
import './shared/utils/global.utils.js';

import { config } from 'dotenv';

import app from './app.js';
import { port } from './config/config.js';
import logger from './config/logger.js';
import db from './database/models/index.js';

config();

const { authenticateDB, syncDB } = db;

let server;

try {
  server = app.listen(port, async () => {
    await authenticateDB();
    await syncDB();
    logger.info(`🚀 Server running on http://localhost:${port}`);
  });
} catch (error) {
  logger.error('❌ Error starting the server:', error);
}

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});

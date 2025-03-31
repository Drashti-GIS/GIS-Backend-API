import Sequelize from 'sequelize';
import { _db } from '../../config/config.js';
import logger from '../../config/logger.js';
import usersModel from './users.model.js';

const db = {};

const sequelize = new Sequelize(_db.database, _db.user, _db.password, { ..._db });

// Authenticate the database connection
const authenticateDB = async () => {
  try {
    await sequelize.authenticate();
    logger.info('✅ PostgreSQL connection has been established successfully.');
  } catch (err) {
    logger.error('❌ Sequelize connection error:', err);
    process.exit(1);
  }
};

const syncDB = async () => {
  try {
    await sequelize.sync({ alter: true, force: false });
    logger.info('🔁 Database Synchronized.');
  } catch (err) {
    logger.error('Failed to sync db:', err);
  }
};

db.authenticateDB = authenticateDB;
db.syncDB = syncDB;

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Users = usersModel(sequelize, Sequelize.DataTypes);

// Set up associations after all models are initialized
Object.keys(sequelize.models).forEach((modelName) => {
  if (sequelize.models[modelName].associate) {
    sequelize.models[modelName].associate(sequelize.models);
  }
});

export default db;

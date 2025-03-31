import db from '../../database/models/index.js';

const { sequelize } = db;

const apiHandlerWithTransaction = async (serviceFn) => {
  const transaction = await sequelize.transaction();
  try {
    const result = await serviceFn(transaction);
    await transaction.commit();
    return result;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export default apiHandlerWithTransaction;

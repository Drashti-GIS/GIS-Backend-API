import { seedAdminUser } from './user.seeder.js';

export const runSeeders = async (db) => {
  try {
    console.log('🌱 Running database seeders...');

    // Add all seeders here
    await seedAdminUser(db);

    console.log('✅ Database seeding completed');
  } catch (error) {
    console.error('❌ Error running seeders:', error);
  }
};

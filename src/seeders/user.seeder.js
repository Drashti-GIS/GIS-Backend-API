import { hashPassword } from '../services/bcrypt.service.js';

export const seedAdminUser = async (db) => {
  try {
    // Check if admin user already exists
    const existingAdmin = await db.Users.findOne({
      where: { email: 'admin@gmail.com' },
    });

    if (existingAdmin) {
      console.log('Admin user already exists, skipping seeder');
      return;
    }

    // Create admin user
    const hashedPassword = await hashPassword('Admin@123');

    await db.Users.create({
      username: 'Admin User',
      email: 'admin@gmail.com',
      password: hashedPassword,
      role: 'admin',
      isVerified: true,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log('✅ Admin user seeded successfully');
  } catch (error) {
    console.log('❌ Error seeding admin user:', error);
  }
};

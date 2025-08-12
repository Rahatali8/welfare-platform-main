const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  try {
    // Check if admin already exists
    const existingAdmin = await prisma.admin.findFirst({
      where: {
        email: 'admin@welfare.com'
      }
    });

    if (existingAdmin) {
      console.log('Admin already exists!');
      return;
    }

    // Create admin
    const admin = await prisma.admin.create({
      data: {
        name: 'Super Admin',
        email: 'admin@welfare.com',
        cnic: '1234567890123',
        password: bcrypt.hashSync('admin12@#', 10)
      }
    });

    console.log('✅ Admin created successfully!');
    console.log('📧 Email: admin@welfare.com');
    console.log('🔑 Password: admin12@#');
    console.log('🆔 CNIC: 1234567890123');
    console.log('Admin ID:', admin.id);

  } catch (error) {
    console.error('❌ Error creating admin:', error);
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });


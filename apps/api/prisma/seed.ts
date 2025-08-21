import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      email: 'user@example.com',
      password: 'password',
      transactions: {
        create: [
          { type: 'income', name: 'Salary', value: 1000 },
          { type: 'outcome', name: 'Rent', value: 500 },
        ],
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


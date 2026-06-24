import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findUnique({
    where: { email: 'laptertechnologies@gmail.com' }
  });

  if (!user) {
    console.log("User not found in DB yet. Have they logged in?");
    return;
  }

  const updatedUser = await prisma.user.update({
    where: { email: 'laptertechnologies@gmail.com' },
    data: { role: 'ADMIN' }
  });

  console.log(`Successfully updated ${updatedUser.email} to ADMIN!`);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });

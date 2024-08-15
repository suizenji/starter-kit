import { PrismaClient } from '@prisma/client';
import { users } from './user';

const prisma = new PrismaClient();

// https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding#example-seed-scripts
// NOTE: DB作成手順
// npx prisma generate
// npx prisma migrate dev
// npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seeds

// NOTE: SQLiteでInsertする時は同期的に処理する必要あり。
// forEachで回すとシーケンシャルに処理できずエラーになるのでfor loopで対応。
async function main() {
  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: user,
      create: user,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

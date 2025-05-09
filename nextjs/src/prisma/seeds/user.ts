//import { PrismaClient } from '@prisma/client';
import { Prisma } from '@/generated/prisma/client';

export const users: Prisma.UserCreateInput[] = [
  {
    name: 'admin',
    email: 'admin@localhost',
  },
  {
    name: 'member',
    email: 'member@localhost',
  },
];

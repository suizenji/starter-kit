// NOTE: Jestから読み込めないのでフルパス指定。
//import { PrismaClient } from '@prisma/client';
import { PrismaClient } from '../node_modules/@prisma/client';

export const prisma = new PrismaClient();

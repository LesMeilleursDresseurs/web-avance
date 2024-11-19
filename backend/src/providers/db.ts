import { PrismaClient } from '@prisma/client';

export const db = new PrismaClient({
  log: ['info', 'query', 'error', 'warn'],
});

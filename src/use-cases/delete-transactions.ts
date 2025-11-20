import { db } from '@/server/db';
import type { User } from 'better-auth';
import type { Transaction } from 'generated/prisma';

export const deleteTransactionUseCase = async (
  transactionId: Transaction['id'],
  userId: User['id'],
) => {
  await db.transaction.delete({
    where: {
      id: transactionId,
      AND: {
        userId,
      },
    },
  });
};

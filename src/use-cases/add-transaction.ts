import type { transactionFormSchema } from '@/components/add-transaction-dialog/schema';
import { db } from '@/server/db';
import type { Session } from 'better-auth';
import type z from 'zod';

export const addTransactionUseCase = async (
  data: z.infer<typeof transactionFormSchema>,
  userId: Session['userId'],
) => {
  await db.transaction.create({
    data: {
      ...data,
      userId,
    },
  });

  return;
};

'use server';

import { transactionFormSchema } from '@/components/add-transaction-dialog/schema';
import { authProcedure } from '@/lib/zsa-procedures';
import { addTransactionUseCase } from '@/use-cases/add-transaction';

export const addTransactionAction = authProcedure
  .createServerAction()
  .input(transactionFormSchema)
  .handler(async ({ input, ctx }) => {
    const { userId } = ctx.session;

    return addTransactionUseCase(input, userId);
  });

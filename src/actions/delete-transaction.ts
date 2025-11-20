'use server';

import { authProcedure } from '@/lib/zsa-procedures';
import { deleteTransactionUseCase } from '@/use-cases/delete-transactions';
import z from 'zod';

export const deleteTransactionServerAction = authProcedure
  .createServerAction()
  .input(z.string())
  .handler(async ({ input, ctx }) => {
    return deleteTransactionUseCase(input, ctx.user.id);
  });

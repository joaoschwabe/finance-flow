'use client';

import { getDashboardRecentTransactionsAction } from '@/actions/dashboard';
import { deleteTransactionServerAction } from '@/actions/delete-transaction';
import { Badge } from '@/components/ui/badge';
import { useServerActionMutation, useServerActionQuery } from '@/lib/hooks/server-action-hooks';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { Trash } from 'lucide-react';
import { DynamicIcon, type IconName } from 'lucide-react/dynamic';
import { Dialog } from './ui/dialog-controller';
import { Spinner } from './ui/spinner';

export function TransactionList() {
  const { data, isLoading } = useServerActionQuery(getDashboardRecentTransactionsAction, {
    input: undefined,
    queryKey: ['dashboard', 'list'],
  });
  const queryClient = useQueryClient();

  const { mutateAsync: deleteTransaction } = useServerActionMutation(deleteTransactionServerAction);

  if (isLoading) return <Spinner />;

  return (
    <div className="w-full space-y-1">
      {data?.map((transaction) => {
        return (
          <div
            onClick={() =>
              Dialog.open({
                description:
                  'Você tem certeza que deseja excluir esta transação? Esta ação não pode desfeita.',
                modal: true,
                onConfirm: async () => {
                  await deleteTransaction(transaction.id);
                  await queryClient.invalidateQueries({ queryKey: ['dashboard'] });
                },
                title: 'Excluir transação.',
              })
            }
            key={transaction.id}
            className="hover:bg-destructive/10 group relative flex cursor-pointer items-center justify-between rounded-lg p-4 transition-colors">
            <div className="flex items-center gap-4">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                  transaction.type === 'INCOME'
                    ? 'bg-accent/10 group-hover:bg-accent/20'
                    : 'bg-muted group-hover:bg-muted/80'
                } transition-colors`}>
                <DynamicIcon
                  name={transaction.icon as IconName}
                  className={`h-5 w-5 ${transaction.type === 'INCOME' ? 'text-accent' : 'text-muted-foreground'}`}
                />
              </div>
              <div>
                <p className="text-foreground font-medium">{transaction.description}</p>
                <div className="mt-1 flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs font-normal">
                    {transaction.category}
                  </Badge>
                  <span className="text-muted-foreground text-xs">
                    {dayjs(transaction.date).format('DD/MM/YYYY')}
                  </span>
                </div>
              </div>
            </div>
            <p
              className={`text-right text-lg font-semibold ${transaction.type === 'INCOME' ? 'text-accent' : 'text-foreground'}`}>
              {transaction.type === 'INCOME' ? '+' : ''}R$ {Math.abs(transaction.amount).toFixed(2)}
            </p>
            <Trash className="invisible absolute left-1/2 group-hover:visible" />
          </div>
        );
      })}
    </div>
  );
}

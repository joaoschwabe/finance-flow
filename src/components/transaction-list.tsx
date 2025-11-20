import { getDashboardRecentTransactionsAction } from '@/actions/dashboard';
import { Badge } from '@/components/ui/badge';
import { useServerActionQuery } from '@/lib/hooks/server-action-hooks';
import dayjs from 'dayjs';
import { DynamicIcon, type IconName } from 'lucide-react/dynamic';

export function TransactionList() {
  const { data } = useServerActionQuery(getDashboardRecentTransactionsAction, {
    input: undefined,
    queryKey: ['getDashboardRecentTransactionsAction'],
  });

  if (!data) return null;

  return (
    <div className="space-y-1">
      {data.map((transaction) => {
        return (
          <div
            key={transaction.id}
            className="hover:bg-muted/50 group flex cursor-pointer items-center justify-between rounded-lg p-4 transition-colors">
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
              className={`text-lg font-semibold ${transaction.type === 'INCOME' ? 'text-accent' : 'text-foreground'}`}>
              {transaction.type === 'INCOME' ? '+' : ''}R$ {Math.abs(transaction.amount).toFixed(2)}
            </p>
          </div>
        );
      })}
    </div>
  );
}

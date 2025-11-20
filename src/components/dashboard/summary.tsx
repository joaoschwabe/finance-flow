import { getSummaryDashboardStatsAction } from '@/actions/dashboard';
import { useServerActionQuery } from '@/lib/hooks/server-action-hooks';
import { ArrowDownRight, ArrowUpRight, Wallet } from 'lucide-react';
import { BalanceCard, BalanceCardSuspense } from './balance-card';

export const DashboardSummary = () => {
  const { data, isPending } = useServerActionQuery(getSummaryDashboardStatsAction, {
    input: undefined,
    queryKey: ['dashboard', 'summary-stats'],
  });

  if (isPending || !data) {
    return (
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <BalanceCardSuspense />
        <BalanceCardSuspense />
        <BalanceCardSuspense />
      </div>
    );
  }

  return (
    <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
      <BalanceCard title="Saldo Total" amount={data.totalBalance} icon={<Wallet />} />
      <BalanceCard
        title="Receitas"
        amount={data.income}
        icon={<ArrowUpRight />}
        additionalInfo="Este mês"
        color="accent"
        size="md"
      />
      <BalanceCard
        title="Despesas"
        amount={data.expenses}
        icon={<ArrowDownRight />}
        additionalInfo="Este mês"
        color="destructive"
        size="md"
      />
    </div>
  );
};

'use client';

import { getChartDashboardDataAction } from '@/actions/dashboard';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useServerActionQuery } from '@/lib/hooks/server-action-hooks';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Spinner } from './ui/spinner';

const chartConfig = {
  balance: {
    label: 'Saldo',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

export function BalanceChart() {
  const { data, isLoading } = useServerActionQuery(getChartDashboardDataAction, {
    input: undefined,
    queryKey: ['dashboard', 'chart'],
  });

  if (isLoading) return <Spinner />;

  return (
    <ChartContainer config={chartConfig} className="h-[170px] w-full">
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 10,
          left: 0,
          bottom: 0,
        }}>
        <defs>
          <linearGradient id="fillBalance" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.9} />
            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="hsl(var(--border))"
          opacity={0.3}
        />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
          tickFormatter={(value) => `R$${(value / 1000).toFixed(0)}k`}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area
          type="monotone"
          dataKey="balance"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          fill="url(#fillBalance)"
        />
      </AreaChart>
    </ChartContainer>
  );
}

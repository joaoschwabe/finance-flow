import { cn, formatCurrency } from '@/lib/utils';
import { type LucideProps } from 'lucide-react';
import React from 'react';
import { Card } from '../ui/card';

interface BalanceCardProps {
  title: string;
  amount: number;
  additionalInfo?: string;
  icon: React.ReactElement<LucideProps>;
  color?: 'primary' | 'accent' | 'destructive';
  size?: 'md' | 'lg';
}

export const BalanceCard = (props: BalanceCardProps) => {
  const { title, amount, additionalInfo, icon, color = 'primary', size = 'lg' } = props;

  return (
    <Card className="border-border/50 bg-card/50 relative overflow-hidden p-6 backdrop-blur-sm">
      <div
        className={cn('bg-primary/5 absolute top-0 right-0 h-32 w-32 rounded-full blur-3xl', {
          'bg-accent/5': color === 'accent',
          'bg-destructive/5': color === 'destructive',
        })}
      />
      <div className="relative">
        <div className="mb-4 flex items-center justify-between">
          <div
            className={cn('bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg', {
              'bg-accent/10': color === 'accent',
              'bg-destructive/10': color === 'destructive',
            })}>
            {React.cloneElement(icon, {
              className: cn('text-primary h-5 w-5', {
                'text-accent': color === 'accent',
                'text-destructive': color === 'destructive',
              }),
            })}
          </div>
          {additionalInfo && (
            <span className="text-muted-foreground text-xs">{additionalInfo}</span>
          )}
        </div>
        <p className="text-muted-foreground mb-1 text-sm">{title}</p>
        <h2
          className={cn('text-foreground text-3xl font-bold', {
            'text-primary': color === 'accent',
            'text-destructive': color === 'destructive',
            'text-2xl': size === 'md',
          })}>
          {formatCurrency(amount)}
        </h2>
      </div>
    </Card>
  );
};

export const BalanceCardSuspense = () => {
  return (
    <Card className="border-border/50 bg-card/50 relative animate-pulse overflow-hidden p-6 backdrop-blur-sm">
      <div className={cn('bg-primary/5 absolute top-0 right-0 h-32 w-32 rounded-full blur-3xl')} />
      <div className="relative">
        <div className="mb-4 flex items-center justify-between">
          <div
            className={cn(
              'bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg',
            )}></div>
        </div>
      </div>
    </Card>
  );
};

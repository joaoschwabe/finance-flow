'use client';

import {
  AddTransactionDialog,
  type TransactionFormData,
} from '@/components/add-transaction-dialog';
import { BalanceChart } from '@/components/balance-chart';
import { TransactionList } from '@/components/transaction-list';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowUpRight, CreditCard } from 'lucide-react';
import { useState } from 'react';
import { DashboardSummary } from './summary';

export function FinanceDashboard() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [type, setType] = useState<TransactionFormData['type']>('INCOME');

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}

      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Balance Cards */}
        <DashboardSummary />

        {/* Chart and Quick Actions */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="border-border/50 bg-card/50 p-6 backdrop-blur-sm lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-foreground text-lg font-semibold">Evolução Financeira</h3>
                <p className="text-muted-foreground text-sm">Últimos 6 meses</p>
              </div>
            </div>
            <BalanceChart />
          </Card>

          <Card className="border-border/50 bg-card/50 p-6 backdrop-blur-sm">
            <h3 className="text-foreground mb-6 text-lg font-semibold">Ações Rápidas</h3>
            <div className="space-y-3">
              <Button
                variant="outline"
                className="h-auto w-full justify-start gap-3 bg-transparent py-4"
                onClick={() => {
                  setType('EXPENSE');
                  setIsDialogOpen(true);
                }}>
                <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                  <CreditCard className="text-primary h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="text-foreground font-medium">Adicionar Despesa</p>
                  <p className="text-muted-foreground text-xs">Registrar novo gasto</p>
                </div>
              </Button>

              <Button
                variant="outline"
                className="h-auto w-full justify-start gap-3 bg-transparent py-4"
                onClick={() => {
                  setType('INCOME');
                  setIsDialogOpen(true);
                }}>
                <div className="bg-accent/10 flex h-10 w-10 items-center justify-center rounded-lg">
                  <ArrowUpRight className="text-accent h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="text-foreground font-medium">Adicionar Receita</p>
                  <p className="text-muted-foreground text-xs">Registrar entrada</p>
                </div>
              </Button>
            </div>
          </Card>
        </div>

        {/* Transactions */}
        <Card className="border-border/50 bg-card/50 p-6 backdrop-blur-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-foreground text-lg font-semibold">Transações Recentes</h3>
              <p className="text-muted-foreground text-sm">Últimas movimentações</p>
            </div>
          </div>
          <TransactionList />
        </Card>
      </div>

      <AddTransactionDialog type={type} open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  );
}

import type { Decimal } from 'generated/prisma/runtime/library';

export const dashboardRecentTransactionMapper = (transaction: {
  type: 'INCOME' | 'EXPENSE';
  id: string;
  description: string;
  amount: Decimal;
  category: string;
  date: Date;
  icon: string | null;
  userId: string;
}) => {
  const { amount, category, date, description, icon, type, id } = transaction;

  return { amount: amount.toNumber(), category, date, description, icon, type, id };
};

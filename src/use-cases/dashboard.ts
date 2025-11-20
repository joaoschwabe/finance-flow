import { db } from '@/server/db';
import type { User } from 'better-auth';
import dayjs from 'dayjs';

export const getSummaryDashboardStatsUseCase = async (userId: User['id']) => {
  const now = dayjs();
  const startOfMonth = now.startOf('month').toDate();
  const endOfMonth = now.endOf('month').toDate();

  const income = await db.transaction.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      userId,
      type: 'INCOME',
      date: {
        gte: startOfMonth,
        lt: endOfMonth,
      },
    },
  });

  const expenses = await db.transaction.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      userId,
      type: 'EXPENSE',
      date: {
        gte: startOfMonth,
        lt: endOfMonth,
      },
    },
  });

  const totalIncome = await db.transaction.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      userId,
      type: 'INCOME',
    },
  });

  const totalExpenses = await db.transaction.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      userId,
      type: 'EXPENSE',
    },
  });

  const totalBalance =
    (Number(totalIncome._sum.amount) ?? 0) - (Number(totalExpenses._sum.amount) ?? 0);

  return {
    income: Number(income._sum.amount) ?? 0,
    expenses: Number(expenses._sum.amount) ?? 0,
    totalBalance,
  };
};

export const getDashboardRecentTransactionsUseCase = async (userId: User['id']) => {
  const transactions = await db.transaction.findMany({
    where: { userId },
    orderBy: { date: 'desc' },
    take: 10,
  });

  return transactions;
};

export const getChartTransactionDataUseCase = async (userId: User['id']) => {
  const result: { month_year: string; income: number; expense: number }[] = await db.$queryRaw`
    SELECT 
      to_char(date, 'MM/YYYY') as month_year,
      SUM(CASE WHEN type = 'INCOME' THEN amount ELSE 0 END) as income,
      SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END) as expense
    FROM transactions
    WHERE "userId" = ${userId}
      AND date >= NOW() - INTERVAL '6 months'
    GROUP BY to_char(date, 'MM/YYYY'), date_trunc('month', date)
    ORDER BY date_trunc('month', date) ASC
  `;

  const formattedData = result.map((row) => ({
    month: row.month_year,
    income: Number(row.income),
    expense: Number(row.expense),
    balance: Number(row.income) - Number(row.expense),
  }));

  return formattedData;
};

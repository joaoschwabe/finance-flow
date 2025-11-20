'use server';

import { authProcedure } from '@/lib/zsa-procedures';
import { dashboardRecentTransactionMapper } from '@/mappers/dashboard-recent-transactions-mapper';
import {
  getChartTransactionDataUseCase,
  getDashboardRecentTransactionsUseCase,
  getSummaryDashboardStatsUseCase,
} from '@/use-cases/dashboard';

export const getSummaryDashboardStatsAction = authProcedure
  .createServerAction()
  .handler(async ({ ctx }) => {
    const { user } = ctx;

    return getSummaryDashboardStatsUseCase(user.id);
  });

export const getDashboardRecentTransactionsAction = authProcedure
  .createServerAction()
  .handler(async ({ ctx }) => {
    const { user } = ctx;

    return (await getDashboardRecentTransactionsUseCase(user.id)).map(
      dashboardRecentTransactionMapper,
    );
  });

export const getChartDashboardDataAction = authProcedure
  .createServerAction()
  .handler(async ({ ctx }) => {
    const { user } = ctx;

    return getChartTransactionDataUseCase(user.id);
  });

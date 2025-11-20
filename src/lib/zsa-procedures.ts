import { getSession } from '@/server/better-auth/server';
import { redirect } from 'next/navigation';
import 'server-only';

import { createServerActionProcedure } from 'zsa';

export const authProcedure = createServerActionProcedure().handler(async () => {
  const session = await getSession();

  if (!session?.user) {
    redirect('/login');
  }

  return { ...session };
});

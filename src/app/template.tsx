'use client';

import { SignInPage } from '@/components/sign-in-page';
import { Spinner } from '@/components/ui/spinner';
import { authClient } from '@/server/better-auth/client';

export default function HomeTemplate({ children }: { children: React.ReactNode }) {
  const session = authClient.useSession();

  if (session.isPending)
    return (
      <div className="flex min-h-full flex-col items-center justify-center p-4">
        <Spinner />
      </div>
    );

  if (!session.data) return <SignInPage />;

  return children;
}

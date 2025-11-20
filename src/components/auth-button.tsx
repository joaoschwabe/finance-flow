'use client';

import { authClient } from '@/server/better-auth/client';
import type { Session, User } from 'better-auth';
import { LogOut } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export const AuthButton = ({ session }: { session: { user: User; session: Session } | null }) => {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();

    router.refresh();
  };

  return (
    <>
      {session?.user && (
        <div
          className="hover:bg-accent/50 group relative flex cursor-pointer items-center justify-center gap-2 rounded-2xl px-3 py-2 text-right transition-colors"
          onClick={handleSignOut}>
          <div className="flex items-center gap-2 transition-all group-hover:opacity-50">
            <div>
              <p className="text-foreground text-sm font-medium">{session.user.name}</p>
              <p className="text-muted-foreground text-xs">{session.user.email}</p>
            </div>
            <Image
              src={session.user.image ?? ''}
              alt="User Avatar"
              width={32}
              height={32}
              className="mt-1 h-8 w-8 rounded-full object-cover"
            />
          </div>
          <LogOut className="absolute origin-center opacity-0 transition-all group-hover:opacity-100" />
        </div>
      )}
    </>
  );
};

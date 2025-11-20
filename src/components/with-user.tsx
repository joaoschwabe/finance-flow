import { auth } from '@/server/better-auth';
import { getSession } from '@/server/better-auth/server';
import type { Session, User } from 'better-auth';
import type { JSX } from 'react';
import { ErrorState } from './error-state';

type WithUserChildrenProps = {
  user: User;
  session: Session;
};

interface WithUserProps {
  children:
    | ((props: WithUserChildrenProps) => JSX.Element)
    | ((props: WithUserChildrenProps) => Promise<JSX.Element>)
    | JSX.Element;
  onError?: (error: Error) => JSX.Element;
}

export async function WithUser({ children, onError }: WithUserProps) {
  try {
    const session = await getSession();

    const user_id = session?.user?.id;

    if (!user_id) {
      return auth.api.signInSocial({
        body: { provider: 'google' },
      });
    }

    return typeof children === 'function' ? children(session) : <>{children}</>;
  } catch (error) {
    if (onError && error instanceof Error) {
      return onError(error);
    }

    return <ErrorState error={error as Error} />;
  }
}

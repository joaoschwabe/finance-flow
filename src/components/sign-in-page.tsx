import { authClient } from '@/server/better-auth/client';
import { TbBrandGoogle } from 'react-icons/tb';
import { Button } from './ui/button';

export const SignInPage = () => {
  const signIn = async () => {
    await authClient.signIn.social({
      provider: 'google',
    });
  };

  return (
    <div className="flex h-full min-h-[500px] flex-col items-center justify-center p-4">
      <Button size={'lg'} onClick={signIn}>
        <TbBrandGoogle size={48} />
        Entrar com Google
      </Button>
    </div>
  );
};

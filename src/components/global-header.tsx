import { getSession } from '@/server/better-auth/server';
import { Wallet } from 'lucide-react';
import { AuthButton } from './auth-button';
import { ThemeToggle } from './theme-toggle';

export const GlobalHeader = async () => {
  const session = await getSession();

  return (
    <header className="border-border/50 bg-background/80 sticky top-0 z-10 border-b backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-xl">
            <Wallet className="text-primary-foreground h-5 w-5" />
          </div>
          <div>
            <h1 className="text-foreground text-xl font-semibold">FinanceFlow</h1>
            <p className="text-muted-foreground text-sm">Controle Inteligente</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <AuthButton session={session} />
        </div>
      </div>
    </header>
  );
};

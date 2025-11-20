import { FinanceDashboard } from '@/components/dashboard/finance-dashboard';
import { DialogContainer } from '@/components/ui/dialog-controller';

export default function Home() {
  return (
    <main className="min-h-screen">
      <DialogContainer />
      <FinanceDashboard />
    </main>
  );
}

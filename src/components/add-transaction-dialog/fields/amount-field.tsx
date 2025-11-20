import { FormField, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';
import type { TransactionFormData } from '..';

export const AmountField = () => {
  const { control } = useFormContext<TransactionFormData>();

  return (
    <FormField
      name="amount"
      control={control}
      render={({ field }) => (
        <div className="space-y-2">
          <FormLabel>Valor</FormLabel>
          <Input id="amount" type="number" step="0.01" placeholder="0,00" required {...field} />
          <FormMessage />
        </div>
      )}
    />
  );
};

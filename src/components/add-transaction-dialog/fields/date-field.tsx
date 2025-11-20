import { DatePicker } from '@/components/ui/date-picker';
import { FormField, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { useFormContext } from 'react-hook-form';
import type { TransactionFormData } from '..';

export const DateField = () => {
  const { control } = useFormContext<TransactionFormData>();

  return (
    <FormField
      name="date"
      control={control}
      render={({ field }) => (
        <div className="w-full space-y-2">
          <Label htmlFor="date">Data</Label>
          <DatePicker {...field} />
          <FormMessage />
        </div>
      )}
    />
  );
};

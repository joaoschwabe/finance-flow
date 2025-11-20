import { FormField, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';
import type { TransactionFormData } from '..';

export const DescriptionField = () => {
  const { control } = useFormContext<TransactionFormData>();

  return (
    <FormField
      name="description"
      control={control}
      render={({ field }) => (
        <div className="space-y-2">
          <FormLabel>Descrição</FormLabel>
          <Input
            id="description"
            placeholder="Ex: Salário, Supermercado, Aluguel..."
            required
            {...field}
          />
          <FormMessage />
        </div>
      )}
    />
  );
};

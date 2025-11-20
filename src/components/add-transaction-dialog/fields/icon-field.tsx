import { FormField, FormLabel, FormMessage } from '@/components/ui/form';
import { IconPicker, type IconName } from '@/components/ui/icon-picker';
import { useFormContext, useWatch } from 'react-hook-form';
import type { TransactionFormData } from '..';
import { iconsPerCategory } from '../icons-per-category';

export const IconField = () => {
  const methods = useFormContext<TransactionFormData>();
  const { control } = methods;

  const [type, category] = useWatch({
    control,
    name: ['type', 'category'],
  });

  return (
    <FormField
      name="icon"
      control={control}
      render={({ field }) => (
        <div className="w-full space-y-2">
          <FormLabel>Ícone</FormLabel>
          <IconPicker
            value={field.value as IconName | undefined}
            modal={true}
            onValueChange={field.onChange}
            searchable={false}
            iconsList={iconsPerCategory[type][category]?.map((icon) => ({
              name: icon.name,
              categories: [],
              tags: [],
            }))}
          />
          <FormMessage />
        </div>
      )}
    />
  );
};

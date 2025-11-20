import { FormField, FormLabel, FormMessage } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '@/constants/cattegories';
import { useRef } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import type { TransactionFormData } from '..';
import { iconsPerCategory } from '../icons-per-category';

export const CategoryField = () => {
  const methods = useFormContext<TransactionFormData>();
  const { control } = methods;

  const type = useWatch({
    control,
    name: 'type',
  });

  const selectTriggerRef = useRef<HTMLButtonElement>(null);

  return (
    <FormField
      name="category"
      control={control}
      render={({ field }) => (
        <div className="w-full space-y-2">
          <FormLabel>Categoria</FormLabel>
          <Select
            defaultValue="alimentacao"
            required
            value={field.value}
            onValueChange={(value) => {
              field.onChange(value);
              const icon = iconsPerCategory[type][value]?.[0]?.name;

              if (icon) methods.setValue('icon', icon);
            }}>
            <SelectTrigger ref={selectTriggerRef} id="category">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {type === 'EXPENSE' ? (
                <>
                  {EXPENSE_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </>
              ) : (
                <>
                  {INCOME_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </>
              )}
            </SelectContent>
          </Select>
          <FormMessage />
        </div>
      )}
    />
  );
};

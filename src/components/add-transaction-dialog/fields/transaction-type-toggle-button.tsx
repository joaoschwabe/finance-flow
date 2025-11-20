import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { useFormContext, useWatch } from 'react-hook-form';
import type { TransactionFormData } from '..';
import { Button } from '../../ui/button';

export const TransactionTypeToggleButton = () => {
  const methods = useFormContext<TransactionFormData>();
  const { control } = methods;

  const type = useWatch({
    control,
    name: 'type',
  });

  const handleTypeChange = (type: 'EXPENSE' | 'INCOME') => {
    methods.setValue('type', type);
    methods.setValue('category', '');
    methods.setValue('icon', '');
  };

  return (
    <div className="flex gap-3">
      <Button
        type="button"
        variant={type === 'EXPENSE' ? 'default' : 'outline'}
        className="flex-1 gap-2"
        onClick={() => handleTypeChange('EXPENSE')}>
        <ArrowDownRight className="h-4 w-4" />
        Despesa
      </Button>
      <Button
        type="button"
        variant={type === 'INCOME' ? 'default' : 'outline'}
        className="flex-1 gap-2"
        onClick={() => handleTypeChange('INCOME')}>
        <ArrowUpRight className="h-4 w-4" />
        Receita
      </Button>
    </div>
  );
};

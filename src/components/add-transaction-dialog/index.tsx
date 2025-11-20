'use client';

import { addTransactionAction } from '@/actions/add-transaction';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useServerActionMutation } from '@/lib/hooks/server-action-hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type z from 'zod';
import { Form } from '../ui/form';
import { AmountField } from './fields/amount-field';
import { CategoryField } from './fields/category-field';
import { DateField } from './fields/date-field';
import { DescriptionField } from './fields/description-field';
import { IconField } from './fields/icon-field';
import { TransactionTypeToggleButton } from './fields/transaction-type-toggle-button';
import { transactionFormSchema } from './schema';

interface AddTransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type?: TransactionFormData['type'];
}

export type TransactionFormData = z.infer<typeof transactionFormSchema>;

export function AddTransactionDialog({ open, onOpenChange, type }: AddTransactionDialogProps) {
  const methods = useForm<TransactionFormData>({
    defaultValues: {
      type: 'EXPENSE',
      description: '',
      amount: 0,
      category: '',
      date: '',
    },
    mode: 'onChange',
    resolver: zodResolver(transactionFormSchema),
  });
  const queryClient = useQueryClient();

  const addTransactionMutation = useServerActionMutation(addTransactionAction);

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      await addTransactionMutation.mutateAsync(data);

      await queryClient.invalidateQueries({
        exact: false,
        queryKey: ['dashboard'],
      });

      methods.reset();

      onOpenChange(false);
    } catch {
      console.error('ocorreu um erro!');
    }
  });

  useEffect(() => {
    if (type) {
      methods.reset();
      methods.setValue('type', type);
    }
  }, [methods, type]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Nova Transação</DialogTitle>
          <DialogDescription>
            Adicione uma nova receita ou despesa ao seu controle financeiro
          </DialogDescription>
        </DialogHeader>
        <Form {...methods}>
          <form onSubmit={onSubmit} className="mt-4 space-y-6">
            <TransactionTypeToggleButton />

            <DescriptionField />

            <AmountField />

            <div className="flex w-full gap-2">
              <CategoryField />

              <IconField />
            </div>

            <DateField />

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button onClick={onSubmit} className="flex-1">
                Adicionar Transação
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

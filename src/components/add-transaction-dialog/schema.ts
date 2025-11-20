import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '@/constants/cattegories';
import dayjs from 'dayjs';
import z from 'zod';

export const transactionFormSchema = z
  .object({
    type: z.enum(['INCOME', 'EXPENSE']),
    description: z.string().min(1, 'Descrição é obrigatória'),
    amount: z.coerce.number().min(0.01, 'Valor deve ser maior que zero'),
    category: z.string().min(1, 'Categoria é obrigatória'),
    icon: z.string().optional(),
    date: z.string().refine((date) => dayjs(date).isValid(), {
      message: 'Data inválida',
    }),
  })
  .refine(
    (data) => {
      if (data.type === 'INCOME') {
        return INCOME_CATEGORIES.includes(data.category);
      } else {
        return EXPENSE_CATEGORIES.includes(data.category);
      }
    },
    {
      message: 'Categoria inválida',
      path: ['category'],
    },
  );

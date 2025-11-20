export const iconsPerCategory: Record<'INCOME' | 'EXPENSE', Record<string, { name: string }[]>> = {
  INCOME: {
    Salário: [{ name: 'dollar-sign' }, { name: 'wallet' }, { name: 'piggy-bank' }],
    Freelance: [{ name: 'laptop' }, { name: 'code' }, { name: 'briefcase' }],
    Investimentos: [{ name: 'trending-up' }, { name: 'chart-bar' }, { name: 'pie-chart' }],
    Outros: [{ name: 'gift' }, { name: 'star' }, { name: 'heart' }],
  },
  EXPENSE: {
    Alimentação: [{ name: 'coffee' }, { name: 'shopping-cart' }, { name: 'utensils' }],
    Transporte: [{ name: 'car' }, { name: 'bus' }, { name: 'bike' }],
    Moradia: [{ name: 'home' }, { name: 'building' }, { name: 'key' }],
    Saúde: [{ name: 'heart-pulse' }, { name: 'bandage' }, { name: 'pill' }],
    Educação: [{ name: 'book' }, { name: 'graduation-cap' }, { name: 'school' }],
    Lazer: [{ name: 'gamepad' }, { name: 'music' }, { name: 'film' }],
    Outros: [{ name: 'gift' }, { name: 'star' }, { name: 'heart' }],
  },
};

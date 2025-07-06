import type { TPaymentMethod } from '@/types/shippingInfo.type';

export const USER_ROLE = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

export const PAYMENT_METHODS: TPaymentMethod[] = ['COD', 'CARD'];

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function generateOrderNumber(): string {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `TBF-${dateStr}-${randomSuffix}`;
}

export const ORDER_STATUS_MAP: Record<string, { label: string; color: string; description: string }> = {
  ORDER_RECEIVED: {
    label: 'Order Received',
    color: 'text-amber-600 bg-amber-50 border-amber-200',
    description: 'We have received your order and are confirming it with the kitchen.',
  },
  CONFIRMED: {
    label: 'Confirmed',
    color: 'text-blue-600 bg-blue-50 border-blue-200',
    description: 'The kitchen has accepted your order and is queuing preparation.',
  },
  PREPARING: {
    label: 'Preparing',
    color: 'text-purple-600 bg-purple-50 border-purple-200',
    description: 'Freshly seasoned and frying to golden crispy perfection.',
  },
  READY: {
    label: 'Ready for Pickup / Handover',
    color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    description: 'Packaged hot and ready.',
  },
  OUT_FOR_DELIVERY: {
    label: 'Out for Delivery',
    color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    description: 'Our delivery partner is on the way to your doorstep.',
  },
  DELIVERED: {
    label: 'Delivered',
    color: 'text-emerald-700 bg-emerald-100 border-emerald-300',
    description: 'Delivered hot & fresh! Enjoy your meal.',
  },
  PICKED_UP: {
    label: 'Picked Up',
    color: 'text-emerald-700 bg-emerald-100 border-emerald-300',
    description: 'Order successfully handed over to you. Enjoy!',
  },
  CANCELLED: {
    label: 'Cancelled',
    color: 'text-rose-600 bg-rose-50 border-rose-200',
    description: 'This order was cancelled.',
  },
};

export const PAYMENT_STATUS_MAP: Record<string, { label: string; color: string }> = {
  PENDING: { label: 'Pending Payment', color: 'text-amber-700 bg-amber-50 border-amber-200' },
  PAID: { label: 'Paid via Razorpay', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
  FAILED: { label: 'Payment Failed', color: 'text-rose-700 bg-rose-50 border-rose-200' },
  CANCELLED: { label: 'Payment Cancelled', color: 'text-slate-700 bg-slate-100 border-slate-200' },
  REFUNDED: { label: 'Refunded', color: 'text-purple-700 bg-purple-50 border-purple-200' },
};

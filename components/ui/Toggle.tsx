'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Bike, ShoppingBag } from 'lucide-react';

interface OrderTypeToggleProps {
  orderType: 'DELIVERY' | 'PICKUP';
  onChange: (type: 'DELIVERY' | 'PICKUP') => void;
  className?: string;
}

export function OrderTypeToggle({
  orderType,
  onChange,
  className,
}: OrderTypeToggleProps) {
  return (
    <div
      role="group"
      aria-label="Order Delivery or Pickup Selection"
      className={cn(
        'relative inline-flex p-1 bg-slate-100 rounded-2xl border border-slate-200/80 shadow-inner',
        className
      )}
    >
      {/* Animated Sliding Background Pill */}
      <div
        className={cn(
          'absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-xl shadow-sm transition-all duration-300 ease-out border border-purple-100',
          orderType === 'DELIVERY' ? 'left-1' : 'left-[calc(50%+2px)]'
        )}
      />

      <button
        type="button"
        onClick={() => onChange('DELIVERY')}
        className={cn(
          'relative z-10 flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-colors duration-200',
          orderType === 'DELIVERY'
            ? 'text-purple-700'
            : 'text-slate-600 hover:text-slate-900'
        )}
      >
        <Bike className="w-4 h-4" />
        <span>Delivery</span>
      </button>

      <button
        type="button"
        onClick={() => onChange('PICKUP')}
        className={cn(
          'relative z-10 flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-colors duration-200',
          orderType === 'PICKUP'
            ? 'text-purple-700'
            : 'text-slate-600 hover:text-slate-900'
        )}
      >
        <ShoppingBag className="w-4 h-4" />
        <span>Takeaway / Pickup</span>
      </button>
    </div>
  );
}

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
}

export function Switch({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  className,
}: SwitchProps) {
  return (
    <label
      className={cn(
        'inline-flex items-center gap-3 cursor-pointer select-none',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <div
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          'relative w-12 h-6.5 rounded-full transition-colors duration-200 ease-in-out p-0.5 border',
          checked
            ? 'bg-purple-600 border-purple-600 purple-glow-sm'
            : 'bg-slate-200 border-slate-300'
        )}
      >
        <div
          className={cn(
            'w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out',
            checked ? 'translate-x-5.5' : 'translate-x-0.5'
          )}
        />
      </div>
      {(label || description) && (
        <div className="flex flex-col text-left">
          {label && (
            <span className="text-sm font-medium text-slate-800">{label}</span>
          )}
          {description && (
            <span className="text-xs text-slate-500">{description}</span>
          )}
        </div>
      )}
    </label>
  );
}

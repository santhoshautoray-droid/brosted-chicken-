import React from 'react';
import { cn } from '@/lib/utils';

export function VegBadge({ isVeg, className }: { isVeg: boolean; className?: string }) {
  if (isVeg) {
    return (
      <span
        title="Vegetarian"
        className={cn(
          'inline-flex items-center justify-center w-4 h-4 border-2 border-emerald-600 rounded-sm bg-white p-0.5',
          className
        )}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-600" />
      </span>
    );
  }

  return (
    <span
      title="Non-Vegetarian"
      className={cn(
        'inline-flex items-center justify-center w-4 h-4 border-2 border-rose-600 rounded-sm bg-white p-0.5',
        className
      )}
    >
      <span className="w-2 h-2 rounded-full bg-rose-600" />
    </span>
  );
}

export function TagBadge({
  children,
  variant = 'default',
  className,
}: {
  children: React.ReactNode;
  variant?: 'default' | 'purple' | 'amber' | 'emerald';
  className?: string;
}) {
  const variants = {
    default: 'bg-slate-100 text-slate-700 border-slate-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200 shadow-sm shadow-purple-500/10',
    amber: 'bg-amber-50 text-amber-800 border-amber-200',
    emerald: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide border',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

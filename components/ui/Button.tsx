import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 cursor-pointer select-none active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2';

    const variants = {
      primary:
        'bg-purple-600 text-white shadow-md shadow-purple-600/25 hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-600/35 hover:-translate-y-0.5 active:bg-purple-800',
      secondary:
        'bg-purple-50 text-purple-700 hover:bg-purple-100 hover:text-purple-800 border border-purple-200/60 active:bg-purple-200/80',
      outline:
        'border-2 border-slate-200 bg-white text-slate-800 hover:border-purple-600 hover:text-purple-600 hover:bg-purple-50/50 hover:-translate-y-0.5',
      ghost:
        'text-slate-600 hover:text-purple-600 hover:bg-purple-50/80',
      danger:
        'bg-rose-600 text-white shadow-md shadow-rose-600/20 hover:bg-rose-700 hover:-translate-y-0.5 active:bg-rose-800',
    };

    const sizes = {
      sm: 'text-xs px-3 py-1.5 gap-1.5 rounded-lg',
      md: 'text-sm px-5 py-2.5 gap-2',
      lg: 'text-base px-6 py-3.5 gap-2.5 font-semibold rounded-2xl',
      icon: 'p-2.5 w-10 h-10 rounded-full',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

'use client';

import React from 'react';
import { useCart } from '@/lib/cart-context';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export function MobileCartBar() {
  const { summary, setIsCartOpen } = useCart();

  if (summary.itemCount === 0) return null;

  return (
    <div className="sm:hidden fixed bottom-4 inset-x-4 z-40 animate-in slide-in-from-bottom duration-300">
      <button
        type="button"
        onClick={() => setIsCartOpen(true)}
        className="w-full bg-purple-600 text-white rounded-2xl p-4 shadow-xl shadow-purple-600/40 flex items-center justify-between purple-glow active:scale-[0.98] transition-transform"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-700/80 flex items-center justify-center font-bold text-sm">
            <ShoppingBag className="w-5 h-5 text-purple-200" />
          </div>
          <div className="text-left">
            <div className="text-xs font-semibold text-purple-200">
              {summary.itemCount} {summary.itemCount === 1 ? 'item' : 'items'} in cart
            </div>
            <div className="text-base font-extrabold">₹{summary.totalAmount}</div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-extrabold tracking-wide uppercase bg-purple-500/60 px-3.5 py-2 rounded-xl border border-purple-400/30">
          <span>View Cart</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </button>
    </div>
  );
}

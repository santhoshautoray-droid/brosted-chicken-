'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/cart-context';
import { Button } from '@/components/ui/Button';
import { OrderTypeToggle } from '@/components/ui/Toggle';
import { VegBadge } from '@/components/ui/Badge';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Clock,
  Sparkles,
} from 'lucide-react';
import { RESTAURANT_INFO } from '@/lib/constants';

export function CartDrawer() {
  const {
    items,
    orderType,
    setOrderType,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeItem,
    clearCart,
    summary,
  } = useCart();

  // Escape key and body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        setIsCartOpen(false);
      }
    };

    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      {/* Backdrop overlay */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0d131f] text-white shadow-2xl flex flex-col border-l border-slate-800 transform transition-transform duration-300 ease-in-out">
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-[#090D16]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-950/80 border border-purple-800 flex items-center justify-center text-purple-300">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h2 className="text-base sm:text-lg font-black text-white">
                Your Order ({summary.itemCount})
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Delivery / Pickup Switch */}
          <div className="px-4 py-3 bg-[#090D16]/60 border-b border-slate-800/80">
            <OrderTypeToggle
              orderType={orderType}
              onChange={setOrderType}
              className="w-full bg-[#131b2e] border-slate-800"
            />
            <div className="mt-2 flex items-center justify-between text-xs text-slate-400 px-1">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-purple-400" />
                Est. {RESTAURANT_INFO.defaults.estimatedDeliveryMinutes} mins
              </span>
              <span>
                {orderType === 'DELIVERY'
                  ? `Delivery fee: ₹${RESTAURANT_INFO.defaults.deliveryFee}`
                  : 'Pickup at Chanchalguda'}
              </span>
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
                <div className="w-20 h-20 rounded-full bg-purple-950/40 border border-purple-800/60 flex items-center justify-center text-purple-400 mb-4 purple-glow-sm">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">
                  Your cart is empty
                </h3>
                <p className="text-sm text-slate-400 max-w-xs mb-6">
                  Add some crispy broasted chicken, juicy burgers, or loaded wings to get started!
                </p>
                <Button
                  variant="primary"
                  onClick={() => setIsCartOpen(false)}
                  className="rounded-full px-6 bg-purple-600 hover:bg-purple-500 font-bold"
                >
                  Explore Delicious Menu
                </Button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 rounded-2xl border border-slate-800 bg-[#131b2e] hover:border-purple-500/50 transition-all shadow-md"
                >
                  {/* Item Image */}
                  {item.imageUrl ? (
                    <div className="relative w-18 h-18 rounded-xl overflow-hidden bg-slate-900 flex-shrink-0">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="72px"
                      />
                    </div>
                  ) : (
                    <div className="w-18 h-18 rounded-xl bg-purple-950/40 flex items-center justify-center text-purple-400 flex-shrink-0">
                      <Sparkles className="w-6 h-6" />
                    </div>
                  )}

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <div className="flex items-center gap-1.5 truncate">
                        <VegBadge isVeg={item.isVeg} />
                        <h4 className="text-sm font-bold text-white truncate">
                          {item.name}
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Options list */}
                    {item.selectedOptions && item.selectedOptions.length > 0 && (
                      <div className="text-[11px] text-purple-300 mt-1 line-clamp-2">
                        {item.selectedOptions
                          .map(
                            (o) =>
                              `${o.optionName}${o.price > 0 ? ` (+₹${o.price})` : ''}`
                          )
                          .join(', ')}
                      </div>
                    )}

                    {/* Price and Quantity Controls */}
                    <div className="flex items-center justify-between mt-2.5">
                      <span className="text-sm font-black text-white">
                        ₹{item.unitPrice * item.quantity}
                      </span>
                      <div className="flex items-center gap-1.5 bg-[#090D16] rounded-xl p-1 border border-slate-800">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-6 h-6 rounded-lg bg-[#1a243d] text-slate-300 flex items-center justify-center hover:bg-purple-600 hover:text-white transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-black text-white">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-6 h-6 rounded-lg bg-purple-600 text-white flex items-center justify-center hover:bg-purple-500 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer with Subtotal & Checkout */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-800 bg-[#090D16] space-y-3">
              <div className="space-y-1.5 text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-white">
                    ₹{summary.subtotal}
                  </span>
                </div>
                {orderType === 'DELIVERY' && (
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="font-bold text-white">
                      ₹{summary.deliveryFee}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated GST (5%)</span>
                  <span className="font-bold text-white">
                    ₹{summary.taxAmount}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-slate-800">
                  <span>Total Amount</span>
                  <span className="text-purple-400">₹{summary.totalAmount}</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full block"
                >
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full flex items-center justify-between px-6 py-4 rounded-2xl shadow-xl shadow-purple-600/30 purple-glow bg-purple-600 hover:bg-purple-500 font-black text-base"
                  >
                    <span>Proceed to Checkout</span>
                    <div className="flex items-center gap-1.5">
                      <span>₹{summary.totalAmount}</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Button>
                </Link>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-[11px] text-slate-500 hover:text-rose-400 transition-colors"
                >
                  Clear entire cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

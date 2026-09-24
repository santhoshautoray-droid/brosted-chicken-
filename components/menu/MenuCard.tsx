'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MenuItemWithDetails } from '@/lib/types';
import { useCart } from '@/lib/cart-context';
import { Button } from '@/components/ui/Button';
import { VegBadge, TagBadge } from '@/components/ui/Badge';
import { ItemModal } from '@/components/menu/ItemModal';
import { Plus, Minus, Sparkles, SlidersHorizontal, Flame } from 'lucide-react';

interface MenuCardProps {
  item: MenuItemWithDetails;
}

export function MenuCard({ item }: MenuCardProps) {
  const { items, addItem, updateQuantity } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Check how many of this item is currently in the cart
  const cartMatches = items.filter((i) => i.menuItemId === item.id);
  const totalQuantityInCart = cartMatches.reduce((sum, i) => sum + i.quantity, 0);

  const hasOptions = item.optionGroups && item.optionGroups.length > 0;

  const handleQuickAdd = () => {
    if (hasOptions) {
      setIsModalOpen(true);
    } else {
      addItem({
        menuItemId: item.id,
        name: item.name,
        slug: item.slug,
        price: item.price,
        unitPrice: item.price,
        quantity: 1,
        imageUrl: item.imageUrl,
        isVeg: item.isVeg,
        selectedOptions: [],
      });
    }
  };

  return (
    <>
      <div className="group relative bg-[#131b2e] rounded-3xl border border-slate-800/90 shadow-lg shadow-black/40 hover:shadow-2xl hover:shadow-purple-950/60 hover:border-purple-500/60 transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1.5">
        {/* Card Image Container */}
        <Link href={`/menu/${item.slug}`} className="relative w-full h-48 sm:h-52 bg-slate-900 overflow-hidden block">
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.name}
              fill
              className="object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-purple-950/30 text-purple-400">
              <Sparkles className="w-10 h-10" />
            </div>
          )}

          {/* Badges on Image */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <VegBadge isVeg={item.isVeg} />
            {item.isFeatured && (
              <TagBadge variant="amber" className="shadow-md">
                <Flame className="w-3 h-3 fill-amber-500 text-amber-500" />
                Featured
              </TagBadge>
            )}
          </div>

          {/* Prep time badge */}
          <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md text-slate-200 text-[11px] px-2.5 py-1 rounded-full font-semibold border border-white/10">
            {item.preparationTimeMinutes}m prep
          </div>
        </Link>

        {/* Card Body */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
          <div>
            {/* Category / Subtitle */}
            {item.category && (
              <span className="text-[11px] uppercase tracking-wider font-extrabold text-purple-400 mb-1 block">
                {item.category.name}
              </span>
            )}

            {/* Title */}
            <Link href={`/menu/${item.slug}`} className="block">
              <h3 className="font-extrabold text-base sm:text-lg text-white group-hover:text-purple-300 transition-colors line-clamp-1">
                {item.name}
              </h3>
            </Link>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Price & Add to Cart Controls */}
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
            <div>
              <span className="text-[11px] text-slate-500 block font-semibold uppercase tracking-wider">
                Price
              </span>
              <span className="text-lg sm:text-xl font-black text-white">
                ₹{item.price}
              </span>
            </div>

            {/* Add button or quantity controls */}
            {!item.isAvailable ? (
              <span className="text-xs font-bold text-rose-400 bg-rose-950/80 px-3 py-1.5 rounded-xl border border-rose-800">
                Sold Out
              </span>
            ) : totalQuantityInCart > 0 && !hasOptions ? (
              <div className="flex items-center gap-1.5 bg-[#090D16] rounded-xl p-1 border border-purple-800/80">
                <button
                  type="button"
                  onClick={() =>
                    updateQuantity(cartMatches[0].id, cartMatches[0].quantity - 1)
                  }
                  className="w-7 h-7 rounded-lg bg-[#1a243d] text-purple-300 flex items-center justify-center hover:bg-purple-600 hover:text-white transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-6 text-center text-xs font-black text-white">
                  {totalQuantityInCart}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    updateQuantity(cartMatches[0].id, cartMatches[0].quantity + 1)
                  }
                  className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center hover:bg-purple-500 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <Button
                variant={hasOptions ? 'secondary' : 'primary'}
                size="sm"
                onClick={handleQuickAdd}
                className={
                  hasOptions
                    ? 'rounded-xl px-4 py-2 font-bold flex items-center gap-1.5 bg-[#1e293b] text-purple-300 hover:bg-purple-950/60 border border-purple-500/30'
                    : 'rounded-xl px-4 py-2 font-bold flex items-center gap-1.5 bg-purple-600 hover:bg-purple-500 text-white purple-glow-sm shadow-md'
                }
              >
                {hasOptions ? (
                  <>
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>Customize</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Customization Modal */}
      <ItemModal
        item={item}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

'use client';

import React, { useState } from 'react';
import { MenuItemWithDetails, SelectedOption } from '@/lib/types';
import { useCart } from '@/lib/cart-context';
import { Button } from '@/components/ui/Button';
import { Plus, Minus, Check, ShoppingBag } from 'lucide-react';

export function DishDetailClient({ item }: { item: MenuItemWithDetails }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>(() => {
    const initial: SelectedOption[] = [];
    item.optionGroups.forEach((group) => {
      if (group.isRequired && group.options.length > 0) {
        const firstAvailable = group.options.find((o) => o.isAvailable) || group.options[0];
        if (firstAvailable) {
          initial.push({
            optionGroupId: group.id,
            groupName: group.name,
            optionId: firstAvailable.id,
            optionName: firstAvailable.name,
            price: firstAvailable.price,
          });
        }
      }
    });
    return initial;
  });

  const handleRadioOptionSelect = (
    group: MenuItemWithDetails['optionGroups'][0],
    option: MenuItemWithDetails['optionGroups'][0]['options'][0]
  ) => {
    setSelectedOptions((prev) => {
      const filtered = prev.filter((o) => o.optionGroupId !== group.id);
      return [
        ...filtered,
        {
          optionGroupId: group.id,
          groupName: group.name,
          optionId: option.id,
          optionName: option.name,
          price: option.price,
        },
      ];
    });
  };

  const handleCheckboxOptionToggle = (
    group: MenuItemWithDetails['optionGroups'][0],
    option: MenuItemWithDetails['optionGroups'][0]['options'][0]
  ) => {
    setSelectedOptions((prev) => {
      const isSelected = prev.some((o) => o.optionId === option.id);
      if (isSelected) {
        return prev.filter((o) => o.optionId !== option.id);
      } else {
        const groupSelectedCount = prev.filter((o) => o.optionGroupId === group.id).length;
        if (groupSelectedCount >= group.maxSelections) {
          return prev;
        }
        return [
          ...prev,
          {
            optionGroupId: group.id,
            groupName: group.name,
            optionId: option.id,
            optionName: option.name,
            price: option.price,
          },
        ];
      }
    });
  };

  const optionsTotal = selectedOptions.reduce((sum, o) => sum + o.price, 0);
  const unitPrice = item.price + optionsTotal;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addItem({
      menuItemId: item.id,
      name: item.name,
      slug: item.slug,
      price: item.price,
      unitPrice,
      quantity,
      imageUrl: item.imageUrl,
      isVeg: item.isVeg,
      selectedOptions,
    });
  };

  return (
    <div className="space-y-6">
      {/* Option Groups */}
      {item.optionGroups.map((group) => {
        const isRadio = group.maxSelections === 1;
        return (
          <div key={group.id} className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white">
                {group.name}
              </span>
              <span className="text-xs text-purple-300 bg-purple-950 border border-purple-800 px-2 py-0.5 rounded-full font-semibold">
                {group.isRequired ? 'Required' : `Up to ${group.maxSelections}`}
              </span>
            </div>

            <div className="space-y-2">
              {group.options.map((option) => {
                const isSelected = selectedOptions.some(
                  (o) => o.optionId === option.id
                );

                return (
                  <div
                    key={option.id}
                    onClick={() => {
                      if (!option.isAvailable) return;
                      if (isRadio) {
                        handleRadioOptionSelect(group, option);
                      } else {
                        handleCheckboxOptionToggle(group, option);
                      }
                    }}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer select-none ${
                      isSelected
                        ? 'border-purple-500 bg-purple-950/70 shadow-md'
                        : 'border-slate-800 hover:border-slate-700 bg-[#090D16]'
                    } ${!option.isAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-${
                          isRadio ? 'full' : 'md'
                        } border flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'border-purple-500 bg-purple-600 text-white'
                            : 'border-slate-700 bg-slate-900'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span className="text-sm font-semibold text-slate-200">
                        {option.name}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-slate-300">
                      {option.price > 0 ? `+₹${option.price}` : 'Free'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Quantity & CTA */}
      <div className="flex items-center gap-4">
        {/* Quantity control */}
        <div className="flex items-center gap-2 bg-[#090D16] rounded-2xl p-1.5 border border-slate-800 shadow-inner">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-10 h-10 rounded-xl bg-[#131b2e] text-slate-300 hover:bg-purple-600 hover:text-white flex items-center justify-center transition-colors shadow-xs"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-8 text-center font-black text-white">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="w-10 h-10 rounded-xl bg-[#131b2e] text-slate-300 hover:bg-purple-600 hover:text-white flex items-center justify-center transition-colors shadow-xs"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Add to Cart Button */}
        <Button
          variant="primary"
          size="lg"
          onClick={handleAddToCart}
          className="flex-1 py-4 rounded-2xl flex items-center justify-between font-black shadow-xl shadow-purple-600/40 purple-glow bg-purple-600 hover:bg-purple-500"
        >
          <span className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            <span>Add to Cart</span>
          </span>
          <span className="text-lg font-black">₹{totalPrice}</span>
        </Button>
      </div>
    </div>
  );
}

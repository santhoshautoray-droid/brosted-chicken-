'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MenuItemWithDetails, SelectedOption } from '@/lib/types';
import { useCart } from '@/lib/cart-context';
import { Button } from '@/components/ui/Button';
import { VegBadge, TagBadge } from '@/components/ui/Badge';
import { X, Clock, Plus, Minus, Check, Flame } from 'lucide-react';

interface ItemModalProps {
  item: MenuItemWithDetails | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ItemModal({ item, isOpen, onClose }: ItemModalProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>([]);

  // Reset when item opens
  React.useEffect(() => {
    if (item) {
      setQuantity(1);
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
      setSelectedOptions(initial);
    }
  }, [item]);

  if (!isOpen || !item) return null;

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
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="min-h-full flex items-center justify-center p-3 sm:p-6 text-center">
        <div className="relative w-full max-w-lg bg-[#0d131f] text-white rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all border border-slate-800 flex flex-col max-h-[92vh]">
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 text-white hover:bg-purple-600 flex items-center justify-center backdrop-blur-md transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Food Image */}
          {item.imageUrl && (
            <div className="relative w-full h-56 sm:h-64 bg-slate-900 flex-shrink-0">
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 512px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d131f] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <VegBadge isVeg={item.isVeg} />
                {item.isFeatured && (
                  <TagBadge variant="amber" className="shadow-md">
                    <Flame className="w-3 h-3 fill-amber-500" />
                    Signature Broast
                  </TagBadge>
                )}
              </div>
            </div>
          )}

          {/* Content Body */}
          <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {item.name}
              </h3>
              <p className="text-slate-400 text-sm mt-1.5 leading-relaxed">
                {item.description}
              </p>
              <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                <span className="flex items-center gap-1 font-semibold">
                  <Clock className="w-3.5 h-3.5 text-purple-400" />
                  Prep time: {item.preparationTimeMinutes} mins
                </span>
                <span>•</span>
                <span className="font-black text-base text-white">
                  ₹{item.price}
                </span>
              </div>
            </div>

            {/* Customization Option Groups */}
            {item.optionGroups.map((group) => {
              const isRadio = group.maxSelections === 1;
              return (
                <div
                  key={group.id}
                  className="pt-4 border-t border-slate-800 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white">
                      {group.name}
                    </h4>
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
                          className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer select-none ${
                            isSelected
                              ? 'border-purple-500 bg-purple-950/70 shadow-md'
                              : 'border-slate-800 hover:border-slate-700 bg-[#131b2e]'
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
          </div>

          {/* Modal Footer */}
          <div className="p-4 sm:p-5 border-t border-slate-800 bg-[#090D16] flex items-center justify-between gap-4">
            {/* Quantity */}
            <div className="flex items-center gap-2 bg-[#131b2e] rounded-xl p-1.5 border border-slate-800 shadow-inner">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-lg bg-[#1a243d] text-slate-300 hover:bg-purple-600 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-7 text-center font-extrabold text-white">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 rounded-lg bg-[#1a243d] text-slate-300 hover:bg-purple-600 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add to Cart CTA */}
            <Button
              variant="primary"
              size="lg"
              onClick={handleAddToCart}
              className="flex-1 py-3.5 rounded-2xl flex items-center justify-between bg-purple-600 hover:bg-purple-500 font-black purple-glow"
            >
              <span>Add to Order</span>
              <span className="font-black text-lg">₹{totalPrice}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

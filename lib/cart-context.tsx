'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, OrderType, OrderSummaryCalculation } from './types';
import { RESTAURANT_INFO } from './constants';

interface CartContextType {
  items: CartItem[];
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
  addItem: (item: Omit<CartItem, 'id' | 'unitPrice'> & { unitPrice?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  summary: OrderSummaryCalculation;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'the_broast_factory_cart_v1';
const ORDER_TYPE_KEY = 'the_broast_factory_order_type_v1';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [orderType, setOrderTypeState] = useState<OrderType>('DELIVERY');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
      const savedOrderType = localStorage.getItem(ORDER_TYPE_KEY) as OrderType | null;
      if (savedOrderType === 'DELIVERY' || savedOrderType === 'PICKUP') {
        setOrderTypeState(savedOrderType);
      }
    } catch (e) {
      console.error('Failed to load cart from storage', e);
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to persist cart', e);
    }
  }, [items, isHydrated]);

  const setOrderType = (type: OrderType) => {
    setOrderTypeState(type);
    try {
      localStorage.setItem(ORDER_TYPE_KEY, type);
    } catch (e) {
      console.error('Failed to persist order type', e);
    }
  };

  const addItem = (newItem: Omit<CartItem, 'id' | 'unitPrice'> & { unitPrice?: number }) => {
    // Generate unique composite key based on menuItemId and selected options
    const optionsHash = (newItem.selectedOptions || [])
      .map((o) => `${o.optionGroupId}:${o.optionId}`)
      .sort()
      .join('|');
    const id = `${newItem.menuItemId}_${optionsHash}`;

    const optionsAddonPrice = (newItem.selectedOptions || []).reduce(
      (sum, opt) => sum + (opt.price || 0),
      0
    );
    const unitPrice = newItem.unitPrice ?? newItem.price + optionsAddonPrice;

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += newItem.quantity || 1;
        return updated;
      }
      return [
        ...prevItems,
        {
          ...newItem,
          id,
          unitPrice,
          quantity: newItem.quantity || 1,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  // Calculate Subtotal, Tax, Delivery Fee and Total
  const subtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  const deliveryFee =
    orderType === 'DELIVERY' && subtotal > 0
      ? RESTAURANT_INFO.defaults.deliveryFee
      : 0;

  const taxAmount = Math.round(
    (subtotal * RESTAURANT_INFO.defaults.taxPercentage) / 100
  );

  const totalAmount = subtotal + deliveryFee + taxAmount;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const summary: OrderSummaryCalculation = {
    subtotal,
    deliveryFee,
    taxAmount,
    discountAmount: 0,
    totalAmount,
    itemCount,
  };

  return (
    <CartContext.Provider
      value={{
        items,
        orderType,
        setOrderType,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        summary,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

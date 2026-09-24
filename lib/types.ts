export interface RestaurantSettings {
  id: string;
  name: string;
  logoUrl?: string | null;
  coverImageUrl?: string | null;
  description: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  latitude?: number | null;
  longitude?: number | null;
  openingTime: string;
  closingTime: string;
  isOpen: boolean;
  deliveryEnabled: boolean;
  pickupEnabled: boolean;
  deliveryFee: number;
  minimumOrderAmount: number;
  estimatedDeliveryMinutes: number;
  taxPercentage: number;
}

export interface MenuItemOption {
  id: string;
  name: string;
  price: number;
  optionGroupId: string;
  isAvailable: boolean;
}

export interface MenuItemOptionGroup {
  id: string;
  name: string;
  menuItemId: string;
  isRequired: boolean;
  minSelections: number;
  maxSelections: number;
  options: MenuItemOption[];
}

export interface MenuItemWithDetails {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  categoryId: string;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
  imageUrl?: string | null;
  isVeg: boolean;
  isAvailable: boolean;
  isFeatured: boolean;
  preparationTimeMinutes: number;
  sortOrder: number;
  optionGroups: MenuItemOptionGroup[];
}

export interface CategoryWithItems {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  imageUrl?: string | null;
  icon?: string | null;
  sortOrder: number;
  isActive: boolean;
  items: MenuItemWithDetails[];
}

export interface SelectedOption {
  optionGroupId: string;
  groupName: string;
  optionId: string;
  optionName: string;
  price: number;
}

export interface CartItem {
  id: string; // unique item composite key (menuItemId + serialized selectedOptions)
  menuItemId: string;
  name: string;
  slug: string;
  price: number; // base price
  unitPrice: number; // base price + selected options price
  quantity: number;
  imageUrl?: string | null;
  isVeg: boolean;
  selectedOptions: SelectedOption[];
}

export type OrderType = 'DELIVERY' | 'PICKUP';

export interface CheckoutFormData {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  orderType: OrderType;
  deliveryAddress?: string;
  deliveryLandmark?: string;
  deliveryCity?: string;
  deliveryPincode?: string;
  customerNotes?: string;
}

export interface OrderSummaryCalculation {
  subtotal: number;
  deliveryFee: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
  itemCount: number;
}

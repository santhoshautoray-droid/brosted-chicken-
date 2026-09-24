/**
 * THE BROAST FACTORY - Core Constants & Verified Information
 * 
 * Verified Data from Google Maps Listing:
 * - Restaurant Name: THE BROAST FACTORY
 * - Address: Opp. Pillar No. 1416, Kala Dera, Chanchalguda, Hyderabad, Telangana 500024, India
 * - Phone: +91 93931 26313
 * - Google Maps URL: https://maps.app.goo.gl/5pJa3EBrrMjidJ1C7
 * 
 * Note: Timings, delivery fees, minimum orders, and prices are editable demo/placeholder defaults
 * and must be confirmed by the restaurant owner in the admin dashboard.
 */

export const RESTAURANT_INFO = {
  name: 'THE BROAST FACTORY',
  tagline: 'CRISPY. JUICY. IRRESISTIBLE.',
  description:
    'Hyderabad’s destination for ultra-crispy golden broasted chicken, loaded burgers, crunchy wraps, sauced wings, and family bucket feasts.',
  phone: '+91 93931 26313',
  phoneRaw: '+919393126313',
  email: 'thebroastfactoryhyd@gmail.com', // placeholder until confirmed
  address: 'Opp. Pillar No. 1416, Kala Dera, Chanchalguda',
  city: 'Hyderabad',
  state: 'Telangana',
  pincode: '500024',
  country: 'India',
  googleMapsUrl: 'https://maps.app.goo.gl/5pJa3EBrrMjidJ1C7',
  coordinates: {
    lat: 17.3753, // Approximate Chanchalguda Pillar 1416 coordinates
    lng: 78.4982,
  },
  // Owner-customizable defaults (Placeholder data marked as demo)
  defaults: {
    openingTime: '12:30 PM',
    closingTime: '01:00 AM',
    isOpen: true,
    deliveryEnabled: true,
    pickupEnabled: true,
    deliveryFee: 40.0,
    minimumOrderAmount: 199.0,
    estimatedDeliveryMinutes: 35,
    taxPercentage: 5.0, // GST in India
  },
} as const;

export const FOOD_CATEGORIES = [
  { name: 'Broasted Chicken', slug: 'broasted-chicken', icon: 'Drumstick', sortOrder: 1 },
  { name: 'Chicken Wings', slug: 'chicken-wings', icon: 'Flame', sortOrder: 2 },
  { name: 'Burgers', slug: 'burgers', icon: 'Beef', sortOrder: 3 },
  { name: 'Wraps', slug: 'wraps', icon: 'Scroll', sortOrder: 4 },
  { name: 'Buckets & Combos', slug: 'buckets-combos', icon: 'Package', sortOrder: 5 },
  { name: 'Nuggets & Strips', slug: 'nuggets-strips', icon: 'Layers', sortOrder: 6 },
  { name: 'Fish Specialities', slug: 'fish-specialities', icon: 'Fish', sortOrder: 7 },
  { name: 'Fries & Sides', slug: 'fries-sides', icon: 'Sparkles', sortOrder: 8 },
  { name: 'Fresh Salads', slug: 'fresh-salads', icon: 'Salad', sortOrder: 9 },
  { name: 'Beverages & Dips', slug: 'beverages-dips', icon: 'Coffee', sortOrder: 10 },
] as const;

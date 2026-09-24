import React from 'react';
import { CartProvider } from '@/lib/cart-context';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/home/Hero';
import { MenuSection } from '@/components/menu/MenuSection';
import { BrandStory } from '@/components/home/BrandStory';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { MobileCartBar } from '@/components/cart/MobileCartBar';
import { getMenuData } from '@/lib/menu-data';

export default async function HomePage() {
  const { categories, items } = await getMenuData();

  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen bg-[#090D16] text-white">
        {/* Sticky Header with Navigation & Live Cart */}
        <Navbar />

        {/* Hero Section */}
        <main className="flex-1">
          <Hero />

          {/* Interactive Menu Section */}
          <MenuSection initialCategories={categories} initialItems={items} />

          {/* Restaurant Story & Broasting Craft */}
          <BrandStory />
        </main>

        {/* Footer with Verified Restaurant Location & Contact */}
        <Footer />

        {/* Interactive Cart Drawer */}
        <CartDrawer />

        {/* Sticky Mobile Cart Bar */}
        <MobileCartBar />
      </div>
    </CartProvider>
  );
}

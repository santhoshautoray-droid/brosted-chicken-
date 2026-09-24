import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getMenuData } from '@/lib/menu-data';
import { CartProvider } from '@/lib/cart-context';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { MobileCartBar } from '@/components/cart/MobileCartBar';
import { VegBadge, TagBadge } from '@/components/ui/Badge';
import { DishDetailClient } from './DishDetailClient';
import { ChevronLeft, Clock, ShieldCheck, Flame, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { items } = await getMenuData();
  const item = items.find((i) => i.slug === slug);

  if (!item) {
    return { title: 'Dish Not Found' };
  }

  return {
    title: `${item.name} | THE BROAST FACTORY`,
    description: item.description,
    openGraph: {
      title: `${item.name} - ₹${item.price} | THE BROAST FACTORY`,
      description: item.description,
      images: item.imageUrl ? [item.imageUrl] : [],
    },
  };
}

export default async function DishDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { items } = await getMenuData();
  const item = items.find((i) => i.slug === slug);

  if (!item) {
    notFound();
  }

  // Related items in same category
  const relatedItems = items
    .filter((i) => i.categoryId === item.categoryId && i.id !== item.id)
    .slice(0, 3);

  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen bg-[#090D16] text-white">
        <Navbar />

        <main className="flex-1 bg-[#090D16] py-8 lg:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back to menu button */}
            <div className="mb-6">
              <Link
                href="/#menu"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-400 hover:text-purple-400 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back to Full Menu</span>
              </Link>
            </div>

            {/* Dish Container */}
            <div className="bg-[#131b2e] rounded-3xl border border-slate-800 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Left Column: Big Food Image */}
              <div className="lg:col-span-7 relative min-h-[350px] sm:min-h-[480px] bg-slate-900">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-purple-950/40 text-purple-400">
                    <Sparkles className="w-16 h-16" />
                  </div>
                )}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <VegBadge isVeg={item.isVeg} />
                  {item.isFeatured && (
                    <TagBadge variant="amber" className="shadow-md">
                      <Flame className="w-3.5 h-3.5 fill-amber-500" />
                      Signature Item
                    </TagBadge>
                  )}
                </div>
              </div>

              {/* Right Column: Details & Ordering */}
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  {item.category && (
                    <span className="text-xs uppercase font-black tracking-wider text-purple-400 block mb-1">
                      {item.category.name}
                    </span>
                  )}
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                    {item.name}
                  </h1>

                  <div className="flex items-center gap-4 mt-3">
                    <span className="text-3xl font-black text-purple-400">
                      ₹{item.price}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-slate-400 bg-slate-900/80 border border-slate-800 px-3 py-1 rounded-full font-semibold">
                      <Clock className="w-3.5 h-3.5 text-purple-400" />
                      {item.preparationTimeMinutes} mins prep
                    </span>
                  </div>

                  <p className="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="mt-6 pt-6 border-t border-slate-800 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>Authentic Pressure-Fried Halal Chicken</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <Sparkles className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      <span>Prepared Fresh Upon Order Handover</span>
                    </div>
                  </div>
                </div>

                {/* Client interaction (options, quantity, add to cart) */}
                <div className="mt-8 pt-6 border-t border-slate-800">
                  <DishDetailClient item={item} />
                </div>
              </div>
            </div>

            {/* Related Dishes */}
            {relatedItems.length > 0 && (
              <div className="mt-16">
                <h3 className="text-xl font-black text-white mb-6">
                  More from {item.category?.name}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedItems.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/menu/${rel.slug}`}
                      className="group bg-[#131b2e] rounded-3xl border border-slate-800 p-4 shadow-md hover:shadow-xl hover:border-purple-500/60 transition-all flex items-center gap-4"
                    >
                      {rel.imageUrl && (
                        <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-900 flex-shrink-0">
                          <Image
                            src={rel.imageUrl}
                            alt={rel.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                            sizes="80px"
                          />
                        </div>
                      )}
                      <div>
                        <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                          {rel.name}
                        </h4>
                        <span className="text-sm font-black text-purple-400 block mt-1">
                          ₹{rel.price}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>

        <Footer />
        <CartDrawer />
        <MobileCartBar />
      </div>
    </CartProvider>
  );
}

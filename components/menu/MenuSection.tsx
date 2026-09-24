'use client';

import React, { useState, useMemo } from 'react';
import { MenuItemWithDetails } from '@/lib/types';
import { MenuCard } from '@/components/menu/MenuCard';
import { CategoryShowcase } from '@/components/home/CategoryShowcase';
import { Search, X, SlidersHorizontal, Flame, Sparkles } from 'lucide-react';

interface MenuSectionProps {
  initialCategories: Array<{
    id: string;
    name: string;
    slug: string;
    imageUrl?: string | null;
  }>;
  initialItems: MenuItemWithDetails[];
}

export function MenuSection({ initialCategories, initialItems }: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  // Filter and sort items
  const filteredItems = useMemo(() => {
    return initialItems.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category?.slug !== selectedCategory) {
        return false;
      }
      // Veg filter
      if (vegOnly && !item.isVeg) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCat = item.category?.name.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCat) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      // Default: featured first, then sort order
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return a.sortOrder - b.sortOrder;
    });
  }, [initialItems, selectedCategory, vegOnly, searchQuery, sortBy]);

  return (
    <section id="menu" className="py-12 bg-[#090D16] min-h-screen">
      {/* Category Scroller */}
      <CategoryShowcase
        categories={initialCategories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Search & Filter Toolbar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-8">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search crispy broast, burgers, wings..."
              className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-[#131b2e] border border-slate-800 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-900/50 transition-all shadow-md"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filters: Veg Only Toggle & Sort Dropdown */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            {/* Veg Only Toggle */}
            <button
              type="button"
              onClick={() => setVegOnly(!vegOnly)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl border text-xs font-bold transition-all ${
                vegOnly
                  ? 'border-emerald-500 bg-emerald-950/60 text-emerald-300 shadow-md'
                  : 'border-slate-800 bg-[#131b2e] text-slate-300 hover:border-slate-700'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span>Veg Only</span>
            </button>

            {/* Sort selector */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none pl-3 pr-8 py-2 rounded-2xl border border-slate-800 bg-[#131b2e] text-xs font-bold text-slate-200 hover:border-slate-700 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-900/50 cursor-pointer shadow-md"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Menu Grid Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-purple-400 fill-purple-400" />
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {selectedCategory === 'all'
                ? 'All Menu Items'
                : initialCategories.find((c) => c.slug === selectedCategory)?.name || 'Menu'}
            </h3>
            <span className="text-xs font-black text-purple-300 bg-purple-950 border border-purple-800/80 px-2.5 py-0.5 rounded-full ml-1">
              {filteredItems.length}
            </span>
          </div>

          {(vegOnly || searchQuery || selectedCategory !== 'all') && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setVegOnly(false);
              }}
              className="text-xs font-bold text-purple-400 hover:text-purple-300 hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-20 text-center bg-[#131b2e] rounded-3xl border border-slate-800 p-8 shadow-xl">
            <div className="w-16 h-16 rounded-full bg-purple-950/60 border border-purple-800/60 text-purple-400 flex items-center justify-center mx-auto mb-4 purple-glow-sm">
              <Sparkles className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-white">
              No matching food items found
            </h4>
            <p className="text-sm text-slate-400 max-w-sm mx-auto mt-1">
              Try searching for something else or clear your active filters to see our full broast menu.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setVegOnly(false);
              }}
              className="mt-5 px-5 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold hover:bg-purple-500 transition-colors shadow-md purple-glow-sm"
            >
              View Full Menu
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

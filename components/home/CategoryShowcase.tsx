'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Flame } from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  imageUrl?: string | null;
}

interface CategoryShowcaseProps {
  categories: CategoryItem[];
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
}

export function CategoryShowcase({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryShowcaseProps) {
  return (
    <section className="py-8 border-b border-slate-800/80 bg-[#090D16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <Flame className="w-5 h-5 text-purple-400 fill-purple-400" />
              <span>Explore by Category</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Select a category to filter our freshly fried favorites
            </p>
          </div>
          <button
            type="button"
            onClick={() => onSelectCategory('all')}
            className={cn(
              'text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all duration-200',
              selectedCategory === 'all'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/40 purple-glow-sm'
                : 'text-slate-300 hover:text-white bg-[#131b2e] border border-slate-800 hover:border-slate-700'
            )}
          >
            Show All Items
          </button>
        </div>

        {/* Scrollable category pills / cards */}
        <div className="flex items-center gap-3 overflow-x-auto pb-3 pt-1 scrollbar-none snap-x -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id || cat.slug}
                type="button"
                onClick={() => onSelectCategory(cat.slug)}
                className={cn(
                  'snap-start flex-shrink-0 flex items-center gap-3 px-3 py-2 rounded-2xl border transition-all duration-200 select-none group',
                  isActive
                    ? 'border-purple-500 bg-purple-950/80 purple-glow-sm shadow-md'
                    : 'border-slate-800/90 hover:border-purple-500/50 bg-[#131b2e] hover:bg-[#1a243d]'
                )}
              >
                {/* Category Thumbnail */}
                {cat.imageUrl && (
                  <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-slate-900 flex-shrink-0">
                    <Image
                      src={cat.imageUrl}
                      alt={cat.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="40px"
                    />
                  </div>
                )}
                <span
                  className={cn(
                    'text-xs sm:text-sm font-bold whitespace-nowrap pr-2',
                    isActive ? 'text-purple-300' : 'text-slate-300 group-hover:text-white'
                  )}
                >
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

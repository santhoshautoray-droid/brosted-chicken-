import React from 'react';
import Image from 'next/image';
import { RESTAURANT_INFO } from '@/lib/constants';
import { MapPin, Phone, Sparkles } from 'lucide-react';

export function BrandStory() {
  return (
    <section id="about" className="py-16 lg:py-24 bg-[#06080e] border-t border-purple-950/40 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Story Mosaic */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-64 sm:h-80 rounded-3xl overflow-hidden shadow-2xl border border-purple-900/40">
                <Image
                  src="https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&auto=format&fit=crop&q=80"
                  alt="Golden Broasted Chicken"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 300px"
                />
              </div>
              <div className="relative h-64 sm:h-80 rounded-3xl overflow-hidden shadow-2xl border border-purple-900/40 mt-8">
                <Image
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80"
                  alt="Freshly Grilled Burger"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 300px"
                />
              </div>
            </div>

            {/* Floating stats card */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#131b2e]/95 backdrop-blur-md px-6 py-4 rounded-2xl shadow-2xl border border-purple-500/30 text-center w-[85%] max-w-sm">
              <div className="text-xl sm:text-2xl font-black text-purple-400">
                Opp. Pillar No. 1416
              </div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">
                Kala Dera, Chanchalguda, Hyderabad
              </div>
            </div>
          </div>

          {/* Right Column: Restaurant Identity & Craft */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-800 text-purple-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>The Broast Craft</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Crispy. Tender. Freshly Made. <br />
              <span className="text-gradient-purple">The Authentic Broast Difference</span>
            </h2>

            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p>
                At <strong className="text-white font-bold">THE BROAST FACTORY</strong>, we specialize in authentic broasting — a specialized pressure-frying technique that cooks chicken under controlled pressure, sealing in every drop of natural moisture while giving the outer herb-seasoned batter a signature crunch.
              </p>
              <p>
                From generous family buckets to juicy burgers, crisp wraps, sauced wings, and authentic Lebanese garlic toum dips, every order is prepared hot to deliver unmatched freshness straight to your table or doorstep.
              </p>
            </div>

            {/* Contact & Location Highlights */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#131b2e] border border-slate-800 shadow-md flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-950 text-purple-400 border border-purple-800/80 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Chanchalguda Location</div>
                  <div className="text-xs text-slate-400 mt-0.5">{RESTAURANT_INFO.address}</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#131b2e] border border-slate-800 shadow-md flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-950 text-purple-400 border border-purple-800/80 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Direct Phone Order</div>
                  <div className="text-xs text-slate-400 mt-0.5">{RESTAURANT_INFO.phone}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

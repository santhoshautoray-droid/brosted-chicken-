import React from 'react';
import Link from 'next/link';
import { RESTAURANT_INFO } from '@/lib/constants';
import { Flame, MapPin, Phone, Clock, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer id="contact" className="bg-[#05070d] text-slate-300 pt-16 pb-12 border-t border-purple-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-900">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center text-white shadow-md shadow-purple-600/40">
                <Flame className="w-6 h-6 text-amber-300 fill-amber-300" />
              </div>
              <span className="font-black text-xl text-white tracking-tight">
                THE BROAST FACTORY
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Hyderabad’s go-to destination for ultra-crispy pressure-fried broasted chicken, stacked burgers, sauced wings, and value bucket feasts.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Kitchen Ready
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/" className="hover:text-purple-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <a href="#menu" className="hover:text-purple-400 transition-colors">
                  Full Menu
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-purple-400 transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <Link href="/admin" className="hover:text-purple-400 transition-colors text-slate-500">
                  Staff / Admin Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours & Timing (Demo Notice) */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-400" />
              <span>Operating Hours</span>
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-slate-400">
              <div className="flex justify-between">
                <span>Monday – Sunday:</span>
                <span className="text-white font-medium">
                  {RESTAURANT_INFO.defaults.openingTime} – {RESTAURANT_INFO.defaults.closingTime}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 pt-1">
                * Timings are owner-customizable demo defaults.
              </div>
            </div>
          </div>

          {/* Col 4: Verified Location & Phone */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Visit or Contact
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  {RESTAURANT_INFO.address}, {RESTAURANT_INFO.city}, {RESTAURANT_INFO.state} {RESTAURANT_INFO.pincode}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <a
                  href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                  className="text-white font-semibold hover:text-purple-400 transition-colors"
                >
                  {RESTAURANT_INFO.phone}
                </a>
              </li>
              <li>
                <a
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 font-semibold underline underline-offset-4 mt-1"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} {RESTAURANT_INFO.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Fresh Halal Food</span>
            <span>•</span>
            <span>Chanchalguda Hyderabad</span>
            <span>•</span>
            <span>Fast Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

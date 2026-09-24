'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { Button } from '@/components/ui/Button';
import {
  ShoppingBag,
  Menu as MenuIcon,
  X,
  Phone,
  Flame,
  MapPin,
} from 'lucide-react';
import { RESTAURANT_INFO } from '@/lib/constants';

export function Navbar() {
  const { summary, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top micro banner */}
      <div className="bg-[#05070d] text-slate-400 text-xs py-1.5 px-4 hidden sm:block border-b border-slate-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-purple-300 font-medium">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              Crispy Broasted Chicken • Chanchalguda, Hyderabad
            </span>
            <span className="text-slate-700">•</span>
            <span className="flex items-center gap-1 text-slate-400">
              <MapPin className="w-3 h-3 text-purple-400" />
              Opp. Pillar No. 1416
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`tel:${RESTAURANT_INFO.phoneRaw}`}
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-purple-400" />
              <span>{RESTAURANT_INFO.phone}</span>
            </a>
            <span className="text-slate-800">|</span>
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Kitchen Live & Delivering
            </span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#090D16]/95 backdrop-blur-md shadow-xl shadow-purple-950/20 py-3 border-b border-purple-900/30'
            : 'bg-[#090D16] py-4.5 border-b border-slate-800/80'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group focus:outline-none"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg shadow-purple-600/40 group-hover:scale-105 transition-transform duration-200">
                <Flame className="w-6 h-6 text-amber-300 fill-amber-300" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-base sm:text-lg tracking-tight text-white group-hover:text-purple-400 transition-colors">
                  THE BROAST FACTORY
                </span>
                <span className="text-[10px] tracking-wider uppercase font-bold text-purple-400">
                  Crispy • Juicy • Fresh
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-300">
              <Link
                href="/"
                className="hover:text-purple-400 transition-colors py-1"
              >
                Home
              </Link>
              <Link
                href="/#menu"
                className="hover:text-purple-400 transition-colors py-1"
              >
                Menu
              </Link>
              <Link
                href="/#about"
                className="hover:text-purple-400 transition-colors py-1"
              >
                About
              </Link>
              <Link
                href="/#contact"
                className="hover:text-purple-400 transition-colors py-1"
              >
                Location & Contact
              </Link>
            </nav>

            {/* Right Actions: Cart & Order Now CTA */}
            <div className="flex items-center gap-3">
              {/* Cart Drawer Trigger */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                aria-label={`Open shopping cart with ${summary.itemCount} items`}
                className="relative p-2.5 rounded-xl border border-slate-800 bg-[#131b2e] hover:bg-purple-950/60 hover:border-purple-500/60 text-white transition-all duration-200 flex items-center gap-2"
              >
                <ShoppingBag className="w-5 h-5 text-purple-300" />
                {summary.itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 rounded-full bg-purple-600 text-white text-xs font-black flex items-center justify-center shadow-lg shadow-purple-600/50 animate-pulse-subtle">
                    {summary.itemCount}
                  </span>
                )}
                {summary.subtotal > 0 && (
                  <span className="hidden sm:inline-block text-xs font-black text-purple-300">
                    ₹{summary.subtotal}
                  </span>
                )}
              </button>

              {/* Order Now CTA */}
              <Link href="/#menu" className="hidden sm:inline-flex">
                <Button variant="primary" size="md" className="purple-glow bg-purple-600 hover:bg-purple-500 text-white font-bold">
                  Order Now
                </Button>
              </Link>

              {/* Mobile Hamburger Menu Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <MenuIcon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 bg-[#090D16] px-4 pt-3 pb-6 space-y-3 shadow-2xl">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-base font-bold text-slate-200 hover:text-purple-400"
            >
              Home
            </Link>
            <Link
              href="/#menu"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-base font-bold text-slate-200 hover:text-purple-400"
            >
              Menu
            </Link>
            <Link
              href="/#about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-base font-bold text-slate-200 hover:text-purple-400"
            >
              About
            </Link>
            <Link
              href="/#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-base font-bold text-slate-200 hover:text-purple-400"
            >
              Location & Contact
            </Link>
            <div className="pt-2">
              <Link
                href="/#menu"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full"
              >
                <Button variant="primary" className="w-full py-3 bg-purple-600 hover:bg-purple-500">
                  Order Now
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

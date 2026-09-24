'use client';

import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import {
  Flame,
  Clock,
  ShieldCheck,
  ArrowRight,
  ChevronDown,
  Sparkles,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { RESTAURANT_INFO } from '@/lib/constants';

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section className="relative min-h-[90vh] sm:min-h-[94vh] flex items-center justify-center overflow-hidden bg-[#090D16] text-white pt-24 pb-16 sm:py-28">
      {/* 1. Cinematic Background Video - 100% Direct & Transparent */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          src="/videos/hero-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          poster="/images/dishes/broast-chicken-10-pcs.jpg"
          className="w-full h-full object-cover"
        />

        {/* Soft bottom blend to transition smoothly into the menu section */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#090D16] to-transparent" />
      </div>

      {/* Floating sound toggle button in the bottom-right corner */}
      <div className="absolute bottom-6 right-6 z-20">
        <button
          type="button"
          onClick={toggleMute}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-black/60 hover:bg-purple-600 text-white backdrop-blur-md border border-white/20 transition-all text-xs font-extrabold shadow-2xl purple-glow-sm"
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-4 h-4 text-slate-300" />
              <span>Unmute Sound</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-purple-300 animate-pulse" />
              <span>Mute Sound</span>
            </>
          )}
        </button>
      </div>

      {/* 2. Hero Content - 100% Transparent Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 w-full">
        <div className="max-w-2xl space-y-6 text-center sm:text-left">
          {/* Top pill badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/50 border border-purple-500/50 text-purple-300 text-xs sm:text-sm font-bold tracking-wide purple-glow-sm backdrop-blur-sm">
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
            <span>Pressure-Fried Fresh in Chanchalguda, Hyderabad</span>
          </div>

          {/* Main Headline with text drop shadow for clarity */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.05] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            CRISPY. <br className="hidden sm:inline" />
            <span className="text-gradient-purple">JUICY.</span> <br />
            IRRESISTIBLE.
          </h1>

          {/* Supporting description */}
          <p className="text-base sm:text-lg text-slate-100 max-w-xl leading-relaxed font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Freshly seasoned and pressure-fried to seal in natural juices while creating an ultra-crunchy golden crust. Indulge in authentic broasted chicken, stacked burgers, crunchy wraps, and loaded buckets at{' '}
            <strong className="text-white font-extrabold">{RESTAURANT_INFO.name}</strong>.
          </p>

          {/* Call to action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4 pt-1">
            <a href="#menu" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-black flex items-center justify-center gap-2.5 purple-glow bg-purple-600 hover:bg-purple-500 text-white shadow-2xl shadow-purple-600/60"
              >
                <span>Order Now</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </a>

            <a href="#menu" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl text-base font-bold bg-black/40 backdrop-blur-md border-white/30 text-white hover:border-purple-400 hover:bg-purple-950/40 shadow-lg"
              >
                Explore Menu
              </Button>
            </a>
          </div>

          {/* Trust points bar with subtle transparent pills */}
          <div className="pt-6 grid grid-cols-3 gap-2 sm:gap-3 max-w-lg">
            <div className="flex items-center gap-2 text-left bg-black/40 backdrop-blur-sm p-2 rounded-xl border border-white/10">
              <div className="w-8 h-8 rounded-lg bg-purple-950/90 border border-purple-800/80 text-purple-300 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              </div>
              <div className="text-[11px] sm:text-xs">
                <div className="font-extrabold text-white">100% Fresh</div>
                <div className="text-slate-300 text-[10px] hidden sm:block">Halal chicken</div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-left bg-black/40 backdrop-blur-sm p-2 rounded-xl border border-white/10">
              <div className="w-8 h-8 rounded-lg bg-purple-950/90 border border-purple-800/80 text-purple-300 flex items-center justify-center flex-shrink-0">
                <Clock className="w-3.5 h-3.5 text-purple-400" />
              </div>
              <div className="text-[11px] sm:text-xs">
                <div className="font-extrabold text-white">~35 Mins</div>
                <div className="text-slate-300 text-[10px] hidden sm:block">Fast delivery</div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-left bg-black/40 backdrop-blur-sm p-2 rounded-xl border border-white/10">
              <div className="w-8 h-8 rounded-lg bg-purple-950/90 border border-purple-800/80 text-purple-300 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              </div>
              <div className="text-[11px] sm:text-xs">
                <div className="font-extrabold text-white">Pressure Fried</div>
                <div className="text-slate-300 text-[10px] hidden sm:block">Extra crispy</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom scroll guide */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <a
          href="#menu"
          className="flex flex-col items-center gap-1 text-slate-200 hover:text-purple-400 transition-colors pointer-events-auto"
          aria-label="Scroll down to menu"
        >
          <span className="text-[10px] font-bold tracking-widest uppercase text-white/90 drop-shadow-md">
            Scroll To Menu
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce text-purple-400" />
        </a>
      </div>
    </section>
  );
}

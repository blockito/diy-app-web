'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import PhoneMockup from './PhoneMockup';
import StoreButtons from './StoreButtons';
import WaitlistForm from './WaitlistForm';

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-[68px]">
      {/* A soft wash behind the headline, so the cream has somewhere to go. */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{ background: 'radial-gradient(closest-side, #DDE5DA, transparent)' }}
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 pt-14 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-28 lg:pt-20">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-3.5 py-1.5 text-[12.5px] text-ink-soft"
          >
            <Sparkles className="h-3.5 w-3.5 text-forest" aria-hidden />
            Reads the video, not just the title
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display text-[clamp(2.6rem,6vw,4.4rem)] leading-[1.03] tracking-[-0.02em] text-ink"
          >
            Turn any DIY video into an interactive build guide in seconds.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-[54ch] text-[17px] leading-relaxed text-ink-soft"
          >
            Paste a YouTube link or upload a clip. The app pulls out the materials, the tools and clear
            step-by-step instructions — with the measurements the video actually said — so you can get
            on with making.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 space-y-5"
          >
            <StoreButtons />
            <div className="max-w-[30rem]">
              <WaitlistForm />
              <p className="mt-2.5 px-1 text-[12.5px] text-ink-faint">
                One email when it opens. Nothing else, ever.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, rotate: -1.5 }}
          animate={{ opacity: 1, y: 0, rotate: -1.5 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <PhoneMockup />
        </motion.div>
      </div>
    </section>
  );
}

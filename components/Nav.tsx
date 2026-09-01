'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#how', label: 'How it works' },
  { href: '#faq', label: 'FAQ' }
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // The bar only earns a background once there is something behind it.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'border-b border-line bg-cream/85 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5" aria-label="DIY Guide, home">
          <Logo className="h-8 w-8" />
          <span className="font-display text-[19px] tracking-tight text-ink">DIY Guide</span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="text-[14px] text-ink-soft transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#download"
            className="rounded-full bg-forest px-5 py-2.5 text-[14px] font-semibold text-cream transition-colors hover:bg-forest-deep"
          >
            Download app
          </a>
        </div>

        <button
          className="lg:hidden"
          onClick={() => setOpen(value => !value)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-cream px-5 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-2 py-3 text-[15px] text-ink-soft"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#download"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-forest px-5 py-3 text-center text-[15px] font-semibold text-cream"
            >
              Download app
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

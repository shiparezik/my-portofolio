'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  currentLang: 'en' | 'pl' | 'uk' | 'ru';
  changeLanguage: (lang: 'en' | 'pl' | 'uk' | 'ru') => void;
  languageFlags: Record<string, string>;
  languageNames: Record<string, string>;
  t?: (key: string) => string;
}

const labels: Record<string, Record<string, string>> = {
  en: { about: 'About', skills: 'Skills', services: 'Services', projects: 'Projects', contact: 'Contact' },
  pl: { about: 'O mnie', skills: 'Umiejętności', services: 'Usługi', projects: 'Projekty', contact: 'Kontakt' },
  uk: { about: 'Про мене', skills: 'Навички', services: 'Послуги', projects: 'Проекти', contact: 'Контакт' },
  ru: { about: 'Обо мне', skills: 'Навыки', services: 'Услуги', projects: 'Проекты', contact: 'Контакт' },
};

const navItems = [
  { id: 'about', key: 'about' },
  { id: 'skills', key: 'skills' },
  { id: 'services', key: 'services' },
  { id: 'projects', key: 'projects' },
  { id: 'contact', key: 'contact' },
];

export default function Navbar({
  currentLang,
  changeLanguage,
  languageFlags,
  languageNames,
  t,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const label = (key: string) => {
    if (typeof t === 'function') {
      const val = t(`nav.${key}`);
      if (val && val !== `nav.${key}`) return val;
    }
    return labels[currentLang]?.[key] || labels.en[key] || key;
  };

  // scroll state — через rAF, без лишних setState
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // active section
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(item.id);
        },
        {
          threshold: 0.2,
          rootMargin: '-20% 0px -40% 0px',
        }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const scrollTo = (id: string) => {
    const isMobile = window.innerWidth < 768;
    document.getElementById(id)?.scrollIntoView({
      behavior: isMobile ? 'auto' : 'smooth',
    });
    setMobileOpen(false);
  };

  const scrollTop = () => {
    const isMobile = window.innerWidth < 768;
    window.scrollTo({
      top: 0,
      behavior: isMobile ? 'auto' : 'smooth',
    });
  };

  return (
    <>
      {/* TOP BAR */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
          scrolled
            ? 'bg-[#08060d] border-b border-white/10 md:bg-[#08060d]/80 md:backdrop-blur-xl md:border-[#c084fc]/20'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-[64px] max-w-6xl items-center justify-between px-5 md:h-[72px]">
          {/* Logo */}
          <button onClick={scrollTop} className="relative flex items-center">
            <Image
              src="/logo.shiparezik.png"
              alt="shiparezik"
              width={1536}
              height={1024}
              sizes="(max-width: 640px) 44px, (max-width: 768px) 48px, 56px"
              className="h-11 w-auto object-contain sm:h-12 md:h-14"
              draggable={false}
            />
          </button>

          {/* Desktop links */}
          <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-1.5 py-1.5 md:flex">
            {navItems.map((item) => {
              const active = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`relative rounded-full px-4 py-2 text-[13px] font-medium tracking-wide transition-colors ${
                    active ? 'text-white' : 'text-white/50 hover:text-white'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="neon-pill"
                      className="absolute inset-0 rounded-full border border-[#c084fc]/40 bg-gradient-to-r from-[#c084fc]/25 to-[#e879f9]/20"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <span className="relative z-10">{label(item.key)}</span>
                </button>
              );
            })}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-2">
            <div className="mr-1 hidden items-center gap-1.5 md:flex">
              <a
                href="https://github.com/shiparezik"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5"
              >
                <Image src="/icons/github.svg" alt="GitHub" width={16} height={16} className="h-4 w-4 invert opacity-70" />
              </a>
              <a
                href="https://www.linkedin.com/in/danylo-shypotko"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5"
              >
                <Image src="/icons/linkedin.svg" alt="LinkedIn" width={16} height={16} className="h-4 w-4 invert opacity-70" />
              </a>
            </div>

            {/* Lang desktop */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-sm"
              >
                <span className="font-medium">{languageFlags[currentLang]}</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 text-white/40 transition-transform ${
                    langOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {langOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 z-50 mt-3 w-44 overflow-hidden rounded-2xl border border-white/10 bg-[#0c0a14] shadow-xl"
                    >
                      <div className="p-1.5">
                        {(['en', 'pl', 'uk', 'ru'] as const).map((lang) => (
                          <button
                            key={lang}
                            onClick={() => {
                              changeLanguage(lang);
                              setLangOpen(false);
                            }}
                            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm ${
                              currentLang === lang
                                ? 'bg-[#c084fc]/20 text-white'
                                : 'text-white/60 hover:bg-white/5 hover:text-white'
                            }`}
                          >
                            <span className="w-7 font-semibold">{languageFlags[lang]}</span>
                            {languageNames[lang]}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Burger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="rounded-xl border border-white/10 bg-white/5 p-2.5 md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[60] bg-[#08060d] md:hidden"
          >
            <div className="flex h-full flex-col">
              {/* Top */}
              <div className="flex h-[64px] items-center justify-between px-5">
                <Image
                  src="/logo.shiparezik.png"
                  alt="shiparezik"
                  width={1536}
                  height={1024}
                  sizes="40px"
                  className="h-10 w-auto object-contain"
                  draggable={false}
                />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl border border-white/10 bg-white/5 p-2.5"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Links */}
              <div className="flex flex-1 flex-col justify-center px-6">
                {navItems.map((item) => {
                  const active = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      className={`py-3.5 text-left text-[26px] font-semibold tracking-tight ${
                        active ? 'text-white' : 'text-white/40'
                      }`}
                    >
                      {label(item.key)}
                    </button>
                  );
                })}
              </div>

              {/* Bottom */}
              <div className="space-y-4 px-6 pb-8">
                <div className="flex justify-center gap-3">
                  <a
                    href="https://github.com/shiparezik"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5"
                  >
                    <Image src="/icons/github.svg" alt="GitHub" width={20} height={20} className="h-5 w-5 invert opacity-75" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/danylo-shypotko"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5"
                  >
                    <Image src="/icons/linkedin.svg" alt="LinkedIn" width={20} height={20} className="h-5 w-5 invert opacity-75" />
                  </a>
                  <a
                    href="mailto:shipareziki@gmail.com"
                    className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5"
                  >
                    <Image src="/icons/mail.svg" alt="Email" width={20} height={20} className="h-5 w-5 invert opacity-75" />
                  </a>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {(['en', 'pl', 'uk', 'ru'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => changeLanguage(lang)}
                      className={`rounded-xl py-2.5 text-sm font-medium ${
                        currentLang === lang
                          ? 'border border-[#c084fc]/40 bg-[#c084fc]/20 text-white'
                          : 'border border-white/10 bg-white/5 text-white/55'
                      }`}
                    >
                      {languageFlags[lang]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

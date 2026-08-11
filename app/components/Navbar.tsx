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
  t: (key: string) => string;
}

const labels: Record<string, Record<string, string>> = {
  en: {
    about: 'About',
    skills: 'Skills',
    services: 'Services',
    projects: 'Projects',
    contact: 'Contact',
  },
  pl: {
    about: 'O mnie',
    skills: 'Umiejętności',
    services: 'Usługi',
    projects: 'Projekty',
    contact: 'Kontakt',
  },
  uk: {
    about: 'Про мене',
    skills: 'Навички',
    services: 'Послуги',
    projects: 'Проекти',
    contact: 'Контакт',
  },
  ru: {
    about: 'Обо мне',
    skills: 'Навыки',
    services: 'Услуги',
    projects: 'Проекты',
    contact: 'Контакт',
  },
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
  t: translate,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const label = (key: string) => translate(`nav.${key}`) || labels.en[key] || key;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => entry.isIntersecting && setActiveSection(item.id),
        { rootMargin: '-30% 0px -58% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const scrollTo = (id: string) => {
    const behavior = window.matchMedia('(max-width: 768px)').matches ? 'auto' : 'smooth';
    document.getElementById(id)?.scrollIntoView({ behavior });
    setMobileOpen(false);
  };

  return (
    <>
      {/* ===== TOP BAR ===== */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#08060d]/80 backdrop-blur-2xl border-b border-[#c084fc]/20 shadow-[0_0_40px_-10px_rgba(192,132,252,0.25)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 h-[72px] flex items-center justify-between">
          
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group relative flex items-center"
          >
            <div className="absolute -inset-4 bg-[#c084fc]/25 rounded-full blur-2xl opacity-50 group-hover:opacity-90 transition-opacity duration-500" />
            <Image
              src="/logo1.png"
              alt="shiparezik"
              width={728}
              height={688}
              sizes="(max-width: 640px) 48px, 56px"
              className="relative h-12 sm:h-14 w-auto object-contain
                         drop-shadow-[0_0_22px_rgba(192,132,252,0.85)]
                         group-hover:drop-shadow-[0_0_38px_rgba(192,132,252,1)]
                         transition-all duration-300 group-hover:scale-[1.06]"
            />
          </button>

          {/* Desktop Links */}
          <nav className="site-nav hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/10 rounded-full px-1.5 py-1.5">
            {navItems.map((item) => {
              const active = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`relative px-4 py-2 text-[13px] font-medium tracking-wide rounded-full transition-all duration-300 ${
                    active ? 'text-white' : 'text-white/50 hover:text-white'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="neon-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#c084fc]/25 to-[#e879f9]/20 border border-[#c084fc]/40 shadow-[0_0_20px_-5px_rgba(192,132,252,0.5)]"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.45 }}
                    />
                  )}
                  <span className="relative z-10">{label(item.key)}</span>
                </button>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2.5">
            
            {/* Social - Desktop */}
            <div className="hidden md:flex items-center gap-1.5">
              <a
                href="https://github.com/shiparezik"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#c084fc]/40 transition-all"
              >
                <Image src="/icons/github.svg" alt="GitHub" width={16} height={16} className="h-4 w-4 invert opacity-70 transition group-hover:opacity-100" />
              </a>
              <a
                href="https://www.linkedin.com/in/danylo-shypotko"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#c084fc]/40 transition-all"
              >
                <Image src="/icons/linkedin.svg" alt="LinkedIn" width={16} height={16} className="h-4 w-4 invert opacity-70 transition group-hover:opacity-100" />
              </a>
            </div>

            {/* Language */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/5 border border-white/10 hover:border-[#c084fc]/50 hover:bg-[#c084fc]/10 text-sm transition-all"
                aria-label="Choose language"
              >
                <span className="font-medium">{languageFlags[currentLang]}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-white/40 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {langOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-44 rounded-2xl border border-[#c084fc]/20 bg-[#0c0a14]/95 backdrop-blur-2xl shadow-[0_0_40px_-10px_rgba(192,132,252,0.3)] z-50 overflow-hidden"
                    >
                      <div className="p-1.5">
                        {(['en', 'pl', 'uk', 'ru'] as const).map((lang) => (
                          <button
                            key={lang}
                            onClick={() => {
                              changeLanguage(lang);
                              setLangOpen(false);
                            }}
                            aria-label={`Switch language to ${languageNames[lang]}`}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                              currentLang === lang
                                ? 'bg-[#c084fc]/20 text-white'
                                : 'text-white/60 hover:bg-white/5 hover:text-white'
                            }`}
                          >
                            <span className="font-semibold w-7">{languageFlags[lang]}</span>
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
              className="md:hidden flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* ===== MOBILE MENU ===== */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] md:hidden"
          >
            <div className="absolute inset-0 bg-[#08060d]/96 backdrop-blur-2xl" />
            <div className="absolute top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#c084fc]/12 rounded-full blur-[90px]" />

            <div className="relative h-full flex flex-col">
              {/* Top */}
              <div className="flex items-center justify-between px-6 h-[72px]">
                <Image
                  src="/logo1.png"
                  alt="shiparezik"
                  width={728}
                  height={688}
                  sizes="40px"
                  className="h-10 w-auto object-contain drop-shadow-[0_0_16px_rgba(192,132,252,0.6)]"
                />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10"
                  aria-label="Close navigation menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Links */}
              <div className="flex-1 flex flex-col justify-center px-8">
                {navItems.map((item, i) => {
                  const active = activeSection === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.06 * i + 0.08 }}
                      onClick={() => scrollTo(item.id)}
                      className={`text-left text-[28px] font-semibold tracking-tight py-3.5 transition-colors ${
                        active ? 'text-white' : 'text-white/40'
                      }`}
                    >
                      <span className="relative inline-flex items-center gap-3">
                        {active && (
                          <span className="w-2 h-2 rounded-full bg-[#c084fc] shadow-[0_0_10px_rgba(192,132,252,0.8)]" />
                        )}
                        {label(item.key)}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Bottom */}
              <div className="px-6 pb-10 space-y-5">
                <div className="flex justify-center gap-3">
                  <a
                    href="https://github.com/shiparezik"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-11 h-11 rounded-2xl bg-white/5 border border-white/10"
                  >
                    <Image src="/icons/github.svg" alt="GitHub" width={20} height={20} className="h-5 w-5 invert opacity-75" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/danylo-shypotko"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-11 h-11 rounded-2xl bg-white/5 border border-white/10"
                  >
                    <Image src="/icons/linkedin.svg" alt="LinkedIn" width={20} height={20} className="h-5 w-5 invert opacity-75" />
                  </a>
                  <a
                    href="mailto:shipareziki@gmail.com"
                    className="flex items-center justify-center w-11 h-11 rounded-2xl bg-white/5 border border-white/10"
                  >
                    <Image src="/icons/mail.svg" alt="Email" width={20} height={20} className="h-5 w-5 invert opacity-75" />
                  </a>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {(['en', 'pl', 'uk', 'ru'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        changeLanguage(lang);
                        setMobileOpen(false);
                      }}
                      aria-label={`Switch language to ${languageNames[lang]}`}
                      className={`py-2.5 rounded-xl text-sm font-medium transition-all ${
                        currentLang === lang
                          ? 'bg-[#c084fc]/20 text-white border border-[#c084fc]/40'
                          : 'bg-white/5 text-white/55 border border-white/10'
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

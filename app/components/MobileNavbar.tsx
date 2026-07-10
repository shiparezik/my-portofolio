'use client';

import { useState, useEffect } from 'react';
import { User, Code2, Briefcase, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

interface MobileNavbarProps {
  scrollToSection: (id: string) => void;
  t: (key: string) => string;
  currentLang: 'en' | 'pl' | 'uk' | 'ru';
  changeLanguage: (lang: 'en' | 'pl' | 'uk' | 'ru') => void;
  languageFlags: Record<string, string>;
  languageNames: Record<string, string>;
}

export default function MobileNavbar({
  scrollToSection,
  t,
  currentLang,
  changeLanguage,
  languageFlags,
  languageNames,
}: MobileNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Нижний навбар */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[70] bg-black/95 backdrop-blur-xl border-t border-white/10">
        <div className="flex items-center justify-around px-2 py-2.5">
          {[
            { key: "nav.about", id: "about", icon: User },
            { key: "nav.skills", id: "skills", icon: Code2 },
            { key: "nav.projects", id: "projects", icon: Briefcase },
            { key: "nav.contact", id: "contact", icon: Mail }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="flex flex-col items-center gap-0.5 px-4 py-1 text-white/70 active:text-white active:scale-95"
            >
              <item.icon size={22} />
              <span className="text-[10px] tracking-wider">{t(item.key)}</span>
            </button>
          ))}

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="flex flex-col items-center gap-0.5 px-4 py-1 text-white/70 active:text-white active:scale-95"
          >
            <div className="space-y-1">
              <div className="w-5 h-0.5 bg-white" />
              <div className="w-5 h-0.5 bg-white" />
              <div className="w-5 h-0.5 bg-white" />
            </div>
            <span className="text-[10px] tracking-wider">Menu</span>
          </button>
        </div>
      </div>

      {/* Полноэкранное меню */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[90] bg-black/98 backdrop-blur-xl">
          <div className="flex justify-between items-center px-6 py-6 border-b border-white/10">
            <div 
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setIsMenuOpen(false);
              }}
              className="text-3xl font-black tracking-[-1.5px] bg-gradient-to-r from-white via-purple-400 to-pink-500 bg-clip-text text-transparent cursor-pointer"
            >
              SHIPAREZIK
            </div>
            <button onClick={() => setIsMenuOpen(false)} className="text-4xl text-white/70">×</button>
          </div>

          <div className="px-6 py-2">
            {[
              { key: "nav.about", id: "about", icon: User },
              { key: "nav.skills", id: "skills", icon: Code2 },
              { key: "nav.projects", id: "projects", icon: Briefcase },
              { key: "nav.contact", id: "contact", icon: Mail }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="flex items-center gap-4 w-full py-5 text-left text-xl border-b border-white/10 active:bg-white/5"
              >
                <item.icon size={24} className="text-purple-400" />
                {t(item.key)}
              </button>
            ))}
          </div>

          {/* Выбор языка */}
          <div className="px-6 pt-8">
            <div className="text-sm text-white/50 mb-3 px-1">Language</div>
            <div className="grid grid-cols-2 gap-3">
              {(['en', 'pl', 'uk', 'ru'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    changeLanguage(lang);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl border transition-all
                    ${currentLang === lang 
                      ? 'bg-purple-500/20 border-purple-400 text-purple-300' 
                      : 'bg-zinc-900 border-white/10 hover:border-white/30'}`}
                >
                  <span className="text-3xl">{languageFlags[lang]}</span>
                  <div>
                    <div className="font-medium">{languageNames[lang]}</div>
                    <div className="text-xs text-zinc-500">{lang.toUpperCase()}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
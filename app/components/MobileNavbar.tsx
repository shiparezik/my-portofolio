'use client';

import { useState, useEffect } from 'react';
import { User, Code2, Briefcase, Mail } from 'lucide-react';

interface MobileNavbarProps {
  scrollToSection: (id: string) => void;
  t: (key: string) => string;
  currentLang: 'en' | 'pl' | 'uk' | 'ru';
  changeLanguage: (lang: 'en' | 'pl' | 'uk' | 'ru') => void;
  languageFlags: Record<string, string>;
  languageNames: Record<string, string>;
}

const navItems = [
  { key: "nav.about", id: "about", icon: User },
  { key: "nav.skills", id: "skills", icon: Code2 },
  { key: "nav.projects", id: "projects", icon: Briefcase },
  { key: "nav.contact", id: "contact", icon: Mail },
] as const;

export default function MobileNavbar({
  scrollToSection,
  t,
  currentLang,
  changeLanguage,
  languageFlags,
  languageNames,
}: MobileNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen || isLangOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen, isLangOpen]);

  return (
    <>
{/* ==================== ЧИСТЫЙ ВЕРХНИЙ БАР — ТОЛЬКО ЛОГО ==================== */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-[70] bg-black/95 backdrop-blur-xl border-b border-white/10 px-5 py-3">
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-xl font-black tracking-[-1px] bg-gradient-to-r from-white via-purple-400 to-pink-500 bg-clip-text text-transparent cursor-pointer"
        >
          SHIPAREZIK
        </div>
      </div>

      {/* ==================== НИЖНИЙ ТАБ-БАР ==================== */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[80] bg-black/95 backdrop-blur-xl border-t border-white/10 pt-1">
        <div className="flex items-center justify-around px-1 py-2 max-w-lg mx-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="flex flex-col items-center gap-0.5 px-3 py-1.5 text-white/70 active:text-white active:scale-95 transition-all active:bg-white/5 rounded-xl"
            >
              <item.icon size={21} />
              <span className="text-[10px] tracking-wider font-medium">{t(item.key)}</span>
            </button>
          ))}

          {/* Кнопка Язык */}
          <button 
            onClick={() => {
              setIsLangOpen(true);
              setIsMenuOpen(false);
            }} 
            className="flex flex-col items-center gap-0.5 px-3 py-1.5 text-white/70 active:text-white active:scale-95 transition-all active:bg-white/5 rounded-xl"
          >
            <span className="text-2xl">{languageFlags[currentLang]}</span>
            <span className="text-[9px] tracking-wider">Lang</span>
          </button>

          {/* Кнопка Menu */}
          <button 
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              setIsLangOpen(false);
            }} 
            className="flex flex-col items-center gap-0.5 px-3 py-1.5 text-white/70 active:text-white active:scale-95 transition-all active:bg-white/5 rounded-xl"
          >
            <div className="space-y-0.5">
              <div className="w-4 h-0.5 bg-white" />
              <div className="w-4 h-0.5 bg-white" />
              <div className="w-4 h-0.5 bg-white" />
            </div>
            <span className="text-[9px] tracking-wider">Menu</span>
          </button>
        </div>
      </div>
            {/* ==================== МОДАЛКА ЯЗЫКОВ ==================== */}
      {isLangOpen && (
        <div 
          className="md:hidden fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setIsLangOpen(false)}
        >
          <div 
            className="w-full max-w-[340px] bg-zinc-900 rounded-3xl p-6 border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-5 px-1">
              <div className="text-lg font-semibold">Language</div>
              <button onClick={() => setIsLangOpen(false)} className="text-3xl text-white/50 active:text-white active:scale-95">×</button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {(['en', 'pl', 'uk', 'ru'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    changeLanguage(lang);
                    setIsLangOpen(false);
                  }}
                  className={`flex items-center gap-3 px-4 py-4 rounded-2xl border transition-all active:scale-[0.985]
                    ${currentLang === lang 
                      ? 'bg-purple-500/20 border-purple-400 text-purple-300' 
                      : 'bg-zinc-800 border-white/10 active:bg-zinc-700'}`}
                >
                  <span className="text-3xl">{languageFlags[lang]}</span>
                  <div className="text-left">
                    <div className="font-medium text-[15px]">{languageNames[lang]}</div>
                    <div className="text-xs text-zinc-500">{lang.toUpperCase()}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================== ПОЛНОЭКРАННОЕ МЕНЮ ==================== */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[9999] bg-black flex flex-col h-[100dvh]">
          <div className="flex justify-between items-center px-5 pt-12 pb-4 border-b border-white/10">
            <div 
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setIsMenuOpen(false);
              }}
              className="text-2xl font-black tracking-[-1.5px] bg-gradient-to-r from-white via-purple-400 to-pink-500 bg-clip-text text-transparent cursor-pointer active:opacity-80"
            >
              SHIPAREZIK
            </div>
            <button onClick={() => setIsMenuOpen(false)} className="text-4xl text-white/60 active:text-white active:scale-95 px-2 -mr-2">×</button>
          </div>

          <div className="px-5 py-2 flex-1 overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  scrollToSection(item.id);
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-4 w-full py-4 text-left text-lg border-b border-white/10 active:bg-white/5 transition-colors active:scale-[0.995] rounded-lg"
              >
                <item.icon size={23} className="text-purple-400" />
                {t(item.key)}
              </button>
            ))}
          </div>

          <div className="px-5 pb-10 pt-4 border-t border-white/10 bg-black">
            <button
              onClick={() => {
                scrollToSection('contact');
                setIsMenuOpen(false);
              }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold active:scale-[0.985] transition-all"
            >
              Написать мне
            </button>

            <div className="flex justify-center gap-6 text-sm text-white/50 mt-6">
              <a href="https://github.com/shiparez" target="_blank" rel="noopener noreferrer" className="active:text-white">GitHub</a>
              <a href="https://t.me/shiparez" target="_blank" rel="noopener noreferrer" className="active:text-white">Telegram</a>
            </div>

            <div className="text-center text-xs text-white/35 mt-7">
              © 2026 SHIPAREZIK
            </div>
          </div>
        </div>
      )}
    </>
  );
}
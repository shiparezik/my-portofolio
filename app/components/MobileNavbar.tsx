'use client';

import { useState } from 'react';
import { User, Code2, Briefcase, Mail } from 'lucide-react';

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
  const [isLangOpen, setIsLangOpen] = useState(false);

  return (
    <>
      {/* Нижний навбар */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[80] bg-black/95 backdrop-blur-xl border-t border-white/10">
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
              className="flex flex-col items-center gap-0.5 px-3 py-1 text-white/70 active:text-white"
            >
              <item.icon size={21} />
              <span className="text-[10px] tracking-wider">{t(item.key)}</span>
            </button>
          ))}

          {/* Кнопка Язык */}
          <button 
            onClick={() => {
              setIsLangOpen(true);
              setIsMenuOpen(false);
            }} 
            className="flex flex-col items-center gap-0.5 px-3 py-1 text-white/70 active:text-white"
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
            className="flex flex-col items-center gap-0.5 px-3 py-1 text-white/70 active:text-white"
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

      {/* Меню языков */}
      {isLangOpen && (
        <div 
          className="md:hidden fixed inset-0 z-[95] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsLangOpen(false)}
        >
          <div 
            className="w-full max-w-[320px] bg-zinc-900 rounded-3xl p-6 border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-5">
              <div className="text-lg font-semibold">Choose Language</div>
              <button onClick={() => setIsLangOpen(false)} className="text-3xl text-white/60">×</button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {(['en', 'pl', 'uk', 'ru'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    changeLanguage(lang);
                    setIsLangOpen(false);
                  }}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl border text-left transition-all
                    ${currentLang === lang 
                      ? 'bg-purple-500/20 border-purple-400 text-purple-300' 
                      : 'bg-zinc-800 border-white/10 hover:border-white/30'}`}
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

      {/* Основное меню */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[95] bg-black flex flex-col">
          <div className="flex justify-between items-center px-5 pt-10 pb-4 border-b border-white/10">
            <div 
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setIsMenuOpen(false);
              }}
              className="text-2xl font-black tracking-[-1px] bg-gradient-to-r from-white via-purple-400 to-pink-500 bg-clip-text text-transparent cursor-pointer"
            >
              SHIPAREZIK
            </div>
            <button onClick={() => setIsMenuOpen(false)} className="text-3xl text-white/70">×</button>
          </div>

          <div className="px-5 py-2 flex-1">
            {[
              { key: "nav.about", id: "about", icon: User },
              { key: "nav.skills", id: "skills", icon: Code2 },
              { key: "nav.projects", id: "projects", icon: Briefcase },
              { key: "nav.contact", id: "contact", icon: Mail }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="flex items-center gap-3 w-full py-4 text-left text-lg border-b border-white/10 active:bg-white/5"
              >
                <item.icon size={21} className="text-purple-400" />
                {t(item.key)}
              </button>
            ))}
          </div>

          <div className="px-5 pb-8 pt-4 border-t border-white/10 text-center text-sm text-white/40">
            © 2026 SHIPAREZIK
          </div>
        </div>
      )}
    </>
  );
}
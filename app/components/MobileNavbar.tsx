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

  return (
    <>
      {/* ==================== НИЖНИЙ НАВБАР ==================== */}
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
              className="flex flex-col items-center gap-0.5 px-4 py-1 text-white/70 active:text-white active:scale-95 transition-all"
            >
              <item.icon size={22} />
              <span className="text-[10px] tracking-wider">{t(item.key)}</span>
            </button>
          ))}

          {/* Кнопка Menu */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="flex flex-col items-center gap-0.5 px-4 py-1 text-white/70 active:text-white active:scale-95 transition-all"
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

      {/* ==================== ПОЛНОЭКРАННОЕ МЕНЮ ==================== */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[95] bg-[#050505] flex flex-col">
          
          {/* Шапка */}
          <div className="flex justify-between items-center px-6 pt-12 pb-6 border-b border-white/10">
            <div 
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setIsMenuOpen(false);
              }}
              className="text-3xl font-black tracking-[-1.5px] bg-gradient-to-r from-white via-purple-400 to-pink-500 bg-clip-text text-transparent cursor-pointer"
            >
              SHIPAREZIK
            </div>
            <button 
              onClick={() => setIsMenuOpen(false)} 
              className="text-white/70 hover:text-white text-4xl"
            >
              ×
            </button>
          </div>

          {/* Навигация */}
          <div className="px-6 py-2 flex-1">
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

          {/* ==================== ВЫБОР ЯЗЫКА + КОНТАКТЫ ==================== */}
          <div className="px-6 pb-10 pt-6 border-t border-white/10 mt-auto">
            
            {/* Выбор языка */}
            <div className="mb-6">
              <div className="text-sm text-white/50 mb-3 px-1">Language</div>
              <div className="grid grid-cols-2 gap-3">
                {(['en', 'pl', 'uk', 'ru'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      changeLanguage(lang);
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl border transition-all active:scale-[0.985]
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

            {/* Кнопка связи */}
            <button
              onClick={() => {
                scrollToSection('contact');
                setIsMenuOpen(false);
              }}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-lg mb-4 active:scale-[0.985] transition-all"
            >
              Написать мне
            </button>

            {/* Социальные сети */}
            <div className="flex justify-center gap-6 text-white/60">
              <a href="https://github.com/shiparez" target="_blank" className="hover:text-white transition-colors">
                GitHub
              </a>
              <a href="https://t.me/shiparez" target="_blank" className="hover:text-white transition-colors">
                Telegram
              </a>
              <a href="https://linkedin.com/in/shiparez" target="_blank" className="hover:text-white transition-colors">
                LinkedIn
              </a>
            </div>

            {/* Копирайт */}
            <div className="text-center text-xs text-white/40 mt-6">
              © 2026 SHIPAREZIK
            </div>
          </div>
        </div>
      )}
    </>
  );
}
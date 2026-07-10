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
      {/* Нижний навбар (только телефон) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[80] bg-black/95 backdrop-blur-xl border-t border-white/10">
        <div className="flex items-center justify-around px-2 py-2">
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
              <item.icon size={20} />
              <span className="text-[9px] tracking-wider">{t(item.key)}</span>
            </button>
          ))}

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
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

      {/* Полноэкранное меню (компактное) */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[95] bg-black flex flex-col">
          <div className="flex justify-between items-center px-5 pt-10 pb-4 border-b border-white/10">
            <div 
              onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setIsMenuOpen(false); }}
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
                <item.icon size={20} className="text-purple-400" />
                {t(item.key)}
              </button>
            ))}
          </div>

          {/* Язык + Контакты */}
          <div className="px-5 pb-8 pt-4 border-t border-white/10">
            <div className="text-xs text-white/50 mb-2">Language</div>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {(['en', 'pl', 'uk', 'ru'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => { changeLanguage(lang); setIsMenuOpen(false); }}
                  className={`px-3 py-2 rounded-lg border text-sm flex items-center gap-2 ${currentLang === lang ? 'bg-purple-500/20 border-purple-400' : 'bg-zinc-900 border-white/10'}`}
                >
                  {languageFlags[lang]} {languageNames[lang]}
                </button>
              ))}
            </div>

            <button 
              onClick={() => { scrollToSection('contact'); setIsMenuOpen(false); }}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold mb-3"
            >
                <div className="hidden md:flex gap-10 text-lg font-medium">

                    {t('contact.title')}

                </div>
            </button>

            <div className="flex justify-center gap-5 text-sm text-white/50">
              <a href="https://github.com/shiparez" target="_blank">GitHub</a>
              <a href="https://t.me/shiparez" target="_blank">Telegram</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
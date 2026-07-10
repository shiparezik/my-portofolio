'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ExternalLink, Calendar, MapPin, Sparkles, User, Code2, Briefcase, Mail, Star, Heart, Zap, Trophy, Globe, Languages } from 'lucide-react';
import { useState, useEffect } from 'react';

// ==================== LANGUAGE CONFIG ====================
const languageFlags: Record<string, string> = {
  en: 'EN', pl: 'PL', uk: 'UA', ru: 'RU'
};

const languageNames: Record<string, string> = {
  en: 'English', pl: 'Polski', uk: 'Українська', ru: 'Русский'
};

// ==================== CUSTOM SVG ICONS ====================
const GitHubIcon = () => (
  <img src="/icons/github.svg" alt="GitHub" className="w-9 h-9 brightness-0 invert hover:brightness-125 transition-all duration-300" />
);
const LinkedInIcon = () => (
  <img src="/icons/linkedin.svg" alt="LinkedIn" className="w-10 h-10 brightness-0 invert hover:brightness-125 transition-all duration-300" />
);
const MailIcon = () => (
  <img src="/icons/mail.svg" alt="Email" className="w-10 h-10 brightness-0 invert hover:brightness-125 transition-all duration-300" />
);

// ==================== TYPES ====================
interface SkillCategoryProps {
  title: string;
  color: string;
  techs: Array<{ key: string; name: string }>;
  icon?: React.ElementType;
  t: (key: string) => string;
}

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  icon?: React.ElementType;
}

// ==================== COMPONENTS ====================

function SkillCategory({ title, color, techs, icon: Icon, t }: SkillCategoryProps) {
  return (
    <div className="relative rounded-3xl p-12 md:p-16 border border-white/10 bg-black/70 overflow-visible">
      <MatrixRain color={color} density={110} />
     
      <div className="flex justify-center items-center gap-4 mb-16">
        {Icon && <Icon size={52} style={{ color }} />}
        <h3 className="text-5xl md:text-6xl font-black tracking-widest " style={{ color }}>
          {title}
        </h3>
      </div>
     
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 relative z-10">
        {techs.map((tech, i) => (
          <motion.div 
            key={tech.key} 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ delay: i * 0.035 }} 
            className="group/item relative"
          >
            <motion.div 
              whileHover={{ scale: 1.12, y: -12, rotate: 2 }} 
              className="px-8 py-7 bg-zinc-900/90 border border-white/10 rounded-2xl text-center text-xl font-medium hover:border-white/50 cursor-pointer h-full flex items-center justify-center relative overflow-hidden"
            >
              <span className="relative z-10">{tech.name}</span>
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover/item:opacity-100 transition" />
            </motion.div>

            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-6 opacity-0 group-hover/item:opacity-100 pointer-events-none transition-all duration-300 scale-90 group-hover/item:scale-100 w-80 z-[100]">
              <div className="bg-zinc-950 border border-white/20 p-7 rounded-3xl shadow-2xl shadow-black/80 backdrop-blur-xl relative">
                <div className="font-bold text-2xl mb-4 flex items-center gap-3" style={{ color }}>
                  {tech.name} <Star className="w-5 h-5" />
                </div>
                <p className="text-zinc-300 leading-relaxed">
                  {t(`skills.techs.${tech.key}`)}
                </p>
              </div>
              <div 
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-zinc-950 border-r border-b border-white/20" 
                style={{ borderColor: color + '60' }} 
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function MatrixRain({ color = "#a855f7", density = 200 }: { color?: string; density?: number }) {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: density }).map((_, i) => ({
      id: i,
      left: Math.random() * 102,
      fontSize: 8 + Math.random() * 8,
      opacity: 0.25 + Math.random() * 0.55,
      duration: 4.5 + Math.random() * 13,
      delay: Math.random() * -65,
      symbolsCount: 25 + Math.floor(Math.random() * 35),
    }));
    setParticles(newParticles);
  }, [density]);

  const symbols = "01アイウエオカキクケコΣΔΨΩΛΠΘ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZабвгдеёжзийклмнопрстуфхцчшщъыьэюя!@#$%^&*()_+-=[]{}|;:,.<>?";

  return (
    <div className="absolute inset-0 overflow-hidden opacity-25 pointer-events-none font-mono text-[9px] select-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute whitespace-pre leading-none"
          style={{ 
            left: `${p.left}%`, 
            top: '-280px', 
            color, 
            fontSize: `${p.fontSize}px`, 
            opacity: p.opacity 
          }}
          animate={{ y: ['-280px', '220vh'], opacity: [0.08, 0.85, 0.08] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }}
        >
          {Array.from({ length: p.symbolsCount }).map((_, j) => (
            <div key={j} style={{ lineHeight: "0.78" }}>
              {symbols[Math.floor(Math.random() * symbols.length)]}
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  );
}

{/* ==================== LOADING SCREEN ==================== */}

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
      <MatrixRain color="#c084fc" density={150} />

      <div className="relative z-10 flex flex-col items-center px-6">
        {/* Колесико 3 цвета */}
        <div className="relative w-20 h-20 mb-10">
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(#a855f7, #22d3ee, #ec4899, #a855f7)`
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.3, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-[7px] bg-black rounded-full" />
        </div>

        <div className="text-purple-400/90 text-sm tracking-[4px] font-mono mb-8">
          INITIALIZING SYSTEM
        </div>

        {/* Прогресс-бар (заполняется один раз) */}
        <div className="w-[280px]">
          <div className="relative h-[2px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 via-cyan-400 to-pink-500"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute inset-y-0 w-[35%] bg-white/50 blur-[2px]"
              animate={{ left: ["-40%", "140%"] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>

        <div className="mt-8 text-[10px] text-white/40 tracking-[3px] font-mono">
          ESTABLISHING SECURE CONNECTION
        </div>
      </div>
    </div>
  );
}

{/* ==================== PROJECT CARD ==================== */}
function ProjectCard({ title, description, tags, icon: Icon }: ProjectCardProps) {
  return (
    <motion.div
      className="group relative bg-zinc-900 rounded-3xl overflow-hidden border border-white/10 h-full flex flex-col hover:border-purple-500/70"
      whileHover={{
        y: -22,
        scale: 1.02,
        transition: { type: "spring", stiffness: 280, damping: 22, mass: 0.8 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative h-80 bg-zinc-950 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          {Array.from({ length: 65 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-[3px] h-[3px] bg-white/40 rounded-full"
              style={{ left: `${(i * 7.5) % 100}%`, top: `${(i * 11.5) % 100}%` }}
              animate={{ x: [0, 45, 0], y: [0, -55, 0], opacity: [0.25, 0.85, 0.25] }}
              transition={{ duration: 9 + i % 12, repeat: Infinity, delay: i * -0.65 }}
            />
          ))}
        </div>
       
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-black" />
       
        <div className="relative z-10 text-center px-8">
          {Icon && (
            <motion.div animate={{ rotate: [0, 25, 0] }} transition={{ duration: 4, repeat: Infinity }} className="mx-auto mb-6 text-purple-400 group-hover:scale-110 transition-transform duration-700">
              <Icon size={68} />
            </motion.div>
          )}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full mb-6 group-hover:bg-white/10 transition-colors">
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" />
            <span className="uppercase text-xs tracking-widest">Coming Soon</span>
          </div>
          <p className="text-3xl font-light text-white/80">In Development</p>
        </div>
      </div>
      <div className="p-8 flex-1 flex flex-col">
        <h3 className="text-3xl font-bold mb-4 group-hover:text-purple-400 transition-all duration-300">{title}</h3>
        <p className="text-zinc-400 mb-8 flex-1">{description}</p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {tags.map(tag => (
            <span key={tag} className="text-xs px-4 py-1.5 bg-white/5 rounded-full border border-white/10 text-zinc-400 group-hover:border-purple-400/50 group-hover:text-purple-300 transition-all duration-300">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ==================== MAIN COMPONENT ====================
export default function Home() {
  // 1. Состояния
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<'en' | 'pl' | 'uk' | 'ru'>('en');
  const [messages, setMessages] = useState<Record<string, any> | null>(null);
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const { scrollY } = useScroll();
  const navbarOpacity = useTransform(scrollY, [0, 100], [1, 0.92]);

  // 2. useEffect для localStorage
  useEffect(() => {
    const saved = localStorage.getItem('preferredLang') as 'en' | 'pl' | 'uk' | 'ru' | null;
    if (saved) setCurrentLang(saved);
  }, []);

  // 3. useEffect загрузки переводов (с таймером)
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const data = await import(`../messages/${currentLang}.json`);
        setMessages(data.default || data);
        setTimeout(() => setIsLoadingComplete(true), 2200);
      } catch (e) {
        const fallback = await import(`../messages/en.json`);
        setMessages(fallback.default || fallback);
        setTimeout(() => setIsLoadingComplete(true), 2200);
      }
    };
    loadMessages();
  }, [currentLang]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolledPastHero(window.scrollY > 725); // поменяй 750, если нужно
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 4. Функция t (ОБЯЗАТЕЛЬНО ЗДЕСЬ!)
const t = (key: string) => {
  if (!messages) return key;
  const keys = key.split('.');
  let result: any = messages;
  for (const k of keys) result = result?.[k];
  return result ?? key;
};

  const changeLanguage = (lang: 'en' | 'pl' | 'uk' | 'ru') => {
    setCurrentLang(lang);
    localStorage.setItem('preferredLang', lang);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  // 5. Условие загрузки
  if (!messages || !isLoadingComplete) {
    return <LoadingScreen />;
  }

  return (
    <main className="bg-black text-white overflow-visible min-h-screen relative">
      {/* Background Effects */}
      <div className="fixed inset-0 z-[-1] overflow-visible pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#4f46e520_1px,transparent_1px)] [background-size:60px_60px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
        <motion.div animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.75, 0.4], rotate: [0, 15, 0] }} transition={{ duration: 28, repeat: Infinity }} className="absolute top-[-25%] left-[-15%] w-[950px] h-[950px] bg-purple-600/15 rounded-full blur-[160px]" />
        <motion.div animate={{ scale: [1, 1.18, 1], opacity: [0.35, 0.7, 0.35] }} transition={{ duration: 21, repeat: Infinity, delay: 4 }} className="absolute bottom-[-30%] right-[-20%] w-[1200px] h-[1200px] bg-pink-600/15 rounded-full blur-[180px]" />
        <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.65, 0.3] }} transition={{ duration: 26, repeat: Infinity, delay: 9 }} className="absolute top-[35%] left-[55%] w-[750px] h-[750px] bg-cyan-500/15 rounded-full blur-[140px]" />
        <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.25, 0.55, 0.25] }} transition={{ duration: 19, repeat: Infinity, delay: 15 }} className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[110px]" />
      </div>

{/* ============================ NAVBAR ============================ */}
<motion.nav
  style={{ opacity: navbarOpacity }}
  animate={{ 
    y: scrolledPastHero ? -140 : 0, 
    opacity: scrolledPastHero ? 0 : 1 
  }}
  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
className="fixed top-0 left-0 right-0 z-50 overflow-visible border-b border-white/10 
             bg-black/80 backdrop-blur-[26px] backdrop-saturate-150 
             shadow-[0_18px_80px_-25px_rgb(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.08),0_0_0_1px_rgba(168,85,247,0.2)]
             rounded-br-[3rem] rounded-bl-[3rem]"
>
  {/* === ФОН (с правильным ограничением) === */}
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-br-[3rem] rounded-bl-[3rem]">

    {/* Глубокий космос */}
    <div className="absolute inset-0 opacity-80" style={{
      background: `
        radial-gradient(circle at 18% 22%, rgba(124,58,237,0.18) 0%, transparent 48%),
        radial-gradient(circle at 82% 68%, rgba(190,24,93,0.14) 0%, transparent 52%),
        radial-gradient(circle at 52% 12%, rgba(6,182,212,0.12) 0%, transparent 42%)
      `
    }} />

    {/* Aurora слой 1 */}
    <motion.div
      className="absolute inset-0 opacity-22 mix-blend-screen"
      animate={{ backgroundPosition: ['0% 45%', '100% 55%', '0% 45%'] }}
      transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      style={{
        background: 'linear-gradient(92deg, transparent 8%, rgba(103,232,249,0.32) 24%, rgba(124,58,237,0.28) 48%, rgba(190,24,93,0.22) 70%, transparent 94%)',
        backgroundSize: '260% 100%'
      }}
    />

    {/* Aurora слой 2 */}
    <motion.div
      className="absolute inset-0 opacity-18 mix-blend-screen"
      animate={{ backgroundPosition: ['100% 38%', '0% 62%', '100% 38%'] }}
      transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
      style={{
        background: 'linear-gradient(88deg, transparent 6%, rgba(190,24,93,0.28) 26%, rgba(124,58,237,0.25) 50%, rgba(6,182,212,0.22) 74%, transparent 95%)',
        backgroundSize: '220% 100%'
      }}
    />

    {/* Плавающие орбы */}
    <motion.div className="absolute -top-8 left-[5%] w-[170px] h-[170px] rounded-full bg-violet-500/8 blur-[80px]"
      animate={{ x: [0, 50, -30, 0], y: [0, -20, 14, 0] }} transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }} />
    
    <motion.div className="absolute top-[12%] right-[10%] w-[120px] h-[120px] rounded-full bg-cyan-400/8 blur-[65px]"
      animate={{ x: [0, -40, 32, 0], y: [0, 22, -16, 0] }} transition={{ duration: 35, repeat: Infinity, ease: "easeInOut", delay: 5 }} />
    
    <motion.div className="absolute bottom-[8%] left-[22%] w-[95px] h-[95px] rounded-full bg-fuchsia-400/8 blur-[60px]"
      animate={{ x: [0, 35, -25, 0], y: [0, -14, 20, 0] }} transition={{ duration: 27, repeat: Infinity, ease: "easeInOut", delay: 8 }} />

    {/* Центральное свечение */}
    <motion.div 
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[90px] rounded-full bg-purple-500/5 blur-[90px]"
      animate={{ opacity: [0.3, 0.55, 0.3], scale: [1, 1.08, 1] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
    />

    {/* Звёзды */}
    <motion.div className="absolute left-[7%] top-[20%] w-[1.5px] h-[1.5px] bg-white/50 rounded-full" animate={{ opacity: [0.2, 0.7, 0.2] }} transition={{ duration: 3.8, repeat: Infinity }} />
    <motion.div className="absolute left-[26%] top-[35%] w-[1.5px] h-[1.5px] bg-white/45 rounded-full" animate={{ opacity: [0.25, 0.65, 0.25] }} transition={{ duration: 4.1, repeat: Infinity, delay: 2.6 }} />
    <motion.div className="absolute left-[53%] top-[26%] w-[1.5px] h-[1.5px] bg-white/50 rounded-full" animate={{ opacity: [0.18, 0.62, 0.18] }} transition={{ duration: 3.5, repeat: Infinity, delay: 3.2 }} />
    <motion.div className="absolute left-[78%] top-[41%] w-[1.5px] h-[1.5px] bg-white/45 rounded-full" animate={{ opacity: [0.22, 0.68, 0.22] }} transition={{ duration: 4.3, repeat: Infinity, delay: 2.1 }} />

    {/* HUD элементы */}
    <div className="absolute top-[10px] left-[14px] w-6 h-px bg-purple-400/50" />
    <div className="absolute top-[10px] left-[14px] w-px h-6 bg-purple-400/50" />
    <div className="absolute top-[10px] right-[14px] w-6 h-px bg-cyan-400/50" />
    <div className="absolute top-[10px] right-[14px] w-px h-6 bg-cyan-400/50" />

    <div className="absolute left-7 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-400/25 to-transparent" />
    <div className="absolute right-7 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-400/25 to-transparent" />

    {/* Сканирующие полосы */}
    <motion.div className="absolute top-0 h-px w-[28%] bg-gradient-to-r from-transparent via-purple-400/60 to-transparent blur-[0.5px]"
      animate={{ left: ['-35%', '135%'] }} transition={{ duration: 9, repeat: Infinity, ease: "linear", delay: 2 }} />

    {/* Неоновые линии */}
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/45 to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

    {/* Мягкие угловые свечения */}
    <div className="absolute top-0 left-0 w-28 h-28 bg-purple-500/6 blur-[50px] rounded-br-full" />
    <div className="absolute top-0 right-0 w-28 h-28 bg-cyan-500/6 blur-[50px] rounded-bl-full" />
  </div>

  {/* Noise texture */}
  <div 
    className="absolute inset-0 z-[1] pointer-events-none opacity-[0.025] mix-blend-overlay rounded-br-[3rem] rounded-bl-[3rem]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='3'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E")`,
      backgroundSize: '110px 110px'
    }}
  />

{/* ==================== МОБИЛЬНЫЙ НАВБАР ==================== */}
<div className="md:hidden fixed bottom-0 left-0 right-0 z-[70] bg-black/95 backdrop-blur-xl border-t border-white/10">

  <div className="flex items-center justify-around px-2 py-2.5">
    
    {/* Навигация */}
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

{/* ==================== ПОЛНОЭКРАННОЕ МОБИЛЬНОЕ МЕНЮ ==================== */}
{isMenuOpen && (
  <div className="md:hidden fixed inset-0 z-[90] bg-black/98 backdrop-blur-xl">
    
    {/* Шапка */}
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
      <button onClick={() => setIsMenuOpen(false)} className="text-white/70 hover:text-white text-4xl">×</button>
    </div>

    {/* Навигация */}
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

    {/* ==================== ВЫБОР ЯЗЫКА ==================== */}
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

  {/* ==================== ORIGINAL CONTENT (НЕ ТРОГАТЬ) ==================== */}
  <div className="max-w-7xl mx-auto px-6 md:px-8 py-5 flex justify-between items-center relative z-10">
    <motion.h1
      initial={{ opacity: 1, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{
        scale: 1.10,
        rotate: 5,
        transition: {
          rotate: {
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          },
          scale: { duration: 1 }
        }
      }}
      className="text-4xl font-black tracking-[-3px] bg-gradient-to-r from-white via-purple-400 to-pink-500 bg-clip-text text-transparent cursor-pointer"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      SHIPAREZIK
    </motion.h1>

    {/* Desktop Navigation */}
    <div className="hidden md:flex gap-10 text-lg font-medium">
      {[
        { key: "nav.about", id: "about", icon: User },
        { key: "nav.skills", id: "skills", icon: Code2 },
        { key: "nav.projects", id: "projects", icon: Briefcase },
        { key: "nav.contact", id: "contact", icon: Mail }
      ].map((item) => (
        <motion.button
          key={item.id}
          onClick={() => scrollToSection(item.id)}
          whileHover={{ y: -2 }}
          className="relative group flex items-center gap-2 text-white/90 hover:text-white transition-colors"
        >
          <item.icon size={18} className="transition-colors group-hover:text-purple-400" />
          {t(item.key)}
          <span className="absolute -bottom-[3px] left-0 h-[2px] w-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 transition-all duration-300 ease-out group-hover:w-full rounded-full" />
        </motion.button>
      ))}
    </div>

    <div className="flex items-center gap-6">
      {/* Social Links */}
      <div className="hidden md:flex items-center gap-5">
        <motion.a href="https://github.com/shiparezik" target="_blank" className="p-2 text-white/70 hover:text-white transition-colors" whileHover={{ scale: 1.2, rotate: 15, y: -3 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 300, damping: 15 }}><GitHubIcon /></motion.a>
        <motion.a href="https://www.linkedin.com/in/danylo-shypotko-85924a33a/" target="_blank" className="p-2 text-white/70 hover:text-white transition-colors" whileHover={{ scale: 1.2, rotate: -15, y: -3 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 300, damping: 15 }}><LinkedInIcon /></motion.a>
      </div>

{/* ==================== LANGUAGE SWITCHER ==================== */}
      <div className="relative group z-[999]">
        <motion.button 
          whileHover={{ scale: 1.05 }} 
          className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/20 hover:border-purple-400 text-sm font-medium"
        >
          <span className="text-xl">{languageFlags[currentLang]}</span>
        </motion.button>

        {/* Выпадающий список — поднят выше всего */}
        <div className="absolute right-0 mt-2 w-56 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl py-2 z-[999] 
                        opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
          {(['en', 'pl', 'uk', 'ru'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => changeLanguage(lang)}
              className={`w-full text-left px-5 py-3 hover:bg-white/10 flex items-center gap-3 text-sm 
                ${currentLang === lang ? 'bg-purple-500/10 text-purple-400' : ''}`}
            >
              <span className="text-2xl">{languageFlags[lang]}</span>
              <div>
                <div>{languageNames[lang]}</div>
                <div className="text-xs text-zinc-500">{lang.toUpperCase()}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => scrollToSection('projects')}
        className="px-6 py-3 text-sm font-semibold rounded-full border border-purple-500/50 hover:border-purple-400 hover:bg-purple-500/10 transition-all flex items-center gap-2"
      >
        <Star className="w-4 h-4" /> {t('nav.projectsBtn')}
      </motion.button>

      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2">
        <div className="space-y-1.5">
          <motion.div animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 4 : 0 }} className="w-6 h-0.5 bg-white" />
          <motion.div animate={{ opacity: isMenuOpen ? 0 : 1 }} className="w-6 h-0.5 bg-white" />
          <motion.div animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -4 : 0 }} className="w-6 h-0.5 bg-white" />
        </div>
      </button>
    </div>
  </div>

  {/* Mobile Menu — без изменений */}
  {isMenuOpen && (
    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="md:hidden border-t border-white/10 bg-black/95">
      <div className="flex flex-col px-6 py-8 gap-6 text-lg">
        {[
          { key: "nav.about", id: "about", icon: User },
          { key: "nav.skills", id: "skills", icon: Code2 },
          { key: "nav.projects", id: "projects", icon: Briefcase },
          { key: "nav.contact", id: "contact", icon: Mail }
        ].map((item) => (
          <motion.button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            whileHover={{ x: 12 }}
            className="text-left hover:text-purple-400 flex items-center gap-3"
          >
            <item.icon size={20} /> {t(item.key)}
          </motion.button>
        ))}
      </div>
    </motion.div>
  )}
</motion.nav>

{/* ==================== БОКОВОЙ ВЕРТИКАЛЬНЫЙ НАВБАР (ПРАВАЯ СТОРОНА) ==================== */}
<motion.div
  initial={{ x: 120, opacity: 0, scale: 0.9 }}
  animate={{ 
    x: scrolledPastHero ? 0 : 120, 
    opacity: scrolledPastHero ? 1 : 0,
    scale: scrolledPastHero ? 1 : 0.9
  }}
  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
  className="fixed right-6 top-1/2 -translate-y-1/2 z-[60] hidden lg:flex flex-col items-center 
             bg-black/75 backdrop-blur-[28px] border border-white/10 rounded-3xl py-5 px-3.5
             shadow-[0_20px_70px_rgb(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)]"
>
  {/* === МАЛЕНЬКИЙ ЛОГОТИП SHIPAREZIK === */}
  <div 
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    className="mb-5 cursor-pointer group px-1.5 py-1"
  >
    <div className="text-center">
      <div className="text-[25px] font-black tracking-[-1.8px] leading-none
                      bg-gradient-to-r from-white via-purple-400 to-pink-500 
                      bg-clip-text text-transparent select-none
                      drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
        SH
      </div>
      {/* Тонкая неоновая линия под логотипом */}
      <div className="mt-1 h-px w-8 mx-auto bg-gradient-to-r from-transparent via-purple-400/60 to-transparent 
                      group-hover:via-purple-400 transition-all duration-300" />
    </div>
  </div>

  {/* === Навигационные иконки === */}
  {[
    { key: "nav.about", id: "about", icon: User },
    { key: "nav.skills", id: "skills", icon: Code2 },
    { key: "nav.projects", id: "projects", icon: Briefcase },
    { key: "nav.contact", id: "contact", icon: Mail }
  ].map((item) => (
    <motion.button
      key={item.id}
      onClick={() => scrollToSection(item.id)}
      whileHover={{ 
        scale: 1.18, 
        x: -4,
        transition: { type: "spring", stiffness: 520, damping: 14 }
      }}
      whileTap={{ scale: 0.88 }}
      className="group relative p-3.5 rounded-2xl text-white/70 hover:text-white 
                 hover:bg-white/5 transition-colors mb-1.5"
    >
      <item.icon 
        size={22} 
        className="transition-all duration-200 group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.75)]" 
      />
      
      {/* Tooltip слева */}
      <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 
                      px-4 py-2 rounded-xl bg-zinc-950/95 border border-white/10 
                      text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 
                      transition-all duration-150 pointer-events-none z-50 shadow-xl">
        {t(item.key)}
      </div>
    </motion.button>
  ))}

  {/* === Кнопка Projects === */}
  <motion.button
    whileHover={{ 
      scale: 1.15,
      transition: { type: "spring", stiffness: 480, damping: 16 }
    }}
    whileTap={{ scale: 0.9 }}
    onClick={() => scrollToSection('projects')}
    className="mt-5 p-3.5 rounded-2xl border border-purple-500/50 
               hover:border-purple-400 hover:bg-purple-500/10 
               transition-all duration-200"
  >
    <Star className="w-5 h-5 text-purple-400" />
  </motion.button>
</motion.div>

      {/* ==================== HERO ==================== */}
      <section className="hero relative flex justify-center items-center min-h-screen pt-20 overflow-visible">
        <div className="absolute inset-0 bg-[radial-gradient(#4f46e520_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="glow glow1 absolute top-[-40%] left-[-20%] w-[800px] h-[800px] bg-purple-500/25 rounded-full blur-[130px]" />
        <div className="glow glow2 absolute bottom-[-30%] right-[-25%] w-[1000px] h-[1000px] bg-pink-500/25 rounded-full blur-[150px]" />

        {/* Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 220 }).map((_, i) => {
            const left = (i * 4.2) % 100;
            const duration = 8 + (i % 30);
            const isSpecial = i % 6 === 0;
            return (
              <motion.div key={i} className={`absolute w-[2.5px] h-[2.5px] rounded-full ${isSpecial ? 'bg-purple-400' : 'bg-white'}`} style={{ left: `${left}%`, top: `${(i * 7.8) % 100}%` }} animate={{ y: [0, -520, 0], x: [0, (i % 7 - 3) * 35, 0], opacity: [0.2, 1, 0.2], scale: [0.4, isSpecial ? 2.2 : 1.4, 0.4] }} transition={{ duration, repeat: Infinity, delay: i * -0.18 }} />
            );
          })}
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[
            { Icon: Code2, left: '12%', top: '25%', delay: 0, color: '#a855f7' },
            { Icon: Zap, left: '85%', top: '35%', delay: 1.2, color: '#ec4899' },
            { Icon: Trophy, left: '18%', top: '68%', delay: 0.8, color: '#22d3ee' },
            { Icon: Heart, left: '78%', top: '55%', delay: 2.1, color: '#f472b6' },
            { Icon: Globe, left: '45%', top: '15%', delay: 3.4, color: '#c4b5fd' },
          ].map(({ Icon, left, top, delay, color }, idx) => (
            <motion.div key={idx} className="absolute" style={{ left, top }} animate={{ y: [0, -35, 0], rotate: [-12, 12, -12], scale: [0.85, 1.15, 0.85] }} transition={{ duration: 6.5, repeat: Infinity, delay }}>
              <Icon size={42} style={{ color }} strokeWidth={1.6} />
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.p initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="text-xl md:text-2xl text-zinc-400 tracking-[6px] font-light flex items-center justify-center gap-3">
            <Sparkles size={35} className="text-purple-400 animate-pulse bg-clip-text" /> {t('hero.greeting')}
          </motion.p>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.75, y: 60 }} 
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              backgroundPosition: ["0% 50%", "200% 50%", "0% 50%"]
            }} 
            transition={{ 
              type: "spring", 
              stiffness: 90, 
              damping: 14,
              backgroundPosition: {
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }
            }} 
            className="text-[5.8rem] md:text-[9.2rem] leading-[0.85] font-black tracking-[-6px] my-4 
                      bg-[length:300%_100%] bg-gradient-to-r from-purple-400 via-cyan-800 via-pink-500 to-purple-400 
                      bg-clip-text text-transparent"
          >
            {t('hero.name')}
          </motion.h1>

          <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="text-4xl md:text-6xl font-light text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 mb-8 flex items-center justify-center gap-4">
            <Zap className="inline" /> {t('hero.role')}
          </motion.h2>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }} className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            {t('hero.description')}
          </motion.div>

          <div className="mt-16 flex flex-col sm:flex-row gap-5 justify-center">
            <motion.button whileHover={{ scale: 1.06, boxShadow: "0 25px 50px -12px rgb(168 85 247 / 0.5)" }} whileTap={{ scale: 0.97 }} onClick={() => scrollToSection('projects')} className="px-12 py-6 text-lg font-semibold rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600 shadow-xl shadow-purple-500/50 flex items-center gap-3 group relative overflow-hidden">
              <span className="relative z-10">Explore Projects</span>
              <ExternalLink className="group-hover:rotate-45 transition relative z-10" />
              <div className="absolute inset-0 bg-white/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform" />
            </motion.button>

            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={() => scrollToSection('about')} className="px-12 py-6 text-lg rounded-3xl border border-white/30 hover:border-white/70 transition-all flex items-center gap-3">
              <User className="w-5 h-5" /> {t('about.title')}
            </motion.button>
          </div>
        </div>

        <motion.div animate={{ y: [0, 28, 0] }} transition={{ repeat: Infinity, duration: 2.6 }} className="absolute bottom-12 left-1/2 -translate-x-1/2 text-purple-400/70">
          <ArrowDown size={48} strokeWidth={1.4} />
        </motion.div>
      </section>
 {/* ==================== ABOUT ==================== */}
<section id="about" className="py-28 md:py-40 border-t border-white/10 relative">
  <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
    <div className="space-y-8">
      <motion.h2
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-6xl md:text-7xl font-bold tracking-tight flex items-center gap-5"
      >
        <User size={75} className="text-purple-400" /> 
        {t('about.title')}
      </motion.h2>

      <div className="space-y-6 text-lg leading-relaxed text-zinc-300">
        <p>
          {t('about.p1')}
        </p>
        <p>
          {t('about.p2')}
        </p>
        <p>
          {t('about.p3')}
        </p>
        <p>
          {t('about.p4')}
        </p>
      </div>

      <div className="flex flex-wrap gap-4 pt-6">
        <motion.div 
          whileHover={{ scale: 1.05, rotate: 2 }} 
          className="flex items-center gap-3 text-sm uppercase tracking-widest border border-white/10 px-6 py-3.5 rounded-full hover:border-purple-500/50 transition-all"
        >
          <MapPin className="w-4 h-4 text-pink-400" /> 
          {t('location')}
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.05, rotate: -2 }} 
          className="flex items-center gap-3 text-sm uppercase tracking-widest border border-white/10 px-6 py-3.5 rounded-full hover:border-purple-500/50 transition-all"
        >
          <Calendar className="w-4 h-4 text-cyan-400" /> 
          {t('openTo')}
        </motion.div>
      </div>
    </div>

    <motion.div
      initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 90 }}
      className="relative aspect-square rounded-3xl overflow-hidden border border-purple-500/30 shadow-2xl shadow-purple-600/40 group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/50 via-transparent to-pink-500/40 group-hover:opacity-95 transition-opacity" />
      <img
        src="/icons/user.png"
        alt="Shiparezik"
        className="w-full h-full object-cover grayscale-[0.35] group-hover:grayscale-0 transition-all duration-700"
      />
      <div className="absolute bottom-8 left-8 text-xs tracking-widest opacity-75 flex items-center gap-2">
        — 2026 — <Sparkles className="inline" />
      </div>
    </motion.div>
  </div>
</section>
{/* ==================== SKILLS ==================== */}
<section id="skills" className="py-28 md:py-40 border-t border-white/10 bg-zinc-950 relative overflow-hidden">
  <div className="max-w-6xl mx-auto px-6">
    <motion.h2
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-6xl md:text-7xl font-bold text-center mb-20 flex justify-center items-center gap-6"
    >
      {t('skills.title')} <Sparkles size={60} className="text-purple-300 animate-pulse" />
    </motion.h2>

    <div className="space-y-28">
      <SkillCategory
        title={t('skills.frontend')}
        color="#a855f7"
        icon={Code2}
        t={t}
        techs={[
          { key: 'html', name: 'HTML' },
          { key: 'css', name: 'CSS' },
          { key: 'javascript', name: 'JavaScript' },
          { key: 'react', name: 'React' },
          { key: 'nextjs', name: 'Next.js' },
          { key: 'typescript', name: 'TypeScript' },
          { key: 'tailwind', name: 'Tailwind CSS' },
          { key: 'framer', name: 'Framer Motion' },
        ]}
      />

      <SkillCategory
        title={t('skills.backend')}
        color="#22d3ee"
        icon={Zap}
        t={t}
        techs={[
          { key: 'python', name: 'Python' },
          { key: 'csharp', name: 'C#' },
          { key: 'cpp', name: 'C++' },
          { key: 'nodejs', name: 'Node.js' },
          { key: 'express', name: 'Express' },
          { key: 'sql', name: 'SQL' },
        ]}
      />

      <SkillCategory
        title={t('skills.other')}
        color="#f472b6"
        icon={Trophy}
        t={t}
        techs={[
          { key: 'git', name: 'Git & GitHub' },
          { key: 'figma', name: 'Figma' },
          { key: 'restapi', name: 'REST API' },
          { key: 'fullstack', name: 'Full Stack Development' },
          { key: 'webapps', name: 'Web Applications' },
        ]}
      />
    </div>
  </div>
</section>
{/* ==================== PROJECTS ==================== */}
<section id="projects" className="py-28 md:py-40 border-t border-white/10">
  <div className="max-w-6xl mx-auto px-6">
    <div className="flex flex-col md:flex-row justify-between items-end mb-16">
      <motion.h2 
        initial={{ opacity: 0, y: 50 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        className="text-6xl md:text-7xl font-bold flex items-center gap-4"
      >
        {t('projects.title')} <Briefcase size={68} className="text-pink-400" />
      </motion.h2>
      <p className="text-purple-400 text-xl mt-4 md:mt-0">
        {t('projects.subtitle')}
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-8">
      <ProjectCard 
        title="Project Name #1" 
        description="Modern web application..." 
        tags={['Next.js', 'TypeScript', 'Framer Motion']} 
        icon={Code2} 
      />
      <ProjectCard 
        title="Project Name #2" 
        description="Full-stack application..." 
        tags={['React', 'Node.js', 'PostgreSQL']} 
        icon={Zap} 
      />
    </div>
  </div>
</section>

{/* ==================== CONTACT ==================== */}
<section id="contact" className="py-28 md:py-40 border-t border-white/10 bg-zinc-950 relative overflow-hidden">
  <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
    <motion.h2 
      initial={{ opacity: 0, y: 40 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      className="text-6xl md:text-7xl font-bold mb-8 flex justify-center items-center gap-4"
    >
      {t('contact.title')} <Sparkles size={100} className="text-yellow-400" />
    </motion.h2>

    <p className="text-2xl text-zinc-400 mb-12">
      {t('contact.subtitle')}
    </p>

    <motion.a
      href="https://mail.google.com/mail/?view=cm&fs=1&to=shiparezik1@gmail.com"
      whileHover={{
        scale: 1.03,
        y: -1,
      }}
      whileTap={{
        scale: 0.985,
      }}
      animate={{
        backgroundPosition: ["0% 50%", "200% 50%", "0% 50%"],
      }}
      transition={{
        type: "spring",
        stiffness: 650,
        damping: 26,
        mass: 0.45,
        backgroundPosition: {
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        },
      }}
      className="inline-flex items-center gap-5 px-16 py-8 text-2xl font-medium rounded-3xl
                bg-[length:200%_100%] bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600
                shadow-2xl shadow-purple-500/60 transition-all group"
    >
      {t("contact.emailBtn")}
      <Mail className="w-10 h-10 transition-transform duration-200 group-hover:rotate-12" />
    </motion.a>

    <div className="mt-24 flex justify-center gap-12">
      {[
        { href: "https://github.com/shiparezik", icon: GitHubIcon, label: "GitHub" },
        { href: "https://www.linkedin.com/in/danylo-shypotko-85924a33a/", icon: LinkedInIcon, label: "LinkedIn" },
        { href: "https://mail.google.com/mail/?view=cm&fs=1&to=shiparezik1@gmail.com", icon: MailIcon, label: "Email" }
      ].map((social, i) => {
        const IconComponent = social.icon;
        return (
          <motion.a
            key={i}
            href={social.href}
            target={social.href.startsWith('http') ? "_blank" : undefined}
            whileHover={{ y: -16, scale: 1.15, rotate: i % 2 === 0 ? 8 : -8 }}
            className="group flex flex-col items-center gap-5"
          >
            <div className="w-24 h-24 flex items-center justify-center border border-white/20 rounded-3xl group-hover:border-purple-500/70 transition-all bg-black/50">
              <IconComponent />
            </div>
            <span className="text-sm text-zinc-400 group-hover:text-white">{social.label}</span>
          </motion.a>
        );
      })}
    </div>
  </div>
</section>

<footer className="py-12 border-t border-white/10 text-center text-sm text-zinc-500 flex items-center justify-center gap-3">
  {t('footer')}
</footer>
      </main>
    );
}

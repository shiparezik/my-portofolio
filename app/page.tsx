'use client';

import Navbar from './components/Navbar';
import Cursor from './components/Cursor';
import { ArrowRight, Mail, Code2, Zap, Trophy, Calendar, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const languageFlags: Record<string, string> = {
  en: 'EN', pl: 'PL', uk: 'UA', ru: 'RU'
};

const languageNames: Record<string, string> = {
  en: 'English', pl: 'Polski', uk: 'Українська', ru: 'Русский'
};

export default function Portfolio() {
  const [currentLang, setCurrentLang] = useState<'en' | 'pl' | 'uk' | 'ru'>('en');
  const [messages, setMessages] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('preferredLang') as 'en' | 'pl' | 'uk' | 'ru' | null;
    if (saved) setCurrentLang(saved);
  }, []);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const data = await import(`../messages/${currentLang}.json`);
        setMessages(data.default || data);
      } catch (e) {
        const fallback = await import(`../messages/en.json`);
        setMessages(fallback.default || fallback);
      }
    };
    loadMessages();
  }, [currentLang]);

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
  };

  if (!messages) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <main className="bg-[#08060d] text-white selection:bg-[#c084fc]/30">
      <Cursor />
      <Navbar
        currentLang={currentLang}
        changeLanguage={changeLanguage}
        languageFlags={languageFlags}
        languageNames={languageNames}
      />

{/* ==================== HERO ==================== */}
<section className="relative min-h-[100dvh] flex items-center overflow-hidden">
  {/* Background */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: `url('/hero.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  />
  <div className="absolute inset-0 bg-[#08060d]/80 z-10" />
  <div className="absolute inset-0 bg-gradient-to-b from-[#08060d]/30 via-transparent to-[#08060d] z-10" />

  {/* Ambient glow behind logo */}
  <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] sm:w-[640px] h-[520px] sm:h-[640px] bg-[#c084fc]/14 rounded-full blur-[120px] z-10 pointer-events-none" />

  {/* Orbit rings */}
  <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
      className="w-[340px] sm:w-[460px] md:w-[540px] aspect-square rounded-full border border-[#c084fc]/20"
    />
    <motion.div
      animate={{ rotate: -360 }}
      transition={{ duration: 68, repeat: Infinity, ease: 'linear' }}
      className="absolute inset-[12%] rounded-full border border-[#c084fc]/12"
    />
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
      className="absolute inset-[24%] rounded-full border border-[#c084fc]/08"
    />
  </div>

      {/* Content */}
      <div className="relative z-20 w-full max-w-4xl mx-auto px-6 text-center pt-20 pb-16">
        
        {/* ===== LOGO ===== */}
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="mb-8 sm:mb-10 flex justify-center"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative"
      >
        {/* soft glow behind logo */}
        <div className="absolute inset-0 scale-110 bg-[#c084fc]/20 blur-[40px] rounded-full pointer-events-none" />

        <img
          src="/logo.shiparezik.png"
          alt="shiparezik"
          className="relative w-[240px] sm:w-[300px] md:w-[360px] lg:w-[400px] h-auto mx-auto select-none"
          draggable={false}
        />
      </motion.div>
    </motion.div>

    {/* ===== NAME ===== */}
    <motion.h1
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="font-orbitron text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-black tracking-tight mb-5"
    >
      <span className="bg-gradient-to-r from-white via-[#f0abfc] to-[#c084fc] bg-clip-text text-transparent">
        {t('hero.name')}
      </span>
    </motion.h1>

    {/* Role */}
    <motion.p
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.32 }}
      className="text-lg sm:text-xl md:text-2xl font-medium text-[#c084fc] tracking-wide mb-5"
    >
      {t('hero.role')}
    </motion.p>

    {/* Description */}
    <motion.p
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.45 }}
      className="text-[15px] sm:text-base md:text-lg text-white/45 max-w-md mx-auto mb-11 leading-relaxed"
    >
      {t('hero.description')}
    </motion.p>

    {/* Buttons */}
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.58 }}
      className="flex flex-col sm:flex-row gap-3.5 justify-center"
    >
      <button
        onClick={() => scrollToSection('projects')}
        className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4
                   bg-gradient-to-r from-[#c084fc] to-[#e879f9] text-white rounded-2xl
                   font-semibold text-[15px]
                   shadow-[0_0_36px_-8px_rgba(192,132,252,0.65)]
                   hover:shadow-[0_0_48px_-6px_rgba(192,132,252,0.85)]
                   transition-all duration-300 active:scale-[0.97]"
      >
        {t('nav.projectsBtn')}
        <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform duration-300" />
      </button>

      <button
        onClick={() => scrollToSection('contact')}
        className="inline-flex items-center justify-center px-8 py-4 rounded-2xl
                   border border-white/15 text-white/75 font-medium text-[15px]
                   hover:border-white/30 hover:text-white hover:bg-white/[0.04]
                   transition-all duration-300 active:scale-[0.97]"
      >
        {t('nav.contact')}
      </button>
    </motion.div>
  </div>

  {/* Optimized particles (меньше + легче) */}
  <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
    {[
      { x: 12, y: 18, d: 5.2, delay: 0.3 },
      { x: 78, y: 22, d: 6.1, delay: 1.1 },
      { x: 25, y: 68, d: 4.8, delay: 0.7 },
      { x: 88, y: 55, d: 5.7, delay: 1.8 },
      { x: 45, y: 12, d: 6.4, delay: 0.2 },
      { x: 65, y: 78, d: 5.0, delay: 2.2 },
      { x: 8,  y: 48, d: 5.9, delay: 1.4 },
      { x: 92, y: 35, d: 4.6, delay: 0.9 },
      { x: 35, y: 85, d: 6.2, delay: 1.6 },
      { x: 55, y: 40, d: 5.3, delay: 0.5 },
      { x: 18, y: 30, d: 5.8, delay: 2.0 },
      { x: 72, y: 65, d: 4.9, delay: 1.3 },
    ].map((p, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 rounded-full bg-[#c084fc]/70"
        style={{ left: `${p.x}%`, top: `${p.y}%` }}
        animate={{
          y: [0, -70, 0],
          opacity: [0.15, 0.7, 0.15],
        }}
        transition={{
          duration: p.d,
          repeat: Infinity,
          delay: p.delay,
          ease: 'easeInOut',
        }}
      />
    ))}
  </div>

  {/* Scroll indicator */}
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.3, duration: 0.8 }}
    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
  >
    <span className="text-[10px] uppercase tracking-[0.25em] text-white/25">Scroll</span>
    <motion.div
      animate={{ y: [0, 6, 0] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5"
    >
      <div className="w-1 h-1.5 rounded-full bg-[#c084fc]/90" />
    </motion.div>
  </motion.div>
</section>

{/* ==================== TECH MARQUEE ==================== */}
<section className="relative border-y border-white/5 bg-[#0c0a14] overflow-hidden py-6">
  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c084fc]/40 to-transparent" />
  <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#c084fc]/40 to-transparent" />

  <div className="relative flex overflow-hidden select-none">
    <motion.div
      className="flex shrink-0 items-center gap-12 pr-12"
      animate={{ x: ['0%', '-50%'] }}
      transition={{ duration: 32, ease: 'linear', repeat: Infinity }}
    >
      {[
        'REACT', 'NEXT.JS', 'TYPESCRIPT', 'TAILWIND', 'FRAMER MOTION',
        'NODE.JS', 'PYTHON', 'C#', 'POSTGRESQL', 'DOCKER',
        'GIT', 'FIGMA', 'VERCEL', 'REST API', 'EXPRESS',
        'REACT', 'NEXT.JS', 'TYPESCRIPT', 'TAILWIND', 'FRAMER MOTION',
        'NODE.JS', 'PYTHON', 'C#', 'POSTGRESQL', 'DOCKER',
        'GIT', 'FIGMA', 'VERCEL', 'REST API', 'EXPRESS',
      ].map((tech, i) => (
        <div key={i} className="flex items-center gap-4">
          <span 
            className="text-sm sm:text-[15px] font-semibold tracking-[0.15em] text-white/35 hover:text-[#c084fc] transition-colors duration-300 whitespace-nowrap"
            style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
          >
            {tech}
          </span>
          <span className="text-[#c084fc]/40 text-xs">✦</span>
        </div>
      ))}
    </motion.div>
  </div>
</section>

  {/* ==================== ABOUT ==================== */}
  <section id="about" className="relative border-t border-white/10 py-28 overflow-hidden">
    <div className="absolute inset-0 bg-[#08060d]" />
    <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#c084fc]/5 rounded-full blur-[120px] pointer-events-none" />

    <div className="relative z-10 max-w-6xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-14 lg:gap-20 items-center">
        
        {/* Text */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#c084fc] text-sm tracking-[3px] mb-4 font-medium uppercase"
          >
            {t('about.title')}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.04em] leading-[1.1] mb-8 text-white"
          >
            Building digital things that matter.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-5 text-[16px] sm:text-lg text-white/55 leading-relaxed"
          >
            <p>{t('about.p1')}</p>
            <p>{t('about.p2')}</p>
            <p>{t('about.p3')}</p>
            <p>{t('about.p4')}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-3 mt-10"
          >
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full 
                            border border-white/10 bg-white/[0.03] text-sm text-white/70
                            backdrop-blur-sm hover:border-[#c084fc]/30 transition-colors">
              <MapPin className="w-4 h-4 text-[#c084fc]" />
              {t('location')}
            </div>
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full 
                            border border-white/10 bg-white/[0.03] text-sm text-white/70
                            backdrop-blur-sm hover:border-[#67e8f9]/30 transition-colors">
              <Calendar className="w-4 h-4 text-[#67e8f9]" />
              {t('openTo')}
            </div>
          </motion.div>
        </div>

        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative group"
        >
          {/* Glow behind photo */}

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative group"
          >
            {/* Outer glow */}
            <div className="absolute -inset-6 bg-[#c084fc]/20 rounded-[2rem] blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none" />

            {/* Accent ring */}
            <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-[#c084fc]/40 via-transparent to-[#e879f9]/20 opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 
                            shadow-[0_30px_60px_-15px_rgba(0,0,0,0.55)]
                            bg-[#0c0a14]">
              
              <img
                src="/about.jpg"
                alt="Danylo Shypotko"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Top light reflection */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent pointer-events-none" />

              {/* Bottom fade */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#08060d]/50 via-transparent to-transparent pointer-events-none" />

              {/* Side vignette */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#08060d]/20 via-transparent to-[#08060d]/20 pointer-events-none" />
            </div>

            {/* Badge */}
            <div className="absolute -bottom-4 -right-4 px-5 py-2.5 rounded-2xl 
                            bg-[#0c0a14]/95 border border-white/10 backdrop-blur-md
                            shadow-[0_10px_30px_rgba(0,0,0,0.4)]
                            flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c084fc] animate-pulse" />
              <span className="text-sm font-medium text-white/80 tracking-wide">shiparezik</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  </section>

        {/* ==================== SKILLS ==================== */}
  <section id="skills" className="relative border-t border-white/10 py-28 overflow-hidden">
    {/* Background */}
    <div className="absolute inset-0 bg-[#08060d]" />
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#c084fc]/6 rounded-full blur-[120px] pointer-events-none" />

    <div className="relative z-10 max-w-5xl mx-auto px-6">
      
      {/* Header */}
      <div className="mb-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[#c084fc] text-sm tracking-[3px] mb-4 font-medium uppercase"
        >
          {t('skills.title')}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.04em] text-white"
        >
          Skills & Tools
        </motion.h2>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-5">
        {[
          {
            icon: Code2,
            title: t('skills.frontend'),
            color: '#c084fc',
            items: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'],
          },
          {
            icon: Zap,
            title: t('skills.backend'),
            color: '#67e8f9',
            items: ['Node.js', 'Python', 'C#', 'Express', 'PostgreSQL'],
          },
          {
            icon: Trophy,
            title: t('skills.other'),
            color: '#e879f9',
            items: ['Git', 'Figma', 'REST API', 'Vercel', 'Docker'],
          },
        ].map((cat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="group relative"
          >
            {/* Card glow on hover */}
            <div
              className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
              style={{
                background: `linear-gradient(135deg, ${cat.color}30, transparent 60%)`,
              }}
            />

            <div className="relative h-full bg-[#0c0a14]/80 backdrop-blur-sm border border-white/8 
                            group-hover:border-white/15 rounded-3xl p-7 
                            transition-all duration-400
                            group-hover:bg-[#0c0a14]/95
                            group-hover:-translate-y-1
                            group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">
              
              {/* Icon + Title */}
              <div className="flex items-center gap-3.5 mb-7">
                <div
                  className="relative flex items-center justify-center w-11 h-11 rounded-2xl 
                            bg-white/5 border border-white/10
                            group-hover:scale-110 group-hover:border-white/20
                            transition-all duration-400"
                  style={{
                    boxShadow: `0 0 24px -6px ${cat.color}50`,
                  }}
                >
                  <cat.icon className="w-5 h-5" style={{ color: cat.color }} />
                </div>

                <h3 className="text-lg font-semibold tracking-tight text-white">
                  {cat.title}
                </h3>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 text-[13px] rounded-full
                              bg-white/[0.04] border border-white/8 text-white/70
                              hover:bg-white/[0.08] hover:text-white hover:border-white/15
                              transition-all duration-250 cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>

  {/* ==================== SERVICES ==================== */}
  <section id="services" className="relative border-t border-white/10 py-28 overflow-hidden">
    <div className="absolute inset-0 bg-[#08060d]" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#c084fc]/5 rounded-full blur-[130px] pointer-events-none" />

    <div className="relative z-10 max-w-5xl mx-auto px-6">
      
      {/* Header */}
      <div className="mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[#c084fc] text-sm tracking-[3px] mb-4 font-medium uppercase"
        >
          {t('services.title')}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.04em] text-white mb-5"
        >
          {t('services.heading')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/45 text-lg max-w-xl mx-auto"
        >
          {t('services.subtitle')}
        </motion.p>
      </div>

      {/* Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[
          {
            key: 'frontend',
            color: '#c084fc',
            icon: (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
              </svg>
            ),
          },
          {
            key: 'fullstack',
            color: '#67e8f9',
            icon: (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
              </svg>
            ),
          },
          {
            key: 'uiux',
            color: '#e879f9',
            icon: (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
              </svg>
            ),
          },
          {
            key: 'performance',
            color: '#c084fc',
            icon: (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            ),
          },
          {
            key: 'landing',
            color: '#67e8f9',
            icon: (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
            ),
          },
          {
            key: 'maintenance',
            color: '#e879f9',
            icon: (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.13 5.13a1.5 1.5 0 01-2.12 0l-1.13-1.13a1.5 1.5 0 010-2.12l5.13-5.13m8.49-8.49a4.5 4.5 0 00-6.36 0l-.88.88 6.36 6.36.88-.88a4.5 4.5 0 000-6.36z" />
              </svg>
            ),
          },
        ].map((service, i) => (
          <motion.div
            key={service.key}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="group relative"
          >
            <div
              className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
              style={{ background: `linear-gradient(135deg, ${service.color}25, transparent 65%)` }}
            />

            <div className="relative h-full bg-[#0c0a14]/80 border border-white/8 rounded-3xl p-7
                            group-hover:border-white/15 group-hover:bg-[#0c0a14]
                            transition-all duration-400 group-hover:-translate-y-1
                            group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">
              
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5
                          bg-white/5 border border-white/10
                          group-hover:scale-110 transition-transform duration-400"
                style={{
                  color: service.color,
                  boxShadow: `0 0 24px -6px ${service.color}50`,
                }}
              >
                {service.icon}
              </div>

              <h3 className="text-lg font-semibold tracking-tight text-white mb-3">
                {t(`services.items.${service.key}.title`)}
              </h3>

              <p className="text-sm text-white/45 leading-relaxed">
                {t(`services.items.${service.key}.desc`)}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>  

      {/* ==================== PROJECTS ==================== */}
<section id="projects" className="max-w-5xl mx-auto px-6 py-28 border-t border-white/10">
  <div className="flex justify-between items-end mb-14">
    <div>
      <div className="text-[#a855f7] text-sm tracking-[3px] mb-3 font-medium uppercase">
        {t('projects.title')}
      </div>
      <h2 className="text-5xl md:text-6xl font-semibold tracking-tighter">
        {t('projects.heading')}
      </h2>
    </div>
    <a
      href="https://github.com/shiparezik"
      target="_blank"
      rel="noopener noreferrer"
      className="hidden md:flex items-center gap-2 text-sm text-white/50 hover:text-[#a855f7] transition-colors"
    >
      {t('projects.viewAll')} →
    </a>
  </div>

  <div className="grid md:grid-cols-2 gap-7">
    {[
      {
        key: 'alpha',
        img: '/project1.jpg',
        year: '2026',
        stack: ['Next.js', 'TypeScript', 'Framer Motion'],
      },
      {
        key: 'beta',
        img: '/project2.jpg',
        year: '2026',
        stack: ['React', 'Node.js', 'PostgreSQL'],
      },
    ].map((project) => (
      <div
        key={project.key}
        className="group rounded-3xl overflow-hidden border border-white/10 bg-zinc-950/60 hover:border-purple-500/40 transition-all duration-500 hover:shadow-[0_0_40px_-15px_rgba(168,85,247,0.25)]"
      >
        <div className="aspect-video relative overflow-hidden">
          <img
            src={project.img}
            alt={t(`projects.items.${project.key}.title`)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        </div>
        <div className="p-8">
          <div className="text-sm text-[#a855f7] mb-2 tracking-widest font-medium">
            {project.year} • {t(`projects.items.${project.key}.type`)}
          </div>
          <div className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
            {t(`projects.items.${project.key}.title`)}
          </div>
          <p className="text-white/60 mb-6 leading-relaxed">
            {t(`projects.items.${project.key}.desc`)}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="text-xs px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-white/70"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
</section>

            {/* ==================== CONTACT ==================== */}
      <section id="contact" className="relative border-t border-white/10 py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[#08060d]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#c084fc]/7 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#c084fc] text-sm tracking-[3px] mb-4 font-medium uppercase"
          >
            {t('contact.title')}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.04em] mb-6"
          >
            Get in touch
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/50 mb-12 leading-relaxed"
          >
            {t('contact.subtitle')}
          </motion.p>

          {/* Main email button */}
          <motion.a
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            href="mailto:danilsipatko@gmail.com"
            className="group relative inline-flex items-center gap-3 px-8 py-4 
                      bg-gradient-to-r from-[#c084fc] to-[#e879f9] text-white rounded-2xl 
                      font-semibold text-[15px]
                      shadow-[0_0_36px_-8px_rgba(192,132,252,0.55)]
                      hover:shadow-[0_0_48px_-6px_rgba(192,132,252,0.75)]
                      transition-all duration-300 active:scale-[0.97]"
          >
            <img src="/icons/mail.svg" alt="" className="w-5 h-5 invert brightness-0" />
            {t('contact.emailBtn')}
          </motion.a>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex justify-center gap-4 mt-12"
          >
            {/* GitHub */}
            <a
              href="https://github.com/shiparezik"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-12 h-12 rounded-2xl
                        bg-white/5 border border-white/10
                        hover:bg-white/10 hover:border-[#c084fc]/40
                        transition-all duration-300 hover:-translate-y-1"
            >
              <img
                src="/icons/github.svg"
                alt="GitHub"
                className="w-5 h-5 invert opacity-70 group-hover:opacity-100 transition-opacity"
              />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/danylo-shypotko-85924a33a/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-12 h-12 rounded-2xl
                        bg-white/5 border border-white/10
                        hover:bg-white/10 hover:border-[#c084fc]/40
                        transition-all duration-300 hover:-translate-y-1"
            >
              <img
                src="/icons/linkedin.svg"
                alt="LinkedIn"
                className="w-5 h-5 invert opacity-70 group-hover:opacity-100 transition-opacity"
              />
            </a>

            {/* Mail */}
            <a
              href="mailto:danilsipatko@gmail.com"
              className="group flex items-center justify-center w-12 h-12 rounded-2xl
                        bg-white/5 border border-white/10
                        hover:bg-white/10 hover:border-[#c084fc]/40
                        transition-all duration-300 hover:-translate-y-1"
            >
              <img
                src="/icons/mail.svg"
                alt="Email"
                className="w-5 h-5 invert opacity-70 group-hover:opacity-100 transition-opacity"
              />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="border-t border-white/10 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Left */}
          <div className="flex items-center gap-3">
            <img
              src="/logo.shiparezik.png"
              alt="shiparezik"
              className="h-20 w-40 object-contain opacity-80"
            />
            <span className="text-sm text-white/35">{t('footer')}</span>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/shiparezik"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 border border-white/10
                        hover:bg-white/10 hover:border-white/20 transition-all"
            >
              <img
                src="/icons/github.svg"
                alt="GitHub"
                className="w-4 h-4 invert opacity-60 hover:opacity-100 transition-opacity"
              />
            </a>

            <a
              href="https://www.linkedin.com/in/danylo-shypotko-85924a33a/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 border border-white/10
                        hover:bg-white/10 hover:border-white/20 transition-all"
            >
              <img
                src="/icons/linkedin.svg"
                alt="LinkedIn"
                className="w-4 h-4 invert opacity-60 hover:opacity-100 transition-opacity"
              />
            </a>

            <a
              href="mailto:danilsipatko@gmail.com"
              className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 border border-white/10
                        hover:bg-white/10 hover:border-white/20 transition-all"
            >
              <img
                src="/icons/mail.svg"
                alt="Email"
                className="w-4 h-4 invert opacity-60 hover:opacity-100 transition-opacity"
              />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
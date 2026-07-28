'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Code2, Zap, Trophy, Calendar, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

import Navbar from './components/Navbar';
import Optimize from './components/Optimize';

const languageFlags: Record<string, string> = {
  en: 'EN',
  pl: 'PL',
  uk: 'UA',
  ru: 'RU',
};

const languageNames: Record<string, string> = {
  en: 'English',
  pl: 'Polski',
  uk: 'Українська',
  ru: 'Русский',
};

const techList = [
  'REACT', 'NEXT.JS', 'TYPESCRIPT', 'TAILWIND', 'FRAMER MOTION',
  'NODE.JS', 'PYTHON', 'C#', 'POSTGRESQL', 'DOCKER',
  'GIT', 'FIGMA', 'VERCEL', 'REST API', 'EXPRESS',
];

export default function Portfolio() {
  const [currentLang, setCurrentLang] = useState<'en' | 'pl' | 'uk' | 'ru'>('en');
  const [messages, setMessages] = useState<Record<string, any> | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('preferredLang') as 'en' | 'pl' | 'uk' | 'ru' | null;
    if (saved) setCurrentLang(saved);
  }, []);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const data = await import(`../messages/${currentLang}.json`);
        setMessages(data.default || data);
      } catch {
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
    document.getElementById(id)?.scrollIntoView({
      behavior: isMobile ? 'auto' : 'smooth',
    });
  };

  // Лёгкие анимации
  const fadeUp = (delay = 0) =>
    isMobile
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, delay },
        };

  const viewFade = (delay = 0) =>
    isMobile
      ? { viewport: { once: true } }
      : {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5, delay },
        };

  if (!messages) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0f] text-white">
        Loading...
      </div>
    );
  }

  return (
    <main className="bg-[#08060d] text-white selection:bg-[#c084fc]/30">
      <Optimize />

      <Navbar
        currentLang={currentLang}
        changeLanguage={changeLanguage}
        languageFlags={languageFlags}
        languageNames={languageNames}
        t={t}
      />

      {/* ==================== HERO ==================== */}
      <section className="relative flex min-h-[100dvh] items-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('/hero.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 z-[1] bg-[#08060d]/92" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#08060d]/70 via-[#08060d]/35 to-[#08060d]" />

        {/* Glow только desktop */}
        {!isMobile && (
          <>
            <div className="pointer-events-none absolute top-[25%] left-1/2 z-[1] h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c084fc]/20 blur-[120px]" />
            <div className="pointer-events-none absolute top-[40%] left-1/2 z-[1] -translate-x-1/2 -translate-y-1/2">
              <div className="h-[460px] w-[460px] rounded-full border border-[#c084fc]/15" />
              <div className="absolute inset-[14%] rounded-full border border-[#c084fc]/10" />
            </div>
          </>
        )}

        <div className="relative z-10 mx-auto w-full max-w-4xl px-6 pb-24 pt-28 text-center">
          {/* Status */}
          <motion.div {...fadeUp(0)} className="mb-9 flex justify-center">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#c084fc]/30 bg-[#c084fc]/10 px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/75">
                {t('openTo')}
              </span>
            </div>
          </motion.div>

          {/* Logo */}
          <motion.div {...fadeUp(0.05)} className="mb-8 flex justify-center">
            {isMobile ? (
              <img
                src="/logo.shiparezik.png"
                alt="shiparezik"
                className="mx-auto h-auto w-[240px] select-none"
                draggable={false}
              />
            ) : (
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                <div className="absolute inset-0 scale-125 rounded-full bg-[#c084fc]/25 blur-[40px]" />
                <img
                  src="/logo.shiparezik.png"
                  alt="shiparezik"
                  className="relative mx-auto h-auto w-[300px] select-none md:w-[360px] lg:w-[410px]"
                  draggable={false}
                />
              </motion.div>
            )}
          </motion.div>

          {/* Name */}
          <motion.h1
            {...fadeUp(0.1)}
            className="font-orbitron mb-4 text-[2.6rem] font-black tracking-[-0.04em] sm:text-5xl md:text-6xl lg:text-[4.5rem]"
          >
            <span className="bg-gradient-to-r from-white via-[#f5d0fe] to-[#c084fc] bg-clip-text text-transparent">
              {t('hero.name')}
            </span>
          </motion.h1>

          {/* Role */}
          <motion.div {...fadeUp(0.15)} className="mb-6 flex items-center justify-center gap-4">
            <span className="hidden h-px w-12 bg-gradient-to-r from-transparent to-[#c084fc]/50 sm:block" />
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#c084fc]">
              {t('hero.role')}
            </p>
            <span className="hidden h-px w-12 bg-gradient-to-l from-transparent to-[#c084fc]/50 sm:block" />
          </motion.div>

          {/* Description */}
          <motion.p
            {...fadeUp(0.2)}
            className="mx-auto mb-10 max-w-lg text-[15px] leading-relaxed text-white/45 sm:text-base"
          >
            {t('hero.description')}
          </motion.p>

          {/* Buttons */}
          <motion.div
            {...fadeUp(0.25)}
            className="flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <button
              onClick={() => scrollToSection('projects')}
              className="group inline-flex min-w-[170px] items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#c084fc] to-[#e879f9] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_-8px_rgba(192,132,252,0.6)] active:scale-[0.97]"
            >
              {t('nav.projectsBtn')}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className="inline-flex min-w-[170px] items-center justify-center rounded-2xl border border-white/15 bg-white/[0.03] px-7 py-3.5 text-sm font-medium text-white/70 active:scale-[0.97]"
            >
              {t('nav.contact')}
            </button>
          </motion.div>

          {/* Socials */}
          <motion.div {...fadeUp(0.3)} className="mt-10 flex items-center justify-center gap-3">
            {[
              { href: 'https://github.com/shiparezik', icon: '/icons/github.svg', alt: 'GitHub' },
              { href: 'https://www.linkedin.com/in/danylo-shypotko-85924a33a/', icon: '/icons/linkedin.svg', alt: 'LinkedIn' },
              { href: 'mailto:danilsipatko@gmail.com', icon: '/icons/mail.svg', alt: 'Email' },
            ].map((item) => (
              <a
                key={item.alt}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]"
              >
                <img src={item.icon} alt={item.alt} className="h-4 w-4 invert opacity-70" />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator только desktop */}
        {!isMobile && (
          <div className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/20">Scroll</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="flex h-8 w-5 justify-center rounded-full border border-white/15 pt-1.5"
            >
              <div className="h-1.5 w-1 rounded-full bg-[#c084fc]" />
            </motion.div>
          </div>
        )}
      </section>

      {/* ==================== TECH MARQUEE ==================== */}
      <section className="relative overflow-hidden border-y border-white/5 bg-[#0c0a14] py-5">
        <div className="relative flex overflow-hidden select-none">
          <motion.div
            className="flex shrink-0 items-center gap-10 pr-10"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: isMobile ? 40 : 30,
              ease: 'linear',
              repeat: Infinity,
            }}
          >
            {[...techList, ...techList].map((tech, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="whitespace-nowrap text-sm font-semibold tracking-[0.15em] text-white/35">
                  {tech}
                </span>
                <span className="text-xs text-[#c084fc]/40">✦</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== ABOUT ==================== */}
      <section id="about" className="relative scroll-mt-24 overflow-hidden border-t border-white/10 py-24 md:py-28">
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-16">
            <div>
              <motion.div {...viewFade()} className="mb-4 text-sm font-medium uppercase tracking-[3px] text-[#c084fc]">
                {t('about.title')}
              </motion.div>

              <motion.h2
                {...viewFade(0.05)}
                className="mb-6 text-4xl font-bold leading-[1.1] tracking-[-0.04em] text-white sm:text-5xl"
              >
                {t('about.heading')}
              </motion.h2>

              <motion.div {...viewFade(0.1)} className="space-y-4 text-base leading-relaxed text-white/55">
                <p>{t('about.p1')}</p>
                <p>{t('about.p2')}</p>
                <p>{t('about.p3')}</p>
                <p>{t('about.p4')}</p>
              </motion.div>

              <motion.div {...viewFade(0.15)} className="mt-8 flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/70">
                  <MapPin className="h-4 w-4 text-[#c084fc]" />
                  {t('location')}
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/70">
                  <Calendar className="h-4 w-4 text-[#67e8f9]" />
                  {t('openTo')}
                </div>
              </motion.div>
            </div>

            <motion.div {...viewFade(0.1)} className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10">
                <img
                  src="/about.jpg"
                  alt="Danylo Shypotko"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08060d]/40 to-transparent" />
              </div>
              <div className="absolute -bottom-3 -right-3 flex items-center gap-2 rounded-2xl border border-white/10 bg-[#0c0a14] px-4 py-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#c084fc]" />
                <span className="text-sm text-white/80">shiparezik</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

     {/* ==================== SKILLS ==================== */}
      <section
        id="skills"
        className="relative min-h-[55vh] scroll-mt-24 border-t border-white/10 py-20 md:py-25"
      >
        <div className="relative z-10 mx-auto flex min-h-[85vh] max-w-5xl flex-col justify-center px-6">
          <div className="mb-16">
            <motion.div
              {...viewFade()}
              className="mb-4 text-sm font-medium uppercase tracking-[3px] text-[#c084fc]"
            >
              {t('skills.title')}
            </motion.div>
            <motion.h2
              {...viewFade(0.05)}
              className="text-4xl font-bold tracking-[-0.04em] text-white sm:text-5xl md:text-6xl"
            >
              Skills & Tools
            </motion.h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
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
                {...viewFade(isMobile ? 0 : i * 0.08)}
                className="rounded-3xl border border-white/10 bg-[#0c0a14]/80 p-7 md:p-8"
              >
                <div className="mb-6 flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5"
                    style={{ color: cat.color }}
                  >
                    <cat.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{cat.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs text-white/70"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SERVICES ==================== */}
      <section id="services" className="relative scroll-mt-24 border-t border-white/10 py-24 md:py-28">
        <div className="relative z-10 mx-auto max-w-5xl px-6">
          <div className="mb-12 text-center">
            <motion.div {...viewFade()} className="mb-4 text-sm font-medium uppercase tracking-[3px] text-[#c084fc]">
              {t('services.title')}
            </motion.div>
            <motion.h2 {...viewFade(0.05)} className="mb-4 text-4xl font-bold tracking-[-0.04em] text-white sm:text-5xl">
              {t('services.heading')}
            </motion.h2>
            <motion.p {...viewFade(0.1)} className="mx-auto max-w-xl text-base text-white/45">
              {t('services.subtitle')}
            </motion.p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {['frontend', 'fullstack', 'uiux', 'performance', 'landing', 'maintenance'].map((key, i) => (
              <motion.div
                key={key}
                {...viewFade(isMobile ? 0 : i * 0.05)}
                className="rounded-3xl border border-white/10 bg-[#0c0a14]/80 p-6"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#c084fc]">
                  <Code2 className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  {t(`services.items.${key}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-white/45">
                  {t(`services.items.${key}.desc`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PROJECTS ==================== */}
      <section id="projects" className="min-h-[80vh] scroll-mt-24 border-t border-white/10 py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <div className="mb-3 text-sm font-medium uppercase tracking-[3px] text-[#a855f7]">
                {t('projects.title')}
              </div>
              <h2 className="text-4xl font-semibold tracking-tighter sm:text-5xl md:text-6xl">
                {t('projects.heading')}
              </h2>
            </div>
            <a
              href="https://github.com/shiparezik"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden text-sm text-white/50 hover:text-[#a855f7] md:block"
            >
              {t('projects.viewAll')} →
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              { key: 'alpha', img: '/project1.jpg', year: '2026', stack: ['Next.js', 'TypeScript', 'Framer Motion'] },
              { key: 'beta', img: '/project2.jpg', year: '2026', stack: ['React', 'Node.js', 'PostgreSQL'] },
            ].map((project) => (
              <div
                key={project.key}
                className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/60"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.img}
                    alt={t(`projects.items.${project.key}.title`)}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                </div>
                <div className="p-6 md:p-8">
                  <div className="mb-2 text-sm tracking-widest text-[#a855f7]">
                    {project.year} • {t(`projects.items.${project.key}.type`)}
                  </div>
                  <div className="mb-3 text-2xl font-semibold tracking-tight">
                    {t(`projects.items.${project.key}.title`)}
                  </div>
                  <p className="mb-5 leading-relaxed text-white/60">
                    {t(`projects.items.${project.key}.desc`)}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs text-white/70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CONTACT ==================== */}
      <section id="contact" className="scroll-mt-24 border-t border-white/10 py-24 md:py-28">
        <div className="mx-auto max-w-xl px-6 text-center">
          <motion.div {...viewFade()} className="mb-4 text-sm font-medium uppercase tracking-[3px] text-[#c084fc]">
            {t('contact.title')}
          </motion.div>
          <motion.h2 {...viewFade(0.05)} className="mb-5 text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
            {t('contact.heading')}
          </motion.h2>
          <motion.p {...viewFade(0.1)} className="mb-10 text-lg text-white/50">
            {t('contact.subtitle')}
          </motion.p>

          <motion.a
            {...viewFade(0.15)}
            href="mailto:danilsipatko@gmail.com"
            className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#c084fc] to-[#e879f9] px-8 py-4 text-sm font-semibold text-white"
          >
            <img src="/icons/mail.svg" alt="" className="h-5 w-5 invert" />
            {t('contact.emailBtn')}
          </motion.a>

          <div className="mt-10 flex justify-center gap-3">
            {[
              { href: 'https://github.com/shiparezik', icon: '/icons/github.svg', alt: 'GitHub' },
              { href: 'https://www.linkedin.com/in/danylo-shypotko-85924a33a/', icon: '/icons/linkedin.svg', alt: 'LinkedIn' },
              { href: 'mailto:danilsipatko@gmail.com', icon: '/icons/mail.svg', alt: 'Email' },
            ].map((item) => (
              <a
                key={item.alt}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5"
              >
                <img src={item.icon} alt={item.alt} className="h-5 w-5 invert opacity-70" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <img src="/logo1.png" alt="shiparezik" className="h-10 w-auto object-contain opacity-80" />
            <span className="text-sm text-white/35">{t('footer')}</span>
          </div>
          <div className="flex items-center gap-3">
            {[
              { href: 'https://github.com/shiparezik', icon: '/icons/github.svg', alt: 'GitHub' },
              { href: 'https://www.linkedin.com/in/danylo-shypotko-85924a33a/', icon: '/icons/linkedin.svg', alt: 'LinkedIn' },
              { href: 'mailto:danilsipatko@gmail.com', icon: '/icons/mail.svg', alt: 'Email' },
            ].map((item) => (
              <a
                key={item.alt}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5"
              >
                <img src={item.icon} alt={item.alt} className="h-4 w-4 invert opacity-60" />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
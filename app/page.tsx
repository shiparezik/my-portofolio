'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Code2,
  Gauge,
  Globe2,
  Layers3,
  LayoutPanelTop,
  Mail,
  MapPin,
  MonitorSmartphone,
  Palette,
  Rocket,
  ServerCog,
  Sparkles,
  Timer,
  Workflow,
} from 'lucide-react';
import { motion } from 'framer-motion';

import Navbar from './components/Navbar';
import Optimize from './components/Optimize';

type Language = 'en' | 'pl' | 'uk' | 'ru';
type MessageTree = { [key: string]: string | MessageTree };

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
  'HTML5', 'CSS3', 'JAVASCRIPT', 'TYPESCRIPT', 'REACT', 'NEXT.JS',
  'TAILWIND', 'FRAMER MOTION', 'NODE.JS', 'EXPRESS', 'REST API', 'JWT',
  'POSTGRESQL', 'PRISMA', 'NEON', 'PYTHON', 'C#', 'GIT', 'GITHUB',
  'DOCKER', 'VERCEL', 'FIGMA', 'PLAYWRIGHT', 'AI WORKFLOWS',
];

const services = [
  { key: 'frontend', icon: LayoutPanelTop, color: '#c084fc' },
  { key: 'fullstack', icon: Layers3, color: '#67e8f9' },
  { key: 'uiux', icon: Palette, color: '#f9a8d4' },
  { key: 'performance', icon: Gauge, color: '#fcd34d' },
  { key: 'landing', icon: Rocket, color: '#c4b5fd' },
  { key: 'maintenance', icon: ServerCog, color: '#5eead4' },
];

const socialLinks = [
  { href: 'https://github.com/shiparezik', icon: '/icons/github.svg', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/danylo-shypotko', icon: '/icons/linkedin.svg', label: 'LinkedIn' },
  { href: 'mailto:shipareziki@gmail.com', icon: '/icons/mail.svg', label: 'Email' },
];

export default function Portfolio() {
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'en';
    const saved = window.localStorage.getItem('preferredLang');
    return saved === 'en' || saved === 'pl' || saved === 'uk' || saved === 'ru' ? saved : 'en';
  });
  const [messages, setMessages] = useState<MessageTree | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

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
        setMessages((data.default || data) as MessageTree);
      } catch {
        const fallback = await import(`../messages/en.json`);
        setMessages((fallback.default || fallback) as MessageTree);
      }
    };
    loadMessages();
  }, [currentLang]);

  const t = (key: string) => {
    if (!messages) return key;
    const keys = key.split('.');
    let result: string | MessageTree | undefined = messages;
    for (const k of keys) {
      if (typeof result === 'string' || !result) return key;
      result = result[k];
    }
    return typeof result === 'string' ? result : key;
  };

  const changeLanguage = (lang: Language) => {
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

  const projectShowcase = [
    {
      key: 'taskflow',
      title: 'TaskFlow',
      icon: CheckCircle2,
      color: '#c4b5fd',
      image: '/taskflow-dashboard.png',
      href: 'https://taskflow-dev.com',
      linkLabel: t('projects.taskflow.visit'),
      visualHref: 'https://taskflow-dev.com',
      visualLabel: t('projects.taskflow.visit'),
      stack: ['Next.js 15', 'Express', 'Prisma', 'PostgreSQL', 'OpenAI / Groq'],
      features: ['tasks', 'notes', 'ai'],
    },
    {
      key: 'signalboard',
      title: t('projects.signalboard.title'),
      icon: Gauge,
      color: '#67e8f9',
      image: undefined,
      href: undefined,
      linkLabel: undefined,
      visualHref: undefined,
      visualLabel: undefined,
      stack: ['Next.js', 'Node.js', 'Webhooks', 'PostgreSQL', 'AI workflows'],
      features: ['pulse', 'briefing', 'decisions'],
    },
    {
      key: 'portfolio',
      title: t('projects.portfolio.title'),
      icon: MonitorSmartphone,
      color: '#f9a8d4',
      image: '/portfolio-preview.png',
      href: undefined,
      linkLabel: undefined,
      visualHref: '/',
      visualLabel: t('projects.portfolio.visit'),
      stack: ['Next.js', 'i18n', 'SEO', 'A11y', 'Framer Motion'],
      features: ['design', 'performance', 'locales'],
    },
  ];
  const activeProject = projectShowcase[activeProjectIndex] ?? projectShowcase[0];
  const moveProject = (direction: -1 | 1) => {
    setActiveProjectIndex((currentIndex) => (currentIndex + direction + projectShowcase.length) % projectShowcase.length);
  };

  return (
    <main className="page-surface bg-[#08060d] text-white selection:bg-[#c084fc]/30">
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

        <div className="relative z-10 mx-auto w-full max-w-4xl px-6 pb-12 pt-20 text-center sm:pb-24 sm:pt-28">
          {/* Status */}
          <motion.div {...fadeUp(0)} className="mb-6 flex justify-center sm:mb-9">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#c084fc]/30 bg-[#c084fc]/10 px-4 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/75">
                {t('openTo')}
              </span>
            </div>
          </motion.div>

          {/* Logo */}
          <motion.div {...fadeUp(0.05)} className="mb-5 flex justify-center sm:mb-8">
            {isMobile ? (
              <Image
                src="/logo.shiparezik.png"
                alt="shiparezik"
                width={1536}
                height={1024}
                sizes="210px"
                priority
                className="mx-auto h-auto w-[210px] select-none"
                draggable={false}
              />
            ) : (
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                <div className="absolute inset-0 scale-125 rounded-full bg-[#c084fc]/25 blur-[40px]" />
                <Image
                  src="/logo.shiparezik.png"
                  alt="shiparezik"
                  width={1536}
                  height={1024}
                  sizes="(max-width: 768px) 300px, (max-width: 1024px) 360px, 410px"
                  priority
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
            className="mx-auto mb-6 max-w-lg text-[15px] leading-relaxed text-white/45 sm:mb-10 sm:text-base"
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
          <motion.div {...fadeUp(0.3)} className="mx-auto mt-7 flex w-full max-w-md items-center justify-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-1.5 sm:mt-8">
            {socialLinks.map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={label}
                className="group flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-transparent text-white/55 transition duration-300 hover:border-violet-300/30 hover:bg-violet-300/[0.09] hover:text-white"
              >
                <Image src={icon} alt="" width={16} height={16} className="h-4 w-4 invert opacity-70 transition group-hover:opacity-100" aria-hidden="true" />
                <span className="text-[11px] font-medium tracking-wide">{label}</span>
              </a>
            ))}
          </motion.div>

          <motion.div
            {...fadeUp(0.35)}
            className="mx-auto mt-3 grid max-w-2xl grid-cols-3 gap-2 text-left sm:mt-4"
          >
            {[
              { icon: Layers3, label: t('hero.proof.endToEnd'), color: '#c4b5fd' },
              { icon: Globe2, label: t('hero.proof.locales'), color: '#67e8f9' },
              { icon: Sparkles, label: t('hero.proof.craft'), color: '#f9a8d4' },
            ].map(({ icon: Icon, label, color }, index) => (
              <div
                key={label}
                className="group relative min-h-[66px] overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.025] px-3 py-2.5 transition duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.05] sm:min-h-[82px] sm:px-5 sm:py-3"
              >
                <span className="absolute right-3 top-2 text-[9px] font-semibold tracking-[0.14em] text-white/20">0{index + 1}</span>
                <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] sm:h-8 sm:w-8" style={{ color }}>
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </div>
                <span className="block max-w-[10rem] text-[9px] font-medium leading-snug text-white/60 sm:text-xs">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>

      </section>

      {/* ==================== TECH STACK ==================== */}
      <section aria-label="Technology stack" className="border-y border-white/[0.07] bg-[#0c0a14]/85 py-3 sm:py-4">
        <div className="mb-2 flex items-center justify-center gap-2 px-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-200/75 sm:hidden">
          <span className="flex h-7 w-7 items-center justify-center rounded-xl border border-violet-300/20 bg-violet-300/[0.08] text-violet-200">
            <Code2 className="h-3.5 w-3.5" />
          </span>
          {t('stack.label')}
        </div>
        <div className="mx-auto flex max-w-[1440px] items-center px-4 sm:px-6">
          <div className="mr-6 hidden shrink-0 items-center gap-2 border-r border-white/[0.08] pr-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-violet-200/75 sm:flex lg:mr-10 lg:pr-10">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-300/20 bg-violet-300/[0.08] text-violet-200">
              <Code2 className="h-[18px] w-[18px]" />
            </span>
            {t('stack.label')}
          </div>
          <div className="tech-marquee relative min-w-0 flex-1 overflow-hidden">
            <div className="tech-marquee__track" style={{ animationDuration: '58s' }}>
              {[0, 1].map((group) => (
                <div key={group} className="tech-marquee__group" aria-hidden={group === 1}>
                  {techList.map((tech) => (
                    <span key={`${group}-${tech}`} className="tech-marquee__item">
                      {tech}
                      <span aria-hidden="true" className="ml-4 text-violet-300/80">✦</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== ABOUT ==================== */}
      <section id="about" className="relative scroll-mt-24 overflow-hidden border-t border-white/10 py-24 md:py-32">
        {!isMobile && <div className="pointer-events-none absolute -left-28 top-20 h-96 w-96 rounded-full bg-violet-500/[0.07] blur-3xl" />}
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
                  <Timer className="h-4 w-4 text-[#67e8f9]" />
                  {t('openTo')}
                </div>
              </motion.div>
            </div>

            <motion.div {...viewFade(0.1)} className="relative mx-auto w-full max-w-lg md:max-w-none">
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0c0a14]/90 p-6 shadow-2xl shadow-black/30 sm:p-8">
                <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-violet-400/10 blur-3xl" />
                <div className="relative">
                  <div className="mb-10 flex items-center justify-between">
                    <span className="rounded-full border border-violet-300/20 bg-violet-300/10 px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-violet-100">SHIPAREZIK / PROFILE</span>
                    <span className="h-2 w-2 rounded-full bg-emerald-300" />
                  </div>
                  <Image src="/logo1.png" alt="shiparezik" width={728} height={688} sizes="96px" className="mb-7 h-20 w-auto object-contain opacity-90" />
                  <p className="text-2xl font-semibold tracking-[-0.04em] text-white">Danylo Shypotko</p>
                  <p className="mt-1 text-sm text-violet-200/75">{t('hero.role')}</p>
                  <div className="my-8 h-px bg-gradient-to-r from-violet-300/40 via-white/10 to-transparent" />
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      { icon: MapPin, value: t('location'), color: '#c4b5fd' },
                      { icon: Code2, value: 'React · Next.js', color: '#67e8f9' },
                      { icon: ServerCog, value: 'Node.js · REST API', color: '#f9a8d4' },
                      { icon: Globe2, value: 'UA/RU · PL/EN B2', color: '#fcd34d' },
                    ].map(({ icon: Icon, value, color }) => (
                      <div key={value} className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-3 text-xs text-white/65">
                        <Icon className="h-4 w-4 shrink-0" style={{ color }} />
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

     {/* ==================== SKILLS ==================== */}
      <section
        id="skills"
        className="relative scroll-mt-24 overflow-hidden border-t border-white/10 py-24 md:py-32 xl:min-h-[720px]"
      >
        {!isMobile && <div className="pointer-events-none absolute left-1/2 top-24 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-400/[0.06] blur-[110px]" />}
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <div className="mb-10 md:mb-12">
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
              {t('skills.heading')}
            </motion.h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                icon: Code2,
                title: t('skills.frontend'),
                summary: t('skills.frontendDescription'),
                color: '#c084fc',
                items: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Responsive UI', 'Accessibility'],
              },
              {
                icon: ServerCog,
                title: t('skills.backend'),
                summary: t('skills.backendDescription'),
                color: '#67e8f9',
                items: ['Node.js', 'Express', 'REST API', 'PostgreSQL', 'Prisma', 'Neon', 'JWT', 'OAuth', 'Python', 'C#'],
              },
              {
                icon: Workflow,
                title: t('skills.other'),
                summary: t('skills.otherDescription'),
                color: '#e879f9',
                items: ['Git', 'GitHub', 'Figma', 'Vercel', 'Docker', 'SEO', 'Core Web Vitals', 'AI workflows', 'OpenAI / Groq'],
              },
            ].map((cat, i) => (
              <motion.div
                key={i}
                {...viewFade(isMobile ? 0 : i * 0.08)}
                className="group relative flex min-h-[350px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0c0a14]/80 p-7 transition duration-500 hover:-translate-y-2 hover:border-white/20 hover:bg-[#110f1c] md:min-h-[390px] md:p-8"
              >
                <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full opacity-0 blur-3xl transition duration-500 group-hover:opacity-20" style={{ background: cat.color }} />
                <span className="absolute right-6 top-6 text-[11px] font-semibold tracking-[0.18em] text-white/20">0{i + 1}</span>
                <div className="mb-5 flex items-start gap-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition duration-300 group-hover:scale-110 group-hover:bg-white/[0.08]"
                    style={{ color: cat.color }}
                  >
                    <cat.icon className="h-5 w-5" />
                  </div>
                  <div className="pr-8">
                    <h3 className="text-base font-semibold leading-snug text-white sm:text-lg">{cat.title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-white/45">{cat.summary}</p>
                  </div>
                </div>
                <div className="mb-5 h-px bg-gradient-to-r from-white/10 to-transparent" />
                <div className="grid grid-cols-2 gap-2">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="flex min-h-10 items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-3 text-[11px] leading-snug text-white/65 transition duration-200 hover:border-white/25 hover:bg-white/[0.07] hover:text-white"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: cat.color }} />
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
      <section id="services" className="relative scroll-mt-24 overflow-hidden border-t border-white/10 py-24 md:py-32">
        {!isMobile && <div className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-cyan-400/[0.05] blur-3xl" />}
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
            {services.map(({ key, icon: Icon, color }, i) => (
              <motion.div
                key={key}
                {...viewFade(isMobile ? 0 : i * 0.05)}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0c0a14]/80 p-6 transition duration-500 hover:-translate-y-1.5 hover:border-white/20 hover:bg-white/[0.045]"
              >
                <span className="absolute right-6 top-6 text-xs font-semibold tracking-[0.18em] text-white/20">0{i + 1}</span>
                <div className="absolute inset-x-6 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-white/60 to-transparent transition duration-500 group-hover:scale-x-100" />
                <div
                  className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-transform duration-300 group-hover:scale-110"
                  style={{ color }}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  {t(`services.items.${key}.title`)}
                </h3>
                <p className="pr-3 text-sm leading-relaxed text-white/45">
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

          <motion.article
            key={activeProject.key}
            initial={isMobile ? false : { opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: isMobile ? 0 : 0.28, ease: 'easeOut' }}
            className="group relative overflow-hidden rounded-[2rem] border border-violet-300/20 bg-[#0d0b17] p-1 shadow-[0_30px_90px_-45px_rgba(139,92,246,0.65)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(139,92,246,0.16),transparent_34%),radial-gradient(circle_at_90%_88%,rgba(34,211,238,0.1),transparent_28%)]" />
            <div className="relative grid gap-8 rounded-[1.8rem] border border-white/[0.05] bg-[#0c0b14]/80 p-6 sm:p-8 lg:h-[716px] lg:grid-cols-[1.02fr_0.98fr] lg:gap-10 lg:p-10">
              <div className="flex flex-col">
                <div className="mb-7 flex items-center justify-between gap-4">
                  <span className="inline-flex items-center gap-2 rounded-full border border-violet-300/25 bg-violet-300/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-violet-100 sm:text-[11px]">
                    <Sparkles className="h-3.5 w-3.5 text-violet-300" />
                    {t(`projects.${activeProject.key}.eyebrow`)}
                  </span>
                  <span className="text-[11px] font-semibold tracking-[0.16em] text-white/35">0{activeProjectIndex + 1} / 0{projectShowcase.length}</span>
                </div>

                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]" style={{ color: activeProject.color }}>
                    <activeProject.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-3xl font-bold tracking-[-0.05em] text-white sm:text-4xl">{activeProject.title}</h3>
                </div>

                <p className="max-w-xl text-base leading-relaxed text-white/60 sm:text-[17px]">
                  {t(`projects.${activeProject.key}.description`)}
                </p>

                <div className="my-7 grid gap-2.5">
                  {activeProject.features.map((feature, index) => (
                    <div key={feature} className="flex gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.035] px-4 py-3.5">
                      <span className="pt-0.5 text-[10px] font-semibold tracking-[0.16em] text-violet-200/55">0{index + 1}</span>
                      <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                        <p className="shrink-0 text-xs font-semibold text-white sm:min-w-40">{t(`projects.${activeProject.key}.features.${feature}.title`)}</p>
                        <p className="text-[11px] leading-relaxed text-white/45">{t(`projects.${activeProject.key}.features.${feature}.desc`)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3">
                  <div className="flex flex-wrap gap-2">
                    {activeProject.stack.map((tech) => (
                      <span key={tech} className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-[11px] font-medium text-white/65">{tech}</span>
                    ))}
                  </div>
                  {activeProject.href && activeProject.linkLabel && (
                    <a href={activeProject.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-200 transition hover:text-white">
                      {activeProject.linkLabel} <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>

              <div className="relative flex items-center">
                <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-violet-400/10 blur-3xl" />
                {activeProject.image ? (
                  <div className="relative w-full overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#10111c] p-2 shadow-2xl shadow-indigo-950/50">
                    <div className="relative aspect-[16/9] overflow-hidden rounded-[1.15rem]">
                      <Image src={activeProject.image} alt={`${activeProject.title} preview`} fill sizes="(max-width: 1024px) calc(100vw - 64px), 48vw" quality={75} className="object-cover object-center" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080b13]/75 via-transparent to-transparent" />
                      {activeProject.visualHref && activeProject.visualLabel && (
                        <a
                          href={activeProject.visualHref}
                          target={activeProject.visualHref.startsWith('http') ? '_blank' : undefined}
                          rel={activeProject.visualHref.startsWith('http') ? 'noopener noreferrer' : undefined}
                          aria-label={activeProject.visualLabel}
                          className="group/preview absolute inset-0 z-10"
                        >
                          <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-cyan-200/25 bg-[#080b13]/85 px-3.5 py-2 text-[11px] font-semibold text-cyan-100 shadow-lg shadow-black/30 transition duration-300 group-hover/preview:-translate-y-1 group-hover/preview:border-cyan-200/55 group-hover/preview:bg-cyan-200/15">
                            {activeProject.visualLabel}
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </span>
                        </a>
                      )}
                    </div>
                  </div>
                ) : activeProject.key === 'signalboard' ? (
                  <div className="w-full overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#10111c] p-5 shadow-2xl shadow-indigo-950/50">
                    <div className="mb-6 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-300" />
                        <span className="text-[10px] font-semibold tracking-[0.16em] text-white/70">LIVE PRODUCT SIGNALS</span>
                      </div>
                      <Gauge className="h-5 w-5 text-cyan-200" />
                    </div>
                    <div className="mb-5 grid grid-cols-3 gap-2">
                      {[['24', 'deploys'], ['99.9%', 'uptime'], ['12', 'signals']].map(([value, label]) => (
                        <div key={label} className="rounded-xl border border-white/[0.08] bg-white/[0.035] p-3">
                          <strong className="block text-sm text-white">{value}</strong>
                          <span className="text-[9px] text-white/40">{label}</span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      {[
                        ['Release #42', 'Healthy', '#86efac'],
                        ['Checkout errors', 'Needs review', '#fcd34d'],
                        ['Customer feedback', '12 new insights', '#67e8f9'],
                      ].map(([title, status, color]) => (
                        <div key={title} className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.025] px-3 py-3">
                          <span className="text-xs font-medium text-white/75">{title}</span>
                          <span className="flex items-center gap-1.5 text-[10px] text-white/45"><span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />{status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex aspect-[16/9] w-full flex-col items-center justify-center rounded-[1.6rem] border border-white/10 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.14),transparent_52%)]">
                    <activeProject.icon className="mb-4 h-14 w-14" style={{ color: activeProject.color }} />
                    <span className="text-sm font-semibold text-white/70">{activeProject.title}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.article>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => moveProject(-1)} aria-label={t('projects.carousel.previous')} className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/70 transition hover:border-violet-300/40 hover:bg-violet-300/10 hover:text-white">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button type="button" onClick={() => moveProject(1)} aria-label={t('projects.carousel.next')} className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/70 transition hover:border-violet-300/40 hover:bg-violet-300/10 hover:text-white">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {projectShowcase.map((project, index) => (
                <button key={project.key} type="button" onClick={() => setActiveProjectIndex(index)} className={`min-h-11 rounded-full border px-3 py-2 text-xs font-medium transition ${index === activeProjectIndex ? 'border-violet-300/35 bg-violet-300/10 text-violet-100' : 'border-white/10 bg-white/[0.03] text-white/45 hover:border-white/20 hover:text-white/75'}`}>
                  0{index + 1} <span className="hidden sm:inline">{project.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CONTACT ==================== */}
      <section id="contact" className="relative scroll-mt-24 overflow-hidden border-t border-white/10 py-24 md:py-32">
        {!isMobile && <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-400/[0.1] blur-[120px]" />}
        <div className="relative mx-auto max-w-5xl px-6">
          <motion.div
            {...viewFade()}
            className="relative overflow-hidden rounded-[2rem] border border-violet-300/20 bg-[#0d0b17] p-1 shadow-[0_30px_90px_-45px_rgba(139,92,246,0.8)]"
          >
            <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(139,92,246,0.15),transparent_38%,rgba(34,211,238,0.08))]" />
            <div className="relative grid gap-10 rounded-[1.8rem] border border-white/[0.05] bg-[#0c0a14]/75 p-7 sm:p-10 md:grid-cols-[1.1fr_0.9fr] md:items-end lg:p-14">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-300/25 bg-violet-300/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-violet-100">
                  <Sparkles className="h-3.5 w-3.5 text-violet-300" />
                  {t('contact.title')}
                </div>
                <motion.h2 {...viewFade(0.05)} className="max-w-xl text-4xl font-bold leading-[1.02] tracking-[-0.05em] text-white sm:text-5xl md:text-6xl">
                  {t('contact.heading')}
                </motion.h2>
                <motion.p {...viewFade(0.1)} className="mt-6 max-w-lg text-base leading-relaxed text-white/55 sm:text-lg">
                  {t('contact.subtitle')}
                </motion.p>
              </div>

              <div className="md:justify-self-end md:text-right">
                <a
                  href="mailto:shipareziki@gmail.com"
                  className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#c084fc] to-[#e879f9] px-6 py-4 text-sm font-semibold text-white shadow-[0_18px_40px_-18px_rgba(192,132,252,0.9)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_46px_-15px_rgba(192,132,252,1)]"
                >
                  <Mail className="h-5 w-5" />
                  {t('contact.emailBtn')}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <p className="mt-4 text-sm text-white/40">shipareziki@gmail.com · +48 573 815 595</p>
                <div className="mt-8 flex justify-start gap-3 md:justify-end">
                  {socialLinks.map(({ href, icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      aria-label={label}
                      className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white/65 transition duration-300 hover:-translate-y-1 hover:border-cyan-200/40 hover:bg-cyan-200/10 hover:text-cyan-100"
                    >
                      <Image src={icon} alt="" width={20} height={20} className="h-5 w-5 invert opacity-80" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-6 sm:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:justify-start">
            <Image src="/logo1.png" alt="shiparezik" width={728} height={688} sizes="42px" className="h-10 w-auto object-contain opacity-80" />
            <span className="text-sm text-white/35">{t('footer')}</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 sm:justify-end">
            <span className="text-xs text-white/45">© 2026 <a href="https://github.com/shiparezik" target="_blank" rel="noopener noreferrer" className="text-white/70 transition hover:text-violet-200">by shiparezik</a></span>
            <Link href="/privacy" className="text-xs text-white/45 transition hover:text-violet-200">{t('footerLinks.privacy')}</Link>
            <Link href="/terms" className="text-xs text-white/45 transition hover:text-violet-200">{t('footerLinks.terms')}</Link>
            {socialLinks.map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/60 transition hover:border-white/25 hover:text-white"
              >
                <Image src={icon} alt="" width={16} height={16} className="h-4 w-4 invert opacity-60" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}

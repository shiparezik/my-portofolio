'use client';

import { useEffect, useRef } from 'react';

export default function Cursor() {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const el = ref.current;
    if (!el) return;

    document.documentElement.classList.add('has-custom-cursor');

    const move = (e: MouseEvent) => {
      el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };

    window.addEventListener('mousemove', move, { passive: true });

    return () => {
      window.removeEventListener('mousemove', move);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, []);

  return (
    <img
      ref={ref}
      src="/cursor.png"
      alt=""
      width={32}
      height={32}
      draggable={false}
      className="site-cursor"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 32,
        height: 32,
        pointerEvents: 'none',
        zIndex: 999999,
        background: 'transparent',
        userSelect: 'none',
        display: 'block',
        willChange: 'transform',
        transform: 'translate3d(-100px, -100px, 0)',
      }}
    />
  );
}
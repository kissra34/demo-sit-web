import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CrownSVG = () => (
  <motion.div 
    className="crown-sparkle relative w-24 h-20 md:w-32 md:h-24 mx-auto mb-6"
    animate={{
      x: [0, 20, -20, 15, -15, 10, -10, 0],
      rotate: [0, 3, -3, 2, -2, 1, -1, 0]
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <svg viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="30%" stopColor="#C5A059" />
          <stop offset="50%" stopColor="#E8D48B" />
          <stop offset="70%" stopColor="#C5A059" />
          <stop offset="100%" stopColor="#B8942E" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path d="M15 70 L10 25 L35 45 L60 10 L85 45 L110 25 L105 70 Z"
        fill="url(#goldGrad)" filter="url(#glow)" stroke="#E8D48B" strokeWidth="2" />
      <circle cx="35" cy="40" r="5" fill="#E8D48B" />
      <circle cx="60" cy="12" r="6" fill="#E8D48B" />
      <circle cx="85" cy="40" r="5" fill="#E8D48B" />
      <rect x="12" y="68" width="96" height="10" rx="3" fill="url(#goldGrad)" filter="url(#glow)" />
    </svg>
  </motion.div>
);

const greeting = "DOTCOM AUTOMOTIVE — FES, MAROC";

export default function PreLoader({ onComplete, language = 'fr' }) {
  const [phase, setPhase] = useState('loading');

  const welcomeTexts = {
    ar: 'أهلا وسهلا بكم في أفضل وكالة سيارات في المغرب',
    fr: 'Bienvenue dans la meilleure agence automobile au Maroc',
    en: 'Welcome to the Best Automotive Agency in Morocco',
    es: 'Bienvenido a la mejor agencia automotriz de Marruecos'
  };

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase('reveal'), 4000);
    const timer2 = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 5300);
    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <AnimatePresence>
      {phase === 'loading' && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: '#9E0000' }}
        >
          <div className="grain-overlay absolute inset-0" />
          
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-[2px]"
                style={{
                  background: 'linear-gradient(90deg, transparent, #C5A059, transparent)',
                  width: '100%',
                  top: `${15 + i * 15}%`,
                }}
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                  duration: 2.5,
                  delay: i * 0.3,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              />
            ))}
          </div>

          <div className="relative z-10 text-center px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <CrownSVG />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-6xl md:text-8xl font-bold text-white tracking-wider mb-3"
            >
              DOTCOM
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="text-[#E8D48B] text-sm md:text-base tracking-[0.5em] font-light mb-8"
            >
              AUTOMOTIVE
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="text-white/95 text-lg md:text-2xl font-light tracking-wide max-w-3xl mx-auto leading-relaxed"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {welcomeTexts[language]}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 2.2, duration: 0.8 }}
              className="mt-8 h-[1px] w-64 mx-auto"
              style={{ background: 'linear-gradient(90deg, transparent, #E8D48B, transparent)' }}
            />

            <div className="mt-6 flex justify-center gap-2 flex-wrap px-4">
              {greeting.split('').map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.5 + i * 0.04, duration: 0.3 }}
                  className="text-white/80 text-xs md:text-sm tracking-[0.3em] font-light"
                >
                  {char === ' ' ? '\u00A0\u00A0' : char}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {phase === 'reveal' && (
        <>
          <motion.div
            className="fixed top-0 left-0 right-0 z-[9999]"
            style={{ backgroundColor: '#9E0000', height: '50vh' }}
            initial={{ y: 0 }}
            animate={{ y: '-100%' }}
            transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="grain-overlay absolute inset-0" />
          </motion.div>
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-[9999]"
            style={{ backgroundColor: '#9E0000', height: '50vh' }}
            initial={{ y: 0 }}
            animate={{ y: '100%' }}
            transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="grain-overlay absolute inset-0" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

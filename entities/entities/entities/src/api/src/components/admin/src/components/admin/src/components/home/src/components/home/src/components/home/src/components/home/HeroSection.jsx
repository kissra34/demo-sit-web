import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function HeroSection({ isDark }) {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const handleMouseMove = (e) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateX = ((e.clientY - centerY) / rect.height) * -8;
    const rotateY = ((e.clientX - centerX) / rect.width) * 8;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ backgroundColor: isDark ? '#0A0A0A' : '#FDFDFD' }}
    >
      {/* Background text */}
      <motion.div
        style={{ y: textY, opacity }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <h2
          className="font-serif font-extralight text-center leading-none"
          style={{
            fontSize: 'clamp(3rem, 12vw, 14rem)',
            color: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
          }}
        >
          SOVEREIGNTY
          <br />
          IN MOTION
        </h2>
      </motion.div>

      {/* Car image with parallax and tilt */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-5xl mx-auto px-4"
      >
        <div
          ref={imageRef}
          className="relative"
          style={{
            perspective: '1000px',
          }}
        >
          <motion.img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b173566bbbdb5b7050232c/8b29b0cc0_generated_e9f9a461.png"
            alt="Luxury Range Rover - Dotcom Automotive flagship vehicle"
            className="w-full h-auto object-contain"
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: 'transform 0.15s ease-out',
            }}
          />
          {/* Floating shadow */}
          <div
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[70%] h-8 rounded-full blur-2xl"
            style={{
              background: isDark
                ? 'radial-gradient(ellipse, rgba(255,255,255,0.06), transparent)'
                : 'radial-gradient(ellipse, rgba(0,0,0,0.12), transparent)',
            }}
          />
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-center mt-12"
        >
          <p className="text-xs md:text-sm tracking-[0.4em] font-light mb-6"
            style={{ color: '#C5A059' }}>
            VENTE & LOCATION DE VÉHICULES DE LUXE — FÈS, MAROC
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => document.querySelector('#fleet-sale')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3.5 text-sm tracking-widest font-light text-white transition-all duration-500 hover:scale-105"
              style={{ backgroundColor: '#9E0000' }}
            >
              EXPLORER LA VENTE
            </button>
            <button
              onClick={() => document.querySelector('#fleet-rental')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3.5 text-sm tracking-widest font-light transition-all duration-500 hover:scale-105 border"
              style={{
                borderColor: '#C5A059',
                color: '#C5A059',
                backgroundColor: 'transparent'
              }}
            >
              EXPLORER LA LOCATION
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-10" style={{ backgroundColor: '#C5A059' }} />
        <span className="text-[10px] tracking-[0.3em] font-light" style={{ color: '#C5A059' }}>
          SCROLL
        </span>
      </motion.div>
    </section>
  );
}

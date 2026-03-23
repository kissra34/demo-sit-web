import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const showcaseImages = [
  'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b173566bbbdb5b7050232c/8b29b0cc0_generated_e9f9a461.png',
  'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b173566bbbdb5b7050232c/12250b58d_generated_2a0d0e87.png',
  'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b173566bbbdb5b7050232c/6df49c4f5_generated_ca5d2fcb.png'
];

export default function HeroSectionEnhanced({ isDark, language }) {
  const sectionRef = useRef(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [videoAngle, setVideoAngle] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Auto-rotate images + camera angle simulation
  useEffect(() => {
    const imageTimer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % showcaseImages.length);
    }, 8000);

    const angleTimer = setInterval(() => {
      setVideoAngle((prev) => (prev + 1) % 360);
    }, 50);

    return () => {
      clearInterval(imageTimer);
      clearInterval(angleTimer);
    };
  }, []);

  const heroTexts = {
    ar: {
      bg1: 'السيادة',
      bg2: 'في الحركة',
      tag: 'بيع وتأجير سيارات فاخرة — فاس، المغرب',
      btn1: 'استكشف للبيع',
      btn2: 'استكشف للإيجار',
      btn3: 'استكشف معرضنا',
      overlay: 'عروض حصرية في فاس'
    },
    fr: {
      bg1: 'SOUVERAINETÉ',
      bg2: 'EN MOUVEMENT',
      tag: 'VENTE & LOCATION DE VÉHICULES DE LUXE — FÈS, MAROC',
      btn1: 'EXPLORER LA VENTE',
      btn2: 'EXPLORER LA LOCATION',
      btn3: 'DÉCOUVRIR NOTRE SHOWROOM',
      overlay: 'OCCASIONS EXCLUSIVES À FÈS'
    },
    en: {
      bg1: 'SOVEREIGNTY',
      bg2: 'IN MOTION',
      tag: 'LUXURY VEHICLE SALES & RENTAL — FES, MOROCCO',
      btn1: 'EXPLORE SALES',
      btn2: 'EXPLORE RENTALS',
      btn3: 'DISCOVER OUR SHOWROOM',
      overlay: 'EXCLUSIVE DEALS IN FES'
    },
    es: {
      bg1: 'SOBERANÍA',
      bg2: 'EN MOVIMIENTO',
      tag: 'VENTA Y ALQUILER DE VEHÍCULOS DE LUJO — FES, MARRUECOS',
      btn1: 'EXPLORAR VENTAS',
      btn2: 'EXPLORAR ALQUILERES',
      btn3: 'DESCUBRIR NUESTRO SHOWROOM',
      overlay: 'OFERTAS EXCLUSIVAS EN FES'
    }
  };

  const text = heroTexts[language] || heroTexts.fr;

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: isDark ? '#1A1A1A' : '#FDFDFD' }}
    >
      {/* Gold animated lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[1px]"
            style={{
              background: 'linear-gradient(90deg, transparent, #C5A059, transparent)',
              width: '100%',
              top: `${10 + i * 12}%`,
            }}
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 6 + i * 0.8,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.5
            }}
          />
        ))}
      </div>

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
          {text.bg1}
          <br />
          {text.bg2}
        </h2>
      </motion.div>

      {/* Showcase images carousel with cinematic effect */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-6xl mx-auto px-4"
      >
        <div className="relative aspect-[16/9] md:aspect-[21/9]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImage}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <div className="relative w-full h-full">
                {/* Video simulation - rotating camera effect */}
                <motion.img
                  src={showcaseImages[currentImage]}
                  alt="Luxury vehicle showcase"
                  loading={currentImage === 0 ? 'eager' : 'lazy'}
                  fetchpriority={currentImage === 0 ? 'high' : 'auto'}
                  decoding="async"
                  width={1200}
                  height={514}
                  className="w-full h-full object-contain"
                  style={{
                    filter: `brightness(${0.95 + Math.sin(videoAngle * Math.PI / 180) * 0.05})`,
                  }}
                />

                {/* Overlay text on image */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="absolute top-8 left-8 md:top-12 md:left-12"
                >
                  <p className="text-white text-sm md:text-lg tracking-[0.3em] font-light px-4 py-2"
                    style={{
                      backgroundColor: 'rgba(158,0,0,0.85)',
                      backdropFilter: 'blur(10px)'
                    }}>
                    {text.overlay}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Floating shadow */}
          <div
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[70%] h-12 rounded-full blur-3xl"
            style={{
              background: isDark
                ? 'radial-gradient(ellipse, rgba(197,160,89,0.2), transparent)'
                : 'radial-gradient(ellipse, rgba(0,0,0,0.15), transparent)',
            }}
          />
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="text-center mt-16"
        >
          <p className="text-xs md:text-sm tracking-[0.4em] font-light mb-8"
            style={{ color: '#C5A059' }}>
            {text.tag}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => document.querySelector('#showroom')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-4 text-sm tracking-widest font-light text-white transition-all duration-500 hover:scale-105 hover:shadow-2xl"
              style={{ backgroundColor: '#C5A059' }}
            >
              {text.btn3}
            </button>
            <button
              onClick={() => document.querySelector('#fleet-sale')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-4 text-sm tracking-widest font-light text-white transition-all duration-500 hover:scale-105 hover:shadow-2xl"
              style={{ backgroundColor: '#9E0000' }}
            >
              {text.btn1}
            </button>
            <button
              onClick={() => document.querySelector('#fleet-rental')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-4 text-sm tracking-widest font-light transition-all duration-500 hover:scale-105 border-2"
              style={{
                borderColor: '#C5A059',
                color: '#C5A059',
                backgroundColor: 'transparent'
              }}
            >
              {text.btn2}
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <div className="w-[2px] h-12" style={{ backgroundColor: '#C5A059' }} />
        <span className="text-[10px] tracking-[0.4em] font-light" style={{ color: '#C5A059' }}>
          SCROLL
        </span>
      </motion.div>
    </section>
  );

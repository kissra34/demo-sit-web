import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function ReviewsSection({ reviews, isDark, language = 'fr' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [current, setCurrent] = useState(0);

  const texts = {
    ar: { subtitle: 'صوت عملائنا', title: 'شهادات', reviews: 'تقييمات' },
    fr: { subtitle: 'LA VOIX DE NOS CLIENTS', title: 'Témoignages', reviews: 'avis' },
    en: { subtitle: 'OUR CLIENTS\' VOICE', title: 'Testimonials', reviews: 'reviews' },
    es: { subtitle: 'LA VOZ DE NUESTROS CLIENTES', title: 'Testimonios', reviews: 'reseñas' }
  };

  const text = texts[language] || texts.fr;

  useEffect(() => {
    if (reviews.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  const prev = () => setCurrent((c) => (c - 1 + reviews.length) % reviews.length);
  const next = () => setCurrent((c) => (c + 1) % reviews.length);

  return (
    <section
      id="reviews"
      ref={ref}
      className="py-24 md:py-32 px-4 md:px-8"
      style={{ backgroundColor: isDark ? '#0A0A0A' : '#FDFDFD' }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.5em] font-light mb-4" style={{ color: '#C5A059' }}>
            {text.subtitle}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light"
            style={{ color: isDark ? '#F2F2F2' : '#0A0A0A' }}>
            {text.title}
          </h2>
          <div className="gold-divider w-24 mx-auto mt-6" />

          {/* Rating */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={18} fill="#C5A059" color="#C5A059" />
              ))}
            </div>
            <span className="text-sm font-light" style={{ color: isDark ? '#AAA' : '#666' }}>
              4.9 / 5 — {reviews.length} {text.reviews}
            </span>
          </div>
        </motion.div>

        {reviews.length > 0 && (
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center px-8 md:px-16"
              >
                <Quote size={32} style={{ color: 'rgba(197,160,89,0.3)' }} className="mx-auto mb-6" />
                <p className="font-serif text-lg md:text-2xl font-light leading-relaxed italic mb-8"
                  style={{ color: isDark ? '#CCCCCC' : '#333333' }}>
                  "{reviews[current]?.comment}"
                </p>
                <div className="flex items-center justify-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={14}
                      fill={star <= (reviews[current]?.rating || 5) ? '#C5A059' : 'transparent'}
                      color="#C5A059"
                    />
                  ))}
                </div>
                <p className="text-sm font-medium tracking-wider"
                  style={{ color: isDark ? '#F2F2F2' : '#0A0A0A' }}>
                  {reviews[current]?.client_name}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            {reviews.length > 1 && (
              <div className="flex justify-center gap-4 mt-10">
                <button
                  onClick={prev}
                  className="p-2 border transition-all duration-300 hover:scale-110"
                  style={{ borderColor: 'rgba(197,160,89,0.3)', color: '#C5A059' }}
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={next}
                  className="p-2 border transition-all duration-300 hover:scale-110"
                  style={{ borderColor: 'rgba(197,160,89,0.3)', color: '#C5A059' }}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

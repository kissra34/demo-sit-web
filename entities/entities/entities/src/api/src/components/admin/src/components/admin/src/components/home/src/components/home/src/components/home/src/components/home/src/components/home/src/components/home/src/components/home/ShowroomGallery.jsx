import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

const showroomImages = [
  'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b173566bbbdb5b7050232c/cf5b06ed8_Capturedcran2026-03-12182014.png',
  'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b173566bbbdb5b7050232c/4cd2f0c09_Capturedcran2026-03-13201938.png',
  'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b173566bbbdb5b7050232c/e7fd43daf_Capturedcran2026-03-13201951.png',
  'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b173566bbbdb5b7050232c/0890e4788_Capturedcran2026-03-13202012.png',
  'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b173566bbbdb5b7050232c/762d8fe02_generated_6211b9e8.png',
];

export default function ShowroomGallery({ isDark, language }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % showroomImages.length);
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + showroomImages.length) % showroomImages.length);

  const texts = {
    ar: { 
      whoWeAre: 'من نحن',
      whoWeAreSubtitle: 'تعرف على وكالتنا',
      whoWeAreDescription: 'دوت كوم أوتوموتيف هي وكالة رائدة في بيع وتأجير السيارات الفاخرة في مدينة فاس. نقدم لعملائنا مجموعة مختارة من أفضل السيارات بأعلى معايير الجودة والخدمة. مع أكثر من 10 سنوات من الخبرة، نحن نفخر بكوننا شريكك الموثوق في عالم السيارات الراقية.',
      title: 'معرضنا', 
      subtitle: 'زوروا وكالتنا في فاس', 
      location: 'موقعنا على الخريطة' 
    },
    fr: { 
      whoWeAre: 'Qui Sommes-Nous',
      whoWeAreSubtitle: 'Découvrez notre agence',
      whoWeAreDescription: 'Dotcom Automotive est une agence leader dans la vente et la location de véhicules de luxe à Fès. Nous offrons à nos clients une sélection des meilleures voitures avec les plus hauts standards de qualité et de service. Avec plus de 10 ans d\'expérience, nous sommes fiers d\'être votre partenaire de confiance dans le monde de l\'automobile haut de gamme.',
      title: 'Notre Showroom', 
      subtitle: 'Visitez notre agence à Fès', 
      location: 'Notre localisation' 
    },
    en: { 
      whoWeAre: 'Who We Are',
      whoWeAreSubtitle: 'Discover our agency',
      whoWeAreDescription: 'Dotcom Automotive is a leading agency in luxury vehicle sales and rentals in Fes. We offer our clients a curated selection of the finest cars with the highest standards of quality and service. With over 10 years of experience, we pride ourselves on being your trusted partner in the world of premium automobiles.',
      title: 'Our Showroom', 
      subtitle: 'Visit our agency in Fes', 
      location: 'Our location' 
    },
    es: { 
      whoWeAre: 'Quiénes Somos',
      whoWeAreSubtitle: 'Descubre nuestra agencia',
      whoWeAreDescription: 'Dotcom Automotive es una agencia líder en venta y alquiler de vehículos de lujo en Fez. Ofrecemos a nuestros clientes una selección de los mejores autos con los más altos estándares de calidad y servicio. Con más de 10 años de experiencia, nos enorgullece ser su socio de confianza en el mundo de los automóviles premium.',
      title: 'Nuestro Showroom', 
      subtitle: 'Visita nuestra agencia en Fez', 
      location: 'Nuestra ubicación' 
    }
  };

  const text = texts[language] || texts.fr;

  return (
    <>
      <section
        ref={sectionRef}
        id="showroom"
        className="py-20 md:py-28 px-4 md:px-8"
        style={{ backgroundColor: isDark ? '#1A1A1A' : '#F5F5F3' }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Who We Are Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <p className="text-xs tracking-[0.4em] font-light mb-3" style={{ color: '#C5A059' }}>
              {text.whoWeAreSubtitle.toUpperCase()}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-8" style={{ color: isDark ? '#F5F5F5' : '#0A0A0A' }}>
              {text.whoWeAre}
            </h2>
            <p className="max-w-3xl mx-auto text-base md:text-lg leading-relaxed font-light" 
              style={{ color: isDark ? '#B8B8B8' : '#555555' }}>
              {text.whoWeAreDescription}
            </p>
          </motion.div>

          {/* Showroom Gallery Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mb-16"
          >
            <p className="text-xs tracking-[0.4em] font-light mb-3" style={{ color: '#C5A059' }}>
              {text.subtitle.toUpperCase()}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold" style={{ color: isDark ? '#F5F5F5' : '#0A0A0A' }}>
              {text.title}
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {showroomImages.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -8 }}
                className="relative overflow-hidden cursor-pointer group aspect-[4/3] rounded-lg"
                onClick={() => openLightbox(idx)}
                style={{
                  boxShadow: isDark
                    ? '0 10px 40px -15px rgba(0,0,0,0.5)'
                    : '0 10px 40px -15px rgba(0,0,0,0.15)'
                }}
              >
                <img
                  src={img}
                  alt={`Showroom ${idx + 1}`}
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white text-sm tracking-wider">VOIR EN GRAND</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-12"
          >
            <a
              href="https://www.google.com/maps/search/?api=1&query=62+ain+chkef+Fes+Morocco"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 text-sm tracking-widest font-light text-white transition-all duration-500 hover:scale-105"
              style={{ backgroundColor: '#9E0000' }}
            >
              <MapPin size={18} />
              {text.location.toUpperCase()}
            </a>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors"
            >
              <X size={32} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-6 text-white hover:text-gray-300 transition-colors"
            >
              <ChevronLeft size={48} />
            </button>

            <motion.img
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={showroomImages[currentIndex]}
              alt={`Showroom ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-6 text-white hover:text-gray-300 transition-colors"
            >
              <ChevronRight size={48} />
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-sm">
              {currentIndex + 1} / {showroomImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

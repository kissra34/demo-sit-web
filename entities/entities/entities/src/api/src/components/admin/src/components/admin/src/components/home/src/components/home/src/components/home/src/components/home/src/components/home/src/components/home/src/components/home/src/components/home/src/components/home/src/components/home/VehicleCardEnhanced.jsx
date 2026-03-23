import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Fuel, Gauge, Settings2, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function VehicleCardEnhanced({ vehicle, isDark, index, language }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-100px' });
  const [hovered, setHovered] = useState(false);

  const labels = {
    ar: {
      available: 'متاح',
      reserve: 'احجز عبر واتساب',
      perDay: '/ يوم',
      fuel: { diesel: 'ديزل', gasoline: 'بنزين', hybrid: 'هجين', electric: 'كهربائي' },
      trans: { manual: 'يدوي', automatic: 'أوتوماتيكي' }
    },
    fr: {
      available: 'DISPONIBLE',
      reserve: 'RÉSERVER VIA WHATSAPP',
      perDay: '/ jour',
      fuel: { diesel: 'Diesel', gasoline: 'Essence', hybrid: 'Hybride', electric: 'Électrique' },
      trans: { manual: 'Manuelle', automatic: 'Automatique' }
    },
    en: {
      available: 'AVAILABLE',
      reserve: 'RESERVE VIA WHATSAPP',
      perDay: '/ day',
      fuel: { diesel: 'Diesel', gasoline: 'Gasoline', hybrid: 'Hybrid', electric: 'Electric' },
      trans: { manual: 'Manual', automatic: 'Automatic' }
    },
    es: {
      available: 'DISPONIBLE',
      reserve: 'RESERVAR VÍA WHATSAPP',
      perDay: '/ día',
      fuel: { diesel: 'Diésel', gasoline: 'Gasolina', hybrid: 'Híbrido', electric: 'Eléctrico' },
      trans: { manual: 'Manual', automatic: 'Automático' }
    }
  };

  const text = labels[language] || labels.fr;

  const whatsappMessages = {
    ar: `السلام عليكم ورحمة الله وبركاته! أنا مهتم بـ ${vehicle.brand} ${vehicle.name}. يرجى التواصل معي.`,
    fr: `Bonjour Dotcom Automotive! Je suis intéressé(e) par ${vehicle.brand} ${vehicle.name}. Merci de me contacter.`,
    en: `Hello Dotcom Automotive! I'm interested in ${vehicle.brand} ${vehicle.name}. Please contact me.`,
    es: `¡Hola Dotcom Automotive! Estoy interesado en ${vehicle.brand} ${vehicle.name}. Por favor contácteme.`
  };

  const whatsappMsg = encodeURIComponent(whatsappMessages[language] || whatsappMessages.fr);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative cursor-pointer"
    >
      <Link to={createPageUrl(`VehicleDetail?id=${vehicle.id}`)}>
        <motion.div
          className="overflow-hidden transition-all duration-700"
          animate={{
            scale: hovered ? 1.03 : 1,
            y: hovered ? -8 : 0
          }}
          style={{
            backgroundColor: isDark ? '#242424' : '#FFFFFF',
            boxShadow: hovered
              ? isDark ? '0 35px 90px -20px rgba(197,160,89,0.25)' : '0 35px 90px -20px rgba(0,0,0,0.15)'
              : isDark ? '0 10px 40px -15px rgba(0,0,0,0.4)' : '0 10px 40px -15px rgba(0,0,0,0.08)',
          }}
        >
          {/* Image */}
          <div className="relative overflow-hidden aspect-[16/10]">
            <motion.img
              src={vehicle.image_url || 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b173566bbbdb5b7050232c/12250b58d_generated_2a0d0e87.png'}
              alt={`${vehicle.brand} ${vehicle.name}`}
              loading="lazy"
              decoding="async"
              width={800}
              height={500}
              className="w-full h-full object-cover"
              animate={{ scale: hovered ? 1.08 : 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            />
            {vehicle.status === 'available' && (
              <div className="absolute top-4 right-4 px-4 py-1.5 text-[11px] tracking-widest text-white font-light"
                style={{ backgroundColor: 'rgba(158,0,0,0.92)', backdropFilter: 'blur(10px)' }}>
                {text.available}
              </div>
            )}
            <div
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                opacity: hovered ? 0.2 : 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)'
              }}
            />
          </div>

          <div className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-[11px] tracking-[0.35em] font-light mb-1.5" style={{ color: '#C5A059' }}>
                  {vehicle.brand?.toUpperCase()}
                </p>
                <h3 className="font-serif text-xl md:text-2xl font-medium" style={{ color: isDark ? '#F5F5F5' : '#0A0A0A' }}>
                  {vehicle.name}
                </h3>
              </div>
              <div className="text-right">
                {vehicle.category === 'sale' ? (
                  <p className="font-serif text-xl md:text-2xl font-semibold" style={{ color: '#9E0000' }}>
                    {vehicle.price?.toLocaleString()} MAD
                  </p>
                ) : (
                  <div>
                    <p className="font-serif text-xl md:text-2xl font-semibold" style={{ color: '#9E0000' }}>
                      {vehicle.daily_rate?.toLocaleString()} MAD
                    </p>
                    <p className="text-[10px] tracking-wider font-light" style={{ color: isDark ? '#888' : '#999' }}>
                      {text.perDay}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4 mb-5 flex-wrap">
              {vehicle.year && (
                <div className="flex items-center gap-2">
                  <Calendar size={14} style={{ color: '#C5A059' }} />
                  <span className="text-xs font-light" style={{ color: isDark ? '#B8B8B8' : '#666' }}>
                    {vehicle.year}
                  </span>
                </div>
              )}
              {vehicle.fuel_type && (
                <div className="flex items-center gap-2">
                  <Fuel size={14} style={{ color: '#C5A059' }} />
                  <span className="text-xs font-light" style={{ color: isDark ? '#B8B8B8' : '#666' }}>
                    {text.fuel[vehicle.fuel_type]}
                  </span>
                </div>
              )}
              {vehicle.transmission && (
                <div className="flex items-center gap-2">
                  <Settings2 size={14} style={{ color: '#C5A059' }} />
                  <span className="text-xs font-light" style={{ color: isDark ? '#B8B8B8' : '#666' }}>
                    {text.trans[vehicle.transmission]}
                  </span>
                </div>
              )}
              {vehicle.mileage != null && (
                <div className="flex items-center gap-2">
                  <Gauge size={14} style={{ color: '#C5A059' }} />
                  <span className="text-xs font-light" style={{ color: isDark ? '#B8B8B8' : '#666' }}>
                    {vehicle.mileage?.toLocaleString()} km
                  </span>
                </div>
              )}
            </div>

            <div className="gold-divider mb-5" />

            <a
              href={`https://wa.me/212600000000?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="block w-full text-center py-3.5 text-xs tracking-[0.25em] font-light text-white transition-all duration-500 hover:opacity-90 hover:scale-105"
              style={{ backgroundColor: '#9E0000' }}
            >
              {text.reserve}
            </a>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import VehicleCardEnhanced from './VehicleCardEnhanced';

export default function FleetSection({ id, title, subtitle, vehicles, isDark, language = 'fr' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section
      id={id}
      ref={ref}
      className="py-24 md:py-32 px-4 md:px-8"
      style={{ backgroundColor: isDark ? '#0A0A0A' : '#FDFDFD' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.5em] font-light mb-4" style={{ color: '#C5A059' }}>
            {subtitle}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light"
            style={{ color: isDark ? '#F2F2F2' : '#0A0A0A' }}>
            {title}
          </h2>
          <div className="gold-divider w-24 mx-auto mt-6" />
        </motion.div>

        {/* Vehicle grid */}
        {vehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.map((vehicle, idx) => (
              <VehicleCardEnhanced
                key={vehicle.id}
                vehicle={vehicle}
                isDark={isDark}
                index={idx}
                language={language}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-center py-20"
          >
            <p className="text-lg font-light tracking-wider"
              style={{ color: isDark ? '#555' : '#999' }}>
              {language === 'ar' ? 'قريباً' : language === 'en' ? 'Coming soon' : language === 'es' ? 'Próximamente' : 'Bientôt disponible'}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

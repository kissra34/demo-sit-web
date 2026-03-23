import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Fuel, Gauge, Settings2, Calendar } from 'lucide-react';

export default function VehicleCard({ vehicle, isDark, index }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-100px' });
  const [hovered, setHovered] = useState(false);

  const fuelLabels = { diesel: 'Diesel', gasoline: 'Essence', hybrid: 'Hybride', electric: 'Électrique' };
  const transLabels = { manual: 'Manuelle', automatic: 'Automatique' };

  const whatsappMsg = encodeURIComponent(
    `Bonjour Dotcom Automotive! Je suis intéressé(e) par ${vehicle.brand} ${vehicle.name}. Merci de me contacter.`
  );

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative"
    >
      <div
        className="overflow-hidden transition-all duration-700"
        style={{
          backgroundColor: isDark ? '#141414' : '#FFFFFF',
          boxShadow: hovered
            ? isDark ? '0 30px 80px -20px rgba(197,160,89,0.15)' : '0 30px 80px -20px rgba(0,0,0,0.12)'
            : isDark ? '0 10px 40px -15px rgba(0,0,0,0.3)' : '0 10px 40px -15px rgba(0,0,0,0.06)',
        }}
      >
        {/* Image */}
        <div className="relative overflow-hidden aspect-[16/10]">
          <motion.img
            src={vehicle.image_url || 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b173566bbbdb5b7050232c/12250b58d_generated_2a0d0e87.png'}
            alt={`${vehicle.brand} ${vehicle.name}`}
            className="w-full h-full object-cover"
            animate={{ scale: hovered ? 1.05 : 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />
          {/* Status badge */}
          {vehicle.status === 'available' && (
            <div className="absolute top-4 right-4 px-3 py-1 text-[10px] tracking-widest text-white font-light"
              style={{ backgroundColor: 'rgba(158,0,0,0.9)' }}>
              DISPONIBLE
            </div>
          )}
          {/* Dark overlay on hover */}
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              opacity: hovered ? 0.15 : 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)'
            }}
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-[10px] tracking-[0.3em] font-light mb-1"
                style={{ color: '#C5A059' }}>
                {vehicle.brand?.toUpperCase()}
              </p>
              <h3 className="font-serif text-xl font-medium"
                style={{ color: isDark ? '#F2F2F2' : '#0A0A0A' }}>
                {vehicle.name}
              </h3>
            </div>
            <div className="text-right">
              {vehicle.category === 'sale' ? (
                <p className="font-serif text-xl font-semibold" style={{ color: '#9E0000' }}>
                  {vehicle.price?.toLocaleString()} MAD
                </p>
              ) : (
                <div>
                  <p className="font-serif text-xl font-semibold" style={{ color: '#9E0000' }}>
                    {vehicle.daily_rate?.toLocaleString()} MAD
                  </p>
                  <p className="text-[10px] tracking-wider font-light"
                    style={{ color: isDark ? '#777' : '#999' }}>/ jour</p>
                </div>
              )}
            </div>
          </div>

          {/* Specs */}
          <div className="flex items-center gap-4 mb-5 flex-wrap">
            {vehicle.year && (
              <div className="flex items-center gap-1.5">
                <Calendar size={13} style={{ color: '#C5A059' }} />
                <span className="text-xs font-light" style={{ color: isDark ? '#AAA' : '#666' }}>
                  {vehicle.year}
                </span>
              </div>
            )}
            {vehicle.fuel_type && (
              <div className="flex items-center gap-1.5">
                <Fuel size={13} style={{ color: '#C5A059' }} />
                <span className="text-xs font-light" style={{ color: isDark ? '#AAA' : '#666' }}>
                  {fuelLabels[vehicle.fuel_type]}
                </span>
              </div>
            )}
            {vehicle.transmission && (
              <div className="flex items-center gap-1.5">
                <Settings2 size={13} style={{ color: '#C5A059' }} />
                <span className="text-xs font-light" style={{ color: isDark ? '#AAA' : '#666' }}>
                  {transLabels[vehicle.transmission]}
                </span>
              </div>
            )}
            {vehicle.mileage != null && (
              <div className="flex items-center gap-1.5">
                <Gauge size={13} style={{ color: '#C5A059' }} />
                <span className="text-xs font-light" style={{ color: isDark ? '#AAA' : '#666' }}>
                  {vehicle.mileage?.toLocaleString()} km
                </span>
              </div>
            )}
          </div>

          {/* Gold divider */}
          <div className="gold-divider mb-5" />

          {/* CTA */}
          <a
            href={`https://wa.me/212600000000?text=${whatsappMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center py-3 text-xs tracking-[0.2em] font-light text-white transition-all duration-500 hover:opacity-90"
            style={{ backgroundColor: '#9E0000' }}
          >
            RÉSERVER VIA WHATSAPP
          </a>
        </div>
      </div>
    </motion.div>
  );
}

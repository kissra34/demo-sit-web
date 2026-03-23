import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react';

export default function FooterSection({ isDark, language = 'fr' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [ripple, setRipple] = useState(false);

  const texts = {
    ar: {
      description: 'شريكك الموثوق لبيع وتأجير سيارات الفاخرة في فاس، المغرب. التميز في السيارات منذ أكثر من 10 سنوات.',
      contact: 'اتصل',
      location: 'الموقع',
      hours: 'الإثنين - السبت: 9:00 - 19:00',
      rights: 'جميع الحقوق محفوظة'
    },
    fr: {
      description: 'Votre partenaire de confiance pour la vente et la location de véhicules de luxe à Fès, Maroc. L\'excellence automobile depuis plus de 10 ans.',
      contact: 'CONTACT',
      location: 'LOCALISATION',
      hours: 'Lun - Sam: 9h00 - 19h00',
      rights: 'Tous droits réservés'
    },
    en: {
      description: 'Your trusted partner for luxury vehicle sales and rental in Fes, Morocco. Automotive excellence for over 10 years.',
      contact: 'CONTACT',
      location: 'LOCATION',
      hours: 'Mon - Sat: 9:00 AM - 7:00 PM',
      rights: 'All rights reserved'
    },
    es: {
      description: 'Su socio de confianza para la venta y alquiler de vehículos de lujo en Fez, Marruecos. Excelencia automotriz durante más de 10 años.',
      contact: 'CONTACTO',
      location: 'UBICACIÓN',
      hours: 'Lun - Sáb: 9:00 - 19:00',
      rights: 'Todos los derechos reservados'
    }
  };

  const text = texts[language] || texts.fr;

  const handleAddressClick = () => {
    setRipple(true);
    setTimeout(() => setRipple(false), 600);
    window.open('https://www.google.com/maps/search/?api=1&query=62+ain+chkef+Fes+Morocco', '_blank');
  };

  return (
    <footer
      id="contact"
      ref={ref}
      className="py-20 md:py-28 px-4 md:px-8"
      style={{ backgroundColor: isDark ? '#050505' : '#0A0A0A' }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16"
        >
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl font-bold text-white tracking-wider mb-2">
              DOTCOM
            </h3>
            <p className="text-[10px] tracking-[0.4em] font-light mb-6" style={{ color: '#C5A059' }}>
              AUTOMOTIVE
            </p>
            <p className="text-sm font-light leading-relaxed text-gray-400">
              {text.description}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs tracking-[0.3em] font-light mb-6" style={{ color: '#C5A059' }}>
              {text.contact}
            </h4>
            <div className="space-y-4">
              <button
                onClick={handleAddressClick}
                className="relative flex items-start gap-3 text-left group overflow-hidden"
              >
                <MapPin size={16} className="text-gray-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm font-light text-gray-400 group-hover:text-white transition-colors duration-300">
                  62 Ain Chkef, Fès, Maroc
                </span>
                {ripple && (
                  <span className="absolute inset-0 rounded-full animate-ping opacity-30"
                    style={{ backgroundColor: '#9E0000' }} />
                )}
              </button>

              <a href="tel:+212600000000" className="flex items-center gap-3 group">
                <Phone size={16} className="text-gray-500 flex-shrink-0" />
                <span className="text-sm font-light text-gray-400 group-hover:text-white transition-colors duration-300">
                  +212 6 00 00 00 00
                </span>
              </a>

              <div className="flex items-center gap-3">
                <Clock size={16} className="text-gray-500 flex-shrink-0" />
                <span className="text-sm font-light text-gray-400">
                  {text.hours}
                </span>
              </div>
            </div>
          </div>

          {/* Map */}
          <div>
            <h4 className="text-xs tracking-[0.3em] font-light mb-6" style={{ color: '#C5A059' }}>
              {text.location}
            </h4>
            <div className="overflow-hidden h-48"
              style={{ filter: isDark ? 'invert(1) hue-rotate(180deg) brightness(0.9) contrast(0.9)' : 'grayscale(1) contrast(1.1)' }}>
              <iframe
                title="Dotcom Automotive Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3306.8!2d-4.98!3d34.02!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDAxJzEyLjAiTiA0wrA1OCc0OC4wIlc!5e0!3m2!1sfr!2sma!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </motion.div>

        {/* Bottom */}
        <div className="gold-divider mt-16 mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-light text-gray-600">
            © {new Date().getFullYear()} Dotcom Automotive. {text.rights}.
          </p>

          {/* WhatsApp floating */}
          <a
            href="https://wa.me/212600000000"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
            style={{ backgroundColor: '#25D366' }}
          >
            <MessageCircle size={24} className="text-white" />
          </a>
        </div>
      </div>
    </footer>
  );
}

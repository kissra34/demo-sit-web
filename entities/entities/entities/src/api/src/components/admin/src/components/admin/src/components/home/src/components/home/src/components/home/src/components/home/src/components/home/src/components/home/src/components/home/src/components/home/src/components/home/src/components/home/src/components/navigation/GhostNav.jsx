import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X, Phone } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import SearchBar from './SearchBar';

const navItems = {
  ar: [
    { label: 'الرئيسية', href: '#hero' },
    { label: 'للبيع', href: '#fleet-sale' },
    { label: 'للإيجار', href: '#fleet-rental' },
    { label: 'من نحن', href: '#team' },
    { label: 'آراء العملاء', href: '#reviews' },
    { label: 'اتصل بنا', href: '#contact' },
  ],
  fr: [
    { label: 'Accueil', href: '#hero' },
    { label: 'Vente', href: '#fleet-sale' },
    { label: 'Location', href: '#fleet-rental' },
    { label: 'À Propos', href: '#team' },
    { label: 'Avis', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ],
  en: [
    { label: 'Home', href: '#hero' },
    { label: 'Sale', href: '#fleet-sale' },
    { label: 'Rental', href: '#fleet-rental' },
    { label: 'About', href: '#team' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ],
  es: [
    { label: 'Inicio', href: '#hero' },
    { label: 'Venta', href: '#fleet-sale' },
    { label: 'Alquiler', href: '#fleet-rental' },
    { label: 'Nosotros', href: '#team' },
    { label: 'Reseñas', href: '#reviews' },
    { label: 'Contacto', href: '#contact' },
  ]
};

export default function GhostNav({ isDark, toggleTheme, language, onLanguageChange, onSearch }) {
  const [scrolled, setScrolled] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const items = navItems[language] || navItems.fr;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Gold line - always visible */}
      <div className="fixed top-0 left-0 right-0 z-[100] h-[1px]" 
        style={{ background: 'linear-gradient(90deg, transparent, #C5A059, transparent)' }} />

      {/* Nav bar */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: scrolled ? 0 : -80 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-[99]"
        style={{
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          backgroundColor: isDark ? 'rgba(10,10,10,0.85)' : 'rgba(253,253,253,0.85)',
          borderBottom: '1px solid rgba(197,160,89,0.2)'
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="font-serif text-xl font-bold tracking-wider"
              style={{ color: isDark ? '#F2F2F2' : '#0A0A0A' }}>
              DOTCOM
            </span>
            <span className="text-[10px] tracking-[0.3em] font-light"
              style={{ color: '#C5A059' }}>
              AUTOMOTIVE
            </span>
          </div>

          {/* Phone */}
          <a href="tel:+212600000000" 
            className="hidden lg:flex items-center gap-2 text-sm font-light tracking-wider transition-all duration-300 hover:scale-105"
            style={{ color: '#C5A059' }}>
            <Phone size={14} />
            <span>+212 6 00 00 00 00</span>
          </a>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-6 xl:gap-8">
            {items.map((item, idx) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="relative py-1 text-sm font-light tracking-wider transition-colors duration-300"
                style={{ color: isDark ? '#AAAAAA' : '#555555' }}
              >
                {item.label}
                {/* Red needle underline */}
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] rounded-full"
                  style={{ backgroundColor: '#9E0000' }}
                  initial={{ width: 0 }}
                  animate={{ width: hoveredIdx === idx ? '100%' : 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </button>
            ))}

            {/* Search, Language & Theme */}
            <SearchBar isDark={isDark} onSearch={onSearch} language={language} />
            <LanguageSwitcher currentLang={language} onLanguageChange={onLanguageChange} isDark={isDark} />
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full transition-all duration-300 hover:scale-110"
              style={{ color: '#C5A059' }}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageSwitcher currentLang={language} onLanguageChange={onLanguageChange} isDark={isDark} />
            <button onClick={toggleTheme} style={{ color: '#C5A059' }} className="p-2">
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)}
              style={{ color: isDark ? '#F2F2F2' : '#0A0A0A' }} className="p-2">
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[98] pt-20 px-6 md:hidden"
            style={{
              backgroundColor: isDark ? 'rgba(10,10,10,0.98)' : 'rgba(253,253,253,0.98)',
              backdropFilter: 'blur(20px)'
            }}
          >
            <div className="flex flex-col gap-6 pt-8">
              {items.map((item, idx) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  onClick={() => handleNavClick(item.href)}
                  className="text-left text-2xl font-serif font-light tracking-wider"
                  style={{ color: isDark ? '#F2F2F2' : '#0A0A0A' }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

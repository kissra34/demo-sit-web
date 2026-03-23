import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check } from 'lucide-react';

const languages = [
  { code: 'ar', name: 'العربية', flag: '🇲🇦' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' }
];

export default function LanguageSwitcher({ currentLang, onLanguageChange, isDark }) {
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(l => l.code === currentLang) || languages[1];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105"
        style={{
          backgroundColor: isDark ? 'rgba(197,160,89,0.1)' : 'rgba(197,160,89,0.05)',
          color: '#C5A059',
          border: '1px solid rgba(197,160,89,0.2)'
        }}
      >
        <Globe size={16} />
        <span className="text-sm font-light">{currentLanguage.flag} {currentLanguage.code.toUpperCase()}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full right-0 mt-2 w-48 rounded-lg shadow-2xl overflow-hidden z-50"
              style={{
                backgroundColor: isDark ? '#141414' : '#FFFFFF',
                border: '1px solid rgba(197,160,89,0.2)'
              }}
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    onLanguageChange(lang.code);
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-3 flex items-center justify-between transition-colors duration-200"
                  style={{
                    backgroundColor: currentLang === lang.code
                      ? 'rgba(197,160,89,0.1)'
                      : 'transparent',
                    color: isDark ? '#F2F2F2' : '#0A0A0A',
                    borderBottom: '1px solid rgba(197,160,89,0.1)'
                  }}
                  onMouseEnter={(e) => {
                    if (currentLang !== lang.code) {
                      e.currentTarget.style.backgroundColor = 'rgba(197,160,89,0.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentLang !== lang.code) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{lang.flag}</span>
                    <span className="text-sm font-light">{lang.name}</span>
                  </div>
                  {currentLang === lang.code && (
                    <Check size={16} style={{ color: '#C5A059' }} />
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

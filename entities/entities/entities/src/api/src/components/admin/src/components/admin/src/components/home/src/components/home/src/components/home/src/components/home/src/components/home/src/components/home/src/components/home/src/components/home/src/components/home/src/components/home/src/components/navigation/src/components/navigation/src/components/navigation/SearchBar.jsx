import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, SlidersHorizontal } from 'lucide-react';

export default function SearchBar({ isDark, onSearch, language }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    brand: '',
    minPrice: '',
    maxPrice: '',
    category: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = () => {
    onSearch({ searchTerm, filters });
    setIsOpen(false);
  };

  const texts = {
    ar: {
      search: 'بحث',
      brand: 'الماركة',
      minPrice: 'السعر الأدنى',
      maxPrice: 'السعر الأقصى',
      category: 'الفئة',
      all: 'الكل',
      sale: 'للبيع',
      rental: 'للإيجار',
      apply: 'بحث'
    },
    fr: {
      search: 'Recherche',
      brand: 'Marque',
      minPrice: 'Prix min',
      maxPrice: 'Prix max',
      category: 'Catégorie',
      all: 'Tous',
      sale: 'Vente',
      rental: 'Location',
      apply: 'Rechercher'
    },
    en: {
      search: 'Search',
      brand: 'Brand',
      minPrice: 'Min price',
      maxPrice: 'Max price',
      category: 'Category',
      all: 'All',
      sale: 'Sale',
      rental: 'Rental',
      apply: 'Search'
    },
    es: {
      search: 'Buscar',
      brand: 'Marca',
      minPrice: 'Precio mín',
      maxPrice: 'Precio máx',
      category: 'Categoría',
      all: 'Todos',
      sale: 'Venta',
      rental: 'Alquiler',
      apply: 'Buscar'
    }
  };

  const text = texts[language] || texts.fr;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105"
        style={{
          backgroundColor: isDark ? 'rgba(197,160,89,0.1)' : 'rgba(197,160,89,0.05)',
          color: '#C5A059',
          border: '1px solid rgba(197,160,89,0.2)'
        }}
      >
        <Search size={16} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-[9998]"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 w-[95%] max-w-2xl z-[9999] rounded-2xl shadow-2xl overflow-hidden"
              style={{
                backgroundColor: isDark ? '#242424' : '#FFFFFF',
                border: '1px solid rgba(197,160,89,0.2)'
              }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-serif font-semibold" style={{ color: isDark ? '#F5F5F5' : '#0A0A0A' }}>
                    {text.search}
                  </h3>
                  <button onClick={() => setIsOpen(false)} style={{ color: '#C5A059' }}>
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="BMW, Mercedes, Range Rover..."
                      className="flex-1 px-4 py-3 rounded-lg border transition-colors"
                      style={{
                        backgroundColor: isDark ? '#1A1A1A' : '#F5F5F5',
                        borderColor: isDark ? '#333' : '#E0E0E0',
                        color: isDark ? '#F5F5F5' : '#0A0A0A'
                      }}
                    />
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="px-4 py-3 rounded-lg border transition-colors"
                      style={{
                        backgroundColor: showFilters ? '#9E0000' : 'transparent',
                        borderColor: '#9E0000',
                        color: showFilters ? '#FFF' : '#9E0000'
                      }}
                    >
                      <SlidersHorizontal size={20} />
                    </button>
                  </div>

                  {showFilters && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t"
                      style={{ borderColor: isDark ? '#333' : '#E0E0E0' }}
                    >
                      <input
                        type="text"
                        value={filters.brand}
                        onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                        placeholder={text.brand}
                        className="px-4 py-3 rounded-lg border"
                        style={{
                          backgroundColor: isDark ? '#1A1A1A' : '#F5F5F5',
                          borderColor: isDark ? '#333' : '#E0E0E0',
                          color: isDark ? '#F5F5F5' : '#0A0A0A'
                        }}
                      />
                      <select
                        value={filters.category}
                        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                        className="px-4 py-3 rounded-lg border"
                        style={{
                          backgroundColor: isDark ? '#1A1A1A' : '#F5F5F5',
                          borderColor: isDark ? '#333' : '#E0E0E0',
                          color: isDark ? '#F5F5F5' : '#0A0A0A'
                        }}
                      >
                        <option value="all">{text.all}</option>
                        <option value="sale">{text.sale}</option>
                        <option value="rental">{text.rental}</option>
                      </select>
                      <input
                        type="number"
                        value={filters.minPrice}
                        onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                        placeholder={text.minPrice}
                        className="px-4 py-3 rounded-lg border"
                        style={{
                          backgroundColor: isDark ? '#1A1A1A' : '#F5F5F5',
                          borderColor: isDark ? '#333' : '#E0E0E0',
                          color: isDark ? '#F5F5F5' : '#0A0A0A'
                        }}
                      />
                      <input
                        type="number"
                        value={filters.maxPrice}
                        onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                        placeholder={text.maxPrice}
                        className="px-4 py-3 rounded-lg border"
                        style={{
                          backgroundColor: isDark ? '#1A1A1A' : '#F5F5F5',
                          borderColor: isDark ? '#333' : '#E0E0E0',
                          color: isDark ? '#F5F5F5' : '#0A0A0A'
                        }}
                      />
                    </motion.div>
                  )}

                  <button
                    onClick={handleSearch}
                    className="w-full py-4 rounded-lg text-white font-medium tracking-wider transition-all duration-300 hover:opacity-90"
                    style={{ backgroundColor: '#9E0000' }}
                  >
                    {text.apply}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

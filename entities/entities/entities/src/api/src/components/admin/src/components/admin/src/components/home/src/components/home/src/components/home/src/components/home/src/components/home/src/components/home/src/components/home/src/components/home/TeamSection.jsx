import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const teamMembers = [
{
  name: 'Ahmed Benali',
  role: 'Directeur Général',
  image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b173566bbbdb5b7050232c/46de3a2fe_generated_c57af146.png'
},
{
  name: 'Youssef El Amrani',
  role: 'Responsable Commercial',
  image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b173566bbbdb5b7050232c/1af538cfa_generated_cddb6287.png'
},
{
  name: 'Khalid Mansouri',
  role: 'Conseiller Client',
  image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b173566bbbdb5b7050232c/7a591ecd3_generated_6d77fdc3.png'
}];


export default function TeamSection({ isDark, language = 'fr' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const texts = {
    ar: {
      subtitle: 'التميز البشري',
      title: 'فريقنا',
      members: [
      { name: 'أحمد بنعلي', role: 'المدير العام' },
      { name: 'يوسف العمراني', role: 'مسؤول المبيعات' },
      { name: 'خالد المنصوري', role: 'مستشار العملاء' }]

    },
    fr: {
      subtitle: 'L\'EXCELLENCE HUMAINE',
      title: 'Notre Équipe',
      members: [
      { name: 'Ahmed Benali', role: 'Directeur Général' },
      { name: 'Youssef El Amrani', role: 'Responsable Commercial' },
      { name: 'Khalid Mansouri', role: 'Conseiller Client' }]

    },
    en: {
      subtitle: 'HUMAN EXCELLENCE',
      title: 'Our Team',
      members: [
      { name: 'Ahmed Benali', role: 'General Manager' },
      { name: 'Youssef El Amrani', role: 'Sales Manager' },
      { name: 'Khalid Mansouri', role: 'Client Advisor' }]

    },
    es: {
      subtitle: 'EXCELENCIA HUMANA',
      title: 'Nuestro Equipo',
      members: [
      { name: 'Ahmed Benali', role: 'Director General' },
      { name: 'Youssef El Amrani', role: 'Responsable Comercial' },
      { name: 'Khalid Mansouri', role: 'Asesor de Clientes' }]

    }
  };

  const text = texts[language] || texts.fr;

  return (
    <section
      id="team"
      ref={ref}
      className="py-24 md:py-32 px-4 md:px-8"
      style={{ backgroundColor: isDark ? '#0D0D0D' : '#F5F5F3' }}>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16">

          <p className="text-xs tracking-[0.5em] font-light mb-4" style={{ color: '#C5A059' }}>
            {text.subtitle}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light"
          style={{ color: isDark ? '#F2F2F2' : '#0A0A0A' }}>
            {text.title}
          </h2>
          <div className="gold-divider w-24 mx-auto mt-6" />
        </motion.div>

        {/* Showroom exterior */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-16 overflow-hidden">

          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b173566bbbdb5b7050232c/762d8fe02_generated_6211b9e8.png"
            alt="Dotcom Automotive showroom exterior in Fes"
            loading="lazy"
            decoding="async"
            width={1400}
            height={600}
            className="w-full h-64 md:h-96 object-cover"
            style={{ filter: isDark ? 'brightness(0.85)' : 'none' }} />

        </motion.div>

        {/* Team grid */}
        



























        









































































      </div>
    </section>);

}

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calculator, AlertTriangle } from 'lucide-react';

export default function CalculatorSection({ isDark, language = 'fr' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const [price, setPrice] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [months, setMonths] = useState(24);
  const [rate, setRate] = useState(6.5);

  const texts = {
    ar: {
      subtitle: 'محاكي التمويل',
      title: 'الحاسبة',
      price: 'سعر السيارة (درهم)',
      downPayment: 'الدفعة الأولى (درهم)',
      duration: 'المدة (أشهر)',
      interest: 'معدل الفائدة (%)',
      monthly: 'الدفعة الشهرية المقدرة',
      months: 'شهر',
      disclaimer: 'هذا المحاكاة مقدمة لأغراض إرشادية فقط ولا تشكل بأي حال عرض قرض. قد تختلف الأقساط الفعلية حسب مؤسسة التمويل وملفك الشخصي وظروف السوق. تتنصل Dotcom Automotive من أي مسؤولية فيما يتعلق بنتائج هذا المحاكاة.'
    },
    fr: {
      subtitle: 'SIMULATEUR DE FINANCEMENT',
      title: 'Calculatrice',
      price: 'PRIX DU VÉHICULE (MAD)',
      downPayment: 'APPORT INITIAL (MAD)',
      duration: 'DURÉE (MOIS)',
      interest: 'TAUX D\'INTÉRÊT (%)',
      monthly: 'MENSUALITÉ ESTIMÉE',
      months: 'mois',
      disclaimer: 'Cette simulation est fournie à titre indicatif uniquement et ne constitue en aucun cas une offre de crédit. Les mensualités réelles peuvent varier selon l\'organisme de financement, votre profil et les conditions du marché. Dotcom Automotive décline toute responsabilité quant aux résultats de cette simulation.'
    },
    en: {
      subtitle: 'FINANCING SIMULATOR',
      title: 'Calculator',
      price: 'VEHICLE PRICE (MAD)',
      downPayment: 'DOWN PAYMENT (MAD)',
      duration: 'DURATION (MONTHS)',
      interest: 'INTEREST RATE (%)',
      monthly: 'ESTIMATED MONTHLY PAYMENT',
      months: 'months',
      disclaimer: 'This simulation is provided for informational purposes only and does not constitute a credit offer. Actual monthly payments may vary depending on the financing institution, your profile and market conditions. Dotcom Automotive disclaims any liability regarding the results of this simulation.'
    },
    es: {
      subtitle: 'SIMULADOR DE FINANCIACIÓN',
      title: 'Calculadora',
      price: 'PRECIO DEL VEHÍCULO (MAD)',
      downPayment: 'PAGO INICIAL (MAD)',
      duration: 'DURACIÓN (MESES)',
      interest: 'TASA DE INTERÉS (%)',
      monthly: 'PAGO MENSUAL ESTIMADO',
      months: 'meses',
      disclaimer: 'Esta simulación se proporciona solo con fines informativos y no constituye una oferta de crédito. Los pagos mensuales reales pueden variar según la institución financiera, su perfil y las condiciones del mercado. Dotcom Automotive declina cualquier responsabilidad con respecto a los resultados de esta simulación.'
    }
  };

  const text = texts[language] || texts.fr;

  const monthlyPayment = () => {
    const p = parseFloat(price) - parseFloat(downPayment || 0);
    if (!p || p <= 0) return 0;
    const r = rate / 100 / 12;
    const n = months;
    if (r === 0) return p / n;
    return (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  };

  const payment = monthlyPayment();

  const inputStyle = {
    backgroundColor: isDark ? '#1A1A1A' : '#FFFFFF',
    color: isDark ? '#F2F2F2' : '#0A0A0A',
    borderColor: isDark ? '#333' : '#E0E0E0',
  };

  return (
    <section
      ref={ref}
      className="py-24 md:py-32 px-4 md:px-8"
      style={{ backgroundColor: isDark ? '#0D0D0D' : '#F5F5F3' }}
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-xs tracking-[0.5em] font-light mb-4" style={{ color: '#C5A059' }}>
            {text.subtitle}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light"
            style={{ color: isDark ? '#F2F2F2' : '#0A0A0A' }}>
            {text.title}
          </h2>
          <div className="gold-divider w-24 mx-auto mt-6" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="p-8 md:p-10"
          style={{
            backgroundColor: isDark ? '#141414' : '#FFFFFF',
            boxShadow: isDark ? '0 20px 60px -15px rgba(0,0,0,0.4)' : '0 20px 60px -15px rgba(0,0,0,0.06)',
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-xs tracking-wider font-light mb-2"
                style={{ color: isDark ? '#AAA' : '#666' }}>
                {text.price}
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="250,000"
                className="w-full px-4 py-3 border text-sm font-light focus:outline-none transition-colors duration-300"
                style={inputStyle}
              />
            </div>
            <div>
              <label className="block text-xs tracking-wider font-light mb-2"
                style={{ color: isDark ? '#AAA' : '#666' }}>
                {text.downPayment}
              </label>
              <input
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(e.target.value)}
                placeholder="50,000"
                className="w-full px-4 py-3 border text-sm font-light focus:outline-none transition-colors duration-300"
                style={inputStyle}
              />
            </div>
            <div>
              <label className="block text-xs tracking-wider font-light mb-2"
                style={{ color: isDark ? '#AAA' : '#666' }}>
                {text.duration}
              </label>
              <select
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="w-full px-4 py-3 border text-sm font-light focus:outline-none transition-colors duration-300"
                style={inputStyle}
              >
                {[12, 24, 36, 48, 60, 72, 84].map(m => (
                  <option key={m} value={m}>{m} {text.months}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs tracking-wider font-light mb-2"
                style={{ color: isDark ? '#AAA' : '#666' }}>
                {text.interest}
              </label>
              <input
                type="number"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(parseFloat(e.target.value))}
                className="w-full px-4 py-3 border text-sm font-light focus:outline-none transition-colors duration-300"
                style={inputStyle}
              />
            </div>
          </div>

          {/* Result */}
          <div className="gold-divider mb-8" />
          <div className="text-center mb-6">
            <p className="text-xs tracking-wider font-light mb-2"
              style={{ color: isDark ? '#AAA' : '#666' }}>
              {text.monthly}
            </p>
            <div className="flex items-center justify-center gap-3">
              <Calculator size={24} style={{ color: '#C5A059' }} />
              <p className="font-serif text-4xl font-semibold" style={{ color: '#9E0000' }}>
                {payment > 0 ? `${Math.round(payment).toLocaleString()} MAD` : '— MAD'}
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="flex items-start gap-2 p-4"
            style={{ backgroundColor: isDark ? '#1A1A1A' : '#FAFAF8' }}>
            <AlertTriangle size={14} style={{ color: '#C5A059', flexShrink: 0, marginTop: 2 }} />
            <p className="text-[10px] font-light leading-relaxed"
              style={{ color: isDark ? '#777' : '#999' }}>
              {text.disclaimer}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

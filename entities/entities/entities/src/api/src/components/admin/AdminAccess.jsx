import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Lock, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const ADMIN_CODE = '1234';

export default function AdminAccess() {
  const [showModal, setShowModal] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleNumberClick = (num) => {
    if (code.length < 4) {
      setCode(code + num);
    }
  };

  const handleClear = () => {
    setCode('');
    setError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code === ADMIN_CODE) {
      setShowModal(false);
      setCode('');
      setError(false);
      navigate(createPageUrl('Dashboard'));
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
        setCode('');
      }, 1500);
    }
  };

  return (
    <>
      {/* Gear Icon Button */}
      <motion.button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 left-6 z-40 p-4 bg-gray-800 hover:bg-gray-700 rounded-full shadow-2xl transition-all hover:scale-110"
        whileHover={{ rotate: 180 }}
        transition={{ duration: 0.5 }}
        title="لوحة التحكم"
      >
        <Settings size={24} className="text-yellow-600" />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-yellow-600/30 rounded-2xl p-8 max-w-md w-full shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <Lock size={28} className="text-yellow-600" />
                  <h2 className="text-2xl font-serif font-bold text-white">
                    الدخول الإداري
                  </h2>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3 text-center">
                    أدخل الكود السري
                  </label>
                  
                  {/* Code Display */}
                  <div className={`w-full px-6 py-5 bg-gray-800 border-2 rounded-xl text-center mb-6 transition-all ${
                    error ? 'border-red-500 shake' : 'border-gray-700'
                  }`}>
                    <div className="flex justify-center gap-3">
                      {[0, 1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="w-12 h-12 flex items-center justify-center bg-gray-700 rounded-lg border-2 border-gray-600"
                        >
                          <span className="text-2xl text-white">
                            {code[i] ? '•' : ''}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mb-4 text-center font-medium"
                    >
                      ❌ الكود غير صحيح
                    </motion.p>
                  )}

                  {/* Number Pad */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => handleNumberClick(num.toString())}
                        className="py-4 bg-gray-700 hover:bg-gray-600 text-white text-xl font-bold rounded-lg transition-all active:scale-95"
                      >
                        {num}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={handleClear}
                      className="py-4 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-lg transition-all active:scale-95"
                    >
                      مسح
                    </button>
                    <button
                      type="button"
                      onClick={() => handleNumberClick('0')}
                      className="py-4 bg-gray-700 hover:bg-gray-600 text-white text-xl font-bold rounded-lg transition-all active:scale-95"
                    >
                      0
                    </button>
                    <button
                      type="submit"
                      disabled={code.length !== 4}
                      className="py-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm font-bold rounded-lg transition-all active:scale-95"
                    >
                      ✓ دخول
                    </button>
                  </div>
                </div>
              </form>

              <p className="text-xs text-gray-500 text-center mt-6">
                لوحة التحكم مخصصة لصاحب الوكالة فقط
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </>
  );

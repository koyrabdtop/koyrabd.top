/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Moon, Sun, Phone, Mail, MapPin, User, ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { HotlineEntry } from '../../types';
import { motion, AnimatePresence } from 'motion/react';

interface ServicePageProps {
  title: string;
  onBack: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function ServicePage({ title, onBack, isDarkMode, toggleDarkMode }: ServicePageProps) {
  const [hotlineData, setHotlineData] = useState<HotlineEntry[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  
  const subtitles = ['কয়রা-পাইকগাছা কমিউনিটি এপস', 'www.koyrabd.top'];

  useEffect(() => {
    if (title === 'হটলাইন') {
      const savedData = localStorage.getItem('hotline_data');
      if (savedData) {
        setHotlineData(JSON.parse(savedData));
      }
    }
  }, [title]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSubtitleIndex((prev) => (prev + 1) % subtitles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const displayTitle = title === 'হটলাইন' ? 'জরুরী হটলাইন' : title;

  return (
    <div className={`min-h-screen transition-colors duration-300 flex flex-col ${isDarkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
      {/* Header */}
      <div className={`px-6 pt-4 pb-4 shadow-md border-b transition-colors duration-300 relative z-10 ${
        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-gradient-to-b from-[#00A3FF] to-[#0085FF] border-none rounded-b-[35px]'
      }`}>
        <div className="flex items-center justify-between">
          <div className="w-10"></div> {/* Spacer for symmetry */}
          
          <div className="text-center flex-1">
            <h1 className={`font-bengali font-bold text-[18px] leading-none ${isDarkMode ? 'text-white' : 'text-white'}`}>
              {displayTitle}
            </h1>
            <div className="h-3 mt-1 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={subtitleIndex}
                  initial={{ y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -8, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`font-bengali text-[9px] font-medium opacity-90 ${isDarkMode ? 'text-slate-400' : 'text-white/80'}`}
                >
                  {subtitles[subtitleIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <button 
            onClick={toggleDarkMode}
            className={`p-2 rounded-xl transition-colors ${
              isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-white/10 text-white'
            }`}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-32">
        <div className="p-6">
        {title === 'হটলাইন' ? (
          <div className="space-y-4">
            {hotlineData.length === 0 ? (
              <div className={`bg-white dark:bg-slate-800 rounded-[32px] p-12 shadow-xl border border-slate-100 dark:border-slate-700/50 text-center`}>
                <Phone size={48} className="mx-auto mb-4 text-slate-300 dark:text-slate-600" />
                <p className="text-slate-500 dark:text-slate-400 font-bengali">
                  বর্তমানে কোনো হটলাইন তথ্য নেই।
                </p>
              </div>
            ) : (
              hotlineData.map((entry) => (
                <div 
                  key={entry.id}
                  className={`rounded-3xl shadow-sm border overflow-hidden transition-all ${
                    isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
                  }`}
                >
                  <button 
                    onClick={() => toggleExpand(entry.id)}
                    className="w-full p-4 flex items-center justify-between text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 overflow-hidden flex items-center justify-center border border-slate-200 dark:border-slate-700">
                        {entry.image ? (
                          <img src={entry.image} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <User size={24} className="text-slate-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-blue-500 font-bengali uppercase tracking-wider">{entry.serviceType}</p>
                        <h3 className={`font-bold font-bengali text-base ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{entry.name}</h3>
                      </div>
                    </div>
                    {expandedId === entry.id ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
                  </button>

                  <AnimatePresence>
                    {expandedId === entry.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-slate-100 dark:border-slate-800"
                      >
                        <div className="p-5 space-y-4">
                          {entry.designation && (
                            <div className="flex items-start gap-3">
                              <div className="mt-1 text-blue-500"><User size={16} /></div>
                              <div>
                                <p className="text-[10px] text-slate-500 font-bold uppercase">পদবি</p>
                                <p className={`text-sm font-bengali ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{entry.designation}</p>
                              </div>
                            </div>
                          )}
                          
                          {entry.address && (
                            <div className="flex items-start gap-3">
                              <div className="mt-1 text-emerald-500"><MapPin size={16} /></div>
                              <div>
                                <p className="text-[10px] text-slate-500 font-bold uppercase">ঠিকানা</p>
                                <p className={`text-sm font-bengali ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{entry.address}</p>
                              </div>
                            </div>
                          )}

                          <div className="pt-2 space-y-3">
                            <div className={`flex flex-col p-4 rounded-[24px] border transition-all ${
                              isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-100 shadow-sm'
                            }`}>
                              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-2 px-1">মোবাইল নং</p>
                              <div className="flex items-center justify-between">
                                <p className={`text-lg font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                  {entry.mobile}
                                </p>
                                <div className="flex items-center gap-2">
                                  {/* Call Button */}
                                  <motion.a 
                                    whileTap={{ scale: 0.9 }}
                                    href={`tel:${entry.mobile}`}
                                    className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 active:bg-blue-600 transition-colors"
                                  >
                                    <Phone size={18} fill="currentColor" />
                                  </motion.a>
                                  
                                  {/* WhatsApp Button */}
                                  <motion.a 
                                    whileTap={{ scale: 0.9 }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      let cleaned = entry.mobile.replace(/\D/g, '');
                                      if (cleaned.startsWith('0')) {
                                        cleaned = '88' + cleaned;
                                      } else if (!cleaned.startsWith('88')) {
                                        cleaned = '88' + cleaned;
                                      }
                                      window.open(`https://wa.me/${cleaned}`, '_blank');
                                    }}
                                    className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-green-500/30 active:bg-[#128C7E] transition-colors cursor-pointer"
                                  >
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.63 1.438h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                    </svg>
                                  </motion.a>
                                </div>
                              </div>
                            </div>

                            {entry.email && (
                              <div className={`flex flex-col p-4 rounded-[24px] border transition-all ${
                                isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-100 shadow-sm'
                              }`}>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1 px-1">ইমেইল</p>
                                <div className="flex items-center justify-between">
                                  <p className={`text-sm font-medium truncate pr-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                                    {entry.email}
                                  </p>
                                  <motion.a 
                                    whileTap={{ scale: 0.9 }}
                                    href={`mailto:${entry.email}`}
                                    className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                  >
                                    <Mail size={18} />
                                  </motion.a>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-800 rounded-[32px] p-8 shadow-xl border border-slate-100 dark:border-slate-700/50 text-center">
            <h2 className="text-3xl font-bengali font-bold text-slate-800 dark:text-white mb-4">
              {title}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-bengali">
              এই সেকশনটির কাজ চলছে। শীঘ্রই এটি আপনার জন্য উন্মুক্ত করা হবে।
            </p>
          </div>
        )}
      </div>
    </div>

    {/* Floating Footer Navigation */}
      <div className="fixed bottom-3 left-0 right-0 px-8 z-50 pointer-events-none">
        <div className="max-w-[260px] mx-auto flex items-center justify-between pointer-events-auto">
          {/* Left: Plus Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 bg-[#2D5BFF] text-white rounded-full shadow-[0_6px_15px_rgba(45,91,255,0.3)] flex items-center justify-center"
          >
            <Plus size={24} strokeWidth={3} />
          </motion.button>

          {/* Middle: BACK Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="w-14 h-14 bg-[#2D5BFF] text-white rounded-full shadow-[0_8px_20px_rgba(45,91,255,0.4)] flex items-center justify-center font-bold tracking-tighter text-[12px]"
          >
            BACK
          </motion.button>

          {/* Right: Profile Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 bg-[#2D5BFF] text-white rounded-full shadow-[0_6px_15px_rgba(45,91,255,0.3)] flex items-center justify-center"
          >
            <User size={24} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

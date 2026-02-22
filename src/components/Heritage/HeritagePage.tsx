import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight,
  Plus,
  User,
  Moon,
  Sun
} from 'lucide-react';

interface HeritagePageProps {
  isDarkMode: boolean;
  onBack: () => void;
  toggleDarkMode: () => void;
}

export default function HeritagePage({ isDarkMode, onBack, toggleDarkMode }: HeritagePageProps) {
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const subtitles = ['কয়রা-পাইকগাছা কমিউনিটি এপস', 'www.koyrabd.top'];

  useEffect(() => {
    const interval = setInterval(() => {
      setSubtitleIndex((prev) => (prev + 1) % subtitles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const menuItems = [
    { id: 'history', label: 'ইতিহাস' },
    { id: 'places', label: 'দর্শনীয় স্থান' },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 flex flex-col ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      {/* Header */}
      <div className={`px-6 pt-4 pb-4 shadow-md border-b transition-colors duration-300 relative z-10 ${
        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-gradient-to-b from-[#00A3FF] to-[#0085FF] border-none rounded-b-[35px]'
      }`}>
        <div className="flex items-center justify-between">
          <div className="w-8"></div>
          
          <div className="text-center flex-1">
            <h1 className="font-bengali font-bold text-[18px] leading-none text-white">
              ঐতিহ্য
            </h1>
            <div className="h-3 mt-1 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={subtitleIndex}
                  initial={{ y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -8, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="font-bengali text-[9px] font-medium opacity-90 text-white/80"
                >
                  {subtitles[subtitleIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <button 
            onClick={toggleDarkMode}
            className={`p-1.5 rounded-lg transition-colors ${isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-white/10 text-white'}`}
          >
            {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
          </button>
        </div>
      </div>

      {/* Content - Compact/Thinner buttons */}
      <div className="flex-1 p-4 space-y-3 mt-4">
        {menuItems.map((item, index) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className={`w-full p-4 rounded-[24px] shadow-sm border flex items-center group transition-all active:scale-[0.98] ${
              isDarkMode 
                ? 'bg-slate-900 border-slate-800 hover:bg-slate-800' 
                : 'bg-white border-slate-100 hover:bg-slate-50 shadow-[0_4px_20px_rgb(0,0,0,0.03)]'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
              isDarkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-50 text-slate-400'
            }`}>
              <ArrowRight size={18} />
            </div>
            
            <span className={`flex-1 text-center font-bold font-bengali text-base ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
              {item.label}
            </span>

            <div className="w-10 flex justify-end">
              <ArrowRight size={16} className={`opacity-0 group-hover:opacity-100 transition-opacity ${isDarkMode ? 'text-slate-600' : 'text-slate-200'}`} />
            </div>
          </motion.button>
        ))}
      </div>

      {/* Floating Footer Navigation */}
      <div className="fixed bottom-3 left-0 right-0 px-8 z-50 pointer-events-none">
        <div className="max-w-[260px] mx-auto flex items-center justify-between pointer-events-auto">
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 bg-[#2D5BFF] text-white rounded-full shadow-[0_6px_15_rgba(45,91,255,0.3)] flex items-center justify-center"
          >
            <Plus size={24} strokeWidth={3} />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="w-14 h-14 bg-[#2D5BFF] text-white rounded-full shadow-[0_8px_20px_rgba(45,91,255,0.4)] flex items-center justify-center font-bold tracking-tighter text-[12px]"
          >
            BACK
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 bg-[#2D5BFF] text-white rounded-full shadow-[0_6px_15_rgba(45,91,255,0.3)] flex items-center justify-center"
          >
            <User size={24} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

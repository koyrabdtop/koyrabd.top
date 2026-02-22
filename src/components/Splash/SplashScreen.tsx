/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Moon, Sun, ArrowRight, MapPin } from 'lucide-react';
import { toBengaliDigits, getBengaliDay, getBengaliMonth } from '../../utils/bengaliUtils';

interface SplashScreenProps {
  onExplore: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function SplashScreen({ onExplore, isDarkMode, toggleDarkMode }: SplashScreenProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const formattedTime = `${toBengaliDigits(displayHours.toString().padStart(2, '0'))}:${toBengaliDigits(minutes.toString().padStart(2, '0'))}:${toBengaliDigits(seconds.toString().padStart(2, '0'))} ${ampm}`;
  const formattedDate = `${toBengaliDigits(time.getDate())} ${getBengaliMonth(time.getMonth())} ${toBengaliDigits(time.getFullYear())} ইং`;
  const dayName = getBengaliDay(time.getDay());

  return (
    <div className={`min-h-screen transition-colors duration-500 bg-mesh ${isDarkMode ? 'dark' : ''}`}>
      <div className="max-w-md mx-auto min-h-screen flex flex-col items-center justify-between p-4 relative overflow-hidden">
        
        {/* Top Header Section */}
        <div className="w-full flex justify-end pt-2">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleDarkMode}
            className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 shadow-lg backdrop-blur-sm border border-white/20 dark:border-slate-700/50 text-slate-800 dark:text-slate-100 z-10"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
        </div>

        {/* Logo Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center mt-2"
        >
          <div className="relative">
            <motion.div 
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-40 h-40 rounded-full bg-white dark:bg-slate-800 shadow-2xl flex items-center justify-center p-2 border-4 border-emerald-500/20"
            >
              <div className="w-full h-full rounded-full bg-emerald-600 flex flex-col items-center justify-center text-white overflow-hidden relative">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/leaf.png')]"></div>
                <div className="z-10 flex flex-col items-center">
                  <span className="text-5xl font-bold tracking-tighter">KP</span>
                  <div className="flex gap-1 mt-1">
                    <div className="w-1 h-4 bg-white/40 rounded-full"></div>
                    <div className="w-1 h-6 bg-white/60 rounded-full"></div>
                    <div className="w-1 h-4 bg-white/40 rounded-full"></div>
                  </div>
                  <div className="mt-2">
                    <svg width="40" height="12" viewBox="0 0 40 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 10C10 10 15 2 20 2C25 2 30 10 38 10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-0 w-full h-1/3 bg-emerald-700/50 flex items-center justify-center">
                  <span className="text-[8px] font-medium tracking-widest opacity-80">KOYRA-PAIKGACHA</span>
                </div>
              </div>
            </motion.div>
            <div className="absolute -bottom-2 -right-2 bg-white dark:bg-slate-800 p-2 rounded-full shadow-lg border border-emerald-100 dark:border-slate-700">
              <MapPin size={16} className="text-emerald-600" />
            </div>
          </div>
        </motion.div>

        {/* Date & Time Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="w-full mt-4"
        >
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-[32px] p-5 shadow-xl border border-white/40 dark:border-slate-700/30 flex items-center justify-between">
            <div className="flex-1 border-r border-slate-200 dark:border-slate-700 pr-4">
              <p className="text-slate-800 dark:text-slate-100 font-bengali text-lg font-medium">
                {formattedDate}
              </p>
            </div>
            <div className="flex-1 pl-4 text-right">
              <p className="text-slate-500 dark:text-slate-400 font-bengali text-sm font-semibold uppercase tracking-wider">
                {dayName}
              </p>
              <p className="text-slate-900 dark:text-white font-bengali text-xl font-bold mt-1">
                {formattedTime}
              </p>
            </div>
          </div>
        </motion.div>

        {/* App Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center mt-4 space-y-2"
        >
          <h1 className="text-4xl md:text-5xl font-bengali font-bold text-blue-700 dark:text-blue-400 tracking-tight">
            কয়রা-পাইকগাছা
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-bengali text-lg font-medium tracking-widest">
            কমিউনিটি অ্যাপস
          </p>
          <div className="h-1 w-12 bg-blue-600 mx-auto rounded-full opacity-30"></div>
          <p className="text-slate-600 dark:text-slate-300 font-bengali text-base max-w-[280px] mx-auto leading-relaxed">
            আপনার এলাকার সকল ডিজিটাল সেবা এখন এক ঠিকানায়
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="w-full mt-4"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onExplore}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bengali text-xl font-semibold py-4 rounded-[28px] shadow-2xl shadow-blue-500/30 flex items-center justify-center gap-3 transition-all duration-300 group"
          >
            সকল সেবা
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-6 text-center space-y-1"
        >
          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold tracking-[0.2em] uppercase">
            Development By
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-300 font-bold tracking-wider">
            INTELLIGENCE CREATION BD
          </p>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>
      </div>
    </div>
  );
}

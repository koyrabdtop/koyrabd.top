/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Menu, Moon, Sun, Search, Plus, User, Lock, X } from 'lucide-react';
import { services } from './serviceData';
import { ServiceCard } from './ServiceCard';

interface ServiceMenuProps {
  onBack: () => void;
  onServiceClick: (id: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onAdminAccess: () => void;
  isAdminLoggedIn: boolean;
}

export default function ServiceMenu({ 
  onBack, 
  onServiceClick, 
  isDarkMode, 
  toggleDarkMode,
  onAdminAccess,
  isAdminLoggedIn
}: ServiceMenuProps) {
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const noticeText = "ব্রেকিং নিউজ: কয়রা-পাইকগাছা কমিউনিটি অ্যাপে আপনাকে স্বাগতম! নতুন সব আপডেট পেতে আমাদের সাথেই থাকুন।";

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    const storedPassword = localStorage.getItem('adminPassword') || 'tayeb';
    if (password === storedPassword) {
      onAdminAccess();
      setShowAdminLogin(false);
      setPassword('');
      setError('');
    } else {
      setError('ভুল পাসওয়ার্ড!');
    }
  };

  const handleLockClick = () => {
    if (isAdminLoggedIn) {
      onAdminAccess();
    } else {
      setShowAdminLogin(true);
    }
  };

  return (
    <div className={`h-screen overflow-hidden flex flex-col transition-colors duration-300 ${isDarkMode ? 'bg-slate-950' : 'bg-white'}`}>
      {/* Header & Notice Bar Container */}
      <div className={`flex-none transition-colors duration-300 ${isDarkMode ? 'bg-slate-950' : 'bg-white'}`}>
        {/* Header */}
        <div className="bg-gradient-to-b from-[#00A3FF] to-[#0085FF] pt-4 pb-4 px-6 rounded-b-[35px] shadow-md relative z-10">
          <div className="flex items-center justify-between">
            <button className="p-1 text-white/90">
              <Menu size={24} strokeWidth={2} />
            </button>
            
            <div className="text-center">
              <h1 className="text-white font-bengali text-[18px] font-bold tracking-tight leading-none">
                কয়রা-পাইকগাছা
              </h1>
              <p className="text-white/80 font-bengali text-[9px] font-medium tracking-widest mt-1 opacity-90">
                কমিউনিটি অ্যাপস
              </p>
            </div>

            <div className="flex items-center gap-1">
              <button 
                onClick={toggleDarkMode}
                className="p-1 text-white/90 hover:bg-white/10 rounded-full transition-colors"
              >
                {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
              </button>
              <button 
                onClick={handleLockClick}
                className="p-1 text-white/90 hover:bg-white/10 rounded-full transition-colors"
              >
                <Lock size={20} className={isAdminLoggedIn ? "text-emerald-400" : ""} />
              </button>
            </div>
          </div>
        </div>

        {/* Notice Bar (Breaking News Style) */}
        <div className="px-6 mt-2.5 pb-1 relative z-20">
          <div className={`w-full h-9 rounded-2xl shadow-[0_4px_12px_rgba(0,133,255,0.05)] border flex items-center overflow-hidden transition-colors duration-300 ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-[#F0F8FF] border-blue-50'
          }`}>
            <div className="bg-[#FF3D00] text-white text-[10px] font-bold px-3 h-full flex items-center z-10 rounded-l-2xl whitespace-nowrap">
              নোটিশ
            </div>
            <div className="flex-1 overflow-hidden relative h-full flex items-center">
              <motion.div
                animate={{ x: [300, -800] }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className={`whitespace-nowrap font-bengali text-[12px] font-medium transition-colors duration-300 ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                {noticeText}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Content - Compact & Non-scrollable */}
      <div className="flex-1 px-5 mt-4 overflow-hidden pb-24">
        <div className="grid grid-cols-3 gap-4">
          {services.map((service) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              onClick={onServiceClick}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>
      </div>

      {/* Floating Footer Navigation - Floating without a bar */}
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
      {/* Admin Login Modal */}
      {showAdminLogin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-slate-800 w-full max-w-xs rounded-[32px] p-8 shadow-2xl relative"
          >
            <button 
              onClick={() => {
                setShowAdminLogin(false);
                setError('');
                setPassword('');
              }}
              className="absolute right-6 top-6 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Lock className="text-blue-500" size={28} />
              </div>
              <h2 className="text-slate-900 dark:text-white font-bold font-bengali text-lg">এডমিন লগইন</h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">অ্যাক্সেস করতে পাসওয়ার্ড দিন</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="পাসওয়ার্ড"
                  className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700 py-3 px-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white text-center"
                  autoFocus
                />
                {error && <p className="text-red-500 text-[10px] mt-2 text-center font-medium">{error}</p>}
              </div>
              <button
                type="submit"
                className="w-full bg-[#2D5BFF] text-white py-3 rounded-2xl font-bold font-bengali shadow-lg shadow-blue-500/30 active:scale-95 transition-transform"
              >
                প্রবেশ করুন
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

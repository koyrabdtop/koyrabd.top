/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import React, { useState, useEffect, FormEvent } from 'react';
import { ChevronLeft, Settings, Users, PlusCircle, ShoppingBag, FileText, LayoutDashboard, Moon, Sun, Phone, Landmark, Bus, Smartphone, Scale, HeartPulse, LogOut, Key, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';
import HotlineAdmin from './Hotline/HotlineAdmin';
import BusAdmin from './Bus/BusAdmin';

interface AdminDashboardProps {
  onBack: () => void;
  onLogout: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

type AdminView = 'dashboard' | 'data-input' | 'settings' | 'hotline-management' | 'bus-management';

export default function AdminDashboard({ onBack, onLogout, isDarkMode, toggleDarkMode }: AdminDashboardProps) {
  const [currentView, setCurrentView] = useState<AdminView>('dashboard');
  
  // Settings state
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [settingsError, setSettingsError] = useState('');
  const [settingsSuccess, setSettingsSuccess] = useState('');

  const managementButtons = [
    { label: 'তথ্য ইনপুট', icon: PlusCircle, color: '#00A3FF', action: () => setCurrentView('data-input') },
    { label: 'ইউজার ম্যানেজমেন্ট', icon: Users, color: '#7C3AED' },
    { label: 'অনলাইন হাট ম্যানেজমেন্ট', icon: ShoppingBag, color: '#F59E0B' },
    { label: 'কেপি পোস্ট ম্যানেজমেন্ট', icon: FileText, color: '#10B981' },
    { label: 'সেটিংস', icon: Settings, color: '#64748B', action: () => setCurrentView('settings') },
  ];

  const dataInputButtons = [
    { label: 'হটলাইন তথ্য', icon: Phone, color: '#FF3D00', action: () => setCurrentView('hotline-management') },
    { label: 'বাস তথ্য', icon: Bus, color: '#FF9800', action: () => setCurrentView('bus-management') },
    { label: 'মোবাইল নাম্বার তথ্য', icon: Smartphone, color: '#9C27B0' },
    { label: 'আইনি সেবা তথ্য', icon: Scale, color: '#3F51B5' },
    { label: 'চিকিৎসা সেবা তথ্য', icon: HeartPulse, color: '#E91E63' },
    { label: 'ঐতিহ্য তথ্য', icon: Landmark, color: '#795548' },
  ];

  const handleBack = () => {
    if (currentView !== 'dashboard') {
      setCurrentView('dashboard');
      setSettingsError('');
      setSettingsSuccess('');
    } else {
      onBack();
    }
  };

  const handlePasswordChange = (e: FormEvent) => {
    e.preventDefault();
    setSettingsError('');
    setSettingsSuccess('');

    const storedPassword = localStorage.getItem('adminPassword') || 'tayeb';
    
    if (oldPassword !== storedPassword) {
      setSettingsError('পুরাতন পাসওয়ার্ডটি সঠিক নয়!');
      return;
    }

    if (newPassword.length < 4) {
      setSettingsError('নতুন পাসওয়ার্ড কমপক্ষে ৪ অক্ষরের হতে হবে!');
      return;
    }

    if (newPassword !== confirmPassword) {
      setSettingsError('পাসওয়ার্ড দুটি মিলছে না!');
      return;
    }

    localStorage.setItem('adminPassword', newPassword);
    setSettingsSuccess('পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে!');
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 pb-10 flex flex-col ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-[#F8FAFC] text-slate-900'}`}>
      {/* Header - Thinner */}
      <div className={`pt-3 pb-3 px-6 shadow-lg transition-colors duration-300 ${isDarkMode ? 'bg-slate-900 border-b border-slate-800' : 'bg-gradient-to-r from-[#1E293B] to-[#334155]'}`}>
        <div className="flex items-center justify-between">
          <button 
            onClick={handleBack}
            className="p-2 text-white/90 hover:bg-white/10 rounded-full transition-colors"
          >
            <ChevronLeft size={22} />
          </button>
          
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-emerald-400" size={20} />
            <h1 className="text-white font-bengali text-lg font-bold">
              {currentView === 'dashboard' ? 'এডমিন প্যানেল' : currentView === 'data-input' ? 'তথ্য ইনপুট' : 'সেটিংস'}
            </h1>
          </div>
          
          <button 
            onClick={toggleDarkMode}
            className="p-2 text-white/90 hover:bg-white/10 rounded-full transition-colors"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>

      <div className="p-6 flex-1 space-y-6">
        {currentView === 'hotline-management' && (
          <HotlineAdmin 
            isDarkMode={isDarkMode} 
            onBack={() => setCurrentView('data-input')} 
          />
        )}

        {currentView === 'bus-management' && (
          <BusAdmin 
            isDarkMode={isDarkMode} 
            onBack={() => setCurrentView('data-input')} 
          />
        )}

        {currentView === 'dashboard' && (
          <div className="space-y-3">
            <h2 className={`font-bold font-bengali px-2 flex items-center gap-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-800'}`}>
              <LayoutDashboard size={18} className="text-slate-400" />
              ম্যানেজমেন্ট টুলস
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {managementButtons.map((btn, index) => (
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={btn.label}
                  onClick={btn.action}
                  className={`w-full p-4 rounded-2xl shadow-sm border flex items-center justify-between group transition-all active:scale-[0.98] ${
                    isDarkMode 
                      ? 'bg-slate-900 border-slate-800 hover:bg-slate-800' 
                      : 'bg-white border-slate-100 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${btn.color}15` }}
                    >
                      <btn.icon size={20} style={{ color: btn.color }} />
                    </div>
                    <span className={`font-bold font-bengali text-sm ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>{btn.label}</span>
                  </div>
                  <ChevronLeft size={18} className="text-slate-300 rotate-180 group-hover:text-slate-400 transition-colors" />
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {currentView === 'data-input' && (
          <div className="space-y-3">
            <h2 className={`font-bold font-bengali px-2 flex items-center gap-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-800'}`}>
              <PlusCircle size={18} className="text-slate-400" />
              তথ্য ক্যাটাগরি নির্বাচন করুন
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {dataInputButtons.map((btn, index) => (
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={btn.label}
                  onClick={btn.action}
                  className={`w-full p-4 rounded-2xl shadow-sm border flex items-center justify-between group transition-all active:scale-[0.98] ${
                    isDarkMode 
                      ? 'bg-slate-900 border-slate-800 hover:bg-slate-800' 
                      : 'bg-white border-slate-100 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${btn.color}15` }}
                    >
                      <btn.icon size={20} style={{ color: btn.color }} />
                    </div>
                    <span className={`font-bold font-bengali text-sm ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>{btn.label}</span>
                  </div>
                  <ChevronLeft size={18} className="text-slate-300 rotate-180 group-hover:text-slate-400 transition-colors" />
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {currentView === 'settings' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-[32px] shadow-sm border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                <Key className="text-blue-500" size={20} />
              </div>
              <h3 className={`font-bold font-bengali ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>পাসওয়ার্ড পরিবর্তন করুন</h3>
            </div>

            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 font-bengali px-1">পুরাতন পাসওয়ার্ড</label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className={`w-full p-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                    isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-100 text-slate-900'
                  }`}
                  placeholder="পুরাতন পাসওয়ার্ড দিন"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 font-bengali px-1">নতুন পাসওয়ার্ড</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={`w-full p-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                    isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-100 text-slate-900'
                  }`}
                  placeholder="নতুন পাসওয়ার্ড দিন"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 font-bengali px-1">পাসওয়ার্ড নিশ্চিত করুন</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full p-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                    isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-100 text-slate-900'
                  }`}
                  placeholder="আবারও নতুন পাসওয়ার্ড দিন"
                />
              </div>

              {settingsError && (
                <div className="flex items-center gap-2 text-red-500 text-xs font-bold font-bengali bg-red-50 dark:bg-red-900/10 p-3 rounded-xl">
                  <AlertCircle size={14} />
                  {settingsError}
                </div>
              )}

              {settingsSuccess && (
                <div className="flex items-center gap-2 text-emerald-500 text-xs font-bold font-bengali bg-emerald-50 dark:bg-emerald-900/10 p-3 rounded-xl">
                  <CheckCircle2 size={14} />
                  {settingsSuccess}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#2D5BFF] text-white py-3.5 rounded-2xl font-bold font-bengali shadow-lg shadow-blue-500/20 active:scale-95 transition-transform mt-2"
              >
                আপডেট করুন
              </button>
            </form>
          </motion.div>
        )}
      </div>

      {/* Logout Button */}
      {currentView === 'dashboard' && (
        <div className="px-6 mt-auto">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onLogout}
            className={`w-full p-4 rounded-2xl border flex items-center justify-center gap-3 font-bold font-bengali transition-all ${
              isDarkMode 
                ? 'bg-red-900/10 border-red-900/20 text-red-500 hover:bg-red-900/20' 
                : 'bg-red-50 border-red-100 text-red-600 hover:bg-red-100'
            }`}
          >
            <LogOut size={20} />
            এডমিন লগআউট
          </motion.button>
        </div>
      )}
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bus, 
  MapPin, 
  Phone, 
  ChevronRight, 
  ArrowLeft, 
  PhoneCall, 
  MessageSquare,
  Moon,
  Sun,
  Info,
  Plus,
  User
} from 'lucide-react';

const WhatsAppIcon = ({ size = 20 }: { size?: number }) => (
  <svg 
    viewBox="0 0 24 24" 
    width={size} 
    height={size} 
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

interface BusCounter {
  id: string;
  name: string;
  mobile: string;
}

interface BusInfo {
  id: string;
  route: string;
  busName: string;
  fareAC: string;
  fareNonAC: string;
  counters: BusCounter[];
}

interface BusPageProps {
  isDarkMode: boolean;
  onBack: () => void;
  toggleDarkMode: () => void;
}

export default function BusPage({ isDarkMode, onBack, toggleDarkMode }: BusPageProps) {
  const [buses, setBuses] = useState<BusInfo[]>([]);
  const [currentView, setCurrentView] = useState<'routes' | 'buses' | 'details'>('routes');
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [selectedBus, setSelectedBus] = useState<BusInfo | null>(null);

  useEffect(() => {
    const savedBuses = localStorage.getItem('bus_data');
    if (savedBuses) {
      setBuses(JSON.parse(savedBuses));
    }
  }, []);

  const uniqueRoutes: string[] = [...new Set<string>(buses.map(b => b.route))].sort();
  
  const handleRouteClick = (route: string) => {
    setSelectedRoute(route);
    setCurrentView('buses');
  };

  const handleBusClick = (bus: BusInfo) => {
    setSelectedBus(bus);
    setCurrentView('details');
  };

  const handleBack = () => {
    if (currentView === 'details') {
      setCurrentView('buses');
    } else if (currentView === 'buses') {
      setCurrentView('routes');
      setSelectedRoute(null);
    } else {
      onBack();
    }
  };

  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  const handleWhatsApp = (number: string) => {
    const cleanNumber = number.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanNumber.startsWith('88') ? cleanNumber : '88' + cleanNumber}`, '_blank');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 flex flex-col ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-[#F8FAFC] text-slate-900'}`}>
      {/* Header */}
      <div className={`px-6 pt-6 pb-6 shadow-md transition-colors duration-300 relative z-10 ${
        isDarkMode ? 'bg-slate-900 border-b border-slate-800' : 'bg-gradient-to-b from-[#FB8C00] to-[#F57C00] border-none rounded-b-[35px]'
      }`}>
        <div className="flex items-center justify-between">
          <div className="w-10"></div>
          
          <div className="text-center flex-1">
            <h1 className="font-bengali font-bold text-lg leading-none text-white">
              {currentView === 'routes' ? 'বাস সার্ভিস' : currentView === 'buses' ? selectedRoute : selectedBus?.busName}
            </h1>
            <div className="flex flex-col items-center mt-1.5">
              <p className="font-bengali text-[10px] font-medium opacity-80 text-white/70">
                {currentView === 'details' ? selectedBus?.route : 'আরামদায়ক ও নিরাপদ ভ্রমণ'}
              </p>
              {currentView === 'details' && selectedBus && (
                <div className="flex gap-3 mt-1">
                  {selectedBus.fareAC && (
                    <span className="text-[10px] font-bold text-blue-100">
                      এসি: ৳{selectedBus.fareAC}
                    </span>
                  )}
                  {selectedBus.fareNonAC && (
                    <span className="text-[10px] font-bold text-emerald-100">
                      নন-এসি: ৳{selectedBus.fareNonAC}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          <button 
            onClick={toggleDarkMode}
            className={`p-1.5 rounded-lg transition-colors ${isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-white/10 text-white'}`}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 pb-24">
        <AnimatePresence mode="wait">
          {currentView === 'routes' && (
            <motion.div
              key="routes"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-3"
            >
              {uniqueRoutes.map((route, index) => (
                <motion.button
                  key={route}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleRouteClick(route)}
                  className={`w-full p-4 rounded-2xl border shadow-sm flex items-center justify-between group transition-all active:scale-[0.98] ${
                    isDarkMode ? 'bg-slate-900 border-slate-800 hover:bg-slate-800' : 'bg-white border-slate-100 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-orange-50 dark:bg-orange-900/20 rounded-xl flex items-center justify-center">
                      <MapPin className="text-orange-500" size={20} />
                    </div>
                    <span className={`font-bold font-bengali text-sm ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>{route}</span>
                  </div>
                  <ChevronRight size={18} className="text-slate-300 group-hover:text-orange-500 transition-colors" />
                </motion.button>
              ))}
              {uniqueRoutes.length === 0 && (
                <div className="text-center py-12 opacity-50">
                  <Info className="mx-auto mb-2" size={32} />
                  <p className="font-bengali">কোন রুট পাওয়া যায়নি</p>
                </div>
              )}
            </motion.div>
          )}

          {currentView === 'buses' && (
            <motion.div
              key="buses"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-3"
            >
              {buses.filter(b => b.route === selectedRoute).map((bus, index) => (
                <motion.button
                  key={bus.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleBusClick(bus)}
                  className={`w-full p-4 rounded-2xl border shadow-sm flex items-center justify-between group transition-all active:scale-[0.98] ${
                    isDarkMode ? 'bg-slate-900 border-slate-800 hover:bg-slate-800' : 'bg-white border-slate-100 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-orange-50 dark:bg-orange-900/20 rounded-xl flex items-center justify-center">
                      <Bus className="text-orange-500" size={20} />
                    </div>
                    <div className="text-left">
                      <h4 className={`font-bold font-bengali ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{bus.busName}</h4>
                      <div className="flex gap-2 mt-1">
                        {bus.fareAC && <span className="text-[9px] bg-blue-50 dark:bg-blue-900/20 text-blue-500 px-2 py-0.5 rounded-full font-bold">AC: ৳{bus.fareAC}</span>}
                        {bus.fareNonAC && <span className="text-[9px] bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 px-2 py-0.5 rounded-full font-bold">Non-AC: ৳{bus.fareNonAC}</span>}
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-slate-300 group-hover:text-orange-500 transition-colors" />
                </motion.button>
              ))}
            </motion.div>
          )}

          {currentView === 'details' && selectedBus && (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Counters List */}
              <div className="space-y-3">
                <h3 className="font-bold font-bengali text-xs text-slate-400 px-2 flex items-center gap-2 uppercase tracking-wider">
                  <Phone size={14} />
                  কাউন্টার ও যোগাযোগ
                </h3>
                {selectedBus.counters.map((counter, index) => (
                  <motion.div
                    key={counter.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-2xl border shadow-sm flex items-center justify-between ${
                      isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
                    }`}
                  >
                    <div>
                      <h4 className={`font-bold font-bengali ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{counter.name}</h4>
                      <p className={`text-xs font-medium mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{counter.mobile}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleWhatsApp(counter.mobile)}
                        className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 rounded-xl flex items-center justify-center active:scale-90 transition-transform"
                      >
                        <WhatsAppIcon size={20} />
                      </button>
                      <button
                        onClick={() => handleCall(counter.mobile)}
                        className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-xl flex items-center justify-center active:scale-90 transition-transform"
                      >
                        <PhoneCall size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))}
                {selectedBus.counters.length === 0 && (
                  <div className="text-center py-8 opacity-40">
                    <p className="font-bengali text-sm">কোন কাউন্টার তথ্য পাওয়া যায়নি</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
            onClick={handleBack}
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

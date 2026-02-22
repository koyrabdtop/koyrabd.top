/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Trash2, 
  ChevronLeft, 
  Bus, 
  MapPin, 
  Phone, 
  PlusCircle, 
  Save, 
  X,
  PhoneCall,
  MessageSquare
} from 'lucide-react';

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

interface BusAdminProps {
  isDarkMode: boolean;
  onBack: () => void;
}

export default function BusAdmin({ isDarkMode, onBack }: BusAdminProps) {
  const [buses, setBuses] = useState<BusInfo[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBus, setEditingBus] = useState<BusInfo | null>(null);

  // Form state
  const [route, setRoute] = useState('');
  const [newRoute, setNewRoute] = useState('');
  const [isAddingNewRoute, setIsAddingNewRoute] = useState(false);
  const [busName, setBusName] = useState('');
  const [fareAC, setFareAC] = useState('');
  const [fareNonAC, setFareNonAC] = useState('');
  const [counters, setCounters] = useState<BusCounter[]>([
    { id: Date.now().toString(), name: '', mobile: '' }
  ]);

  useEffect(() => {
    const savedBuses = localStorage.getItem('bus_data');
    if (savedBuses) {
      setBuses(JSON.parse(savedBuses));
    }
  }, []);

  const saveToLocalStorage = (data: BusInfo[]) => {
    localStorage.setItem('bus_data', JSON.stringify(data));
    setBuses(data);
  };

  const resetForm = () => {
    setRoute('');
    setNewRoute('');
    setIsAddingNewRoute(false);
    setBusName('');
    setFareAC('');
    setFareNonAC('');
    setCounters([{ id: Date.now().toString(), name: '', mobile: '' }]);
    setEditingBus(null);
    setShowForm(false);
  };

  const handleAddCounter = () => {
    setCounters([...counters, { id: Date.now().toString(), name: '', mobile: '' }]);
  };

  const handleRemoveCounter = (id: string) => {
    if (counters.length > 1) {
      setCounters(counters.filter(c => c.id !== id));
    }
  };

  const handleCounterChange = (id: string, field: 'name' | 'mobile', value: string) => {
    setCounters(counters.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalRoute = isAddingNewRoute ? newRoute : route;
    if (!finalRoute || !busName) return;

    const newBus: BusInfo = {
      id: editingBus?.id || Date.now().toString(),
      route: finalRoute,
      busName,
      fareAC,
      fareNonAC,
      counters: counters.filter(c => c.name && c.mobile)
    };

    let updatedBuses;
    if (editingBus) {
      updatedBuses = buses.map(b => b.id === editingBus.id ? newBus : b);
    } else {
      updatedBuses = [...buses, newBus];
    }

    saveToLocalStorage(updatedBuses);
    resetForm();
  };

  const handleDeleteBus = (id: string) => {
    if (window.confirm('আপনি কি নিশ্চিতভাবে এই বাসের তথ্য মুছে ফেলতে চান?')) {
      const updatedBuses = buses.filter(b => b.id !== id);
      saveToLocalStorage(updatedBuses);
    }
  };

  const handleEditBus = (bus: BusInfo) => {
    setEditingBus(bus);
    setRoute(bus.route);
    setBusName(bus.busName);
    setFareAC(bus.fareAC);
    setFareNonAC(bus.fareNonAC);
    setCounters(bus.counters.length > 0 ? bus.counters : [{ id: Date.now().toString(), name: '', mobile: '' }]);
    setShowForm(true);
  };

  const uniqueRoutes: string[] = [...new Set<string>(buses.map(b => b.route))].sort();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className={`font-bold font-bengali flex items-center gap-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-800'}`}>
          <Bus size={20} className="text-orange-500" />
          বাস তথ্য ম্যানেজমেন্ট
        </h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded-xl font-bold font-bengali text-sm flex items-center gap-2 shadow-lg shadow-orange-500/20 active:scale-95 transition-transform"
        >
          <Plus size={18} />
          নতুন বাসের তথ্য যোগ করুন
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`p-6 rounded-[32px] border shadow-xl ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className={`font-bold font-bengali ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {editingBus ? 'বাসের তথ্য এডিট করুন' : 'নতুন বাসের তথ্য যোগ করুন'}
              </h3>
              <button onClick={resetForm} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                <X size={20} className="text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Route Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 font-bengali px-1">রুট নির্বাচন করুন</label>
                <select
                  value={isAddingNewRoute ? 'new' : route}
                  onChange={(e) => {
                    if (e.target.value === 'new') {
                      setIsAddingNewRoute(true);
                      setRoute('');
                    } else {
                      setIsAddingNewRoute(false);
                      setRoute(e.target.value);
                    }
                  }}
                  className={`w-full p-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-orange-500/20 font-bengali ${
                    isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-100 text-slate-900'
                  }`}
                >
                  <option value="">রুট সিলেক্ট করুন</option>
                  <option value="new">+ নতুন রুট যোগ করুন</option>
                  {uniqueRoutes.map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              {isAddingNewRoute && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 font-bengali px-1">নতুন রুটের নাম</label>
                  <input
                    type="text"
                    value={newRoute}
                    onChange={(e) => setNewRoute(e.target.value)}
                    placeholder="যেমন: কয়রা - খুলনা"
                    className={`w-full p-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-orange-500/20 font-bengali ${
                      isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-100 text-slate-900'
                    }`}
                  />
                </motion.div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 font-bengali px-1">বাসের নাম</label>
                <input
                  type="text"
                  value={busName}
                  onChange={(e) => setBusName(e.target.value)}
                  placeholder="বাসের নাম দিন"
                  className={`w-full p-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-orange-500/20 font-bengali ${
                    isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-100 text-slate-900'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 font-bengali px-1">ভাড়া (এসি)</label>
                  <input
                    type="text"
                    value={fareAC}
                    onChange={(e) => setFareAC(e.target.value)}
                    placeholder="৳ এসি"
                    className={`w-full p-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-orange-500/20 font-bengali ${
                      isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-100 text-slate-900'
                    }`}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 font-bengali px-1">ভাড়া (নন-এসি)</label>
                  <input
                    type="text"
                    value={fareNonAC}
                    onChange={(e) => setFareNonAC(e.target.value)}
                    placeholder="৳ নন-এসি"
                    className={`w-full p-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-orange-500/20 font-bengali ${
                      isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-100 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              {/* Counters Section */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-bold text-slate-500 font-bengali px-1">কাউন্টার সমুহ</label>
                {counters.map((counter, index) => (
                  <div key={counter.id} className="flex gap-2 items-end">
                    <div className="flex-1 space-y-1">
                      <input
                        type="text"
                        value={counter.name}
                        onChange={(e) => handleCounterChange(counter.id, 'name', e.target.value)}
                        placeholder="কাউন্টার নাম"
                        className={`w-full p-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-sm font-bengali ${
                          isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-100 text-slate-900'
                        }`}
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <input
                        type="text"
                        value={counter.mobile}
                        onChange={(e) => handleCounterChange(counter.id, 'mobile', e.target.value)}
                        placeholder="মোবাইল নং"
                        className={`w-full p-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-sm font-bengali ${
                          isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-100 text-slate-900'
                        }`}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveCounter(counter.id)}
                      className={`p-2.5 rounded-xl border transition-colors ${
                        isDarkMode ? 'border-slate-700 text-red-400 hover:bg-red-900/10' : 'border-slate-100 text-red-500 hover:bg-red-50'
                      }`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddCounter}
                  className="w-full py-2.5 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-slate-400 font-bold font-bengali text-xs flex items-center justify-center gap-2 hover:border-orange-500 hover:text-orange-500 transition-all"
                >
                  <PlusCircle size={14} />
                  + আরও কাউন্টার যোগ
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-4 rounded-2xl font-bold font-bengali shadow-lg shadow-orange-500/20 active:scale-95 transition-transform mt-4 flex items-center justify-center gap-2"
              >
                <Save size={20} />
                {editingBus ? 'তথ্য আপডেট করুন' : 'তথ্য সেভ করুন'}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bus List */}
      <div className="space-y-4">
        {uniqueRoutes.map(route => (
          <div key={route} className="space-y-2">
            <h3 className={`font-bold font-bengali text-sm px-2 flex items-center gap-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              <MapPin size={14} />
              রুট: {route}
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {buses.filter(b => b.route === route).map(bus => (
                <div
                  key={bus.id}
                  className={`p-4 rounded-2xl border shadow-sm flex items-center justify-between ${
                    isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-orange-50 dark:bg-orange-900/20 rounded-xl flex items-center justify-center">
                      <Bus className="text-orange-500" size={20} />
                    </div>
                    <div>
                      <h4 className={`font-bold font-bengali ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{bus.busName}</h4>
                      <div className="flex gap-3 mt-1">
                        {bus.fareAC && <span className="text-[10px] bg-blue-50 dark:bg-blue-900/20 text-blue-500 px-2 py-0.5 rounded-full font-bold">AC: ৳{bus.fareAC}</span>}
                        {bus.fareNonAC && <span className="text-[10px] bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 px-2 py-0.5 rounded-full font-bold">Non-AC: ৳{bus.fareNonAC}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditBus(bus)}
                      className={`p-2 rounded-lg transition-colors ${
                        isDarkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-50 text-slate-500'
                      }`}
                    >
                      <PlusCircle size={18} className="rotate-45" />
                    </button>
                    <button
                      onClick={() => handleDeleteBus(bus.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        isDarkMode ? 'hover:bg-red-900/10 text-red-400' : 'hover:bg-red-50 text-red-500'
                      }`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {buses.length === 0 && !showForm && (
          <div className={`text-center py-12 rounded-[32px] border-2 border-dashed ${isDarkMode ? 'border-slate-800 text-slate-600' : 'border-slate-100 text-slate-400'}`}>
            <Bus size={48} className="mx-auto mb-4 opacity-20" />
            <p className="font-bengali font-bold">কোন বাসের তথ্য পাওয়া যায়নি</p>
            <p className="font-bengali text-xs mt-1">নতুন তথ্য যোগ করতে উপরের বাটনে ক্লিক করুন</p>
          </div>
        )}
      </div>
    </div>
  );
}

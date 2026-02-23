import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect, FormEvent } from 'react';
import { Phone, PlusCircle, User, Edit, Trash2, Camera, Save } from 'lucide-react';
import { HotlineEntry } from '../../../types';

interface HotlineAdminProps {
  isDarkMode: boolean;
  onBack: () => void;
}

export default function HotlineAdmin({ isDarkMode, onBack }: HotlineAdminProps) {
  const [hotlineEntries, setHotlineEntries] = useState<HotlineEntry[]>([]);
  const [editingEntry, setEditingEntry] = useState<HotlineEntry | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  
  const [formData, setFormData] = useState<Partial<HotlineEntry>>({
    serviceType: '',
    name: '',
    designation: '',
    address: '',
    mobile: '',
    email: '',
    image: ''
  });

  useEffect(() => {
    const savedData = localStorage.getItem('hotline_data');
    if (savedData) {
      setHotlineEntries(JSON.parse(savedData));
    }
  }, []);

  const saveHotlineData = (data: HotlineEntry[]) => {
    localStorage.setItem('hotline_data', JSON.stringify(data));
    setHotlineEntries(data);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHotlineSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (editingEntry) {
      const updatedEntries = hotlineEntries.map(entry => 
        entry.id === editingEntry.id ? { ...entry, ...formData } as HotlineEntry : entry
      );
      saveHotlineData(updatedEntries);
      setEditingEntry(null);
    } else {
      const newEntry: HotlineEntry = {
        id: Date.now().toString(),
        serviceType: formData.serviceType || '',
        name: formData.name || '',
        designation: formData.designation || '',
        address: formData.address || '',
        mobile: formData.mobile || '',
        email: formData.email || '',
        image: formData.image || '',
        createdAt: Date.now()
      };
      saveHotlineData([...hotlineEntries, newEntry]);
      setIsAddingNew(false);
    }
    setFormData({
      serviceType: '',
      name: '',
      designation: '',
      address: '',
      mobile: '',
      email: '',
      image: ''
    });
  };

  const deleteEntry = (id: string) => {
    if (window.confirm('আপনি কি নিশ্চিত যে এটি ডিলিট করতে চান?')) {
      const updatedEntries = hotlineEntries.filter(entry => entry.id !== id);
      saveHotlineData(updatedEntries);
    }
  };

  const startEdit = (entry: HotlineEntry) => {
    setEditingEntry(entry);
    setFormData(entry);
    setIsAddingNew(true);
  };

  return (
    <div className="space-y-6">
      {!isAddingNew ? (
        <>
          <div className="flex items-center justify-between px-2">
            <h2 className={`font-bold font-bengali flex items-center gap-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-800'}`}>
              <Phone size={18} className="text-red-500" />
              হটলাইন তথ্য তালিকা
            </h2>
            <button 
              onClick={() => setIsAddingNew(true)}
              className="bg-emerald-500 text-white px-4 py-2 rounded-xl font-bold font-bengali text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition-transform"
            >
              <PlusCircle size={16} />
              নতুন যোগ করুন
            </button>
          </div>

          <div className="space-y-3">
            {hotlineEntries.length === 0 ? (
              <div className={`p-10 text-center rounded-3xl border-2 border-dashed ${isDarkMode ? 'border-slate-800 text-slate-500' : 'border-slate-100 text-slate-400'}`}>
                <Phone size={40} className="mx-auto mb-3 opacity-20" />
                <p className="font-bengali text-sm">কোন তথ্য পাওয়া যায়নি</p>
              </div>
            ) : (
              hotlineEntries.map((entry) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={entry.id}
                  className={`p-4 rounded-2xl border flex items-center justify-between ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden flex items-center justify-center">
                      {entry.image ? (
                        <img src={entry.image} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <User size={20} className="text-slate-400" />
                      )}
                    </div>
                    <div>
                      <h4 className={`font-bold font-bengali text-sm ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{entry.name}</h4>
                      <p className="text-[10px] text-slate-500 font-bengali">{entry.serviceType} • {entry.mobile}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => startEdit(entry)}
                      className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-500 hover:bg-blue-100 transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => deleteEntry(entry.id)}
                      className="p-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-100 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-[32px] shadow-sm border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}
        >
          <h3 className={`font-bold font-bengali mb-6 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {editingEntry ? <Edit size={20} className="text-blue-500" /> : <PlusCircle size={20} className="text-emerald-500" />}
            {editingEntry ? 'তথ্য এডিট করুন' : 'নতুন তথ্য যোগ করুন'}
          </h3>

          <form onSubmit={handleHotlineSubmit} className="space-y-4">
            {/* Image Upload */}
            <div className="flex flex-col items-center mb-6">
              <div className={`w-24 h-24 rounded-3xl border-2 border-dashed flex items-center justify-center overflow-hidden relative group ${isDarkMode ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-slate-50'}`}>
                {formData.image ? (
                  <img src={formData.image} alt="" className="w-full h-full object-cover" />
                ) : (
                  <Camera size={24} className="text-slate-400" />
                )}
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
              <p className="text-[10px] text-slate-500 mt-2 font-bengali">ছবি আপলোড করুন (ঐচ্ছিক)</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 font-bengali px-1">সেবার ধরন</label>
                <input
                  required
                  type="text"
                  value={formData.serviceType}
                  onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
                  className={`w-full p-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                    isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-100 text-slate-900'
                  }`}
                  placeholder="যেমন: ফায়ার সার্ভিস, পুলিশ"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 font-bengali px-1">নাম</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className={`w-full p-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                    isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-100 text-slate-900'
                  }`}
                  placeholder="নাম লিখুন"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 font-bengali px-1">পদবি</label>
                <input
                  type="text"
                  value={formData.designation}
                  onChange={(e) => setFormData({...formData, designation: e.target.value})}
                  className={`w-full p-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                    isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-100 text-slate-900'
                  }`}
                  placeholder="পদবি লিখুন"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 font-bengali px-1">ঠিকানা</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className={`w-full p-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                    isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-100 text-slate-900'
                  }`}
                  placeholder="ঠিকানা লিখুন"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 font-bengali px-1">মোবাইল নং</label>
                  <input
                    required
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                    className={`w-full p-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                      isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-100 text-slate-900'
                    }`}
                    placeholder="মোবাইল নং"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 font-bengali px-1">ইমেইল</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={`w-full p-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                      isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-100 text-slate-900'
                    }`}
                    placeholder="ইমেইল (ঐচ্ছিক)"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsAddingNew(false);
                  setEditingEntry(null);
                  setFormData({ serviceType: '', name: '', designation: '', address: '', mobile: '', email: '', image: '' });
                }}
                className={`flex-1 py-3.5 rounded-2xl font-bold font-bengali transition-all ${
                  isDarkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'
                }`}
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="flex-[2] bg-[#2D5BFF] text-white py-3.5 rounded-2xl font-bold font-bengali shadow-lg shadow-blue-500/20 active:scale-95 transition-transform flex items-center justify-center gap-2"
              >
                <Save size={18} />
                {editingEntry ? 'আপডেট করুন' : 'সেভ করুন'}
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </div>
  );
}

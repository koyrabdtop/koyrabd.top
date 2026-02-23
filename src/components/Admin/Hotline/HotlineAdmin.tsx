import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect, FormEvent } from 'react';
import { Phone, PlusCircle, User, Edit, Trash2, Camera, Save, X, ArrowLeft } from 'lucide-react';
import { HotlineEntry } from '../../../types';
import { API_BASE_URL } from '../../../config';

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

  // --- ডাটাবেজ থেকে ডাটা লোড করা (GET) ---
  const fetchHotlines = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}?action=fetch&category=hotline`);
      const data = await response.json();
      setHotlineEntries(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchHotlines();
  }, []);

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

  // --- ডাটাবেজে ডাটা সেভ করা (POST) ---
  const handleHotlineSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}?action=save&category=hotline`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.status === 'success') {
          alert("সফলভাবে ডাটাবেজে সেভ হয়েছে!");
          setIsAddingNew(false);
          setEditingEntry(null);
          setFormData({ serviceType: '', name: '', designation: '', address: '', mobile: '', email: '', image: '' });
          fetchHotlines(); // নতুন ডাটা দেখানোর জন্য রিফ্রেশ
        }
      }
    } catch (error) {
      alert("সেভ করতে সমস্যা হয়েছে। আপনার হোস্টিং এর api.php চেক করুন।");
    }
  };

  return (
    <div className={`min-h-screen font-bengali ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      {/* হেডার সেকশন */}
      <div className={`sticky top-0 z-20 p-4 flex items-center gap-4 ${isDarkMode ? 'bg-slate-900/80' : 'bg-white/80'} backdrop-blur-md`}>
        <button onClick={onBack} className={`p-2 rounded-xl ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">হটলাইন ম্যানেজমেন্ট</h1>
      </div>

      <div className="p-4">
        {!isAddingNew && !editingEntry && (
          <button
            onClick={() => setIsAddingNew(true)}
            className="w-full py-4 rounded-3xl bg-[#2D5BFF] text-white font-bold flex items-center justify-center gap-2 mb-6 shadow-lg shadow-blue-500/20"
          >
            <PlusCircle size={20} />
            নতুন হটলাইন যুক্ত করুন
          </button>
        )}

        {/* ডাটা লিস্ট */}
        <div className="space-y-3">
          {hotlineEntries.map((entry) => (
            <div key={entry.id} className={`p-4 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
              <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold">{entry.name}</h3>
                    <p className="text-xs opacity-60 font-medium">{entry.serviceType}</p>
                    <p className="text-sm font-bold text-blue-500">{entry.mobile}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* মডার্ন ডিজাইন ফর্ম (AI Studio UI) */}
      <AnimatePresence>
        {(isAddingNew || editingEntry) && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className={`fixed inset-0 z-50 overflow-y-auto p-4 ${isDarkMode ? 'bg-slate-950' : 'bg-slate-50'}`}
          >
            <div className="max-w-md mx-auto space-y-6 pb-10">
              <div className="flex justify-between items-center pt-4">
                <h2 className="text-2xl font-black">{editingEntry ? 'তথ্য পরিবর্তন' : 'নতুন সেবা যুক্ত করুন'}</h2>
                <button onClick={() => { setIsAddingNew(false); setEditingEntry(null); }} className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleHotlineSubmit} className="space-y-4">
                {/* ইমেজ আপলোড */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className={`w-32 h-32 rounded-[40px] border-4 ${isDarkMode ? 'border-slate-800 bg-slate-900' : 'border-white bg-white shadow-xl'} overflow-hidden flex items-center justify-center`}>
                      {formData.image ? (
                        <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <Camera size={40} className="text-slate-300" />
                      )}
                    </div>
                    <label className="absolute bottom-0 right-0 p-3 bg-[#2D5BFF] text-white rounded-2xl shadow-lg cursor-pointer active:scale-90 transition-transform">
                      <Camera size={20} />
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 font-bengali px-1">সেবার ধরণ (যেমন: থানা, হাসপাতাল)</label>
                    <input
                      required
                      type="text"
                      value={formData.serviceType}
                      onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
                      className={`w-full p-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-100 text-slate-900'}`}
                      placeholder="সেবার ধরণ লিখুন"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 font-bengali px-1">প্রতিষ্ঠানের নাম / নাম</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className={`w-full p-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-100 text-slate-900'}`}
                      placeholder="নাম লিখুন"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 font-bengali px-1">ঠিকানা</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className={`w-full p-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-100 text-slate-900'}`}
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
                        className={`w-full p-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-100 text-slate-900'}`}
                        placeholder="মোবাইল নং"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 font-bengali px-1">ইমেইল</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className={`w-full p-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-100 text-slate-900'}`}
                        placeholder="ইমেইল (ঐচ্ছিক)"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => { setIsAddingNew(false); setEditingEntry(null); setFormData({ serviceType: '', name: '', designation: '', address: '', mobile: '', email: '', image: '' }); }}
                    className={`flex-1 py-3.5 rounded-2xl font-bold font-bengali transition-all ${isDarkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'}`}
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
          }

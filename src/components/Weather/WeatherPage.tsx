import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cloud, 
  CloudRain, 
  CloudLightning, 
  Sun, 
  Wind, 
  Droplets, 
  Sunrise, 
  Sunset, 
  Moon, 
  RefreshCw, 
  Waves,
  Plus,
  User
} from 'lucide-react';

interface WeatherPageProps {
  isDarkMode: boolean;
  onBack: () => void;
  toggleDarkMode: () => void;
}

interface WeatherData {
  temp: number;
  condition: string;
  conditionIcon: string;
  humidity: number;
  windSpeed: number;
  sunrise: string;
  sunset: string;
  moonPhase: string;
  tide: {
    high: string;
    low: string;
  };
  forecast: Array<{
    day: string;
    temp: string;
    icon: string;
  }>;
}

const toBengaliNumber = (num: number | string): string => {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().replace(/\d/g, (digit) => bengaliDigits[parseInt(digit)]);
};

export default function WeatherPage({ isDarkMode, onBack, toggleDarkMode }: WeatherPageProps) {
  const [activeTab, setActiveTab] = useState<'koyra' | 'paikgacha'>('koyra');
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  
  const subtitles = ['কয়রা-পাইকগাছা কমিউনিটি এপস', 'www.koyrabd.top'];

  useEffect(() => {
    const interval = setInterval(() => {
      setSubtitleIndex((prev) => (prev + 1) % subtitles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const fetchWeather = async () => {
    setLoading(true);
    // In a real app, you'd call OpenWeatherMap API here.
    // Simulating API call for Koyra/Paikgacha
    setTimeout(() => {
      const mockData: WeatherData = {
        temp: activeTab === 'koyra' ? 28 : 27,
        condition: 'পরিষ্কার আকাশ',
        conditionIcon: 'sun',
        humidity: 65,
        windSpeed: 12,
        sunrise: '০৬:১২',
        sunset: '০৫:৪৫',
        moonPhase: 'শুক্লপক্ষ',
        tide: {
          high: '১০:৩০',
          low: '০৪:১৫'
        },
        forecast: [
          { day: 'আজ', temp: '২৮°/২২°', icon: 'sun' },
          { day: 'আগামীকাল', temp: '২৯°/২৩°', icon: 'cloud' },
          { day: 'মঙ্গলবার', temp: '২৭°/২১°', icon: 'rain' },
          { day: 'বুধবার', temp: '২৬°/২০°', icon: 'lightning' },
          { day: 'বৃহস্পতিবার', temp: '২৮°/২২°', icon: 'sun' },
          { day: 'শুক্রবার', temp: '২৯°/২৩°', icon: 'sun' },
          { day: 'শনিবার', temp: '২৭°/২১°', icon: 'cloud' },
        ]
      };
      setWeatherData(mockData);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchWeather();
  }, [activeTab]);

  const WeatherIcon = ({ name, size = 24, className = "" }: { name: string, size?: number, className?: string }) => {
    switch (name) {
      case 'sun': return <Sun size={size} className={className} />;
      case 'cloud': return <Cloud size={size} className={className} />;
      case 'rain': return <CloudRain size={size} className={className} />;
      case 'lightning': return <CloudLightning size={size} className={className} />;
      default: return <Cloud size={size} className={className} />;
    }
  };

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
              আবহাওয়া আপডেট
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
            onClick={fetchWeather}
            className={`p-1.5 rounded-lg transition-colors ${isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-white/10 text-white'}`}
          >
            <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 mt-4">
        <div className={`flex p-1 rounded-xl ${isDarkMode ? 'bg-slate-900' : 'bg-white shadow-sm border border-slate-100'}`}>
          <button
            onClick={() => setActiveTab('koyra')}
            className={`flex-1 py-2 rounded-lg font-bengali font-bold text-xs transition-all ${
              activeTab === 'koyra' 
                ? 'bg-[#00A3FF] text-white shadow-md shadow-blue-500/20' 
                : isDarkMode ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            কয়রা
          </button>
          <button
            onClick={() => setActiveTab('paikgacha')}
            className={`flex-1 py-2 rounded-lg font-bengali font-bold text-xs transition-all ${
              activeTab === 'paikgacha' 
                ? 'bg-[#00A3FF] text-white shadow-md shadow-blue-500/20' 
                : isDarkMode ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            পাইকগাছা
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 px-4 pt-4 space-y-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10 space-y-3">
            <RefreshCw size={32} className="animate-spin text-blue-500" />
            <p className="font-bengali text-xs text-slate-500">তথ্য লোড হচ্ছে...</p>
          </div>
        ) : weatherData && (
          <>
            {/* Main Weather Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-[#00A3FF] to-[#0066FF] rounded-[30px] p-5 text-white shadow-xl shadow-blue-500/20 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 -mr-6 -mt-6 opacity-10">
                <WeatherIcon name={weatherData.conditionIcon} size={140} />
              </div>
              
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-5xl font-bold tracking-tighter">
                    {toBengaliNumber(weatherData.temp)}°
                  </h2>
                  <p className="font-bengali text-lg font-medium mt-0.5">{weatherData.condition}</p>
                  <p className="font-bengali text-[9px] opacity-70 mt-2">সর্বশেষ আপডেট: {toBengaliNumber(new Date().getHours())}:{toBengaliNumber(new Date().getMinutes())}</p>
                </div>
                <WeatherIcon name={weatherData.conditionIcon} size={60} className="text-white drop-shadow-md" />
              </div>

              <div className="grid grid-cols-2 gap-3 mt-5">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 flex items-center gap-2">
                  <Wind size={16} />
                  <div>
                    <p className="text-[9px] opacity-70 font-bengali">বাতাস</p>
                    <p className="font-bold text-xs">{toBengaliNumber(weatherData.windSpeed)} কিমি/ঘণ্টা</p>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 flex items-center gap-2">
                  <Droplets size={16} />
                  <div>
                    <p className="text-[9px] opacity-70 font-bengali">আর্দ্রতা</p>
                    <p className="font-bold text-xs">{toBengaliNumber(weatherData.humidity)}%</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Detailed Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className={`p-3 rounded-[24px] border transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Sunrise size={14} className="text-orange-500" />
                  <p className="font-bengali text-[10px] font-bold text-slate-500">সূর্যোদয়</p>
                </div>
                <p className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{toBengaliNumber(weatherData.sunrise)}</p>
              </div>
              <div className={`p-3 rounded-[24px] border transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Sunset size={14} className="text-orange-400" />
                  <p className="font-bengali text-[10px] font-bold text-slate-500">সূর্যাস্ত</p>
                </div>
                <p className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{toBengaliNumber(weatherData.sunset)}</p>
              </div>
              <div className={`p-3 rounded-[24px] border transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Moon size={14} className="text-indigo-400" />
                  <p className="font-bengali text-[10px] font-bold text-slate-500">চন্দ্র তিথি</p>
                </div>
                <p className={`text-base font-bold font-bengali ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{weatherData.moonPhase}</p>
              </div>
              <div className={`p-3 rounded-[24px] border transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Waves size={14} className="text-blue-500" />
                  <p className="font-bengali text-[10px] font-bold text-slate-500">জোয়ার-ভাটা</p>
                </div>
                <p className={`text-xs font-bold font-bengali leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  জোয়ার: {toBengaliNumber(weatherData.tide.high)}<br/>
                  ভাটা: {toBengaliNumber(weatherData.tide.low)}
                </p>
              </div>
            </div>

            {/* 7-Day Forecast */}
            <div className={`p-4 rounded-[30px] border transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
              <h3 className={`font-bengali font-bold mb-4 flex items-center gap-2 text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-900'}`}>
                <Cloud size={18} className="text-blue-500" />
                ৭ দিনের পূর্বাভাস
              </h3>
              <div className="space-y-3">
                {weatherData.forecast.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2 border-b border-slate-50 dark:border-slate-800/50 last:border-0">
                    <p className={`font-bengali text-sm font-bold w-20 ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>{item.day}</p>
                    <WeatherIcon name={item.icon} size={18} className="text-blue-400" />
                    <p className={`font-bold text-sm w-24 text-right ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>{toBengaliNumber(item.temp)}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Floating Footer Navigation */}
      <div className="fixed bottom-3 left-0 right-0 px-8 z-50 pointer-events-none">
        <div className="max-w-[260px] mx-auto flex items-center justify-between pointer-events-auto">
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 bg-[#2D5BFF] text-white rounded-full shadow-[0_6px_15px_rgba(45,91,255,0.3)] flex items-center justify-center"
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
            className="w-12 h-12 bg-[#2D5BFF] text-white rounded-full shadow-[0_6px_15px_rgba(45,91,255,0.3)] flex items-center justify-center"
          >
            <User size={24} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

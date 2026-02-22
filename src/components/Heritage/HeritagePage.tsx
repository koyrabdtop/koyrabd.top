import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight,
  Plus,
  User,
  Moon,
  Sun,
  Trees,
  Church,
  History,
  Waves,
  Landmark,
  Home,
  MapPin,
  Anchor,
  GraduationCap,
  Info
} from 'lucide-react';

interface HeritagePageProps {
  isDarkMode: boolean;
  onBack: () => void;
  toggleDarkMode: () => void;
}

export default function HeritagePage({ isDarkMode, onBack, toggleDarkMode }: HeritagePageProps) {
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [currentView, setCurrentView] = useState<'main' | 'history' | 'places' | 'koyra-places' | 'paikgacha-places' | 'koyra-history' | 'paikgacha-history'>('main');
  const subtitles = ['কয়রা-পাইকগাছা কমিউনিটি এপস', 'www.koyrabd.top'];

  useEffect(() => {
    const interval = setInterval(() => {
      setSubtitleIndex((prev) => (prev + 1) % subtitles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const mainMenuItems = [
    { id: 'history', label: 'ইতিহাস', action: () => setCurrentView('history') },
    { id: 'places', label: 'দর্শনীয় স্থান', action: () => setCurrentView('places') },
  ];

  const historyItems = [
    { id: 'koyra-history', label: 'কয়রা উপজেলার ইতিহাস', action: () => setCurrentView('koyra-history') },
    { id: 'paikgacha-history', label: 'পাইকগাছা উপজেলার ইতিহাস', action: () => setCurrentView('paikgacha-history') },
  ];

  const placesItems = [
    { id: 'koyra-places', label: 'কয়রা উপজেলার দর্শনীয় স্থান', action: () => setCurrentView('koyra-places') },
    { id: 'paikgacha-places', label: 'পাইকগাছা উপজেলার দর্শনীয় স্থান', action: () => setCurrentView('paikgacha-places') },
  ];

  const paikgachaSightseeingData = [
    {
      title: 'স্যার পি. সি. রায়ের বাড়ি',
      subtitle: 'বিশ্বখ্যাত বিজ্ঞানীর পৈতৃক নিবাস',
      description: 'পাইকগাছার রাড়ুলী গ্রামে অবস্থিত প্রখ্যাত বিজ্ঞানী আচার্য স্যার প্রফুল্ল চন্দ্র রায়ের বাড়ি। এটি একটি সংরক্ষিত প্রত্নতাত্ত্বিক এলাকা যা বিজ্ঞান ও শিক্ষার প্রসারে ঐতিহাসিক গুরুত্ব বহন করে।',
      color: 'blue',
      icon: Landmark
    },
    {
      title: 'মৎস্য গবেষণা ও লোনা পানি কেন্দ্র',
      subtitle: 'দক্ষিণ এশিয়ার অন্যতম মৎস্য কেন্দ্র',
      description: 'পাইকগাছা সদরে অবস্থিত এই কেন্দ্রটি লোনা পানির মৎস্য প্রজনন ও গবেষণার জন্য অত্যন্ত পরিচিত। লোনা পানির পরিবেশ ও মাছ চাষের আধুনিক প্রযুক্তি দেখার জন্য এটি একটি চমৎকার স্থান।',
      color: 'cyan',
      icon: Anchor
    },
    {
      title: 'কপিলমুনি বেদ মন্দির',
      subtitle: 'প্রাচীন আধ্যাত্মিক নিদর্শন',
      description: 'কপিলমুনি বাজারে অবস্থিত ঐতিহাসিকভাবে অত্যন্ত সমৃদ্ধ এই মন্দিরটি স্থাপত্যশৈলী এবং আধ্যাত্মিক পরিবেশের জন্য পর্যটকদের কাছে আকর্ষণীয়।',
      color: 'orange',
      icon: Home
    },
    {
      title: 'কপিলেশ্বরী কালী মন্দির',
      subtitle: 'ঐতিহাসিক জাগ্রত মন্দির',
      description: 'কপিলমুনির অন্যতম প্রাচীন ও ঐতিহাসিক এই কালী মন্দিরটি এই অঞ্চলের ধর্মীয় ঐতিহ্যের এক অবিচ্ছেদ্য অংশ।',
      color: 'rose',
      icon: Church
    },
    {
      title: 'পীর জাফর আউলিয়ার মাজার',
      subtitle: 'ধর্মীয় ও সাংস্কৃতিক মিলনস্থল',
      description: 'কপিলমুনি এলাকায় অবস্থিত এই মাজার শরীফটি সাম্প্রদায়িক সম্প্রীতি এবং আধ্যাত্মিক সাধনার এক পবিত্র ভূমি হিসেবে পরিচিত।',
      color: 'emerald',
      icon: History
    },
    {
      title: 'হরিচালী শিব মন্দির',
      subtitle: 'প্রাচীন প্রত্নতাত্ত্বিক ঐতিহ্য',
      description: 'হরিচালী ইউনিয়নে অবস্থিত অতি প্রাচীন এই শিব মন্দিরটি তার সুনিপুণ কারুকাজ এবং ঐতিহাসিক অবকাঠামোর জন্য পর্যটকদের মুগ্ধ করে।',
      color: 'amber',
      icon: Landmark
    },
    {
      title: 'শোলমারী নদীর তীরবর্তী এলাকা',
      subtitle: 'নৈসর্গিক প্রাকৃতিক সৌন্দর্য',
      description: 'শোলমারী নদীর পাড়ে অবস্থিত এই এলাকাটি বিকেলে ভ্রমণের জন্য অত্যন্ত মনোরম। নদীর স্নিগ্ধ হাওয়া এবং প্রাকৃতিক দৃশ্য মনের প্রশান্তি জোগায়।',
      color: 'green',
      icon: Waves
    },
    {
      title: 'চাঁদখালী সংলগ্ন জলাভূমি',
      subtitle: 'পাখি ও প্রকৃতির স্বর্গরাজ্য',
      description: 'চাঁদখালী ইউনিয়নের বিশাল জলাভূমি এলাকাটি বিশেষ করে শীতকালে পরিযায়ী পাখির কলকাকলিতে মুখরিত থাকে। এর প্রাকৃতিক দৃশ্য অত্যন্ত নয়নাভিরাম।',
      color: 'violet',
      icon: Trees
    }
  ];

  const koyraSightseeingData = [
    {
      title: 'বিশ্ব ঐতিহ্যবাহী সুন্দরবন',
      subtitle: 'ইউনেস্কো ঘোষিত বিশ্ব ঐতিহ্য',
      description: 'কয়রা উপজেলার দক্ষিণাঞ্চল জুড়ে বিশ্বের বৃহত্তম ম্যানগ্রোভ বন সুন্দরবন বিস্তৃত। সুন্দরবনের প্রাকৃতিক সৌন্দর্য ও রয়্যাল বেঙ্গল টাইগারের অন্যতম আবাসভূমি। এখানকার প্রাকৃতিক জীববৈচিত্র্য ও শ্বাসমূলীয় উদ্ভিদ পর্যটকদের প্রধান আকর্ষণ।',
      color: 'emerald',
      icon: Trees
    },
    {
      title: 'ঐতিহাসিক মসজিদকুঁড় ৯ গম্বুজ মসজিদ',
      subtitle: '১৫শ শতাব্দীর প্রত্নতাত্ত্বিক নিদর্শন',
      description: 'খান জাহান আলী (র.)-এর আমল বা তাঁর স্থাপত্যশৈলী অনুসরণ করে নির্মিত এই মসজিদটি কয়রা আমাদী ইউনিয়নে অবস্থিত। এটি গম্বুজ বিশিষ্ট এই ঐতিহাসিক মসজিদটি এই অঞ্চলের প্রাচীন ইসলামী সভ্যতার এক অনন্য সাক্ষী।',
      color: 'amber',
      icon: Church
    },
    {
      title: 'উত্তর বেদকাশী বড়বাড়ী রাজা প্রতাপাদিত্য এর বাড়ী',
      subtitle: 'বারো ভূঁইয়ার ইতিহাস',
      description: 'কিংবদন্তি বারো ভূঁইয়া প্রধান রাজা প্রতাপাদিত্যের স্মৃতিবিজড়িত এই স্থানটি উত্তর বেদকাশী ইউনিয়নে অবস্থিত। এখানকার ধ্বংসাবশেষ ও মাটির উঁচু ভিটা প্রাচীন বাংলার শৌর্য-বীর্যের ইতিহাস মনে করিয়ে দেয়।',
      color: 'orange',
      icon: Landmark
    },
    {
      title: 'উত্তর বেদকাশীর খালে খাঁ র ৩৮ বিঘা দিঘী',
      subtitle: 'বিশাল ঐতিহাসিক জলাশয়',
      description: 'বিশাল এলাকা জুড়ে বিস্তৃত এই দিঘীটি উত্তর বেদকাশীর অন্যতম দর্শনীয় স্থান। স্থানীয়ভাবে "খালে খাঁর দিঘী" নামে পরিচিত এই জলাশয়টি প্রাকৃতিক সৌন্দর্যে ভরপুর।',
      color: 'blue',
      icon: Waves
    },
    {
      title: 'আমাদী বুড়ো খাঁ-ফতে খাঁ র দিঘী',
      subtitle: 'প্রাচীন বসতির নিদর্শন',
      description: 'খান জাহান আলী (র.)-এর অনুসারী বুড়ো খাঁ ও ফতে খাঁর স্মৃতিধন্য এই দিঘীটি আমাদী এলাকায় অবস্থিত। এটি কয়রা উপজেলার অন্যতম প্রাচীন ও ঐতিহাসিকভাবে গুরুত্বপূর্ণ স্থান।',
      color: 'indigo',
      icon: History
    },
    {
      title: 'কাছারী বাড়ি বটবৃক্ষ',
      subtitle: 'শতবর্ষী প্রাকৃতিক ঐশ্বর্য',
      description: 'উপজেলা সদরের নিকটবর্তী ঐতিহাসিক কাছারী বাড়ির বিশাল বটবৃক্ষটি যেন কালের সাক্ষী। এর সুশীতল ছায়া এবং বিশালকার আকৃতি দর্শনার্থীদের মুগ্ধ করে।',
      color: 'green',
      icon: Trees
    },
    {
      title: 'বাঁশখালী সৎসঙ্গ মন্দির',
      subtitle: 'আধ্যাত্মিক ও ধর্মীয় পীঠস্থান',
      description: 'কয়রা উপজেলার অন্যতম সুন্দর ও শান্ত ধর্মীয় প্রতিষ্ঠান। এখানকার স্থাপত্যশৈলী এবং আধ্যাত্মিক পরিবেশ দর্শনার্থীদের মনে প্রশান্তি এনে দেয়।',
      color: 'violet',
      icon: Home
    },
    {
      title: 'শুড়িখালী শ্রীশ্রী রাম কৃষ্ণ আশ্রম',
      subtitle: 'শান্তি ও সেবার কেন্দ্র',
      description: 'সুন্দরবনের কোল ঘেঁষে অবস্থিত এই আশ্রমটি আধ্যাত্মিক সাধনা ও মানবসেবার এক অনন্য কেন্দ্র। এর চারপাশের প্রাকৃতিক পরিবেশ অত্যন্ত মনোরম।',
      color: 'rose',
      icon: MapPin
    },
    {
      title: 'দুবলার চর',
      subtitle: 'জেলে পল্লী ও পর্যটন দ্বীপ',
      description: 'সুন্দরবনের অভ্যন্তরে কপোতাক্ষ ও শিবসা নদীর মোহনায় অবস্থিত এই দ্বীপটি। শুঁটকি মাছ উৎপাদন এবং ঐতিহ্যবাহী রাস মেলার জন্য এটি বিশ্বজুড়ে পরিচিত।',
      color: 'cyan',
      icon: Anchor
    }
  ];

  const paikgachaHistoryData = [
    {
      title: 'ভৌগোলিক অবস্থান ও পরিচয়',
      subtitle: 'পাইকগাছা উপজেলার অবস্থান',
      description: 'পাইকগাছা বাংলাদেশের খুলনা জেলার দক্ষিণে অবস্থিত একটি উপজেলা। এটি ২২°৩৫\'৩১" উত্তর ৮৯°২০\'১৩" পূর্ব অবস্থানে করছে। এটি দক্ষিণ খুলনার অন্যতম সমৃদ্ধ বাণিজ্যিক ও উর্বর জনপদ। জেলা সদর থেকে দূরত্ব প্রায় ৬৫ কিমি।',
      icon: Info,
      color: 'blue'
    },
    {
      title: 'সীমানা ও আয়তন',
      subtitle: 'উপজেলার মোট আয়তন',
      description: 'উপজেলার মোট আয়তন ৬৮৩.৮৭ বর্গকিলোমিটার। উত্তরে তালা ও ডুমুরিয়া, দক্ষিণে সুন্দরবন ও কয়রা, পূর্বে বটিয়াঘাটা ও দাকোপ, পশ্চিমে তালা ও আশাশুনি উপজেলা।',
      icon: MapPin,
      color: 'emerald'
    },
    {
      title: 'জনসংখ্যা ও সাক্ষরতা (২০১১)',
      subtitle: '২০১১ সালের আদমশুমারি অনুযায়ী',
      description: '২০১১ সালের আদমশুমারি অনুযায়ী মোট জনসংখ্যা ২,৪৭,৯৮৩ জন। সাক্ষরতার হার ৫২.৮০%। এটি খুলনার অন্যতম জনবহুল ও উন্নত উপজেলা।',
      icon: User,
      color: 'rose'
    },
    {
      title: 'নদ-নদী ও প্রকৃতি',
      subtitle: 'উপজেলার মধ্য দিয়ে প্রবাহিত নদী',
      description: 'উপজেলার মধ্য দিয়ে শিবসা, কপোতাক্ষ, ভদ্রা, ডেলুটি ও কড়ুলিয়া নদী প্রবাহিত। এটি সুন্দরবনের কোল ঘেঁষে গড়ে ওঠা এক নয়নাভিরাম প্রাকৃতিক সৌন্দর্যমণ্ডিত জনপদ।',
      icon: Waves,
      color: 'blue'
    },
    {
      title: 'ঐতিহাসিক প্রেক্ষাপট',
      subtitle: 'মুক্তিযুদ্ধের ইতিহাস',
      description: 'মুক্তিযুদ্ধের ইতিহাসে পাইকগাছা একটি গুরুত্বপূর্ণ নাম। ১৯৭১ সালের ৪ জুলাই পাইকগাছার বিখ্যাত ব্যবসা কেন্দ্র কপিলমুনি বাজারে রায়বাহাদুর বিনোদ বিহারী সাধুর বাড়িতে রাজাকার ক্যাম্প স্থাপিত হয়। ১৯৭১ সালের ৬ ডিসেম্বর সেই রাজাকার ক্যাম্পটি দখলের জন্য যুদ্ধকালীন কমান্ডার রহমত উল্যাহ দাদু এবং তাঁর সহযোগী ইউনুস আলী, স.ম. বাবর আলী, আবুল কালাম আজাদ সহ বীর মুক্তিযোদ্ধাদের নেতৃত্বে এক সাঁড়াশি অভিযান শুরু হয়। তিন দিন একটানা যুদ্ধের পর রাজাকার ও শান্তি কমিটির ১৫৬ জন সদস্যকে আত্মসমর্পণের পর বীর মুক্তিযোদ্ধারা বিজয়ী হন এবং ৯ ডিসেম্বর কপিলমুনি যুদ্ধের অবসান হয়। পরবর্তীতে ১৯৮২ সালের ৭ নভেম্বর প্রশাসনিক বিকেন্দ্রীকরণের আওতায় পাইকগাছা পূর্ণাঙ্গ উপজেলায় উন্নীত হয়।',
      icon: History,
      color: 'violet',
      isExpandable: true
    },
    {
      title: 'নামকরণের ইতিহাস',
      subtitle: 'পাইকগাছার নামকরণের ইতিহাস',
      description: 'পাইকগাছার নামকরণের পেছনে রয়েছে নানা কিংবদন্তি। কথিত আছে, অতীতে এই অঞ্চলে প্রচুর "পাইক" বা বরকন্দাজরা গাছে চড়ে পাহারা দিত বলে এর নাম হয়েছে "পাইকগাছা"। আবার অঞ্চলভেদে ভিন্ন ভিন্ন নামকরণও হয়েছে। যেমন- সরল খাঁ যে এলাকায় বাস করতেন তার নাম হয় "সরল"। গরুর রাখালদের আবাসস্থল "গোপালপুর" (যেখানে গোশালা ছিল তার নাম "ঘোষাল")। গদাইপুরের নিকটে যেখানে সৈন্যরা গড় কেটে ডাকাতদের বিরুদ্ধে প্রতিরোধ গড়ে তুলেছিল সেটি "গড়পার"। প্রাসাদের বন্দিদের আবাসস্থল "বন্দিকাটি" এবং প্রাসাদে বাতি জ্বালাত যারা তারা "বাতিখালী" এলাকায় থাকত। এভাবেই উপজেলার বিভিন্ন জনপদের নামকরণ করা হয়েছে।',
      icon: Info,
      color: 'orange',
      isExpandable: true
    },
    {
      title: 'প্রশাসনিক এলাকা ও তথ্য',
      subtitle: 'পাইকগাছা উপজেলার প্রশাসনিক ইউনিট',
      description: 'পাইকগাছা উপজেলা ১টি পৌরসভা ও ১০টি ইউনিয়ন পরিষদ নিয়ে গঠিত। পৌরসভা: পাইকগাছা পৌরসভা (খুলনা জেলার বৃহত্তম পৌরসভা)। ইউনিয়নসমূহ: হরিচালী, কপিলমুনি, লতা, দেলুটি, সোলাদানা, লস্কর, গদাইপুর, রাড়ুলী, চাঁদখালী ও গড়ইখালী ইউনিয়ন। প্রশাসনিক কোড: ৪০ ৪৭ ৬৪।',
      icon: Home,
      color: 'blue',
      isExpandable: true
    },
    {
      title: 'অর্থনীতি ও "সাদা সোনা"',
      subtitle: 'পাইকগাছার প্রধান অর্থনীতি',
      description: 'পাইকগাছার অর্থনীতি মূলত কৃষিনির্ভর এবং এটি "সাদা সোনা" বা চিংড়ি চাষের জন্য বিশ্ববিখ্যাত। বাগদা ও গলদা চিংড়ি এ অঞ্চলের প্রধান রপ্তানি পণ্য। এখানকার অধিকাংশ জমি এক ফসলি হলেও বর্ষা মৌসুমে প্রচুর চাষাবাদ হয়। এছাড়া ধান, আলু ও শাকসবজি প্রচুর পরিমাণে উৎপাদিত হয়। সুন্দরবন সংলগ্ন হওয়ায় মধু ও মাছ সংগ্রহ এখানকার মানুষের জীবনযাত্রার অবিচ্ছেদ্য অংশ। বর্তমানে এখানে মৎস্য শিল্প কেন্দ্রিক বিভিন্ন কল-কারখানা গড়ে উঠছে।',
      icon: Anchor,
      color: 'blue',
      isExpandable: true
    },
    {
      title: 'উল্লেখযোগ্য ব্যক্তিত্ব',
      subtitle: 'বিখ্যাত ব্যক্তিবর্গ',
      description: 'এ্যাড. শেখ মোহাম্মদ নূরুল হক - সাবেক জাতীয় সংসদ সদস্য ও রাজনীতিবিদ। শহীদ এম এ গফুর - সাবেক এমএনএ, ভাষা সৈনিক ও মুক্তিযুদ্ধের সংগঠক। রায় সাহেব বিনোদ বিহারী সাধু - আধুনিক কপিলমুনির রূপকার ও সহচরী বিদ্যামন্দিরের প্রতিষ্ঠাতা। মেহের মুসুল্লী - দানবীর। শামসুর রহমান - সাবেক এমপি ও শিক্ষাবিদ। সতীশ চক্রবর্তী - ব্রিটিশ বিরোধী বিপ্লবী। আক্তারুজ্জামান বাবু - বাংলাদেশী রাজনীতিবিদ ও সংসদ সদস্য। Shah Muhammad Ruhul Kuddus - সাবেক এমপি ও শিক্ষাবিদ। প্রফুল্ল চন্দ্র রায় - বিজ্ঞানী, শিক্ষাবিদ ও রসায়নবিদ। কাজী ইমদাদুল হক - ঔপন্যাসিক। শেখ রাজ্জাক আলী - সাবেক আইন প্রতিমন্ত্রী ও ডেপুটি স্পীকার এবং স্পীকার। স ম বাবর আলী - মুক্তিযোদ্ধা, জাতীয় সংসদের সাবেক কনিষ্ঠ এমপি, সাবেক উপজেলা চেয়ারম্যান।',
      icon: User,
      color: 'orange',
      isExpandable: true
    },
    {
      title: 'শিক্ষা প্রতিষ্ঠান',
      subtitle: 'উপজেলার উল্লেখযোগ্য শিক্ষা প্রতিষ্ঠান',
      description: 'কে, জি, এইচ, এফ মৌখালী ইউনাইটেড একাডেমী। ৮৫ নং কমলাপুর হাড়িয়ারডাঙ্গা সরকারী প্রাথমিক বিদ্যালয়। লক্ষ্মীখোলা কলেজিয়েট স্কুল। পাইকগাছা সরকারি বালিকা উচ্চ বিদ্যালয়। পাইকগাছা ভিলেজ মাধ্যমিক বিদ্যালয়। টাউন মাধ্যমিক বিদ্যালয়। পাইকগাছা সরকারি কলেজ। ই.সি.ডি কিন্ডারগার্টেন স্কুল। ফাতেমা প্রিক্যাডেট কিন্ডারগার্টেন স্কুল। পাইকগাছা সরকারি উচ্চ বিদ্যালয়। আবু হোসেন কলেজ। লস্কর কড়ুলিয়া মাধ্যমিক বিদ্যালয়। লস্কর পাইকগাছা ইসলামিয়া দাখিল মাদ্রাসা। শহীদ গফুর সরকারী প্রাথমিক বিদ্যালয়। কপোতাক্ষী মাধ্যমিক বিদ্যালয়। আর.কে.বি.কে.হরিশ্চন্দ্র কলেজিয়েট ইনস্টিটিউশন। রাড়ুলী ভূবন মোহিনী মাধ্যমিক বালিকা বিদ্যালয়। কে ডি এস মাধ্যমিক বিদ্যালয়। শহীদ কামরুল মেমোরিয়াল মাধ্যমিক বিদ্যালয়। কপিলমুনি কলেজ। কপিলমুনি জাফর আউলিয়া ফাজিল ডিগ্রি মাদ্রাসা। শহীদ জিয়া বালিকা বিদ্যালয়। কপিলমুনি সহচরী বিদ্যা মন্দির স্কুল অ্যান্ড কলেজ। কালিনগর কলেজ। হরিচালী মহিলা কলেজ। ফাসিয়ার রহমান মহিলা ডিগ্রি কলেজ। চাঁদখালী কলেজ। খড়িয়া নবারুন মাধ্যমিক বিদ্যালয়, খড়িয়া। বাসখালী সরকারি প্রাথমিক বিদ্যালয়। গড়ইখালী আলমশাহী ইনস্টিটিউট। কুমখালী মাধ্যমিক বিদ্যালয়।',
      icon: GraduationCap,
      color: 'blue',
      isExpandable: true
    }
  ];

  const koyraHistoryData = [
    {
      title: 'ভৌগোলিক অবস্থান',
      subtitle: 'কয়রা উপজেলার অবস্থান',
      description: 'কয়রা ভৌগোলিক অবস্থান ২২.৩৪১৭° উত্তর ৮৯.৩০০০° পূর্ব। এখানে ২৮০৬১ পরিবারের ইউনিট রয়েছে এবং মোট এলাকা ১৭৭৫.৪১ কিমি²।',
      icon: Info,
      color: 'blue'
    },
    {
      title: 'ভৌগোলিক সীমানা',
      subtitle: 'চারপাশের সীমানা',
      description: 'উত্তরে পাইকগাছা উপজেলা, দক্ষিণে বঙ্গোপসাগর ও সুন্দরবন, পূর্বে দাকোপ উপজেলা, পশ্চিমে সাতক্ষীরা জেলার শ্যামনগর ও আশাশুনি উপজেলা। এটি খুলনার সর্বদক্ষিণের শেষ সীমান্ত।',
      icon: MapPin,
      color: 'emerald'
    },
    {
      title: 'প্রশাসনিক ইউনিটসমূহ',
      subtitle: 'ইউনিয়ন ও গ্রামসমূহ',
      description: 'কয়রায় রয়েছে ৭টি ইউনিয়ন, ৭২টি মৌজা/মহল্লা এবং ১৩১টি গ্রাম। ইউনিয়নগুলি: আমাদী, বাগালী, মহেশ্বরীপুর, মহারাজপুর, কয়রা, উত্তর বেদকাশী ও দক্ষিণ বেদকাশী।',
      icon: Home,
      color: 'amber'
    },
    {
      title: 'সূচনা ও প্রশাসনিক গঠন',
      subtitle: 'উপজেলা গঠনের ইতিহাস',
      description: 'কয়রা ১৯৭৯ সালে থানা হিসেবে যাত্রা শুরু করে এবং পরবর্তীতে ১৯৮৩ সালের ৭ নভেম্বর এটি পূর্ণাঙ্গ উপজেলায় রূপান্তরিত হয়। এটি পূর্ণাঙ্গ উপজেলায় রূপান্তরিত হয়।',
      icon: History,
      color: 'orange'
    },
    {
      title: 'ঐতিহাসিক প্রেক্ষাপট ও নামকরণ',
      subtitle: 'নামকরণের ইতিহাস',
      description: '১৫শ শতাব্দীতে খান জাহান আলী (র.)-এর অনুসারীরা এখানে বসতি স্থাপন করেন। নামকরণ নিয়ে মতভেদ থাকলেও কাওরা গোষ্ঠী অথবা কয়লা পরিবহনের ঘাট থেকে "কয়রা" নামটি এসেছে বলে ধারণা করা হয়। অথবা কয়লা পরিবহনের ঘাট থেকে "কয়রা" নামটি এসেছে বলে ধারণা করা হয়।',
      icon: History,
      color: 'indigo'
    },
    {
      title: 'নদ-নদী ও সুন্দরবন',
      subtitle: 'প্রাকৃতিক সম্পদ',
      description: 'এটি কপোতাক্ষ, শাকবাড়িয়া ও শিবসা নদীবেষ্টিত জনপদ। কয়রাকে বলা হয় সুন্দরবনের প্রবেশদ্বার। উপজেলার দক্ষিণে সুন্দরবনের কাশিয়াবাদ রেঞ্জ অবস্থিত যা পর্যটনের অন্যতম আকর্ষণ।',
      icon: Waves,
      color: 'blue'
    },
    {
      title: 'পুরাকীর্তি ও দর্শনীয় স্থান',
      subtitle: 'ঐতিহাসিক স্থাপনা',
      description: 'খান জাহান আলী শৈলীর মসজিদকুঁড় ৯ গম্বুজ মসজিদ এবং সুন্দরবনের তীরে অবস্থিত মোগল আমলের শেষার্ধের মন্দির এর প্রধান আকর্ষণ।',
      icon: Landmark,
      color: 'violet'
    },
    {
      title: 'সংস্কৃতি ও নৃগোষ্ঠী',
      subtitle: 'লোকসংস্কৃতি ও ক্ষুদ্র নৃগোষ্ঠী',
      description: 'এখানে মাহাতো ও মুণ্ডা ক্ষুদ্র নৃগোষ্ঠীর বসবাস রয়েছে। বনবিবির পালা ও গাজীর গান এখানকার লোকসংস্কৃতির অবিচ্ছেদ্য অংশ। এখানকার লোকসংস্কৃতির অবিচ্ছেদ্য অংশ।',
      icon: User,
      color: 'rose'
    },
    {
      title: 'জনসংখ্যা ও জনমিতি (২০০১)',
      subtitle: 'জনসংখ্যার পরিসংখ্যান',
      description: '২০০১ সালের পরিসংখ্যান অনুযায়ী উপজেলার মোট জনসংখ্যা ছিল ১,৯২,৫৩৪ জন। পুরুষ ৯৫,৯৯৩ ও মহিলা ৯৬,৫৪১ জন। মুসলিম ১,৪৯,৩২১, হিন্দু ৪২,৪৬২ জন।',
      icon: User,
      color: 'emerald'
    },
    {
      title: 'সাক্ষরতা ও প্রশাসনিক তথ্য',
      subtitle: 'শিক্ষা ও অন্যান্য তথ্য',
      description: 'কয়রা উপজেলার শিক্ষার গড় হার ৫০.৪%। বিএসটি (ইউটিসি+৬) সময় অঞ্চল। পোস্ট কোড: ৯২৯০। প্রশাসনিক কোড: ৪০ ৪৭ ৫৩।',
      icon: GraduationCap,
      color: 'blue'
    },
    {
      title: 'মুক্তিযুদ্ধের স্মৃতি ও গৌরব',
      subtitle: 'মুক্তিযুদ্ধের ইতিহাস',
      description: 'মুক্তিযুদ্ধের সময় কয়রা উপজেলা ৯নং সেক্টরের অধীন ছিল। এখানে ৯ নং সাব-সেক্টর হেডকোয়ার্টার স্থাপিত হয়েছিল যেটা আমাদী ইউনিয়নে বাছড়বাড়ি-মনোরঞ্জন ক্যাম্প নামে সুপরিচিত এবং এখান থেকেই মুক্তিবাহিনী ও মুজিববাহিনীর মোট ২৩টি ক্যাম্প ও অধিকাংশ অভিযান পরিচালিত হতো। স্থানীয়ভাবে এ উপজেলায় মোট পাঁচটি ক্যাম্প গড়ে তোলা হয়। তা হলো, আমাদী ইউনিয়নের বিশ্বকবি ক্যাম্প (পরিচালনায়ঃ মুক্তিযোদ্ধা আব্দুল লতিফ), নাজমুল ক্যাম্প (পরিচালনায়ঃ মুক্তিযোদ্ধা কে, এম, মুজিবুর রহমান), নজরুল ক্যাম্প (পরিচালনায়ঃ মুক্তিযোদ্ধা আব্দুল হাকিম), কয়রা ইউনিয়নের ঝিলেঘাটা গ্রামে শহীদ নারায়ণ ক্যাম্প (পরিচালনায়ঃ মুক্তিযোদ্ধা কেরামত আলী, শেখ আব্দুল জলিল ও শামছুর রহমান) ও বাগালি ইউনিয়নের বামিয়া গ্রামে শহীদ সোহরাওয়ার্দী ক্যাম্প (পরিচালনায়ঃ মুক্তিযোদ্ধা রেজাউল করিম)। আহত মুক্তিযোদ্ধাদের চিকিৎসার ক্ষেত্রে ডাঃ রফিকুল ইসলামের নেতৃত্বে জায়গীরমহলে গঠিত গোপন চিকিৎসা কেন্দ্রটি গুরুত্বপূর্ণ ভূমিকা রাখে। মুক্তিযুদ্ধের স্মৃতিচিহ্নযুক্ত বধ্যভূমি ১ (কয়রা ৪ নং লঞ্চঘাট এলাকায় মড়িঘাটা) রয়েছে।',
      icon: History,
      color: 'rose',
      isExpandable: true
    },
    {
      title: 'উল্লেখযোগ্য ব্যক্তি',
      subtitle: 'বিখ্যাত ব্যক্তিত্ব',
      description: 'খান সাহেব কোমর উদ্দিন ঢালী - ব্রিটিশ সরকার কর্তৃক খানসাহেব উপাধিপ্রাপ্ত ও পাকিস্তান সরকার কর্তৃক সমাজসেবক তমগাহে খেদমত উপাধিপ্রাপ্ত। Shah Mohammad Ruhul Kuddus - রাজনীতিবিদা। রোমান সানা - স্বর্ণপদক বিজয়ী তীরন্দাজ। মাওলানা আবুল কালাম আজাদ - রাজনীতিবিদ (খুলনা ৬)।',
      icon: User,
      color: 'indigo',
      isExpandable: true
    },
    {
      title: 'হাট ও শিল্প',
      subtitle: 'ব্যবসা ও বাণিজ্য',
      description: 'হাট (বাজার): ঝিলিয়াঘাটা হাট, হুগলা হাট, আমাদি হাট, নাকশা হাট, ঘড়িলাল হাট, সুতার হাট, গুগরোকাটি হাট, খোড়লকাটি হাট, জুরসিং বাজার, কালনা বাজার, চাঁদ আলী মাছের কাঁটা, হরিহরপুর বাজার, ৬ নম্বর কয়রা গড়িয়া বাড়ী লঞ্চঘাট বাজার। এছাড়া এখানে বিভিন্ন মেলা অনুষ্ঠিত হয়। এর মধ্যে দক্ষিণ বেদকাশী বনবিবির মেলা, পদ্মপুকুর রথ মেলা, হরিহরপুর রথ মেলা উল্লেখযোগ্য। এছাড়াও বিলুপ্ত বা বিলুপ্তপ্রায় সনাতন বাহন পালকি, ঘোড়া ও গরুর গাড়ি এই অঞ্চলে বহুল প্রচলিত। শিল্প ও কল-কারখানা: এখানে বিভিন্ন শিল্প ও কল-কারখানা গড়ে উঠছে। এর মধ্যে চাল কল, তেল কল, ময়দা কল, কাঠ চেরাই কল, বরফ কল ইত্যাদি উল্লেখযোগ্য।',
      icon: Anchor,
      color: 'orange',
      isExpandable: true
    },
    {
      title: 'শিক্ষা প্রতিষ্ঠান',
      subtitle: 'উপজেলার শিক্ষা প্রতিষ্ঠানসমূহ',
      description: 'ভি. কে. এস. এ. গিলাবাড়ী পি. জি ইউনাইটেড একাডেমী। গ্রাজুয়েটস মাধ্যমিক বিদ্যালয়, মহারাজপুর, কয়রা। কপোতাক্ষ মহাবিদ্যালয় (১৯৮৪)। আমাদী জায়গীরমহল তাকিমুদ্দীন মাধ্যমিক বিদ্যালয় (১৯৪৪)। ১নং নাকশা সরকারি প্রাথমিক বিদ্যালয়। জোবেদা খানম কলেজ (১৯৯৬)। কোমরউদ্দিন উচ্চ বিদ্যালয়। কয়রা মদিনাবাদ হাই স্কুল। সুন্দরবন মাধ্যমিক বিদ্যালয়। উত্তর বেদকাশি মাধ্যমিক বিদ্যালয়। দক্ষিণ বেদকাশি মাধ্যমিক বিদ্যালয়। কয়রা সরকারী মহিলা কলেজ। কয়রা ছিদ্দিকীয়া ফাজিল (ডিগ্রি) মাদ্রাসা। কয়রা উত্তর চক কামিল মাদ্রাসা। কালনা আমিনিয়া কামিল (এম,এ) মাদ্রাসা। কয়রা মদিনাবাদ দাখিল মাদ্রাসা। উত্তর বেতকাশী হাবিবিয়া দাখিল মাদ্রাসা। কালনা মহিলা দাখিল মাদ্রাসা। কয়রা উত্তর চক মহিলা মাদ্রাসা। গোবরা দাখিল মাদ্রাসা। জয়পুর সিয়ারা লাইট দারুস সুন্নাহ দাখিল মাদ্রাসা। দেয়ারা অন্তাবুনিয়া দাখিল মাদ্রাসা। দাকেন মহেশ্বরীপুর দাখিল মাদ্রাসা। চৌকুনি ইসলামিয়া দাখিল মাদ্রাসা। চান্নির চক বি কে দাখিল মাদ্রাসা। বেজপাড়া হায়াতুন্নেছা দাখিল মাদ্রাসা। অর্জুনপুর আহসানিয়া দাখিল মাদ্রাসা। কয়রা অচ্ছিন মহিলা দাখিল মাদ্রাসা। খোরল মহিলা দাখিল মাদ্রাসা। কয়রা মদিনাবাদ দারুসুন্নাহ মহিলা দাখিল মাদ্রাসা। এম এ দারুল ইহসান দাখিল মাদ্রাসা। এম এম দারুস সুন্নাহ দাখিল মাদ্রাসা। নারানপুর মহিলা দাখিল মাদ্রাসা। পি কে এস এ আদর্শ দাখিল মাদ্রাসা। সাতহالية গাউসুল আজম দাখিল মাদ্রাসা। সুন্দরবন ছিদ্দিকীয়া দাখিল মাদ্রাসা। ঘুগরাঘাটি ফাজিল মাদ্রাসা। বে সিন মিম বায়লা হারানিয়া আলিম মাদ্রাসা। ডি এফ নাকশা আলিম মাদ্রাসা। কুশডাঙ্গা আলহাজ্ব কোমর উদ্দীন আলিম মাদ্রাসা। চান্নির চক এল সি কলেজিয়েট স্কুল। কয়রা শাকবাড়িয়া স্কুল এন্ড কলেজ। গড়িয়াবাড়ি সরকারি প্রাথমিক বিদ্যালয়। পাথর খালি সরকারি প্রাথমিক বিদ্যালয়। মনোরমা সরকারি প্রাথমিক বিদ্যালয়। ৫ নম্বর কয়রা স্যাটেলাইট সরকারি প্রাথমিক বিদ্যালয়। বড়বাড়ি সরকারি প্রাথমিক বিদ্যালয়। দিঘীরপাড় স্কুল এন্ড কলেজ। বড়বাড়ি মাধ্যমিক বিদ্যালয়।',
      icon: GraduationCap,
      color: 'blue',
      isExpandable: true
    }
  ];

  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const toggleExpand = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const handleBack = () => {
    if (currentView === 'koyra-places' || currentView === 'paikgacha-places') {
      setCurrentView('places');
    } else if (currentView === 'koyra-history' || currentView === 'paikgacha-history') {
      setCurrentView('history');
    } else if (currentView !== 'main') {
      setCurrentView('main');
    } else {
      onBack();
    }
  };

  const renderItems = () => {
    if (currentView === 'koyra-places' || currentView === 'paikgacha-places' || currentView === 'koyra-history' || currentView === 'paikgacha-history') {
      let data: any[] = [];
      let title = '';
      
      if (currentView === 'koyra-places') {
        data = koyraSightseeingData;
        title = 'কয়রা উপজেলার দর্শনীয় স্থান';
      } else if (currentView === 'paikgacha-places') {
        data = paikgachaSightseeingData;
        title = 'পাইকগাছা উপজেলার দর্শনীয় স্থান';
      } else if (currentView === 'koyra-history') {
        data = koyraHistoryData;
        title = 'কয়রা উপজেলা: সুন্দরবন সংলগ্ন ঐতিহ্য...';
      } else if (currentView === 'paikgacha-history') {
        data = paikgachaHistoryData;
        title = 'পাইকগাছা উপজেলা: দক্ষিণ খুলনার প্রা...';
      }

      return (
        <>
          {/* Header */}
          <div className={`px-6 pt-4 pb-4 shadow-md border-b transition-colors duration-300 relative z-10 ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-gradient-to-b from-[#00A3FF] to-[#0085FF] border-none rounded-b-[35px]'
          }`}>
            <div className="flex items-center justify-between">
              <div className="w-10"></div>
              
              <div className="text-center flex-1">
                <h1 className="font-bengali font-bold text-[16px] leading-none text-white">
                  {title}
                </h1>
                <p className="font-bengali text-[9px] font-medium opacity-80 text-white/70 mt-2">
                  ঐতিহ্য ও সংস্কৃতির সংগৃহীত তথ্যমালা
                </p>
              </div>

              <button 
                onClick={toggleDarkMode}
                className={`p-1.5 rounded-lg transition-colors ${isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-white/10 text-white'}`}
              >
                {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-32">
            {data.map((item, index) => {
              const isExpanded = expandedItems.includes(index);
              const shouldShowReadMore = item.isExpandable;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-5 rounded-[32px] border shadow-sm relative overflow-hidden ${
                    isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
                  }`}
                >
                  <div className="flex gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                      isDarkMode ? 'bg-slate-800' : 'bg-slate-50'
                    }`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                        item.color === 'emerald' ? 'border-emerald-500 text-emerald-500' :
                        item.color === 'amber' ? 'border-amber-500 text-amber-500' :
                        item.color === 'orange' ? 'border-orange-500 text-orange-500' :
                        item.color === 'blue' ? 'border-blue-500 text-blue-500' :
                        item.color === 'indigo' ? 'border-indigo-500 text-indigo-500' :
                        item.color === 'green' ? 'border-green-500 text-green-500' :
                        item.color === 'violet' ? 'border-violet-500 text-violet-500' :
                        item.color === 'rose' ? 'border-rose-500 text-rose-500' :
                        'border-cyan-500 text-cyan-500'
                      }`}>
                        <item.icon size={20} strokeWidth={2.5} />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h3 className={`font-bold font-bengali text-lg leading-tight ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                        {item.title}
                      </h3>
                      <p className={`font-bengali text-xs font-bold ${
                        item.color === 'emerald' ? 'text-emerald-500' :
                        item.color === 'amber' ? 'text-amber-500' :
                        item.color === 'orange' ? 'text-orange-500' :
                        item.color === 'blue' ? 'text-blue-500' :
                        item.color === 'indigo' ? 'text-indigo-500' :
                        item.color === 'green' ? 'text-green-500' :
                        item.color === 'violet' ? 'text-violet-500' :
                        item.color === 'rose' ? 'text-rose-500' :
                        'text-cyan-500'
                      }`}>
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className={`font-bengali text-sm leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} ${
                      shouldShowReadMore && !isExpanded ? 'line-clamp-3' : ''
                    }`}>
                      {item.description}
                    </p>
                    {shouldShowReadMore && (
                      <button
                        onClick={() => toggleExpand(index)}
                        className={`mt-2 flex items-center gap-1 font-bengali text-sm font-bold transition-colors ${
                          isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                        }`}
                      >
                        {isExpanded ? 'সংক্ষিপ্ত করুন' : 'আরও পড়ুন'}
                        <ArrowRight className={`transition-transform ${isExpanded ? '-rotate-90' : 'rotate-90'}`} size={14} />
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </>
      );
    }

    const items = currentView === 'main' ? mainMenuItems : currentView === 'history' ? historyItems : placesItems;
    const title = currentView === 'main' ? 'ঐতিহ্য' : currentView === 'history' ? 'ইতিহাস' : 'দর্শনীয় স্থান';

    return (
      <>
        {/* Header */}
        <div className={`px-6 pt-4 pb-4 shadow-md border-b transition-colors duration-300 relative z-10 ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-gradient-to-b from-[#00A3FF] to-[#0085FF] border-none rounded-b-[35px]'
        }`}>
          <div className="flex items-center justify-between">
            <div className="w-10"></div>
            
            <div className="text-center flex-1">
              <h1 className="font-bengali font-bold text-[18px] leading-none text-white">
                {title}
              </h1>
              <div className="h-4 mt-2 overflow-hidden">
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

        {/* Content */}
        <div className="flex-1 p-4 space-y-2.5 mt-4">
          {items.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              onClick={'action' in item ? item.action : undefined}
              className={`w-full p-3 rounded-[20px] shadow-sm border flex items-center group transition-all active:scale-[0.98] ${
                isDarkMode 
                  ? 'bg-slate-900 border-slate-800 hover:bg-slate-800' 
                  : 'bg-white border-slate-100 hover:bg-slate-50 shadow-[0_4px_20px_rgb(0,0,0,0.03)]'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                isDarkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-50 text-slate-400'
              }`}>
                <ArrowRight size={16} />
              </div>
              
              <span className={`flex-1 text-center font-bold font-bengali text-sm ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                {item.label}
              </span>

              <div className="w-8 flex justify-end">
                <ArrowRight size={14} className={`opacity-0 group-hover:opacity-100 transition-opacity ${isDarkMode ? 'text-slate-600' : 'text-slate-200'}`} />
              </div>
            </motion.button>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 flex flex-col ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      {renderItems()}

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

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';
import SplashScreen from './components/Splash/SplashScreen';
import ServiceMenu from './components/Services/ServiceMenu';
import ServicePage from './components/Services/ServicePage';
import WeatherPage from './components/Weather/WeatherPage';
import HeritagePage from './components/Heritage/HeritagePage';
import BusPage from './components/Bus/BusPage';
import AdminDashboard from './components/Admin/AdminDashboard';
import { services } from './components/Services/serviceData';

type AppSection = 'splash' | 'menu' | 'service-detail' | 'admin';

export default function App() {
  const [currentSection, setCurrentSection] = useState<AppSection>('splash');
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('isAdminLoggedIn') === 'true';
  });

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  // Ensure theme is applied to document element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleExplore = () => {
    setCurrentSection('menu');
  };

  const handleServiceClick = (id: string) => {
    setActiveServiceId(id);
    setCurrentSection('service-detail');
  };

  const handleAdminAccess = () => {
    setIsAdminLoggedIn(true);
    localStorage.setItem('isAdminLoggedIn', 'true');
    setCurrentSection('admin');
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('isAdminLoggedIn');
    setCurrentSection('menu');
  };

  const activeService = services.find(s => s.id === activeServiceId);

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      {currentSection === 'splash' && (
        <SplashScreen 
          onExplore={handleExplore} 
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
      )}
      
      {currentSection === 'menu' && (
        <ServiceMenu 
          onBack={() => setCurrentSection('splash')} 
          onServiceClick={handleServiceClick}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          onAdminAccess={handleAdminAccess}
          isAdminLoggedIn={isAdminLoggedIn}
        />
      )}

      {currentSection === 'service-detail' && activeService && (
        activeServiceId === 'weather' ? (
          <WeatherPage 
            isDarkMode={isDarkMode}
            onBack={() => setCurrentSection('menu')}
            toggleDarkMode={toggleDarkMode}
          />
        ) : activeServiceId === 'heritage' ? (
          <HeritagePage 
            isDarkMode={isDarkMode}
            onBack={() => setCurrentSection('menu')}
            toggleDarkMode={toggleDarkMode}
          />
        ) : activeServiceId === 'bus' ? (
          <BusPage 
            isDarkMode={isDarkMode}
            onBack={() => setCurrentSection('menu')}
            toggleDarkMode={toggleDarkMode}
          />
        ) : (
          <ServicePage 
            title={activeService.label} 
            onBack={() => setCurrentSection('menu')} 
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
        )
      )}

      {currentSection === 'admin' && (
        <AdminDashboard 
          onBack={() => setCurrentSection('menu')} 
          onLogout={handleAdminLogout}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
      )}
    </div>
  );
}

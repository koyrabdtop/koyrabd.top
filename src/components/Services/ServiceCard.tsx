/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ServiceItem } from './serviceData';

interface ServiceCardProps {
  service: ServiceItem;
  onClick: (id: string) => void;
  isDarkMode: boolean;
  key?: string | number;
}

export function ServiceCard({ service, onClick, isDarkMode }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      onClick={() => onClick(service.id)}
      className={`flex flex-col items-center justify-center p-2.5 rounded-[28px] shadow-[0_4px_12px_rgba(0,0,0,0.03)] border transition-all duration-300 w-full ${
        isDarkMode 
          ? 'bg-slate-900 border-slate-800' 
          : 'bg-white border-slate-50'
      }`}
    >
      <div 
        className="w-15 h-15 rounded-[22px] flex items-center justify-center mb-1.5 shadow-sm"
        style={{ backgroundColor: service.bgColor }}
      >
        <Icon size={32} style={{ color: service.color }} strokeWidth={1.5} />
      </div>
      <span className={`font-bengali text-[12px] font-bold text-center leading-tight transition-colors duration-300 ${
        isDarkMode ? 'text-slate-200' : 'text-slate-900'
      }`}>
        {service.label}
      </span>
    </motion.button>
  );
}

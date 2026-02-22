/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  ShieldAlert, 
  History, 
  CloudSun, 
  Bus, 
  Phone, 
  Notebook, 
  ShoppingBag, 
  Newspaper, 
  Scale, 
  MessageCircle, 
  HeartPulse, 
  UserCircle 
} from 'lucide-react';

export interface ServiceItem {
  id: string;
  label: string;
  icon: any;
  color: string;
  bgColor: string;
}

export const services: ServiceItem[] = [
  { id: 'hotline', label: 'হটলাইন', icon: ShieldAlert, color: '#FF5252', bgColor: '#FFF5F5' },
  { id: 'heritage', label: 'ঐতিহ্য', icon: History, color: '#8D6E63', bgColor: '#F5F0EE' },
  { id: 'weather', label: 'আবহাওয়া', icon: CloudSun, color: '#29B6F6', bgColor: '#E1F5FE' },
  { id: 'bus', label: 'বাস', icon: Bus, color: '#FB8C00', bgColor: '#FFF3E0' },
  { id: 'mobile', label: 'মোবাইল নাম্বার', icon: Phone, color: '#7E57C2', bgColor: '#F3E5F5' },
  { id: 'diary', label: 'ডিজিটাল খাতা', icon: Notebook, color: '#1E88E5', bgColor: '#E3F2FD' },
  { id: 'market', label: 'অনলাইন হাট', icon: ShoppingBag, color: '#FBC02D', bgColor: '#FFFDE7' },
  { id: 'post', label: 'কেপি পোস্ট', icon: Newspaper, color: '#43A047', bgColor: '#E8F5E9' },
  { id: 'legal', label: 'আইনি সেবা', icon: Scale, color: '#1976D2', bgColor: '#E3F2FD' },
  { id: 'chat', label: 'কেপি চ্যাট', icon: MessageCircle, color: '#00BCD4', bgColor: '#E0F7FA' },
  { id: 'medical', label: 'চিকিৎসা সেবা', icon: HeartPulse, color: '#EC407A', bgColor: '#FCE4EC' },
  { id: 'profile', label: 'আমার প্রোফাইল', icon: UserCircle, color: '#546E7A', bgColor: '#ECEFF1' },
];

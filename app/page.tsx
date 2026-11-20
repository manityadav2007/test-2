'use client';

import React, { useState, useEffect } from 'react';

interface Tournament {
  id: string;
  title: string;
  mode: 'Solo' | 'Duo' | 'Squad' | 'Clash Squad';
  map: string;
  category: 'all' | 'solo' | 'duo' | 'squad' | 'clash' | 'free';
  startTime: string;
  prizePool: number;
  perKill: number;
  entryFee: number;
  slotsFilled: number;
  totalSlots: number;
  featured?: boolean;
  isFree?: boolean;
}

const TOURNAMENTS: Tournament[] = [
  {
    id: 'ff-409',
    title: 'FFPL Grand Championship #409',
    mode: 'Solo',
    map: 'Bermuda',
    category: 'solo',
    startTime: 'Starts in 15m',
    prizePool: 25000,
    perKill: 10,
    entryFee: 40,
    slotsFilled: 44,
    totalSlots: 48,
    featured: true,
  },
  {
    id: 'ff-102',
    title: 'Daily Elite Squad Battle #102',
    mode: 'Squad',
    map: 'Purgatory',
    category: 'squad',
    startTime: 'Starts in 30m',
    prizePool: 5000,
    perKill: 15,
    entryFee: 100,
    slotsFilled: 18,
    totalSlots: 25,
  },
  {
    id: 'ff-88',
    title: 'Newbie & Pro Solo Giveaway #88',
    mode: 'Solo',
    map: 'Bermuda Remastered',
    category: 'free',
    startTime: 'Starts in 1h 10m',
    prizePool: 1000,
    perKill: 2,
    entryFee: 0,
    slotsFilled: 45,
    totalSlots: 48,
    isFree: true,
  },
  {
    id: 'ff-21',
    title: 'CS Pro Knockout Series #21',
    mode: 'Clash Squad',
    map: 'Factory / Clocktower',
    category: 'clash',
    startTime: 'Starts in 2h 00m',
    prizePool: 3000,
    perKill: 0,
    entryFee: 150,
    slotsFilled: 6,
    totalSlots: 8,
  },
  {
    id: 'ff-54',
    title: 'Alpine Duo Showdown #54',
    mode: 'Duo',
    map: 'Alpine',
    category: 'duo',
    startTime: 'Starts in 3h 30m',
    prizePool: 2000,
    perKill: 10,
    entryFee: 50,
    slotsFilled: 20,
    totalSlots: 24,
  },
  {
    id: 'ff-12',
    title: 'High Roller Solo Master #12',
    mode: 'Solo',
    map: 'Kalahari',
    category: 'solo',
    startTime: 'Tomorrow 6:00 PM',
    prizePool: 10000,
    perKill: 50,
    entryFee: 200,
    slotsFilled: 32,
    totalSlots: 48,
  },
  {
    id: 'ff-15',
    title: 'Community Squad Giveaway #15',
    mode: 'Squad',
    map: 'Bermuda',
    category: 'free',
    startTime: 'Starts in 5h 45m',
    prizePool: 1500,
    perKill: 5,
    entryFee: 0,
    slotsFilled: 24,
    totalSlots: 25,
    isFree: true,
  }
];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [walletBalance, setWalletBalance] = useState<number>(340.00);
  const [isRegModalOpen, setIsRegModalOpen] = useState<boolean>(false);
  const [selectedMatch, setSelectedMatch] = useState<Tournament | null>(null);
  const [ign, setIgn] = useState<string>('V9•VIPER');
  const [uid, setUid] = useState<string>('849204192');
  const [teamName, setTeamName] = useState<string>('VIPER SQUAD');
  const [registeredMatches, setRegisteredMatches] = useState<string[]>(['ff-102']);
  
  // Wallet modal state
  const [isWalletModalOpen, setIsWalletModalOpen] = useState<boolean>(false);
  const [walletTab, setWalletTab] = useState<'add' | 'withdraw'>('add');
  const [customAmount, setCustomAmount] = useState<string>('100');
  const [withdrawAddress, setWithdrawAddress] = useState<string>('viper@upi');
  const [withdrawAmount, setWithdrawAmount] = useState<string>('100');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Leaderboard filter
  const [lbFilter, setLbFilter] = useState<'weekly' | 'alltime'>('weekly');

  // Toast State
  const [toast, setToast] = useState<{ show: boolean; msg: string; type: 'success' | 'error' }>({ show: false, msg: '', type: 'success' });

  // Room ID Countdown Mock Timer
  const [countdown, setCountdown] = useState({ minutes: 38, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { minutes: prev.minutes - 1, seconds: 59 };
        return { minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const triggerToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ show: false, msg: '', type: 'success' }), 3200);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    triggerToast(`${label} copied to clipboard!`);
  };

  const openRegister = (tourney: Tournament) => {
    setSelectedMatch(tourney);
    setIsRegModalOpen(true);
  };

  const confirmRegistration = () => {
    if (!ign.trim() || !uid.trim()) {
      triggerToast('Please provide valid Free Fire IGN and Player UID', 'error');
      return;
    }
    if (selectedMatch) {
      if (selectedMatch.entryFee > walletBalance) {
        triggerToast('Insufficient wallet balance! Please add funds.', 'error');
        setIsWalletModalOpen(true);
        setWalletTab('add');
        return;
      }
      setWalletBalance((prev) => prev - selectedMatch.entryFee);
      setRegisteredMatches((prev) => [...prev, selectedMatch.id]);
      setIsRegModalOpen(false);
      triggerToast(`Successfully registered for ${selectedMatch.title}! Slot Confirmed.`);
    }
  };

  const handleAddCash = () => {
    const num = parseFloat(customAmount);
    if (isNaN(num) || num <= 0) {
      triggerToast('Please enter a valid deposit amount', 'error');
      return;
    }
    triggerToast(`Processing payment of ₹${num} via UPI...`);
    setTimeout(() => {
      setWalletBalance((prev) => prev + num);
      setIsWalletModalOpen(false);
      triggerToast(`₹${num} added to your wallet successfully!`);
    }, 1500);
  };

  const handleWithdraw = () => {
    const num = parseFloat(withdrawAmount);
    if (isNaN(num) || num < 50) {
      triggerToast('Minimum withdrawal amount is ₹50', 'error');
      return;
    }
    if (num > walletBalance) {
      triggerToast('Withdrawal amount exceeds wallet balance', 'error');
      return;
    }
    setWalletBalance((prev) => prev - num);
    setIsWalletModalOpen(false);
    triggerToast(`Withdrawal of ₹${num} to ${withdrawAddress} initiated!`);
  };

  const filteredTournaments = TOURNAMENTS.filter((t) => {
    const matchesCategory = activeFilter === 'all' || 
      (activeFilter === 'free' ? t.isFree : t.category === activeFilter);
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      t.map.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#090a0f] text-gray-100 font-sans selection:bg-orange-500 selection:text-white">
      {/* TOP ANNOUNCEMENT TICKER */}
      <div className="bg-gradient-to-r from-orange-600 via-red-600 to-amber-600 text-white text-xs font-bold py-2 px-4 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 truncate">
            <span className="bg-black/40 text-yellow-300 px-2 py-0.5 rounded text-[10px] uppercase font-mono animate-pulse">
              SEASON 4 LIVE
            </span>
            <p className="truncate text-xs tracking-wide">
              🔥 FREE FIRE PRO LEAGUE REGISTRATIONS OPEN! PRIZE POOL: ₹1,50,000 + DIRECT QUALIFIER SLOTS!
            </p>
          </div>
          <div className="hidden md:flex items-center space-x-6 text-[11px] uppercase tracking-wider font-semibold">
            <span className="flex items-center space-x-1">
              <svg className="w-3.5 h-3.5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 00-8 8v5a3 3 0 003 3h1a1 1 0 001-1v-4a1 1 0 00-1-1H4v-2a6 6 0 1112 0v2h-2a1 1 0 00-1 1v4a1 1 0 001 1h1a3 3 0 003-3v-5a8 8 0 00-8-8z"/></svg>
              <span>24/7 Support: #ffa-discord</span>
            </span>
            <span className="flex items-center space-x-1 text-emerald-300">
              <svg className="w-3.5 h-3.5" fill=
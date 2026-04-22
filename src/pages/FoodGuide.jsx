import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { foodGuide } from '../data/bengaliData';
import { CheckCircle2, XCircle, Clock, Ruler, ChefHat, Droplets, MapPin } from 'lucide-react';

const FoodGuide = () => {
  const { activeProfile, toggleFoodItem, foodChecklist } = useAppContext();
  
  const getAgeGroup = () => {
    if (!activeProfile?.birthDate) return '0-6';
    const today = new Date();
    const birth = new Date(activeProfile.birthDate);
    const months = (today.getFullYear() - birth.getFullYear()) * 12 + (today.getMonth() - birth.getMonth());
    
    if (months <= 6) return '0-6';
    if (months <= 8) return '6-8';
    if (months <= 10) return '8-10';
    if (months <= 12) return '10-12';
    if (months <= 24) return '1-2';
    if (months <= 36) return '2-3';
    return '3-5';
  };

  const [selectedAge, setSelectedAge] = useState(getAgeGroup());
  const currentFood = foodGuide[selectedAge];

  const ageGroups = [
    { key: '0-6', label: '০-৬ মাস' },
    { key: '6-8', label: '৬-৮ মাস' },
    { key: '8-10', label: '৮-১০ মাস' },
    { key: '10-12', label: '১০-১২ মাস' },
    { key: '1-2', label: '১-২ বছর' },
    { key: '2-3', label: '২-৩ বছর' },
    { key: '3-5', label: '৩-৫ বছর' }
  ];

  const isChecked = (item) => {
    return !!foodChecklist[`${activeProfile?.id}_${selectedAge}_${item}`];
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Age Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {ageGroups.map(age => (
          <button
            key={age.key}
            onClick={() => setSelectedAge(age.key)}
            className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
              selectedAge === age.key
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            {age.label}
          </button>
        ))}
      </div>

      {/* Title */}
      <div className="glass-card rounded-2xl p-5 backdrop-blur-xl bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-white/20">
        <h2 className="text-2xl font-bold text-white">{currentFood?.title}</h2>
        <p className="text-white/70 mt-1">খাবার গাইডলাইন</p>
      </div>

      {/* Can Feed */}
      <div className="glass-card rounded-2xl p-5 backdrop-blur-xl bg-white/10 border border-white/20">
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle2 className="w-6 h-6 text-green-400" />
          <h3 className="text-lg font-semibold text-white">✅ যা খাওয়ানো যাবে</h3>
        </div>
        <div className="space-y-2">
          {currentFood?.canFeed.map((item, idx) => (
            <button
              key={idx}
              onClick={() => toggleFoodItem(`${selectedAge}_can_${idx}`)}
              className={`w-full text-left p-3 rounded-xl transition-all flex items-center gap-3 ${
                isChecked(`${selectedAge}_can_${idx}`)
                  ? 'bg-green-500/20 border border-green-500/50'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                isChecked(`${selectedAge}_can_${idx}`)
                  ? 'border-green-400 bg-green-400'
                  : 'border-white/30'
              }`}>
                {isChecked(`${selectedAge}_can_${idx}`) && (
                  <CheckCircle2 className="w-3 h-3 text-white" />
                )}
              </div>
              <span className={`text-sm ${isChecked(`${selectedAge}_can_${idx}`) ? 'text-green-300 line-through' : 'text-white'}`}>
                {item}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Cannot Feed */}
      <div className="glass-card rounded-2xl p-5 backdrop-blur-xl bg-white/10 border border-white/20">
        <div className="flex items-center gap-3 mb-4">
          <XCircle className="w-6 h-6 text-red-400" />
          <h3 className="text-lg font-semibold text-white">❌ যা একদম খাওয়ানো যাবে না</h3>
        </div>
        <div className="space-y-2">
          {currentFood?.cannotFeed.map((item, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
              <span className="text-sm text-red-300">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule */}
      <div className="glass-card rounded-2xl p-5 backdrop-blur-xl bg-white/10 border border-white/20">
        <div className="flex items-center gap-3 mb-3">
          <Clock className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">🕐 কখন খাওয়াবে</h3>
        </div>
        <p className="text-white/80 text-sm">{currentFood?.schedule}</p>
      </div>

      {/* Quantity */}
      <div className="glass-card rounded-2xl p-5 backdrop-blur-xl bg-white/10 border border-white/20">
        <div className="flex items-center gap-3 mb-3">
          <Ruler className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-semibold text-white">📏 কতটুকু খাওয়াবে</h3>
        </div>
        <p className="text-white/80 text-sm">{currentFood?.quantity}</p>
      </div>

      {/* Preparation */}
      <div className="glass-card rounded-2xl p-5 backdrop-blur-xl bg-white/10 border border-white/20">
        <div className="flex items-center gap-3 mb-3">
          <ChefHat className="w-5 h-5 text-yellow-400" />
          <h3 className="text-lg font-semibold text-white">🥣 কিভাবে বানাবে</h3>
        </div>
        <p className="text-white/80 text-sm">{currentFood?.preparation}</p>
      </div>

      {/* Water */}
      <div className="glass-card rounded-2xl p-5 backdrop-blur-xl bg-white/10 border border-white/20">
        <div className="flex items-center gap-3 mb-3">
          <Droplets className="w-5 h-5 text-cyan-400" />
          <h3 className="text-lg font-semibold text-white">💧 পানি</h3>
        </div>
        <p className="text-white/80 text-sm">{currentFood?.water}</p>
      </div>

      {/* Bangladeshi Foods */}
      <div className="glass-card rounded-2xl p-5 backdrop-blur-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-white/20">
        <div className="flex items-center gap-3 mb-3">
          <MapPin className="w-5 h-5 text-green-400" />
          <h3 className="text-lg font-semibold text-white">🇧🇩 বাংলাদেশি বিশেষ খাবার</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {currentFood?.bangladeshi.map((item, idx) => (
            <span key={idx} className="px-3 py-2 bg-green-500/20 text-green-300 rounded-xl text-sm">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodGuide;

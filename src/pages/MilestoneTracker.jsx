import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { milestones } from '../data/bengaliData';
import { Brain, Activity, MessageCircle, Users, CheckSquare, Square } from 'lucide-react';

export default function MilestoneTracker() {
  const { activeProfile, milestoneChecklist, toggleMilestone } = useAppContext();
  const [selectedMonth, setSelectedMonth] = useState('1');

  if (!activeProfile) return null;

  const currentMilestones = milestones[selectedMonth];
  const categories = [
    { id: 'physical', label: 'শারীরিক বিকাশ', icon: <Activity className="w-5 h-5 text-green-300" /> },
    { id: 'mental', label: 'মানসিক বিকাশ', icon: <Brain className="w-5 h-5 text-blue-300" /> },
    { id: 'language', label: 'ভাষা ও যোগাযোগ', icon: <MessageCircle className="w-5 h-5 text-yellow-300" /> },
    { id: 'social', label: 'সামাজিক বিকাশ', icon: <Users className="w-5 h-5 text-pink-300" /> }
  ];

  const calculateProgress = () => {
    let total = 0;
    let completed = 0;
    
    categories.forEach(cat => {
      currentMilestones[cat.id].forEach(m => {
        total++;
        if (milestoneChecklist[`${activeProfile.id}_${selectedMonth}_${cat.id}_${m}`]) {
          completed++;
        }
      });
    });
    
    return total === 0 ? 0 : Math.round((completed / total) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-white mb-2">মাইলস্টোন ট্র্যাকার</h2>
        <p className="text-white/80">শিশুর বিকাশের ধাপসমূহ নজরে রাখুন</p>
      </div>

      <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
        {Object.keys(milestones).map((month) => (
          <button
            key={month}
            onClick={() => setSelectedMonth(month)}
            className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              selectedMonth === month
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            {month} মাস
          </button>
        ))}
      </div>

      <div className="glass-card p-4 rounded-2xl flex items-center justify-between">
        <span className="text-white font-semibold">{selectedMonth} মাসের প্রগ্রেস</span>
        <div className="w-1/2 h-2.5 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-500" 
            style={{ width: `${calculateProgress()}%` }}
          />
        </div>
        <span className="text-white font-bold">{calculateProgress()}%</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((category) => (
          <div key={category.id} className="glass-card rounded-2xl overflow-hidden">
            <div className="p-4 bg-white/5 border-b border-white/10 flex items-center gap-2">
              {category.icon}
              <h3 className="text-lg font-bold text-white">{category.label}</h3>
            </div>
            <div className="p-4 space-y-3">
              {currentMilestones[category.id].map((milestone, idx) => {
                const isCompleted = milestoneChecklist[`${activeProfile.id}_${selectedMonth}_${category.id}_${milestone}`];
                
                return (
                  <div 
                    key={idx} 
                    className="flex items-start gap-3 cursor-pointer group"
                    onClick={() => toggleMilestone(`${selectedMonth}_${category.id}_${milestone}`)}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isCompleted ? (
                        <CheckSquare className="w-5 h-5 text-pink-400 animate-bounce-check" />
                      ) : (
                        <Square className="w-5 h-5 text-white/40 group-hover:text-white/60 transition-colors" />
                      )}
                    </div>
                    <span className={`text-sm ${isCompleted ? 'text-white/60 line-through' : 'text-white/90 group-hover:text-white'}`}>
                      {milestone}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

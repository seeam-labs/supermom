import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { checklists } from '../data/bengaliData';
import { CheckSquare, Square, Sun, Moon, Calendar, Activity, Backpack, ShieldAlert } from 'lucide-react';

export default function ChecklistHub() {
  const { activeProfile, checklistProgress, updateChecklistProgress } = useAppContext();
  const [activeTab, setActiveTab] = useState('morning');

  if (!activeProfile) return null;

  const tabs = [
    { id: 'morning', label: 'সকাল', icon: <Sun className="w-4 h-4" /> },
    { id: 'night', label: 'রাত', icon: <Moon className="w-4 h-4" /> },
    { id: 'weekly', label: 'সাপ্তাহিক', icon: <Calendar className="w-4 h-4" /> },
    { id: 'monthly', label: 'মাসিক', icon: <Activity className="w-4 h-4" /> },
    { id: 'outing', label: 'বাইরে যাওয়া', icon: <Backpack className="w-4 h-4" /> },
    { id: 'safety', label: 'নিরাপত্তা', icon: <ShieldAlert className="w-4 h-4" /> }
  ];

  const currentChecklist = checklists[activeTab];
  // Format for stored progress: activeProfileId_checklistType -> array of completed indices
  const progressKey = `${activeProfile.id}_${activeTab}`;
  const completedItems = checklistProgress[progressKey] || [];

  const toggleItem = (index) => {
    let newProgress = [...completedItems];
    if (newProgress.includes(index)) {
      newProgress = newProgress.filter(i => i !== index);
    } else {
      newProgress.push(index);
    }
    updateChecklistProgress(activeTab, newProgress);
  };

  const calculateProgress = () => {
    if (!currentChecklist.length) return 0;
    return Math.round((completedItems.length / currentChecklist.length) * 100);
  };

  const progress = calculateProgress();

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-white mb-2">চেকলিস্ট হাব</h2>
        <p className="text-white/80">দৈনন্দিন ও প্রয়োজনীয় কাজের তালিকা</p>
      </div>

      <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            {tabs.find(t => t.id === activeTab)?.label} চেকলিস্ট
          </h3>
          <span className="text-white/80 text-sm font-medium">{progress}% সম্পন্ন</span>
        </div>
        
        {/* Progress bar line */}
        <div className="h-1 bg-white/10 w-full">
          <div 
            className="h-full bg-gradient-to-r from-purple-400 to-pink-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="p-4 space-y-2">
          {currentChecklist.map((item, idx) => {
            const isCompleted = completedItems.includes(idx);
            
            return (
              <div 
                key={idx} 
                className={`flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer ${
                  isCompleted ? 'bg-white/5' : 'hover:bg-white/10'
                }`}
                onClick={() => toggleItem(idx)}
              >
                <div className="shrink-0">
                  {isCompleted ? (
                    <CheckSquare className="w-6 h-6 text-pink-400 animate-bounce-check" />
                  ) : (
                    <Square className="w-6 h-6 text-white/40" />
                  )}
                </div>
                <span className={`text-base ${isCompleted ? 'text-white/50 line-through' : 'text-white'}`}>
                  {item}
                </span>
              </div>
            );
          })}
        </div>
        
        <div className="p-4 border-t border-white/10 bg-white/5">
          <button 
            onClick={() => updateChecklistProgress(activeTab, [])}
            className="text-sm text-pink-300 hover:text-pink-200 transition-colors"
          >
            রিসেট চেকলিস্ট
          </button>
        </div>
      </div>
    </div>
  );
}

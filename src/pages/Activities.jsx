import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { activities } from '../data/bengaliData';
import { CheckCircle2, Circle, Clock, Activity as ActivityIcon } from 'lucide-react';

export default function Activities() {
  const { activeProfile, activityChecklist, toggleActivity } = useAppContext();
  const [selectedAge, setSelectedAge] = useState(Object.keys(activities)[0]);

  if (!activeProfile) return null;

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-white mb-2">এক্টিভিটি ও ব্যায়াম</h2>
        <p className="text-white/80">শিশুর মানসিক ও শারীরিক বিকাশের জন্য প্রতিদিনের খেলাধুলা</p>
      </div>

      {/* Age Selector */}
      <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
        {Object.keys(activities).map((ageKey) => (
          <button
            key={ageKey}
            onClick={() => setSelectedAge(ageKey)}
            className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              selectedAge === ageKey
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            {ageKey} মাস
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activities[selectedAge].map((activity, index) => {
          const isCompleted = activityChecklist[`${activeProfile.id}_${activity.name}`] || false;
          
          return (
            <div 
              key={index} 
              className={`glass-card p-4 sm:p-5 rounded-2xl transition-all cursor-pointer border ${
                isCompleted ? 'border-green-400/50 bg-green-900/10' : 'border-white/10 hover:border-white/30'
              }`}
              onClick={() => toggleActivity(activity.name)}
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl mt-1">{activity.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">{activity.name}</h3>
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 text-green-400 animate-bounce-check" />
                    ) : (
                      <Circle className="w-6 h-6 text-white/30" />
                    )}
                  </div>
                  
                  <div className="mt-2 space-y-2 text-sm text-white/80">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-purple-300" />
                      <span>{activity.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ActivityIcon className="w-4 h-4 text-pink-300" />
                      <span>{activity.benefits}</span>
                    </div>
                    {activity.warning && (
                      <div className="mt-3 p-2 bg-yellow-500/20 text-yellow-100 rounded-lg text-xs border border-yellow-500/30">
                        সতর্কতা: {activity.warning}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="glass-card p-4 rounded-xl flex items-center justify-between text-white text-sm">
        <span>আজকের প্রগ্রেস</span>
        <span className="font-semibold text-pink-300">
          {Object.keys(activityChecklist).filter(key => key.startsWith(`${activeProfile.id}_`) && activityChecklist[key]).length} টি সম্পন্ন
        </span>
      </div>
    </div>
  );
}

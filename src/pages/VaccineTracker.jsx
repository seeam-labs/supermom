import React, { useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { vaccineSchedule } from '../data/bengaliData';
import { Syringe, CheckCircle2, Circle, AlertCircle } from 'lucide-react';

export default function VaccineTracker() {
  const { activeProfile, vaccineChecklist, toggleVaccine } = useAppContext();

  // Group vaccines by age
  const groupedVaccines = useMemo(() => {
    return vaccineSchedule.reduce((acc, vaccine) => {
      if (!acc[vaccine.age]) {
        acc[vaccine.age] = [];
      }
      acc[vaccine.age].push(vaccine);
      return acc;
    }, {});
  }, []);

  if (!activeProfile) return null;

  const totalVaccines = vaccineSchedule.length;
  const completedVaccines = vaccineSchedule.filter(
    v => vaccineChecklist[`${activeProfile.id}_${v.name}`]
  ).length;
  const progressPercent = Math.round((completedVaccines / totalVaccines) * 100) || 0;

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-white mb-2">ভ্যাকসিন ট্র্যাকার</h2>
        <p className="text-white/80">শিশুর প্রয়োজনীয় টিকার তালিকা ও সময়সূচি</p>
      </div>

      <div className="glass-card p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20">
        <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="40" cy="40" r="36" stroke="rgba(255,255,255,0.2)" strokeWidth="8" fill="none" />
            <circle 
              cx="40" cy="40" r="36" 
              stroke="#60a5fa" strokeWidth="8" fill="none" 
              strokeDasharray="226" 
              strokeDashoffset={226 - (226 * progressPercent) / 100}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center text-white">
            <span className="text-xl font-bold">{progressPercent}%</span>
          </div>
        </div>
        <div className="text-center sm:text-left flex-1">
          <h3 className="text-lg font-bold text-white">ভ্যাকসিন প্রগ্রেস</h3>
          <p className="text-white/80 text-sm mt-1">
            মোট {totalVaccines} টি টিকার মধ্যে {completedVaccines} টি দেওয়া হয়েছে।
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {Object.entries(groupedVaccines).map(([age, vaccines], idx) => {
          const isAllCompletedInGroup = vaccines.every(
            v => vaccineChecklist[`${activeProfile.id}_${v.name}`]
          );

          return (
            <div key={idx} className="glass-card rounded-2xl overflow-hidden">
              <div className={`p-4 border-b ${isAllCompletedInGroup ? 'bg-green-500/20 border-green-500/30' : 'bg-white/5 border-white/10'}`}>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Syringe className="w-5 h-5 text-blue-300" /> 
                  সময়: {age}
                </h3>
              </div>
              <div className="divide-y divide-white/5">
                {vaccines.map((vaccine, vIdx) => {
                  const isCompleted = vaccineChecklist[`${activeProfile.id}_${vaccine.name}`];
                  return (
                    <div 
                      key={vIdx} 
                      className="p-4 hover:bg-white/5 transition-colors cursor-pointer"
                      onClick={() => toggleVaccine(vaccine.name)}
                    >
                      <div className="flex items-start gap-4">
                        <div className="mt-1">
                          {isCompleted ? (
                            <CheckCircle2 className="w-6 h-6 text-green-400 animate-bounce-check" />
                          ) : (
                            <Circle className="w-6 h-6 text-white/30" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className={`text-lg font-semibold ${isCompleted ? 'text-white/60 line-through' : 'text-white'}`}>
                            {vaccine.name}
                          </h4>
                          <p className={`text-sm mt-1 ${isCompleted ? 'text-white/50' : 'text-white/80'}`}>
                            রোগ: {vaccine.disease}
                          </p>
                          <div className="mt-2 flex items-start gap-1.5 p-2 bg-white/5 rounded-lg border border-white/10">
                            <AlertCircle className="w-4 h-4 text-yellow-300 shrink-0 mt-0.5" />
                            <span className="text-xs text-white/70">পার্শ্বপ্রতিক্রিয়া: {vaccine.sideEffects}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

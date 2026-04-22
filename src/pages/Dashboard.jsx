import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Baby, Home, Utensils, Ruler, Activity, Moon, Heart, Bath, Syringe, Brain, CheckSquare, AlertTriangle, BookOpen, Settings, Plus, ChevronRight } from 'lucide-react';
import { foodGuide, vaccineSchedule, dailyTips, whoGrowthStandards } from '../data/bengaliData';

const Dashboard = () => {
  const { activeProfile, vaccineChecklist, milestoneChecklist } = useAppContext();

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

  const ageGroup = getAgeGroup();
  const randomTip = React.useMemo(() => {
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    return dailyTips[dayOfYear % dailyTips.length];
  }, []);
  
  const completedVaccines = Object.values(vaccineChecklist).filter(v => v).length;
  const totalVaccines = vaccineSchedule.length;
  const vaccineProgress = Math.round((completedVaccines / totalVaccines) * 100);

  const growthStatus = () => {
    if (!activeProfile?.currentWeight || !activeProfile?.birthDate) return null;
    
    const today = new Date();
    const birth = new Date(activeProfile.birthDate);
    const months = (today.getFullYear() - birth.getFullYear()) * 12 + (today.getMonth() - birth.getMonth());
    
    const gender = activeProfile.gender === 'ছেলে' ? 'boys' : 'girls';
    const standards = whoGrowthStandards[gender]?.weight;
    
    if (!standards || months > 12) return null;
    
    const standard = standards.find(s => s.month === Math.min(months, 12)) || standards[0];
    const weight = parseFloat(activeProfile.currentWeight);
    
    if (weight < standard.min) return { status: 'কম', color: 'text-yellow-400' };
    if (weight > standard.max) return { status: 'বেশি', color: 'text-orange-400' };
    return { status: 'স্বাভাবিক', color: 'text-green-400' };
  };

  const status = growthStatus();

  return (
    <div className="space-y-6 pb-24">
      {/* Profile Card */}
      <div className="glass-card rounded-3xl p-6 backdrop-blur-xl bg-white/10 border border-white/20">
        <div className="flex items-center gap-4">
          {activeProfile?.photo ? (
            <img src={activeProfile.photo} alt={activeProfile.name} className="w-20 h-20 rounded-full object-cover border-4 border-white/20" />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Baby className="w-10 h-10 text-white" />
            </div>
          )}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white">{activeProfile?.name || 'শিশু'}</h2>
            <p className="text-white/70">{activeProfile?.age || 'বয়স তথ্য নেই'}</p>
            <div className="flex gap-4 mt-2 text-sm">
              <span className="text-white/60">⚖️ {activeProfile?.currentWeight || '?'} কেজি</span>
              <span className="text-white/60">📏 {activeProfile?.height || '?'} সেমি</span>
            </div>
          </div>
        </div>
        
        {status && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <p className="text-white/70 text-sm">গ্রোথ স্ট্যাটাস: <span className={`font-semibold ${status.color}`}>{status.status}</span></p>
          </div>
        )}
      </div>

      {/* Daily Tip */}
      <div className="glass-card rounded-2xl p-5 backdrop-blur-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-white/20">
        <div className="flex items-start gap-3">
          <div className="text-2xl">💡</div>
          <div>
            <h3 className="text-white font-semibold mb-1">আজকের টিপস</h3>
            <p className="text-white/80 text-sm">{randomTip}</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card rounded-2xl p-4 backdrop-blur-xl bg-white/10 border border-white/20">
          <div className="flex items-center gap-3 mb-2">
            <Syringe className="w-5 h-5 text-blue-400" />
            <span className="text-white/70 text-sm">টিকা</span>
          </div>
          <p className="text-2xl font-bold text-white">{completedVaccines}/{totalVaccines}</p>
          <div className="mt-2 w-full bg-white/10 rounded-full h-2">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{ width: `${vaccineProgress}%` }}></div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-4 backdrop-blur-xl bg-white/10 border border-white/20">
          <div className="flex items-center gap-3 mb-2">
            <Brain className="w-5 h-5 text-purple-400" />
            <span className="text-white/70 text-sm">মাইলস্টোন</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {Object.values(milestoneChecklist).filter(v => v).length}+
          </p>
          <p className="text-xs text-white/50 mt-2">অর্জিত মাইলস্টোন</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass-card rounded-2xl p-5 backdrop-blur-xl bg-white/10 border border-white/20">
        <h3 className="text-white font-semibold mb-4">দ্রুত এক্সেস</h3>
        <div className="grid grid-cols-4 gap-3">
          {[
            { icon: Utensils, label: 'খাবার', color: 'from-orange-500 to-red-500' },
            { icon: Ruler, label: 'গ্রোথ', color: 'from-green-500 to-emerald-500' },
            { icon: Activity, label: 'খেলা', color: 'from-blue-500 to-cyan-500' },
            { icon: Moon, label: 'ঘুম', color: 'from-purple-500 to-indigo-500' }
          ].map((item, idx) => (
            <button key={idx} className={`aspect-square rounded-xl bg-gradient-to-br ${item.color} flex flex-col items-center justify-center gap-1 hover:scale-105 transition-transform`}>
              <item.icon className="w-6 h-6 text-white" />
              <span className="text-white text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Age-based Content Preview */}
      <div className="glass-card rounded-2xl p-5 backdrop-blur-xl bg-white/10 border border-white/20">
        <h3 className="text-white font-semibold mb-4">এই বয়সের জন্য ({foodGuide[ageGroup]?.title})</h3>
        
        <div className="space-y-3">
          <div>
            <h4 className="text-white/80 text-sm mb-2">✅ যা খাওয়ানো যাবে</h4>
            <div className="flex flex-wrap gap-2">
              {foodGuide[ageGroup]?.canFeed.slice(0, 5).map((item, idx) => (
                <span key={idx} className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs">{item}</span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-white/80 text-sm mb-2">❌ যা খাওয়ানো যাবে না</h4>
            <div className="flex flex-wrap gap-2">
              {foodGuide[ageGroup]?.cannotFeed.slice(0, 3).map((item, idx) => (
                <span key={idx} className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-xs">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

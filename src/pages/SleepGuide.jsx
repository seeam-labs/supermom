import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { sleepGuide } from '../data/bengaliData';
import { Moon, Sun, Clock, Plus } from 'lucide-react';

export default function SleepGuide() {
  const { activeProfile, sleepLog, addSleepLog } = useAppContext();
  const [selectedAge, setSelectedAge] = useState(Object.keys(sleepGuide)[0]);
  const [showLogForm, setShowLogForm] = useState(false);
  const [sleepStart, setSleepStart] = useState('');
  const [sleepEnd, setSleepEnd] = useState('');
  const [sleepQuality, setSleepQuality] = useState('ভালো');

  if (!activeProfile) return null;

  const profileLogs = sleepLog
    .filter(log => log.profileId === activeProfile.id)
    .sort((a, b) => b.id - a.id)
    .slice(0, 10); // show recent 10

  const handleLogSubmit = (e) => {
    e.preventDefault();
    if (sleepStart && sleepEnd) {
      addSleepLog({
        start: sleepStart,
        end: sleepEnd,
        quality: sleepQuality,
        date: new Date().toISOString()
      });
      setSleepStart('');
      setSleepEnd('');
      setShowLogForm(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">ঘুমের গাইড</h2>
          <p className="text-white/80">বয়সভিত্তিক ঘুমের চার্ট ও রুটিন</p>
        </div>
        <button 
          onClick={() => setShowLogForm(!showLogForm)}
          className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl transition-all"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">লগ যোগ করুন</span>
        </button>
      </div>

      {showLogForm && (
        <form onSubmit={handleLogSubmit} className="glass-card p-4 sm:p-6 rounded-2xl animate-fade-in space-y-4">
          <h3 className="text-lg font-semibold text-white">নতুন ঘুমের রেকর্ড</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-white/80 text-sm mb-1">ঘুমানোর সময়</label>
              <input 
                type="time" 
                value={sleepStart} 
                onChange={(e) => setSleepStart(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-white/80 text-sm mb-1">ওঠার সময়</label>
              <input 
                type="time" 
                value={sleepEnd} 
                onChange={(e) => setSleepEnd(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-white/80 text-sm mb-1">ঘুম কেমন ছিল?</label>
              <select 
                value={sleepQuality}
                onChange={(e) => setSleepQuality(e.target.value)}
                className="w-full bg-[#3c2a63] border border-white/20 rounded-xl px-4 py-2 text-white focus:outline-none"
              >
                <option value="খুব ভালো">খুব ভালো</option>
                <option value="ভালো">ভালো</option>
                <option value="মাঝারি">মাঝারি</option>
                <option value="অস্থির">অস্থির</option>
              </select>
            </div>
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 rounded-xl hover:opacity-90">
            সেভ করুন
          </button>
        </form>
      )}

      {/* Age Selector */}
      <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
        {Object.keys(sleepGuide).map((ageKey) => (
          <button
            key={ageKey}
            onClick={() => setSelectedAge(ageKey)}
            className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              selectedAge === ageKey
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            {ageKey} মাস/বছর
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-card p-6 rounded-2xl flex flex-col items-center text-center justify-center space-y-4">
          <Moon className="w-12 h-12 text-purple-300" />
          <div>
            <h3 className="text-xl font-bold text-white">মোট ঘুম</h3>
            <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 mt-2">
              {sleepGuide[selectedAge].hours}
            </p>
          </div>
        </div>
        
        <div className="glass-card p-6 rounded-2xl flex flex-col items-center text-center justify-center space-y-4">
          <Sun className="w-12 h-12 text-yellow-300" />
          <div>
            <h3 className="text-xl font-bold text-white">দিনের ঘুম (Nap)</h3>
            <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 mt-2">
              {sleepGuide[selectedAge].naps}
            </p>
          </div>
        </div>
      </div>

      <div className="glass-card p-6 rounded-2xl">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-pink-300" />
          কিছু গুরুত্বপূর্ণ টিপস
        </h3>
        <ul className="space-y-3">
          {sleepGuide[selectedAge].tips.map((tip, idx) => (
            <li key={idx} className="flex items-start gap-3 text-white/90">
              <span className="w-2 h-2 mt-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shrink-0" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      {profileLogs.length > 0 && (
        <div className="glass-card p-4 sm:p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-white mb-4">সাম্প্রতিক ঘুমের রেকর্ড</h3>
          <div className="space-y-3">
            {profileLogs.map(log => (
              <div key={log.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                <div className="flex flex-col">
                  <span className="text-white font-medium">{log.start} - {log.end}</span>
                  <span className="text-white/60 text-xs">{new Date(log.date).toLocaleDateString('bn-BD')}</span>
                </div>
                <div className="px-3 py-1 bg-purple-500/30 text-purple-200 rounded-lg text-sm border border-purple-500/50">
                  {log.quality}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

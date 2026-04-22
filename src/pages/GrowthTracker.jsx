import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { whoGrowthStandards } from '../data/bengaliData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Ruler, Weight, Plus } from 'lucide-react';

export default function GrowthTracker() {
  const { activeProfile, growthData, addGrowthEntry } = useAppContext();
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [month, setMonth] = useState(0);
  const [showForm, setShowForm] = useState(false);

  if (!activeProfile) return <div className="p-4 text-white">প্রোফাইল পাওয়া যায়নি</div>;

  const profileGrowth = growthData
    .filter(d => d.profileId === activeProfile.id)
    .sort((a, b) => a.month - b.month);

  const gender = activeProfile.gender === 'boy' ? 'boys' : 'girls';
  const standards = whoGrowthStandards[gender];

  // Merge WHO standards with user data for chart
  const weightChartData = standards.weight.map(std => {
    const userData = profileGrowth.find(g => g.month === std.month);
    return {
      month: std.month,
      'WHO গড়': std.median,
      'আপনার শিশু': userData ? userData.weight : null,
    };
  });

  const heightChartData = standards.height.map(std => {
    const userData = profileGrowth.find(g => g.month === std.month);
    return {
      month: std.month,
      'WHO গড়': std.median,
      'আপনার শিশু': userData ? userData.height : null,
    };
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (weight || height) {
      addGrowthEntry({
        month: parseInt(month),
        weight: weight ? parseFloat(weight) : null,
        height: height ? parseFloat(height) : null,
        date: new Date().toISOString()
      });
      setWeight('');
      setHeight('');
      setShowForm(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">গ্রোথ ট্র্যাকার</h2>
          <p className="text-white/80">শিশুর ওজন ও উচ্চতার রেকর্ড রাখুন</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl transition-all"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">নতুন রেকর্ড</span>
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="glass-card p-4 sm:p-6 rounded-2xl animate-fade-in space-y-4">
          <h3 className="text-lg font-semibold text-white">নতুন গ্রোথ রেকর্ড যোগ করুন</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-white/80 text-sm mb-1">মাস (বয়স)</label>
              <input 
                type="number" 
                min="0" max="60"
                value={month} 
                onChange={(e) => setMonth(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white focus:border-white/50 focus:ring-1 focus:ring-white/50 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-white/80 text-sm mb-1">ওজন (কেজি)</label>
              <input 
                type="number" 
                step="0.1" min="0"
                value={weight} 
                onChange={(e) => setWeight(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white focus:border-white/50 focus:ring-1 focus:ring-white/50 outline-none"
                placeholder="উদা: ৪.৫"
              />
            </div>
            <div>
              <label className="block text-white/80 text-sm mb-1">উচ্চতা (সেমি)</label>
              <input 
                type="number" 
                step="0.1" min="0"
                value={height} 
                onChange={(e) => setHeight(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white focus:border-white/50 focus:ring-1 focus:ring-white/50 outline-none"
                placeholder="উদা: ৫৫"
              />
            </div>
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 rounded-xl hover:opacity-90 transition-opacity">
            সেভ করুন
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-4 sm:p-6 rounded-2xl">
          <div className="flex items-center gap-2 mb-4 text-white">
            <Weight className="w-5 h-5 text-pink-300" />
            <h3 className="text-lg font-semibold">ওজন চার্ট (কেজি)</h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weightChartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" tick={{fill: 'rgba(255,255,255,0.8)'}} />
                <YAxis stroke="rgba(255,255,255,0.5)" tick={{fill: 'rgba(255,255,255,0.8)'}} />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px', color: '#fff' }} />
                <Legend wrapperStyle={{ paddingTop: '10px' }} />
                <Line type="monotone" dataKey="WHO গড়" stroke="rgba(255,255,255,0.4)" strokeDasharray="5 5" dot={false} />
                <Line type="monotone" dataKey="আপনার শিশু" stroke="#f472b6" strokeWidth={3} dot={{r: 4, fill: '#f472b6'}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-4 sm:p-6 rounded-2xl">
          <div className="flex items-center gap-2 mb-4 text-white">
            <Ruler className="w-5 h-5 text-purple-300" />
            <h3 className="text-lg font-semibold">উচ্চতা চার্ট (সেমি)</h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={heightChartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" tick={{fill: 'rgba(255,255,255,0.8)'}} />
                <YAxis stroke="rgba(255,255,255,0.5)" tick={{fill: 'rgba(255,255,255,0.8)'}} />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px', color: '#fff' }} />
                <Legend wrapperStyle={{ paddingTop: '10px' }} />
                <Line type="monotone" dataKey="WHO গড়" stroke="rgba(255,255,255,0.4)" strokeDasharray="5 5" dot={false} />
                <Line type="monotone" dataKey="আপনার শিশু" stroke="#c084fc" strokeWidth={3} dot={{r: 4, fill: '#c084fc'}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="glass-card p-4 sm:p-6 rounded-2xl">
        <h3 className="text-lg font-semibold text-white mb-4">রেকর্ড হিস্ট্রি</h3>
        {profileGrowth.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-white border-collapse">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="p-3 text-white/80 font-medium">তারিখ</th>
                  <th className="p-3 text-white/80 font-medium">বয়স (মাস)</th>
                  <th className="p-3 text-white/80 font-medium">ওজন (কেজি)</th>
                  <th className="p-3 text-white/80 font-medium">উচ্চতা (সেমি)</th>
                </tr>
              </thead>
              <tbody>
                {profileGrowth.map((record) => (
                  <tr key={record.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                    <td className="p-3">{new Date(record.date).toLocaleDateString('bn-BD')}</td>
                    <td className="p-3">{record.month} মাস</td>
                    <td className="p-3">{record.weight ? `${record.weight} কেজি` : '-'}</td>
                    <td className="p-3">{record.height ? `${record.height} সেমি` : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-white/60 text-center py-4">কোনো রেকর্ড নেই। নতুন রেকর্ড যোগ করুন।</p>
        )}
      </div>
    </div>
  );
}

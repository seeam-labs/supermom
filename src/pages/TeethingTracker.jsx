import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Smile } from 'lucide-react';

export default function TeethingTracker() {
  const { activeProfile, teethingData, toggleTeeth } = useAppContext();

  if (!activeProfile) return null;

  const getToothStatus = (toothId) => {
    return teethingData.find(t => t.profileId === activeProfile.id && t.toothId === toothId);
  };

  const teeth = [
    { id: 'T1', name: 'সেন্ট্রাল ইনসিসর (উপর)', month: '৮-১২ মাস' },
    { id: 'T2', name: 'ল্যাটারাল ইনসিসর (উপর)', month: '৯-১৩ মাস' },
    { id: 'T3', name: 'ক্যানাইন (উপর)', month: '১৬-২২ মাস' },
    { id: 'T4', name: 'প্রথম মোলার (উপর)', month: '১৩-১৯ মাস' },
    { id: 'T5', name: 'দ্বিতীয় মোলার (উপর)', month: '২৫-৩৩ মাস' },
    { id: 'B1', name: 'সেন্ট্রাল ইনসিসর (নিচ)', month: '৬-১০ মাস' },
    { id: 'B2', name: 'ল্যাটারাল ইনসিসর (নিচ)', month: '১০-১৬ মাস' },
    { id: 'B3', name: 'ক্যানাইন (নিচ)', month: '১৭-২৩ মাস' },
    { id: 'B4', name: 'প্রথম মোলার (নিচ)', month: '১৪-১৮ মাস' },
    { id: 'B5', name: 'দ্বিতীয় মোলার (নিচ)', month: '২৩-৩১ মাস' },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-white mb-2">দাঁত ওঠার ট্র্যাকার</h2>
        <p className="text-white/80">শিশুর দাঁত ওঠার সময়কাল এবং রেকর্ড</p>
      </div>

      <div className="glass-card p-6 rounded-2xl bg-gradient-to-br from-white/10 to-teal-500/10">
        <div className="flex items-center gap-3 mb-4">
          <Smile className="w-8 h-8 text-teal-300" />
          <h3 className="text-lg font-bold text-white">দাঁতের অবস্থা চিহ্নিত করুন</h3>
        </div>
        <p className="text-sm text-white/70 mb-6">যে দাঁতগুলো উঠেছে সেগুলোর ওপর ক্লিক করুন।</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Upper Teeth */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold border-b border-white/20 pb-2 text-center">উপরের পাটি</h4>
            {teeth.filter(t => t.id.startsWith('T')).map((tooth) => {
              const status = getToothStatus(tooth.id);
              return (
                <div 
                  key={tooth.id}
                  onClick={() => toggleTeeth(tooth.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex justify-between items-center ${
                    status ? 'bg-teal-500/20 border-teal-400' : 'bg-white/5 border-white/10 hover:border-white/30'
                  }`}
                >
                  <div>
                    <p className={`font-semibold ${status ? 'text-teal-200' : 'text-white'}`}>{tooth.name}</p>
                    <p className="text-xs text-white/50">{tooth.month}</p>
                  </div>
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center ${status ? 'bg-teal-400 text-teal-900' : 'bg-white/10'}`}>
                    {status && '✓'}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Lower Teeth */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold border-b border-white/20 pb-2 text-center">নিচের পাটি</h4>
            {teeth.filter(t => t.id.startsWith('B')).map((tooth) => {
              const status = getToothStatus(tooth.id);
              return (
                <div 
                  key={tooth.id}
                  onClick={() => toggleTeeth(tooth.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex justify-between items-center ${
                    status ? 'bg-teal-500/20 border-teal-400' : 'bg-white/5 border-white/10 hover:border-white/30'
                  }`}
                >
                  <div>
                    <p className={`font-semibold ${status ? 'text-teal-200' : 'text-white'}`}>{tooth.name}</p>
                    <p className="text-xs text-white/50">{tooth.month}</p>
                  </div>
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center ${status ? 'bg-teal-400 text-teal-900' : 'bg-white/10'}`}>
                    {status && '✓'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      <div className="glass-card p-4 rounded-xl text-sm text-white/80">
        <span className="font-bold text-teal-300">টিপস:</span> দাঁত ওঠার সময় শিশুর মাড়ি শিরশির করে এবং তারা সব কিছু কামড়াতে চায়। এ সময় তাদের পরিষ্কার টিথার দিন।
      </div>
    </div>
  );
}

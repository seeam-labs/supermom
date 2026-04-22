import React, { useState } from 'react';
import { warnings, emergencyInfo } from '../data/bengaliData';
import { AlertTriangle, PhoneCall, ShieldAlert, Activity } from 'lucide-react';

export default function Warnings() {
  const [selectedAge, setSelectedAge] = useState(Object.keys(warnings)[0]);

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-white mb-2">সতর্কতা ও জরুরি তথ্য</h2>
        <p className="text-white/80">জরুরি পরিস্থিতিতে করণীয় ও গুরুত্বপূর্ণ সতর্কতা</p>
      </div>

      <div className="glass-card p-6 rounded-2xl bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-8 h-8 text-red-400" />
          <h3 className="text-xl font-bold text-white">খাদ্য সতর্কতা</h3>
        </div>
        
        <div className="flex overflow-x-auto gap-2 mb-4 pb-2 scrollbar-hide">
          {Object.keys(warnings).map((ageKey) => (
            <button
              key={ageKey}
              onClick={() => setSelectedAge(ageKey)}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedAge === ageKey
                  ? 'bg-red-500/80 text-white shadow-lg'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {ageKey} মাস/বছর
            </button>
          ))}
        </div>

        <ul className="space-y-2">
          {warnings[selectedAge].map((warning, idx) => (
            <li key={idx} className="flex items-start gap-2 text-white/90">
              <span className="w-2 h-2 mt-2 bg-red-400 rounded-full shrink-0" />
              <span>{warning}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-6 h-6 text-yellow-400" />
            <h3 className="text-lg font-bold text-white">জরুরি প্রাথমিক চিকিৎসা</h3>
          </div>
          <div className="space-y-4">
            {emergencyInfo.emergencies.map((em, idx) => (
              <div key={idx} className="p-4 bg-white/5 rounded-xl border border-white/10">
                <h4 className="font-bold text-yellow-300 mb-1">{em.condition}</h4>
                <p className="text-sm text-white/80">{em.action}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <PhoneCall className="w-6 h-6 text-green-400" />
            <h3 className="text-lg font-bold text-white">জরুরি যোগাযোগ</h3>
          </div>
          <div className="space-y-4">
            {emergencyInfo.hospitals.map((hospital, idx) => (
              <div key={idx} className="p-4 bg-white/5 rounded-xl border border-white/10 flex flex-col sm:flex-row justify-between gap-3">
                <div>
                  <h4 className="font-bold text-white">{hospital.name}</h4>
                  <p className="text-xs text-white/60 mt-1">{hospital.address}</p>
                </div>
                <a 
                  href={`tel:${hospital.phone}`}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-500/20 text-green-300 rounded-lg border border-green-500/30 hover:bg-green-500/30 transition-colors shrink-0 whitespace-nowrap h-fit"
                >
                  <PhoneCall className="w-4 h-4" />
                  {hospital.phone}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

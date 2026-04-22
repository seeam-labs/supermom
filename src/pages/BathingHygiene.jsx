import React from 'react';
import { Bath, Droplets, Smile, AlertTriangle } from 'lucide-react';

export default function BathingHygiene() {
  const bathTips = [
    { title: 'পানির তাপমাত্রা', desc: 'পানি কুসুম গরম হওয়া উচিত। আপনার হাতের কনুই বা কব্জি ডুবিয়ে পরীক্ষা করুন।', icon: <Droplets className="text-blue-300" /> },
    { title: 'সময়কাল', desc: 'গোসল ৫-১০ মিনিটের বেশি হওয়া উচিত নয়। বেশিক্ষণ পানিতে রাখলে শিশুর ত্বক শুষ্ক হয়ে যেতে পারে।', icon: <Bath className="text-purple-300" /> },
    { title: 'সাবান ও শ্যাম্পু', desc: 'খুব অল্প পরিমাণে বেবি-সেইফ, টিয়ার-ফ্রি এবং সুগন্ধিহীন সাবান ব্যবহার করুন।', icon: <Smile className="text-pink-300" /> },
  ];

  const hygieneSteps = [
    { name: 'নখ কাটা', frequency: 'সপ্তাহে ১ বার', details: 'শিশুর ঘুমানোর সময় ছোট নেল কাটার দিয়ে নখ কেটে দিন।' },
    { name: 'কান পরিষ্কার', frequency: 'গোসলের পর', details: 'কানের বাইরের অংশ নরম তোয়ালে দিয়ে মুছুন। কানের ভেতর কটন বাড দেবেন না।' },
    { name: 'দাঁত ও মাড়ি', frequency: 'দিনে ২ বার', details: 'দাঁত ওঠার আগে নরম ভেজা কাপড় দিয়ে মাড়ি মুছুন। দাঁত উঠলে নরম ব্রাশ ব্যবহার করুন।' },
    { name: 'ডায়াপার এরিয়া', frequency: 'প্রতিবার পরিবর্তনের সময়', details: 'ওয়েট ওয়াইপস বা ভেজা কাপড় দিয়ে পরিষ্কার করে শুকিয়ে তারপর নতুন ডায়াপার পরান।' },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-white mb-2">গোসল ও স্বাস্থ্যবিধি</h2>
        <p className="text-white/80">শিশুর পরিচ্ছন্নতা ও ত্বকের যত্ন</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {bathTips.map((tip, idx) => (
          <div key={idx} className="glass-card p-5 rounded-2xl flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
              {tip.icon}
            </div>
            <h3 className="text-lg font-bold text-white">{tip.title}</h3>
            <p className="text-white/70 text-sm">{tip.desc}</p>
          </div>
        ))}
      </div>

      <div className="glass-card p-6 rounded-2xl bg-gradient-to-br from-white/10 to-blue-500/10">
        <h3 className="text-xl font-bold text-white mb-4">নিয়মিত পরিচ্ছন্নতা রুটিন</h3>
        <div className="space-y-4">
          {hygieneSteps.map((step, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="mb-2 sm:mb-0">
                <h4 className="text-white font-semibold">{step.name}</h4>
                <p className="text-white/60 text-sm mt-1">{step.details}</p>
              </div>
              <div className="shrink-0 bg-blue-500/20 text-blue-200 px-3 py-1 rounded-lg text-sm border border-blue-500/30">
                {step.frequency}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card p-5 rounded-2xl border-l-4 border-l-yellow-400">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-yellow-400 shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-yellow-100 mb-1">গুরুত্বপূর্ণ সতর্কতা</h3>
            <p className="text-white/80 text-sm">
              শিশুকে কখনো একা গোসলের টাব বা পানির কাছাকাছি রাখবেন না—এক মুহূর্তের জন্যও নয়। 
              নাভী না শুকানো পর্যন্ত স্পঞ্জ বাথ দিন।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

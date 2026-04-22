import React from 'react';
import { cryingSolutions } from '../data/bengaliData';
import { AlertCircle, Heart, Search } from 'lucide-react';

export default function CryingSolutions() {
  return (
    <div className="space-y-6">
      <div className="mb-4 text-center sm:text-left">
        <h2 className="text-2xl font-bold text-white mb-2">কান্না ও সমস্যা সমাধান</h2>
        <p className="text-white/80">শিশুর কান্নার কারণ ও করণীয়</p>
      </div>

      <div className="glass-card p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-6 mb-6 bg-gradient-to-r from-pink-500/20 to-purple-500/20">
        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center shrink-0">
          <Heart className="w-8 h-8 text-pink-300" />
        </div>
        <div className="text-center sm:text-left">
          <h3 className="text-xl font-bold text-white mb-2">কান্না শিশুর ভাষা</h3>
          <p className="text-white/80 text-sm">
            শিশুরা কথা বলতে পারে না, তাই কান্নার মাধ্যমেই তারা তাদের প্রয়োজন প্রকাশ করে। 
            ভয় পাবেন না, শান্তভাবে কারণ খোঁজার চেষ্টা করুন।
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cryingSolutions.map((item, index) => (
          <div key={index} className="glass-card p-5 rounded-2xl hover:border-white/30 transition-all group">
            <div className="flex items-center gap-3 mb-3 border-b border-white/10 pb-3">
              <div className="p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/40 transition-colors">
                <Search className="w-5 h-5 text-purple-300" />
              </div>
              <h3 className="text-lg font-bold text-white">{item.type}</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-white/60 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" /> লক্ষণসমূহ
                </h4>
                <div className="flex flex-wrap gap-2">
                  {item.signs.map((sign, idx) => (
                    <span key={idx} className="bg-white/10 text-white/90 text-xs px-2 py-1 rounded-md border border-white/5">
                      {sign}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="bg-pink-500/10 p-3 rounded-xl border border-pink-500/20">
                <h4 className="text-sm font-semibold text-pink-300 mb-1">সমাধান:</h4>
                <p className="text-white/90 text-sm">{item.solution}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 glass-card border-l-4 border-l-red-400 rounded-r-2xl">
        <h3 className="text-red-300 font-bold mb-2">কখন ডাক্তার দেখাবেন?</h3>
        <ul className="list-disc list-inside text-white/80 text-sm space-y-1">
          <li>যদি শিশু একটানা ২ ঘণ্টার বেশি কাঁদে</li>
          <li>যদি কান্নার সাথে সাথে জ্বর থাকে (বিশেষ করে ৩ মাসের কম বয়সী শিশুর)</li>
          <li>যদি শিশু খাওয়া বন্ধ করে দেয়</li>
          <li>যদি বমি বা ডায়রিয়া থাকে</li>
        </ul>
      </div>
    </div>
  );
}

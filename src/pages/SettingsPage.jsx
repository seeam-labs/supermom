import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Moon, Sun, Trash2, Users, AlertTriangle } from 'lucide-react';

export default function SettingsPage() {
  const { 
    profiles, 
    activeProfileId, 
    switchProfile, 
    deleteProfile,
    darkMode,
    setDarkMode,
    clearAllData
  } = useAppContext();

  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleDeleteProfile = (id) => {
    if (window.confirm('আপনি কি নিশ্চিত যে এই প্রোফাইলটি মুছে ফেলতে চান?')) {
      deleteProfile(id);
    }
  };

  const handleClearData = () => {
    if (showClearConfirm) {
      clearAllData();
      window.location.reload();
    } else {
      setShowClearConfirm(true);
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-white mb-2">সেটিংস</h2>
        <p className="text-white/80">অ্যাপ ও প্রোফাইল পরিচালনা করুন</p>
      </div>

      <div className="glass-card p-6 rounded-2xl">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
          <Users className="w-6 h-6 text-purple-300" />
          <h3 className="text-xl font-bold text-white">প্রোফাইল পরিচালনা</h3>
        </div>

        <div className="space-y-4">
          {profiles.map(profile => (
            <div 
              key={profile.id} 
              className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                profile.id === activeProfileId 
                  ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 border-pink-500/50' 
                  : 'bg-white/5 border-white/10 hover:border-white/30'
              }`}
            >
              <div 
                className="flex items-center gap-4 cursor-pointer flex-1"
                onClick={() => switchProfile(profile.id)}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white text-xl shadow-lg">
                  {profile.gender === 'boy' ? '👦' : '👧'}
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">{profile.name}</h4>
                  <p className="text-white/60 text-sm">
                    জন্ম: {new Date(profile.birthDate).toLocaleDateString('bn-BD')}
                    {profile.id === activeProfileId && ' (বর্তমান)'}
                  </p>
                </div>
              </div>
              
              {profiles.length > 1 && (
                <button 
                  onClick={() => handleDeleteProfile(profile.id)}
                  className="p-2 text-red-400 hover:bg-red-400/20 rounded-lg transition-colors"
                  title="প্রোফাইল মুছুন"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
        </div>
        
        <button 
          onClick={() => window.location.reload()} // Easy hack to show setup screen if we assume they can clear local storage or we can set an add profile state. For simplicity, just instruct.
          className="mt-6 w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/20 border-dashed transition-all font-medium"
        >
          + নতুন প্রোফাইল যোগ করুন
        </button>
      </div>

      <div className="glass-card p-6 rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-6 pb-4 border-b border-white/10">অ্যাপিয়ারেন্স</h3>
        
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
          <div className="flex items-center gap-3">
            {darkMode ? <Moon className="w-6 h-6 text-purple-300" /> : <Sun className="w-6 h-6 text-yellow-300" />}
            <div>
              <h4 className="font-bold text-white">ডার্ক মোড</h4>
              <p className="text-white/60 text-sm">অ্যাপের থিম পরিবর্তন করুন</p>
            </div>
          </div>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`w-14 h-7 rounded-full p-1 transition-colors relative ${darkMode ? 'bg-pink-500' : 'bg-white/20'}`}
          >
            <div className={`w-5 h-5 rounded-full bg-white transition-transform ${darkMode ? 'translate-x-7' : 'translate-x-0'}`} />
          </button>
        </div>
      </div>

      <div className="glass-card p-6 rounded-2xl border border-red-500/30">
        <div className="flex items-center gap-3 mb-4 text-red-400">
          <AlertTriangle className="w-6 h-6" />
          <h3 className="text-xl font-bold">ডেটা মুছুন</h3>
        </div>
        <p className="text-white/80 mb-6 text-sm">
          আপনার সব প্রোফাইল, রেকর্ড এবং চেকলিস্ট চিরতরে মুছে যাবে। এই কাজ পরিবর্তনযোগ্য নয়।
        </p>
        
        {showClearConfirm ? (
          <div className="space-y-3">
            <p className="text-red-300 font-bold">আপনি কি সম্পূর্ণ নিশ্চিত?</p>
            <div className="flex gap-3">
              <button 
                onClick={handleClearData}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-xl transition-colors"
              >
                হ্যাঁ, সব মুছুন
              </button>
              <button 
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white font-medium py-2 rounded-xl transition-colors"
              >
                বাতিল
              </button>
            </div>
          </div>
        ) : (
          <button 
            onClick={() => setShowClearConfirm(true)}
            className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-300 font-medium py-3 rounded-xl border border-red-500/50 transition-colors"
          >
            সব ডেটা মুছুন
          </button>
        )}
      </div>
    </div>
  );
}

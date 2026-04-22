import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Baby, Plus, Trash2, Edit2 } from 'lucide-react';

const ProfileSetup = ({ onComplete }) => {
  const { addProfile, profiles, switchProfile, activeProfileId } = useAppContext();
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    gender: 'ছেলে',
    birthWeight: '',
    currentWeight: '',
    height: '',
    motherName: '',
    photo: null
  });
  const [showExistingProfiles, setShowExistingProfiles] = useState(false);

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    const months = (today.getFullYear() - birth.getFullYear()) * 12 + (today.getMonth() - birth.getMonth());
    const days = today.getDate() - birth.getDate();
    
    if (months === 0) {
      return `${days} দিন`;
    } else if (months < 12) {
      return `${months} মাস ${days > 0 ? days + ' দিন' : ''}`;
    } else {
      const years = Math.floor(months / 12);
      const remainingMonths = months % 12;
      return `${years} বছর ${remainingMonths > 0 ? remainingMonths + ' মাস' : ''}`;
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.birthDate) return;
    
    const profile = {
      ...formData,
      age: calculateAge(formData.birthDate)
    };
    
    const newProfile = addProfile(profile);
    if (onComplete) onComplete(newProfile);
  };

  const handleSelectProfile = (id) => {
    switchProfile(id);
    if (onComplete) onComplete();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="glass-card rounded-3xl p-8 backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">
          <div className="text-center mb-8">
            <Baby className="w-16 h-16 mx-auto mb-4 text-pink-300" />
            <h1 className="text-3xl font-bold text-white mb-2">শিশু পরিচর্যা</h1>
            <p className="text-white/70">আপনার শিশুর প্রোফাইল তৈরি করুন</p>
          </div>

          {profiles.length > 0 && (
            <button
              onClick={() => setShowExistingProfiles(!showExistingProfiles)}
              className="w-full mb-6 py-3 px-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl text-white border border-white/20 hover:border-white/40 transition-all"
            >
              {showExistingProfiles ? 'নতুন প্রোফাইল তৈরি' : 'বিদ্যমান প্রোফাইল নির্বাচন'}
            </button>
          )}

          {showExistingProfiles && profiles.length > 0 ? (
            <div className="space-y-3 mb-6">
              {profiles.map(profile => (
                <button
                  key={profile.id}
                  onClick={() => handleSelectProfile(profile.id)}
                  className={`w-full p-4 rounded-xl flex items-center gap-4 transition-all ${
                    activeProfileId === profile.id 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  {profile.photo ? (
                    <img src={profile.photo} alt={profile.name} className="w-12 h-12 rounded-full object-cover" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                      <Baby className="w-6 h-6" />
                    </div>
                  )}
                  <div className="text-left flex-1">
                    <p className="font-semibold text-white">{profile.name}</p>
                    <p className="text-sm text-white/70">{profile.gender} • {profile.age}</p>
                  </div>
                  {activeProfileId === profile.id && (
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white/80 text-sm mb-2">শিশুর নাম *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-pink-400 transition-all"
                  placeholder="যেমন: আরাফাত"
                  required
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">জন্ম তারিখ *</label>
                <input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-pink-400 transition-all"
                  required
                />
                {formData.birthDate && (
                  <p className="text-white/60 text-sm mt-1">বয়স: {calculateAge(formData.birthDate)}</p>
                )}
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">লিঙ্গ</label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, gender: 'ছেলে' })}
                    className={`flex-1 py-3 rounded-xl transition-all ${
                      formData.gender === 'ছেলে'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600'
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    👦 ছেলে
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, gender: 'মেয়ে' })}
                    className={`flex-1 py-3 rounded-xl transition-all ${
                      formData.gender === 'মেয়ে'
                        ? 'bg-gradient-to-r from-pink-500 to-pink-600'
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    👧 মেয়ে
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/80 text-sm mb-2">জন্মের ওজন (কেজি)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.birthWeight}
                    onChange={(e) => setFormData({ ...formData, birthWeight: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-pink-400 transition-all"
                    placeholder="২.৫"
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm mb-2">বর্তমান ওজন (কেজি)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.currentWeight}
                    onChange={(e) => setFormData({ ...formData, currentWeight: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-pink-400 transition-all"
                    placeholder="৫.০"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">উচ্চতা (সেমি)</label>
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-pink-400 transition-all"
                  placeholder="৫০"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">মায়ের নাম (ঐচ্ছিক)</label>
                <input
                  type="text"
                  value={formData.motherName}
                  onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-pink-400 transition-all"
                  placeholder="মায়ের নাম"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">শিশুর ছবি (ঐচ্ছিক)</label>
                <div className="flex items-center gap-4">
                  {formData.photo ? (
                    <img src={formData.photo} alt="Preview" className="w-20 h-20 rounded-full object-cover border-2 border-white/20" />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-white/10 border-2 border-dashed border-white/20 flex items-center justify-center">
                      <Baby className="w-8 h-8 text-white/50" />
                    </div>
                  )}
                  <label className="flex-1 cursor-pointer">
                    <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                    <div className="py-3 px-4 bg-white/10 border border-white/20 rounded-xl text-white text-center hover:bg-white/20 transition-all">
                      ছবি নির্বাচন করুন
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold text-lg hover:shadow-lg hover:shadow-pink-500/30 transition-all transform hover:scale-[1.02]"
              >
                প্রোফাইল তৈরি করুন
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;

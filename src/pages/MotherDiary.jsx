import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { BookOpen, Plus, Calendar, Image as ImageIcon } from 'lucide-react';

export default function MotherDiary() {
  const { activeProfile, motherDiary, addDiaryEntry } = useAppContext();
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  if (!activeProfile) return null;

  const profileDiary = motherDiary
    .filter(entry => entry.profileId === activeProfile.id)
    .sort((a, b) => b.id - a.id);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && content) {
      addDiaryEntry({
        title,
        content,
        date: new Date().toISOString()
      });
      setTitle('');
      setContent('');
      setShowForm(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">মায়ের ডায়েরি</h2>
          <p className="text-white/80">শিশুর সুন্দর মুহূর্তগুলো লিখে রাখুন</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity w-full sm:w-auto font-medium shadow-lg"
        >
          <Plus className="w-5 h-5" />
          নতুন স্মৃতি যোগ করুন
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="glass-card p-4 sm:p-6 rounded-2xl animate-fade-in space-y-4">
          <div>
            <label className="block text-white/80 text-sm mb-1">শিরোনাম</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-pink-500"
              placeholder="উদা: প্রথম হাঁটা"
              required
            />
          </div>
          <div>
            <label className="block text-white/80 text-sm mb-1">বিস্তারিত</label>
            <textarea 
              value={content} 
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-32 bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-pink-500 resize-none"
              placeholder="আজকের সুন্দর মুহূর্তটি বিস্তারিত লিখুন..."
              required
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button 
              type="button" 
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-white/70 hover:text-white transition-colors"
            >
              বাতিল
            </button>
            <button 
              type="submit" 
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl hover:opacity-90"
            >
              সেভ করুন
            </button>
          </div>
        </form>
      )}

      {profileDiary.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profileDiary.map((entry) => (
            <div key={entry.id} className="glass-card p-5 rounded-2xl hover:bg-white/[0.15] transition-colors group">
              <div className="flex items-center gap-2 text-white/60 text-sm mb-3">
                <Calendar className="w-4 h-4" />
                {new Date(entry.date).toLocaleDateString('bn-BD', {
                  year: 'numeric', month: 'long', day: 'numeric'
                })}
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-pink-300 transition-colors">
                {entry.title}
              </h3>
              <p className="text-white/80 whitespace-pre-wrap leading-relaxed text-sm">
                {entry.content}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card p-12 rounded-2xl flex flex-col items-center justify-center text-center opacity-70">
          <BookOpen className="w-16 h-16 text-white/40 mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">কোনো স্মৃতি লেখা নেই</h3>
          <p className="text-white/60">আপনার শিশুর প্রথম হাসি, প্রথম হাঁটা বা সুন্দর কোনো মুহূর্ত লিখে রাখুন ডায়েরিতে।</p>
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Calendar, User, Plus, FileText, Clock } from 'lucide-react';

export default function DoctorAppointments() {
  const { activeProfile, appointments, addAppointment } = useAppContext();
  const [showForm, setShowForm] = useState(false);
  const [doctorName, setDoctorName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');

  if (!activeProfile) return null;

  const profileAppointments = appointments
    .filter(a => a.profileId === activeProfile.id)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const upcomingAppointments = profileAppointments.filter(a => new Date(a.date) >= new Date(new Date().setHours(0,0,0,0)));
  const pastAppointments = profileAppointments.filter(a => new Date(a.date) < new Date(new Date().setHours(0,0,0,0)));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (doctorName && date) {
      addAppointment({ doctorName, date, time, notes });
      setDoctorName('');
      setDate('');
      setTime('');
      setNotes('');
      setShowForm(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">ডাক্তার ভিজিট ট্র্যাকার</h2>
          <p className="text-white/80">ডাক্তারের অ্যাপয়েন্টমেন্ট ও রিপোর্ট</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl transition-all"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">নতুন ভিজিট</span>
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="glass-card p-4 sm:p-6 rounded-2xl animate-fade-in space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/80 text-sm mb-1">ডাক্তারের নাম/হাসপাতাল</label>
              <input 
                type="text" 
                value={doctorName} 
                onChange={(e) => setDoctorName(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-white/80 text-sm mb-1">তারিখ</label>
              <input 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#3c2a63] border border-white/20 rounded-xl px-4 py-2 text-white focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-white/80 text-sm mb-1">সময়</label>
              <input 
                type="time" 
                value={time} 
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-[#3c2a63] border border-white/20 rounded-xl px-4 py-2 text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-white/80 text-sm mb-1">সমস্যা বা নোট</label>
              <input 
                type="text" 
                value={notes} 
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white focus:outline-none"
                placeholder="যেমন: জ্বর, ভ্যাকসিন"
              />
            </div>
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-2 rounded-xl hover:opacity-90">
            সেভ করুন
          </button>
        </form>
      )}

      {upcomingAppointments.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-white mb-3">আসন্ন ভিজিট</h3>
          <div className="grid gap-3">
            {upcomingAppointments.map((app) => (
              <div key={app.id} className="glass-card p-4 rounded-xl border-l-4 border-l-cyan-400">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-white font-bold text-lg flex items-center gap-2">
                      <User className="w-4 h-4 text-cyan-300" /> {app.doctorName}
                    </h4>
                    <p className="text-white/70 text-sm mt-1 flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> {new Date(app.date).toLocaleDateString('bn-BD')}
                      {app.time && <><Clock className="w-4 h-4 ml-2" /> {app.time}</>}
                    </p>
                  </div>
                </div>
                {app.notes && (
                  <div className="mt-3 p-2 bg-white/5 rounded-lg border border-white/10 text-white/80 text-sm flex items-start gap-2">
                    <FileText className="w-4 h-4 shrink-0 mt-0.5" />
                    <p>{app.notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {pastAppointments.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-bold text-white mb-3">পূর্বের ভিজিট</h3>
          <div className="grid gap-3 opacity-75">
            {pastAppointments.map((app) => (
              <div key={app.id} className="glass-card p-4 rounded-xl border border-white/10">
                <h4 className="text-white font-bold">{app.doctorName}</h4>
                <p className="text-white/60 text-sm mt-1">
                  {new Date(app.date).toLocaleDateString('bn-BD')} {app.time && `- ${app.time}`}
                </p>
                {app.notes && <p className="text-white/70 text-sm mt-2">{app.notes}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {profileAppointments.length === 0 && (
        <div className="glass-card p-8 rounded-2xl flex flex-col items-center justify-center text-center opacity-70">
          <Calendar className="w-12 h-12 text-white/40 mb-3" />
          <p className="text-white">কোনো ভিজিট রেকর্ড নেই</p>
        </div>
      )}
    </div>
  );
}

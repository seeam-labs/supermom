import React, { useState } from 'react';
import { useAppContext } from './context/AppContext';
import Dashboard from './pages/Dashboard';
import FoodGuide from './pages/FoodGuide';
import ProfileSetup from './components/ProfileSetup';
import { Home, Utensils, Ruler, Activity, Moon, Heart, Bath, Syringe, Brain, CheckSquare, AlertTriangle, BookOpen, Settings, Menu, X, Sun, Moon as MoonIcon, Stethoscope, Smile } from 'lucide-react';

import GrowthTracker from './pages/GrowthTracker';
import Activities from './pages/Activities';
import SleepGuide from './pages/SleepGuide';
import CryingSolutions from './pages/CryingSolutions';
import BathingHygiene from './pages/BathingHygiene';
import VaccineTracker from './pages/VaccineTracker';
import MilestoneTracker from './pages/MilestoneTracker';
import ChecklistHub from './pages/ChecklistHub';
import Warnings from './pages/Warnings';
import MotherDiary from './pages/MotherDiary';
import SettingsPage from './pages/SettingsPage';
import DoctorAppointments from './pages/DoctorAppointments';
import TeethingTracker from './pages/TeethingTracker';

const navItems = [
  { id: 'dashboard', icon: Home, label: 'ড্যাশবোর্ড' },
  { id: 'food', icon: Utensils, label: 'খাবার' },
  { id: 'growth', icon: Ruler, label: 'গ্রোথ' },
  { id: 'activity', icon: Activity, label: 'খেলা' },
  { id: 'sleep', icon: Moon, label: 'ঘুম' },
  { id: 'crying', icon: Heart, label: 'সমাধান' },
  { id: 'bath', icon: Bath, label: 'পরিচ্ছন্নতা' },
  { id: 'vaccine', icon: Syringe, label: 'টিকা' },
  { id: 'milestone', icon: Brain, label: 'মাইলস্টোন' },
  { id: 'checklist', icon: CheckSquare, label: 'চেকলিস্ট' },
  { id: 'warnings', icon: AlertTriangle, label: 'সতর্কতা' },
  { id: 'appointments', icon: Stethoscope, label: 'ডাক্তার' },
  { id: 'teething', icon: Smile, label: 'দাঁত' },
  { id: 'diary', icon: BookOpen, label: 'ডায়েরি' },
  { id: 'settings', icon: Settings, label: 'সেটিংস' }
];

function App() {
  const { activeProfile, darkMode, setDarkMode } = useAppContext();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'food':
        return <FoodGuide />;
      case 'growth':
        return <GrowthTracker />;
      case 'activity':
        return <Activities />;
      case 'sleep':
        return <SleepGuide />;
      case 'crying':
        return <CryingSolutions />;
      case 'bath':
        return <BathingHygiene />;
      case 'vaccine':
        return <VaccineTracker />;
      case 'milestone':
        return <MilestoneTracker />;
      case 'checklist':
        return <ChecklistHub />;
      case 'warnings':
        return <Warnings />;
      case 'appointments':
        return <DoctorAppointments />;
      case 'teething':
        return <TeethingTracker />;
      case 'diary':
        return <MotherDiary />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard />;
    }
  };

  if (!activeProfile) {
    return <ProfileSetup />;
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-card backdrop-blur-xl bg-white/10 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-white text-lg">👶</span>
            </div>
            <h1 className="text-xl font-bold text-white hidden sm:block">শিশু পরিচর্যা</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all"
            >
              {darkMode ? <Sun className="w-5 h-5 text-white" /> : <MoonIcon className="w-5 h-5 text-white" />}
            </button>
            
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all lg:hidden"
            >
              {showMobileMenu ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-24 lg:pb-8 lg:pl-64 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 animate-fade-in">
          {renderPage()}
        </div>
      </main>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 glass-card backdrop-blur-xl bg-white/10 border-r border-white/20 flex-col p-4 overflow-y-auto">
        <div className="mb-6 pt-16">
          <h2 className="text-lg font-bold text-white px-3">মেনু</h2>
        </div>
        <nav className="space-y-2 flex-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                currentPage === item.id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 glass-card backdrop-blur-xl bg-white/10 border-t border-white/20 z-50">
        <div className="flex justify-around py-2">
          {navItems.slice(0, 5).map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                currentPage === item.id
                  ? 'text-white'
                  : 'text-white/50 hover:text-white/80'
              }`}
            >
              <item.icon className={`w-5 h-5 ${currentPage === item.id ? 'fill-current' : ''}`} />
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={() => setShowMobileMenu(false)}>
          <div className="absolute right-0 top-0 bottom-0 w-64 glass-card backdrop-blur-xl bg-white/10 border-l border-white/20 p-4 overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="mb-6 pt-16 flex items-center justify-between">
              <h2 className="text-lg font-bold text-white px-3">মেনু</h2>
              <button onClick={() => setShowMobileMenu(false)} className="p-2 rounded-xl bg-white/10">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <nav className="space-y-2">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setShowMobileMenu(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    currentPage === item.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

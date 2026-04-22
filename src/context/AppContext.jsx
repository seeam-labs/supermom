import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const AppContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [profiles, setProfiles] = useLocalStorage('babyCare_profiles', []);
  const [activeProfileId, setActiveProfileId] = useLocalStorage('babyCare_activeProfileId', null);
  const [growthData, setGrowthData] = useLocalStorage('babyCare_growthData', []);
  const [vaccineChecklist, setVaccineChecklist] = useLocalStorage('babyCare_vaccineChecklist', {});
  const [milestoneChecklist, setMilestoneChecklist] = useLocalStorage('babyCare_milestoneChecklist', {});
  const [activityChecklist, setActivityChecklist] = useLocalStorage('babyCare_activityChecklist', {});
  const [sleepLog, setSleepLog] = useLocalStorage('babyCare_sleepLog', []);
  const [feedingLog, setFeedingLog] = useLocalStorage('babyCare_feedingLog', []);
  const [motherDiary, setMotherDiary] = useLocalStorage('babyCare_motherDiary', []);
  const [foodChecklist, setFoodChecklist] = useLocalStorage('babyCare_foodChecklist', {});
  const [checklistProgress, setChecklistProgress] = useLocalStorage('babyCare_checklistProgress', {});
  const [appointments, setAppointments] = useLocalStorage('babyCare_appointments', []);
  const [teethingData, setTeethingData] = useLocalStorage('babyCare_teethingData', []);
  const [darkMode, setDarkMode] = useLocalStorage('babyCare_darkMode', false);
  const [lastVisitedTab, setLastVisitedTab] = useLocalStorage('babyCare_lastVisitedTab', 'dashboard');
  const [favorites, setFavorites] = useLocalStorage('babyCare_favorites', []);

  const activeProfile = profiles.find(p => p.id === activeProfileId) || null;

  const addProfile = (profile) => {
    const newProfile = { ...profile, id: Date.now().toString() };
    setProfiles([...profiles, newProfile]);
    setActiveProfileId(newProfile.id);
    return newProfile;
  };

  const updateProfile = (id, updates) => {
    setProfiles(profiles.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProfile = (id) => {
    setProfiles(profiles.filter(p => p.id !== id));
    if (activeProfileId === id) {
      setActiveProfileId(profiles[0]?.id || null);
    }
  };

  const switchProfile = (id) => {
    setActiveProfileId(id);
  };

  const addGrowthEntry = (entry) => {
    setGrowthData([...growthData, { ...entry, profileId: activeProfileId, id: Date.now() }]);
  };

  const toggleVaccine = (vaccineName) => {
    setVaccineChecklist(prev => ({
      ...prev,
      [`${activeProfileId}_${vaccineName}`]: !prev[`${activeProfileId}_${vaccineName}`]
    }));
  };

  const toggleMilestone = (milestoneKey) => {
    setMilestoneChecklist(prev => ({
      ...prev,
      [`${activeProfileId}_${milestoneKey}`]: !prev[`${activeProfileId}_${milestoneKey}`]
    }));
  };

  const toggleActivity = (activityKey) => {
    setActivityChecklist(prev => ({
      ...prev,
      [`${activeProfileId}_${activityKey}`]: !prev[`${activeProfileId}_${activityKey}`]
    }));
  };

  const toggleFoodItem = (foodKey) => {
    setFoodChecklist(prev => ({
      ...prev,
      [`${activeProfileId}_${foodKey}`]: !prev[`${activeProfileId}_${foodKey}`]
    }));
  };

  const addSleepLog = (log) => {
    setSleepLog([...sleepLog, { ...log, profileId: activeProfileId, id: Date.now() }]);
  };

  const addFeedingLog = (log) => {
    setFeedingLog([...feedingLog, { ...log, profileId: activeProfileId, id: Date.now() }]);
  };

  const addDiaryEntry = (entry) => {
    setMotherDiary([...motherDiary, { ...entry, profileId: activeProfileId, id: Date.now() }]);
  };

  const updateChecklistProgress = (checklistType, progress) => {
    setChecklistProgress(prev => ({
      ...prev,
      [`${activeProfileId}_${checklistType}`]: progress
    }));
  };

  const addAppointment = (appointment) => {
    setAppointments([...appointments, { ...appointment, profileId: activeProfileId, id: Date.now() }]);
  };

  const toggleTeeth = (toothId) => {
    setTeethingData(prev => {
      const existingIndex = prev.findIndex(t => t.profileId === activeProfileId && t.toothId === toothId);
      if (existingIndex >= 0) {
        return prev.filter((_, i) => i !== existingIndex);
      }
      return [...prev, { profileId: activeProfileId, toothId, date: new Date().toISOString() }];
    });
  };

  const toggleFavorite = (tip) => {
    if (favorites.includes(tip)) {
      setFavorites(favorites.filter(f => f !== tip));
    } else {
      setFavorites([...favorites, tip]);
    }
  };

  const clearAllData = () => {
    setProfiles([]);
    setActiveProfileId(null);
    setGrowthData([]);
    setVaccineChecklist({});
    setMilestoneChecklist({});
    setActivityChecklist({});
    setSleepLog([]);
    setFeedingLog([]);
    setMotherDiary([]);
    setFoodChecklist({});
    setChecklistProgress({});
    setFavorites([]);
    setAppointments([]);
    setTeethingData([]);
  };

  const value = {
    profiles,
    activeProfile,
    activeProfileId,
    growthData,
    vaccineChecklist,
    milestoneChecklist,
    activityChecklist,
    sleepLog,
    feedingLog,
    motherDiary,
    foodChecklist,
    checklistProgress,
    appointments,
    teethingData,
    darkMode,
    lastVisitedTab,
    favorites,
    addProfile,
    updateProfile,
    deleteProfile,
    switchProfile,
    addGrowthEntry,
    toggleVaccine,
    toggleMilestone,
    toggleActivity,
    toggleFoodItem,
    addSleepLog,
    addFeedingLog,
    addDiaryEntry,
    updateChecklistProgress,
    addAppointment,
    toggleTeeth,
    toggleFavorite,
    clearAllData,
    setDarkMode,
    setLastVisitedTab
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// App constants and configuration
export const API_BASE_URL = 'http://localhost:8080';

export const USER_ROLES = {
  ADMIN: 'ADMIN',
  USER: 'USER',
  DOCTOR: 'DOCTOR'
};

export const TAB_IDS = {
  CLINICS: 'clinics',
  DOCTORS: 'doctors',
  PROFILE: 'profile',
  SETTINGS: 'settings',
  CLINIC_DETAIL: 'clinic-detail'
};

export const NAVIGATION_TABS = [
  { id: TAB_IDS.CLINICS, label: 'Clinics' },
  { id: TAB_IDS.DOCTORS, label: 'Doctors' },
  { id: TAB_IDS.PROFILE, label: 'Profile' },
  { id: TAB_IDS.SETTINGS, label: 'Settings' }
];
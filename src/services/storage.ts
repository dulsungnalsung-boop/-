import { Project, SiteSettings, Showreel } from '../types/portfolio';
import { INITIAL_PROJECTS, INITIAL_SETTINGS, INITIAL_SHOWREEL } from '../data/initialData';
import { getFromDb, saveToDb } from './indexedDb';

export const STORAGE_KEYS = {
  PROJECTS: 'sutideo_projects_v2',
  SETTINGS: 'sutideo_settings_v2',
  SHOWREEL: 'sutideo_showreel_v2',
  AUTH: 'sutideo_admin_auth_v1'
};

export const MAX_PROJECTS = 15;

// In-memory cache to guarantee synchronous fast access
let inMemoryProjects: Project[] | null = null;

export function loadProjects(): Project[] {
  if (inMemoryProjects && inMemoryProjects.length > 0) {
    return inMemoryProjects;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (!raw) {
      inMemoryProjects = INITIAL_PROJECTS;
      return INITIAL_PROJECTS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      inMemoryProjects = parsed;
      return parsed;
    }
    inMemoryProjects = INITIAL_PROJECTS;
    return INITIAL_PROJECTS;
  } catch (err) {
    console.warn('localStorage read failed, using initial projects:', err);
    inMemoryProjects = INITIAL_PROJECTS;
    return INITIAL_PROJECTS;
  }
}

export function saveProjects(projects: Project[]): void {
  const limited = projects.slice(0, MAX_PROJECTS);
  inMemoryProjects = limited;

  // 1. Persist full projects (including large video/GIF DataURLs or Blobs) in IndexedDB
  saveToDb(STORAGE_KEYS.PROJECTS, limited);

  // 2. Also mirror to localStorage (safely handling QuotaExceededError for large media)
  try {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(limited));
  } catch (err) {
    console.warn('localStorage quota reached; full project media is safely preserved in IndexedDB.', err);
    try {
      // If quota exceeded, strip heavy data URLs for localStorage fallback only
      const trimmed = limited.map(p => ({
        ...p,
        mainVideoUrl: p.mainVideoUrl?.length > 100000 ? '' : p.mainVideoUrl,
        lpCoverUrl: p.lpCoverUrl?.length > 200000 ? '' : p.lpCoverUrl
      }));
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(trimmed));
    } catch {}
  }
}

export function loadSettings(): SiteSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!raw) {
      return INITIAL_SETTINGS;
    }
    return JSON.parse(raw);
  } catch (err) {
    return INITIAL_SETTINGS;
  }
}

export function saveSettings(settings: SiteSettings): void {
  saveToDb(STORAGE_KEYS.SETTINGS, settings);
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (err) {
    console.warn('saveSettings localStorage error:', err);
  }
}

export function loadShowreel(): Showreel {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SHOWREEL);
    if (!raw) {
      return INITIAL_SHOWREEL;
    }
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      return parsed;
    }
    return INITIAL_SHOWREEL;
  } catch (err) {
    return INITIAL_SHOWREEL;
  }
}

export function saveShowreel(showreel: Showreel): void {
  saveToDb(STORAGE_KEYS.SHOWREEL, showreel);
  try {
    localStorage.setItem(STORAGE_KEYS.SHOWREEL, JSON.stringify(showreel));
  } catch (err) {
    console.warn('saveShowreel localStorage error:', err);
  }
}

export function checkIsAdminLoggedIn(): boolean {
  try {
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  } catch {
    // ignore storage errors
  }
  return false;
}

export function setAdminLoggedIn(status: boolean): void {
  try {
    if (!status) {
      localStorage.removeItem(STORAGE_KEYS.AUTH);
    }
  } catch (err) {
    console.error('Error updating admin auth:', err);
  }
}

import React, { useState, useEffect } from 'react';
import { 
  loadProjects, 
  saveProjects, 
  loadSettings, 
  saveSettings, 
  loadShowreel, 
  saveShowreel, 
  checkIsAdminLoggedIn, 
  setAdminLoggedIn,
  MAX_PROJECTS,
  STORAGE_KEYS
} from './services/storage';
import { getFromDb } from './services/indexedDb';
import { Project, SiteSettings, Showreel } from './types/portfolio';
import { SutideoVinylShelf } from './components/SutideoVinylShelf';
import { ProjectDetailPage } from './components/ProjectDetailPage';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboard } from './components/AdminDashboard';
import { 
  ArrowUpRight, 
  Disc, 
  Shield, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Sparkles,
  Mail,
  Instagram,
  MapPin,
  ChevronDown
} from 'lucide-react';

export function App() {
  const [projects, setProjects] = useState<Project[]>(() => loadProjects());
  const [settings, setSettings] = useState<SiteSettings>(() => loadSettings());
  const [showreel, setShowreel] = useState<Showreel>(() => loadShowreel());
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => checkIsAdminLoggedIn());

  // Views & Routing state
  const [activeRoute, setActiveRoute] = useState<string>('home'); // 'home' | 'project/:slug' | 'admin'
  const [selectedProjectSlug, setSelectedProjectSlug] = useState<string | null>(null);

  // Modals
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Showreel playback state in Philosophy/Showreel section
  const [isShowreelPlaying, setIsShowreelPlaying] = useState(false);
  const [isShowreelMuted, setIsShowreelMuted] = useState(true);
  const showreelVideoRef = React.useRef<HTMLVideoElement>(null);

  // Hydrate full projects, high-res media, videos, and GIFs from IndexedDB on launch
  useEffect(() => {
    let isMounted = true;
    async function hydrate() {
      const dbProjects = await getFromDb<Project[]>(STORAGE_KEYS.PROJECTS);
      if (isMounted && dbProjects && Array.isArray(dbProjects) && dbProjects.length > 0) {
        setProjects(dbProjects);
      }
      const dbSettings = await getFromDb<SiteSettings>(STORAGE_KEYS.SETTINGS);
      if (isMounted && dbSettings) {
        setSettings(dbSettings);
      }
      const dbShowreel = await getFromDb<Showreel>(STORAGE_KEYS.SHOWREEL);
      if (isMounted && dbShowreel) {
        setShowreel(dbShowreel);
      }
    }
    hydrate();
    return () => { isMounted = false; };
  }, []);

  // Handle URL hash / browser back-forward
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.startsWith('/projects/')) {
        const slug = path.replace('/projects/', '');
        const found = projects.find(p => p.slug === slug);
        if (found) {
          setSelectedProjectSlug(slug);
          setActiveRoute('project');
        }
      } else if (path === '/admin') {
        if (isAdminLoggedIn) {
          setActiveRoute('admin');
        } else {
          setIsLoginModalOpen(true);
        }
      } else {
        setActiveRoute('home');
        setSelectedProjectSlug(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [projects, isAdminLoggedIn]);

  // Persist project changes
  const handleUpdateProjects = (updatedProjects: Project[]) => {
    setProjects(updatedProjects);
    saveProjects(updatedProjects);
  };

  const handleUpdateSettings = (updatedSettings: SiteSettings) => {
    setSettings(updatedSettings);
    saveSettings(updatedSettings);
  };

  const handleUpdateShowreel = (updatedShowreel: Showreel) => {
    setShowreel(updatedShowreel);
    saveShowreel(updatedShowreel);
  };

  const handleLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setAdminLoggedIn(true);
    setActiveRoute('admin');
    window.history.pushState({}, '', '/admin');
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setAdminLoggedIn(false);
    setActiveRoute('home');
    window.history.pushState({}, '', '/');
  };

  const handleOpenProject = (slug: string) => {
    const proj = projects.find(p => p.slug === slug);
    if (!proj) return;
    setSelectedProjectSlug(slug);
    setActiveRoute('project');
    window.history.pushState({}, '', `/projects/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToPortfolio = () => {
    setActiveRoute('home');
    setSelectedProjectSlug(null);
    window.history.pushState({}, '', '/');
  };

  const toggleShowreelPlay = () => {
    if (!showreelVideoRef.current) return;
    if (isShowreelPlaying) {
      showreelVideoRef.current.pause();
      setIsShowreelPlaying(false);
    } else {
      showreelVideoRef.current.play();
      setIsShowreelPlaying(true);
    }
  };

  const toggleShowreelMute = () => {
    if (!showreelVideoRef.current) return;
    showreelVideoRef.current.muted = !isShowreelMuted;
    setIsShowreelMuted(!isShowreelMuted);
  };

  // Render Admin Dashboard
  if (activeRoute === 'admin' && isAdminLoggedIn) {
    return (
      <AdminDashboard
        projects={projects}
        settings={settings}
        showreel={showreel}
        onUpdateProjects={handleUpdateProjects}
        onUpdateSettings={handleUpdateSettings}
        onUpdateShowreel={handleUpdateShowreel}
        onLogout={handleLogout}
        onViewProjectOnSite={(slug) => {
          handleOpenProject(slug);
        }}
      />
    );
  }

  // Render Project Detail One-Page
  if (activeRoute === 'project' && selectedProjectSlug) {
    const currentProject = projects.find(p => p.slug === selectedProjectSlug);
    if (currentProject) {
      return (
        <ProjectDetailPage
          project={currentProject}
          allProjects={projects}
          onBackToPortfolio={handleBackToPortfolio}
          onNavigateProject={handleOpenProject}
        />
      );
    }
  }

  // Render Main Portfolio Website
  return (
    <div className="w-screen h-screen bg-[#141312] text-[#191919] flex items-center justify-center p-0 md:p-3 overflow-hidden selection:bg-[#A52B25] selection:text-white select-none">
      {/* 16:9 Aspect Ratio Cinematic Container */}
      <div className="w-full aspect-video max-h-screen md:max-h-[calc(100vh-1.5rem)] max-w-[calc(100vh*16/9)] md:max-w-[calc((100vh-1.5rem)*16/9)] bg-[#F7F6F2] shadow-2xl relative flex flex-col justify-between overflow-hidden border border-[#DDDAD3]">
        {/* Signature 3D Vinyl Exhibition Section (Interactive LP Banner & Project Navigation) */}
        <section id="exhibition" className="relative w-full flex-1 min-h-0 bg-[#F7F6F2] overflow-hidden">
          <div className="w-full h-full">
            <SutideoVinylShelf
              projects={projects}
              onSelectProject={handleOpenProject}
            />
          </div>
        </section>

        {/* Contact Info & Admin Access at Bottom: Email, Instagram, Location, and Admin */}
        <section id="contact" className="py-2.5 px-4 sm:px-8 md:px-10 bg-[#F7F6F2] border-t border-[#DDDAD3] shrink-0">
          <div className="w-full flex items-center justify-between gap-4 md:gap-8">
            <div className="grid grid-cols-3 gap-3 sm:gap-8 flex-1">
              <div className="space-y-0.5 min-w-0">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider font-mono-sub text-[#777777] flex items-center gap-1">
                  <Mail className="w-3 h-3 text-[#A52B25] shrink-0" />
                  <span className="truncate">EMAIL</span>
                </span>
                <a 
                  href={`mailto:${settings.contactEmail}`}
                  className="font-editorial text-xs sm:text-sm text-[#191919] hover:text-[#A52B25] transition-colors block truncate"
                >
                  {settings.contactEmail}
                </a>
              </div>

              <div className="space-y-0.5 min-w-0">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider font-mono-sub text-[#777777] flex items-center gap-1">
                  <Instagram className="w-3 h-3 text-[#A52B25] shrink-0" />
                  <span className="truncate">INSTAGRAM</span>
                </span>
                <a 
                  href={settings.instagramUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="font-editorial text-xs sm:text-sm text-[#191919] hover:text-[#A52B25] transition-colors block truncate"
                >
                  @sutideosung
                </a>
              </div>

              <div className="space-y-0.5 min-w-0">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider font-mono-sub text-[#777777] flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#A52B25] shrink-0" />
                  <span className="truncate">LOCATION</span>
                </span>
                <p className="font-editorial text-xs sm:text-sm text-[#191919] truncate">
                  {settings.location}
                </p>
              </div>
            </div>

            {/* ADMIN Button in Bottom Section */}
            <div className="shrink-0">
              <button
                onClick={() => {
                  if (isAdminLoggedIn) {
                    setActiveRoute('admin');
                    window.history.pushState({}, '', '/admin');
                  } else {
                    setIsLoginModalOpen(true);
                  }
                }}
                className="px-3 py-1.5 border border-[#DDDAD3] hover:border-[#191919] text-[10px] sm:text-[11px] font-mono-sub uppercase tracking-wider text-[#191919] hover:bg-[#191919] hover:text-white transition-all rounded-sm flex items-center gap-1.5 shadow-xs"
                title="Administrator CMS Access"
              >
                <Shield className="w-3 h-3 text-[#A52B25]" />
                <span>ADMIN</span>
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

export default App;

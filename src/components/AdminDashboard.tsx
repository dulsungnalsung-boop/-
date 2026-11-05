import React, { useState } from 'react';
import { Project, SiteSettings, Showreel } from '../types/portfolio';
import { MAX_PROJECTS } from '../services/storage';
import { AlbumCoverEditor } from './AlbumCoverEditor';
import { ProjectDetailEditor } from './ProjectDetailEditor';
import { MediaUploader } from './MediaUploader';
import { 
  FolderKanban, 
  Disc, 
  FileEdit, 
  Film, 
  Settings, 
  LogOut, 
  Plus, 
  Trash2, 
  Eye, 
  EyeOff, 
  Edit3, 
  Check, 
  ArrowUp, 
  ArrowDown,
  LayoutDashboard,
  ExternalLink,
  Save,
  AlertTriangle
} from 'lucide-react';

interface AdminDashboardProps {
  projects: Project[];
  settings: SiteSettings;
  showreel: Showreel;
  onUpdateProjects: (projects: Project[]) => void;
  onUpdateSettings: (settings: SiteSettings) => void;
  onUpdateShowreel: (showreel: Showreel) => void;
  onLogout: () => void;
  onViewProjectOnSite: (slug: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  projects,
  settings,
  showreel,
  onUpdateProjects,
  onUpdateSettings,
  onUpdateShowreel,
  onLogout,
  onViewProjectOnSite
}) => {
  type AdminTab = 
    | 'dashboard'
    | 'portfolio'
    | 'lp_editor'
    | 'detail_editor'
    | 'showreel'
    | 'settings';

  const [currentTab, setCurrentTab] = useState<AdminTab>('dashboard');
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Draft project form state for Portfolio Management
  const [projectForm, setProjectForm] = useState<Partial<Project> | null>(null);

  const activeProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  const handleCreateNewProject = () => {
    if (projects.length >= MAX_PROJECTS) {
      alert(`최대 등록 가능한 LP 프로젝트 개수(${MAX_PROJECTS}개)에 도달했습니다.`);
      return;
    }

    const nextNumber = String(projects.length + 1).padStart(2, '0');
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      slug: `project-${nextNumber}`,
      projectNumber: nextNumber,
      title: `NEW PROJECT ${nextNumber}`,
      category: 'Commercial Film / Photography',
      year: new Date().getFullYear().toString(),
      shortDescription: '새로운 프로젝트의 핵심 소개를 입력하세요.',
      introduction: '프로젝트의 창작 의도와 시각적 방향성을 서술합니다.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      lpCoverUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&h=800&q=80',
      lpCoverPosition: { x: 50, y: 50, scale: 1 },
      centerLabelText: `SUTIDEO ${nextNumber} · NEW PROJECT`,
      mainVideoUrl: '/videos/sample-cinematic.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80',
      additionalMedia: [],
      displayOrder: projects.length + 1,
      isLpVisible: true,
      isPublished: true,
      contentBlocks: [
        {
          id: `b-${Date.now()}-1`,
          projectId: `proj-${Date.now()}`,
          blockType: 'heading',
          textContent: '프로젝트 비주얼 아카이브',
          sortOrder: 1
        },
        {
          id: `b-${Date.now()}-2`,
          projectId: `proj-${Date.now()}`,
          blockType: 'paragraph',
          textContent: 'SUTIDEO SUNG의 정체성을 담은 시각적 기록입니다.',
          sortOrder: 2
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updated = [...projects, newProj];
    onUpdateProjects(updated);
    setSelectedProjectId(newProj.id);
    setProjectForm(newProj);
    setCurrentTab('portfolio');
  };

  const handleDeleteProject = (id: string) => {
    if (projects.length <= 1) {
      alert('최소 1개의 프로젝트는 유지되어야 합니다.');
      return;
    }
    if (confirm('이 프로젝트와 LP 레코드를 영구 삭제하시겠습니까?')) {
      const filtered = projects.filter(p => p.id !== id);
      onUpdateProjects(filtered);
      if (selectedProjectId === id) {
        setSelectedProjectId(filtered[0]?.id || '');
      }
      setProjectForm(null);
    }
  };

  const handleTogglePublish = (id: string) => {
    const updated = projects.map(p => 
      p.id === id ? { ...p, isPublished: !p.isPublished, updatedAt: new Date().toISOString() } : p
    );
    onUpdateProjects(updated);
  };

  const handleMoveProjectOrder = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= projects.length) return;

    const list = [...projects];
    const [moved] = list.splice(index, 1);
    list.splice(newIndex, 0, moved);

    const reordered = list.map((p, i) => ({
      ...p,
      displayOrder: i + 1,
      projectNumber: String(i + 1).padStart(2, '0')
    }));
    onUpdateProjects(reordered);
  };

  const handleSaveProjectForm = () => {
    if (!projectForm || !projectForm.id) return;
    const updated = projects.map(p => 
      p.id === projectForm.id ? { ...p, ...projectForm, updatedAt: new Date().toISOString() } as Project : p
    );
    onUpdateProjects(updated);
    setProjectForm(null);
    alert('프로젝트 정보가 저장되었습니다.');
  };

  return (
    <div className="min-h-screen bg-[#EEEDE8] text-[#191919] flex flex-col md:flex-row font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#191919] text-[#F7F6F2] p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          <div>
            <span className="text-[10px] uppercase tracking-widest font-mono-sub text-[#A52B25] font-semibold">
              ADMIN CMS
            </span>
            <h2 className="font-editorial text-2xl font-normal tracking-wide text-white mt-1">
              SUTIDEO SUNG
            </h2>
            <div className="text-[11px] font-mono-sub text-[#777777] mt-1 flex items-center justify-between">
              <span>PROJECTS</span>
              <span className="text-white font-semibold">{projects.length} / {MAX_PROJECTS} MAX</span>
            </div>
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => { setCurrentTab('dashboard'); setProjectForm(null); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs font-mono-sub uppercase tracking-wider transition-colors ${
                currentTab === 'dashboard' ? 'bg-[#A52B25] text-white font-semibold' : 'text-[#AAAAAA] hover:bg-white/10 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>DASHBOARD</span>
            </button>

            <button
              onClick={() => { setCurrentTab('portfolio'); setProjectForm(null); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs font-mono-sub uppercase tracking-wider transition-colors ${
                currentTab === 'portfolio' ? 'bg-[#A52B25] text-white font-semibold' : 'text-[#AAAAAA] hover:bg-white/10 hover:text-white'
              }`}
            >
              <FolderKanban className="w-4 h-4" />
              <span>PORTFOLIO (15 LP)</span>
            </button>

            <button
              onClick={() => { setCurrentTab('lp_editor'); setProjectForm(null); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs font-mono-sub uppercase tracking-wider transition-colors ${
                currentTab === 'lp_editor' ? 'bg-[#A52B25] text-white font-semibold' : 'text-[#AAAAAA] hover:bg-white/10 hover:text-white'
              }`}
            >
              <Disc className="w-4 h-4" />
              <span>ALBUM COVER EDITOR</span>
            </button>

            <button
              onClick={() => { setCurrentTab('detail_editor'); setProjectForm(null); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs font-mono-sub uppercase tracking-wider transition-colors ${
                currentTab === 'detail_editor' ? 'bg-[#A52B25] text-white font-semibold' : 'text-[#AAAAAA] hover:bg-white/10 hover:text-white'
              }`}
            >
              <FileEdit className="w-4 h-4" />
              <span>PROJECT STORY CMS</span>
            </button>

            <button
              onClick={() => { setCurrentTab('showreel'); setProjectForm(null); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs font-mono-sub uppercase tracking-wider transition-colors ${
                currentTab === 'showreel' ? 'bg-[#A52B25] text-white font-semibold' : 'text-[#AAAAAA] hover:bg-white/10 hover:text-white'
              }`}
            >
              <Film className="w-4 h-4" />
              <span>SHOWREEL FILM</span>
            </button>

            <button
              onClick={() => { setCurrentTab('settings'); setProjectForm(null); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs font-mono-sub uppercase tracking-wider transition-colors ${
                currentTab === 'settings' ? 'bg-[#A52B25] text-white font-semibold' : 'text-[#AAAAAA] hover:bg-white/10 hover:text-white'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>WEBSITE SETTINGS</span>
            </button>
          </nav>
        </div>

        <div className="pt-8 border-t border-white/10">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-mono-sub uppercase tracking-wider text-red-400 hover:text-red-300 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>LOGOUT ADMIN</span>
          </button>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto max-h-screen">
        {/* Project Selector bar when in LP or Detail Editor */}
        {(currentTab === 'lp_editor' || currentTab === 'detail_editor') && (
          <div className="mb-6 p-4 bg-white border border-[#DDDAD3] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase font-mono-sub text-[#777777]">ACTIVE TARGET LP:</span>
              <select
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                className="px-3 py-1.5 bg-[#F7F6F2] border border-[#DDDAD3] text-sm font-editorial text-[#191919] focus:outline-none"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    LP {p.projectNumber} · {p.title}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => onViewProjectOnSite(activeProject.slug)}
              className="text-xs font-mono-sub uppercase tracking-wider text-[#A52B25] hover:underline flex items-center gap-1"
            >
              <span>PREVIEW DETAIL PAGE</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* TAB 1: OVERVIEW DASHBOARD */}
        {currentTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest font-mono-sub text-[#A52B25]">
                  STUDIO OVERVIEW
                </span>
                <h1 className="font-editorial text-3xl md:text-4xl font-normal text-[#191919]">
                  Administrative Dashboard
                </h1>
              </div>

              <button
                onClick={handleCreateNewProject}
                disabled={projects.length >= MAX_PROJECTS}
                className="px-5 py-2.5 bg-[#191919] hover:bg-[#A52B25] text-white text-xs font-mono-sub uppercase tracking-widest font-semibold flex items-center gap-2 disabled:opacity-40 transition-colors"
              >
                <Plus className="w-4 h-4" />
                CREATE PROJECT ({projects.length}/{MAX_PROJECTS})
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 border border-[#DDDAD3]">
                <span className="text-xs font-mono-sub uppercase text-[#777777]">TOTAL REGISTERED LPs</span>
                <div className="font-editorial text-4xl text-[#191919] mt-2 font-normal">
                  {projects.length} <span className="text-sm font-mono-sub text-[#777777]">/ 15</span>
                </div>
              </div>
              <div className="bg-white p-6 border border-[#DDDAD3]">
                <span className="text-xs font-mono-sub uppercase text-[#777777]">PUBLISHED ON EXHIBITION</span>
                <div className="font-editorial text-4xl text-emerald-700 mt-2 font-normal">
                  {projects.filter(p => p.isPublished).length}
                </div>
              </div>
              <div className="bg-white p-6 border border-[#DDDAD3]">
                <span className="text-xs font-mono-sub uppercase text-[#777777]">DRAFT PROJECTS</span>
                <div className="font-editorial text-4xl text-[#777777] mt-2 font-normal">
                  {projects.filter(p => !p.isPublished).length}
                </div>
              </div>
              <div className="bg-white p-6 border border-[#DDDAD3]">
                <span className="text-xs font-mono-sub uppercase text-[#777777]">SHOWREEL STATUS</span>
                <div className="font-editorial text-xl text-[#191919] mt-4 font-normal flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  {showreel.isPublished ? 'PUBLISHED 4K' : 'OFFLINE'}
                </div>
              </div>
            </div>

            {/* Live Collection Grid */}
            <div className="bg-white border border-[#DDDAD3] p-6 space-y-6">
              <h3 className="font-editorial text-xl font-normal text-[#191919]">
                Live 3D Vinyl Exhibition Collection
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {projects.map((proj, idx) => (
                  <div
                    key={proj.id}
                    className="border border-[#DDDAD3] p-3 bg-[#F7F6F2] hover:border-[#191919] transition-all group relative"
                  >
                    <div className="aspect-square bg-black overflow-hidden mb-2 relative">
                      <img
                        src={proj.lpCoverUrl || proj.thumbnailUrl}
                        alt={proj.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-1.5 left-1.5 bg-black/80 text-white text-[9px] font-mono-sub px-1.5 py-0.5">
                        LP {proj.projectNumber}
                      </span>
                    </div>

                    <h4 className="font-editorial text-sm truncate font-medium text-[#191919]">
                      {proj.title}
                    </h4>
                    <p className="text-[10px] text-[#777777] font-mono-sub uppercase truncate">
                      {proj.category}
                    </p>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#DDDAD3] text-xs">
                      <button
                        onClick={() => {
                          setSelectedProjectId(proj.id);
                          setCurrentTab('lp_editor');
                        }}
                        className="text-[10px] font-mono-sub uppercase text-[#A52B25] hover:underline"
                      >
                        EDIT LP
                      </button>
                      <button
                        onClick={() => {
                          setSelectedProjectId(proj.id);
                          setCurrentTab('detail_editor');
                        }}
                        className="text-[10px] font-mono-sub uppercase text-[#191919] hover:underline"
                      >
                        STORY
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PORTFOLIO MANAGEMENT */}
        {currentTab === 'portfolio' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest font-mono-sub text-[#A52B25]">
                  PROJECT ARCHIVE & LP RECORDS
                </span>
                <h1 className="font-editorial text-3xl font-normal text-[#191919]">
                  Portfolio Management
                </h1>
              </div>

              <button
                onClick={handleCreateNewProject}
                disabled={projects.length >= MAX_PROJECTS}
                className="px-5 py-2.5 bg-[#191919] hover:bg-[#A52B25] text-white text-xs font-mono-sub uppercase tracking-widest font-semibold flex items-center gap-2 disabled:opacity-40"
              >
                <Plus className="w-4 h-4" />
                ADD NEW PROJECT
              </button>
            </div>

            {/* Edit project modal/panel */}
            {projectForm ? (
              <div className="bg-white border border-[#DDDAD3] p-6 md:p-8 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#DDDAD3]">
                  <h3 className="font-editorial text-xl font-normal">
                    Edit Project Metadata: {projectForm.title}
                  </h3>
                  <button
                    onClick={() => setProjectForm(null)}
                    className="text-xs font-mono-sub uppercase text-[#777777] hover:text-[#191919]"
                  >
                    CLOSE
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[11px] font-mono-sub uppercase text-[#555555] block mb-1">
                      Project Title
                    </label>
                    <input
                      type="text"
                      value={projectForm.title || ''}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#DDDAD3] text-sm font-editorial"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono-sub uppercase text-[#555555] block mb-1">
                      Project Slug (Unique Route URL)
                    </label>
                    <input
                      type="text"
                      value={projectForm.slug || ''}
                      onChange={(e) => setProjectForm({ ...projectForm, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                      className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#DDDAD3] text-sm font-mono-sub"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono-sub uppercase text-[#555555] block mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      value={projectForm.category || ''}
                      onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                      className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#DDDAD3] text-sm font-mono-sub"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono-sub uppercase text-[#555555] block mb-1">
                      Production Year
                    </label>
                    <input
                      type="text"
                      value={projectForm.year || ''}
                      onChange={(e) => setProjectForm({ ...projectForm, year: e.target.value })}
                      className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#DDDAD3] text-sm font-mono-sub"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono-sub uppercase text-[#555555] block mb-1">
                    Short Description (For 3D Ledge Card)
                  </label>
                  <textarea
                    rows={2}
                    value={projectForm.shortDescription || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, shortDescription: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#DDDAD3] text-sm"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono-sub uppercase text-[#555555] block mb-1">
                    Creative Direction & Introduction (Project Top)
                  </label>
                  <textarea
                    rows={3}
                    value={projectForm.introduction || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, introduction: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#DDDAD3] text-sm font-editorial"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#DDDAD3]">
                  <MediaUploader
                    label="Primary 16:9 Thumbnail Image"
                    accept="image"
                    currentUrl={projectForm.thumbnailUrl}
                    onUploadComplete={(url) => setProjectForm({ ...projectForm, thumbnailUrl: url })}
                    aspectRatio="16:9"
                  />

                  <MediaUploader
                    label="Main Cinematic 4K Video (MP4 / WebM)"
                    accept="video"
                    currentUrl={projectForm.mainVideoUrl}
                    onUploadComplete={(url) => setProjectForm({ ...projectForm, mainVideoUrl: url })}
                    aspectRatio="16:9"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-[#DDDAD3]">
                  <button
                    onClick={() => setProjectForm(null)}
                    className="px-4 py-2 border border-[#DDDAD3] text-xs font-mono-sub"
                  >
                    CANCEL
                  </button>
                  <button
                    onClick={handleSaveProjectForm}
                    className="px-6 py-2 bg-[#191919] hover:bg-[#A52B25] text-white text-xs font-mono-sub font-semibold uppercase flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    SAVE PROJECT DETAILS
                  </button>
                </div>
              </div>
            ) : null}

            {/* Projects Table */}
            <div className="bg-white border border-[#DDDAD3] overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#DDDAD3] bg-[#F7F6F2] text-[11px] uppercase font-mono-sub text-[#555555]">
                    <th className="p-4 w-12 text-center">ORDER</th>
                    <th className="p-4 w-16">COVER</th>
                    <th className="p-4">TITLE & SLUG</th>
                    <th className="p-4">CATEGORY</th>
                    <th className="p-4">YEAR</th>
                    <th className="p-4 text-center">STATUS</th>
                    <th className="p-4 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DDDAD3] text-sm">
                  {projects.map((proj, idx) => (
                    <tr key={proj.id} className="hover:bg-[#F7F6F2]/50 transition-colors">
                      <td className="p-4 text-center font-mono-sub text-xs text-[#777777]">
                        <div className="flex flex-col items-center gap-1">
                          <button
                            disabled={idx === 0}
                            onClick={() => handleMoveProjectOrder(idx, 'up')}
                            className="p-0.5 hover:text-[#191919] disabled:opacity-20"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <span>{proj.projectNumber}</span>
                          <button
                            disabled={idx === projects.length - 1}
                            onClick={() => handleMoveProjectOrder(idx, 'down')}
                            className="p-0.5 hover:text-[#191919] disabled:opacity-20"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                      <td className="p-4">
                        <img
                          src={proj.lpCoverUrl || proj.thumbnailUrl}
                          alt={proj.title}
                          className="w-12 h-12 object-cover border border-[#DDDAD3]"
                        />
                      </td>
                      <td className="p-4">
                        <div className="font-editorial text-base text-[#191919] font-medium">
                          {proj.title}
                        </div>
                        <div className="text-[11px] text-[#777777] font-mono-sub">
                          /projects/{proj.slug}
                        </div>
                      </td>
                      <td className="p-4 text-xs font-mono-sub text-[#555555]">
                        {proj.category}
                      </td>
                      <td className="p-4 text-xs font-mono-sub text-[#555555]">
                        {proj.year}
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleTogglePublish(proj.id)}
                          className={`px-2.5 py-1 text-[10px] uppercase font-mono-sub font-semibold rounded-full ${
                            proj.isPublished
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-stone-200 text-stone-700'
                          }`}
                        >
                          {proj.isPublished ? 'PUBLISHED' : 'DRAFT'}
                        </button>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setSelectedProjectId(proj.id);
                              setProjectForm(proj);
                            }}
                            className="p-1.5 border border-[#DDDAD3] hover:border-[#191919] text-[#191919]"
                            title="Edit Metadata"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedProjectId(proj.id);
                              setCurrentTab('lp_editor');
                            }}
                            className="p-1.5 border border-[#DDDAD3] hover:border-[#A52B25] text-[#A52B25]"
                            title="Edit LP Cover"
                          >
                            <Disc className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedProjectId(proj.id);
                              setCurrentTab('detail_editor');
                            }}
                            className="p-1.5 border border-[#DDDAD3] hover:border-[#191919] text-[#191919]"
                            title="Edit Story Blocks"
                          >
                            <FileEdit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(proj.id)}
                            className="p-1.5 border border-red-200 hover:border-red-600 text-red-600"
                            title="Delete Project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ALBUM COVER EDITOR */}
        {currentTab === 'lp_editor' && activeProject && (
          <AlbumCoverEditor
            project={activeProject}
            onSave={(updated) => {
              const next = projects.map(p => p.id === updated.id ? updated : p);
              onUpdateProjects(next);
              alert('LP 커버 아트워크가 3D 씬에 반영되었습니다.');
            }}
            onCancel={() => setCurrentTab('dashboard')}
          />
        )}

        {/* TAB 4: PROJECT DETAIL BUILDER */}
        {currentTab === 'detail_editor' && activeProject && (
          <ProjectDetailEditor
            project={activeProject}
            onSave={(updated) => {
              const next = projects.map(p => p.id === updated.id ? updated : p);
              onUpdateProjects(next);
              alert('프로젝트 상세 페이지와 스토리 블록이 저장되었습니다.');
            }}
            onCancel={() => setCurrentTab('dashboard')}
          />
        )}

        {/* TAB 5: SHOWREEL MANAGEMENT */}
        {currentTab === 'showreel' && (
          <div className="bg-white border border-[#DDDAD3] p-6 md:p-8 space-y-8 max-w-4xl">
            <div className="flex items-center justify-between pb-6 border-b border-[#DDDAD3]">
              <div>
                <span className="text-[10px] uppercase tracking-widest font-mono-sub text-[#A52B25]">
                  STUDIO MAIN SHOWREEL
                </span>
                <h1 className="font-editorial text-3xl font-normal text-[#191919]">
                  Showreel Video Management
                </h1>
              </div>

              <button
                onClick={() => {
                  onUpdateShowreel({ ...showreel, isPublished: !showreel.isPublished });
                }}
                className={`px-4 py-1.5 text-xs font-mono-sub uppercase font-semibold ${
                  showreel.isPublished ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-700'
                }`}
              >
                {showreel.isPublished ? 'SHOWREEL ACTIVE' : 'SHOWREEL HIDDEN'}
              </button>
            </div>

            <div className="space-y-6">
              <MediaUploader
                label="Showreel Film Master (MP4 / WebM from PC)"
                accept="video"
                currentUrl={showreel.videoUrl}
                onUploadComplete={(url) => {
                  onUpdateShowreel({ ...showreel, videoUrl: url });
                }}
                aspectRatio="16:9"
              />

              <MediaUploader
                label="Showreel Poster Frame Image"
                accept="image"
                currentUrl={showreel.posterUrl}
                onUploadComplete={(url) => {
                  onUpdateShowreel({ ...showreel, posterUrl: url });
                }}
                aspectRatio="16:9"
              />
            </div>
          </div>
        )}

        {/* TAB 6: WEBSITE SETTINGS */}
        {currentTab === 'settings' && (
          <div className="bg-white border border-[#DDDAD3] p-6 md:p-8 space-y-8 max-w-4xl">
            <div className="pb-6 border-b border-[#DDDAD3]">
              <span className="text-[10px] uppercase tracking-widest font-mono-sub text-[#A52B25]">
                BRAND & GLOBAL CONTENT
              </span>
              <h1 className="font-editorial text-3xl font-normal text-[#191919]">
                Website Brand Settings
              </h1>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-[11px] font-mono-sub uppercase text-[#555555] block mb-1">
                  Brand Studio Name
                </label>
                <input
                  type="text"
                  value={settings.brandName}
                  onChange={(e) => onUpdateSettings({ ...settings, brandName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F7F6F2] border border-[#DDDAD3] text-sm font-editorial"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono-sub uppercase text-[#555555] block mb-1">
                  Brand Tagline (Korean)
                </label>
                <input
                  type="text"
                  value={settings.tagline}
                  onChange={(e) => onUpdateSettings({ ...settings, tagline: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F7F6F2] border border-[#DDDAD3] text-sm"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono-sub uppercase text-[#555555] block mb-1">
                  Our Philosophy Statement
                </label>
                <textarea
                  rows={4}
                  value={settings.philosophyText}
                  onChange={(e) => onUpdateSettings({ ...settings, philosophyText: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F7F6F2] border border-[#DDDAD3] text-sm font-editorial leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[11px] font-mono-sub uppercase text-[#555555] block mb-1">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => onUpdateSettings({ ...settings, contactEmail: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F7F6F2] border border-[#DDDAD3] text-sm font-mono-sub"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono-sub uppercase text-[#555555] block mb-1">
                    Instagram Handle / URL
                  </label>
                  <input
                    type="text"
                    value={settings.instagramUrl}
                    onChange={(e) => onUpdateSettings({ ...settings, instagramUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F7F6F2] border border-[#DDDAD3] text-sm font-mono-sub"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono-sub uppercase text-[#555555] block mb-1">
                  Studio Location
                </label>
                <input
                  type="text"
                  value={settings.location}
                  onChange={(e) => onUpdateSettings({ ...settings, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F7F6F2] border border-[#DDDAD3] text-sm"
                />
              </div>

              <div className="pt-4 border-t border-[#DDDAD3] flex justify-end">
                <button
                  onClick={() => alert('웹사이트 전역 설정이 성공적으로 저장되었습니다.')}
                  className="px-6 py-2.5 bg-[#191919] hover:bg-[#A52B25] text-white text-xs font-mono-sub uppercase tracking-widest font-semibold flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  SAVE GLOBAL SETTINGS
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

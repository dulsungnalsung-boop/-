import React, { useState } from 'react';
import { Project } from '../types/portfolio';
import { 
  ArrowLeft, 
  ArrowRight, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Calendar, 
  Tag, 
  Share2, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface ProjectDetailPageProps {
  project: Project;
  allProjects: Project[];
  onBackToPortfolio: () => void;
  onNavigateProject: (slug: string) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  project,
  allProjects,
  onBackToPortfolio,
  onNavigateProject
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [copied, setCopied] = useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const publishedProjects = allProjects.filter(p => p.isPublished);
  const currentIndex = publishedProjects.findIndex(p => p.id === project.id);
  const prevProject = currentIndex > 0 ? publishedProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < publishedProjects.length - 1 ? publishedProjects[currentIndex + 1] : null;
  const relatedProjects = publishedProjects.filter(p => p.id !== project.id).slice(0, 3);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="min-h-screen bg-[#F7F6F2] text-[#191919] pb-32">
      {/* Top Floating Navigation Bar */}
      <nav className="sticky top-0 z-40 bg-[#F7F6F2]/90 backdrop-blur-md border-b border-[#DDDAD3] px-6 md:px-12 py-4 flex items-center justify-between">
        <button
          onClick={onBackToPortfolio}
          className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest font-mono-sub text-[#191919] hover:text-[#A52B25] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>BACK TO PORTFOLIO</span>
        </button>

        <div className="flex items-center gap-4">
          <span className="text-xs uppercase tracking-widest font-mono-sub text-[#777777]">
            LP {project.projectNumber}
          </span>
          <button
            onClick={handleShare}
            className="p-2 border border-[#DDDAD3] rounded-full hover:border-[#191919] transition-colors text-[#191919]"
            title="Share Project"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
          {copied && (
            <span className="text-[10px] uppercase font-mono-sub text-[#A52B25] animate-fade-in">
              LINK COPIED
            </span>
          )}
        </div>
      </nav>

      {/* Editorial Header */}
      <header className="max-w-5xl mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-12">
        <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-widest font-mono-sub text-[#A52B25] mb-4">
          <span className="flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5" />
            {project.category}
          </span>
          <span className="text-[#DDDAD3]">/</span>
          <span className="flex items-center gap-1.5 text-[#777777]">
            <Calendar className="w-3.5 h-3.5" />
            {project.year}
          </span>
        </div>

        <h1 className="font-editorial text-4xl md:text-6xl lg:text-7xl font-normal tracking-tight text-[#191919] leading-[1.05] mb-8">
          {project.title}
        </h1>

        <p className="text-lg md:text-xl text-[#555555] font-light leading-relaxed max-w-3xl">
          {project.shortDescription}
        </p>
      </header>

      {/* Main Cinematic Video Player */}
      <section className="max-w-6xl mx-auto px-4 md:px-12 mb-20">
        <div className="relative aspect-video bg-[#141312] rounded-none overflow-hidden shadow-2xl group border border-[#DDDAD3]">
          {project.mainVideoUrl ? (
            <>
              <video
                ref={videoRef}
                src={project.mainVideoUrl}
                poster={
                  project.posterUrl &&
                  (!project.posterUrl.includes('images.unsplash.com') ||
                    project.thumbnailUrl === project.posterUrl ||
                    !project.thumbnailUrl ||
                    project.thumbnailUrl.includes('images.unsplash.com'))
                    ? project.posterUrl
                    : project.thumbnailUrl
                }
                playsInline
                muted={isMuted}
                loop
                className="w-full h-full object-cover cursor-pointer"
                onClick={togglePlay}
                onError={(e) => {
                  console.warn('Project main video failed to load:', project.mainVideoUrl, e);
                }}
              />

              {/* Video Overlay Controls */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-6 pointer-events-none">
                <div className="flex justify-end">
                  <span className="text-[10px] tracking-widest font-mono-sub bg-black/60 text-white px-3 py-1 rounded-full backdrop-blur-sm">
                    4K PRORES MASTER
                  </span>
                </div>

                <div className="flex items-center justify-between pointer-events-auto">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={togglePlay}
                      className="w-12 h-12 rounded-full bg-white/90 text-[#191919] flex items-center justify-center hover:bg-[#A52B25] hover:text-white transition-all transform hover:scale-105 shadow-lg"
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                    </button>
                    <button
                      onClick={toggleMute}
                      className="w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-all backdrop-blur-sm"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>

                  <button
                    onClick={handleFullscreen}
                    className="w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-all backdrop-blur-sm"
                  >
                    <Maximize className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {!isPlaying && (
                <div 
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/20 hover:bg-black/30 transition-colors"
                >
                  <div className="w-20 h-20 rounded-full bg-white/95 text-[#191919] flex items-center justify-center shadow-2xl hover:scale-110 hover:bg-[#A52B25] hover:text-white transition-all">
                    <Play className="w-8 h-8 ml-1" />
                  </div>
                </div>
              )}
            </>
          ) : (
            <img
              src={project.thumbnailUrl}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </section>

      {/* Project Introduction Statement */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 mb-24">
        <div className="border-l-2 border-[#A52B25] pl-6 md:pl-10 py-2">
          <span className="text-xs uppercase tracking-widest font-mono-sub text-[#777777] block mb-3">
            CREATIVE DIRECTION & PHILOSOPHY
          </span>
          <p className="text-xl md:text-2xl font-editorial leading-relaxed text-[#191919]">
            {project.introduction || project.shortDescription}
          </p>
        </div>
      </section>

      {/* Blog-Style Dynamic Content Blocks */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 space-y-16 mb-32">
        {project.contentBlocks && project.contentBlocks.length > 0 ? (
          project.contentBlocks
            .sort((a, b) => a.sortOrder - b.sortOrder)
            .map((block) => {
              switch (block.blockType) {
                case 'heading':
                  return (
                    <h2
                      key={block.id}
                      className="font-editorial text-2xl md:text-4xl font-normal text-[#191919] pt-8 border-t border-[#DDDAD3]"
                    >
                      {block.textContent}
                    </h2>
                  );

                case 'paragraph':
                  return (
                    <p
                      key={block.id}
                      className="text-[#444444] text-base md:text-lg leading-relaxed whitespace-pre-line font-light"
                    >
                      {block.textContent}
                    </p>
                  );

                case 'image':
                case 'image_caption':
                  return (
                    <figure key={block.id} className="space-y-3">
                      <div className="overflow-hidden border border-[#DDDAD3] bg-[#EEEDE8]">
                        <img
                          src={block.mediaUrl}
                          alt={block.altText || block.caption || 'Project visual'}
                          className="w-full h-auto object-cover"
                          loading="lazy"
                        />
                      </div>
                      {block.caption && (
                        <figcaption className="text-xs uppercase tracking-widest font-mono-sub text-[#777777] text-right">
                          — {block.caption}
                        </figcaption>
                      )}
                    </figure>
                  );

                case 'two_column':
                  return (
                    <div key={block.id} className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="overflow-hidden border border-[#DDDAD3] bg-[#EEEDE8]">
                          <img
                            src={block.mediaUrl}
                            alt="Visual column 1"
                            className="w-full h-full object-cover aspect-4/3"
                            loading="lazy"
                          />
                        </div>
                        <div className="overflow-hidden border border-[#DDDAD3] bg-[#EEEDE8]">
                          <img
                            src={block.mediaUrl2 || block.mediaUrl}
                            alt="Visual column 2"
                            className="w-full h-full object-cover aspect-4/3"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      {block.caption && (
                        <p className="text-xs uppercase tracking-widest font-mono-sub text-[#777777] text-center">
                          {block.caption}
                        </p>
                      )}
                    </div>
                  );

                case 'quote':
                  return (
                    <blockquote
                      key={block.id}
                      className="my-12 py-8 px-6 md:px-12 border-y border-[#DDDAD3] text-center"
                    >
                      <p className="font-editorial text-2xl md:text-3xl italic text-[#191919] leading-snug">
                        {block.textContent}
                      </p>
                    </blockquote>
                  );

                case 'divider':
                  return (
                    <hr key={block.id} className="border-t border-[#DDDAD3] my-12" />
                  );

                case 'video':
                case 'video_description':
                  return (
                    <div key={block.id} className="space-y-3">
                      <div className="aspect-video bg-black overflow-hidden border border-[#DDDAD3]">
                        <video
                          src={block.mediaUrl}
                          poster={block.posterUrl}
                          controls
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {block.caption && (
                        <p className="text-xs uppercase tracking-widest font-mono-sub text-[#777777]">
                          {block.caption}
                        </p>
                      )}
                    </div>
                  );

                default:
                  return null;
              }
            })
        ) : (
          <p className="text-center text-sm font-mono-sub text-[#777777] py-12">
            STORY CONTENT COMING SOON
          </p>
        )}
      </section>

      {/* Project Navigation Footer (Prev / Next) */}
      <footer className="max-w-5xl mx-auto px-6 md:px-12 pt-16 border-t border-[#DDDAD3]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {prevProject ? (
            <button
              onClick={() => onNavigateProject(prevProject.slug)}
              className="group text-left p-6 border border-[#DDDAD3] hover:border-[#191919] bg-white transition-all flex flex-col justify-between"
            >
              <span className="text-[10px] uppercase font-mono-sub text-[#777777] flex items-center gap-2 mb-4">
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                PREVIOUS PROJECT
              </span>
              <div>
                <h4 className="font-editorial text-xl font-normal group-hover:text-[#A52B25] transition-colors">
                  {prevProject.title}
                </h4>
                <p className="text-xs text-[#777777] uppercase font-mono-sub mt-1">
                  {prevProject.category}
                </p>
              </div>
            </button>
          ) : <div />}

          {nextProject ? (
            <button
              onClick={() => onNavigateProject(nextProject.slug)}
              className="group text-right p-6 border border-[#DDDAD3] hover:border-[#191919] bg-white transition-all flex flex-col justify-between"
            >
              <span className="text-[10px] uppercase font-mono-sub text-[#777777] flex items-center justify-end gap-2 mb-4">
                NEXT PROJECT
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </span>
              <div>
                <h4 className="font-editorial text-xl font-normal group-hover:text-[#A52B25] transition-colors">
                  {nextProject.title}
                </h4>
                <p className="text-xs text-[#777777] uppercase font-mono-sub mt-1">
                  {nextProject.category}
                </p>
              </div>
            </button>
          ) : <div />}
        </div>

        {/* Related Projects Showcase */}
        {relatedProjects.length > 0 && (
          <div>
            <h3 className="text-xs uppercase tracking-widest font-mono-sub text-[#191919] mb-8 pb-4 border-b border-[#DDDAD3]">
              MORE FROM SUTIDEO SUNG ARCHIVE
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onNavigateProject(rel.slug)}
                  className="group cursor-pointer border border-[#DDDAD3] bg-white p-4 transition-all hover:-translate-y-1 hover:border-[#191919]"
                >
                  <div className="aspect-square overflow-hidden bg-[#EEEDE8] mb-4">
                    <img
                      src={rel.lpCoverUrl || rel.thumbnailUrl}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="text-[10px] uppercase font-mono-sub text-[#A52B25] block">
                    LP {rel.projectNumber}
                  </span>
                  <h5 className="font-editorial text-lg font-normal text-[#191919] group-hover:text-[#A52B25] transition-colors">
                    {rel.title}
                  </h5>
                  <p className="text-xs text-[#777777] mt-1 font-light line-clamp-1">
                    {rel.category}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Back to Home CTA */}
        <div className="mt-24 text-center">
          <button
            onClick={onBackToPortfolio}
            className="px-8 py-4 border border-[#191919] text-[#191919] hover:bg-[#191919] hover:text-white transition-all text-xs uppercase tracking-widest font-mono-sub inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            RETURN TO 3D VINYL EXHIBITION
          </button>
        </div>
      </footer>
    </article>
  );
};

import React, { useEffect, useRef } from 'react';
import { LandingPageFrame } from '../shaders/landing-pages/LandingPageFrame';
import { Project } from '../types/portfolio';
import '../shaders/threeui.css';

export interface VinylCollectionProps {
  projects: Project[];
  onSelectProject: (slug: string) => void;
  selectedSlug?: string;
  isSuspended?: boolean;
}

export const SutideoVinylShelf: React.FC<VinylCollectionProps> = ({
  projects,
  onSelectProject,
  selectedSlug,
  isSuspended = false
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Synchronize dynamic projects data with iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Validate incoming message
      if (!event.data || typeof event.data !== 'object') return;

      if (event.data.type === 'SUTIDEO_VINYL_READY') {
        // Send current published projects
        const publishedProjects = projects.filter(p => p.isPublished);
        iframeRef.current?.contentWindow?.postMessage({
          type: 'SUTIDEO_UPDATE_PROJECTS',
          projects: publishedProjects
        }, '*');
        iframeRef.current?.contentWindow?.postMessage({
          type: 'SUTIDEO_SET_SUSPENDED',
          suspended: isSuspended
        }, '*');
      } else if (event.data.type === 'SUTIDEO_OPEN_PROJECT') {
        const slug = event.data.slug;
        if (typeof slug === 'string' && slug.length > 0) {
          // Verify slug belongs to published projects
          const found = projects.find(p => p.slug === slug && p.isPublished);
          if (found) {
            onSelectProject(slug);
          }
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [projects, onSelectProject, isSuspended]);

  // When projects change, push update to iframe
  useEffect(() => {
    const publishedProjects = projects.filter(p => p.isPublished);
    iframeRef.current?.contentWindow?.postMessage({
      type: 'SUTIDEO_UPDATE_PROJECTS',
      projects: publishedProjects
    }, '*');
  }, [projects]);

  // Suspend/resume 3D render loop when off-route
  useEffect(() => {
    iframeRef.current?.contentWindow?.postMessage({
      type: 'SUTIDEO_SET_SUSPENDED',
      suspended: isSuspended
    }, '*');
  }, [isSuspended]);

  // When selected slug changes from parent
  useEffect(() => {
    if (selectedSlug) {
      iframeRef.current?.contentWindow?.postMessage({
        type: 'SUTIDEO_SELECT_SLUG',
        slug: selectedSlug
      }, '*');
    }
  }, [selectedSlug]);

  return (
    <div className="w-full h-full relative select-none">
      <LandingPageFrame
        iframeRef={iframeRef}
        title="SUTIDEO SUNG 3D Vinyl Portfolio"
        sourceUrl="/landing-pages/sutideo-vinyl-portfolio.html"
      />
    </div>
  );
};

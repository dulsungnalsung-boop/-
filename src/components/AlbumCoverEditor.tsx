import React, { useState } from 'react';
import { Project } from '../types/portfolio';
import { MediaUploader } from './MediaUploader';
import { Disc, Sliders, Check, RefreshCw, Eye } from 'lucide-react';

interface AlbumCoverEditorProps {
  project: Project;
  onSave: (updatedProject: Project) => void;
  onCancel: () => void;
}

export const AlbumCoverEditor: React.FC<AlbumCoverEditorProps> = ({
  project,
  onSave,
  onCancel
}) => {
  const [coverUrl, setCoverUrl] = useState(project.lpCoverUrl || project.thumbnailUrl);
  const [posX, setPosX] = useState(project.lpCoverPosition?.x ?? 50);
  const [posY, setPosY] = useState(project.lpCoverPosition?.y ?? 50);
  const [scale, setScale] = useState(project.lpCoverPosition?.scale ?? 1);
  const [centerLabel, setCenterLabel] = useState(project.centerLabelText || `SUTIDEO · ${project.title}`);

  const handleUseThumbnail = () => {
    setCoverUrl(project.thumbnailUrl);
    setPosX(50);
    setPosY(50);
    setScale(1);
  };

  const handleSave = () => {
    onSave({
      ...project,
      lpCoverUrl: coverUrl,
      lpCoverPosition: {
        x: posX,
        y: posY,
        scale: scale
      },
      centerLabelText: centerLabel,
      updatedAt: new Date().toISOString()
    });
  };

  return (
    <div className="bg-white border border-[#DDDAD3] p-6 md:p-8 space-y-8">
      <div className="flex items-center justify-between pb-6 border-b border-[#DDDAD3]">
        <div>
          <span className="text-[10px] uppercase tracking-widest font-mono-sub text-[#A52B25]">
            LP SLEEVE & VINYL DISC ARTWORK
          </span>
          <h3 className="font-editorial text-2xl font-normal text-[#191919]">
            {project.title} — LP Cover Editor
          </h3>
        </div>

        <button
          onClick={handleUseThumbnail}
          className="px-3 py-1.5 border border-[#DDDAD3] hover:border-[#191919] text-xs font-mono-sub uppercase tracking-wider flex items-center gap-1.5"
        >
          <RefreshCw className="w-3 h-3" />
          USE PROJECT THUMBNAIL
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: Artwork Preview with Protruding Vinyl */}
        <div className="space-y-4">
          <label className="text-[11px] uppercase tracking-wider font-mono-sub text-[#555555] block">
            LIVE 3D VINYL MOCKUP PREVIEW
          </label>

          <div className="relative w-full aspect-16/10 bg-[#F7F6F2] border border-[#DDDAD3] flex items-center justify-center p-6 overflow-hidden">
            {/* 3D Vinyl Protruding Composition */}
            <div className="relative flex items-center">
              {/* Square LP Sleeve */}
              <div className="relative w-56 h-56 md:w-64 md:h-64 z-10 bg-[#191919] shadow-2xl overflow-hidden border border-[#DDDAD3]">
                <img
                  src={coverUrl}
                  alt="Sleeve Artwork"
                  className="w-full h-full object-cover transition-transform duration-100"
                  style={{
                    objectPosition: `${posX}% ${posY}%`,
                    transform: `scale(${scale})`
                  }}
                />
                {/* Paperboard subtle sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 pointer-events-none" />
              </div>

              {/* Black Vinyl Disc Protruding from Right Side (50% out) */}
              <div className="w-54 h-54 md:w-62 md:h-62 rounded-full bg-[#0E0E0E] -ml-28 md:-ml-32 shadow-xl border-4 border-[#141414] relative flex items-center justify-center group overflow-hidden">
                {/* Vinyl Grooves effect */}
                <div className="absolute inset-2 rounded-full border border-white/10 opacity-70" />
                <div className="absolute inset-6 rounded-full border border-white/5 opacity-60" />
                <div className="absolute inset-10 rounded-full border border-white/10 opacity-70" />
                <div className="absolute inset-14 rounded-full border border-white/5 opacity-50" />
                <div className="absolute inset-18 rounded-full border border-white/10 opacity-70" />

                {/* Circular Center Label */}
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#EEEDE8] border-2 border-[#191919] p-2 flex flex-col items-center justify-center text-center shadow-inner relative z-10">
                  <span className="text-[7px] font-mono-sub text-[#A52B25] font-semibold leading-none">
                    SUTIDEO SUNG
                  </span>
                  <span className="text-[8px] font-editorial text-[#191919] font-medium truncate max-w-[70px] mt-1 leading-tight">
                    {project.title}
                  </span>
                  <span className="text-[6px] font-mono-sub text-[#777777] mt-0.5">
                    LP {project.projectNumber}
                  </span>
                  {/* Spindle hole */}
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0E0E0E] mt-1" />
                </div>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-[#777777] font-mono-sub text-center">
            * 45~55% of the black LP disc protrudes to the right. Changes sync directly to the 3D exhibition.
          </p>
        </div>

        {/* Right: Controls & Upload */}
        <div className="space-y-6">
          <MediaUploader
            label="Upload Square LP Artwork (GIF, JPG, PNG, WebP or Direct URL)"
            accept="image"
            currentUrl={coverUrl}
            onUploadComplete={(url) => setCoverUrl(url)}
            aspectRatio="1:1"
          />

          <div className="space-y-4 pt-4 border-t border-[#DDDAD3]">
            <div className="flex items-center gap-2 text-xs font-mono-sub uppercase tracking-wider text-[#191919]">
              <Sliders className="w-4 h-4 text-[#A52B25]" />
              <span>Sleeve Crop & Position Adjustment</span>
            </div>

            <div>
              <div className="flex justify-between text-xs text-[#555555] font-mono-sub mb-1">
                <span>Horizontal Focal Point (X)</span>
                <span>{posX}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={posX}
                onChange={(e) => setPosX(Number(e.target.value))}
                className="w-full accent-[#A52B25]"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-[#555555] font-mono-sub mb-1">
                <span>Vertical Focal Point (Y)</span>
                <span>{posY}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={posY}
                onChange={(e) => setPosY(Number(e.target.value))}
                className="w-full accent-[#A52B25]"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-[#555555] font-mono-sub mb-1">
                <span>Artwork Scale / Zoom</span>
                <span>{scale.toFixed(2)}x</span>
              </div>
              <input
                type="range"
                min="1"
                max="2"
                step="0.05"
                value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
                className="w-full accent-[#A52B25]"
              />
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-[#DDDAD3]">
            <label className="text-[11px] uppercase tracking-wider font-mono-sub text-[#555555] block">
              Center Label Text & Stamp
            </label>
            <input
              type="text"
              value={centerLabel}
              onChange={(e) => setCenterLabel(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-[#DDDAD3] text-sm text-[#191919] focus:outline-none focus:border-[#191919] font-mono-sub"
              placeholder="e.g. SUTIDEO 01 · THE SILENT ECHO"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-6 border-t border-[#DDDAD3]">
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2.5 border border-[#DDDAD3] hover:border-[#191919] text-xs uppercase tracking-wider font-mono-sub text-[#555555]"
            >
              CANCEL
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-2.5 bg-[#191919] hover:bg-[#A52B25] text-white text-xs uppercase tracking-widest font-mono-sub font-semibold flex items-center gap-2 transition-colors"
            >
              <Check className="w-4 h-4" />
              SAVE LP ARTWORK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

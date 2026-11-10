import React, { useState } from 'react';
import { Project, ContentBlock } from '../types/portfolio';
import { MediaUploader } from './MediaUploader';
import { 
  Plus, 
  Trash2, 
  GripVertical, 
  ChevronUp, 
  ChevronDown, 
  Type, 
  AlignLeft, 
  Image as ImageIcon, 
  Video, 
  Columns, 
  Quote, 
  Minus,
  Check,
  Edit2
} from 'lucide-react';

interface ProjectDetailEditorProps {
  project: Project;
  onSave: (updatedProject: Project) => void;
  onCancel: () => void;
}

export const ProjectDetailEditor: React.FC<ProjectDetailEditorProps> = ({
  project,
  onSave,
  onCancel
}) => {
  const [title, setTitle] = useState(project.title);
  const [category, setCategory] = useState(project.category);
  const [year, setYear] = useState(project.year);
  const [shortDescription, setShortDescription] = useState(project.shortDescription);
  const [introduction, setIntroduction] = useState(project.introduction);
  const [mainVideoUrl, setMainVideoUrl] = useState(project.mainVideoUrl);
  const initialPoster =
    project.posterUrl &&
    (!project.posterUrl.includes('images.unsplash.com') ||
      project.thumbnailUrl === project.posterUrl ||
      !project.thumbnailUrl ||
      project.thumbnailUrl.includes('images.unsplash.com'))
      ? project.posterUrl
      : project.thumbnailUrl;
  const [posterUrl, setPosterUrl] = useState(initialPoster || project.thumbnailUrl || '');

  const [blocks, setBlocks] = useState<ContentBlock[]>(project.contentBlocks || []);
  const [editingCaptionId, setEditingCaptionId] = useState<string | null>(null);
  const [tempCaption, setTempCaption] = useState('');

  const addBlock = (type: ContentBlock['blockType']) => {
    const newBlock: ContentBlock = {
      id: `block-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      projectId: project.id,
      blockType: type,
      sortOrder: blocks.length + 1,
      textContent: type === 'heading' ? '새로운 섹션 헤딩' : type === 'paragraph' ? '스토리 텍스트를 입력하세요.' : type === 'quote' ? '“인상 깊은 디렉터의 인용구”' : undefined,
      caption: type === 'image' || type === 'image_caption' ? '촬영 현장 및 비주얼 캡션' : undefined,
      mediaUrl: type === 'image' || type === 'image_caption' ? 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80' : undefined
    };
    setBlocks([...blocks, newBlock]);
  };

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id));
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= blocks.length) return;

    const updated = [...blocks];
    const [moved] = updated.splice(index, 1);
    updated.splice(newIndex, 0, moved);

    // Reassign sort orders
    const reordered = updated.map((b, i) => ({ ...b, sortOrder: i + 1 }));
    setBlocks(reordered);
  };

  const updateBlockContent = (id: string, updates: Partial<ContentBlock>) => {
    setBlocks(blocks.map(b => (b.id === id ? { ...b, ...updates } : b)));
  };

  const startEditCaption = (block: ContentBlock) => {
    setEditingCaptionId(block.id);
    setTempCaption(block.caption || '');
  };

  const saveCaption = (id: string) => {
    updateBlockContent(id, { caption: tempCaption });
    setEditingCaptionId(null);
  };

  const handleSave = () => {
    onSave({
      ...project,
      title,
      category,
      year,
      shortDescription,
      introduction,
      mainVideoUrl,
      posterUrl,
      thumbnailUrl: posterUrl || project.thumbnailUrl,
      contentBlocks: blocks.map((b, i) => ({ ...b, sortOrder: i + 1 })),
      updatedAt: new Date().toISOString()
    });
  };

  return (
    <div className="bg-white border border-[#DDDAD3] p-6 md:p-8 space-y-8">
      <div className="flex items-center justify-between pb-6 border-b border-[#DDDAD3]">
        <div>
          <span className="text-[10px] uppercase tracking-widest font-mono-sub text-[#A52B25]">
            STORYTELLING & MEDIA BLOCKS
          </span>
          <h3 className="font-editorial text-2xl font-normal text-[#191919]">
            {project.title} — Detail Page Builder
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-[#DDDAD3] text-xs font-mono-sub uppercase tracking-wider text-[#555555] hover:border-[#191919]"
          >
            CANCEL
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2 bg-[#191919] hover:bg-[#A52B25] text-white text-xs font-mono-sub uppercase tracking-widest font-semibold flex items-center gap-2 transition-colors"
          >
            <Check className="w-4 h-4" />
            SAVE DETAIL PAGE
          </button>
        </div>
      </div>

      {/* Project Info & Main Video / Thumbnail */}
      <div className="p-5 bg-[#F7F6F2] border border-[#DDDAD3] space-y-5">
        <span className="text-[10px] uppercase tracking-widest font-mono-sub text-[#A52B25] block">
          PROJECT HEADER &amp; MAIN VIDEO THUMBNAIL
        </span>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-[11px] font-mono-sub uppercase text-[#555555] block mb-1">
              Project Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#DDDAD3] text-sm font-editorial"
            />
          </div>
          <div>
            <label className="text-[11px] font-mono-sub uppercase text-[#555555] block mb-1">
              Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#DDDAD3] text-sm font-mono-sub"
            />
          </div>
          <div>
            <label className="text-[11px] font-mono-sub uppercase text-[#555555] block mb-1">
              Year
            </label>
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#DDDAD3] text-sm font-mono-sub"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[11px] font-mono-sub uppercase text-[#555555] block mb-1">
              Short Description (LP Subtitle &amp; Header)
            </label>
            <textarea
              rows={2}
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#DDDAD3] text-sm"
            />
          </div>
          <div>
            <label className="text-[11px] font-mono-sub uppercase text-[#555555] block mb-1">
              Creative Direction &amp; Introduction
            </label>
            <textarea
              rows={2}
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#DDDAD3] text-sm font-editorial"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-[#DDDAD3]">
          <MediaUploader
            label="Main Video Thumbnail / Poster (16:9)"
            accept="image"
            currentUrl={posterUrl}
            onUploadComplete={(url) => setPosterUrl(url)}
            aspectRatio="16:9"
          />
          <MediaUploader
            label="Main Cinematic 4K Video (MP4 / WebM)"
            accept="video"
            currentUrl={mainVideoUrl}
            onUploadComplete={(url) => setMainVideoUrl(url)}
            aspectRatio="16:9"
          />
        </div>
      </div>

      {/* Block Insertion Toolbar */}
      <div className="p-4 bg-[#F7F6F2] border border-[#DDDAD3] space-y-2">
        <span className="text-[10px] uppercase tracking-widest font-mono-sub text-[#777777] block">
          INSERT CONTENT BLOCK
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => addBlock('heading')}
            className="px-3 py-1.5 bg-white border border-[#DDDAD3] hover:border-[#191919] text-xs font-mono-sub uppercase flex items-center gap-1.5"
          >
            <Type className="w-3.5 h-3.5 text-[#A52B25]" />
            + HEADING
          </button>
          <button
            type="button"
            onClick={() => addBlock('paragraph')}
            className="px-3 py-1.5 bg-white border border-[#DDDAD3] hover:border-[#191919] text-xs font-mono-sub uppercase flex items-center gap-1.5"
          >
            <AlignLeft className="w-3.5 h-3.5 text-[#A52B25]" />
            + PARAGRAPH
          </button>
          <button
            type="button"
            onClick={() => addBlock('image_caption')}
            className="px-3 py-1.5 bg-white border border-[#DDDAD3] hover:border-[#191919] text-xs font-mono-sub uppercase flex items-center gap-1.5"
          >
            <ImageIcon className="w-3.5 h-3.5 text-[#A52B25]" />
            + IMAGE WITH CAPTION
          </button>
          <button
            type="button"
            onClick={() => addBlock('video_description')}
            className="px-3 py-1.5 bg-white border border-[#DDDAD3] hover:border-[#191919] text-xs font-mono-sub uppercase flex items-center gap-1.5"
          >
            <Video className="w-3.5 h-3.5 text-[#A52B25]" />
            + VIDEO BLOCK
          </button>
          <button
            type="button"
            onClick={() => addBlock('two_column')}
            className="px-3 py-1.5 bg-white border border-[#DDDAD3] hover:border-[#191919] text-xs font-mono-sub uppercase flex items-center gap-1.5"
          >
            <Columns className="w-3.5 h-3.5 text-[#A52B25]" />
            + TWO-COLUMN IMAGES
          </button>
          <button
            type="button"
            onClick={() => addBlock('quote')}
            className="px-3 py-1.5 bg-white border border-[#DDDAD3] hover:border-[#191919] text-xs font-mono-sub uppercase flex items-center gap-1.5"
          >
            <Quote className="w-3.5 h-3.5 text-[#A52B25]" />
            + QUOTE
          </button>
          <button
            type="button"
            onClick={() => addBlock('divider')}
            className="px-3 py-1.5 bg-white border border-[#DDDAD3] hover:border-[#191919] text-xs font-mono-sub uppercase flex items-center gap-1.5"
          >
            <Minus className="w-3.5 h-3.5 text-[#A52B25]" />
            + DIVIDER
          </button>
        </div>
      </div>

      {/* Reorderable Content Blocks List */}
      <div className="space-y-4">
        {blocks.map((block, index) => (
          <div
            key={block.id}
            className="p-5 border border-[#DDDAD3] bg-[#FAFAF8] space-y-4 group hover:border-[#191919] transition-colors"
          >
            {/* Block Header & Reorder controls */}
            <div className="flex items-center justify-between pb-3 border-b border-[#DDDAD3]">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded bg-[#191919] text-white text-[11px] font-mono-sub flex items-center justify-center font-bold">
                  {index + 1}
                </span>
                <span className="text-xs uppercase font-mono-sub font-semibold text-[#191919]">
                  {block.blockType.replace('_', ' ')}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => moveBlock(index, 'up')}
                  className="p-1 text-[#777777] hover:text-[#191919] disabled:opacity-30"
                  title="Move Up"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  disabled={index === blocks.length - 1}
                  onClick={() => moveBlock(index, 'down')}
                  className="p-1 text-[#777777] hover:text-[#191919] disabled:opacity-30"
                  title="Move Down"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => removeBlock(block.id)}
                  className="p-1 text-red-600 hover:text-red-800 ml-2"
                  title="Delete Block"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Block Type Editor Content */}
            {block.blockType === 'heading' && (
              <div>
                <label className="text-[10px] uppercase font-mono-sub text-[#777777] block mb-1">
                  HEADING TEXT
                </label>
                <input
                  type="text"
                  value={block.textContent || ''}
                  onChange={(e) => updateBlockContent(block.id, { textContent: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#DDDAD3] font-editorial text-lg text-[#191919] focus:outline-none focus:border-[#191919]"
                />
              </div>
            )}

            {block.blockType === 'paragraph' && (
              <div>
                <label className="text-[10px] uppercase font-mono-sub text-[#777777] block mb-1">
                  PARAGRAPH CONTENT (Korean / English)
                </label>
                <textarea
                  rows={4}
                  value={block.textContent || ''}
                  onChange={(e) => updateBlockContent(block.id, { textContent: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#DDDAD3] text-sm text-[#191919] leading-relaxed focus:outline-none focus:border-[#191919]"
                />
              </div>
            )}

            {(block.blockType === 'image' || block.blockType === 'image_caption') && (
              <div className="space-y-4">
                <MediaUploader
                  label="Block Photograph (From PC)"
                  accept="image"
                  currentUrl={block.mediaUrl}
                  onUploadComplete={(url) => updateBlockContent(block.id, { mediaUrl: url })}
                />

                {/* Inline Caption Editor */}
                <div className="p-3 bg-white border border-[#DDDAD3]">
                  {editingCaptionId === block.id ? (
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-mono-sub text-[#A52B25] font-semibold">
                        EDITING IMAGE CAPTION INLINE
                      </label>
                      <input
                        type="text"
                        value={tempCaption}
                        onChange={(e) => setTempCaption(e.target.value)}
                        className="w-full px-3 py-1.5 border border-[#191919] text-xs font-mono-sub"
                        placeholder="사진에 대한 캡션을 입력하세요..."
                        autoFocus
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingCaptionId(null)}
                          className="px-2.5 py-1 text-[10px] font-mono-sub border border-[#DDDAD3]"
                        >
                          CANCEL
                        </button>
                        <button
                          type="button"
                          onClick={() => saveCaption(block.id)}
                          className="px-3 py-1 text-[10px] font-mono-sub bg-[#191919] text-white"
                        >
                          SAVE CAPTION
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between text-xs font-mono-sub">
                      <span className="text-[#555555] italic">
                        {block.caption ? `Caption: "${block.caption}"` : '(No caption entered)'}
                      </span>
                      <button
                        type="button"
                        onClick={() => startEditCaption(block)}
                        className="text-[#A52B25] hover:underline flex items-center gap-1"
                      >
                        <Edit2 className="w-3 h-3" />
                        EDIT INLINE CAPTION
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {block.blockType === 'two_column' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <MediaUploader
                    label="Left Image (From PC)"
                    accept="image"
                    currentUrl={block.mediaUrl}
                    onUploadComplete={(url) => updateBlockContent(block.id, { mediaUrl: url })}
                  />
                  <MediaUploader
                    label="Right Image (From PC)"
                    accept="image"
                    currentUrl={block.mediaUrl2}
                    onUploadComplete={(url) => updateBlockContent(block.id, { mediaUrl2: url })}
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-mono-sub text-[#777777] block mb-1">
                    TWO-COLUMN GROUP CAPTION
                  </label>
                  <input
                    type="text"
                    value={block.caption || ''}
                    onChange={(e) => updateBlockContent(block.id, { caption: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-[#DDDAD3] text-xs font-mono-sub"
                    placeholder="두 사진의 공통 캡션 입력"
                  />
                </div>
              </div>
            )}

            {block.blockType === 'quote' && (
              <div>
                <label className="text-[10px] uppercase font-mono-sub text-[#777777] block mb-1">
                  QUOTE STATEMENT
                </label>
                <input
                  type="text"
                  value={block.textContent || ''}
                  onChange={(e) => updateBlockContent(block.id, { textContent: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#DDDAD3] font-editorial italic text-base text-[#191919]"
                />
              </div>
            )}

            {(block.blockType === 'video' || block.blockType === 'video_description') && (
              <div className="space-y-3">
                <MediaUploader
                  label="Editorial Video (MP4/WebM)"
                  accept="video"
                  currentUrl={block.mediaUrl}
                  onUploadComplete={(url) => updateBlockContent(block.id, { mediaUrl: url })}
                />
                <div>
                  <label className="text-[10px] uppercase font-mono-sub text-[#777777] block mb-1">
                    VIDEO CAPTION / DESCRIPTION
                  </label>
                  <input
                    type="text"
                    value={block.caption || ''}
                    onChange={(e) => updateBlockContent(block.id, { caption: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-[#DDDAD3] text-xs font-mono-sub"
                  />
                </div>
              </div>
            )}

            {block.blockType === 'divider' && (
              <div className="py-2 text-center text-xs font-mono-sub text-[#888888]">
                — HORIZONTAL EDITORIAL RULE —
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

import React, { useRef, useState } from 'react';
import { UploadCloud, CheckCircle2, AlertCircle, Trash2, RotateCw, Link as LinkIcon, FileUp } from 'lucide-react';

interface MediaUploaderProps {
  label: string;
  accept: 'image' | 'video' | 'any';
  currentUrl?: string;
  onUploadComplete: (url: string, fileInfo?: { name: string; size: number; type: string }) => void;
  onRemove?: () => void;
  aspectRatio?: '16:9' | '1:1' | 'auto';
}

export const MediaUploader: React.FC<MediaUploaderProps> = ({
  label,
  accept,
  currentUrl,
  onUploadComplete,
  onRemove,
  aspectRatio = 'auto'
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadMode, setUploadMode] = useState<'file' | 'url'>('file');
  const [inputUrl, setInputUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileDetails, setFileDetails] = useState<{ name: string; size: string } | null>(null);

  const acceptMime =
    accept === 'image'
      ? 'image/jpeg,image/png,image/webp,image/gif,image/jpg,.gif,.jpg,.jpeg,.png,.webp'
      : accept === 'video'
      ? 'video/mp4,video/webm,video/ogg,video/quicktime,.mp4,.webm,.mov'
      : 'image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/ogg,video/quicktime,.gif,.mp4,.webm,.mov';

  const processFile = (file: File) => {
    setError(null);

    // Validate type
    const isImageFile = file.type.startsWith('image/') || file.name.match(/\.(jpg|jpeg|png|webp|gif)$/i);
    const isVideoFile = file.type.startsWith('video/') || file.name.match(/\.(mp4|webm|mov|ogg)$/i);

    if (accept === 'image' && !isImageFile) {
      setError('이미지 파일(JPG, PNG, WebP, GIF)만 업로드 가능합니다.');
      return;
    }
    if (accept === 'video' && !isVideoFile) {
      setError('비디오 파일(MP4, WebM, MOV)만 업로드 가능합니다.');
      return;
    }

    setIsProcessing(true);
    setFileDetails({
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`
    });

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setIsProcessing(false);
      onUploadComplete(result, {
        name: file.name,
        size: file.size,
        type: file.type
      });
    };
    reader.onerror = () => {
      setIsProcessing(false);
      setError('파일을 읽는 중 오류가 발생했습니다.');
    };

    reader.readAsDataURL(file);
  };

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const trimmed = inputUrl.trim();
    if (!trimmed) {
      setError('올바른 미디어 URL을 입력하세요.');
      return;
    }
    onUploadComplete(trimmed, {
      name: 'External URL',
      size: 0,
      type: accept
    });
    setFileDetails({
      name: trimmed.split('/').pop() || 'External Media',
      size: 'Direct URL'
    });
    setInputUrl('');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const isVideo =
    currentUrl?.startsWith('data:video') ||
    currentUrl?.startsWith('blob:') ||
    currentUrl?.match(/\.(mp4|webm|ogg|mov)(\?.*)?$/i);

  const isGif =
    currentUrl?.startsWith('data:image/gif') ||
    currentUrl?.match(/\.gif(\?.*)?$/i);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-[11px] uppercase tracking-wider font-mono-sub text-[#555555]">
          {label}
        </label>
        <div className="flex items-center gap-3">
          {/* Upload method toggle */}
          <div className="flex items-center border border-[#DDDAD3] rounded-sm overflow-hidden text-[10px] font-mono-sub">
            <button
              type="button"
              onClick={() => setUploadMode('file')}
              className={`px-2 py-0.5 flex items-center gap-1 ${
                uploadMode === 'file' ? 'bg-[#191919] text-white' : 'bg-white text-[#777777] hover:text-[#191919]'
              }`}
            >
              <FileUp className="w-2.5 h-2.5" />
              <span>FILE</span>
            </button>
            <button
              type="button"
              onClick={() => setUploadMode('url')}
              className={`px-2 py-0.5 flex items-center gap-1 ${
                uploadMode === 'url' ? 'bg-[#191919] text-white' : 'bg-white text-[#777777] hover:text-[#191919]'
              }`}
            >
              <LinkIcon className="w-2.5 h-2.5" />
              <span>URL</span>
            </button>
          </div>

          {currentUrl && onRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="text-[10px] text-red-600 hover:text-red-800 uppercase font-mono-sub flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" />
              REMOVE
            </button>
          )}
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={acceptMime}
        onChange={handleChange}
        className="hidden"
      />

      {currentUrl ? (
        <div className="relative border border-[#DDDAD3] bg-white group overflow-hidden">
          <div className={`w-full overflow-hidden flex items-center justify-center bg-[#EEEDE8] ${
            aspectRatio === '1:1' ? 'aspect-square' : aspectRatio === '16:9' ? 'aspect-video' : 'max-h-56'
          }`}>
            {isVideo ? (
              <video
                src={currentUrl}
                controls
                playsInline
                className="w-full h-full object-contain"
                onError={(e) => {
                  console.warn('Video preview failed to load:', currentUrl, e);
                }}
              />
            ) : (
              <img
                src={currentUrl}
                alt={label}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          <div className="p-3 bg-[#F7F6F2] border-t border-[#DDDAD3] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-[#555555]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="font-mono-sub text-[11px] truncate max-w-[200px]">
                {fileDetails ? fileDetails.name : 'Configured Media'}
              </span>
              {isGif && (
                <span className="bg-[#A52B25] text-white text-[9px] font-mono-sub px-1.5 py-0.2 rounded-sm font-bold">
                  GIF
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                if (uploadMode === 'file') {
                  fileInputRef.current?.click();
                } else {
                  setInputUrl(currentUrl);
                }
              }}
              className="px-2.5 py-1 text-[10px] font-mono-sub border border-[#DDDAD3] hover:border-[#191919] bg-white flex items-center gap-1"
            >
              <RotateCw className="w-2.5 h-2.5" />
              REPLACE
            </button>
          </div>
        </div>
      ) : uploadMode === 'url' ? (
        <form onSubmit={handleApplyUrl} className="p-4 border border-[#DDDAD3] bg-white space-y-3">
          <label className="text-[10px] uppercase font-mono-sub text-[#777777] block">
            PASTE DIRECT MEDIA URL (MP4, WEBM, MOV, GIF, JPG, PNG)
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="https://.../video.mp4 or https://.../animation.gif"
              className="flex-1 px-3 py-2 bg-[#F7F6F2] border border-[#DDDAD3] text-xs font-mono-sub text-[#191919] focus:outline-none focus:border-[#191919]"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#191919] hover:bg-[#A52B25] text-white text-xs font-mono-sub uppercase tracking-wider font-semibold transition-colors"
            >
              APPLY
            </button>
          </div>
        </form>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed p-6 text-center cursor-pointer transition-colors ${
            isDragging
              ? 'border-[#A52B25] bg-[#A52B25]/5'
              : 'border-[#DDDAD3] hover:border-[#191919] bg-white/60'
          }`}
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <UploadCloud className="w-8 h-8 text-[#777777]" />
            <div className="text-xs font-mono-sub uppercase tracking-wider text-[#191919]">
              SELECT FILES / DRAG AND DROP HERE
            </div>
            <p className="text-[11px] text-[#888888]">
              {accept === 'image'
                ? 'JPG, PNG, WebP, GIF supported'
                : accept === 'video'
                ? 'MP4, WebM, MOV (HD & 4K supported)'
                : 'Images (including GIF) and Videos supported'}
            </p>
          </div>
        </div>
      )}

      {isProcessing && (
        <div className="text-xs text-[#A52B25] font-mono-sub flex items-center gap-2">
          <RotateCw className="w-3.5 h-3.5 animate-spin" />
          <span>PROCESSING & PERSISTING MEDIA FILE...</span>
        </div>
      )}

      {error && (
        <div className="text-xs text-red-600 flex items-center gap-1.5 mt-1 font-mono-sub">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

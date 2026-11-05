import React from 'react';

export interface LandingPageFrameProps {
  title: string;
  sourceUrl: string;
  className?: string;
  onLoad?: (iframe: HTMLIFrameElement) => void;
  iframeRef?: React.Ref<HTMLIFrameElement>;
}

export const LandingPageFrame: React.FC<LandingPageFrameProps> = ({
  title,
  sourceUrl,
  className = '',
  onLoad,
  iframeRef
}) => {
  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <iframe
        ref={iframeRef}
        src={sourceUrl}
        title={title}
        className="w-full h-full border-0 block"
        sandbox="allow-scripts allow-same-origin allow-forms allow-modals allow-downloads"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        onLoad={(e) => {
          if (onLoad) {
            onLoad(e.currentTarget);
          }
        }}
      />
    </div>
  );
};

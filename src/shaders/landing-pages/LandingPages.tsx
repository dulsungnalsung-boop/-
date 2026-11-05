import React from 'react';
import { LandingPageFrame } from './LandingPageFrame';
import '../threeui.css';

export interface CompleteShelfLandingPageProps {
  headingFont?: string;
  bodyFont?: string;
  headingWeight?: string;
  bodyWeight?: string;
  primaryColor?: string;
  headingSize?: number;
  bodySize?: number;
  headingLetterSpacing?: number;
}

export const CompleteShelfLandingPage: React.FC<CompleteShelfLandingPageProps> = () => {
  return (
    <div className="shader-frame">
      <LandingPageFrame
        title="Complete Shelf"
        sourceUrl="/landing-pages/complete-shelf-v2.html"
      />
    </div>
  );
};

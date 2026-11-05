export interface ContentBlock {
  id: string;
  projectId: string;
  blockType:
    | 'heading'
    | 'paragraph'
    | 'image'
    | 'image_caption'
    | 'video'
    | 'video_description'
    | 'gallery'
    | 'two_column'
    | 'quote'
    | 'divider';
  textContent?: string;
  mediaUrl?: string;
  mediaUrl2?: string; // for two_column
  posterUrl?: string;
  caption?: string;
  altText?: string;
  galleryImages?: Array<{ url: string; caption?: string }>;
  sortOrder: number;
}

export interface Project {
  id: string;
  slug: string;
  projectNumber: string;
  title: string;
  category: string;
  year: string;
  shortDescription: string;
  introduction: string;
  thumbnailUrl: string;
  lpCoverUrl: string;
  lpCoverPosition: {
    x: number; // 0 to 100 percentage
    y: number; // 0 to 100 percentage
    scale: number; // 1 to 2
  };
  centerLabelText: string;
  mainVideoUrl: string;
  posterUrl: string;
  additionalMedia: Array<{
    id: string;
    type: 'image' | 'video';
    url: string;
    caption?: string;
  }>;
  displayOrder: number;
  isLpVisible: boolean;
  isPublished: boolean;
  contentBlocks: ContentBlock[];
  createdAt: string;
  updatedAt: string;
}

export interface Showreel {
  id: string;
  videoUrl: string;
  posterUrl: string;
  isPublished: boolean;
}

export interface SiteSettings {
  brandName: string;
  tagline: string;
  philosophyHeading: string;
  philosophyText: string;
  contactEmail: string;
  instagramUrl: string;
  location: string;
  footerText: string;
}

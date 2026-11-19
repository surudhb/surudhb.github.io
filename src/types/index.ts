export interface GalleryItem {
  title: string
  description?: string
  imageUrl?: string
  linkUrl?: string
}

export interface ExternalLink {
  label: string
  href: string
}

export interface ExperienceLinkItem {
  label: string
  href?: string
  title?: string
  engagementWindow?: string
  role?: string
  links?: ExternalLink[]
  bullets?: string[]
  tags?: string[]
}

export interface Experience {
  id: string
  company: string
  location: string
  position: string
  period: string
  startDate: string
  endDate: string
  tags: string[]
  bullets: string[]
  highlight?: string
  link?: string
  links?: ExperienceLinkItem[]
  gallery?: GalleryItem[]
}

export interface EducationItem {
  institution: string
  degree: string
  period: string
  honours?: string
  link?: string
  links?: ExternalLink[]
}

export interface Profile {
  name: string
  role: string
  tagline: string
  seeking: string
  location: string
  bio: string[]
  education: EducationItem[]
  socialLinks: {
    label: string
    href: string
  }[]
}

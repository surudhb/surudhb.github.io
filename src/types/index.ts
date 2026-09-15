export interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  tags: string[]
  liveUrl?: string
  githubUrl?: string
  date: string
  featured?: boolean
  highlight?: string
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
}

export interface Article {
  id: string
  title: string
  slug: string
  date: string
  tags: string[]
  excerpt: string
  readingTime: string
  content?: string
}

export interface MediaItem {
  title: string
  creator: string
  link?: string
}

export interface Profile {
  name: string
  role: string
  tagline: string
  location: string
  bio: string[]
  education: {
    institution: string
    degree: string
    period: string
    honours?: string
    link?: string
  }[]
  skills: {
    category: string
    items: string[]
  }[]
  readingList: MediaItem[]
  watchList: MediaItem[]
  dialogues: string[]
  socialLinks: {
    label: string
    href: string
  }[]
}

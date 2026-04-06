export interface HeroContent {
  tagline: string
  headline: string
  subtitle: string
  ctaText: string
  backgroundImage: string
}

export interface PhilosophyFeature {
  title: string
  subtitle: string
}

export interface PhilosophyContent {
  title: string
  description: string
  image: string
  features: PhilosophyFeature[]
}

export interface ProjectsSectionContent {
  sectionTitle: string
  sectionDescription: string
}

export interface MoodboardItem {
  id: string
  title: string
  style: string
}

export interface MoodboardsContent {
  sectionTitle: string
  sectionDescription: string
  items: MoodboardItem[]
}

export interface BeforeAfterContent {
  title: string
  subtitle: string
  beforeImage: string
  afterImage: string
  beforeLabel: string
  afterLabel: string
}

export interface FeaturedProjectsContent {
  sectionTagline: string
  sectionTitle: string
}

export interface ServiceItem {
  title: string
  description: string
  iconName: string
}

export interface ServicesContent {
  sectionTagline: string
  sectionTitle: string
  items: ServiceItem[]
}

export interface ProcessStep {
  number: string
  title: string
  description: string
  iconName: string
}

export interface ProcessStepsContent {
  sectionSubtitle: string
  items: ProcessStep[]
}

export interface TestimonialItem {
  id: number
  quote: string
  author: string
  location: string
}

export interface TestimonialsContent {
  items: TestimonialItem[]
}

export interface ContactContent {
  sectionTagline: string
  sectionTitle: string
  sectionSubtitle: string
  email: string
  locationText: string
  projectTypes: string[]
}

export interface AboutValue {
  title: string
  description: string
}

export interface AboutContent {
  heroTagline: string
  heroTitle: string
  introParagraphs: string[]
  values: AboutValue[]
  approachParagraphs: string[]
  ctaTitle: string
  ctaDescription: string
}

export interface SocialLinksContent {
  instagram: string
  facebook: string
  linkedin: string
  tiktok: string
}

export interface SiteSettingsContent {
  logoLight: string
  logoDark: string
  metaTitle: string
  metaDescription: string
}

export type ContentKey =
  | "hero"
  | "philosophy"
  | "projects-section"
  | "moodboards"
  | "before-after"
  | "featured-projects"
  | "services"
  | "process-steps"
  | "testimonials"
  | "contact"
  | "about"
  | "social-links"
  | "site-settings"

export type ContentMap = {
  hero: HeroContent
  philosophy: PhilosophyContent
  "projects-section": ProjectsSectionContent
  moodboards: MoodboardsContent
  "before-after": BeforeAfterContent
  "featured-projects": FeaturedProjectsContent
  services: ServicesContent
  "process-steps": ProcessStepsContent
  testimonials: TestimonialsContent
  contact: ContactContent
  about: AboutContent
  "social-links": SocialLinksContent
  "site-settings": SiteSettingsContent
}

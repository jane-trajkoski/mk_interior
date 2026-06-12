import { z } from "zod"
import { slugify } from "@/lib/utils"

// Normalized at the schema so every write path stores URL-safe slugs
const slugSchema = z.string().transform(slugify).pipe(z.string().min(1))

export const heroSchema = z.object({
  tagline: z.string().min(1),
  headline: z.string().min(1),
  subtitle: z.string().min(1),
  ctaText: z.string().min(1),
  backgroundImage: z.string().min(1),
})

export const philosophySchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  image: z.string().min(1),
  features: z.array(
    z.object({
      title: z.string().min(1),
      subtitle: z.string().min(1),
    })
  ),
})

export const projectsSectionSchema = z.object({
  sectionTitle: z.string().min(1),
  sectionDescription: z.string().min(1),
})

export const moodboardsSchema = z.object({
  sectionTitle: z.string().min(1),
  sectionDescription: z.string().min(1),
  items: z.array(
    z.object({
      id: z.string().min(1),
      title: z.string().min(1),
      style: z.string().min(1),
    })
  ),
})

export const beforeAfterSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().min(1),
  beforeImage: z.string().min(1),
  afterImage: z.string().min(1),
  beforeLabel: z.string().min(1),
  afterLabel: z.string().min(1),
})

export const featuredProjectsSchema = z.object({
  sectionTagline: z.string().min(1),
  sectionTitle: z.string().min(1),
})

export const servicesSchema = z.object({
  sectionTagline: z.string().min(1),
  sectionTitle: z.string().min(1),
  items: z.array(
    z.object({
      title: z.string().min(1),
      description: z.string().min(1),
      iconName: z.string().min(1),
    })
  ),
})

export const processStepsSchema = z.object({
  sectionSubtitle: z.string().min(1),
  items: z.array(
    z.object({
      number: z.string().min(1),
      title: z.string().min(1),
      description: z.string().min(1),
      iconName: z.string().min(1),
    })
  ),
})

export const testimonialsSchema = z.object({
  items: z.array(
    z.object({
      id: z.number(),
      quote: z.string().min(1),
      author: z.string().min(1),
      location: z.string().min(1),
    })
  ),
})

export const contactSchema = z.object({
  sectionTagline: z.string().min(1),
  sectionTitle: z.string().min(1),
  sectionSubtitle: z.string().min(1),
  email: z.string().email(),
  locationText: z.string().min(1),
  projectTypes: z.array(z.string().min(1)),
})

export const aboutSchema = z.object({
  heroTagline: z.string().min(1),
  heroTitle: z.string().min(1),
  introParagraphs: z.array(z.string().min(1)),
  values: z.array(
    z.object({
      title: z.string().min(1),
      description: z.string().min(1),
    })
  ),
  approachParagraphs: z.array(z.string().min(1)),
  ctaTitle: z.string().min(1),
  ctaDescription: z.string().min(1),
})

export const socialLinksSchema = z.object({
  instagram: z.string(),
  facebook: z.string(),
  linkedin: z.string(),
  tiktok: z.string(),
})

export const siteSettingsSchema = z.object({
  logoLight: z.string().min(1),
  logoDark: z.string().min(1),
  metaTitle: z.string().min(1),
  metaDescription: z.string().min(1),
})

export const roomSchema = z.object({
  id: z.string().optional(),
  slug: slugSchema,
  title: z.string().min(1),
  category_id: z.string().min(1),
  description: z.string().min(1),
  images: z.array(z.object({ src: z.string().min(1), alt: z.string() })),
  colors: z.array(z.object({ name: z.string().min(1), color: z.string().min(1) })),
  sort_order: z.number().default(0),
})

export const categorySchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  slug: slugSchema,
  image: z.string().default(""),
  sort_order: z.number().default(0),
})

export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  projectType: z.string().optional(),
  message: z.string().min(1, "Message is required"),
})

export const contentSchemaMap = {
  hero: heroSchema,
  philosophy: philosophySchema,
  "projects-section": projectsSectionSchema,
  moodboards: moodboardsSchema,
  "before-after": beforeAfterSchema,
  "featured-projects": featuredProjectsSchema,
  services: servicesSchema,
  "process-steps": processStepsSchema,
  testimonials: testimonialsSchema,
  contact: contactSchema,
  about: aboutSchema,
  "social-links": socialLinksSchema,
  "site-settings": siteSettingsSchema,
} as const

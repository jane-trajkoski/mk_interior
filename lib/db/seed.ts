import { db } from "./index"
import { content, categories, rooms } from "./schema"
import type {
  HeroContent,
  PhilosophyContent,
  ProjectsSectionContent,
  MoodboardsContent,
  BeforeAfterContent,
  FeaturedProjectsContent,
  ServicesContent,
  ProcessStepsContent,
  TestimonialsContent,
  ContactContent,
  AboutContent,
  SocialLinksContent,
  SiteSettingsContent,
} from "../types/content"

const heroData: HeroContent = {
  tagline: "Luxury Interior Design",
  headline: "Crafting Spaces That Inspire",
  subtitle:
    "We transform interiors into immersive experiences — blending elegance, comfort, and timeless design.",
  ctaText: "Get in Touch",
  backgroundImage: "/images/hero.jpg",
}

const philosophyData: PhilosophyContent = {
  title: "Why us?",
  description:
    "We provide personalized and high-quality interior design solutions tailored to each client's needs. Our creativity, professionalism and attention to detail ensure that every project is unique and successful.",
  image: "/images/modern-interior.jpg",
  features: [
    { title: "Personalized Approach", subtitle: "Tailored to your unique style" },
    { title: "3D Visualization", subtitle: "See your space before building" },
    { title: "Attention to Detail", subtitle: "Every element considered" },
    { title: "Full Support", subtitle: "From concept to completion" },
  ],
}

const projectsSectionData: ProjectsSectionContent = {
  sectionTitle: "Our Projects",
  sectionDescription:
    "Explore our portfolio of carefully crafted interiors, each designed to reflect the unique personality and needs of our clients.",
}

const moodboardsData: MoodboardsContent = {
  sectionTitle: "Moodboard's inspiration",
  sectionDescription:
    "Discover the aesthetic directions that inspire our work. Each moodboard captures a distinct design philosophy.",
  items: [
    {
      id: "minimalist",
      title: "Minimalist interior design",
      style: "Clean lines, neutral tones, purposeful simplicity",
    },
    {
      id: "industrial",
      title: "Industrial interior design",
      style: "Raw materials, exposed elements, urban character",
    },
    {
      id: "modern-contemporary",
      title: "Modern-Contemporary interior design",
      style: "Sleek finishes, current trends, timeless elegance",
    },
  ],
}

const beforeAfterData: BeforeAfterContent = {
  title: "Before-After",
  subtitle: "Upload a photo of your room and choose your style!",
  beforeImage: "/images/bedroom-2.jpg",
  afterImage: "/images/bedroom-1.jpg",
  beforeLabel: "Before",
  afterLabel: "After",
}

const featuredProjectsData: FeaturedProjectsContent = {
  sectionTagline: "Explore",
  sectionTitle: "Featured Projects",
}

const servicesData: ServicesContent = {
  sectionTagline: "What We Offer",
  sectionTitle: "Our Services",
  items: [
    {
      title: "Residential Design",
      description:
        "Complete home transformations that honor how you truly live. From single rooms to entire properties.",
      iconName: "Home",
    },
    {
      title: "3D Visualization",
      description:
        "Photorealistic renders and immersive 3D tours that bring your future space to life.",
      iconName: "Layers",
    },
    {
      title: "Material Curation",
      description:
        "Hand-selected natural materials and artisan pieces that age beautifully and tell a story.",
      iconName: "Palette",
    },
    {
      title: "Light Design",
      description:
        "Layered lighting schemes that shift with the day, creating atmosphere and supporting wellbeing.",
      iconName: "Lightbulb",
    },
  ],
}

const processStepsData: ProcessStepsContent = {
  sectionSubtitle:
    "Our process transforms your vision into a beautiful reality",
  items: [
    {
      number: "01",
      title: "Concept",
      description:
        "We begin with understanding your vision, lifestyle, and aspirations for the space.",
      iconName: "MessageSquare",
    },
    {
      number: "02",
      title: "2D Plan",
      description:
        "Detailed floor plans and spatial layouts that optimize flow and functionality.",
      iconName: "Lightbulb",
    },
    {
      number: "03",
      title: "3D Plan",
      description:
        "Immersive 3D visualizations that bring your future space to life before construction.",
      iconName: "Box",
    },
    {
      number: "04",
      title: "Render",
      description:
        "Photorealistic renders showcasing materials, lighting, and final design details.",
      iconName: "Image",
    },
    {
      number: "05",
      title: "Presentation",
      description:
        "Complete design package with all specifications ready for implementation.",
      iconName: "Presentation",
    },
  ],
}

const testimonialsData: TestimonialsContent = {
  items: [
    {
      id: 1,
      quote:
        "MK Interiors transformed our apartment beyond our expectations. Their attention to detail and understanding of our lifestyle created a home that truly reflects who we are.",
      author: "Elena & Marcus",
      location: "Modern Living Room Project",
    },
    {
      id: 2,
      quote:
        "The 3D visualizations were incredible - we could see exactly how our space would look before any work began. The final result matched perfectly.",
      author: "Sofia Andersson",
      location: "Japandi Bedroom Design",
    },
    {
      id: 3,
      quote:
        "Working with MK Interiors felt like a true collaboration. They listened to our ideas and elevated them with their expertise and creative vision.",
      author: "The Petrov Family",
      location: "Complete Home Renovation",
    },
  ],
}

const contactData: ContactContent = {
  sectionTagline: "Get in Touch",
  sectionTitle: "Ready to transform your space?",
  sectionSubtitle:
    "Every meaningful space begins with a conversation. Share your vision, and let's explore how we might bring it to life together.",
  email: "creativeinteriors.mk@gmail.com",
  locationText: "Available Worldwide",
  projectTypes: ["Residential", "Commercial", "Renovation", "Consultation"],
}

const aboutData: AboutContent = {
  heroTagline: "Our Story",
  heroTitle: "About us",
  introParagraphs: [
    "We are MK Interiors \u2013 a creative studio specializing in interior design and 3D visualizations.",
    "Founded just a year ago out of a passion for beautiful and functional spaces, today we are a team of two designers dedicated to helping clients visualize and create their ideal homes.",
    'Our specialty lies in 3D visualizations and personalized "Before & After" transformations that allow you to see the full potential of your space before making any changes.',
    "We believe every space deserves a personal approach, smart solutions, and a style that reflects your unique energy.",
    "Whether you're updating a cozy corner or redesigning an entire apartment \u2013 we're here to bring your ideas to life.",
  ],
  values: [
    {
      title: "Personalization",
      description: "Every project is tailored to reflect your unique lifestyle.",
    },
    {
      title: "Quality",
      description: "We believe in doing things right, not just fast.",
    },
    {
      title: "Transparency",
      description: "Clear communication and honest guidance throughout.",
    },
    {
      title: "Creativity",
      description:
        "Fresh perspectives that push boundaries while respecting your vision.",
    },
  ],
  approachParagraphs: [
    "We combine modern 3D visualization technology with timeless design principles. This allows you to experience your transformed space before any work begins.",
    "Our collaborative process ensures that every design decision aligns with your goals, budget, and timeline.",
  ],
  ctaTitle: "Ready to start your project?",
  ctaDescription: "Let's discuss how we can help transform your space.",
}

const socialLinksData: SocialLinksContent = {
  instagram: "#",
  facebook: "#",
  linkedin: "#",
  tiktok: "#",
}

const siteSettingsData: SiteSettingsContent = {
  logoLight: "/logo-black.png",
  logoDark: "/logo-color.png",
  metaTitle: "MK Interiors | Interior Design & 3D Visualization",
  metaDescription:
    "Creative studio specializing in interior design and 3D visualizations. We bring your ideas to life with personalized, high-quality design solutions.",
}

const categoryMap: Record<string, string> = {
  "Living Rooms": "living-rooms",
  Bedrooms: "bedrooms",
  "Dining Rooms": "dining-rooms",
  Kidsrooms: "kidsrooms",
  Office: "office",
  Bathrooms: "bathrooms",
}

const seedCategories = [
  { id: "living-rooms", title: "Living Rooms", slug: "living-rooms", image: "/images/living-room-1.jpg", sort_order: 0 },
  { id: "bedrooms", title: "Bedrooms", slug: "bedrooms", image: "/images/bedroom-1.jpg", sort_order: 1 },
  { id: "dining-rooms", title: "Dining Rooms", slug: "dining-rooms", image: "/images/dining-room.jpg", sort_order: 2 },
  { id: "kidsrooms", title: "Kidsrooms", slug: "kidsrooms", image: "/images/kids-room.jpg", sort_order: 3 },
  { id: "office", title: "Office", slug: "office", image: "/images/office.jpg", sort_order: 4 },
  { id: "bathrooms", title: "Bathrooms", slug: "bathrooms", image: "/images/bathroom.jpg", sort_order: 5 },
]

const seedRooms = [
  {
    id: "1",
    slug: "japandi-living-room",
    title: "Japandi Living Room",
    category_id: "living-rooms",
    description:
      "A Japandi living room radiates calm and understated elegance. Soft neutral tones, natural materials, and clean lines create a harmonious balance between warmth and minimalism. Light wood, linen, and ceramic details add texture and authenticity, while the uncluttered design brings a sense of peace and mindful living.",
    images: [
      { src: "/images/living-room-1.jpg", alt: "Japandi living room main view" },
      { src: "/images/living-room-2.jpg", alt: "Japandi living room seating area" },
      { src: "/images/modern-interior.jpg", alt: "Japandi living room dining nook" },
      { src: "/images/living-room-1.jpg", alt: "Japandi living room details" },
    ],
    colors: [
      { name: "Warm Beige", color: "#E8DDD4" },
      { name: "Natural Linen", color: "#D4C9BE" },
      { name: "Light Oak", color: "#C9B896" },
    ],
    sort_order: 0,
  },
  {
    id: "2",
    slug: "modern-living-room",
    title: "Modern Living Room",
    category_id: "living-rooms",
    description:
      "A modern living room designed in soft neutral tones. Shades of grey and cream bouclé fabrics create a cozy yet elegant atmosphere. The space features plenty of natural wood elements and decorative pieces made of tinted glass, adding warmth and sophistication to the overall modern aesthetic.",
    images: [
      { src: "/images/living-room-2.jpg", alt: "Modern living room main view" },
      { src: "/images/living-room-1.jpg", alt: "Modern living room sofa area" },
      { src: "/images/modern-interior.jpg", alt: "Modern living room TV wall" },
      { src: "/images/hero.jpg", alt: "Modern living room details" },
    ],
    colors: [
      { name: "Cool Gray", color: "#B8B8B8" },
      { name: "Cream", color: "#F5F0E8" },
      { name: "Charcoal", color: "#3A3A3A" },
      { name: "Natural Wood", color: "#C4A77D" },
      { name: "White Marble", color: "#F0EDE8" },
    ],
    sort_order: 1,
  },
  {
    id: "3",
    slug: "modern-bedroom",
    title: "Modern Bedroom",
    category_id: "bedrooms",
    description:
      "A serene bedroom sanctuary designed for rest and rejuvenation. Soft textiles, muted colors, and thoughtful lighting create an atmosphere of calm. The space balances luxury with comfort, featuring plush bedding and carefully curated decorative elements.",
    images: [
      { src: "/images/bedroom-1.jpg", alt: "Modern bedroom main view" },
      { src: "/images/bedroom-2.jpg", alt: "Modern bedroom bed area" },
      { src: "/images/bedroom-1.jpg", alt: "Modern bedroom seating" },
    ],
    colors: [
      { name: "Dusty Rose", color: "#D4A5A5" },
      { name: "Cream White", color: "#FAF6F0" },
      { name: "Soft Taupe", color: "#C4B7A6" },
    ],
    sort_order: 2,
  },
  {
    id: "4",
    slug: "dining-room",
    title: "Dining Room",
    category_id: "dining-rooms",
    description:
      "An elegant dining space that brings people together. The design combines sophisticated furniture with warm ambient lighting to create the perfect setting for memorable gatherings. Natural materials and carefully selected art pieces add character to the space.",
    images: [
      { src: "/images/dining-room.jpg", alt: "Dining room main view" },
      { src: "/images/modern-interior.jpg", alt: "Dining room table setting" },
      { src: "/images/dining-room.jpg", alt: "Dining room lighting" },
    ],
    colors: [
      { name: "Warm Wood", color: "#8B6914" },
      { name: "Ivory", color: "#FFFFF0" },
      { name: "Gold Accent", color: "#D4AF37" },
    ],
    sort_order: 3,
  },
  {
    id: "5",
    slug: "kids-room",
    title: "Kids Room",
    category_id: "kidsrooms",
    description:
      "A playful yet sophisticated space designed to grow with your child. The room balances fun and functionality with clever storage solutions and adaptable furniture. Soft colors and rounded edges create a safe and inspiring environment.",
    images: [
      { src: "/images/kids-room.jpg", alt: "Kids room main view" },
      { src: "/images/kids-room.jpg", alt: "Kids room play area" },
      { src: "/images/bedroom-1.jpg", alt: "Kids room desk area" },
    ],
    colors: [
      { name: "Soft Pink", color: "#F5D7D7" },
      { name: "Sky Blue", color: "#D0E4F0" },
      { name: "Warm Cream", color: "#F5F0E0" },
    ],
    sort_order: 4,
  },
  {
    id: "6",
    slug: "home-office",
    title: "Home Office",
    category_id: "office",
    description:
      "A productive workspace that inspires creativity and focus. The design incorporates ergonomic furniture, optimal lighting, and thoughtful organization to support your work. Natural elements and personal touches make it a space you enjoy spending time in.",
    images: [
      { src: "/images/office.jpg", alt: "Home office main view" },
      { src: "/images/office.jpg", alt: "Home office desk area" },
      { src: "/images/modern-interior.jpg", alt: "Home office shelving" },
    ],
    colors: [
      { name: "Dark Walnut", color: "#5D4037" },
      { name: "Sage Green", color: "#9CAF88" },
      { name: "Off White", color: "#FAF8F5" },
    ],
    sort_order: 5,
  },
  {
    id: "7",
    slug: "modern-bathroom",
    title: "Modern Bathroom",
    category_id: "bathrooms",
    description:
      "A spa-like bathroom retreat that combines luxury with functionality. Premium materials, clever storage, and atmospheric lighting create a space for daily rituals and relaxation. The design emphasizes clean lines and natural textures.",
    images: [
      { src: "/images/bathroom.jpg", alt: "Modern bathroom main view" },
      { src: "/images/bathroom.jpg", alt: "Modern bathroom vanity" },
      { src: "/images/bathroom.jpg", alt: "Modern bathroom shower" },
    ],
    colors: [
      { name: "Warm Oak", color: "#C9A86C" },
      { name: "White Porcelain", color: "#FFFFFF" },
      { name: "Brass", color: "#B5A642" },
    ],
    sort_order: 6,
  },
]

const contentSeedData: Record<string, unknown> = {
  hero: heroData,
  philosophy: philosophyData,
  "projects-section": projectsSectionData,
  moodboards: moodboardsData,
  "before-after": beforeAfterData,
  "featured-projects": featuredProjectsData,
  services: servicesData,
  "process-steps": processStepsData,
  testimonials: testimonialsData,
  contact: contactData,
  about: aboutData,
  "social-links": socialLinksData,
  "site-settings": siteSettingsData,
}

export async function seed() {
  console.log("Seeding content...")
  for (const [key, data] of Object.entries(contentSeedData)) {
    await db
      .insert(content)
      .values({ key, data })
      .onConflictDoUpdate({ target: content.key, set: { data, updated_at: new Date() } })
  }

  console.log("Seeding categories...")
  for (const cat of seedCategories) {
    await db
      .insert(categories)
      .values(cat)
      .onConflictDoUpdate({
        target: categories.id,
        set: { title: cat.title, slug: cat.slug, image: cat.image, sort_order: cat.sort_order },
      })
  }

  console.log("Seeding rooms...")
  for (const room of seedRooms) {
    await db
      .insert(rooms)
      .values(room)
      .onConflictDoUpdate({
        target: rooms.id,
        set: {
          slug: room.slug,
          title: room.title,
          category_id: room.category_id,
          description: room.description,
          images: room.images,
          colors: room.colors,
          sort_order: room.sort_order,
        },
      })
  }

  console.log("Seed complete!")
}

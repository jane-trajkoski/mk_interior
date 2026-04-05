export interface RoomImage {
  src: string
  alt: string
}

export interface ColorSwatch {
  name: string
  color: string
}

export interface Room {
  id: string
  slug: string
  title: string
  category: string
  description: string
  images: RoomImage[]
  colors: ColorSwatch[]
}

export const rooms: Room[] = [
  {
    id: "1",
    slug: "japandi-living-room",
    title: "Japandi Living Room",
    category: "Living Rooms",
    description:
      "A Japandi living room radiates calm and understated elegance. Soft neutral tones, natural materials, and clean lines create a harmonious balance between warmth and minimalism. Light wood, linen, and ceramic details add texture and authenticity, while the uncluttered design brings a sense of peace and mindful living.",
    images: [
      { src: "/placeholder-japandi-1.jpg", alt: "Japandi living room main view" },
      { src: "/placeholder-japandi-2.jpg", alt: "Japandi living room seating area" },
      { src: "/placeholder-japandi-3.jpg", alt: "Japandi living room dining nook" },
      { src: "/placeholder-japandi-4.jpg", alt: "Japandi living room details" },
    ],
    colors: [
      { name: "Warm Beige", color: "#E8DDD4" },
      { name: "Natural Linen", color: "#D4C9BE" },
      { name: "Light Oak", color: "#C9B896" },
    ],
  },
  {
    id: "2",
    slug: "modern-living-room",
    title: "Modern Living Room",
    category: "Living Rooms",
    description:
      "A modern living room designed in soft neutral tones. Shades of grey and cream bouclé fabrics create a cozy yet elegant atmosphere. The space features plenty of natural wood elements and decorative pieces made of tinted glass, adding warmth and sophistication to the overall modern aesthetic.",
    images: [
      { src: "/placeholder-modern-1.jpg", alt: "Modern living room main view" },
      { src: "/placeholder-modern-2.jpg", alt: "Modern living room sofa area" },
      { src: "/placeholder-modern-3.jpg", alt: "Modern living room TV wall" },
      { src: "/placeholder-modern-4.jpg", alt: "Modern living room details" },
    ],
    colors: [
      { name: "Cool Gray", color: "#B8B8B8" },
      { name: "Cream", color: "#F5F0E8" },
      { name: "Charcoal", color: "#3A3A3A" },
      { name: "Natural Wood", color: "#C4A77D" },
      { name: "White Marble", color: "#F0EDE8" },
    ],
  },
  {
    id: "3",
    slug: "modern-bedroom",
    title: "Modern Bedroom",
    category: "Bedrooms",
    description:
      "A serene bedroom sanctuary designed for rest and rejuvenation. Soft textiles, muted colors, and thoughtful lighting create an atmosphere of calm. The space balances luxury with comfort, featuring plush bedding and carefully curated decorative elements.",
    images: [
      { src: "/placeholder-bedroom-1.jpg", alt: "Modern bedroom main view" },
      { src: "/placeholder-bedroom-2.jpg", alt: "Modern bedroom bed area" },
      { src: "/placeholder-bedroom-3.jpg", alt: "Modern bedroom seating" },
    ],
    colors: [
      { name: "Dusty Rose", color: "#D4A5A5" },
      { name: "Cream White", color: "#FAF6F0" },
      { name: "Soft Taupe", color: "#C4B7A6" },
    ],
  },
  {
    id: "4",
    slug: "dining-room",
    title: "Dining Room",
    category: "Dining Rooms",
    description:
      "An elegant dining space that brings people together. The design combines sophisticated furniture with warm ambient lighting to create the perfect setting for memorable gatherings. Natural materials and carefully selected art pieces add character to the space.",
    images: [
      { src: "/placeholder-dining-1.jpg", alt: "Dining room main view" },
      { src: "/placeholder-dining-2.jpg", alt: "Dining room table setting" },
      { src: "/placeholder-dining-3.jpg", alt: "Dining room lighting" },
    ],
    colors: [
      { name: "Warm Wood", color: "#8B6914" },
      { name: "Ivory", color: "#FFFFF0" },
      { name: "Gold Accent", color: "#D4AF37" },
    ],
  },
  {
    id: "5",
    slug: "kids-room",
    title: "Kids Room",
    category: "Kidsrooms",
    description:
      "A playful yet sophisticated space designed to grow with your child. The room balances fun and functionality with clever storage solutions and adaptable furniture. Soft colors and rounded edges create a safe and inspiring environment.",
    images: [
      { src: "/placeholder-kids-1.jpg", alt: "Kids room main view" },
      { src: "/placeholder-kids-2.jpg", alt: "Kids room play area" },
      { src: "/placeholder-kids-3.jpg", alt: "Kids room desk area" },
    ],
    colors: [
      { name: "Soft Pink", color: "#F5D7D7" },
      { name: "Sky Blue", color: "#D0E4F0" },
      { name: "Warm Cream", color: "#F5F0E0" },
    ],
  },
  {
    id: "6",
    slug: "home-office",
    title: "Home Office",
    category: "Office",
    description:
      "A productive workspace that inspires creativity and focus. The design incorporates ergonomic furniture, optimal lighting, and thoughtful organization to support your work. Natural elements and personal touches make it a space you enjoy spending time in.",
    images: [
      { src: "/placeholder-office-1.jpg", alt: "Home office main view" },
      { src: "/placeholder-office-2.jpg", alt: "Home office desk area" },
      { src: "/placeholder-office-3.jpg", alt: "Home office shelving" },
    ],
    colors: [
      { name: "Dark Walnut", color: "#5D4037" },
      { name: "Sage Green", color: "#9CAF88" },
      { name: "Off White", color: "#FAF8F5" },
    ],
  },
  {
    id: "7",
    slug: "modern-bathroom",
    title: "Modern Bathroom",
    category: "Bathrooms",
    description:
      "A spa-like bathroom retreat that combines luxury with functionality. Premium materials, clever storage, and atmospheric lighting create a space for daily rituals and relaxation. The design emphasizes clean lines and natural textures.",
    images: [
      { src: "/placeholder-bathroom-1.jpg", alt: "Modern bathroom main view" },
      { src: "/placeholder-bathroom-2.jpg", alt: "Modern bathroom vanity" },
      { src: "/placeholder-bathroom-3.jpg", alt: "Modern bathroom shower" },
    ],
    colors: [
      { name: "Warm Oak", color: "#C9A86C" },
      { name: "White Porcelain", color: "#FFFFFF" },
      { name: "Brass", color: "#B5A642" },
    ],
  },
]

export interface Category {
  id: string
  title: string
  categoryLabel: string
}

export const categories: Category[] = [
  { id: "living-rooms", title: "Living Rooms", categoryLabel: "Living Rooms" },
  { id: "bedrooms", title: "Bedrooms", categoryLabel: "Bedrooms" },
  { id: "dining-rooms", title: "Dining Rooms", categoryLabel: "Dining Rooms" },
  { id: "kidsrooms", title: "Kidsrooms", categoryLabel: "Kidsrooms" },
  { id: "office", title: "Office", categoryLabel: "Office" },
  { id: "bathrooms", title: "Bathrooms", categoryLabel: "Bathrooms" },
]

export function getRoomBySlug(slug: string): Room | undefined {
  return rooms.find((room) => room.slug === slug)
}

export function getRoomsByCategory(category: string): Room[] {
  return rooms.filter((room) => room.category === category)
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((cat) => cat.id === id)
}

export function getRoomsByCategoryId(id: string): Room[] {
  const category = getCategoryById(id)
  if (!category) return []
  return rooms.filter((room) => room.category === category.categoryLabel)
}

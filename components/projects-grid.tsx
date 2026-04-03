"use client"

import Link from "next/link"
import { useInView } from "@/hooks/use-in-view"

// Dynamic project categories based on mockup
const projectCategories = [
  {
    id: "living-rooms",
    title: "Living Rooms",
    slug: "japandi-living-room",
    image: "/placeholder-living.jpg",
    hasImage: false,
  },
  {
    id: "bedrooms",
    title: "Bedrooms",
    slug: "modern-bedroom",
    image: "/placeholder-bedroom.jpg",
    hasImage: false,
  },
  {
    id: "dining-rooms",
    title: "Dining Rooms",
    slug: "dining-room",
    image: "/placeholder-dining.jpg",
    hasImage: false,
  },
  {
    id: "kidsrooms",
    title: "Kidsrooms",
    slug: "kids-room",
    image: "/placeholder-kids.jpg",
    hasImage: false,
  },
  {
    id: "office",
    title: "Office",
    slug: "home-office",
    image: "/placeholder-office.jpg",
    hasImage: false,
  },
  {
    id: "bathrooms",
    title: "Bathrooms",
    slug: "modern-bathroom",
    image: "/placeholder-bathroom.jpg",
    hasImage: false,
  },
]

export function ProjectsGrid() {
  const [sectionRef, isInView] = useInView<HTMLElement>({ once: true, margin: "-100px" })

  return (
    <section ref={sectionRef} id="projects" className="py-24 lg:py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-600 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-4">Our Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our portfolio of carefully crafted interiors, each designed to reflect the unique personality and
            needs of our clients.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectCategories.map((project, index) => (
            <div
              key={project.id}
              className={`transition-all duration-600 ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${0.1 + index * 0.1}s` }}
            >
              <Link
                href={`/room/${project.slug}`}
                className="group block relative overflow-hidden rounded-lg aspect-[4/3] bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                {/* Placeholder or Image */}
                {project.hasImage ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">Image placeholder</span>
                  </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-500" />

                {/* Title with underline */}
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-charcoal/60 to-transparent">
                  <h3 className="font-serif text-xl md:text-2xl text-cream tracking-wide text-center">
                    <span className="relative inline-block">
                      {project.title.toUpperCase()}
                      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-px bg-cream/60 transition-all duration-300 group-hover:w-full" />
                    </span>
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

"use client"

import Link from "next/link"
import { useInView } from "@/hooks/use-in-view"
import type { ProjectsSectionContent } from "@/lib/types/content"

const defaultCategories = [
  { id: "living-rooms", title: "Living Rooms", slug: "living-rooms", image: "/images/living-room-1.jpg" },
  { id: "bedrooms", title: "Bedrooms", slug: "bedrooms", image: "/images/bedroom-1.jpg" },
  { id: "dining-rooms", title: "Dining Rooms", slug: "dining-rooms", image: "/images/dining-room.jpg" },
  { id: "kidsrooms", title: "Kidsrooms", slug: "kidsrooms", image: "/images/kids-room.jpg" },
  { id: "office", title: "Office", slug: "office", image: "/images/office.jpg" },
  { id: "bathrooms", title: "Bathrooms", slug: "bathrooms", image: "/images/bathroom.jpg" },
]

interface CategoryLike {
  id: string
  title: string
  slug?: string
  image: string
}

function ProjectCard({ project, index, isInView }: { project: CategoryLike; index: number; isInView: boolean }) {
  return (
    <div
      className={`flex-shrink-0 w-[80vw] snap-center md:w-auto md:flex-shrink md:snap-align-none transition-all duration-600 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${0.1 + index * 0.1}s` }}
    >
      <Link
        href={`/category/${project.id}`}
        className="group block relative overflow-hidden rounded-lg aspect-[4/3] bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-500" />
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
  )
}

export function ProjectsGrid({ data, categories }: { data?: ProjectsSectionContent; categories?: CategoryLike[] }) {
  const sectionTitle = data?.sectionTitle ?? "Our Projects"
  const sectionDescription = data?.sectionDescription ?? "Explore our portfolio of carefully crafted interiors, each designed to reflect the unique personality and needs of our clients."
  const projectCategories = categories ?? defaultCategories
  const [sectionRef, isInView] = useInView<HTMLElement>({ once: true, margin: "-100px" })

  return (
    <section ref={sectionRef} id="projects" className="py-24 lg:py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-600 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-4">{sectionTitle}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{sectionDescription}</p>
        </div>

        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 scrollbar-hide md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:overflow-x-visible md:snap-none md:pb-0">
          {projectCategories.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}

"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { rooms as defaultRooms } from "@/lib/rooms-data"
import { useInView } from "@/hooks/use-in-view"
import type { FeaturedProjectsContent } from "@/lib/types/content"

interface RoomLike {
  slug: string
  title: string
  category_id?: string
  category?: string
  images: { src: string; alt: string }[]
}

export function FeaturedProjects({ data, rooms }: { data?: FeaturedProjectsContent; rooms?: RoomLike[] }) {
  const sectionTagline = data?.sectionTagline ?? "Explore"
  const sectionTitle = data?.sectionTitle ?? "Featured Projects"
  const roomsList = rooms ?? defaultRooms

  const featuredProjects = roomsList.map((room) => ({
    slug: room.slug,
    title: room.title,
    category: (room as { category?: string }).category ?? (room as { category_id?: string }).category_id ?? "",
    image: room.images[0]?.src,
  }))

  const [sectionRef, isInView] = useInView<HTMLElement>({ once: true, margin: "-100px" })
  const [current, setCurrent] = useState(0)
  // Stack of slide indices: the outgoing image stays mounted underneath while
  // the incoming one fades in on top, then the old layer is dropped.
  const [layers, setLayers] = useState<number[]>([0])

  useEffect(() => {
    setLayers((ls) => (ls[ls.length - 1] === current ? ls : [ls[ls.length - 1], current]))
    const timer = setTimeout(() => setLayers((ls) => [ls[ls.length - 1]]), 700)
    return () => clearTimeout(timer)
  }, [current])

  const prev = () => setCurrent((c) => (c - 1 + featuredProjects.length) % featuredProjects.length)
  const next = () => setCurrent((c) => (c + 1) % featuredProjects.length)

  const project = featuredProjects[current]

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-12 transition-all duration-600 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3">{sectionTagline}</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground">{sectionTitle}</h2>
        </div>

        <div className={`transition-all duration-700 delay-200 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <Link
            href={`/room/${project.slug}`}
            className="group block relative overflow-hidden rounded-lg aspect-[16/9] md:aspect-[2/1] bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            {layers.map((index, i) => {
              const p = featuredProjects[index]
              return (
                <img
                  key={`${p.slug}-${index}`}
                  src={p.image}
                  alt={p.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${i > 0 ? "animate-fade-in" : ""}`}
                />
              )
            })}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/10 to-transparent" />
            <div key={project.slug} className="absolute bottom-0 left-0 p-6 md:p-10 animate-fade-in-up">
              <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-cream/70 mb-2">{project.category}</p>
              <h3 className="font-serif text-2xl md:text-4xl text-cream tracking-wide">{project.title.toUpperCase()}</h3>
            </div>
          </Link>
        </div>

        <div className={`flex items-center justify-between mt-6 transition-all duration-600 delay-300 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
          <p className="lg:hidden text-sm text-muted-foreground tabular-nums" aria-live="polite">
            {current + 1} / {featuredProjects.length}
          </p>
          <div className="hidden lg:flex items-center gap-2 min-w-0">
            {featuredProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className="relative h-5 shrink-0 flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                style={{ width: index === current ? 32 : 16, transition: "width 500ms cubic-bezier(0.4, 0, 0.2, 1)" }}
                aria-label={`Go to project ${index + 1}`}
                aria-current={index === current ? "true" : undefined}
              >
                <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[3px] rounded-full" style={{ backgroundColor: index === current ? "var(--foreground)" : "color-mix(in srgb, var(--foreground) 20%, transparent)", transition: "background-color 500ms cubic-bezier(0.4, 0, 0.2, 1)" }} />
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={prev} className="w-11 h-11 rounded border border-border flex items-center justify-center text-foreground transition-all duration-300 hover:bg-muted" aria-label="Previous project">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={next} className="w-11 h-11 rounded border border-border flex items-center justify-center text-foreground transition-all duration-300 hover:bg-muted" aria-label="Next project">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import type { Category, Room } from "@/lib/rooms-data"
import { useInView } from "@/hooks/use-in-view"

interface CategoryClientProps {
  category: Category
  rooms: Room[]
}

export function CategoryClient({ category, rooms }: CategoryClientProps) {
  const [sectionRef, isInView] = useInView<HTMLElement>({ once: true, margin: "-50px" })

  return (
    <main className="min-h-screen bg-background dark:bg-charcoal">
      {/* Back Button */}
      <div className="fixed top-6 left-6 z-50 animate-fade-in-left">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-foreground dark:text-cream hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md p-2"
          aria-label="Back to projects"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
      </div>

      {/* Title */}
      <div className="pt-20 pb-4 text-center animate-fade-in-up">
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground dark:text-cream tracking-wide">
          {category.title.toUpperCase()}
        </h1>
        <p className="mt-4 text-muted-foreground dark:text-cream/60 max-w-xl mx-auto px-6">
          Explore our {category.title.toLowerCase()} projects — each one uniquely designed for our clients.
        </p>
      </div>

      {/* Rooms Grid */}
      <section ref={sectionRef} className="px-6 lg:px-12 py-12 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {rooms.map((room, index) => (
              <div
                key={room.id}
                className={`transition-all duration-700 ${
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${0.1 + index * 0.15}s` }}
              >
                <Link
                  href={`/room/${room.slug}`}
                  className="group block overflow-hidden rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  {/* Room Thumbnail */}
                  <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-muted">
                    {room.images[0] ? (
                      <Image
                        src={room.images[0].src}
                        alt={room.images[0].alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                        <span className="text-muted-foreground text-sm">Image placeholder</span>
                      </div>
                    )}
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-500" />
                  </div>

                  {/* Room Info */}
                  <div className="pt-5 pb-2">
                    <h2 className="font-serif text-xl md:text-2xl text-foreground dark:text-cream tracking-wide group-hover:text-primary transition-colors duration-300">
                      {room.title}
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground dark:text-cream/60 line-clamp-2 leading-relaxed">
                      {room.description}
                    </p>
                    {/* Color Swatches */}
                    <div className="flex items-center gap-2 mt-3">
                      {room.colors.map((color) => (
                        <div
                          key={color.name}
                          className="w-5 h-5 rounded-full border border-border/50 shadow-sm"
                          style={{ backgroundColor: color.color }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Back to Projects Link */}
          <div
            className={`mt-16 text-center transition-all duration-500 ${
              isInView ? "opacity-100 translate-y-0 delay-500" : "opacity-0 translate-y-5"
            }`}
          >
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors hover-underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Projects
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

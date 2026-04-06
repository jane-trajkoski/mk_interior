"use client"

import { useInView } from "@/hooks/use-in-view"
import { Home, Layers, Palette, Lightbulb } from "lucide-react"
import { iconMap } from "@/lib/data/icons"
import type { ServicesContent } from "@/lib/types/content"
import type { LucideIcon } from "lucide-react"

const defaultServices = [
  { title: "Residential Design", description: "Complete home transformations that honor how you truly live. From single rooms to entire properties.", iconName: "Home" },
  { title: "3D Visualization", description: "Photorealistic renders and immersive 3D tours that bring your future space to life.", iconName: "Layers" },
  { title: "Material Curation", description: "Hand-selected natural materials and artisan pieces that age beautifully and tell a story.", iconName: "Palette" },
  { title: "Light Design", description: "Layered lighting schemes that shift with the day, creating atmosphere and supporting wellbeing.", iconName: "Lightbulb" },
]

const fallbackIcons: Record<string, LucideIcon> = { Home, Layers, Palette, Lightbulb }

export function Services({ data }: { data?: ServicesContent }) {
  const sectionTagline = data?.sectionTagline ?? "What We Offer"
  const sectionTitle = data?.sectionTitle ?? "Our Services"
  const items = data?.items ?? defaultServices
  const [sectionRef, isInView] = useInView<HTMLElement>({ once: true, margin: "-100px" })

  return (
    <section ref={sectionRef} id="services" className="py-24 lg:py-32 px-6 lg:px-12 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-600 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <p className="text-xs tracking-[0.2em] uppercase text-primary mb-4">{sectionTagline}</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground">{sectionTitle}</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {items.map((service, index) => {
            const IconComponent = iconMap[service.iconName] ?? fallbackIcons[service.iconName] ?? Home
            return (
              <div
                key={service.title}
                className={`group p-8 lg:p-10 bg-background rounded-lg border border-border transition-all duration-500 hover:shadow-lg hover:border-primary/30 ${
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${0.12 * index}s` }}
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary transition-transform duration-300 group-hover:scale-110">
                    <IconComponent className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl text-foreground mb-3">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

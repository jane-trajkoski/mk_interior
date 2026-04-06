"use client"

import { useInView } from "@/hooks/use-in-view"
import type { MoodboardsContent } from "@/lib/types/content"

const defaults: MoodboardsContent = {
  sectionTitle: "Moodboard's inspiration",
  sectionDescription: "Discover the aesthetic directions that inspire our work. Each moodboard captures a distinct design philosophy.",
  items: [
    { id: "minimalist", title: "Minimalist interior design", style: "Clean lines, neutral tones, purposeful simplicity" },
    { id: "industrial", title: "Industrial interior design", style: "Raw materials, exposed elements, urban character" },
    { id: "modern-contemporary", title: "Modern-Contemporary interior design", style: "Sleek finishes, current trends, timeless elegance" },
  ],
}

export function Moodboard({ data }: { data?: MoodboardsContent }) {
  const { sectionTitle, sectionDescription, items } = data ?? defaults
  const [sectionRef, isInView] = useInView<HTMLElement>({ once: true, margin: "-100px" })

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 px-6 lg:px-12 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-600 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-4">
            {sectionTitle}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{sectionDescription}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((board, index) => (
            <div
              key={board.id}
              className={`group cursor-pointer focus-within:outline-none transition-all duration-700 ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${0.15 * index}s` }}
            >
              <div className="relative aspect-square rounded-lg overflow-hidden bg-muted mb-4">
                <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 p-2">
                  <div className="bg-cream dark:bg-charcoal/50 rounded" />
                  <div className="bg-warm-brown/30 rounded row-span-2" />
                  <div className="bg-peach/40 rounded" />
                </div>
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-500" />
              </div>

              <h3 className="font-serif text-lg text-foreground group-hover:text-primary transition-colors duration-300">
                {board.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">{board.style}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

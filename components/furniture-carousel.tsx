"use client"

import { useRef, useState } from "react"
import { useInView } from "@/hooks/use-in-view"
import { ChevronLeft, ChevronRight } from "lucide-react"

const furnitureCategories = [
  { id: "lamp", title: "LAMP", active: false },
  { id: "chair", title: "CHAIR", active: false },
  { id: "sofas", title: "SOFAS", active: true },
  { id: "coffee-table", title: "COFFEE TABLE", active: false },
  { id: "accessories", title: "ACCESSORIES", active: false },
]

const furnitureItems = [
  { id: 1, name: "Velvet Armchair", color: "Dusty Rose", placeholder: true },
  { id: 2, name: "Modular Sofa", color: "Sage Green", placeholder: true },
  { id: 3, name: "Accent Chair", color: "Mustard Yellow", placeholder: true },
  { id: 4, name: "Lounge Chair", color: "Cream White", placeholder: true },
  { id: 5, name: "Sectional Sofa", color: "Charcoal Gray", placeholder: true },
]

export function FurnitureCarousel() {
  const [sectionRef, isInView] = useInView<HTMLElement>({ once: true, margin: "-100px" })
  const [activeCategory, setActiveCategory] = useState("sofas")
  const carouselRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return
    const scrollAmount = 320
    carouselRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-charcoal dark:bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Categories */}
        <div
          className={`flex flex-wrap justify-center gap-6 md:gap-12 mb-12 transition-all duration-600 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          {furnitureCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`text-sm md:text-base tracking-wide transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal ${
                activeCategory === category.id
                  ? "text-cream font-medium"
                  : "text-warm-gray hover:text-cream/80"
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>

        {/* Carousel Container */}
        <div
          className={`relative transition-all duration-700 delay-200 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Navigation Buttons */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-cream/10 backdrop-blur-sm flex items-center justify-center text-cream transition-all duration-300 hover:bg-cream/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-cream"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-cream/10 backdrop-blur-sm flex items-center justify-center text-cream transition-all duration-300 hover:bg-cream/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-cream"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Carousel */}
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide px-12 pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {furnitureItems.map((item, index) => (
              <div
                key={item.id}
                className={`flex-shrink-0 w-64 md:w-72 snap-center transition-all duration-500 ${
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                }`}
                style={{ transitionDelay: `${0.3 + index * 0.1}s` }}
              >
                {/* Item Card */}
                <div className="group cursor-pointer">
                  <div className="aspect-square rounded-lg overflow-hidden bg-warm-gray/20 mb-4 relative">
                    {/* Placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="w-3/4 h-3/4 rounded-lg"
                        style={{
                          background: `linear-gradient(135deg, var(--warm-gray) 0%, var(--muted) 100%)`,
                        }}
                      />
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-cream/0 group-hover:bg-cream/10 transition-colors duration-500" />
                  </div>
                  <p className="text-cream text-sm">{item.name}</p>
                  <p className="text-warm-gray text-xs">{item.color}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Circle */}
        <div
          className={`flex justify-center mt-16 transition-all duration-700 delay-500 ${
            isInView ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          <div className="relative w-48 h-48 rounded-full border border-warm-gray/30 flex items-center justify-center group cursor-pointer hover:border-cream/50 transition-colors duration-500">
            <div className="text-center">
              <p className="text-cream text-lg font-serif">Create Your</p>
              <p className="text-cream text-lg font-serif">Cozy Corner</p>
            </div>
            {/* Decorative arc */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="48"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeDasharray="150 151"
                className="text-warm-gray/30 group-hover:text-cream/40 transition-colors duration-500"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}

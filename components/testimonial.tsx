"use client"

import { useState } from "react"
import { useInView } from "@/hooks/use-in-view"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import type { TestimonialsContent } from "@/lib/types/content"

const defaults: TestimonialsContent = {
  items: [
    { id: 1, quote: "MK Interiors transformed our apartment beyond our expectations. Their attention to detail and understanding of our lifestyle created a home that truly reflects who we are.", author: "Elena & Marcus", location: "Modern Living Room Project" },
    { id: 2, quote: "The 3D visualizations were incredible - we could see exactly how our space would look before any work began. The final result matched perfectly.", author: "Sofia Andersson", location: "Japandi Bedroom Design" },
    { id: 3, quote: "Working with MK Interiors felt like a true collaboration. They listened to our ideas and elevated them with their expertise and creative vision.", author: "The Petrov Family", location: "Complete Home Renovation" },
  ],
}

export function Testimonial({ data }: { data?: TestimonialsContent }) {
  const { items } = data ?? defaults
  const [sectionRef, isInView] = useInView<HTMLElement>({ once: true, margin: "-100px" })
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => setCurrentIndex((prev) => (prev + 1) % items.length)
  const prev = () => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 px-6 lg:px-12 bg-primary">
      <div className="max-w-4xl mx-auto">
        <div
          className={`text-center transition-all duration-600 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <div className="mb-8">
            <Quote className="w-12 h-12 mx-auto text-primary-foreground/30" />
          </div>

          <div className="grid min-h-[200px] items-center">
            {items.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`col-start-1 row-start-1 flex flex-col items-center justify-center transition-all duration-500 ${
                  index === currentIndex ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                }`}
              >
                <blockquote className="font-serif text-xl md:text-2xl lg:text-3xl font-light text-primary-foreground leading-relaxed mb-8 text-balance">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div>
                  <p className="text-sm tracking-wide text-primary-foreground/90 font-medium">{testimonial.author}</p>
                  <p className="text-sm text-primary-foreground/60 mt-1">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 mt-12">
            <button onClick={prev} className="w-10 h-10 rounded-full border border-primary-foreground/30 flex items-center justify-center text-primary-foreground transition-all duration-300 hover:bg-primary-foreground/10" aria-label="Previous testimonial">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {items.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-primary-foreground w-6" : "bg-primary-foreground/30 w-2"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                  aria-current={index === currentIndex ? "true" : undefined}
                />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 rounded-full border border-primary-foreground/30 flex items-center justify-center text-primary-foreground transition-all duration-300 hover:bg-primary-foreground/10" aria-label="Next testimonial">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

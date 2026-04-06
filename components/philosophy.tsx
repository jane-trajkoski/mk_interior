"use client"

import { useInView } from "@/hooks/use-in-view"
import type { PhilosophyContent } from "@/lib/types/content"

const defaults: PhilosophyContent = {
  title: "Why us?",
  description: "We provide personalized and high-quality interior design solutions tailored to each client's needs. Our creativity, professionalism and attention to detail ensure that every project is unique and successful.",
  image: "/images/modern-interior.jpg",
  features: [
    { title: "Personalized Approach", subtitle: "Tailored to your unique style" },
    { title: "3D Visualization", subtitle: "See your space before building" },
    { title: "Attention to Detail", subtitle: "Every element considered" },
    { title: "Full Support", subtitle: "From concept to completion" },
  ],
}

export function Philosophy({ data }: { data?: PhilosophyContent }) {
  const { title, description, image, features } = data ?? defaults
  const [sectionRef, isInView] = useInView<HTMLElement>({ once: true, margin: "-100px" })

  return (
    <section ref={sectionRef} id="philosophy" className="py-24 lg:py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div
            className={`relative aspect-[4/5] rounded-lg overflow-hidden bg-muted transition-all duration-700 ${
              isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <img
              src={image}
              alt="Modern interior design with elegant furniture and warm lighting"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-peach/60" />
          </div>

          <div
            className={`lg:pl-8 transition-all duration-700 delay-200 ${
              isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-6 italic">{title}</h2>

            <div className="space-y-6 text-muted-foreground leading-relaxed font-serif italic">
              <p>{description}</p>
            </div>

            <div className="my-10 w-16 h-px bg-border" />

            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, i) => (
                <div key={i}>
                  <p className="text-sm text-primary font-medium mb-1">{feature.title}</p>
                  <p className="text-xs text-muted-foreground">{feature.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

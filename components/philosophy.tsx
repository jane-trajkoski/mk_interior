"use client"

import { useInView } from "@/hooks/use-in-view"

export function Philosophy() {
  const [sectionRef, isInView] = useInView<HTMLElement>({ once: true, margin: "-100px" })

  return (
    <section ref={sectionRef} id="philosophy" className="py-24 lg:py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div
            className={`relative aspect-[4/5] rounded-lg overflow-hidden bg-muted transition-all duration-700 ${
              isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <img
              src="/minimalist-japanese-interior-design-with-natural-w.jpg"
              alt="Modern interior design with elegant furniture and warm lighting"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Subtle overlay accent */}
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-peach/60" />
          </div>

          {/* Content */}
          <div
            className={`lg:pl-8 transition-all duration-700 delay-200 ${
              isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-6 italic">Why us?</h2>

            <div className="space-y-6 text-muted-foreground leading-relaxed font-serif italic">
              <p>
                We provide personalized and high-quality interior design solutions tailored to each client&apos;s needs.
                Our creativity, professionalism and attention to detail ensure that every project is unique and
                successful.
              </p>
            </div>

            {/* Decorative divider */}
            <div className="my-10 w-16 h-px bg-border" />

            {/* Features list */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-primary font-medium mb-1">Personalized Approach</p>
                <p className="text-xs text-muted-foreground">Tailored to your unique style</p>
              </div>
              <div>
                <p className="text-sm text-primary font-medium mb-1">3D Visualization</p>
                <p className="text-xs text-muted-foreground">See your space before building</p>
              </div>
              <div>
                <p className="text-sm text-primary font-medium mb-1">Attention to Detail</p>
                <p className="text-xs text-muted-foreground">Every element considered</p>
              </div>
              <div>
                <p className="text-sm text-primary font-medium mb-1">Full Support</p>
                <p className="text-xs text-muted-foreground">From concept to completion</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useInView } from "@/hooks/use-in-view"

const steps = [
  {
    number: "01",
    title: "Concept",
    description: "We begin with understanding your vision, lifestyle, and aspirations for the space.",
  },
  {
    number: "02",
    title: "2D Plan",
    description: "Detailed floor plans and spatial layouts that optimize flow and functionality.",
  },
  {
    number: "03",
    title: "3D Plan",
    description: "Immersive 3D visualizations that bring your future space to life before construction.",
  },
  {
    number: "04",
    title: "Render",
    description: "Photorealistic renders showcasing materials, lighting, and final design details.",
  },
  {
    number: "05",
    title: "Presentation",
    description: "Complete design package with all specifications ready for implementation.",
  },
]

export function Process() {
  const [sectionRef, isInView] = useInView<HTMLElement>({ once: true, margin: "-100px" })

  return (
    <section ref={sectionRef} id="process" className="py-24 lg:py-32 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-600 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <p className="text-muted-foreground mb-4 text-lg">
            Our process transforms your vision into a beautiful reality
          </p>
        </div>

        {/* Process Steps - Visual circles layout */}
        <div className="relative">
          {/* Connection line - desktop only */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-border -translate-y-1/2 z-0" />

          {/* Steps Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`flex flex-col items-center text-center relative z-10 transition-all duration-600 ${
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                }`}
                style={{ transitionDelay: `${0.15 * index}s` }}
              >
                {/* Step label */}
                <p className="text-peach text-sm tracking-wide mb-4">{step.title}</p>

                {/* Circle */}
                <div className="relative">
                  {/* Decorative arc */}
                  <svg
                    className="absolute -top-2 -left-2 w-20 h-20 -rotate-45"
                    viewBox="0 0 80 80"
                    fill="none"
                  >
                    <path
                      d="M40 4 A36 36 0 0 1 76 40"
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-peach/40"
                    />
                  </svg>

                  {/* Main circle */}
                  <div className="w-16 h-16 rounded-full bg-peach/80 flex items-center justify-center transition-transform duration-300 hover:scale-110">
                    <span className="sr-only">Step {index + 1}</span>
                  </div>
                </div>

                {/* Number for mobile */}
                <p className="md:hidden text-xs text-muted-foreground mt-2">{step.number}</p>
              </div>
            ))}
          </div>

          {/* Second row labels - desktop */}
          <div className="hidden md:grid grid-cols-5 gap-4 mt-8">
            {steps.map((step) => (
              <p key={`desc-${step.number}`} className="text-center text-xs text-muted-foreground px-2">
                {step.description}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

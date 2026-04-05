"use client"

import { useRef, useState } from "react"
import { useInView } from "@/hooks/use-in-view"

export function BeforeAfter() {
  const [sectionRef, isInView] = useInView<HTMLElement>({ once: true, margin: "-100px" })
  const [sliderPosition, setSliderPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100)
    setSliderPosition(percentage)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX)
  }

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 px-6 lg:px-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-600 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-4">Before-After</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-serif italic text-lg">
            Upload a photo of your room and choose your style!
          </p>
        </div>

        {/* Before/After Slider */}
        <div
          ref={containerRef}
          className={`relative aspect-[16/10] rounded-lg overflow-hidden cursor-col-resize select-none bg-muted transition-all duration-700 delay-200 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          role="slider"
          aria-label="Before and after comparison slider"
          aria-valuenow={Math.round(sliderPosition)}
          aria-valuemin={0}
          aria-valuemax={100}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") setSliderPosition((p) => Math.max(p - 5, 0))
            if (e.key === "ArrowRight") setSliderPosition((p) => Math.min(p + 5, 100))
          }}
        >
          {/* Before Image */}
          <div className="absolute inset-0">
            <img
              src="/images/bedroom-2.jpg"
              alt="Room before redesign"
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />
          </div>

          {/* After Image - clips based on slider */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
          >
            <img
              src="/images/bedroom-1.jpg"
              alt="Room after redesign"
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />
          </div>

          {/* Slider Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-cream shadow-lg cursor-col-resize"
            style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
          >
            {/* Handle knob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-cream shadow-lg flex items-center justify-center">
              <div className="flex gap-1">
                <div className="w-0.5 h-4 bg-charcoal/40 rounded-full" />
                <div className="w-0.5 h-4 bg-charcoal/40 rounded-full" />
              </div>
            </div>
          </div>

          {/* Labels */}
          <div className="absolute top-4 left-4 px-3 py-1.5 bg-charcoal/70 text-cream text-xs uppercase tracking-wide rounded">
            Before
          </div>
          <div className="absolute top-4 right-4 px-3 py-1.5 bg-charcoal/70 text-cream text-xs uppercase tracking-wide rounded">
            After
          </div>
        </div>

        {/* Upload Button */}
        <div
          className={`flex justify-center mt-8 transition-all duration-600 delay-400 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <button className="px-8 py-3 border border-border text-foreground text-sm tracking-wide rounded-md transition-all duration-300 hover:bg-muted hover:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
            Upload
          </button>
        </div>
      </div>
    </section>
  )
}

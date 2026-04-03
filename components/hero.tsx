"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/minimalist-japanese-interior-design-with-natural-w.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-charcoal/60 dark:bg-charcoal/75" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6 lg:px-12 pt-20">
        <p
          className={`text-xs tracking-[0.3em] uppercase text-cream/70 mb-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{ transitionDelay: "0.2s" }}
        >
          MK Interiors
        </p>

        <h1
          className={`font-serif text-5xl md:text-7xl lg:text-8xl font-light text-cream leading-[1.1] tracking-tight mb-6 text-balance transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "0.4s" }}
        >
          <span className="italic">interior</span>
          <br />
          design
        </h1>

        <p
          className={`text-xl md:text-2xl text-cream/80 font-light mb-10 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "0.6s" }}
        >
          Bringing ideas to Life
        </p>

        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "0.8s" }}
        >
          <Link
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground text-sm tracking-wide rounded-md transition-all duration-300 hover:bg-primary/90 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Get in Touch
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "1.2s" }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs tracking-widest uppercase text-cream/50">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-cream/50 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  )
}

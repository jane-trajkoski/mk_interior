"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/hero.jpg')`,
          }}
        />
        {/* Light overlay gradient for dark text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-cream/60 via-cream/30 to-transparent dark:from-charcoal/70 dark:via-charcoal/40 dark:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-cream/50 via-transparent to-transparent dark:from-charcoal/60 dark:via-transparent dark:to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pb-24 pt-40">
        <p
          className={`text-xs tracking-[0.3em] uppercase text-charcoal/70 dark:text-cream/70 mb-6 transition-[opacity,transform] duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{ transitionDelay: "0.2s" }}
        >
          Luxury Interior Design
        </p>

        <h1
          className={`font-serif text-5xl md:text-7xl lg:text-8xl font-medium text-charcoal dark:text-cream leading-[1.1] tracking-tight mb-8 max-w-3xl transition-[opacity,transform] duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "0.4s" }}
        >
          Crafting Spaces That Inspire
        </h1>

        <p
          className={`text-base md:text-lg text-charcoal dark:text-cream/80 font-light mb-10 max-w-lg transition-[opacity,transform] duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "0.6s" }}
        >
          We transform interiors into immersive experiences — blending
          elegance, comfort, and timeless design.
        </p>

        <div
          className={`transition-[opacity,transform] duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "0.8s" }}
        >
          <Link
            href="#contact"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-foreground/20 bg-background/35 px-5 py-3 text-[11px] tracking-[0.3em] uppercase font-medium text-foreground backdrop-blur-sm transition-all duration-500 hover:-translate-y-0.5 hover:border-foreground hover:shadow-lg"
          >
            <span className="absolute inset-0 translate-y-full bg-foreground transition-transform duration-500 ease-out group-hover:translate-y-0" />
            <span className="relative z-10 transition-colors duration-500 group-hover:text-background">Get in Touch</span>
            <span className="relative z-10 text-base transition-all duration-500 group-hover:translate-x-1 group-hover:text-background">→</span>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator - hidden on mobile to avoid overlapping with button */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block transition-all duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "1.2s" }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs tracking-widest uppercase text-charcoal/50 dark:text-cream/50">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-charcoal/50 dark:from-cream/50 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  )
}

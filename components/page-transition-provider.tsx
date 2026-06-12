"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState, type ReactNode } from "react"

interface PageTransitionProviderProps {
  children: ReactNode
}

type Phase = "hidden" | "entering" | "settled"

export function PageTransitionProvider({ children }: PageTransitionProviderProps) {
  const pathname = usePathname()
  const [phase, setPhase] = useState<Phase>("hidden")

  useEffect(() => {
    setPhase("hidden")
    const show = setTimeout(() => setPhase("entering"), 50)
    const settle = setTimeout(() => setPhase("settled"), 400)
    return () => {
      clearTimeout(show)
      clearTimeout(settle)
    }
  }, [pathname])

  return (
    <div
      // Once settled, drop all transform classes: a transformed ancestor becomes
      // the containing block for position: fixed descendants (lightbox, back button),
      // anchoring them to the page instead of the viewport.
      className={
        phase === "hidden"
          ? "transition-all duration-300 ease-out opacity-0 translate-y-2"
          : phase === "entering"
            ? "transition-all duration-300 ease-out opacity-100 translate-y-0"
            : undefined
      }
    >
      {children}
    </div>
  )
}

"use client"

import { useEffect, useRef, useState, useCallback, type ReactNode } from "react"
import { MessageSquare, Lightbulb, Box, Image, Presentation } from "lucide-react"

const steps: { number: string; title: string; description: string; icon: ReactNode }[] = [
  {
    number: "01",
    title: "Concept",
    description:
      "We begin with understanding your vision, lifestyle, and aspirations for the space.",
    icon: <MessageSquare className="w-6 h-6" strokeWidth={1.5} />,
  },
  {
    number: "02",
    title: "2D Plan",
    description:
      "Detailed floor plans and spatial layouts that optimize flow and functionality.",
    icon: <Lightbulb className="w-6 h-6" strokeWidth={1.5} />,
  },
  {
    number: "03",
    title: "3D Plan",
    description:
      "Immersive 3D visualizations that bring your future space to life before construction.",
    icon: <Box className="w-6 h-6" strokeWidth={1.5} />,
  },
  {
    number: "04",
    title: "Render",
    description:
      "Photorealistic renders showcasing materials, lighting, and final design details.",
    icon: <Image className="w-6 h-6" strokeWidth={1.5} />,
  },
  {
    number: "05",
    title: "Presentation",
    description:
      "Complete design package with all specifications ready for implementation.",
    icon: <Presentation className="w-6 h-6" strokeWidth={1.5} />,
  },
]

const STEP_THRESHOLDS = [0, 0.2, 0.4, 0.6, 0.8]

// Line reaches each node exactly when the step activates:
// threshold 0.8 → path 100%, so pathFraction = scrollProgress * 1.25
function scrollToPathProgress(scroll: number): number {
  return Math.min(1, Math.max(0, scroll * 1.25))
}

export function Process() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeStep, setActiveStep] = useState(-1)
  const [headerVisible, setHeaderVisible] = useState(false)
  const rafRef = useRef<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const progressPathRef = useRef<SVGPathElement>(null)
  const bgPathRef = useRef<SVGPathElement>(null)
  const pathLengthRef = useRef(0)
  const [containerSize, setContainerSize] = useState({ width: 800, height: 1000 })

  // Measure container to build pixel-perfect SVG (no non-uniform scaling)
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const measure = () => {
      const { width, height } = container.getBoundingClientRect()
      if (width > 0 && height > 0) {
        setContainerSize({ width, height })
      }
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  // Re-measure path length when containerSize changes
  useEffect(() => {
    if (progressPathRef.current) {
      const len = progressPathRef.current.getTotalLength()
      pathLengthRef.current = len
      progressPathRef.current.style.strokeDasharray = `${len}`
      progressPathRef.current.style.strokeDashoffset = `${len}`
    }
  }, [containerSize])

  const handleScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const section = sectionRef.current
      if (!section) return

      const rect = section.getBoundingClientRect()
      const sectionHeight = section.offsetHeight
      const viewportHeight = window.innerHeight

      const totalTravel = sectionHeight + viewportHeight
      const traveled = viewportHeight - rect.top
      const progress = Math.max(0, Math.min(1, traveled / totalTravel))
      const remapped = Math.max(0, Math.min(1, (progress - 0.15) / 0.7))

      // Drive SVG directly
      const pathProgress = scrollToPathProgress(remapped)
      const len = pathLengthRef.current
      if (progressPathRef.current && len > 0) {
        progressPathRef.current.style.strokeDashoffset = `${len * (1 - pathProgress)}`
      }

      setHeaderVisible(remapped > 0)

      let currentStep = -1
      for (let i = STEP_THRESHOLDS.length - 1; i >= 0; i--) {
        if (remapped >= STEP_THRESHOLDS[i]) {
          currentStep = i
          break
        }
      }
      setActiveStep(currentStep)
    })
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [handleScroll])

  // Build path in actual pixel coordinates — no scaling artifacts
  const { width: cw, height: ch } = containerSize
  const nodeXPx = [cw * 0.38, cw * 0.62, cw * 0.38, cw * 0.62, cw * 0.38]
  const nodeYPx = [ch * 0.1, ch * 0.3, ch * 0.5, ch * 0.7, ch * 0.9]

  let pathD = `M ${nodeXPx[0]} ${nodeYPx[0]}`
  for (let i = 0; i < nodeXPx.length - 1; i++) {
    const x1 = nodeXPx[i]
    const y1 = nodeYPx[i]
    const x2 = nodeXPx[i + 1]
    const y2 = nodeYPx[i + 1]
    const cy1 = y1 + (y2 - y1) * 0.55
    const cy2 = y1 + (y2 - y1) * 0.45
    pathD += ` C ${x1} ${cy1}, ${x2} ${cy2}, ${x2} ${y2}`
  }

  return (
    <section
      ref={sectionRef}
      id="process"
      className="py-32 lg:py-48 px-6 lg:px-12 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className="text-center mb-24 transition-all duration-700"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: `translateY(${headerVisible ? 0 : 20}px)`,
          }}
        >
          <p className="text-muted-foreground mb-4 text-lg">
            Our process transforms your vision into a beautiful reality
          </p>
        </div>

        {/* S-Curve Layout - Desktop */}
        <div
          ref={containerRef}
          className="relative hidden md:block"
          style={{ minHeight: "1000px" }}
        >
          {/* SVG — viewBox matches container pixels, no scaling */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox={`0 0 ${cw} ${ch}`}
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              ref={bgPathRef}
              d={pathD}
              fill="none"
              stroke="var(--warm-gray)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="12 8"
              opacity="0.5"
            />
            <path
              ref={progressPathRef}
              d={pathD}
              fill="none"
              stroke="var(--warm-brown)"
              strokeWidth="3"
              strokeLinecap="round"
              style={{ willChange: "stroke-dashoffset" }}
            />
          </svg>

          {/* Step rows */}
          {steps.map((step, i) => {
            const isLeft = i % 2 === 0
            const isActive = activeStep >= i
            const topPercent = (nodeYPx[i] / ch) * 100

            return (
              <div
                key={step.number}
                className="absolute w-full"
                style={{
                  top: `${topPercent}%`,
                  transform: "translateY(-50%)",
                }}
              >
                <div className="relative flex items-center h-32">
                  {isLeft && (
                    <>
                      <div
                        className="absolute left-0 h-28 rounded-r-2xl rounded-l-xl transition-all duration-700 ease-out"
                        style={{
                          right: "60%",
                          background: isActive
                            ? "linear-gradient(135deg, var(--warm-brown), var(--charcoal))"
                            : "var(--muted)",
                          opacity: isActive ? 1 : 0.15,
                          transform: `scaleX(${isActive ? 1 : 0.8})`,
                          transformOrigin: "right center",
                        }}
                      />
                      <div
                        className="relative z-10 text-right pr-16 transition-all duration-700 ease-out"
                        style={{
                          width: "38%",
                          opacity: isActive ? 1 : 0,
                          transform: `translateX(${isActive ? 0 : -30}px)`,
                        }}
                      >
                        <span
                          className="text-xs font-semibold tracking-[0.2em] uppercase mb-1 block"
                          style={{ color: isActive ? "rgba(255,255,255,0.7)" : "var(--peach)" }}
                        >
                          Step {step.number}
                        </span>
                        <h3
                          className="text-xl lg:text-2xl font-serif font-medium mb-1"
                          style={{ color: isActive ? "white" : "var(--foreground)" }}
                        >
                          {step.title}
                        </h3>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: isActive ? "rgba(255,255,255,0.75)" : "var(--muted-foreground)" }}
                        >
                          {step.description}
                        </p>
                      </div>
                    </>
                  )}

                  <div
                    className="absolute z-20"
                    style={{
                      left: isLeft ? "38%" : "62%",
                      transform: "translate(-50%, 0)",
                    }}
                  >
                    <div
                      className={`w-[72px] h-[72px] rounded-full bg-background flex items-center justify-center transition-all duration-500 ${
                        isActive ? "shadow-lg shadow-warm-brown/15" : "shadow-sm"
                      }`}
                      style={{
                        border: `2px solid ${isActive ? "var(--warm-brown)" : "var(--warm-gray)"}`,
                      }}
                    >
                      <span
                        className="transition-colors duration-500"
                        style={{ color: isActive ? "var(--warm-brown)" : "var(--warm-gray)" }}
                      >
                        {step.icon}
                      </span>
                    </div>
                  </div>

                  {!isLeft && (
                    <>
                      <div
                        className="absolute right-0 h-28 rounded-l-2xl rounded-r-xl transition-all duration-700 ease-out"
                        style={{
                          left: "60%",
                          background: isActive
                            ? "linear-gradient(135deg, var(--warm-brown), var(--charcoal))"
                            : "var(--muted)",
                          opacity: isActive ? 1 : 0.15,
                          transform: `scaleX(${isActive ? 1 : 0.8})`,
                          transformOrigin: "left center",
                        }}
                      />
                      <div
                        className="absolute right-0 z-10 text-left pl-16 transition-all duration-700 ease-out"
                        style={{
                          left: "62%",
                          opacity: isActive ? 1 : 0,
                          transform: `translateX(${isActive ? 0 : 30}px)`,
                        }}
                      >
                        <span
                          className="text-xs font-semibold tracking-[0.2em] uppercase mb-1 block"
                          style={{ color: isActive ? "rgba(255,255,255,0.7)" : "var(--peach)" }}
                        >
                          Step {step.number}
                        </span>
                        <h3
                          className="text-xl lg:text-2xl font-serif font-medium mb-1"
                          style={{ color: isActive ? "white" : "var(--foreground)" }}
                        >
                          {step.title}
                        </h3>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: isActive ? "rgba(255,255,255,0.75)" : "var(--muted-foreground)" }}
                        >
                          {step.description}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Mobile layout */}
        <div className="md:hidden space-y-10 relative">
          <div className="absolute left-[18px] top-0 bottom-0 w-0.5 bg-border">
            <div
              className="w-full bg-peach"
              style={{
                height: `${Math.min(100, activeStep >= 0 ? ((activeStep + 1) / steps.length) * 100 : 0)}%`,
                transition: "height 0.5s ease-out",
              }}
            />
          </div>

          {steps.map((step, i) => {
            const isActive = activeStep >= i
            return (
              <div key={step.number} className="flex gap-5 pl-0">
                <div className="relative z-10 flex-shrink-0">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                      isActive
                        ? "bg-background border-warm-brown text-warm-brown shadow-md shadow-warm-brown/15"
                        : "bg-background border-warm-gray text-warm-gray"
                    }`}
                  >
                    <span className="[&>svg]:w-4 [&>svg]:h-4">{step.icon}</span>
                  </div>
                </div>
                <div
                  className="pt-0.5 transition-all duration-700 rounded-lg px-4 py-3 flex-1"
                  style={{
                    opacity: isActive ? 1 : 0.3,
                    transform: `translateY(${isActive ? 0 : 10}px)`,
                    background: isActive
                      ? "linear-gradient(135deg, var(--warm-brown), var(--charcoal))"
                      : "transparent",
                  }}
                >
                  <span
                    className="text-xs font-semibold tracking-[0.15em] uppercase"
                    style={{ color: isActive ? "rgba(255,255,255,0.7)" : "var(--peach)" }}
                  >
                    Step {step.number}
                  </span>
                  <h3
                    className="text-lg font-serif font-medium mt-1 mb-1"
                    style={{ color: isActive ? "white" : "var(--foreground)" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: isActive ? "rgba(255,255,255,0.75)" : "var(--muted-foreground)" }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

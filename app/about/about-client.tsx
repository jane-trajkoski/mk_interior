"use client"

import Link from "next/link"
import { Instagram, Facebook, Linkedin } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useInView } from "@/hooks/use-in-view"
import type { AboutContent, SocialLinksContent } from "@/lib/types/content"

const defaultAbout: AboutContent = {
  heroTagline: "Our Story",
  heroTitle: "About us",
  introParagraphs: [
    "We are MK Interiors \u2013 a creative studio specializing in interior design and 3D visualizations.",
    "Founded just a year ago out of a passion for beautiful and functional spaces, today we are a team of two designers dedicated to helping clients visualize and create their ideal homes.",
    'Our specialty lies in 3D visualizations and personalized "Before & After" transformations that allow you to see the full potential of your space before making any changes.',
    "We believe every space deserves a personal approach, smart solutions, and a style that reflects your unique energy.",
    "Whether you're updating a cozy corner or redesigning an entire apartment \u2013 we're here to bring your ideas to life.",
  ],
  values: [
    { title: "Personalization", description: "Every project is tailored to reflect your unique lifestyle." },
    { title: "Quality", description: "We believe in doing things right, not just fast." },
    { title: "Transparency", description: "Clear communication and honest guidance throughout." },
    { title: "Creativity", description: "Fresh perspectives that push boundaries while respecting your vision." },
  ],
  approachParagraphs: [
    "We combine modern 3D visualization technology with timeless design principles. This allows you to experience your transformed space before any work begins.",
    "Our collaborative process ensures that every design decision aligns with your goals, budget, and timeline.",
  ],
  ctaTitle: "Ready to start your project?",
  ctaDescription: "Let's discuss how we can help transform your space.",
}

interface AboutPageClientProps {
  data?: AboutContent
  socialLinks?: SocialLinksContent
  logoLight?: string
  logoDark?: string
}

export function AboutPageClient({ data, socialLinks, logoLight, logoDark }: AboutPageClientProps) {
  const about = data ?? defaultAbout
  const links = socialLinks ?? { instagram: "#", facebook: "#", linkedin: "#", tiktok: "#" }
  const [sectionRef, isInView] = useInView<HTMLElement>({ once: true, margin: "-100px" })

  return (
    <>
      <Header logoLight={logoLight} logoDark={logoDark} />
      <main className="min-h-screen pt-20">
        <section className="relative py-24 lg:py-32 px-6 lg:px-12">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
            <div className="absolute inset-0 bg-muted/30" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <p className="text-xs tracking-[0.2em] uppercase text-primary mb-4 animate-fade-in-up">
              {about.heroTagline}
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-8 animate-fade-in-up [animation-delay:100ms]">
              {about.heroTitle}
            </h1>
          </div>
        </section>

        <section ref={sectionRef} className="py-16 lg:py-24 px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <div className={`mb-16 transition-all duration-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <p className="font-serif italic text-xl md:text-2xl text-foreground leading-relaxed mb-8">
                {about.introParagraphs[0]}
              </p>
              <div className="space-y-6 text-muted-foreground leading-relaxed font-serif italic">
                {about.introParagraphs.slice(1).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>

            <div className={`grid md:grid-cols-2 gap-12 mb-16 transition-all duration-700 delay-200 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div>
                <h2 className="font-serif text-2xl text-foreground mb-4">Our Values</h2>
                <ul className="space-y-4 text-muted-foreground">
                  {about.values.map((v, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>
                        <strong className="text-foreground">{v.title}</strong> &ndash; {v.description}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-serif text-2xl text-foreground mb-4">Our Approach</h2>
                {about.approachParagraphs.map((p, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed mb-4">{p}</p>
                ))}
              </div>
            </div>

            <div className={`text-center pt-8 border-t border-border transition-all duration-700 delay-[400ms] ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <h2 className="font-serif text-2xl text-foreground mb-4">{about.ctaTitle}</h2>
              <p className="text-muted-foreground mb-8">{about.ctaDescription}</p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground text-sm tracking-wide rounded-md transition-all duration-300 hover:bg-primary/90 hover:scale-[1.02]"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer email={undefined} socialLinks={socialLinks} logoLight={logoLight} logoDark={logoDark} />
    </>
  )
}

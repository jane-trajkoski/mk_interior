"use client"

import Link from "next/link"
import { ArrowLeft, Instagram, Facebook, Linkedin } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useInView } from "@/hooks/use-in-view"

export function AboutPageClient() {
  const [sectionRef, isInView] = useInView<HTMLElement>({ once: true, margin: "-100px" })

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        {/* Hero Section with background image */}
        <section className="relative py-24 lg:py-32 px-6 lg:px-12">
          {/* Background image overlay */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
            <div className="absolute inset-0 bg-muted/30" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <p
              className="text-xs tracking-[0.2em] uppercase text-primary mb-4 animate-fade-in-up"
            >
              Our Story
            </p>

            <h1
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-8 animate-fade-in-up [animation-delay:100ms]"
            >
              About us
            </h1>
          </div>
        </section>

        {/* Main Content */}
        <section ref={sectionRef} className="py-16 lg:py-24 px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            {/* Intro paragraph */}
            <div
              className={`mb-16 transition-all duration-700 ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <p className="font-serif italic text-xl md:text-2xl text-foreground leading-relaxed mb-8">
                We are MK Interiors &ndash; a creative studio specializing in interior design and 3D visualizations.
              </p>

              <div className="space-y-6 text-muted-foreground leading-relaxed font-serif italic">
                <p>
                  Founded just a year ago out of a passion for beautiful and functional spaces, today we are a team of
                  two designers dedicated to helping clients visualize and create their ideal homes.
                </p>

                <p>
                  Our specialty lies in 3D visualizations and personalized &ldquo;Before &amp; After&rdquo;
                  transformations that allow you to see the full potential of your space before making any changes.
                </p>

                <p>
                  We believe every space deserves a personal approach, smart solutions, and a style that reflects your
                  unique energy.
                </p>

                <p>
                  Whether you&apos;re updating a cozy corner or redesigning an entire apartment &ndash; we&apos;re here
                  to bring your ideas to life.
                </p>
              </div>
            </div>

            {/* Team/Values Section */}
            <div
              className={`grid md:grid-cols-2 gap-12 mb-16 transition-all duration-700 delay-200 ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div>
                <h2 className="font-serif text-2xl text-foreground mb-4">Our Values</h2>
                <ul className="space-y-4 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">Personalization</strong> &ndash; Every project is tailored to
                      reflect your unique lifestyle.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">Quality</strong> &ndash; We believe in doing things right, not
                      just fast.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">Transparency</strong> &ndash; Clear communication and honest
                      guidance throughout.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">Creativity</strong> &ndash; Fresh perspectives that push
                      boundaries while respecting your vision.
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-serif text-2xl text-foreground mb-4">Our Approach</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We combine modern 3D visualization technology with timeless design principles. This allows you to
                  experience your transformed space before any work begins.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our collaborative process ensures that every design decision aligns with your goals, budget, and
                  timeline.
                </p>
              </div>
            </div>

            {/* CTA Section */}
            <div
              className={`text-center pt-8 border-t border-border transition-all duration-700 delay-[400ms] ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <h2 className="font-serif text-2xl text-foreground mb-4">Ready to start your project?</h2>
              <p className="text-muted-foreground mb-8">
                Let&apos;s discuss how we can help transform your space.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground text-sm tracking-wide rounded-md transition-all duration-300 hover:bg-primary/90 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </section>

        {/* Logo Section */}
        <section className="py-16 px-6 lg:px-12 bg-secondary/30">
          <div className="max-w-xl mx-auto text-center">
            {/* Logo */}
            <div
              className={`mb-8 transition-all duration-600 ${
                isInView ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
            >
              <svg
                width="80"
                height="96"
                viewBox="0 0 40 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gold mx-auto"
                aria-hidden="true"
              >
                <path
                  d="M2 46V8L12 24L20 12L28 24L38 8V46"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <path
                  d="M20 28V46M20 28L32 16M20 28L32 42"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="20" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <path d="M20 3V0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <p className="font-serif text-xl text-foreground mt-4">Interior Design</p>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

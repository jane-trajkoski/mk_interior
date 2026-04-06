"use client"

import type React from "react"
import { useState } from "react"
import { useInView } from "@/hooks/use-in-view"
import { Send, Mail, MapPin } from "lucide-react"
import { submitContactForm } from "@/lib/actions/contact"
import type { ContactContent } from "@/lib/types/content"

export function Contact({ data }: { data?: ContactContent }) {
  const sectionTagline = data?.sectionTagline ?? "Get in Touch"
  const sectionTitle = data?.sectionTitle ?? "Ready to transform your space?"
  const sectionSubtitle = data?.sectionSubtitle ?? "Every meaningful space begins with a conversation. Share your vision, and let's explore how we might bring it to life together."
  const contactEmail = data?.email ?? "creativeinteriors.mk@gmail.com"
  const locationText = data?.locationText ?? "Available Worldwide"
  const projectTypes = data?.projectTypes ?? ["Residential", "Commercial", "Renovation", "Consultation"]
  const [sectionRef, isInView] = useInView<HTMLElement>({ once: true, margin: "-100px" })
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  })
  const [honeypot, setHoneypot] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (honeypot) return // bot detected
    setIsSubmitting(true)
    setError("")

    try {
      const result = await submitContactForm(formState)
      if (result.success) {
        setIsSubmitted(true)
        setFormState({ name: "", email: "", phone: "", projectType: "", message: "" })
      } else {
        setError("Please check your inputs and try again.")
      }
    } catch {
      setError("Something went wrong. Please try again.")
    }

    setIsSubmitting(false)
  }

  return (
    <section ref={sectionRef} id="contact" className="py-24 lg:py-32 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column - Info */}
          <div
            className={`transition-all duration-700 ${
              isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <p className="text-xs tracking-[0.2em] uppercase text-primary mb-4">{sectionTagline}</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-6 text-balance">
              {sectionTitle}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-10 max-w-md">
              {sectionSubtitle}
            </p>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs tracking-wide uppercase text-muted-foreground mb-1">Email</p>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="text-foreground hover:text-primary transition-colors hover-underline"
                  >
                    {contactEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs tracking-wide uppercase text-muted-foreground mb-1">Location</p>
                  <p className="text-foreground">{locationText}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            {isSubmitted ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <Send className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-serif text-2xl text-foreground mb-3">Thank you!</h3>
                  <p className="text-muted-foreground">
                    We&apos;ve received your message and will get back to you soon.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-xs tracking-wide uppercase text-muted-foreground mb-2">
                      Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-background border border-border rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs tracking-wide uppercase text-muted-foreground mb-2">
                      Email <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-background border border-border rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-xs tracking-wide uppercase text-muted-foreground mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full bg-background border border-border rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="projectType"
                      className="block text-xs tracking-wide uppercase text-muted-foreground mb-2"
                    >
                      Project Type
                    </label>
                    <select
                      id="projectType"
                      value={formState.projectType}
                      onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                      className="w-full bg-background border border-border rounded-md px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors appearance-none"
                    >
                      <option value="">Select a type</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type.toLowerCase()}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs tracking-wide uppercase text-muted-foreground mb-2">
                    Message <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="message"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    rows={5}
                    className="w-full bg-background border border-border rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-none"
                    placeholder="Tell us about your project..."
                    required
                  />
                </div>

                {/* Honeypot */}
                <div className="absolute opacity-0 pointer-events-none" aria-hidden="true">
                  <input type="text" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
                </div>

                {error && <p className="text-sm text-destructive">{error}</p>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground text-sm tracking-wide rounded-md transition-all duration-300 hover:bg-primary/90 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

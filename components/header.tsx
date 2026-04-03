"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // When not scrolled, header is over the hero (dark bg), so text should be light (cream)
  // When scrolled, header has its own background, so use theme colors
  const textColorClass = isScrolled ? "text-foreground" : "text-cream"
  const mutedTextColorClass = isScrolled ? "text-muted-foreground" : "text-cream/80"

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" aria-label="MK Interiors Home">
            <div className="relative">
              <svg
                width="40"
                height="48"
                viewBox="0 0 40 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={isScrolled ? "text-gold" : "text-gold"}
                aria-hidden="true"
              >
                {/* M shape */}
                <path
                  d="M2 46V8L12 24L20 12L28 24L38 8V46"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                {/* K shape integrated */}
                <path
                  d="M20 28V46M20 28L32 16M20 28L32 42"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Lamp pendant */}
                <circle cx="20" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <path d="M20 3V0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className={`font-serif text-lg tracking-wide leading-none transition-colors duration-500 ${textColorClass}`}>MK</span>
              <span className={`text-[10px] tracking-[0.2em] uppercase transition-colors duration-500 ${mutedTextColorClass}`}>Interior Design</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            <Link
              href="#projects"
              className={`relative text-sm tracking-wide transition-colors duration-300 hover-underline py-1 ${mutedTextColorClass} hover:${textColorClass}`}
            >
              Projects
            </Link>
            <Link
              href="#services"
              className={`relative text-sm tracking-wide transition-colors duration-300 hover-underline py-1 ${mutedTextColorClass} hover:${textColorClass}`}
            >
              Services
            </Link>
            <Link
              href="#process"
              className={`relative text-sm tracking-wide transition-colors duration-300 hover-underline py-1 ${mutedTextColorClass} hover:${textColorClass}`}
            >
              Process
            </Link>
            <Link
              href="/about"
              className={`relative text-sm tracking-wide transition-colors duration-300 hover-underline py-1 ${mutedTextColorClass} hover:${textColorClass}`}
            >
              About
            </Link>
            <Link
              href="#contact"
              className={`relative text-sm tracking-wide transition-colors duration-300 hover-underline py-1 ${mutedTextColorClass} hover:${textColorClass}`}
            >
              Contact
            </Link>
          </div>

          {/* Right side: Theme Toggle + CTA + Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className={`relative w-14 h-7 rounded-full p-1 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                  isScrolled ? "bg-muted hover:bg-muted/80" : "bg-cream/20 hover:bg-cream/30"
                }`}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                <div
                  className={`absolute top-1 w-5 h-5 rounded-full shadow-md transition-transform duration-300 flex items-center justify-center ${
                    theme === "dark" ? "translate-x-7" : "translate-x-0"
                  } ${isScrolled ? "bg-background" : "bg-cream"}`}
                >
                  {theme === "dark" ? (
                    <Moon className={`w-3 h-3 ${isScrolled ? "text-foreground" : "text-charcoal"}`} />
                  ) : (
                    <Sun className={`w-3 h-3 ${isScrolled ? "text-foreground" : "text-charcoal"}`} />
                  )}
                </div>
              </button>
            )}

            {/* CTA Button - Desktop */}
            <Link
              href="#contact"
              className={`hidden md:inline-flex px-5 py-2.5 text-sm tracking-wide rounded-md transition-all duration-300 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                isScrolled
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-cream text-charcoal hover:bg-cream/90"
              }`}
            >
              Get in Touch
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <span
                className={`block w-6 h-0.5 transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-2" : ""
                } ${isScrolled ? "bg-foreground" : "bg-cream"}`}
              />
              <span
                className={`block w-6 h-0.5 transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""} ${isScrolled ? "bg-foreground" : "bg-cream"}`}
              />
              <span
                className={`block w-6 h-0.5 transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                } ${isScrolled ? "bg-foreground" : "bg-cream"}`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
            isMenuOpen ? "max-h-96 pb-8" : "max-h-0"
          } ${!isScrolled && isMenuOpen ? "bg-charcoal/95 backdrop-blur-md -mx-6 px-6 rounded-b-lg" : ""}`}
        >
          <div className="flex flex-col gap-6 pt-4">
            <Link
              href="#projects"
              onClick={() => setIsMenuOpen(false)}
              className={`text-lg transition-colors ${isScrolled ? "text-foreground hover:text-primary" : "text-cream hover:text-cream/70"}`}
            >
              Projects
            </Link>
            <Link
              href="#services"
              onClick={() => setIsMenuOpen(false)}
              className={`text-lg transition-colors ${isScrolled ? "text-foreground hover:text-primary" : "text-cream hover:text-cream/70"}`}
            >
              Services
            </Link>
            <Link
              href="#process"
              onClick={() => setIsMenuOpen(false)}
              className={`text-lg transition-colors ${isScrolled ? "text-foreground hover:text-primary" : "text-cream hover:text-cream/70"}`}
            >
              Process
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMenuOpen(false)}
              className={`text-lg transition-colors ${isScrolled ? "text-foreground hover:text-primary" : "text-cream hover:text-cream/70"}`}
            >
              About
            </Link>
            <Link
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className={`text-lg transition-colors ${isScrolled ? "text-foreground hover:text-primary" : "text-cream hover:text-cream/70"}`}
            >
              Contact
            </Link>
            <Link
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className={`inline-flex w-fit px-5 py-2.5 text-sm tracking-wide rounded-md mt-2 ${
                isScrolled ? "bg-primary text-primary-foreground" : "bg-cream text-charcoal"
              }`}
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

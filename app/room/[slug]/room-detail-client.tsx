"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react"
import type { Room } from "@/lib/rooms-data"
import { categories } from "@/lib/rooms-data"
import { useInView } from "@/hooks/use-in-view"

interface RoomDetailClientProps {
  room: Room
}

function ImageSlot({
  image,
  index,
  onOpen,
  className,
  children,
}: {
  image: { src: string; alt: string } | undefined
  index: number
  onOpen: (index: number) => void
  className?: string
  children?: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      className={`${className} cursor-pointer group/img focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg`}
      aria-label={image ? `View ${image.alt}` : `View image ${index + 1}`}
    >
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover transition-transform duration-500 group-hover/img:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      ) : (
        children
      )}
      <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/10 transition-colors duration-300 rounded-lg" />
    </button>
  )
}

export function RoomDetailClient({ room }: RoomDetailClientProps) {
  const [sectionRef, isInView] = useInView<HTMLElement>({ once: true, margin: "-50px" })
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const images = room.images

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
  }, [])

  const goNext = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % images.length : null))
  }, [images.length])

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null))
  }, [images.length])

  useEffect(() => {
    if (lightboxIndex === null) return

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowRight") goNext()
      if (e.key === "ArrowLeft") goPrev()
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [lightboxIndex, closeLightbox, goNext, goPrev])

  // Map images to layout slots — cycle if fewer images than slots
  const img = (i: number) => images[i % images.length]

  const categorySlug = categories.find((cat) => cat.categoryLabel === room.category)?.id
  const backHref = categorySlug ? `/category/${categorySlug}` : "/#projects"

  return (
    <main className="min-h-screen bg-background dark:bg-charcoal">
      {/* Back Button */}
      <div className="fixed top-6 left-6 z-50 animate-fade-in-left">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-foreground dark:text-cream hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md p-2"
          aria-label="Back to projects"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
      </div>

      {/* Title */}
      <div className="pt-20 pb-8 text-center animate-fade-in-up">
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground dark:text-cream tracking-wide">
          {room.title.toUpperCase()}
        </h1>
      </div>

      <section ref={sectionRef} className="px-6 lg:px-12 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Hero Image */}
          <div
            className={`relative mb-12 transition-all duration-700 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <ImageSlot
              image={img(0)}
              index={0}
              onOpen={openLightbox}
              className="relative block w-full aspect-[16/10] rounded-lg overflow-hidden bg-muted"
            >
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted to-secondary">
                <span className="text-muted-foreground text-sm">Hero image placeholder</span>
              </div>
            </ImageSlot>
          </div>

          {/* Stacked Images Section with Description */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start mb-16">
            {/* Stacked/Overlapping Images */}
            <div
              className={`relative h-[500px] md:h-[600px] transition-all duration-700 delay-200 ${
                isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              {/* Image 1 - Back left */}
              <ImageSlot
                image={img(1)}
                index={1 % images.length}
                onOpen={openLightbox}
                className="absolute top-0 left-0 w-3/4 aspect-[3/4] rounded-lg overflow-hidden bg-muted shadow-lg z-10"
              >
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-secondary to-muted">
                  <span className="text-muted-foreground text-sm">Image 1</span>
                </div>
              </ImageSlot>

              {/* Image 2 - Front right, overlapping */}
              <ImageSlot
                image={img(2)}
                index={2 % images.length}
                onOpen={openLightbox}
                className="absolute top-24 right-0 w-2/3 aspect-[4/5] rounded-lg overflow-hidden bg-muted shadow-xl z-20"
              >
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted to-secondary/50">
                  <span className="text-muted-foreground text-sm">Image 2</span>
                </div>
              </ImageSlot>

              {/* Decorative element */}
              {images.length > 3 && (
                <ImageSlot
                  image={img(3)}
                  index={3 % images.length}
                  onOpen={openLightbox}
                  className="absolute bottom-4 left-1/4 w-1/2 aspect-[3/2] rounded-lg overflow-hidden bg-muted shadow-md z-[5] opacity-60"
                >
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-peach/20 to-muted">
                    <span className="text-muted-foreground text-xs">Detail</span>
                  </div>
                </ImageSlot>
              )}
              {images.length <= 3 && (
                <div className="absolute bottom-4 left-1/4 w-1/2 aspect-[3/2] rounded-lg overflow-hidden bg-muted shadow-md z-[5] opacity-60">
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-peach/20 to-muted">
                    <span className="text-muted-foreground text-xs">Detail</span>
                  </div>
                </div>
              )}
            </div>

            {/* Description & Colors */}
            <div
              className={`lg:pt-16 transition-all duration-700 delay-300 ${
                isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
            >
              {/* Description Card */}
              <div className="bg-card dark:bg-warm-gray/10 rounded-lg p-8 mb-8">
                <p className="text-muted-foreground dark:text-cream/80 leading-relaxed">{room.description}</p>
              </div>

              {/* Color Palette */}
              <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start">
                {room.colors.map((color, index) => (
                  <div
                    key={color.name}
                    className={`group relative transition-all duration-400 ${
                      isInView ? "opacity-100 scale-100" : "opacity-0 scale-75"
                    }`}
                    style={{ transitionDelay: `${500 + index * 100}ms` }}
                  >
                    <div
                      className="w-14 h-14 rounded-full border-2 border-border shadow-md transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: color.color }}
                      title={color.name}
                    />
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {color.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Gallery */}
          <div
            className={`relative transition-all duration-700 delay-500 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="grid md:grid-cols-2 gap-4">
              {/* Large image on left */}
              <ImageSlot
                image={img(0)}
                index={0}
                onOpen={openLightbox}
                className="relative aspect-[4/5] rounded-lg overflow-hidden bg-muted"
              >
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-secondary to-muted">
                  <span className="text-muted-foreground text-sm">Gallery image 1</span>
                </div>
              </ImageSlot>

              {/* Two stacked images on right */}
              <div className="relative">
                <ImageSlot
                  image={img(1)}
                  index={1 % images.length}
                  onOpen={openLightbox}
                  className="relative aspect-[4/3] rounded-lg overflow-hidden bg-muted mb-4"
                >
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted to-secondary/50">
                    <span className="text-muted-foreground text-sm">Gallery image 2</span>
                  </div>
                </ImageSlot>
                <ImageSlot
                  image={img(2)}
                  index={2 % images.length}
                  onOpen={openLightbox}
                  className="relative aspect-[4/3] rounded-lg overflow-hidden bg-muted"
                >
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-peach/30 to-muted">
                    <span className="text-muted-foreground text-sm">Gallery image 3</span>
                  </div>
                </ImageSlot>
              </div>
            </div>
          </div>

          {/* Back to Projects Link */}
          <div
            className={`mt-16 text-center transition-all duration-500 delay-700 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <Link
              href={backHref}
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors hover-underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to {categorySlug ? room.category : "All Projects"}
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label={`Image ${lightboxIndex + 1} of ${images.length}`}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={closeLightbox}
          />

          {/* Close button */}
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 p-2 text-white/70 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Counter */}
          <span className="absolute top-5 left-1/2 -translate-x-1/2 text-white/60 text-sm z-10">
            {lightboxIndex + 1} / {images.length}
          </span>

          {/* Previous button */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-4 z-10 p-2 text-white/70 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          )}

          {/* Image */}
          <div className="relative w-[90vw] h-[80vh] max-w-5xl z-[1] animate-scale-in">
            <Image
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].alt}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>

          {/* Next button */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={goNext}
              className="absolute right-4 z-10 p-2 text-white/70 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          )}
        </div>
      )}
    </main>
  )
}

import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Philosophy } from "@/components/philosophy"
import { ProjectsGrid } from "@/components/projects-grid"
import { Moodboard } from "@/components/moodboard"
import { BeforeAfter } from "@/components/before-after"
import { FurnitureCarousel } from "@/components/furniture-carousel"
import { Services } from "@/components/services"
import { Process } from "@/components/process"
import { Testimonial } from "@/components/testimonial"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Philosophy />
      <ProjectsGrid />
      <Moodboard />
      <BeforeAfter />
      <FurnitureCarousel />
      <Services />
      <Process />
      <Testimonial />
      <Contact />
      <Footer />
    </main>
  )
}

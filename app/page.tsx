export const dynamic = "force-dynamic"

import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Philosophy } from "@/components/philosophy"
import { ProjectsGrid } from "@/components/projects-grid"
import { Moodboard } from "@/components/moodboard"
import { BeforeAfter } from "@/components/before-after"
import { FeaturedProjects } from "@/components/featured-projects"
import { Services } from "@/components/services"
import { Process } from "@/components/process"
import { Testimonial } from "@/components/testimonial"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { getContent } from "@/lib/data/repository"
import { getAllRooms, getAllCategories } from "@/lib/data/repository"

export default async function Home() {
  let heroData, philosophyData, projectsSectionData, moodboardsData, beforeAfterData
  let featuredProjectsData, servicesData, processStepsData, testimonialsData, contactData
  let socialLinksData, siteSettingsData
  let roomsList, categoriesList

  try {
    ;[
      heroData,
      philosophyData,
      projectsSectionData,
      moodboardsData,
      beforeAfterData,
      featuredProjectsData,
      servicesData,
      processStepsData,
      testimonialsData,
      contactData,
      socialLinksData,
      siteSettingsData,
      roomsList,
      categoriesList,
    ] = await Promise.all([
      getContent("hero"),
      getContent("philosophy"),
      getContent("projects-section"),
      getContent("moodboards"),
      getContent("before-after"),
      getContent("featured-projects"),
      getContent("services"),
      getContent("process-steps"),
      getContent("testimonials"),
      getContent("contact"),
      getContent("social-links"),
      getContent("site-settings"),
      getAllRooms(),
      getAllCategories(),
    ])
  } catch {
    // Fallback: render without DB data (static site still works)
    return (
      <main className="min-h-screen">
        <Header />
        <Hero />
        <Philosophy />
        <ProjectsGrid />
        <Moodboard />
        <BeforeAfter />
        <FeaturedProjects />
        <Services />
        <Process />
        <Testimonial />
        <Contact />
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Header {...(siteSettingsData ? { logoLight: siteSettingsData.logoLight, logoDark: siteSettingsData.logoDark } : {})} />
      {heroData && <Hero data={heroData} />}
      {philosophyData && <Philosophy data={philosophyData} />}
      <ProjectsGrid
        data={projectsSectionData}
        categories={categoriesList}
      />
      {moodboardsData && <Moodboard data={moodboardsData} />}
      {beforeAfterData && <BeforeAfter data={beforeAfterData} />}
      <FeaturedProjects data={featuredProjectsData} rooms={roomsList} />
      {servicesData && <Services data={servicesData} />}
      {processStepsData && <Process data={processStepsData} />}
      {testimonialsData && <Testimonial data={testimonialsData} />}
      <Contact data={contactData} />
      <Footer
        email={contactData?.email}
        socialLinks={socialLinksData}
        logoLight={siteSettingsData?.logoLight}
        logoDark={siteSettingsData?.logoDark}
      />
    </main>
  )
}

export const dynamic = "force-dynamic"

import { Metadata } from "next"
import { AboutPageClient } from "./about-client"
import { getContent } from "@/lib/data/repository"

export const metadata: Metadata = {
  title: "About Us | MK Interiors",
  description:
    "We are MK Interiors - a creative studio specializing in interior design and 3D visualizations. Founded out of a passion for beautiful and functional spaces.",
}

export default async function AboutPage() {
  let aboutData, socialLinksData, siteSettingsData

  try {
    ;[aboutData, socialLinksData, siteSettingsData] = await Promise.all([
      getContent("about"),
      getContent("social-links"),
      getContent("site-settings"),
    ])
  } catch {
    return <AboutPageClient />
  }

  return (
    <AboutPageClient
      data={aboutData}
      socialLinks={socialLinksData}
      logoLight={siteSettingsData?.logoLight}
      logoDark={siteSettingsData?.logoDark}
    />
  )
}

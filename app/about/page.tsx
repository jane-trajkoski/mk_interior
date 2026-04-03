import { Metadata } from "next"
import { AboutPageClient } from "./about-client"

export const metadata: Metadata = {
  title: "About Us | MK Interiors",
  description:
    "We are MK Interiors - a creative studio specializing in interior design and 3D visualizations. Founded out of a passion for beautiful and functional spaces.",
}

export default function AboutPage() {
  return <AboutPageClient />
}

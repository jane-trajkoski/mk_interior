import type React from "react"
import type { Metadata, Viewport } from "next"
import { DM_Sans, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { PageTransitionProvider } from "@/components/page-transition-provider"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "MK Interiors | Interior Design & 3D Visualization",
  description:
    "Creative studio specializing in interior design and 3D visualizations. We bring your ideas to life with personalized, high-quality design solutions.",
  generator: "v0.app",
  keywords: ["interior design", "3D visualization", "home design", "modern interiors", "Japandi", "minimalist design"],
  authors: [{ name: "MK Interiors" }],
  openGraph: {
    title: "MK Interiors | Interior Design & 3D Visualization",
    description: "Creative studio specializing in interior design and 3D visualizations.",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f5f2" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${playfair.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange={false}>
          <PageTransitionProvider>{children}</PageTransitionProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}

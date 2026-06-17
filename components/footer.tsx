"use client"

import Link from "next/link"
import { Instagram, Facebook, Linkedin } from "lucide-react"

interface FooterProps {
  email?: string
  socialLinks?: { instagram: string; facebook: string; linkedin: string; tiktok: string }
  logoLight?: string
  logoDark?: string
}

const year = new Date().getFullYear();

export function Footer({ email, socialLinks, logoLight, logoDark }: FooterProps = {}) {
  const contactEmail = email ?? "creativeinteriors.mk@gmail.com"
  const lightLogo = logoLight ?? "/logo-black.png"
  const darkLogo = logoDark ?? "/logo-color.png"
  const links = socialLinks ?? { instagram: "#", facebook: "#", linkedin: "#", tiktok: "#" }
  return (
    <footer className='py-16 px-6 lg:px-12 bg-secondary/30'>
      <div className='max-w-7xl mx-auto'>
        {/* Logo & Description */ }
        <div className='flex flex-col items-center text-center mb-12'>
          {/* Logo */ }
          <div className='mb-6'>
            <img
              src={ lightLogo }
              alt='MK Interiors'
              className='h-16 w-auto mx-auto block dark:hidden'
            />
            <img
              src={ darkLogo }
              alt='MK Interiors'
              className='h-16 w-auto mx-auto hidden dark:block'
            />
          </div>
        </div>

        {/* Contact Info */ }
        <div className='flex flex-col items-center gap-4 mb-12'>
          <a
            href={ `mailto:${ contactEmail }` }
            className='flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300'
          >
            <svg
              className='w-4 h-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={ 1.5 }
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75'
              />
            </svg>
            <span className='text-sm'>{ contactEmail }</span>
          </a>
        </div>

        {/* Social Links */ }
        <div className='flex justify-center gap-6 mb-12'>
          <a
            href={ links.instagram }
            className='w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary'
            aria-label='Follow us on Instagram'
          >
            <Instagram className='w-4 h-4'/>
          </a>
          <a
            href={ links.facebook }
            className='w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary'
            aria-label='Follow us on Facebook'
          >
            <Facebook className='w-4 h-4'/>
          </a>
          <a
            href={ links.linkedin }
            className='w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary'
            aria-label='Follow us on LinkedIn'
          >
            <Linkedin className='w-4 h-4'/>
          </a>
          <a
            href={ links.tiktok }
            className='w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary'
            aria-label='Follow us on TikTok'
          >
            <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
              <path
                d='M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z'/>
            </svg>
          </a>
        </div>

        {/* Bottom Bar */ }
        <div
          className='pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4'>
          <p className='text-xs text-muted-foreground'>
            &copy; { new Date().getFullYear() } MK Interiors. All rights reserved.
          </p>
          <div className='flex gap-6'>
            <Link
              href='/privacy'
              className='text-xs text-muted-foreground hover:text-foreground transition-colors'
            >
              Privacy Policy
            </Link>
            <Link
              href='/terms'
              className='text-xs text-muted-foreground hover:text-foreground transition-colors'
            >
              Terms of Service
            </Link>
          </div>

        </div>
        <div className='flex gap-1 justify-center items-center mt-4'>
          <p className='text-sm text-muted-foreground flex items-center justify-center gap-1'>
            <span>Copyright ©</span>

            <a
              href='https://tjdev.io/'
              className='flex items-center gap-0 text-sm text-muted-foreground hover:text-foreground transition-colors'
            >
              <span className='font-medium'>TJ</span>

              <svg
                width='20'
                height='20'
                viewBox='0 0 96 96'
                xmlns='http://www.w3.org/2000/svg'
                className='inline-block'
              >
                <g
                  transform='translate(48,30)'
                  stroke='currentColor'
                  strokeWidth='4'
                  fill='none'
                  strokeLinejoin='round'
                >
                  <line
                    x1='0'
                    y1='0'
                    x2='0'
                    y2='-12'
                    strokeLinecap='round'
                  />

                  <circle
                    cx='0'
                    cy='-15'
                    r='3.4'
                    fill='currentColor'
                    stroke='none'
                  />

                  <rect
                    x='-24'
                    y='0'
                    width='48'
                    height='38'
                    rx='12'
                  />

                  <rect
                    x='-14'
                    y='13'
                    width='12'
                    height='10'
                    rx='3'
                    fill='currentColor'
                    stroke='none'
                  />

                  <rect
                    x='2'
                    y='13'
                    width='12'
                    height='10'
                    rx='3'
                    fill='currentColor'
                    stroke='none'
                  />
                </g>
              </svg>
            </a>
            <span>{ year }</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

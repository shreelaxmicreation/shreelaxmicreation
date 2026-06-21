'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

import { motion } from 'framer-motion'
import { OriginButton } from '@/components/ui/origin-button'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleEsc)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEsc)
    }
  }, [mobileOpen])

  const navLinks = [
    { href: '/products', label: 'Products' },
    { href: '/infrastructure', label: 'Infrastructure' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Enquire', isEnquire: true },
  ]

  const isDarkHero = pathname === '/about'
  const shouldInvert = isDarkHero && !scrolled

  return (
    <>
      <motion.nav
        id="navbar"
        initial={{ y: '-100%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: scrolled ? 'rgba(245, 241, 232, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px) saturate(120%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(120%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(28, 49, 94, 0.06)' : '1px solid transparent',
          transition: 'background 0.3s ease, border-bottom 0.3s ease, backdrop-filter 0.3s ease',
          padding: '0 80px',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--max-content)',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 72,
          }}
        >
          {/* Logo & Brand Name */}
          <Link 
            href="/" 
            aria-label="Shree Laxmi Creation — Home"
            style={{ display: 'flex', alignItems: 'center', gap: 16, textDecoration: 'none' }}
          >
            <Image
              src="/images/logo.svg"
              alt="Shree Laxmi Creation"
              width={50}
              height={50}
              style={{
                height: 50,
                width: 'auto',
                objectFit: 'contain',
                transition: 'filter 0.2s ease',
                filter: shouldInvert ? 'brightness(0) invert(1)' : 'none'
              }}
            />
          </Link>

          {/* Desktop Links */}
          <div className="nav-desktop-links" style={{ display: 'flex', alignItems: 'center' }}>
            {navLinks.map((link) => (
              link.isEnquire ? (
                <div key={link.label} style={{ marginLeft: 32 }}>
                  <OriginButton 
                    onClick={() => router.push(link.href)}
                    className={shouldInvert ? "!bg-white !text-[var(--navy)] !border-none" : ""}
                    style={{ height: 40, padding: '0 24px', fontSize: 14 }}
                  >
                    {link.label}
                  </OriginButton>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`transition-colors duration-200 ${
                    shouldInvert ? 'text-white hover:text-cta' : 'text-text hover:text-cta'
                  }`}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 14,
                    marginLeft: 32,
                    borderBottom: pathname === link.href
                      ? '1px solid var(--brand)'
                      : '1px solid transparent',
                    paddingBottom: 2,
                  }}
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="nav-hamburger"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 8,
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={shouldInvert ? 'var(--white)' : 'var(--navy)'} strokeWidth="2" style={{ transition: 'stroke 0.2s ease' }}>
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'var(--navy)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 32,
          }}
        >
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation menu"
            style={{
              position: 'absolute',
              top: 24,
              right: 24,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <line x1="4" y1="4" x2="20" y2="20" />
              <line x1="20" y1="4" x2="4" y2="20" />
            </svg>
          </button>

          {navLinks.map((link) => (
            link.isEnquire ? (
              <OriginButton 
                key={link.label}
                onClick={() => {
                  setMobileOpen(false)
                  router.push(link.href)
                }}
                style={{ height: 56, padding: '0 40px', fontSize: 24, marginTop: 16 }}
              >
                {link.label}
              </OriginButton>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-display-l text-white hover:text-cta transition-colors duration-200"
                style={{
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </Link>
            )
          ))}
        </div>
      )}
    </>
  )
}

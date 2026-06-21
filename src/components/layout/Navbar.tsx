'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

import { motion } from 'framer-motion'
import { OriginButton } from '@/components/ui/origin-button'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
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

  const navLinks = [
    { href: '/products', label: 'Products' },
    { href: '/infrastructure', label: 'Infrastructure' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Enquire', isEnquire: true },
  ]

  const pillLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/infrastructure', label: 'Infra' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Enquire' },
  ]

  const isDarkHero = pathname === '/about'
  const shouldInvert = isDarkHero && !scrolled

  return (
    <>
      {/* ── Desktop Top Bar ─────────────────────────── */}
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
          padding: '0 clamp(16px, 4vw, 80px)',
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
          {/* Logo */}
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
        </div>
      </motion.nav>

      {/* ── Mobile Bottom Pill Nav ──────────────────── */}
      <div
        className="nav-pill-mobile"
        style={{
          position: 'fixed',
          bottom: 16,
          left: 0,
          right: 0,
          zIndex: 100,
          display: 'none', // Hidden by default, shown on mobile via CSS
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
          style={{
            pointerEvents: 'auto',
            background: 'rgba(28, 49, 94, 0.92)',
            backdropFilter: 'blur(20px) saturate(150%)',
            WebkitBackdropFilter: 'blur(20px) saturate(150%)',
            borderRadius: 999,
            padding: '6px 6px',
            boxShadow: '0 8px 32px rgba(28, 49, 94, 0.3), 0 2px 8px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {pillLinks.map((link) => {
            const isActive = pathname === link.href
            const isEnquire = link.href === '/contact'
            
            return (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  textDecoration: 'none',
                  fontFamily: 'var(--font-body)',
                  fontSize: 11,
                  fontWeight: isActive ? 600 : 400,
                  letterSpacing: '0.02em',
                  padding: '8px 12px',
                  borderRadius: 999,
                  position: 'relative',
                  color: isEnquire
                    ? 'var(--navy)'
                    : (isActive ? 'var(--navy)' : 'rgba(255,255,255,0.7)'),
                  whiteSpace: 'nowrap',
                  zIndex: 1,
                }}
              >
                {/* Sliding active indicator */}
                {isActive && !isEnquire && (
                  <motion.span
                    layoutId="pill-active"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: 999,
                      background: 'rgba(255,255,255,0.95)',
                      zIndex: -1,
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {/* Enquire always-on gold bg */}
                {isEnquire && (
                  <span
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: 999,
                      background: 'var(--cta)',
                      zIndex: -1,
                    }}
                  />
                )}
                {link.label}
              </Link>
            )
          })}
        </div>
      </motion.div>
      </div>
    </>
  )
}

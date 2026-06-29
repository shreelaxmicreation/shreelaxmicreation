'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Sun, Moon, Menu, X } from 'lucide-react'

import { motion, AnimatePresence } from 'framer-motion'
import { OriginButton } from '@/components/ui/origin-button'
import ThemeToggle from '@/components/ui/ThemeToggle'

export default function Navbar({ logoUrl, logoTextUrl }: { logoUrl: string; logoTextUrl: string }) {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/products', label: 'Products' },
    { href: '/infrastructure', label: 'Infrastructure' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Enquire', isEnquire: true },
  ]

  const pillLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/contact', label: 'Enquire' },
  ]

  const popupLinks = [
    { href: '/about', label: 'About' },
    { href: '/infrastructure', label: 'Infrastructure' },
    { href: '/blog', label: 'Blog' },
  ]

  const isDarkHero = pathname === '/about'

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
          background: 'var(--card-bg)',
          backdropFilter: 'blur(16px) saturate(120%)',
          WebkitBackdropFilter: 'blur(16px) saturate(120%)',
          borderBottom: '1px solid var(--card-border)',
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
            height: 80,
          }}
        >
          {/* Logo */}
          <Link 
            href="/" 
            aria-label="Shree Laxmi Creation — Home"
            className="flex items-center gap-2 md:gap-4 no-underline flex-shrink-0 mr-4"
          >
            <Image
              src={logoUrl}
              alt="Shree Laxmi Creation"
              width={64}
              height={64}
              className="h-10 md:h-[48px] lg:h-[60px] w-auto"
              style={{
                objectFit: 'contain',
                transition: 'filter 0.2s ease',
                filter: 'none'
              }}
            />
            <Image
              src={logoTextUrl}
              alt="Shree Laxmi Creation"
              width={260}
              height={52}
              className="h-[32px] lg:h-[52px] w-auto hidden md:block"
              style={{
                objectFit: 'contain',
                transition: 'filter 0.2s ease',
                filter: 'none'
              }}
            />
            <Image
              src="/images/logo-text.svg"
              alt="Shree Laxmi Creation"
              width={200}
              height={40}
              className="h-[32px] sm:h-[40px] w-auto block md:hidden"
              style={{
                objectFit: 'contain',
                transition: 'filter 0.2s ease',
                filter: 'none'
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
                    className=""
                    style={{ height: 40, padding: '0 24px', fontSize: 16 }}
                  >
                    {link.label}
                  </OriginButton>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="transition-colors duration-200 text-text hover:text-cta"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 16,
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

          {/* Theme Toggle */}
          <div className="nav-desktop-links" style={{ marginLeft: 16 }}>
            <ThemeToggle />
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
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12
        }}
      >
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              style={{
                pointerEvents: 'auto',
                background: 'var(--card-bg)',
                backdropFilter: 'blur(20px) saturate(150%)',
                WebkitBackdropFilter: 'blur(20px) saturate(150%)',
                borderRadius: 24,
                padding: '16px 20px',
                boxShadow: '0 12px 40px var(--card-shadow), 0 4px 12px var(--card-shadow)',
                border: '1px solid var(--card-border)',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                minWidth: 220,
              }}
            >
              {popupLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                      textDecoration: 'none',
                      fontFamily: 'var(--font-body)',
                      fontSize: 15,
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? 'var(--navy)' : 'var(--ink)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {link.label}
                    {isActive && <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--cta)' }} />}
                  </Link>
                )
              })}
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--card-border)', paddingTop: 16, marginTop: 4 }}>
                <span style={{ fontSize: 14, color: 'var(--muted)', fontWeight: 500 }}>Theme</span>
                {mounted && (
                  <button
                    onClick={() => {
                      setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
                      setIsMobileMenuOpen(false)
                    }}
                    aria-label="Toggle theme"
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--card-border)',
                      color: 'var(--ink)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '8px',
                      cursor: 'pointer',
                      borderRadius: '50%',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {resolvedTheme === 'dark' ? <Sun size={16} strokeWidth={2} /> : <Moon size={16} strokeWidth={2} />}
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
          style={{
            pointerEvents: 'auto',
            background: 'var(--card-bg)',
            backdropFilter: 'blur(20px) saturate(150%)',
            WebkitBackdropFilter: 'blur(20px) saturate(150%)',
            borderRadius: 999,
            padding: '6px 6px',
            boxShadow: '0 8px 32px var(--card-shadow), 0 2px 8px var(--card-shadow)',
            border: '1px solid var(--card-border)',
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
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  textDecoration: 'none',
                  fontFamily: 'var(--font-body)',
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 400,
                  letterSpacing: '0.02em',
                  padding: '8px 16px',
                  borderRadius: 999,
                  position: 'relative',
                  color: isEnquire
                    ? '#1C315E'
                    : (isActive ? 'var(--canvas)' : 'var(--muted)'),
                  whiteSpace: 'nowrap',
                  zIndex: 1,
                  transition: 'color 0.2s ease',
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
                      background: 'var(--ink)',
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
          
          {/* Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            style={{
              background: isMobileMenuOpen ? 'var(--ink)' : 'transparent',
              border: 'none',
              color: isMobileMenuOpen ? 'var(--canvas)' : 'var(--ink)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px',
              marginLeft: '4px',
              marginRight: '2px',
              cursor: 'pointer',
              borderRadius: '50%',
              transition: 'all 0.2s ease',
            }}
          >
            {isMobileMenuOpen ? <X size={16} strokeWidth={2} /> : <Menu size={16} strokeWidth={2} />}
          </button>
        </div>
      </motion.div>
      </div>
    </>
  )
}

'use client'

import { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const hasConsented = localStorage.getItem('shreelaxmi_cookie_consent')
    if (!hasConsented) {
      setShowBanner(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('shreelaxmi_cookie_consent', 'true')
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'var(--navy)',
        color: 'rgba(255,255,255,0.8)',
        padding: '24px 80px',
        zIndex: 100,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 -4px 20px rgba(28,49,94,0.15)',
      }}
      className="cookie-banner"
    >
      <div>
        <p className="text-body-text" style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)' }}>
          We use cookies to improve your experience and analyze site traffic. By continuing to use this site, you agree to our use of cookies.
        </p>
      </div>
      <div style={{ marginLeft: 32, flexShrink: 0 }}>
        <button
          onClick={acceptCookies}
          style={{
            background: 'var(--cta)',
            color: 'var(--navy)',
            border: 'none',
            padding: '12px 24px',
            fontFamily: 'var(--font-body)',
            fontSize: '0.8125rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'opacity 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          Accept
        </button>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .cookie-banner {
            flex-direction: column !important;
            align-items: flex-start !important;
            padding: 24px !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </div>
  )
}

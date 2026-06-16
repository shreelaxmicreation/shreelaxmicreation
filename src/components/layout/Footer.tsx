import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer
      id="footer"
      className="w-full"
      style={{
        background: 'var(--navy)',
        color: 'rgba(255,255,255,0.7)',
      }}
    >
      {/* Main Footer */}
      <div
        style={{
          maxWidth: 'var(--max-content)',
          margin: '0 auto',
          padding: '64px 80px 40px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div className="footer-main-grid">
          {/* Column 1: Brand */}
          <div style={{ maxWidth: 320 }}>
            <Link
              href="/"
              style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', marginBottom: 20 }}
            >
              <Image
                src="/images/logo.png"
                alt="Shree Laxmi Creation"
                width={40}
                height={40}
                style={{ height: 40, width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 18,
                  fontWeight: 400,
                  color: '#FFFFFF',
                  letterSpacing: '0.02em',
                }}
              >
                Shree Laxmi Creation
              </span>
            </Link>
            <p
              className="text-caption-text"
              style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.8 }}
            >
              Ahmedabad-based shirting fabric manufacturer delivering economical 
              and mid-range fabrics with integrated supply chain from Ichalkaranji to Ahmedabad.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <p
              className="text-label"
              style={{ color: 'var(--cta)', marginBottom: 20 }}
            >
              Explore
            </p>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { href: '/products', label: 'Products' },
                { href: '/infrastructure', label: 'Infrastructure' },
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-caption-text footer-link"
                  style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s ease' }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Contact */}
          <div>
            <p
              className="text-label"
              style={{ color: 'var(--cta)', marginBottom: 20 }}
            >
              Get in Touch
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <p className="text-label" style={{ color: 'rgba(255,255,255,0.35)', marginBottom: 4, fontSize: '0.625rem' }}>
                  WhatsApp
                </p>
                <a
                  href="https://wa.me/917990596697"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-caption-text footer-link"
                  style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s ease' }}
                >
                  +91 79905 96697
                </a>
              </div>
              <div>
                <p className="text-label" style={{ color: 'rgba(255,255,255,0.35)', marginBottom: 4, fontSize: '0.625rem' }}>
                  Location
                </p>
                <p className="text-caption-text" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Ahmedabad, Gujarat, India
                </p>
              </div>
            </div>
          </div>

          {/* Column 4: Social */}
          <div>
            <p
              className="text-label"
              style={{ color: 'var(--cta)', marginBottom: 20 }}
            >
              Follow Us
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <a
                href="https://www.instagram.com/shreelaxmicreation_/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-caption-text footer-link"
                style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s ease' }}
              >
                Instagram ↗
              </a>
              <a
                href="https://wa.me/917990596697"
                target="_blank"
                rel="noopener noreferrer"
                className="text-caption-text footer-link"
                style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s ease' }}
              >
                WhatsApp ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          padding: '20px 80px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div
          className="footer-bottom"
          style={{
            maxWidth: 'var(--max-content)',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <p className="text-caption-text" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.6875rem' }}>
            Shree Laxmi Creation © {new Date().getFullYear()}
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            <Link
              href="/privacy-policy"
              className="text-caption-text footer-link"
              style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', transition: 'color 0.2s ease', fontSize: '0.6875rem' }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-caption-text footer-link"
              style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', transition: 'color 0.2s ease', fontSize: '0.6875rem' }}
            >
              Terms
            </Link>
          </div>
          <p
            className="text-caption-text"
            style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.6875rem' }}
          >
            Built by{' '}
            <a
              href="https://formadigital.in"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link hover:text-white"
              style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s ease' }}
            >
              Forma Digital
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

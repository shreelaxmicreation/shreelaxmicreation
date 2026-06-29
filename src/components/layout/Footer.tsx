import Link from 'next/link'
import Image from 'next/image'

export default function Footer({ logoUrl }: { logoUrl: string }) {
  return (
    <footer
      id="footer"
      className="w-full"
      style={{
        background: 'var(--footer-bg)',
        color: 'var(--footer-text)',
      }}
    >
      {/* Main Footer */}
      <div
        className="px-4 py-6 md:px-6 md:pt-12 md:pb-8"
        style={{
          maxWidth: 'var(--max-content)',
          margin: '0 auto',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div className="footer-main-grid">
          {/* Column 1: Brand */}
          <div style={{ maxWidth: 320 }}>
            <Link
              href="/"
              className="flex items-center gap-2 md:gap-3 no-underline mb-3 md:mb-5"
            >
              <Image
                src={logoUrl}
                alt="Shree Laxmi Creation"
                width={40}
                height={40}
                className="max-md:w-8 max-md:h-8"
                style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
              />
              <span
                className="font-display font-normal text-white max-md:text-sm md:text-lg tracking-wide"
              >
                Shree Laxmi Creation
              </span>
            </Link>
            <p
              className="text-caption-text max-md:text-[10px] max-md:leading-normal"
              style={{ color: 'var(--footer-text-dim)', lineHeight: 1.8 }}
            >
              Ahmedabad-based shirting fabric manufacturer delivering economical 
              and mid-range fabrics with integrated supply chain from Ichalkaranji to Ahmedabad.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <p
              className="text-label mb-2 md:mb-5 max-md:text-[10px]"
              style={{ color: 'var(--cta)' }}
            >
              Explore
            </p>
            <nav className="flex flex-col gap-1 md:gap-3">
              {[
                { href: '/products', label: 'Products' },
                { href: '/infrastructure', label: 'Infrastructure' },
                { href: '/about', label: 'About Us' },
                { href: '/blog', label: 'Blog' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-caption-text footer-link"
                  style={{ color: 'var(--footer-text-dim)', textDecoration: 'none', transition: 'color 0.2s ease' }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Contact */}
          <div>
            <p
              className="text-label mb-2 md:mb-5 max-md:text-[10px]"
              style={{ color: 'var(--cta)' }}
            >
              Get in Touch
            </p>
            <div className="flex flex-col gap-3 md:gap-4">
              <div>
                <p className="text-label" style={{ color: 'var(--footer-text-label)', marginBottom: 4, fontSize: '0.625rem' }}>
                  WhatsApp
                </p>
                <a
                  href="https://wa.me/919998482159"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-caption-text footer-link"
                  style={{ color: 'var(--footer-text-dim)', textDecoration: 'none', transition: 'color 0.2s ease' }}
                >
                  +91 99984 82159
                </a>
              </div>
              <div>
                <p className="text-label" style={{ color: 'var(--footer-text-label)', marginBottom: 4, fontSize: '0.625rem' }}>
                  Email
                </p>
                <a
                  href="mailto:shreelaxmicreation81@gmail.com"
                  className="text-caption-text footer-link"
                  style={{ color: 'var(--footer-text-dim)', textDecoration: 'none', transition: 'color 0.2s ease' }}
                >
                  shreelaxmicreation81@gmail.com
                </a>
              </div>
              <div>
                <p className="text-label" style={{ color: 'var(--footer-text-label)', marginBottom: 4, fontSize: '0.625rem' }}>
                  Location
                </p>
                <p className="text-caption-text" style={{ color: 'var(--footer-text-dim)' }}>
                  Ahmedabad, Gujarat, India
                </p>
              </div>
            </div>
          </div>

          {/* Column 4: Social */}
          <div>
            <p
              className="text-label mb-2 md:mb-5 max-md:text-[10px]"
              style={{ color: 'var(--cta)' }}
            >
              Follow Us
            </p>
            <div className="flex flex-col gap-1 md:gap-3">
              <a
                href="https://www.instagram.com/shreelaxmicreation_/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-caption-text footer-link"
                style={{ color: 'var(--footer-text-dim)', textDecoration: 'none', transition: 'color 0.2s ease' }}
              >
                Instagram ↗
              </a>
              <a
                href="https://wa.me/919998482159"
                target="_blank"
                rel="noopener noreferrer"
                className="text-caption-text footer-link"
                style={{ color: 'var(--footer-text-dim)', textDecoration: 'none', transition: 'color 0.2s ease' }}
              >
                WhatsApp ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="pt-4 pb-24 md:py-5 px-4 md:px-6 relative z-10"
        style={{
          borderTop: '1px solid var(--footer-border)',
        }}
      >
        <div
          className="max-w-[var(--max-content)] mx-auto flex items-center justify-between max-md:justify-start max-md:flex-nowrap flex-wrap max-md:gap-3 gap-6 max-md:overflow-x-auto max-md:[-ms-overflow-style:none] max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden whitespace-nowrap"
        >
          <p className="text-caption-text max-md:text-[9px]" style={{ color: 'var(--footer-text-dimmer)', fontSize: '0.6875rem' }}>
            Shree Laxmi Creation © {new Date().getFullYear()}
          </p>
          <div className="flex gap-3 md:gap-6">
            <Link
              href="/privacy-policy"
              className="text-caption-text footer-link max-md:text-[9px]"
              style={{ color: 'var(--footer-text-dimmer)', textDecoration: 'none', transition: 'color 0.2s ease', fontSize: '0.6875rem' }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-caption-text footer-link max-md:text-[9px]"
              style={{ color: 'var(--footer-text-dimmer)', textDecoration: 'none', transition: 'color 0.2s ease', fontSize: '0.6875rem' }}
            >
              Terms
            </Link>
          </div>
          <p
            className="text-caption-text max-md:text-[9px]"
            style={{ color: 'var(--footer-text-dimmer)', fontSize: '0.6875rem' }}
          >
            Built by{' '}
            <a
              href="https://formadigital.in"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
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

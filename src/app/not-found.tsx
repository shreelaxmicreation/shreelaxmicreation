import Link from 'next/link'

export default function NotFound() {
  return (
    <section
      className="w-full section-padded-top-nav"
      style={{
        background: 'var(--canvas)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <p className="text-label" style={{ color: 'var(--brand)', marginBottom: 16 }}>
        Page Not Found
      </p>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(6rem, 15vw, 12rem)',
          fontWeight: 300,
          color: 'var(--ink)',
          lineHeight: 1,
          marginBottom: 16,
          opacity: 0.08,
        }}
      >
        404
      </h1>
      <p
        className="text-body-text"
        style={{
          color: 'var(--muted)',
          marginBottom: 40,
          maxWidth: 400,
          marginTop: -40,
        }}
      >
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className="btn-submit" style={{ textDecoration: 'none' }}>
        Return Home
      </Link>
    </section>
  )
}

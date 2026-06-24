import React from 'react'

export default function HomepageSEOContent() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'Manufacturer'],
    name: 'Shree Laxmi Creation',
    description:
      'Ahmedabad-based shirting fabric manufacturer. Cotton, dobby, poplin, twill, herringbone fabrics for apparel brands and wholesalers.',
    url: 'https://shreelaxmicreation.com',
    telephone: '+917990596697',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ahmedabad',
      addressRegion: 'Gujarat',
      addressCountry: 'IN',
    },
    areaServed: 'IN',
    sameAs: [
      'https://www.indiamart.com/shreelaxmicreation/',
      'https://www.instagram.com/shreelaxmicreation_/',
    ],
  }

  return (
    <section className="py-16 sm:py-24" style={{ background: 'var(--surface)', borderTop: '1px solid var(--card-border)', borderBottom: '1px solid var(--card-border)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="prose prose-lg max-w-none prose-headings:text-[var(--navy)] prose-p:text-[var(--muted)] prose-strong:text-[var(--navy)]">
          <h2 className="text-3xl font-display font-normal tracking-tight mb-6" style={{ color: 'var(--navy)' }}>
            Leading Shirting Fabric Manufacturer Ahmedabad
          </h2>
          <p>
            Shree Laxmi Creation is a premier{' '}
            <strong>shirting fabric manufacturer Ahmedabad</strong> based,
            specializing in economical and mid-range shirting fabrics. With a rich
            heritage in textile manufacturing, we have established ourselves as a
            trusted <strong>bulk shirting fabric</strong> supplier in India,
            delivering unmatched quality and value to our clients.
          </p>
          <p>
            Our extensive portfolio features over 50 fabric bases and 500+ design
            options. We meticulously craft a diverse range of fabric types,
            including premium cotton, poplin, oxford, dobby, herringbone, twill,
            birdseye, and versatile poly-cotton blends. Whether you are looking
            for classic weaves or contemporary textures, our collection caters to
            every stylistic requirement.
          </p>
          <p>
            Quality begins at the source. Our dedicated greige production facility
            is located in Ichalkaranji—the renowned textile hub—ensuring stringent
            control over the foundational weave. The fabric then undergoes advanced
            processing in Ahmedabad and Mumbai, utilizing state-of-the-art
            technology to achieve impeccable finishes, vibrant colors, and superior
            hand-feel.
          </p>
          <p>
            As a leading <strong>shirting fabric supplier India</strong> relies
            on, we proudly serve apparel brands, garment manufacturers, and wholesale
            buyers both domestically and internationally. Our commitment to timely
            delivery, consistent quality, and competitive pricing makes Shree Laxmi
            Creation the definitive sourcing partner for your bulk fabric needs.
          </p>
        </div>
      </div>
    </section>
  )
}

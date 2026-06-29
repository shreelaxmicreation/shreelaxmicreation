const fs = require('fs');

const file = 'src/app/(site)/terms/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace top section
content = content.replace(
  /<section\s*className="w-full section-padded-top-nav"\s*style=\{\{ background: 'var\(--canvas\)', minHeight: '100vh' \}\}\s*>\s*<div style=\{\{ maxWidth: 800, margin: '0 auto' \}\}>\s*<OrangeRule \/>\s*<p className="text-label" style=\{\{ color: 'var\(--muted\)', marginBottom: 8 \}\}>\s*Legal Information\s*<\/p>\s*<h1 className="text-display-l" style=\{\{ color: 'var\(--ink\)', marginBottom: 'var\(--space-lg\)' \}\}>\s*Terms & Conditions\s*<\/h1>/g,
  `<section
      className="w-full section-padded-top-nav relative overflow-hidden"
      style={{ minHeight: '100vh', background: 'var(--canvas)' }}
    >
      <div className="absolute inset-0 liquid-gradient opacity-20 pointer-events-none" />
      <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 1, padding: '0 24px' }}>
        <p className="text-label text-cta mb-4 tracking-[0.2em]">Legal Information</p>
        <OrangeRule />
        <h1 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] mt-6 mb-16 font-light" style={{ color: 'var(--navy)' }}>
          Terms & <span style={{ fontStyle: 'italic', color: 'var(--cta)' }}>Conditions</span>
        </h1>`
);

// Replace prose container
content = content.replace(
  /<div className="prose prose-p:text-body-text prose-p:text-ink prose-h2:text-subheading prose-h2:text-ink prose-a:text-brand prose-li:text-body-text prose-li:text-ink">/,
  `<div className="prose max-w-none font-light leading-relaxed" style={{ color: 'var(--muted)' }}>`
);

// Replace all h2 tags
content = content.replace(/<h2 style=\{\{ marginTop: 40, marginBottom: 16 \}\}>/g, `<h2 className="text-2xl mt-12 mb-6 font-display font-normal" style={{ color: 'var(--navy)' }}>`);

fs.writeFileSync(file, content);
console.log('Fixed terms formatting');

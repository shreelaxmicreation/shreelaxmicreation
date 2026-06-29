import type { Metadata } from 'next'
import OrangeRule from '@/components/ui/OrangeRule'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and Conditions for Shree Laxmi Creation.',
}

export default function TermsPage() {
  return (
    <section
      className="w-full section-padded-top-nav relative overflow-hidden"
      style={{ minHeight: '100vh', background: 'var(--canvas)' }}
    >
      <div className="absolute inset-0 liquid-gradient opacity-20 pointer-events-none" />
      <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 1, padding: '0 24px' }}>
        <p className="text-label text-cta mb-4 tracking-[0.2em]">Legal Information</p>
        <OrangeRule />
        <h1 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] mt-6 mb-16 font-light" style={{ color: 'var(--navy)' }}>
          Terms & <span style={{ fontStyle: 'italic', color: 'var(--cta)' }}>Conditions</span>
        </h1>

        <div className="prose max-w-none font-light leading-relaxed" style={{ color: 'var(--muted)' }}>
          <p style={{ marginBottom: 32 }}>Last Updated: June 2026</p>
          <h2 className="text-2xl mt-12 mb-6 font-display font-normal" style={{ color: 'var(--navy)' }}>1. Acceptance of Terms</h2>
          <p style={{ marginBottom: 24 }}>
            Welcome to Shree Laxmi Creation (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;).
          </p>
          <p style={{ marginBottom: 24 }}>
            These Terms &amp; Conditions govern your access to and use of www.shreelaxmicreation.com (the &quot;Website&quot;).
          </p>
          <p style={{ marginBottom: 24 }}>
            By accessing or using this Website, submitting an enquiry, contacting us through WhatsApp or any other communication channel linked from this Website, you acknowledge that you have read, understood, and agree to be bound by these Terms &amp; Conditions. If you do not agree with these Terms, please discontinue use of the Website.
          </p>
          <p style={{ marginBottom: 24 }}>
            These Terms apply to all visitors, customers, suppliers, business partners, and any other users of the Website.
          </p>
          <h2 className="text-2xl mt-12 mb-6 font-display font-normal" style={{ color: 'var(--navy)' }}>2. About Our Business</h2>
          <p style={{ marginBottom: 24 }}>
            Shree Laxmi Creation is a proprietorship firm based in Ahmedabad, Gujarat, India, engaged in the manufacturing and supply of shirting fabrics for apparel brands, garment manufacturers, wholesalers, traders, and institutional buyers.
          </p>
          <p style={{ marginBottom: 24 }}>
            This Website is intended solely for business-to-business (B2B) purposes.
          </p>
          <p style={{ marginBottom: 24 }}>
            The Website provides information regarding our products and services. Nothing contained on this Website constitutes a legally binding offer to sell any product.
          </p>
          <p style={{ marginBottom: 24 }}>
            All sales are subject to mutually agreed quotations, purchase orders, invoices, and other written agreements.
          </p>
          <h2 className="text-2xl mt-12 mb-6 font-display font-normal" style={{ color: 'var(--navy)' }}>3. Intellectual Property</h2>
          <p style={{ marginBottom: 24 }}>
            Unless otherwise stated, all content on this Website—including but not limited to:
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>Product photographs</li>
            <li>Fabric images</li>
            <li>Product descriptions</li>
            <li>Logos</li>
            <li>Brand identity</li>
            <li>Graphics</li>
            <li>Videos</li>
            <li>Text</li>
            <li>Blog articles</li>
            <li>Website design and layout</li>
          </ul>
          <p style={{ marginBottom: 24 }}>
            is owned by or licensed to Shree Laxmi Creation and is protected under applicable intellectual property laws.
          </p>
          <p style={{ marginBottom: 24 }}>
            You may browse this Website solely for personal or internal business evaluation.
          </p>
          <p style={{ marginBottom: 24 }}>
            Without our prior written consent, you may not:
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>Copy or reproduce Website content</li>
            <li>Download or redistribute product images</li>
            <li>Use our logos or trademarks</li>
            <li>Republish any material</li>
            <li>Modify or commercially exploit Website content</li>
            <li>Scrape or harvest Website content using automated software</li>
            <li>Use any content from this Website to train artificial intelligence, machine learning models, datasets, or automated systems</li>
          </ul>
          <p style={{ marginBottom: 24 }}>
            Unauthorised use may result in legal action.
          </p>
          <h2 className="text-2xl mt-12 mb-6 font-display font-normal" style={{ color: 'var(--navy)' }}>4. Permitted Use</h2>
          <p style={{ marginBottom: 24 }}>
            You agree to use this Website only for lawful purposes.
          </p>
          <p style={{ marginBottom: 24 }}>
            You must not:
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>Attempt unauthorised access to our systems</li>
            <li>Upload viruses or malicious software</li>
            <li>Submit false or misleading enquiries</li>
            <li>Interfere with Website functionality</li>
            <li>Use the Website for spam or unlawful activities</li>
            <li>Damage or attempt to damage our reputation</li>
          </ul>
          <p style={{ marginBottom: 24 }}>
            We reserve the right to suspend or restrict access where misuse is identified.
          </p>
          <h2 className="text-2xl mt-12 mb-6 font-display font-normal" style={{ color: 'var(--navy)' }}>5. Product Information</h2>
          <p style={{ marginBottom: 24 }}>
            We make reasonable efforts to ensure the information provided on this Website is accurate.
          </p>
          <p style={{ marginBottom: 24 }}>
            However, product specifications including:
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>Fabric composition</li>
            <li>GSM</li>
            <li>Width</li>
            <li>Finish</li>
            <li>Construction</li>
            <li>Colours</li>
            <li>Availability</li>
            <li>Packaging</li>
          </ul>
          <p style={{ marginBottom: 24 }}>
            may change without prior notice as part of normal manufacturing and product development.
          </p>
          <p style={{ marginBottom: 24 }}>
            Product photographs are intended for illustrative purposes only.
          </p>
          <p style={{ marginBottom: 24 }}>
            Actual colours, textures and finishes may vary due to dye lots, lighting conditions, monitor settings and manufacturing tolerances.
          </p>
          <h2 className="text-2xl mt-12 mb-6 font-display font-normal" style={{ color: 'var(--navy)' }}>6. Enquiries, Samples and Orders</h2>
          <p style={{ marginBottom: 24 }}>
            Submitting an enquiry through our Website or WhatsApp does not create a purchase contract.
          </p>
          <p style={{ marginBottom: 24 }}>
            Our normal business process is:
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>Customer submits an enquiry.</li>
            <li>We discuss product requirements, pricing, MOQ, lead time and availability.</li>
            <li>Samples may be provided, subject to availability.</li>
            <li>Orders become binding only after written confirmation by both parties.</li>
          </ul>
          <p style={{ marginBottom: 24 }}>
            Samples are supplied solely for evaluation purposes.
          </p>
          <p style={{ marginBottom: 24 }}>
            Minor differences between samples and production lots are normal within accepted textile manufacturing tolerances.
          </p>
          <p style={{ marginBottom: 24 }}>
            We reserve the right to refuse or cancel enquiries or quotations at our discretion before order confirmation.
          </p>
          <h2 className="text-2xl mt-12 mb-6 font-display font-normal" style={{ color: 'var(--navy)' }}>7. Pricing and Payment</h2>
          <p style={{ marginBottom: 24 }}>
            All quotations are subject to availability and remain valid only for the period stated in the quotation.
          </p>
          <p style={{ marginBottom: 24 }}>
            Unless specifically mentioned otherwise:
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>Prices exclude applicable GST.</li>
            <li>Prices may change without notice.</li>
            <li>Payment terms are agreed individually for each order.</li>
            <li>We may require advance payment for new customers or customised orders.</li>
          </ul>
          <p style={{ marginBottom: 24 }}>
            International buyers shall be responsible for customs duties, import taxes, local compliance requirements and any other charges applicable in their respective countries.
          </p>
          <h2 className="text-2xl mt-12 mb-6 font-display font-normal" style={{ color: 'var(--navy)' }}>8. Delivery</h2>
          <p style={{ marginBottom: 24 }}>
            Delivery schedules are estimates only.
          </p>
          <p style={{ marginBottom: 24 }}>
            While we make every reasonable effort to meet delivery commitments, delays may occur due to production schedules, raw material availability, transportation issues or circumstances beyond our control.
          </p>
          <p style={{ marginBottom: 24 }}>
            Risk in goods passes to the buyer upon dispatch unless otherwise agreed in writing.
          </p>
          <p style={{ marginBottom: 24 }}>
            Ownership of goods remains with Shree Laxmi Creation until full payment has been received.
          </p>
          <h2 className="text-2xl mt-12 mb-6 font-display font-normal" style={{ color: 'var(--navy)' }}>9. Quality and Claims</h2>
          <p style={{ marginBottom: 24 }}>
            We maintain quality standards throughout our manufacturing process.
          </p>
          <p style={{ marginBottom: 24 }}>
            However, variations in:
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>Shade</li>
            <li>Finish</li>
            <li>Texture</li>
            <li>Weave appearance</li>
            <li>GSM</li>
            <li>Width</li>
          </ul>
          <p style={{ marginBottom: 24 }}>
            within accepted textile manufacturing tolerances shall not be considered defects.
          </p>
          <p style={{ marginBottom: 24 }}>
            Any claim relating to shortages, transit damage or manufacturing defects must be reported in writing within 7 days of receipt of goods, supported by photographs and relevant details.
          </p>
          <p style={{ marginBottom: 24 }}>
            After verification, we may, at our sole discretion:
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>replace defective goods,</li>
            <li>issue a credit note, or</li>
            <li>provide another mutually agreed commercial resolution.</li>
          </ul>
          <p style={{ marginBottom: 24 }}>
            We shall not be responsible for indirect losses, production losses, consequential damages or loss of business arising from the use of our products.
          </p>
          <h2 className="text-2xl mt-12 mb-6 font-display font-normal" style={{ color: 'var(--navy)' }}>10. Limitation of Liability</h2>
          <p style={{ marginBottom: 24 }}>
            To the fullest extent permitted under applicable law, our total liability arising out of any claim shall not exceed the value of the specific order giving rise to that claim.
          </p>
          <p style={{ marginBottom: 24 }}>
            We shall not be liable for:
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>indirect losses,</li>
            <li>consequential damages,</li>
            <li>loss of profits,</li>
            <li>business interruption,</li>
            <li>loss of goodwill,</li>
            <li>reliance on Website information,</li>
            <li>Website downtime,</li>
            <li>technical errors,</li>
            <li>or any losses beyond our reasonable control.</li>
          </ul>
          <p style={{ marginBottom: 24 }}>
            Nothing in these Terms limits liability where such limitation is prohibited by law.
          </p>
          <h2 className="text-2xl mt-12 mb-6 font-display font-normal" style={{ color: 'var(--navy)' }}>11. Third-Party Links</h2>
          <p style={{ marginBottom: 24 }}>
            Our Website may contain links to third-party platforms including WhatsApp, Instagram or other external websites.
          </p>
          <p style={{ marginBottom: 24 }}>
            These links are provided solely for convenience.
          </p>
          <p style={{ marginBottom: 24 }}>
            We are not responsible for the content, availability or privacy practices of third-party websites.
          </p>
          <h2 className="text-2xl mt-12 mb-6 font-display font-normal" style={{ color: 'var(--navy)' }}>12. Force Majeure</h2>
          <p style={{ marginBottom: 24 }}>
            We shall not be liable for any failure or delay in performing our obligations caused by events beyond our reasonable control, including but not limited to:
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>natural disasters,</li>
            <li>floods,</li>
            <li>fire,</li>
            <li>war,</li>
            <li>labour disputes,</li>
            <li>pandemics,</li>
            <li>government restrictions,</li>
            <li>transportation disruptions,</li>
            <li>raw material shortages,</li>
            <li>power failures,</li>
            <li>or other unforeseen events.</li>
          </ul>
          <p style={{ marginBottom: 24 }}>
            Performance shall resume as soon as reasonably practicable.
          </p>
          <h2 className="text-2xl mt-12 mb-6 font-display font-normal" style={{ color: 'var(--navy)' }}>13. Website Availability</h2>
          <p style={{ marginBottom: 24 }}>
            We strive to keep the Website operational at all times.
          </p>
          <p style={{ marginBottom: 24 }}>
            However, we do not guarantee uninterrupted access or that the Website will always be free from technical errors, viruses or interruptions.
          </p>
          <p style={{ marginBottom: 24 }}>
            We reserve the right to modify, suspend or discontinue any part of the Website at any time without prior notice.
          </p>
          <h2 className="text-2xl mt-12 mb-6 font-display font-normal" style={{ color: 'var(--navy)' }}>14. Privacy</h2>
          <p style={{ marginBottom: 24 }}>
            Your use of this Website is also governed by our Privacy Policy, which explains how we collect, use and protect your personal information.
          </p>
          <h2 className="text-2xl mt-12 mb-6 font-display font-normal" style={{ color: 'var(--navy)' }}>15. Changes to These Terms</h2>
          <p style={{ marginBottom: 24 }}>
            We may revise these Terms &amp; Conditions at any time.
          </p>
          <p style={{ marginBottom: 24 }}>
            Updated versions will be published on this page together with the revised &quot;Last Updated&quot; date.
          </p>
          <p style={{ marginBottom: 24 }}>
            Continued use of the Website after any update constitutes acceptance of the revised Terms.
          </p>
          <h2 className="text-2xl mt-12 mb-6 font-display font-normal" style={{ color: 'var(--navy)' }}>16. Governing Law</h2>
          <p style={{ marginBottom: 24 }}>
            These Terms &amp; Conditions shall be governed by the laws of India.
          </p>
          <p style={{ marginBottom: 24 }}>
            Any disputes arising from these Terms or use of this Website shall be subject to the exclusive jurisdiction of the competent courts in Ahmedabad, Gujarat, India.
          </p>
          <p style={{ marginBottom: 24 }}>
            Before initiating legal proceedings, both parties agree to make reasonable efforts to resolve disputes amicably through good-faith discussions.
          </p>
          <h2 className="text-2xl mt-12 mb-6 font-display font-normal" style={{ color: 'var(--navy)' }}>17. Severability</h2>
          <p style={{ marginBottom: 24 }}>
            If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.
          </p>
          <h2 className="text-2xl mt-12 mb-6 font-display font-normal" style={{ color: 'var(--navy)' }}>18. Contact Us</h2>
          <p style={{ marginBottom: 24 }}>
            For any questions regarding these Terms &amp; Conditions, please contact:
          </p>
          <p style={{ marginBottom: 24 }}>
            Shree Laxmi Creation
          </p>
          <p style={{ marginBottom: 24 }}>
            Ahmedabad, Gujarat, India
          </p>
          <p style={{ marginBottom: 24 }}>
            WhatsApp: +91 99984 82159
          </p>
          <p style={{ marginBottom: 24 }}>
            Website: www.shreelaxmicreation.com/contact
          </p>
        </div>
      </div>
    </section>
  )
}

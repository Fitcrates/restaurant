import FadeUpTarget from '../motion/FadeUpTarget';

export default function CTASection({ heading, buttonText }: { heading?: string, buttonText?: string }) {
  return (
    <section className="section-padding" style={{ minHeight: '60svh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container">
        <FadeUpTarget delay={0.1}>
          <h2 className="text-display" style={{ marginBottom: '3rem' }}>
            {heading || 'Spotkajmy się przy ruszcie.'}
          </h2>
        </FadeUpTarget>
        
        <FadeUpTarget delay={0.2}>
          <a href="#" className="cta-button">
            {buttonText || 'REZERWACJA STOLIKA'}
          </a>
        </FadeUpTarget>

        <FadeUpTarget delay={0.3}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginTop: '6rem' }}>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'left' }}>
               <span className="text-meta" style={{ color: 'var(--text-secondary)' }}>LOKALIZACJA</span>
               <span className="text-body" style={{ fontSize: '1rem' }}>ul. Mokotowska 1, Warszawa</span>
             </div>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'left' }}>
               <span className="text-meta" style={{ color: 'var(--text-secondary)' }}>GODZINY</span>
               <span className="text-body" style={{ fontSize: '1rem' }}>Wt - Niedz: 17:00 - 23:00</span>
             </div>
          </div>
        </FadeUpTarget>
      </div>
    </section>
  );
}

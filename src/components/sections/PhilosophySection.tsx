import FadeUpTarget from '../motion/FadeUpTarget';

export default function PhilosophySection({ heading, body }: { heading?: string, body?: string }) {
  return (
    <section className="section-padding" style={{ display: 'flex', alignItems: 'center', minHeight: '60svh', textAlign: 'center' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <FadeUpTarget delay={0.1}>
          <h2 className="text-heading" style={{ color: 'var(--text-primary)' }}>
            {heading || 'Czas i temperatura.'}
          </h2>
        </FadeUpTarget>
        <FadeUpTarget delay={0.2}>
          <p className="text-body" style={{ marginTop: '2.5rem', fontSize: '1.25rem' }}>
            {body || 'Wierzymy, że prawdziwa głębia smaku rodzi się z cierpliwości i pierwotnej mocy ognia.'}
          </p>
        </FadeUpTarget>
      </div>
    </section>
  );
}

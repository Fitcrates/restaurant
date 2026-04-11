import FadeUpTarget from '../motion/FadeUpTarget';

export default function SignatureDishesSection({ dishes }: { dishes?: any[] }) {
  const displayDishes = dishes && dishes.length > 0 ? dishes : [
    { name: 'Kobe A5 Striploin', description: 'Bezkompromisowa marmurkowość, serwowana z lokalną solą morską.', price: '320 PLN', imageUrl: '/dish.png' },
    { name: 'Ganjang Gejang', description: 'Surowe kraby marynowane w rzemieślniczym sosie sojowym przez 3 dni.', price: '180 PLN', imageUrl: '/dish.png' },
    { name: 'Pork Belly (Samgyeopsal)', description: 'Grube plastry wieprzowiny z górskich farm, podawane z rzemieślniczym ssamjang.', price: '110 PLN', imageUrl: '/dish.png' },
  ];

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--bg-elevated)', paddingTop: '10rem', paddingBottom: '10rem' }}>
      <div className="container">
        <FadeUpTarget delay={0}>
           <h2 className="text-heading" style={{ marginBottom: '4rem', textAlign: 'center' }}>Nasze Signature.</h2>
        </FadeUpTarget>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          {displayDishes.map((dish, index) => (
            <FadeUpTarget key={index} delay={0.1 * index}>
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100%' }}>
                {dish.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={dish.imageUrl} alt={dish.name} style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', marginBottom: '1.5rem', backgroundColor: 'var(--bg-base)' }} />
                ) : (
                  <div style={{ width: '100%', aspectRatio: '4/5', backgroundColor: 'var(--bg-base)', marginBottom: '1.5rem' }} />
                )}
                
                <h3 className="text-body" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{dish.name}</h3>
                <p className="text-body" style={{ flexGrow: 1, marginTop: '0.5rem', fontSize: '1rem' }}>{dish.description}</p>
                <p className="text-meta" style={{ marginTop: '1.5rem', color: 'var(--accent-ember)' }}>{dish.price}</p>
              </div>
            </FadeUpTarget>
          ))}
        </div>
      </div>
    </section>
  );
}

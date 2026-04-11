import FadeUpTarget from '../motion/FadeUpTarget';

export default function ProcessSection({ items }: { items?: any[] }) {
  const processItems = items && items.length > 0 ? items : [
    { title: '45 Dni.', description: 'Sezonowane w kontrolowanych warunkach, aby osiągnąć szczytową delikatność. Przez 45 dni czas wykonuje najważniejszą część pracy.', imageUrl: '/dish.png' },
    { title: 'Binchotan.', description: 'Opiekane na certyfikowanym węglu drzewnym z dębu Ubame. Czyste spalanie pozwala dymowi stać się przyprawą samą w sobie.', imageUrl: '/dish.png' },
  ];

  return (
    <section className="section-padding">
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '8rem' }}>
        {processItems.map((item, index) => (
          <div key={index} className="grid-2">
             <FadeUpTarget delay={0.1}>
                {item.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.imageUrl} alt={item.title} style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover' }} />
                ) : (
                  <div className="placeholder-image" />
                )}
             </FadeUpTarget>
             <div style={{ marginLeft: index % 2 === 0 ? '0' : 'auto', order: index % 2 === 0 ? 1 : -1 }}>
                <FadeUpTarget delay={0.2}>
                  <h3 className="text-heading" style={{ marginBottom: '1.5rem' }}>{item.title}</h3>
                </FadeUpTarget>
                <FadeUpTarget delay={0.3}>
                  <p className="text-body">{item.description}</p>
                </FadeUpTarget>
             </div>
          </div>
        ))}
      </div>
    </section>
  );
}

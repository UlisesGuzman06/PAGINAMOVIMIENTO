import { getApiUrl } from '@/lib/apiConfig';
import RecursosClient from '@/components/RecursosClient';

async function getRecursos() {
  const res = await fetch(`${getApiUrl()}/recursos`, {
    next: { revalidate: 3600 } // Caché de 1 hora
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function RecursosPage() {
  const recursos = await getRecursos();

  return (
    <main className="container section">
      {/* Hero */}
      <section
        className="hero-section"
        style={{ backgroundImage: `url("/FOTOS/movimientojdv.jpg")`, marginBottom: '3rem', minHeight: 320 }}
      >
        <div className="hero-overlay" />
        <div className="hero-content">
          <span className="hero-badge">
            <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>menu_book</span>
            Biblioteca Peregrina
          </span>
          <h1 className="hero-title">Recursos</h1>
          <p className="hero-subtitle">
            Materiales de formación, documentos de la Iglesia y herramientas para tu camino de fe.
          </p>
        </div>
      </section>

      {/* Componente Cliente para interactividad */}
      <RecursosClient recursos={recursos} />

      {/* CTA */}
      <section className="cta-section" style={{ marginTop: '3rem' }}>
        <span className="material-symbols-outlined" style={{ fontSize: '3rem', color: 'var(--primary)', display: 'block', marginBottom: '1rem' }}>
          post_add
        </span>
        <h2 className="cta-title">¿Querés aportar un recurso?</h2>
        <p className="cta-desc">
          Si tenés un material de formación, libro o enlace que pueda enriquecer la comunidad, escribinos para agregarlo.
        </p>
        <a
          href="mailto:mjpcentro1@gmail.com?subject=Recurso para la biblioteca peregrina"
          className="btn-primary"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>mail</span>
          Enviarnos un recurso
        </a>
      </section>
    </main>
  );
}


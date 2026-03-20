import { getApiUrl } from '@/lib/apiConfig';
import MusicaClient from '@/components/MusicaClient';

async function getCanciones() {
  try {
    const res = await fetch(`${getApiUrl()}/musica`, {
      next: { revalidate: 3600 } // Caché de 1 hora
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Error fetching canciones:", error);
    return [];
  }
}

export default async function MusicaPage() {
  const canciones = await getCanciones();

  return (
    <main className="container section">
      {/* Hero */}
      <section
        className="hero-section"
        style={{
          backgroundImage: `url("/FOTOS/movimientojdv.jpg")`,
          marginBottom: '3rem',
          minHeight: 360,
        }}
      >
        <div className="hero-overlay" />
        <div className="hero-content">
          <span className="hero-badge">
            <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>music_note</span>
            Música
          </span>
          <h1 className="hero-title">Canciones Peregrinas</h1>
          <p className="hero-subtitle">
            Alabanzas, cantos y oraciones que acompañan nuestro caminar en fe y comunidad.
          </p>
        </div>
      </section>

      {/* Componente Cliente para interactividad */}
      <MusicaClient canciones={canciones} />

      {/* CTA subir canción */}
      <section className="cta-section" style={{ marginTop: '3rem' }}>
        <span className="material-symbols-outlined" style={{ fontSize: '3rem', color: 'var(--primary)', display: 'block', marginBottom: '1rem' }}>
          upload_file
        </span>
        <h2 className="cta-title">¿Tenés una canción del movimiento?</h2>
        <p className="cta-desc">
          Si conocés un canto peregrino que no está en la lista, escribinos para agregarlo al cancionero.
        </p>
        <a
          href="mailto:mjpcentro1@gmail.com?subject=Canción para el cancionero"
          className="btn-primary"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>mail</span>
          Enviarnos un canto
        </a>
      </section>
    </main>
  );
}


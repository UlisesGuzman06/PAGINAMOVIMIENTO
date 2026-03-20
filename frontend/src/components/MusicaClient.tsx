'use client';

import { useState } from 'react';

interface Cancion {
  id: string;
  titulo: string;
  artista: string;
  categoria: string;
  descripcion: string;
  letra: string;
  url_audio: string | null;
  url_descarga: string | null;
  duracion: string;
  año: number;
  imagen_portada: string | null;
}

const CATEGORIA_COLORS: Record<string, string> = {
  'Alabanza': '#3b82f6',
  'Canto del Movimiento': '#8b5cf6',
  'Cantos de Oasis': '#22c55e',
  'Cantos al Espíritu': '#f59e0b',
  'Oraciones Cantadas': '#ef4444',
  'General': '#64748b',
};

export default function MusicaClient({ canciones }: { canciones: Cancion[] }) {
  const [categoriaActiva, setCategoriaActiva] = useState('Todas');
  const [seleccionada, setSeleccionada] = useState<Cancion | null>(canciones[0] || null);
  const [letraVisible, setLetraVisible] = useState(false);
  const [busqueda, setBusqueda] = useState('');

  const normalize = (str: string) => 
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const filtradas = canciones.filter((c) => {
    const query = normalize(busqueda);
    const matchCategoria = categoriaActiva === 'Todas' || c.categoria === categoriaActiva;
    const matchBusqueda =
      !busqueda ||
      normalize(c.titulo).includes(query) ||
      normalize(c.artista ?? '').includes(query);
    return matchCategoria && matchBusqueda;
  });

  const categoriasUsadas = ['Todas', ...Array.from(new Set(canciones.map((c) => c.categoria)))];

  return (
    <>
      {/* Buscador */}
      <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: 1, minWidth: 240, position: 'relative' }}>
          <span
            className="material-symbols-outlined"
            style={{
              position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)',
              color: 'var(--text-dim)', fontSize: '1.2rem', pointerEvents: 'none',
            }}
          >
            search
          </span>
          <input
            className="form-input"
            placeholder="Buscar canciones..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            style={{ paddingLeft: '2.75rem' }}
          />
        </div>
      </div>

      {/* Filtros categorías */}
      <div
        style={{
          display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem',
        }}
      >
        {categoriasUsadas.map((cat) => {
          const active = cat === categoriaActiva;
          const color = CATEGORIA_COLORS[cat] ?? 'var(--primary)';
          return (
            <button
              key={cat}
              onClick={() => setCategoriaActiva(cat)}
              style={{
                padding: '0.4rem 1rem',
                borderRadius: '9999px',
                border: active ? `2px solid ${color}` : '2px solid var(--border)',
                background: active ? `${color}18` : 'var(--card-bg)',
                color: active ? color : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                letterSpacing: '0.03em',
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {filtradas.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-dim)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem', opacity: 0.4 }}>
            search_off
          </span>
          <p>No se encontraron canciones</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: seleccionada ? '1fr 360px' : '1fr', gap: '1.5rem', alignItems: 'start' }}>
          {/* Lista de canciones */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {filtradas.map((cancion, index) => {
              const isActive = seleccionada?.id === cancion.id;
              const color = CATEGORIA_COLORS[cancion.categoria] ?? '#64748b';
              return (
                <div
                  key={cancion.id}
                  onClick={() => { setSeleccionada(cancion); setLetraVisible(false); }}
                  style={{
                    background: isActive ? `${color}10` : 'var(--card-bg)',
                    border: `1.5px solid ${isActive ? color : 'var(--border)'}`,
                    borderRadius: 'var(--radius-xl)',
                    padding: '1.25rem 1.5rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.25rem',
                    boxShadow: isActive ? `0 4px 20px ${color}25` : 'var(--shadow-sm)',
                  }}
                >
                  {/* Número / ícono */}
                  <div
                    style={{
                      width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
                      background: isActive ? color : `${color}20`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    {isActive ? (
                      <span className="material-symbols-outlined" style={{ color: 'white', fontSize: '1.25rem' }}>
                        music_note
                      </span>
                    ) : (
                      <span style={{ fontWeight: 800, fontSize: '0.9rem', color }}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.2rem', color: isActive ? color : 'var(--foreground)' }}>
                      {cancion.titulo}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
                      {cancion.artista}
                      {cancion.año ? ` · ${cancion.año}` : ''}
                    </div>
                  </div>

                  {/* Badge categoría + duración */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.4rem', flexShrink: 0 }}>
                    <span
                      style={{
                        fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.05em',
                        textTransform: 'uppercase', padding: '0.2rem 0.6rem',
                        borderRadius: '9999px', background: `${color}20`, color,
                      }}
                    >
                      {cancion.categoria}
                    </span>
                    {cancion.duracion && (
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontVariantNumeric: 'tabular-nums' }}>
                        {cancion.duracion}
                      </span>
                    )}
                  </div>

                  {/* Acciones rápidas */}
                  <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
                    {cancion.letra && (
                      <button
                        onClick={(e) => { e.stopPropagation(); setSeleccionada(cancion); setLetraVisible(true); }}
                        title="Ver letra"
                        style={{
                          background: 'none', border: '1px solid var(--border)', borderRadius: '0.5rem',
                          padding: '0.4rem', cursor: 'pointer', color: 'var(--text-dim)',
                          display: 'flex', alignItems: 'center', transition: 'all 0.2s',
                        }}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>lyrics</span>
                      </button>
                    )}
                    {cancion.url_descarga && (
                      <a
                        href={cancion.url_descarga}
                        download
                        onClick={(e) => e.stopPropagation()}
                        title="Descargar"
                        style={{
                          background: 'none', border: '1px solid var(--border)', borderRadius: '0.5rem',
                          padding: '0.4rem', cursor: 'pointer', color: 'var(--text-dim)',
                          display: 'flex', alignItems: 'center', transition: 'all 0.2s',
                          textDecoration: 'none',
                        }}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>download</span>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Panel lateral de detalle */}
          {seleccionada && (
            <div
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-xl)',
                padding: '2rem',
                boxShadow: 'var(--shadow-lg)',
                position: 'sticky',
                top: '6rem',
              }}
            >
              {/* Portada */}
              <div
                style={{
                  width: '100%',
                  aspectRatio: '1/1',
                  borderRadius: 'var(--radius-lg)',
                  background: `linear-gradient(135deg, ${CATEGORIA_COLORS[seleccionada.categoria] ?? '#3b82f6'}40, ${CATEGORIA_COLORS[seleccionada.categoria] ?? '#3b82f6'}10)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  overflow: 'hidden',
                }}
              >
                {seleccionada.imagen_portada ? (
                  <img src={seleccionada.imagen_portada} alt={seleccionada.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: '5rem', color: CATEGORIA_COLORS[seleccionada.categoria] ?? '#3b82f6', opacity: 0.6 }}
                  >
                    music_note
                  </span>
                )}
              </div>

              {/* Info */}
              <span
                style={{
                  fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: CATEGORIA_COLORS[seleccionada.categoria] ?? 'var(--primary)',
                  display: 'block', marginBottom: '0.35rem',
                }}
              >
                {seleccionada.categoria}
              </span>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.25rem', lineHeight: 1.3 }}>
                {seleccionada.titulo}
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)', marginBottom: '0.15rem' }}>
                {seleccionada.artista}
                {seleccionada.año ? ` · ${seleccionada.año}` : ''}
                {seleccionada.duracion ? ` · ${seleccionada.duracion}` : ''}
              </p>
              {seleccionada.descripcion && (
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: '1rem 0' }}>
                  {seleccionada.descripcion}
                </p>
              )}

              {/* Reproductor de audio */}
              {seleccionada.url_audio && (
                <div style={{ margin: '1.25rem 0' }}>
                  <audio
                    key={seleccionada.id}
                    controls
                    src={seleccionada.url_audio}
                    style={{ width: '100%', borderRadius: '0.5rem' }}
                  />
                </div>
              )}

              {/* Botones acción */}
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem' }}>
                {seleccionada.letra && (
                  <button
                    onClick={() => setLetraVisible(!letraVisible)}
                    style={{
                      flex: 1,
                      padding: '0.65rem',
                      borderRadius: 'var(--radius-lg)',
                      border: letraVisible ? `2px solid ${CATEGORIA_COLORS[seleccionada.categoria] ?? 'var(--primary)'}` : '2px solid var(--border)',
                      background: letraVisible ? `${CATEGORIA_COLORS[seleccionada.categoria] ?? 'var(--primary)'}15` : 'transparent',
                      color: letraVisible ? (CATEGORIA_COLORS[seleccionada.categoria] ?? 'var(--primary)') : 'var(--text-muted)',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                      transition: 'all 0.2s',
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>lyrics</span>
                    Letra
                  </button>
                )}
                {seleccionada.url_descarga && (
                  <a
                    href={seleccionada.url_descarga}
                    download
                    style={{
                      flex: 1,
                      padding: '0.65rem',
                      borderRadius: 'var(--radius-lg)',
                      border: '2px solid var(--border)',
                      background: 'transparent',
                      color: 'var(--text-muted)',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                      transition: 'all 0.2s',
                      textDecoration: 'none',
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>download</span>
                    Descargar
                  </a>
                )}
              </div>

              {/* Letra */}
              {letraVisible && seleccionada.letra && (
                <div
                  style={{
                    background: 'var(--background-light)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.25rem',
                    maxHeight: '320px',
                    overflowY: 'auto',
                    borderLeft: `4px solid ${CATEGORIA_COLORS[seleccionada.categoria] ?? 'var(--primary)'}`,
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: '0.75rem' }}>
                    Letra
                  </div>
                  <pre
                    style={{
                      fontFamily: 'inherit',
                      fontSize: '0.9rem',
                      lineHeight: 1.8,
                      color: 'var(--foreground)',
                      whiteSpace: 'pre-wrap',
                      margin: 0,
                    }}
                  >
                    {seleccionada.letra}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}

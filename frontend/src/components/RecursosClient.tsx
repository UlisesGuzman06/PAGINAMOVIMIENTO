'use client';

import { useState } from 'react';

interface Recurso {
  id: string;
  titulo: string;
  descripcion: string;
  tipo: string;
  categoria: string;
  url_descarga: string | null;
  url_externo: string | null;
  imagen_portada: string | null;
  autor: string | null;
  año: number | null;
  paginas: number | null;
  destacado: boolean;
}

const TIPO_CONFIG: Record<string, { icon: string; color: string; label: string }> = {
  'Documento':        { icon: 'description',    color: '#3b82f6', label: 'PDF' },
  'Guía':             { icon: 'auto_stories',   color: '#8b5cf6', label: 'Guía' },
  'Video':            { icon: 'play_circle',    color: '#ef4444', label: 'Video' },
  'Audio':            { icon: 'headphones',     color: '#f59e0b', label: 'Audio' },
  'Enlace':           { icon: 'link',           color: '#22c55e', label: 'Enlace' },
  'Libro':            { icon: 'menu_book',      color: '#f97316', label: 'Libro' },
  'General':          { icon: 'folder',         color: '#64748b', label: 'General' },
};

const CATEGORIAS_ICONS: Record<string, string> = {
  'Biblia y Oración':        'auto_stories',
  'Formación':               'school',
  'Documentos Pontificios':  'gavel',
  'Materiales Oasis':        'spa',
  'General':                 'folder_open',
};

export default function RecursosClient({ recursos }: { recursos: Recurso[] }) {
  const [categoriaActiva, setCategoriaActiva] = useState('Todas');
  const [busqueda, setBusqueda] = useState('');

  const categorias = ['Todas', ...Array.from(new Set(recursos.map((r) => r.categoria)))];
  const destacados = recursos.filter((r) => r.destacado);

  const normalize = (str: string) => 
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const filtrados = recursos.filter((r) => {
    const query = normalize(busqueda);
    const matchCat = categoriaActiva === 'Todas' || r.categoria === categoriaActiva;
    const matchQ =
      !busqueda ||
      normalize(r.titulo).includes(query) ||
      normalize(r.descripcion ?? '').includes(query) ||
      normalize(r.autor ?? '').includes(query);
    return matchCat && matchQ;
  });

  const agrupadosPorCategoria = filtrados.reduce<Record<string, Recurso[]>>((acc, r) => {
    if (!acc[r.categoria]) acc[r.categoria] = [];
    acc[r.categoria].push(r);
    return acc;
  }, {});

  return (
    <>
      {/* Destacados */}
      {destacados.length > 0 && !busqueda && categoriaActiva === 'Todas' && (
        <section style={{ marginBottom: '3.5rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--primary)', display: 'block', marginBottom: '0.4rem' }}>
              Recomendados
            </span>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 900, lineHeight: 1.2 }}>
              Recursos esenciales
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {destacados.map((r) => {
              const cfg = TIPO_CONFIG[r.tipo] ?? TIPO_CONFIG['General'];
              const href = r.url_externo ?? r.url_descarga ?? '#';
              return (
                <a
                  key={r.id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                >
                  <div
                    style={{
                      background: 'var(--card-bg)',
                      border: `2px solid ${cfg.color}30`,
                      borderRadius: 'var(--radius-xl)',
                      padding: '1.75rem',
                      height: '100%',
                      boxShadow: 'var(--shadow-md)',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 30px ${cfg.color}25`; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-md)'; }}
                  >
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: cfg.color, borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0' }} />
                    <div style={{ width: 52, height: 52, borderRadius: '50%', background: `${cfg.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.1rem' }}>
                      <span className="material-symbols-outlined" style={{ color: cfg.color, fontSize: '1.6rem' }}>{cfg.icon}</span>
                    </div>
                    <span style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: cfg.color, display: 'block', marginBottom: '0.4rem' }}>
                      {cfg.label}  ·  {r.categoria}
                    </span>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, lineHeight: 1.3, marginBottom: '0.6rem' }}>
                      {r.titulo}
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1rem' }}>
                      {r.descripcion}
                    </p>
                    {(r.autor || r.año) && (
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                        {r.autor}{r.año ? ` · ${r.año}` : ''}
                      </p>
                    )}
                    <div style={{ position: 'absolute', bottom: '1.25rem', right: '1.25rem' }}>
                      <span className="material-symbols-outlined" style={{ color: cfg.color, fontSize: '1.2rem' }}>
                        {r.url_descarga ? 'download' : 'open_in_new'}
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </section>
      )}

      {/* Buscador + filtros */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div style={{ flex: 1, minWidth: 240, position: 'relative' }}>
          <span className="material-symbols-outlined" style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)', fontSize: '1.2rem', pointerEvents: 'none' }}>
            search
          </span>
          <input
            className="form-input"
            placeholder="Buscar recursos..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            style={{ paddingLeft: '2.75rem' }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
        {categorias.map((cat) => {
          const active = cat === categoriaActiva;
          return (
            <button
              key={cat}
              onClick={() => setCategoriaActiva(cat)}
              style={{
                padding: '0.4rem 1rem', borderRadius: '9999px',
                border: active ? '2px solid var(--primary)' : '2px solid var(--border)',
                background: active ? 'rgba(19,109,236,0.1)' : 'var(--card-bg)',
                color: active ? 'var(--primary)' : 'var(--text-muted)',
                fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer',
                transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '0.35rem',
              }}
            >
              {cat !== 'Todas' && (
                <span className="material-symbols-outlined" style={{ fontSize: '0.95rem' }}>
                  {CATEGORIAS_ICONS[cat] ?? 'folder'}
                </span>
              )}
              {cat}
            </button>
          );
        })}
      </div>

      {/* Listado */}
      {filtrados.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-dim)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem', opacity: 0.4 }}>search_off</span>
          <p>No se encontraron recursos</p>
        </div>
      ) : categoriaActiva === 'Todas' && !busqueda ? (
        /* Vista agrupada por categoría */
        Object.entries(agrupadosPorCategoria).map(([cat, items]) => (
          <section key={cat} style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)' }}>
              <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '1.4rem' }}>
                {CATEGORIAS_ICONS[cat] ?? 'folder'}
              </span>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{cat}</h2>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginLeft: 'auto', fontWeight: 600 }}>
                {items.length} {items.length === 1 ? 'recurso' : 'recursos'}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {items.map((r) => <RecursoFila key={r.id} recurso={r} />)}
            </div>
          </section>
        ))
      ) : (
        /* Vista lista filtrada */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {filtrados.map((r) => <RecursoFila key={r.id} recurso={r} />)}
        </div>
      )}
    </>
  );
}

function RecursoFila({ recurso }: { recurso: Recurso }) {
  const cfg = TIPO_CONFIG[recurso.tipo] ?? TIPO_CONFIG['General'];
  const href = recurso.url_externo ?? recurso.url_descarga ?? '#';
  const isDescarga = !!recurso.url_descarga && !recurso.url_externo;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div
        style={{
          background: 'var(--card-bg)',
          border: '1.5px solid var(--border)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.1rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1.1rem',
          transition: 'all 0.2s',
          cursor: 'pointer',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.borderColor = cfg.color;
          (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 16px ${cfg.color}20`;
          (e.currentTarget as HTMLElement).style.transform = 'translateX(4px)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
          (e.currentTarget as HTMLElement).style.boxShadow = '';
          (e.currentTarget as HTMLElement).style.transform = '';
        }}
      >
        <div style={{ width: 44, height: 44, borderRadius: '0.75rem', background: `${cfg.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span className="material-symbols-outlined" style={{ color: cfg.color, fontSize: '1.35rem' }}>{cfg.icon}</span>
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: '0.97rem', marginBottom: '0.15rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {recurso.titulo}
          </div>
          <div style={{ fontSize: '0.825rem', color: 'var(--text-dim)' }}>
            {recurso.autor}{recurso.año ? ` · ${recurso.año}` : ''}{recurso.paginas ? ` · ${recurso.paginas} págs.` : ''}
          </div>
        </div>

        <span style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.07em', textTransform: 'uppercase', padding: '0.25rem 0.65rem', borderRadius: '9999px', background: `${cfg.color}15`, color: cfg.color, flexShrink: 0 }}>
          {cfg.label}
        </span>

        <span className="material-symbols-outlined" style={{ color: 'var(--text-dim)', fontSize: '1.2rem', flexShrink: 0 }}>
          {isDescarga ? 'download' : 'open_in_new'}
        </span>
      </div>
    </a>
  );
}

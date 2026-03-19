"use client";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ año: string }> };

export default function OasisAñoPage({ params }: Props) {
  const { año } = use(params);
  const [ediciones, setEdiciones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOasis() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
        const response = await fetch(`${apiUrl}/oasis`);
        if (response.ok) {
          const data = await response.json();
          // Filtrar por el año de la URL y ordenar por numero
          const filtered = data
            .filter((o: any) => o.año.toString() === año)
            .sort((a: any, b: any) => {
              const numA = parseInt(a.numero) || 0;
              const numB = parseInt(b.numero) || 0;
              return numA - numB;
            });
          setEdiciones(filtered);
        }
      } catch (error) {
        console.error("Error fetching oasis:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchOasis();
  }, [año]);

  if (loading) {
    return (
      <main className="container section">
        <div style={{ textAlign: "center", padding: "100px 0" }}>
          <span className="loader">⌛ Cargando Oasis de {año}...</span>
        </div>
      </main>
    );
  }

  if (ediciones.length === 0) {
    return (
      <main className="container section">
        <div style={{ textAlign: "center", padding: "100px 0" }}>
          <h2>No se encontraron Oasis para el año {año}</h2>
          <Link href="/oasis" className="btn-primary" style={{ marginTop: 24 }}>Volver</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container section">
      {/* Botón Volver - Estilo Stitch */}
      <div style={{ marginBottom: 32 }}>
        <Link 
          href="/oasis" 
          style={{ 
            display: "inline-flex", 
            alignItems: "center", 
            gap: 12, 
            padding: "0.75rem 1.5rem", 
            backgroundColor: "rgba(19, 109, 236, 0.05)",
            border: "1px solid rgba(19, 109, 236, 0.2)",
            borderRadius: "var(--radius-lg)",
            color: "var(--primary)",
            fontWeight: 600,
            textDecoration: "none"
          }}
        >
          <span className="material-symbols-outlined">arrow_back</span>
          Volver a Oasis
        </Link>
      </div>

      {/* Hero 1:1 Stitch - Usamos el primero del año como hero */}
      <section 
        className="oasis-hero" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${ediciones[0].foto_principal || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000'}')`,
          display: "flex",
          alignItems: "flex-end",
          padding: "64px",
          height: 420,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="oasis-hero-content" style={{ padding: 0 }}>
          <span className="seasonal-badge" style={{ backgroundColor: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)", color: "white", marginBottom: 16 }}>
            EDICIÓN {año}
          </span>
          <h1 className="hero-title" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", color: "white", textAlign: "left", fontWeight: 800, letterSpacing: "-0.02em" }}>
            Oasis {año}
          </h1>
          <p style={{ fontSize: "1.25rem", opacity: 0.9, maxWidth: 650, color: "rgba(255,255,255,0.8)" }}>
            Revive los encuentros realizados durante el año {año}.
          </p>
        </div>
      </section>

      <p style={{ margin: "48px 0", color: "var(--text-dim)", textAlign: "center", fontSize: "1rem" }}>
        Selecciona un encuentro para ver más detalles y vivencias.
      </p>

      {/* Grid de Retiros - Estilo Stitch (2 Columnas) */}
      <div 
        className="grid-features" 
        style={{ 
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", 
          gap: "2.5rem" 
        }}
      >
        {ediciones.map((r) => {
          return (
            <div key={r.id} className="year-card" style={{ border: "none", boxShadow: "var(--shadow-md)" }}>
              <div 
                style={{ 
                  height: 240, 
                  backgroundImage: `url('${r.foto_principal || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800'}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              />
              <div className="year-card-body" style={{ padding: "2rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <span className="seasonal-badge" style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
                    {r.numero ? `OASIS #${r.numero}` : 'OASIS'}
                  </span>
                  {r.genero && (
                    <span className="seasonal-badge" style={{ backgroundColor: 'var(--secondary)', color: 'white' }}>
                      {r.genero.toUpperCase()}
                    </span>
                  )}
                  <span style={{ fontSize: "0.875rem", color: "var(--text-dim)", display: "flex", alignItems: "center", gap: 4 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: "1.1rem" }}>calendar_today</span>
                    {r.fecha_inicio ? new Date(r.fecha_inicio + 'T12:00:00').toLocaleDateString() : 'Fecha no especificada'}
                  </span>
                </div>
                <h3 className="year-card-title" style={{ fontSize: "1.5rem", marginBottom: 12 }}>{r.nombre}</h3>
                <p className="feature-desc" style={{ marginBottom: 24, fontSize: "0.9375rem" }}>{r.lugar_nombre || 'Lugar no especificado'}</p>
                
                <Link 
                  href={`/oasis/${año}/${r.slug}`}
                  style={{ 
                    display: "inline-flex", 
                    alignItems: "center", 
                    gap: 8, 
                    color: "var(--primary)", 
                    fontWeight: 700, 
                    textDecoration: "none",
                    fontSize: "0.9375rem"
                  }}
                >
                  Ver Oasis <span className="material-symbols-outlined" style={{ fontSize: "1.2rem" }}>chevron_right</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

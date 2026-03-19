"use client";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ año: string; slug: string }> };

export default function DetalleRetiroPage({ params }: Props) {
  const { año, slug } = use(params);
  const [oasis, setOasis] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOasisDetail() {
      try {
        const response = await fetch(`http://localhost:3001/oasis/slug/${slug}`);
        if (response.ok) {
          const data = await response.json();
          setOasis(data);
        } else {
          setOasis(null);
        }
      } catch (error) {
        console.error("Error fetching oasis detail:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchOasisDetail();
  }, [slug]);

  if (loading) {
    return (
      <main className="container section">
        <div style={{ textAlign: "center", padding: "100px 0" }}>
          <span className="loader">⌛ Cargando detalles del Oasis...</span>
        </div>
      </main>
    );
  }

  if (!oasis) return notFound();

  // Parsear la galería si existe (fotos_galeria)
  const galeria = Array.isArray(oasis.fotos_galeria) 
    ? oasis.fotos_galeria 
    : (typeof oasis.fotos_galeria === 'string' ? (oasis.fotos_galeria.startsWith('[') ? JSON.parse(oasis.fotos_galeria) : oasis.fotos_galeria.split(',').map((s: string) => s.trim())) : []);

  return (
    <main className="container section">
      {/* Banner 1:1 Stitch */}
      <section 
        className="oasis-hero" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${
            oasis.foto_principal || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000"
          }')`,
          height: 480,
          marginBottom: 0,
          borderRadius: "var(--radius-xl) var(--radius-xl) 0 0",
          display: "flex",
          alignItems: "flex-end",
          padding: "64px",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="oasis-hero-content" style={{ padding: 0 }}>
          <span className="seasonal-badge" style={{ backgroundColor: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)", color: "white", marginBottom: 16, display: "inline-flex", gap: 8 }}>
            {oasis.numero && <span>Oasis #{oasis.numero}</span>}
            {oasis.numero && <span>•</span>}
            {oasis.genero && <span>{oasis.genero}</span>}
            {oasis.genero && <span>•</span>}
            <span>{oasis.año}</span>
          </span>
          <h1 className="hero-title" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "white", textAlign: "left", fontWeight: 800, letterSpacing: "-0.02em" }}>
            {oasis.nombre}
          </h1>
          <p style={{ fontSize: "1.25rem", opacity: 0.9, maxWidth: 700, lineHeight: 1.6, color: "rgba(255,255,255,0.8)" }}>
            Un encuentro para descansar en el Señor y renovar las fuerzas del camino.
          </p>
        </div>
      </section>

      {/* Cita Bíblica Estilo Split Stitch */}
      {(oasis.cita_texto || oasis.cita_biblica) && (
        <section className="cita-detail" style={{ position: "relative", padding: "64px 48px", textAlign: "center", background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "3rem", color: "var(--primary)", opacity: 0.1, position: "absolute", top: 20, left: "50%", transform: "translateX(-50%)" }}>format_quote</span>
            <h2 className="cita-detail-text" style={{ fontSize: "1.5rem", fontStyle: "italic", fontWeight: 400, color: "#334155", lineHeight: 1.5, marginBottom: 24, position: "relative", zIndex: 1, padding: "0 24px" }}>
              "{oasis.cita_texto || oasis.cita_biblica}"
            </h2>
            {oasis.cita_referencia && (
              <p style={{ fontSize: "1rem", fontWeight: 700, color: "var(--primary)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                — {oasis.cita_referencia}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Grid de Contenido */}
      <div className="detalle-grid" style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: "64px", alignItems: "start" }}>
        {/* Columna Izquierda */}
        <div>
          <section style={{ marginBottom: 64 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <span className="material-symbols-outlined" style={{ color: "var(--primary)" }}>group</span>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Equipo de Animación</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <p><strong>{oasis.genero === "Femenino" ? "Animadora" : "Animador"}:</strong> {oasis.animadorx || "Próximamente"}</p>
              <p><strong>{oasis.genero === "Femenino" ? "Sub-animadora" : "Sub-animador"}:</strong> {oasis.sub_animadorx || "Próximamente"}</p>
              <p><strong>Asistentes:</strong> {Array.isArray(oasis.asistentes) ? oasis.asistentes.join(', ') : oasis.asistentes || "Próximamente"}</p>
            </div>
          </section>

          <section>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <span className="material-symbols-outlined" style={{ color: "var(--secondary)" }}>photo_library</span>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Galería de Momentos</h3>
            </div>
            {galeria.length > 0 ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
                {galeria.map((url: string, i: number) => (
                  <div key={i} className="year-card" style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", aspectRatio: "1.2", height: "auto" }}>
                    <img 
                      src={url} 
                      alt={`Momento Oasis ${i+1}`}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: "var(--text-dim)" }}>No hay fotos disponibles para esta edición.</p>
            )}
          </section>
        </div>

        {/* Columna Derecha (Ubicación) */}
        <aside style={{ position: "sticky", top: 100 }}>
          <div className="ubicacion-card">
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <span className="material-symbols-outlined" style={{ color: "var(--primary)" }}>map</span>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700 }}>Detalles de Ubicación</h3>
            </div>


            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div style={{ display: "flex", gap: "16px" }}>
                <span className="material-symbols-outlined" style={{ color: "var(--primary)" }}>location_on</span>
                <div>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-dim)", fontWeight: 800 }}>LUGAR</p>
                  <p style={{ fontWeight: 600 }}>{oasis.lugar_nombre || "Lugar por confirmar"}</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: "16px" }}>
                <span className="material-symbols-outlined" style={{ color: "var(--primary)" }}>calendar_today</span>
                <div>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-dim)", fontWeight: 800 }}>FECHA</p>
                  <p style={{ fontWeight: 600 }}>{oasis.fecha_inicio ? new Date(oasis.fecha_inicio + 'T12:00:00').toLocaleDateString() : "Por confirmar"}</p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 32, textAlign: "center" }}>
            <Link 
              href={`/oasis/${año}`} 
              style={{ color: "var(--text-dim)", textDecoration: "none", fontSize: "0.875rem", fontWeight: 600 }}
            >
              ← Volver a {año}
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}

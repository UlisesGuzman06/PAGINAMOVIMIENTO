"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getApiUrl } from "@/lib/apiConfig";

export default function OasisPage() {
  const [oasisList, setOasisList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOasis() {
      try {
        const response = await fetch(`${getApiUrl()}/oasis`);
        if (response.ok) {
          const data = await response.json();
          // Ordenar por año descendente
          const sorted = data.sort((a: any, b: any) => b.año - a.año);
          setOasisList(sorted);
        }
      } catch (error) {
        console.error("Error fetching oasis:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchOasis();
  }, []);

  const getYearInfo = (status: string) => {
    // Por ahora usamos colores basados en si es reciente o no
    return { color: "var(--oasis-blue)", icon: "event", status: "VER OASIS" };
  };

  const groupedByYear = oasisList.reduce((acc: any, curr: any) => {
    if (!acc[curr.año]) acc[curr.año] = [];
    acc[curr.año].push(curr);
    return acc;
  }, {});

  const yearsArray = Object.keys(groupedByYear)
    .sort((a, b) => Number(b) - Number(a))
    .map(year => ({
      año: year,
      count: groupedByYear[year].length,
      foto_principal: groupedByYear[year].find((o: any) => o.foto_principal)?.foto_principal || ""
    }));

  const historicalYears = yearsArray.map(y => y.año);

  if (loading) {
    return (
      <main className="container section">
        <div style={{ textAlign: "center", padding: "100px 0" }}>
          <span className="loader">⌛ Cargando Oasis...</span>
        </div>
      </main>
    );
  }

  return (
    <main className="container section">
      {/* Header Estilo Stitch */}
      <div style={{ textAlign: "left", marginBottom: 64 }}>
        <span className="seasonal-badge" style={{ background: "rgba(34, 197, 94, 0.1)", color: "var(--secondary)", marginBottom: 16 }}>
          <span className="material-symbols-outlined" style={{ fontSize: "1rem", marginRight: 6 }}>grass</span>
          MARANATHA
        </span>
        <h1 className="hero-title" style={{ fontSize: "clamp(2.5rem, 8vw, 4rem)", marginBottom: 16, textAlign: "left", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--foreground)" }}>
          Oasis
        </h1>
        <p className="feature-desc" style={{ maxWidth: "700px", fontSize: "1.125rem", color: "var(--text-muted)", lineHeight: 1.7 }}>
          Revive los momentos, las enseñanzas y la comunidad de cada año. Selecciona una edición para acceder al contenido multimedia y las vivencias de cada encuentro.
        </p>
      </div>

      {/* Relato: El Sentido de Oasis */}
      <section style={{ 
        backgroundColor: "rgba(19, 109, 236, 0.03)", 
        borderRadius: "var(--radius-xl)", 
        padding: "3rem", 
        marginBottom: 80,
        borderLeft: "4px solid var(--primary)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <h2 style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--foreground)" }}>El Sentido del Oasis</h2>
        </div>
        
        <div style={{ fontSize: "1.1rem", lineHeight: 1.85, color: "var(--text-muted)", maxWidth: "850px" }}>
          <p style={{ marginBottom: "1.5rem" }}>
            Hace mucho mucho tiempo, hubo un pueblo que, como pasa muchas veces, estaba bajo esclavitud de un imperio poderoso. 
            Hacían trabajos forzados en canteras, construcciones faraónicas… esa era su realidad, no veían otro horizonte ni tenían esperanzas de que eso fuera a cambiar.
          </p>
          
          <p style={{ marginBottom: "1.5rem" }}>
            Un día, el pueblo recibió una Buena noticia… podían ser liberados y conducidos por un camino que los llevaría a la libertad, 
            iban a poder ser dueños de sus propias tierras, trabajar por ellos… iban a poder ser libres. Al principio se resistieron: 
            la esclavitud para ellos significaba seguridad, les bastaba con comer todos los días, y buscar nuevos caminos significaba para ellos salir de la seguridad y de la comodidad… 
            Estaban acostumbrados a ser esclavos. Claramente, sabiendo que llegar a la tierra de la libertad significaba cruzar un desierto, 
            ninguno quería salir de su comodidad aunque eso significara seguir siendo esclavos.
          </p>
          
          <p style={{ marginBottom: "1.5rem" }}>
            Hasta que un día, un gran líder apareció y los entusiasmo, les dijo: “Yo voy con ustedes, yo voy a correr los mismos riesgos que ustedes y juntos vamos a llegar a la tierra de libertad”. 
            Entonces, el pueblo se introdujo en el desierto y empezaron a andar. Fue un largo camino, en el que aparecieron cansancios y desesperanza.
          </p>
          
          <p>
            En el desierto aprendieron a caminar y a descansar en cada oasis que se encontraban. En cada oasis, armaban una carpa para compartir en pequeños grupos 
            las experiencias del camino recorrido, para hacerse más amigos entre ellos y animarse para llegar a destino. En cada oasis armaban una tienda a la que llamaban 
            la Tienda del Señor, donde estaba simbólicamente Dios que los acompañaba en su caminar. Así, descansando en cada oasis, llegaron a la tierra prometida, a la tierra de la libertad.
          </p>
        </div>
      </section>

      {/* Grid de Ediciones Principales - Dinámico */}
      <div className="grid-features" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "2rem", marginBottom: 80 }}>
        {yearsArray.map((yearObj) => {
          const info = getYearInfo("abierto");
          return (
            <Link key={yearObj.año} href={`/oasis/${yearObj.año}`} className="year-card" style={{ padding: "2.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem" }}>
              </div>
              <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--foreground)", marginBottom: 12, letterSpacing: "-0.02em" }}>Oasis {yearObj.año}</h2>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border)", paddingTop: 20 }}>
                 <span style={{ fontWeight: 600, color: info.color, letterSpacing: "0.05em" }}>{yearObj.count} RETIRO{yearObj.count !== 1 ? 'S' : ''}</span>
                 <span className="material-symbols-outlined" style={{ color: "var(--foreground)" }}>arrow_forward</span>
              </div>
            </Link>
          );
        })}
      </div>


    </main>
  );
}


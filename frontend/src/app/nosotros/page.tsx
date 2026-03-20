export default function NosotrosPage() {
  const hitos = [
    {
      year: "1972",
      titulo: "Los Orígenes",
      descripcion:
        "El Padre José Manzano funda el Movimiento Juvenil Peregrino en Mendoza. El 17 de agosto se realiza el primer retiro para varones, llamado \"Copos de gracia\". En octubre del mismo año se lleva a cabo el primer retiro para mujeres.",
      icon: "church",
      color: "#3b82f6",
    },
    {
      year: "1977",
      titulo: "Padre Vladimiro Rossi",
      descripcion:
        'El Padre Vladimiro Rossi, conocido como "Vladi", se une al movimiento y se convierte en asesor espiritual. En 1978 asume como Asesor General, dedicando gran parte de su vida a los jóvenes peregrinos.',
      icon: "person",
      color: "#8b5cf6",
    },
    {
      year: "1982",
      titulo: "Peregrinos II Centro",
      descripcion:
        "Por pedido de Monseñor Rubiolo nace \"Peregrinos II Centro\", rama destinada a jóvenes mayores de 18 años. Buscando un proceso de crecimiento espiritual para jóvenes maduros. Ese mismo año, el movimiento se expande a Chile.",
      icon: "groups",
      color: "#22c55e",
    },
    {
      year: "1987",
      titulo: "Padre Alberto Aguirre",
      descripcion:
        "El sacerdote jesuita Alberto Aguirre se une a Peregrinos II Centro, convirtiéndose en asesor espiritual general del MJP y acompañando el crecimiento del movimiento.",
      icon: "volunteer_activism",
      color: "#f59e0b",
    },
    {
      year: "1999",
      titulo: "Peregrinos III Centro",
      descripcion:
        'Surge "Peregrinos III Centro" para brindar contención y guía espiritual a mayores de 27 años, completando así las tres etapas del camino peregrino.',
      icon: "favorite",
      color: "#ef4444",
    },
    {
      year: "2022",
      titulo: "50 Años de Historia",
      descripcion:
        "El Movimiento celebra sus 50 años habiendo transformado la vida de más de 20.000 jóvenes a través de casi 600 retiros Oasis. Hoy el MJP cuenta con nueve comunidades en toda la provincia de Mendoza.",
      icon: "star",
      color: "#f97316",
    },
  ];

  const valores = [
    {
      icon: "favorite",
      titulo: "Comunidad",
      descripcion:
        "Creemos que el camino de fe se vive mejor en comunidad. La amistad, el diálogo y la fraternidad son pilares de nuestra vida.",
    },
    {
      icon: "brightness_5",
      titulo: "Conversión",
      descripcion:
        "El objetivo fundamental del movimiento: un proceso continuo de conversión personal que lleva al joven a encontrarse con Cristo.",
    },
    {
      icon: "spa",
      titulo: "Espiritualidad",
      descripcion:
        "Profundizamos una espiritualidad apostólica basada en los valores evangélicos, vivida en comunidad y con sentido de Iglesia.",
    },
    {
      icon: "handshake",
      titulo: "Servicio",
      descripcion:
        "La fe se expresa en el servicio. Formamos jóvenes que buscan ser una Iglesia viva que sirva a los demás en comunión con Jesucristo.",
    },
  ];

  return (
    <main className="container section">
      {/* Hero */}
      <section
        className="hero-section"
        style={{
          backgroundImage: `url("/FOTOS/movimientojdv.jpg")`,
          marginBottom: "3rem",
        }}
      >
        <div className="hero-overlay" />
        <div className="hero-content">
          <span className="hero-badge">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "1rem" }}
            >
              directions_walk
            </span>
            Desde 1972 · Mendoza, Argentina
          </span>
          <h1 className="hero-title">Sobre Nosotros</h1>
          <p className="hero-subtitle">
            Movimiento Juvenil Peregrino Centro 1 · Parroquia Nuestra Señora de
            los Dolores
          </p>
        </div>
      </section>

      {/* Misión */}
      <section style={{ marginBottom: "4rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            alignItems: "center",
            background: "var(--card-bg)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-xl)",
            padding: "2.5rem",
            boxShadow: "var(--shadow-lg)",
          }}
        >
          <div>
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 800,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--primary)",
                display: "block",
                marginBottom: "0.75rem",
              }}
            >
              Quiénes Somos
            </span>
            <h2
              style={{
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                fontWeight: 900,
                lineHeight: 1.2,
                marginBottom: "1.25rem",
              }}
            >
              Un movimiento diocesano
              <br />
              <span style={{ color: "var(--primary)" }}>para la juventud</span>
            </h2>
            <p
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.8,
                color: "var(--text-muted)",
                marginBottom: "1.25rem",
              }}
            >
              <strong>«Peregrinos»</strong> es un movimiento diocesano para
              adolescentes y jóvenes que tiene como objetivo ayudar a descubrir
              el valor de la vida cristiana y comprometerse generosamente con
              una actividad apostólica dentro de una comunidad eclesial.
            </p>
            <p
              style={{
                fontSize: "1rem",
                lineHeight: 1.7,
                color: "var(--text-muted)",
              }}
            >
              Nacido en Mendoza en 1972, inspirado en el esquema de los
              Cursillos de Cristiandad, el MJP Centro 1 tiene su sede en la{" "}
              <strong>Parroquia Nuestra Señora de los Dolores</strong>{" "}
              (Granaderos 1643, Mendoza) y es parte de una red de nueve
              comunidades en toda la provincia.
            </p>
          </div>
          <div
            style={{
              borderRadius: "var(--radius-xl)",
              overflow: "hidden",
              boxShadow: "var(--shadow-lg)",
              aspectRatio: "4/3",
              backgroundImage: 'url("/FOTOS/CRUZ.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>
      </section>

      {/* Cita */}
      <div className="cita-block" style={{ marginBottom: "4rem" }}>
        <p className="cita-text">
          «La conversión y el desarrollo espiritual apostólico de la juventud,
          basado en los valores evangélicos, vivido en COMUNIDAD y con sentido
          de Iglesia.»
        </p>
        <span className="cita-ref">Misión del Movimiento Juvenil Peregrino</span>
      </div>

      {/* Valores */}
      <section style={{ marginBottom: "4rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 800,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--primary)",
              display: "block",
              marginBottom: "0.5rem",
            }}
          >
            Nuestros Valores
          </span>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
              fontWeight: 900,
              lineHeight: 1.2,
            }}
          >
            Lo que nos mueve
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {valores.map((v, i) => (
            <div
              key={i}
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-xl)",
                padding: "2rem",
                boxShadow: "var(--shadow-sm)",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              className="feature-card"
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  background: "rgba(19,109,236,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ color: "var(--primary)", fontSize: "1.5rem" }}
                >
                  {v.icon}
                </span>
              </div>
              <h3
                style={{ fontSize: "1.15rem", fontWeight: 700, lineHeight: 1.3 }}
              >
                {v.titulo}
              </h3>
              <p
                style={{ fontSize: "0.95rem", color: "var(--text-muted)", lineHeight: 1.7 }}
              >
                {v.descripcion}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Historia / Timeline */}
      <section style={{ marginBottom: "4rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 800,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--primary)",
              display: "block",
              marginBottom: "0.5rem",
            }}
          >
            Nuestra Historia
          </span>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
              fontWeight: 900,
              lineHeight: 1.2,
            }}
          >
            Más de 50 años caminando juntos
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              marginTop: "0.75rem",
              fontSize: "1.05rem",
              maxWidth: 600,
              margin: "0.75rem auto 0",
            }}
          >
            Desde un primer retiro en agosto de 1972 hasta transformar la vida
            de más de 20.000 jóvenes mendocinos.
          </p>
        </div>

        <div style={{ position: "relative" }}>
          {/* Línea central */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: 2,
              background: "var(--border)",
              transform: "translateX(-50%)",
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2.5rem",
              position: "relative",
            }}
          >
            {hitos.map((hito, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 60px 1fr",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  {/* Contenido lado izquierdo */}
                  {isLeft ? (
                    <div
                      style={{
                        background: "var(--card-bg)",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius-xl)",
                        padding: "1.5rem",
                        boxShadow: "var(--shadow-md)",
                        textAlign: "right",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.7rem",
                          fontWeight: 800,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: hito.color,
                          display: "block",
                          marginBottom: "0.25rem",
                        }}
                      >
                        {hito.year}
                      </span>
                      <h3
                        style={{
                          fontSize: "1.1rem",
                          fontWeight: 700,
                          marginBottom: "0.5rem",
                        }}
                      >
                        {hito.titulo}
                      </h3>
                      <p
                        style={{
                          fontSize: "0.9rem",
                          color: "var(--text-muted)",
                          lineHeight: 1.6,
                        }}
                      >
                        {hito.descripcion}
                      </p>
                    </div>
                  ) : (
                    <div />
                  )}

                  {/* Círculo central */}
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      background: hito.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto",
                      boxShadow: `0 0 0 4px white, 0 0 0 6px ${hito.color}40`,
                      zIndex: 1,
                      position: "relative",
                      flexShrink: 0,
                    }}
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ color: "white", fontSize: "1.25rem" }}
                    >
                      {hito.icon}
                    </span>
                  </div>

                  {/* Contenido lado derecho */}
                  {!isLeft ? (
                    <div
                      style={{
                        background: "var(--card-bg)",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius-xl)",
                        padding: "1.5rem",
                        boxShadow: "var(--shadow-md)",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.7rem",
                          fontWeight: 800,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: hito.color,
                          display: "block",
                          marginBottom: "0.25rem",
                        }}
                      >
                        {hito.year}
                      </span>
                      <h3
                        style={{
                          fontSize: "1.1rem",
                          fontWeight: 700,
                          marginBottom: "0.5rem",
                        }}
                      >
                        {hito.titulo}
                      </h3>
                      <p
                        style={{
                          fontSize: "0.9rem",
                          color: "var(--text-muted)",
                          lineHeight: 1.6,
                        }}
                      >
                        {hito.descripcion}
                      </p>
                    </div>
                  ) : (
                    <div />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* El Oasis */}
      <section style={{ marginBottom: "4rem" }}>
        <div
          style={{
            background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #22c55e 100%)",
            borderRadius: "var(--radius-xl)",
            padding: "3rem",
            color: "white",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            alignItems: "center",
          }}
        >
          <div>
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 800,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                opacity: 0.8,
                display: "block",
                marginBottom: "0.75rem",
              }}
            >
              Nuestra Herramienta
            </span>
            <h2
              style={{
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                fontWeight: 900,
                lineHeight: 1.2,
                marginBottom: "1.25rem",
              }}
            >
              El Retiro Oasis
            </h2>
            <p style={{ fontSize: "1.05rem", lineHeight: 1.8, opacity: 0.9 }}>
              El <strong>Oasis</strong> es el retiro espiritual característico
              del MJP. Es el medio privilegiado para la evangelización, la
              conversión y el crecimiento espiritual. Comenzó en 1972 y hoy
              suma casi 600 retiros celebrados.
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
            }}
          >
            {[
              {
                icon: "groups",
                label: "+20.000 jóvenes",
                sub: "transformados por el movimiento",
              },
              {
                icon: "spa",
                label: "~600 Oasis",
                sub: "retiros celebrados desde 1972",
              },
              {
                icon: "map",
                label: "9 Comunidades",
                sub: "en toda la provincia de Mendoza",
              },
              {
                icon: "public",
                label: "Expansión a Chile",
                sub: "el movimiento cruzó la cordillera en 1982",
              },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  background: "rgba(255,255,255,0.15)",
                  borderRadius: "var(--radius-lg)",
                  padding: "1rem 1.25rem",
                  backdropFilter: "blur(4px)",
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "1.75rem", opacity: 0.9 }}
                >
                  {stat.icon}
                </span>
                <div>
                  <div style={{ fontWeight: 800, fontSize: "1.05rem" }}>
                    {stat.label}
                  </div>
                  <div style={{ fontSize: "0.85rem", opacity: 0.8 }}>
                    {stat.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Las tres etapas */}
      <section style={{ marginBottom: "4rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 800,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--primary)",
              display: "block",
              marginBottom: "0.5rem",
            }}
          >
            El Camino Peregrino
          </span>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
              fontWeight: 900,
              lineHeight: 1.2,
            }}
          >
            Tres etapas, un mismo camino
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {[
            {
              num: "I",
              nombre: "Centro 1",
              edad: "Adolescentes y jóvenes",
              desc: "La puerta de entrada al movimiento. Un espacio de descubrimiento de la vida cristiana y el primer encuentro con el Oasis.",
              since: "Desde 1972",
              color: "#3b82f6",
            },
            {
              num: "II",
              nombre: "Centro 2",
              edad: "Jóvenes mayores de 18 años",
              desc: "Un proceso de crecimiento espiritual más profundo, nacido en 1982 por pedido del Obispo.",
              since: "Desde 1982",
              color: "#8b5cf6",
            },
            {
              num: "III",
              nombre: "Centro 3",
              edad: "Mayores de 27 años",
              desc: "Contención y acompañamiento espiritual para quienes buscan continuar su camino de fe en la adultez.",
              since: "Desde 1999",
              color: "#f59e0b",
            },
          ].map((c, i) => (
            <div
              key={i}
              style={{
                background: "var(--card-bg)",
                border: `2px solid ${c.color}30`,
                borderRadius: "var(--radius-xl)",
                padding: "2rem",
                boxShadow: "var(--shadow-md)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -20,
                  right: -10,
                  fontSize: "6rem",
                  fontWeight: 900,
                  color: `${c.color}12`,
                  lineHeight: 1,
                  userSelect: "none",
                }}
              >
                {c.num}
              </div>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: `${c.color}20`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1rem",
                  fontSize: "1.1rem",
                  fontWeight: 900,
                  color: c.color,
                }}
              >
                {c.num}
              </div>
              <h3
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 800,
                  marginBottom: "0.25rem",
                }}
              >
                Peregrinos {c.nombre}
              </h3>
              <p
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: c.color,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "1rem",
                }}
              >
                {c.edad} · {c.since}
              </p>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.6,
                }}
              >
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Dónde estamos */}
      <section className="cta-section" style={{ marginBottom: "2rem" }}>
        <span
          className="material-symbols-outlined"
          style={{
            fontSize: "3rem",
            color: "var(--primary)",
            display: "block",
            marginBottom: "1rem",
          }}
        >
          location_on
        </span>
        <h2 className="cta-title">¿Dónde nos encontramos?</h2>
        <p className="cta-desc">
          La comunidad MJP Centro 1 tiene su sede en la{" "}
          <strong>Parroquia Nuestra Señora de los Dolores</strong>,{" "}
          Granaderos 1643, Ciudad de Mendoza, Argentina.
        </p>
        <a
          href="https://maps.google.com/?q=Granaderos+1643,+Mendoza,+Argentina"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: "1.1rem" }}>
            map
          </span>
          Ver en el mapa
        </a>
      </section>
    </main>
  );
}

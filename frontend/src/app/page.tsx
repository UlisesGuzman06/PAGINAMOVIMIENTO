import Link from "next/link";

export default function Home() {
  const features = [
    {
      title: "Oasis",
      desc: "Retiros espirituales en la naturaleza para fortalecer tu fe y encontrar paz.",
      icon: "nature_people",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWwi1U2_iMY589gAwipYsms2M7xkHf1z1-5gH8WgJ9NNFyIuj-SkkHY9Y2jT8Qxj9k_Uycs5YCn6lYh1lbfVjrIeM4qnzhZTUFn6wJY3yEXK6--fm0IW-qOsdvPTXmiKIYoPtQT3nwV795reEKv1r0cmbEsfJ2sbkFl_672HViwTgJvjadcp-Kjk5LjfPKY6QQxNql2wFOgsIK5HuW-gL8wflsvXd6c9b1FEJJapLG68Wgvx08S7-MXuieZogmg2QYgYZVyOreCOTB",
      link: "/oasis"
    },
    {
      title: "Música",
      desc: "Alabanzas y canciones para acompañar tu camino y expresar alegría.",
      icon: "music_note",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-7IV9KarlHQIO-YIGelGJ94xJDJHTxqNW_eh02Z35tf5Nyr0Hll6SccQ6N35Lnq8IG1BAy_w5q-EjliuX8Apykej-Qtuv3LaTje5Kjz0wxeo8htAaYVbQJKFYHQHXXkSgaQopOGbdUywISFFS2iIzktISTtXgb4yd4YH12zGMwcE3iBcaEniE-geQS4M1059zJFo_Xk-mLvMKGX66N1kCrwHLaD26Ep5MrUEV_oF5wITtAwlY0ufAWB9_10FrXjvcIVyypnkUx9ZP",
      link: "/musica"
    },
    {
      title: "Fotos",
      desc: "Momentos inolvidables de nuestros encuentros, misiones y celebraciones.",
      icon: "photo_camera",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_NwfZ_eN_CoU0KJ9s4Y7yOA7C6A18_pXm9nbq7zlzoRB1vE6gtz3rqTpimzrTzdJwMHI0zh30xbRaxNDmRVdbgpq67MoRm9-4-3CbKl952cTP3JEQ8UD_AeFTWUSKWD2XFFnuhZzRg1A63reKbxkbU17yh_ZK2vEft2RL5XzcUwyO0TjqMt71GDLM52617OfSPtyjQF6B07zneSxETX8wiAzz71D5dWtkACmIBeKAC_Uk8hn1MNFzLEzGoJy3aMqIK2_9UmTY4Ynf",
      link: "/fotos"
    },
    {
      title: "Recursos",
      desc: "Materiales de apoyo, lecturas y formación continua para jóvenes.",
      icon: "menu_book",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBkSgzC4kzi_QbGLiwVJdrYeHmUhRTp3C0WUH67ypPAeB7scMgytJVauqVwLa0GO1dZhcfsO3Ha9TW_jsa8Eq05I3ES7rhyYXLy2P5u9BHVRh4JpWac32RUm1vED6klvPIb5RREO7UggBecHvn5aMkmnRrat4YHfklA4XFigW_BbjTcxn2cUWQHWEsReaSe50KKfegjPoXWY90Qgef5cA8QlSVmlUJDefsI50dxsSx7EdsSJmRDPuEefDPYuKFCGEibdebTfPMoSLqa",
      link: "/recursos"
    }
  ];

  return (
    <main className="container section">
      {/* Hero Section */}
      <section 
        className="hero-section" 
        style={{ backgroundImage: `url("/FOTOS/movimientojdv.jpg")` }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-badge">
            <span className="material-symbols-outlined" style={{ fontSize: "1rem" }}>church</span>
            Maranatha
          </span>
          <h1 className="hero-title">
            Bienvenido al Movimiento Juvenil Peregrino
          </h1>
          <p className="hero-subtitle">
            Unidos en la fe, caminamos juntos hacia Cristo. Nuestra comunidad fortalece tu espíritu.
          </p>
        </div>
      </section>

      {/* Quiénes Somos Section */}
      <section className="section" style={{ padding: "80px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center", border: "1px solid var(--border)", borderRadius: "var(--radius-xl)", padding: "2rem", backgroundColor: "var(--card-bg)", boxShadow: "var(--shadow-lg)" }}>
          <div>
            <h2 className="cta-title" style={{ fontSize: "2.5rem", marginBottom: 24 }}>¿Quiénes Somos?</h2>
            <p className="feature-desc" style={{ fontSize: "1.2rem", lineHeight: 1.8, color: "var(--text-muted)", marginBottom: 24 }}>
              "Peregrinos". Movimiento diocesano para adolescentes y jóvenes, que tiene como objeto ayudar a descubrir el valor de la vida cristiana y comprometerse generosamente con una actividad apostólica dentro de una comunidad eclesial. El carisma que anima sus actividades se expresa a través de dos palabras que sintetizan el objetivo fundamental de su existencia: Conversión y Espiritualidad
            </p>
            <p className="feature-desc" style={{ fontSize: "1.1rem", lineHeight: 1.7, color: "var(--text-muted)" }}>
              Nuestra misión es acompañar a los jóvenes en su crecimiento espiritual, ofreciendo espacios de reflexión, 
              comunidad y servicio, siempre con la alegría de saberse amados por Dios.
            </p>
          </div>
          <div style={{ 
            borderRadius: "var(--radius-xl)", 
            overflow: "hidden", 
            boxShadow: "var(--shadow-lg)",
            backgroundColor: "#f1f5f9",
            aspectRatio: "4/3",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative"
          }}>
            {/* ESPACIO PARA LA IMAGEN DE LA CRUZ CURSILLISTA */}
            <div style={{
              width: "100%",
              height: "100%",
              backgroundImage: 'url("/FOTOS/CRUZ.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "#94a3b8"
            }}>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

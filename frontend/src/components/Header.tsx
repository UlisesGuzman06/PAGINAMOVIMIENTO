import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <Link href="/" className="header-logo">
        <span className="material-symbols-outlined" style={{ fontSize: "2rem" }}>
          <img src="/FOTOS/MJP.jpg" alt="" style={{ height: "50px", width: "50px" }}/>
        </span>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--foreground)" }}>MJP</h2>
      </Link>

      <nav className="header-nav">
        <Link href="/" className="nav-link">
          Inicio
        </Link>
        <Link href="/nosotros" className="nav-link">
          Nosotros
        </Link>
        <Link href="/oasis" className="nav-link">
          Oasis
        </Link>
        <Link href="/musica" className="nav-link">
          Música
        </Link>
        <Link href="/recursos" className="nav-link">
          Recursos
        </Link>
      </nav>

    </header>
  );
}

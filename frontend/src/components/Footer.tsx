import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <span className="material-symbols-outlined" style={{ fontSize: "1.5rem" }}>
            <img src="/FOTOS/MJP.jpg" alt="" style={{ height: "30px", width: "30px" }}/>
          </span>
          <span style={{ fontWeight: 700, fontSize: "1.125rem", color: "var(--foreground)" }}>MJP</span>
        </div>
        

        <p className="footer-copy">
          © 2026 Movimiento Juvenil Peregrino.<br className="md:hidden" /> Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

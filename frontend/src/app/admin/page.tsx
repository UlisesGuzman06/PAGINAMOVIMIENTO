"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const sidebarItems = [
  { icon: "eco", label: "Oasis", href: "/admin" },
];

const initialFormState = {
  nombre: "",
  numero: 1,
  año: new Date().getFullYear().toString(),
  animadorx: "",
  sub_animadorx: "",
  asistentes: [] as string[],
  cita_referencia: "",
  cita_texto: "",
  fecha_inicio: "",
  foto_principal: "",
  fotos_galeria: "",
  lugar_nombre: "",
  slug: "",
  genero: "Femenino",
};

export default function AdminPage() {
  const [form, setForm] = useState<any>(initialFormState);
  const [asistenteInput, setAsistenteInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [oasisList, setOasisList] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterYear, setFilterYear] = useState<string>("Todos");

  useEffect(() => {
    fetchOasis();
  }, []);

  async function fetchOasis() {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      const response = await fetch(`${apiUrl}/oasis`);
      if (response.ok) {
        const data = await response.json();
        setOasisList(data);
      }
    } catch (error) {
      console.error("Error fetching oasis:", error);
    }
  }

  function resetForm() {
    setForm(initialFormState);
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Estás seguro de eliminar este Oasis?")) return;
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      const response = await fetch(`${apiUrl}/oasis/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchOasis();
      }
    } catch (error) {
      alert("Error al eliminar: " + error);
    }
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    
    const payload = {
      ...form,
      año: parseInt(form.año),
      numero: parseInt(form.numero) || null,
      asistentes: Array.isArray(form.asistentes) ? form.asistentes : (form.asistentes ? form.asistentes.split(",").map((a: any) => a.trim()) : []),
      fotos_galeria: typeof form.fotos_galeria === 'string' ? form.fotos_galeria.split(",").map((f: string) => f.trim()).filter((f: string) => f !== "") : form.fotos_galeria,
      fecha_inicio: form.fecha_inicio === "" ? null : form.fecha_inicio,
      slug: form.slug || form.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, "-") + "-" + form.año
    };

    const isUpdate = form.id;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    const url = isUpdate ? `${apiUrl}/oasis/${form.id}` : `${apiUrl}/oasis`;
    const method = isUpdate ? "PATCH" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        if (!isUpdate) {
          resetForm();
        }
        fetchOasis();
      } else {
        const err = await response.json();
        alert("❌ Error: " + (err.message || "Error desconocido"));
      }
    } catch (error) {
      alert("❌ Error de comunicación: " + error);
    } finally {
      setLoading(false);
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>, fieldName: string) {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      const res = await fetch(`${apiUrl}/oasis/upload`, {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        setForm((prev: any) => ({ ...prev, [fieldName]: data.url }));
      } else {
        alert("Error al subir imagen");
      }
    } catch (err) {
      alert("Error de comunicación al subir imagen: " + err);
    } finally {
      setLoading(false);
    }
  }

  function addAsistente() {
    if (asistenteInput.trim()) {
      setForm({
        ...form,
        asistentes: [...(form.asistentes || []), asistenteInput.trim()]
      });
      setAsistenteInput("");
    }
  }

  function removeAsistente(index: number) {
    setForm({
      ...form,
      asistentes: form.asistentes.filter((_: any, i: number) => i !== index)
    });
  }

  const isEditing = !!form.id;

  const uniqueYears = Array.from(new Set(oasisList.map(o => o.año.toString()))).sort((a, b) => Number(b) - Number(a));

  const filteredOasis = oasisList.filter(o => 
    (o.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || o.año.toString().includes(searchTerm)) &&
    (filterYear === "Todos" || o.año.toString() === filterYear)
  ).sort((a: any, b: any) => {
    // Sort descending by year, then descending by number (1 at bottom)
    if (a.año !== b.año) return b.año - a.año;
    return (parseInt(b.numero) || 0) - (parseInt(a.numero) || 0);
  });

  return (
    <div className="admin-layout" style={{ background: "#f8fafc", minHeight: "100vh" }}>
      {/* Sidebar - Persistent Stitch Style */}
      <aside className="sidebar" style={{ backgroundColor: "#1e293b", color: "#f8fafc", boxShadow: "4px 0 24px rgba(0,0,0,0.1)" }}>
        <div style={{ padding: "32px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <div style={{ width: 32, height: 32, background: "var(--primary)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span className="material-symbols-outlined" style={{ fontSize: "1.2rem", color: "white" }}>security</span>
            </div>
            <span style={{ fontSize: "1.25rem", fontWeight: 700, letterSpacing: "-0.02em" }}>Panel Admin</span>
          </div>
          <p style={{ fontSize: "0.75rem", opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.05em" }}>Movimiento Juvenil Peregrino</p>
        </div>

        <nav style={{ padding: "0 12px" }}>
          {sidebarItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`sidebar-link ${item.label === "Oasis" ? "active" : ""}`}
              style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: 12, 
                padding: "12px 16px", 
                borderRadius: 8,
                marginBottom: 4,
                textDecoration: "none",
                color: item.label === "Oasis" ? "white" : "#94a3b8",
                background: item.label === "Oasis" ? "rgba(255,255,255,0.05)" : "transparent",
                transition: "all 0.2s"
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "1.25rem" }}>{item.icon}</span>
              <span style={{ fontWeight: 500 }}>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div style={{ marginTop: "auto", padding: "24px 12px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <Link href="/" className="sidebar-link" style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", color: "#94a3b8", textDecoration: "none" }}>
            <span className="material-symbols-outlined">logout</span>
            <span>Cerrar Sesión</span>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="admin-content" style={{ padding: "0 48px 48px" }}>
        {/* Header bar */}
        <header style={{ 
          height: 80, 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between", 
          marginBottom: 32,
          borderBottom: "1px solid #e2e8f0",
          marginLeft: -48,
          marginRight: -48,
          padding: "0 48px",
          background: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(12px)",
          position: "sticky",
          top: 0,
          zIndex: 10
        }}>
          <div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#1e293b" }}>Gestión de Oasis</h2>
            <p style={{ fontSize: "0.875rem", color: "#64748b" }}>Control y administración de retiros espirituales</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
             <button className="btn-ghost" style={{ border: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: 8 }}>
                <span className="material-symbols-outlined" style={{ fontSize: "1.2rem" }}>notifications</span>
             </button>
             <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#1e293b" }}>Admin MJP</p>
                  <p style={{ fontSize: "0.75rem", color: "#64748b" }}>Super Administrador</p>
                </div>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--primary)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>A</div>
             </div>
          </div>
        </header>

        <div className="admin-grid-container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: 40, alignItems: "start" }}>
          {/* Form Card */}
          <div className="admin-card" style={{ background: "white", borderRadius: 16, padding: 32, boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)", border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
              <div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#1e293b" }}>
                  {isEditing ? "Editar Oasis" : "Nuevo Oasis"}
                </h3>
                <p style={{ fontSize: "0.875rem", color: "#64748b" }}>Rellena la información detallada del retiro</p>
              </div>
              {isEditing && (
                <button onClick={resetForm} className="btn-ghost" style={{ fontSize: "0.8rem", color: "var(--accent)" }}>
                  Descartar cambios
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 20 }}>
                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 600, color: "#475569" }}>Nombre del Oasis</label>
                  <input name="nombre" className="form-input" value={form.nombre || ""} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 600, color: "#475569" }}>Número</label>
                  <input name="numero" type="number" className="form-input" value={form.numero || ""} onChange={handleChange} required min="1" />
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 600, color: "#475569" }}>Género</label>
                  <select name="genero" className="form-input" value={form.genero || "Femenino"} onChange={handleChange}>
                    <option value="Femenino">Femenino</option>
                    <option value="Masculino">Masculino</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 600, color: "#475569" }}>Año</label>
                  <input name="año" type="number" className="form-input" value={form.año || ""} onChange={handleChange} required />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 600, color: "#475569" }}>Animador/a</label>
                  <input name="animadorx" className="form-input" value={form.animadorx || ""} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 600, color: "#475569" }}>Sub-Animador/a</label>
                  <input name="sub_animadorx" className="form-input" value={form.sub_animadorx || ""} onChange={handleChange} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 600, color: "#475569" }}>Asistentes</label>
                <div style={{ 
                  display: "flex", 
                  flexWrap: "wrap", 
                  gap: 8, 
                  padding: 12, 
                  border: "1px solid #e2e8f0", 
                  borderRadius: 8,
                  background: "white"
                }}>
                  {Array.isArray(form.asistentes) && form.asistentes.map((asistente: string, idx: number) => (
                    <div key={idx} style={{ 
                      background: "rgba(33, 150, 243, 0.1)", 
                      color: "var(--primary)", 
                      padding: "4px 12px", 
                      borderRadius: 100, 
                      fontSize: "0.875rem",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      border: "1px solid rgba(33, 150, 243, 0.2)"
                    }}>
                      {asistente}
                      <span 
                        className="material-symbols-outlined" 
                        style={{ fontSize: "1rem", cursor: "pointer", opacity: 0.6 }}
                        onClick={() => removeAsistente(idx)}
                      >close</span>
                    </div>
                  ))}
                  <div style={{ display: "flex", flex: 1, minWidth: 150 }}>
                    <input 
                      placeholder="Escribre y presiona +" 
                      style={{ border: "none", outline: "none", width: "100%", fontSize: "0.875rem" }}
                      value={asistenteInput}
                      onChange={(e) => setAsistenteInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addAsistente();
                        }
                      }}
                    />
                    <button 
                      type="button" 
                      onClick={addAsistente}
                      style={{ background: "none", border: "none", color: "var(--primary)", cursor: "pointer" }}
                    >
                      <span className="material-symbols-outlined">add_circle</span>
                    </button>
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 20 }}>
                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 600, color: "#475569" }}>Ref. Bíblica (ej: Lc 1,1)</label>
                  <input name="cita_referencia" className="form-input" value={form.cita_referencia || ""} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 600, color: "#475569" }}>Cita (Texto completo)</label>
                  <textarea name="cita_texto" className="form-textarea" value={form.cita_texto || ""} onChange={handleChange} style={{ height: 160 }} />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 600, color: "#475569" }}>Lugar (Nombre)</label>
                  <input name="lugar_nombre" className="form-input" value={form.lugar_nombre || ""} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 600, color: "#475569" }}>Fecha Inicio</label>
                  <input name="fecha_inicio" type="date" className="form-input" value={form.fecha_inicio || ""} onChange={handleChange} />
                </div>
              </div>



              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 600, color: "#475569" }}>Foto Principal</label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  {form.foto_principal && (
                    <div style={{ width: 64, height: 64, borderRadius: 8, overflow: 'hidden', background: '#f1f5f9', flexShrink: 0 }}>
                      <img src={form.foto_principal} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'foto_principal')} className="form-input" style={{ flex: 1, padding: "8px" }} />
                </div>
                {form.foto_principal && <input name="foto_principal" className="form-input" style={{marginTop: 8}} value={form.foto_principal} onChange={handleChange} placeholder="O ingresa URL directamente" />}
              </div>

              <div className="form-group">
                <button type="submit" className="btn-primary" disabled={loading} style={{ width: "100%", padding: "16px", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  <span className="material-symbols-outlined">{isEditing ? "edit" : "save"}</span>
                  {loading ? "⌛ Procesando..." : (isEditing ? "Actualizar Oasis" : "Crear Oasis")}
                </button>
              </div>
            </form>
          </div>

          {/* List Card */}
          <div style={{ background: "white", borderRadius: 16, padding: 32, boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)", border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#1e293b" }}>Historial Oasis</h3>
              <div style={{ display: "flex", gap: 12 }}>
                 <select 
                   className="form-input" 
                   value={filterYear} 
                   onChange={(e) => setFilterYear(e.target.value)}
                   style={{ fontSize: "0.875rem", width: "auto" }}
                 >
                   <option value="Todos">Todos los años</option>
                   {uniqueYears.map(y => <option key={y} value={y}>{y}</option>)}
                 </select>
                 <div style={{ position: "relative" }}>
                   <span className="material-symbols-outlined" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: "1.2rem", color: "#94a3b8" }}>search</span>
                   <input 
                     placeholder="Buscar..." 
                     className="form-input"
                     style={{ paddingLeft: 40, width: 200, fontSize: "0.875rem" }}
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                   />
                 </div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {filteredOasis.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 0", color: "#94a3b8" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "3rem", marginBottom: 12, opacity: 0.3 }}>inbox</span>
                  <p>No se encontraron resultados</p>
                </div>
              ) : (
                filteredOasis.map((oasis) => (
                  <div key={oasis.id} style={{ 
                    padding: 16, 
                    borderRadius: 12, 
                    border: "1px solid #f1f5f9", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "space-between",
                    transition: "all 0.2s",
                    cursor: "pointer",
                    "&:hover": { borderColor: "var(--primary)", background: "#f8fafc" }
                  } as any}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <div style={{ width: 48, height: 48, borderRadius: 8, background: "#f1f5f9", overflow: "hidden" }}>
                        {oasis.foto_principal ? (
                          <img src={oasis.foto_principal} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : (
                          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#cbd5e1" }}>
                            <span className="material-symbols-outlined">image</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 style={{ fontSize: "1rem", fontWeight: 600, color: "#1e293b", marginBottom: 2 }}>{oasis.nombre}</h4>
                        <div style={{ display: "flex", gap: 8, fontSize: "0.75rem", color: "#64748b" }}>
                          {oasis.numero && <span style={{ background: "#f1f5f9", padding: "2px 8px", borderRadius: 4, fontWeight: 700 }}>#{oasis.numero}</span>}
                          {oasis.genero && <span style={{ background: "#f1f5f9", padding: "2px 8px", borderRadius: 4 }}>{oasis.genero}</span>}
                          <span style={{ background: "#f1f5f9", padding: "2px 8px", borderRadius: 4 }}>{oasis.año}</span>
                          <span style={{ color: "#94a3b8" }}>•</span>
                          <span>{oasis.animadorx || "S/N"}</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button 
                        onClick={() => {
                          setForm({
                            ...initialFormState,
                            ...oasis,
                            id: oasis.id,
                            año: oasis.año.toString(),
                            numero: oasis.numero || "",
                            fecha_inicio: oasis.fecha_inicio || "",
                            asistentes: Array.isArray(oasis.asistentes) ? oasis.asistentes : (oasis.asistentes ? oasis.asistentes.split(",").map((a: any) => a.trim()) : []),
                            fotos_galeria: Array.isArray(oasis.fotos_galeria) ? oasis.fotos_galeria.join(", ") : (oasis.fotos_galeria || ""),
                            cita_referencia: oasis.cita_referencia || "",
                            cita_texto: oasis.cita_texto || "",
                            genero: oasis.genero || "Femenino",
                          });
                        }}
                        className="btn-ghost" 
                        style={{ width: 36, height: 36, padding: 0, borderRadius: 8, color: "#64748b" }}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: "1.2rem" }}>edit</span>
                      </button>
                      <button 
                        onClick={() => handleDelete(oasis.id)}
                        className="btn-ghost" 
                        style={{ width: 36, height: 36, padding: 0, borderRadius: 8, color: "var(--accent)" }}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: "1.2rem" }}>delete</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

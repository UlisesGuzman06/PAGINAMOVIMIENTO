"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getApiUrl } from "@/lib/apiConfig";

// ── Types ──────────────────────────────────────────────────────────────────
type Section = "oasis" | "musica" | "recursos";

// ── Sidebar config ─────────────────────────────────────────────────────────
const sidebarItems: { icon: string; label: string; section: Section }[] = [
  { icon: "eco",       label: "Oasis",    section: "oasis"    },
  { icon: "music_note",label: "Música",   section: "musica"   },
  { icon: "menu_book", label: "Recursos", section: "recursos" },
];

// ══════════════════════════════════════════════════════════════════════════
// OASIS
// ══════════════════════════════════════════════════════════════════════════
const oasisInit = {
  nombre: "", numero: 1, año: new Date().getFullYear().toString(),
  animadorx: "", sub_animadorx: "", asistentes: [] as string[],
  cita_referencia: "", cita_texto: "", fecha_inicio: "",
  foto_principal: "", fotos_galeria: "", lugar_nombre: "", slug: "", genero: "Femenino",
};

function OasisSection() {
  const [form, setForm]           = useState<any>(oasisInit);
  const [asistenteInput, setAI]   = useState("");
  const [loading, setLoading]     = useState(false);
  const [list, setList]           = useState<any[]>([]);
  const [search, setSearch]       = useState("");
  const [filterYear, setFY]       = useState("Todos");

  useEffect(() => { fetchAll(); }, []);

  async function fetchAll() {
    const r = await fetch(`${getApiUrl()}/oasis`);
    if (r.ok) setList(await r.json());
  }
  function reset() { setForm(oasisInit); }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar este Oasis?")) return;
    await fetch(`${getApiUrl()}/oasis/${id}`, { method: "DELETE" });
    fetchAll();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true);
    const payload = {
      ...form, año: parseInt(form.año), numero: parseInt(form.numero) || null,
      asistentes: Array.isArray(form.asistentes) ? form.asistentes : form.asistentes.split(",").map((a: string) => a.trim()),
      fotos_galeria: typeof form.fotos_galeria === "string" ? form.fotos_galeria.split(",").map((f: string) => f.trim()).filter(Boolean) : form.fotos_galeria,
      fecha_inicio: form.fecha_inicio || null,
      slug: form.slug || form.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, "-") + "-" + form.año,
    };
    const url    = form.id ? `${getApiUrl()}/oasis/${form.id}` : `${getApiUrl()}/oasis`;
    const method = form.id ? "PATCH" : "POST";
    const r = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (r.ok) { if (!form.id) reset(); fetchAll(); }
    else alert("Error: " + JSON.stringify(await r.json()));
    setLoading(false);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return;
    const fd = new FormData(); fd.append("file", file);
    setLoading(true);
    const r = await fetch(`${getApiUrl()}/oasis/upload`, { method: "POST", body: fd });
    if (r.ok) { const d = await r.json(); setForm((p: any) => ({ ...p, foto_principal: d.url })); }
    setLoading(false);
  }

  const uniqueYears = Array.from(new Set(list.map(o => o.año.toString()))).sort((a, b) => +b - +a);
  const filtered = list
    .filter(o => (o.nombre.toLowerCase().includes(search.toLowerCase()) || o.año.toString().includes(search)) && (filterYear === "Todos" || o.año.toString() === filterYear))
    .sort((a, b) => b.año - a.año || (+b.numero || 0) - (+a.numero || 0));

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: 32, alignItems: "start" }}>
      {/* Formulario */}
      <AdminCard title={form.id ? "Editar Oasis" : "Nuevo Oasis"} subtitle="Rellena la información del retiro"
        extra={form.id && <button onClick={reset} style={btnGhostStyle}>Descartar</button>}>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 14 }}>
            <FG label="Nombre"><input name="nombre" className="form-input" value={form.nombre || ""} onChange={e => setForm({ ...form, nombre: e.target.value })} required /></FG>
            <FG label="N°"><input name="numero" type="number" className="form-input" value={form.numero || ""} onChange={e => setForm({ ...form, numero: e.target.value })} /></FG>
            <FG label="Género">
              <select name="genero" className="form-input" value={form.genero || "Femenino"} onChange={e => setForm({ ...form, genero: e.target.value })}>
                <option>Femenino</option><option>Masculino</option><option>Mixto</option>
              </select>
            </FG>
            <FG label="Año"><input name="año" type="number" className="form-input" value={form.año || ""} onChange={e => setForm({ ...form, año: e.target.value })} required /></FG>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <FG label="Animador/a"><input className="form-input" value={form.animadorx || ""} onChange={e => setForm({ ...form, animadorx: e.target.value })} /></FG>
            <FG label="Sub-Animador/a"><input className="form-input" value={form.sub_animadorx || ""} onChange={e => setForm({ ...form, sub_animadorx: e.target.value })} /></FG>
          </div>
          {/* Asistentes chip input */}
          <FG label="Asistentes">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, padding: 10, border: "1px solid #e2e8f0", borderRadius: 8 }}>
              {(form.asistentes || []).map((a: string, i: number) => (
                <span key={i} style={{ background: "rgba(19,109,236,0.1)", color: "var(--primary)", padding: "2px 10px", borderRadius: 100, fontSize: "0.8rem", display: "flex", alignItems: "center", gap: 4 }}>
                  {a}<span className="material-symbols-outlined" style={{ fontSize: "0.9rem", cursor: "pointer" }} onClick={() => setForm({ ...form, asistentes: form.asistentes.filter((_: any, j: number) => j !== i) })}>close</span>
                </span>
              ))}
              <div style={{ display: "flex", flex: 1, minWidth: 120 }}>
                <input placeholder="Agregar y Enter" style={{ border: "none", outline: "none", flex: 1, fontSize: "0.85rem" }} value={asistenteInput} onChange={e => setAI(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); if (asistenteInput.trim()) { setForm({ ...form, asistentes: [...(form.asistentes || []), asistenteInput.trim()] }); setAI(""); } }}} />
                <button type="button" onClick={() => { if (asistenteInput.trim()) { setForm({ ...form, asistentes: [...(form.asistentes || []), asistenteInput.trim()] }); setAI(""); } }} style={{ background: "none", border: "none", color: "var(--primary)", cursor: "pointer" }}>
                  <span className="material-symbols-outlined">add_circle</span>
                </button>
              </div>
            </div>
          </FG>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 14 }}>
            <FG label="Ref. Bíblica"><input className="form-input" value={form.cita_referencia || ""} onChange={e => setForm({ ...form, cita_referencia: e.target.value })} /></FG>
            <FG label="Cita (texto)"><textarea className="form-textarea" value={form.cita_texto || ""} onChange={e => setForm({ ...form, cita_texto: e.target.value })} style={{ height: 100 }} /></FG>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <FG label="Lugar"><input className="form-input" value={form.lugar_nombre || ""} onChange={e => setForm({ ...form, lugar_nombre: e.target.value })} /></FG>
            <FG label="Fecha inicio"><input type="date" className="form-input" value={form.fecha_inicio || ""} onChange={e => setForm({ ...form, fecha_inicio: e.target.value })} /></FG>
          </div>
          <FG label="Foto Principal">
            {form.foto_principal && <img src={form.foto_principal} style={{ width: 64, height: 64, borderRadius: 8, objectFit: "cover", marginBottom: 8 }} />}
            <input type="file" accept="image/*" className="form-input" onChange={handleImageUpload} style={{ padding: 8 }} />
          </FG>
          <SubmitBtn loading={loading} isEditing={!!form.id} labels={["Crear Oasis", "Actualizar Oasis"]} />
        </form>
      </AdminCard>

      {/* Lista */}
      <AdminCard title="Historial Oasis" subtitle={`${filtered.length} registros`}
        extra={<div style={{ display: "flex", gap: 8 }}>
          <select className="form-input" value={filterYear} onChange={e => setFY(e.target.value)} style={{ width: "auto", fontSize: "0.8rem" }}>
            <option value="Todos">Todos</option>{uniqueYears.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
          <SearchInput value={search} onChange={setSearch} />
        </div>}>
        <ItemList items={filtered} onEdit={o => setForm({ ...oasisInit, ...o, año: o.año.toString(), fecha_inicio: o.fecha_inicio || "", asistentes: Array.isArray(o.asistentes) ? o.asistentes : [], fotos_galeria: Array.isArray(o.fotos_galeria) ? o.fotos_galeria.join(", ") : "" })}
          onDelete={handleDelete}
          renderLabel={o => (
            <div>
              <div style={{ fontWeight: 600, color: "#1e293b" }}>{o.nombre}</div>
              <div style={{ display: "flex", gap: 6, fontSize: "0.72rem", color: "#64748b", marginTop: 2, flexWrap: "wrap" }}>
                {o.numero && <Tag>#{o.numero}</Tag>}<Tag>{o.genero}</Tag><Tag>{o.año}</Tag><span>·</span><span>{o.animadorx || "S/N"}</span>
              </div>
            </div>
          )}
          renderThumb={o => o.foto_principal ? <img src={o.foto_principal} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : null}
        />
      </AdminCard>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// MÚSICA
// ══════════════════════════════════════════════════════════════════════════
const musicaInit = { titulo: "", artista: "", categoria: "Alabanza", descripcion: "", letra: "", url_audio: "", url_descarga: "", duracion: "", año: new Date().getFullYear().toString(), activa: true };
const CATEGORIAS_MUSICA = ["Alabanza", "Canto del Movimiento", "Cantos de Oasis", "Cantos al Espíritu", "Oraciones Cantadas", "General"];

function MusicaSection() {
  const [form, setForm]       = useState<any>(musicaInit);
  const [loading, setLoading] = useState(false);
  const [list, setList]       = useState<any[]>([]);
  const [search, setSearch]   = useState("");

  useEffect(() => { fetchAll(); }, []);

  async function fetchAll() {
    const r = await fetch(`${getApiUrl()}/musica`);
    if (r.ok) setList(await r.json());
  }
  function reset() { setForm(musicaInit); }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar esta canción?")) return;
    await fetch(`${getApiUrl()}/musica/${id}`, { method: "DELETE" });
    fetchAll();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true);
    const payload = { ...form, año: form.año ? parseInt(form.año) : null };
    const url    = form.id ? `${getApiUrl()}/musica/${form.id}` : `${getApiUrl()}/musica`;
    const method = form.id ? "PATCH" : "POST";
    const r = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (r.ok) { if (!form.id) reset(); fetchAll(); }
    else alert("Error: " + JSON.stringify(await r.json()));
    setLoading(false);
  }

  const sc = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm({ ...form, [field]: e.target.value });
  const filtered = list.filter(c => c.titulo.toLowerCase().includes(search.toLowerCase()) || (c.artista ?? "").toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: 32, alignItems: "start" }}>
      <AdminCard title={form.id ? "Editar Canción" : "Nueva Canción"} subtitle="Información de la canción peregrina"
        extra={form.id && <button onClick={reset} style={btnGhostStyle}>Descartar</button>}>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14 }}>
            <FG label="Título *"><input className="form-input" value={form.titulo || ""} onChange={sc("titulo")} required /></FG>
            <FG label="Año"><input type="number" className="form-input" value={form.año || ""} onChange={sc("año")} /></FG>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <FG label="Artista / Intérprete"><input className="form-input" value={form.artista || ""} onChange={sc("artista")} /></FG>
            <FG label="Duración (ej: 3:45)"><input className="form-input" value={form.duracion || ""} onChange={sc("duracion")} /></FG>
          </div>
          <FG label="Categoría">
            <select className="form-input" value={form.categoria || "Alabanza"} onChange={sc("categoria")}>
              {CATEGORIAS_MUSICA.map(c => <option key={c}>{c}</option>)}
            </select>
          </FG>
          <FG label="Descripción"><textarea className="form-textarea" value={form.descripcion || ""} onChange={sc("descripcion")} style={{ height: 80 }} /></FG>
          <FG label="Letra"><textarea className="form-textarea" value={form.letra || ""} onChange={sc("letra")} style={{ height: 140 }} placeholder="Letra de la canción..."/></FG>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <FG label="URL Audio (mp3)"><input className="form-input" value={form.url_audio || ""} onChange={sc("url_audio")} placeholder="https://..." /></FG>
            <FG label="URL Descarga"><input className="form-input" value={form.url_descarga || ""} onChange={sc("url_descarga")} placeholder="https://..." /></FG>
          </div>
          <SubmitBtn loading={loading} isEditing={!!form.id} labels={["Agregar Canción", "Actualizar Canción"]} />
        </form>
      </AdminCard>

      <AdminCard title="Canciones" subtitle={`${filtered.length} canciones`} extra={<SearchInput value={search} onChange={setSearch} />}>
        <ItemList items={filtered} onEdit={c => setForm({ ...musicaInit, ...c, año: c.año?.toString() || "" })}
          onDelete={handleDelete}
          renderLabel={c => (
            <div>
              <div style={{ fontWeight: 600, color: "#1e293b" }}>{c.titulo}</div>
              <div style={{ display: "flex", gap: 6, fontSize: "0.72rem", color: "#64748b", marginTop: 2 }}>
                <Tag color="#3b82f6">{c.categoria}</Tag>{c.artista && <span>{c.artista}</span>}{c.año && <><span>·</span><span>{c.año}</span></>}
              </div>
            </div>
          )}
          renderThumb={() => <span className="material-symbols-outlined" style={{ color: "#3b82f6", fontSize: "1.5rem" }}>music_note</span>}
        />
      </AdminCard>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// RECURSOS
// ══════════════════════════════════════════════════════════════════════════
const recursosInit = { titulo: "", descripcion: "", tipo: "Enlace", categoria: "Formación", url_externo: "", url_descarga: "", autor: "", año: "", paginas: "", activo: true, destacado: false };
const TIPOS_RECURSO    = ["Documento", "Guía", "Video", "Audio", "Enlace", "Libro"];
const CATS_RECURSO     = ["Biblia y Oración", "Formación", "Documentos Pontificios", "Materiales Oasis", "General"];
const TIPO_ICONS: Record<string, string> = { Documento: "description", Guía: "auto_stories", Video: "play_circle", Audio: "headphones", Enlace: "link", Libro: "menu_book", General: "folder" };
const TIPO_COLORS: Record<string, string> = { Documento: "#3b82f6", Guía: "#8b5cf6", Video: "#ef4444", Audio: "#f59e0b", Enlace: "#22c55e", Libro: "#f97316", General: "#64748b" };

function RecursosSection() {
  const [form, setForm]       = useState<any>(recursosInit);
  const [loading, setLoading] = useState(false);
  const [list, setList]       = useState<any[]>([]);
  const [search, setSearch]   = useState("");

  useEffect(() => { fetchAll(); }, []);

  async function fetchAll() {
    const r = await fetch(`${getApiUrl()}/recursos`);
    if (r.ok) setList(await r.json());
  }
  function reset() { setForm(recursosInit); }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar este recurso?")) return;
    await fetch(`${getApiUrl()}/recursos/${id}`, { method: "DELETE" });
    fetchAll();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true);
    const payload = { ...form, año: form.año ? parseInt(form.año) : null, paginas: form.paginas ? parseInt(form.paginas) : null };
    const url    = form.id ? `${getApiUrl()}/recursos/${form.id}` : `${getApiUrl()}/recursos`;
    const method = form.id ? "PATCH" : "POST";
    const r = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (r.ok) { if (!form.id) reset(); fetchAll(); }
    else alert("Error: " + JSON.stringify(await r.json()));
    setLoading(false);
  }

  const sc = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm({ ...form, [field]: e.target.value });
  const filtered = list.filter(r => r.titulo.toLowerCase().includes(search.toLowerCase()) || (r.descripcion ?? "").toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: 32, alignItems: "start" }}>
      <AdminCard title={form.id ? "Editar Recurso" : "Nuevo Recurso"} subtitle="Materiales y links para la comunidad"
        extra={form.id && <button onClick={reset} style={btnGhostStyle}>Descartar</button>}>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <FG label="Título *"><input className="form-input" value={form.titulo || ""} onChange={sc("titulo")} required /></FG>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <FG label="Tipo">
              <select className="form-input" value={form.tipo || "Enlace"} onChange={sc("tipo")}>
                {TIPOS_RECURSO.map(t => <option key={t}>{t}</option>)}
              </select>
            </FG>
            <FG label="Categoría">
              <select className="form-input" value={form.categoria || "Formación"} onChange={sc("categoria")}>
                {CATS_RECURSO.map(c => <option key={c}>{c}</option>)}
              </select>
            </FG>
          </div>
          <FG label="Descripción"><textarea className="form-textarea" value={form.descripcion || ""} onChange={sc("descripcion")} style={{ height: 90 }} /></FG>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <FG label="URL Externo"><input className="form-input" value={form.url_externo || ""} onChange={sc("url_externo")} placeholder="https://..." /></FG>
            <FG label="URL Descarga"><input className="form-input" value={form.url_descarga || ""} onChange={sc("url_descarga")} placeholder="https://..." /></FG>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 14 }}>
            <FG label="Autor"><input className="form-input" value={form.autor || ""} onChange={sc("autor")} /></FG>
            <FG label="Año"><input type="number" className="form-input" value={form.año || ""} onChange={sc("año")} /></FG>
            <FG label="Págs."><input type="number" className="form-input" value={form.paginas || ""} onChange={sc("paginas")} /></FG>
          </div>
          {/* Destacado toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: "0.875rem", fontWeight: 600, color: "#475569" }}>
              <input type="checkbox" checked={!!form.destacado} onChange={e => setForm({ ...form, destacado: e.target.checked })} />
              Marcar como destacado (aparece en la sección principal)
            </label>
          </div>
          <SubmitBtn loading={loading} isEditing={!!form.id} labels={["Agregar Recurso", "Actualizar Recurso"]} />
        </form>
      </AdminCard>

      <AdminCard title="Recursos" subtitle={`${filtered.length} materiales`} extra={<SearchInput value={search} onChange={setSearch} />}>
        <ItemList items={filtered} onEdit={r => setForm({ ...recursosInit, ...r, año: r.año?.toString() || "", paginas: r.paginas?.toString() || "" })}
          onDelete={handleDelete}
          renderLabel={r => (
            <div>
              <div style={{ fontWeight: 600, color: "#1e293b" }}>{r.titulo}{r.destacado && <span style={{ marginLeft: 6, fontSize: "0.7rem", color: "#f59e0b", fontWeight: 700 }}>★</span>}</div>
              <div style={{ display: "flex", gap: 6, fontSize: "0.72rem", color: "#64748b", marginTop: 2 }}>
                <Tag color={TIPO_COLORS[r.tipo]}>{r.tipo}</Tag><span>{r.categoria}</span>{r.autor && <><span>·</span><span>{r.autor}</span></>}
              </div>
            </div>
          )}
          renderThumb={r => <span className="material-symbols-outlined" style={{ color: TIPO_COLORS[r.tipo] ?? "#64748b", fontSize: "1.4rem" }}>{TIPO_ICONS[r.tipo] ?? "folder"}</span>}
        />
      </AdminCard>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// UI HELPERS
// ══════════════════════════════════════════════════════════════════════════
function AdminCard({ title, subtitle, extra, children }: { title: string; subtitle?: string; extra?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div style={{ background: "white", borderRadius: 16, padding: 28, boxShadow: "0 4px 6px -1px rgba(0,0,0,0.08), 0 2px 4px -1px rgba(0,0,0,0.04)", border: "1px solid #e2e8f0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div><h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#1e293b", marginBottom: 2 }}>{title}</h3>
          {subtitle && <p style={{ fontSize: "0.8rem", color: "#64748b" }}>{subtitle}</p>}
        </div>
        {extra}
      </div>
      {children}
    </div>
  );
}

function FG({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="form-group"><label className="form-label" style={{ fontWeight: 600, color: "#475569" }}>{label}</label>{children}</div>;
}

function SubmitBtn({ loading, isEditing, labels }: { loading: boolean; isEditing: boolean; labels: [string, string] }) {
  return (
    <button type="submit" className="btn-primary" disabled={loading} style={{ width: "100%", padding: 14, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
      <span className="material-symbols-outlined">{isEditing ? "save" : "add_circle"}</span>
      {loading ? "⌛ Procesando..." : (isEditing ? labels[1] : labels[0])}
    </button>
  );
}

function SearchInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ position: "relative" }}>
      <span className="material-symbols-outlined" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: "1.1rem", color: "#94a3b8" }}>search</span>
      <input placeholder="Buscar..." className="form-input" style={{ paddingLeft: 34, width: 180, fontSize: "0.8rem" }} value={value} onChange={e => onChange(e.target.value)} />
    </div>
  );
}

function Tag({ children, color }: { children: React.ReactNode; color?: string }) {
  return <span style={{ background: color ? `${color}18` : "#f1f5f9", color: color ?? "#475569", padding: "2px 8px", borderRadius: 6, fontWeight: 700 }}>{children}</span>;
}

function ItemList({ items, onEdit, onDelete, renderLabel, renderThumb }: {
  items: any[]; onEdit: (item: any) => void; onDelete: (id: string) => void;
  renderLabel: (item: any) => React.ReactNode; renderThumb: (item: any) => React.ReactNode;
}) {
  if (items.length === 0) return (
    <div style={{ textAlign: "center", padding: "32px 0", color: "#94a3b8" }}>
      <span className="material-symbols-outlined" style={{ fontSize: "2.5rem", opacity: 0.3, display: "block", marginBottom: 8 }}>inbox</span>
      <p style={{ fontSize: "0.85rem" }}>Sin resultados</p>
    </div>
  );
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, maxHeight: 520, overflowY: "auto", paddingRight: 4 }}>
      {items.map(item => (
        <div key={item.id} style={{ padding: "12px 14px", borderRadius: 10, border: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between", transition: "border-color 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = "#cbd5e1")}
          onMouseLeave={e => (e.currentTarget.style.borderColor = "#f1f5f9")}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 8, background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0 }}>
              {renderThumb(item)}
            </div>
            {renderLabel(item)}
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            <button onClick={() => onEdit(item)} style={actionBtnStyle("#64748b")}><span className="material-symbols-outlined" style={{ fontSize: "1.1rem" }}>edit</span></button>
            <button onClick={() => onDelete(item.id)} style={actionBtnStyle("#ef4444")}><span className="material-symbols-outlined" style={{ fontSize: "1.1rem" }}>delete</span></button>
          </div>
        </div>
      ))}
    </div>
  );
}

const actionBtnStyle = (color: string): React.CSSProperties => ({
  width: 32, height: 32, borderRadius: 8, border: "1px solid #f1f5f9", background: "none",
  color, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0,
});
const btnGhostStyle: React.CSSProperties = { background: "none", border: "1px solid #e2e8f0", borderRadius: 8, padding: "6px 12px", fontSize: "0.8rem", cursor: "pointer", color: "#64748b" };

// ══════════════════════════════════════════════════════════════════════════
// MAIN PAGE (layout + sidebar)
// ══════════════════════════════════════════════════════════════════════════
const SECTION_LABELS: Record<Section, { title: string; subtitle: string }> = {
  oasis:    { title: "Gestión de Oasis",    subtitle: "Control y administración de retiros espirituales" },
  musica:   { title: "Gestión de Música",   subtitle: "Cancionero peregrino — letras y archivos de audio" },
  recursos: { title: "Gestión de Recursos", subtitle: "Materiales de formación y enlaces para la comunidad" },
};

export default function AdminPage() {
  const [section, setSection] = useState<Section>("oasis");

  return (
    <div style={{ display: "flex", background: "#f8fafc", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside style={{ width: 240, background: "#1e293b", color: "#f8fafc", boxShadow: "4px 0 24px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ padding: "28px 20px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <div style={{ width: 30, height: 30, background: "var(--primary)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span className="material-symbols-outlined" style={{ fontSize: "1.1rem", color: "white" }}>security</span>
            </div>
            <span style={{ fontSize: "1.1rem", fontWeight: 700 }}>Panel Admin</span>
          </div>
          <p style={{ fontSize: "0.7rem", opacity: 0.45, textTransform: "uppercase", letterSpacing: "0.06em" }}>MJP Centro 1</p>
        </div>

        <nav style={{ padding: "0 10px", flex: 1 }}>
          {sidebarItems.map(item => {
            const active = section === item.section;
            return (
              <button key={item.section} onClick={() => setSection(item.section)}
                style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", borderRadius: 8, marginBottom: 2, border: "none", cursor: "pointer", textAlign: "left",
                  background: active ? "rgba(255,255,255,0.08)" : "transparent",
                  color: active ? "white" : "#94a3b8", fontWeight: active ? 700 : 400, fontSize: "0.9rem", transition: "all 0.18s" }}>
                <span className="material-symbols-outlined" style={{ fontSize: "1.2rem" }}>{item.icon}</span>
                {item.label}
              </button>
            );
          })}
        </nav>

        <div style={{ padding: "16px 10px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", color: "#94a3b8", textDecoration: "none", borderRadius: 8, fontSize: "0.875rem" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "1.2rem" }}>home</span>
            Volver al sitio
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Top bar */}
        <header style={{ height: 68, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px", borderBottom: "1px solid #e2e8f0", background: "rgba(255,255,255,0.85)", backdropFilter: "blur(10px)", position: "sticky", top: 0, zIndex: 10 }}>
          <div>
            <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#1e293b" }}>{SECTION_LABELS[section].title}</h2>
            <p style={{ fontSize: "0.8rem", color: "#64748b" }}>{SECTION_LABELS[section].subtitle}</p>
          </div>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--primary)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.9rem" }}>A</div>
        </header>

        {/* Content */}
        <div style={{ padding: "36px 40px 56px" }}>
          {section === "oasis"    && <OasisSection    />}
          {section === "musica"   && <MusicaSection   />}
          {section === "recursos" && <RecursosSection />}
        </div>
      </div>
    </div>
  );
}

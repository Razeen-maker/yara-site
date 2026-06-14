cat > /mnt/user-data/outputs/App.jsx << 'EOF'
import { useState, useEffect } from "react";

const WHATSAPP = "971500000000";
const KEY = "yara:products";
const DEFAULTS = [
  { id:"p1", name:"Silk Charmeuse", origin:"Como, Italy", price:68, color:"#D9C9A0" },
  { id:"p2", name:"Wool Boucle", origin:"Yorkshire, UK", price:54, color:"#A89A88" },
  { id:"p3", name:"Linen Voile", origin:"Normandy, France", price:42, color:"#CFC8B4" },
  { id:"p4", name:"Velvet Cotton", origin:"Lyon, France", price:76, color:"#5A3A40" },
  { id:"p5", name:"Cashmere Twill", origin:"Kashmir, India", price:92, color:"#9A8A70" },
  { id:"p6", name:"Jacquard Brocade", origin:"Suzhou, China", price:88, color:"#A8841E" },
];

function wa(p) {
  const msg = p
    ? "Hi YARA, I am interested in " + p.name + " (" + p.origin + ") — can you share more details?"
    : "Hi YARA, I would like to know more about your fabrics.";
  return "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(msg);
}

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState(DEFAULTS);
  const [menuOpen, setMenuOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [draft, setDraft] = useState(null);
  const [modal, setModal] = useState(null);

  useEffect(() => {
    setIsAdmin(new URLSearchParams(window.location.search).get("admin") === "1");
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setProducts(JSON.parse(raw));
    } catch(e) {}
  }, []);

  function saveProducts(next) {
    setProducts(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch(e) {}
  }

  function scroll(id) {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  function addNew() {
    const p = { id: "p" + Date.now(), name: "New Fabric", origin: "Origin", price: 0, color: "#C9A227" };
    const next = [...products, p];
    setProducts(next);
    setEditId(p.id);
    setDraft(Object.assign({}, p));
  }

  function startEdit(p) {
    setEditId(p.id);
    setDraft(Object.assign({}, p));
  }

  function cancelEdit() {
    setEditId(null);
    setDraft(null);
  }

  function saveEdit() {
    const next = products.map(function(p) { return p.id === editId ? draft : p; });
    saveProducts(next);
    setEditId(null);
    setDraft(null);
  }

  function removeProduct(id) {
    saveProducts(products.filter(function(p) { return p.id !== id; }));
  }

  const s = {
    page: { fontFamily: "Georgia, serif", background: "#F4EFE2", color: "#1B2E27", minHeight: "100vh" },
    adminBar: { background: "#C9A227", color: "#0E2A21", textAlign: "center", padding: "8px", fontSize: "12px", letterSpacing: "2px" },
    header: { position: "sticky", top: 0, zIndex: 50, background: "linear-gradient(135deg,#0E2A21,#1B4A3A)", borderBottom: "1px solid rgba(212,175,55,0.2)", padding: "0 24px" },
    headerInner: { maxWidth: "1200px", margin: "0 auto", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" },
    logo: { fontSize: "24px", letterSpacing: "6px", color: "#E8D9A8", background: "none", border: "none", cursor: "pointer" },
    navLinks: { display: "flex", gap: "36px" },
    navLink: { fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", color: "#D9CFC0", background: "none", border: "none", cursor: "pointer" },
    inquireBtn: { background: "linear-gradient(135deg,#F4D88C,#C9A227)", color: "#0E2A21", padding: "8px 16px", borderRadius: "20px", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", fontWeight: "600", textDecoration: "none" },
    hero: { background: "linear-gradient(135deg,#0E2A21,#1B4A3A 60%,#0E2A21)", padding: "80px 24px", minHeight: "70vh", display: "flex", alignItems: "center" },
    heroInner: { maxWidth: "700px", margin: "0 auto" },
    eyebrow: { color: "#D4AF37", fontSize: "11px", letterSpacing: "5px", textTransform: "uppercase", marginBottom: "24px" },
    h1: { fontSize: "clamp(40px,8vw,80px)", lineHeight: 1.1, color: "#F4EFE2", margin: "0 0 24px" },
    goldText: { background: "linear-gradient(135deg,#F4D88C,#D4AF37)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
    heroP: { color: "#A8C0B4", fontSize: "18px", lineHeight: 1.7, marginBottom: "40px" },
    goldBtn: { background: "linear-gradient(135deg,#F4D88C,#D4AF37)", color: "#0E2A21", padding: "16px 36px", fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", fontWeight: "700", border: "none", cursor: "pointer", display: "inline-block", textDecoration: "none" },
    about: { padding: "100px 24px", background: "linear-gradient(180deg,#F4EFE2,#ECE5D2)", textAlign: "center" },
    aboutInner: { maxWidth: "700px", margin: "0 auto" },
    h2: { fontSize: "clamp(28px,4vw,48px)", lineHeight: 1.3, color: "#0E2A21", margin: "0 0 32px" },
    divider: { width: "120px", height: "2px", background: "linear-gradient(90deg,transparent,#D4AF37,transparent)", margin: "0 auto 32px" },
    aboutP: { color: "#5A6E64", lineHeight: 1.8 },
    shop: { padding: "100px 24px", background: "#0E2A21" },
    shopInner: { maxWidth: "1200px", margin: "0 auto" },
    shopHead: { display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "48px", flexWrap: "wrap", gap: "16px" },
    shopH2: { fontSize: "clamp(28px,4vw,40px)", color: "#F4EFE2", margin: 0 },
    addBtn: { background: "linear-gradient(135deg,#F4D88C,#D4AF37)", color: "#0E2A21", padding: "10px 20px", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", fontWeight: "700", border: "none", cursor: "pointer", borderRadius: "4px" },
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "24px" },
    card: { background: "linear-gradient(160deg,#1B4A3A,#163C2F)", border: "1px solid rgba(212,175,55,0.15)", borderRadius: "6px", overflow: "hidden" },
    cardBody: { padding: "20px" },
    cardName: { fontSize: "20px", color: "#F4EFE2", margin: "0 0 6px" },
    cardOrigin: { fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#A8C0B4", margin: "0 0 16px" },
    cardFoot: { display: "flex", justifyContent: "space-between", alignItems: "center" },
    price: { fontSize: "20px", color: "#E8D9A8" },
    smallBtn: { border: "1px solid rgba(212,175,55,0.4)", color: "#E8D9A8", padding: "8px 14px", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", background: "none", cursor: "pointer", borderRadius: "3px" },
    greenBtn: { background: "linear-gradient(135deg,#F4D88C,#D4AF37)", color: "#0E2A21", padding: "8px 14px", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", fontWeight: "700", border: "none", cursor: "pointer", borderRadius: "3px", textDecoration: "none", display: "inline-block" },
    contact: { padding: "100px 24px", background: "linear-gradient(180deg,#ECE5D2,#F4EFE2)", textAlign: "center" },
    contactInner: { maxWidth: "600px", margin: "0 auto" },
    waBtn: { background: "linear-gradient(135deg,#25D366,#1da851)", color: "#fff", padding: "18px 40px", borderRadius: "40px", fontSize: "14px", letterSpacing: "2px", textTransform: "uppercase", fontWeight: "700", textDecoration: "none", display: "inline-block" },
    footer: { background: "#0E2A21", borderTop: "1px solid rgba(212,175,55,0.2)", padding: "40px 24px", textAlign: "center" },
    overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" },
    modalBox: { background: "#0E2A21", borderRadius: "8px", maxWidth: "500px", width: "100%", maxHeight: "90vh", overflowY: "auto" },
    modalHead: { padding: "20px", borderBottom: "1px solid rgba(212,175,55,0.15)", display: "flex", justifyContent: "space-between", alignItems: "center" },
    modalBody: { padding: "20px" },
    input: { width: "100%", background: "#0E2A21", border: "1px solid rgba(212,175,55,0.3)", color: "#F4EFE2", padding: "10px", fontSize: "14px", borderRadius: "4px", boxSizing: "border-box", marginTop: "6px", marginBottom: "12px" },
    label: { fontSize: "11px", color: "#A8C0B4", textTransform: "uppercase", letterSpacing: "2px" },
  };

  return (
    <div style={s.page}>
      {isAdmin && <div style={s.adminBar}>ADMIN MODE — changes saved locally</div>}

      <header style={s.header}>
        <div style={s.headerInner}>
          <button style={s.logo} onClick={() => scroll("home")}>YARA</button>
          <nav style={s.navLinks} className="desktop-nav">
            {["Home","About","Shop","Contact"].map(n => (
              <button key={n} style={s.navLink} onClick={() => scroll(n.toLowerCase())}>{n}</button>
            ))}
          </nav>
          <a href={wa(null)} target="_blank" rel="noreferrer" style={s.inquireBtn}>Inquire</a>
        </div>
      </header>

      <section id="home" style={s.hero}>
        <div style={s.heroInner}>
          <p style={s.eyebrow}>Curated Textiles &amp; Premium Fabrics</p>
          <h1 style={s.h1}>Fabric,<br /><span style={s.goldText}>Curated.</span></h1>
          <p style={s.heroP}>A refined selection of silks, wools, and weaves sourced from the world's finest mills — for makers who treat fabric as the foundation of craft.</p>
          <button style={s.goldBtn} onClick={() => scroll("shop")}>Explore the Collection →</button>
        </div>
      </section>

      <section id="about" style={s.about}>
        <div style={s.aboutInner}>
          <p style={s.eyebrow}>Our Mission</p>
          <h2 style={s.h2}>We connect makers with fabrics that honor craftsmanship and timeless design.</h2>
          <div style={s.divider}></div>
          <p style={s.aboutP}>Every textile in the YARA collection is selected for its quality, origin, and feel — not for volume or trend. We work directly with heritage mills to bring a curated edit of fabrics to designers who notice the difference.</p>
        </div>
      </section>

      <section id="shop" style={s.shop}>
        <div style={s.shopInner}>
          <div style={s.shopHead}>
            <div>
              <p style={s.eyebrow}>The Collection</p>
              <h2 style={s.shopH2}>Shop Fabrics</h2>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:"16px" }}>
              <p style={{ color:"#A8C0B4", fontSize:"13px" }}>Per meter · Inquire to order</p>
              {isAdmin && <button style={s.addBtn} onClick={addNew}>+ Add Fabric</button>}
            </div>
          </div>

          <div style={s.grid}>
            {products.map(function(p) {
              return (
                <div key={p.id} style={s.card}>
                  <div style={{ height:"220px", background: p.image ? "url("+p.image+") center/cover" : p.color, cursor:"pointer" }} onClick={() => setModal(p)}></div>
                  {editId === p.id ? (
                    <div style={s.cardBody}>
                      <p style={s.label}>Name</p>
                      <input style={s.input} value={draft.name} onChange={function(e){ setDraft(Object.assign({},draft,{name:e.target.value})); }} />
                      <p style={s.label}>Origin</p>
                      <input style={s.input} value={draft.origin} onChange={function(e){ setDraft(Object.assign({},draft,{origin:e.target.value})); }} />
                      <p style={s.label}>Price / meter (USD)</p>
                      <input style={s.input} type="number" value={draft.price} onChange={function(e){ setDraft(Object.assign({},draft,{price:parseFloat(e.target.value)||0})); }} />
                      <p style={s.label}>Photo URL (optional)</p>
                      <input style={s.input} value={draft.image||""} placeholder="https://..." onChange={function(e){ setDraft(Object.assign({},draft,{image:e.target.value})); }} />
                      <p style={s.label}>Color (hex)</p>
                      <input style={s.input} value={draft.color} onChange={function(e){ setDraft(Object.assign({},draft,{color:e.target.value})); }} />
                      <div style={{ display:"flex", gap:"8px", marginTop:"8px" }}>
                        <button style={s.greenBtn} onClick={saveEdit}>Save</button>
                        <button style={s.smallBtn} onClick={cancelEdit}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div style={s.cardBody}>
                      <h3 style={s.cardName}>{p.name}</h3>
                      <p style={s.cardOrigin}>{p.origin}</p>
                      <div style={s.cardFoot}>
                        <p style={s.price}>${typeof p.price === "number" ? p.price.toFixed(2) : p.price}<span style={{ fontSize:"11px", color:"#A8C0B4" }}> /m</span></p>
                        <div style={{ display:"flex", gap:"8px" }}>
                          {isAdmin ? (
                            <>
                              <button style={s.smallBtn} onClick={function(){ startEdit(p); }}>Edit</button>
                              <button style={{ ...s.smallBtn, borderColor:"rgba(255,100,100,0.4)", color:"#ffaaaa" }} onClick={function(){ removeProduct(p.id); }}>Delete</button>
                            </>
                          ) : (
                            <>
                              <button style={s.smallBtn} onClick={function(){ setModal(p); }}>View</button>
                              <a href={wa(p)} target="_blank" rel="noreferrer" style={s.greenBtn}>Inquire</a>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="contact" style={s.contact}>
        <div style={s.contactInner}>
          <p style={{ ...s.eyebrow, color:"#9C7A1B" }}>Get in Touch</p>
          <h2 style={s.h2}>Visit the Showroom</h2>
          <p style={{ ...s.aboutP, marginBottom:"40px" }}>For fabric availability, pricing, or trade inquiries — message us on WhatsApp and we will reply within the day.</p>
          <a href={wa(null)} target="_blank" rel="noreferrer" style={s.waBtn}>Chat on WhatsApp</a>
        </div>
      </section>

      <footer style={s.footer}>
        <p style={{ fontSize:"20px", letterSpacing:"6px", color:"#E8D9A8", marginBottom:"8px" }}>YARA</p>
        <p style={{ fontSize:"11px", letterSpacing:"3px", color:"#A8C0B4", textTransform:"uppercase" }}>Curated Textiles &amp; Premium Fabrics</p>
        <p style={{ fontSize:"12px", color:"#5A6E64", marginTop:"8px" }}>© 2026 YARA. All rights reserved.</p>
      </footer>

      {modal && (
        <div style={s.overlay} onClick={function(){ setModal(null); }}>
          <div style={s.modalBox} onClick={function(e){ e.stopPropagation(); }}>
            <div style={s.modalHead}>
              <div>
                <h3 style={{ color:"#F4EFE2", margin:0, fontSize:"22px" }}>{modal.name}</h3>
                <p style={{ color:"#A8C0B4", fontSize:"11px", letterSpacing:"3px", textTransform:"uppercase", margin:"4px 0 0" }}>{modal.origin}</p>
              </div>
              <button style={{ background:"none", border:"none", color:"#A8C0B4", fontSize:"22px", cursor:"pointer" }} onClick={function(){ setModal(null); }}>×</button>
            </div>
            <div style={s.modalBody}>
              <div style={{ height:"240px", background: modal.image ? "url("+modal.image+") center/cover" : modal.color, borderRadius:"4px", marginBottom:"16px" }}></div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <p style={{ color:"#E8D9A8", fontSize:"22px", margin:0 }}>${typeof modal.price === "number" ? modal.price.toFixed(2) : modal.price}<span style={{ fontSize:"12px", color:"#A8C0B4" }}> / meter</span></p>
                <a href={wa(modal)} target="_blank" rel="noreferrer" style={s.greenBtn}>Inquire on WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
EOF
echo "Done"

import { useState, useEffect } from "react";
import { ShoppingBag, Menu, X, ArrowRight, MessageCircle, Plus, Pencil, Trash2, Save, XCircle, Lock, Eye, Image as ImageIcon } from "lucide-react";

const STORAGE_KEY = "yara:products";
const WHATSAPP_NUMBER = "971500000000"; // <-- replace with your real WhatsApp number, digits only, country code first

const DEFAULT_PRODUCTS = [
  { id: "p1", name: "Silk Charmeuse", origin: "Como, Italy", price: 68, swatch: "linear-gradient(135deg,#F4E9D0,#D9C9A0)", image: "" },
  { id: "p2", name: "Wool Bouclé", origin: "Yorkshire, UK", price: 54, swatch: "linear-gradient(135deg,#D6C7B6,#A89A88)", image: "" },
  { id: "p3", name: "Linen Voile", origin: "Normandy, France", price: 42, swatch: "linear-gradient(135deg,#EFEAD8,#CFC8B4)", image: "" },
  { id: "p4", name: "Velvet Cotton", origin: "Lyon, France", price: 76, swatch: "linear-gradient(135deg,#5A3A40,#2A1A1E)", image: "" },
  { id: "p5", name: "Cashmere Twill", origin: "Kashmir, India", price: 92, swatch: "linear-gradient(135deg,#D2C3AA,#9A8A70)", image: "" },
  { id: "p6", name: "Jacquard Brocade", origin: "Suzhou, China", price: 88, swatch: "linear-gradient(135deg,#E8CE7A,#A8841E)", image: "" },
];

const SWATCH_PRESETS = [
  { label: "Cream Silk", value: "linear-gradient(135deg,#F4E9D0,#D9C9A0)" },
  { label: "Stone Wool", value: "linear-gradient(135deg,#D6C7B6,#A89A88)" },
  { label: "Soft Linen", value: "linear-gradient(135deg,#EFEAD8,#CFC8B4)" },
  { label: "Deep Velvet", value: "linear-gradient(135deg,#5A3A40,#2A1A1E)" },
  { label: "Camel Cashmere", value: "linear-gradient(135deg,#D2C3AA,#9A8A70)" },
  { label: "Gold Brocade", value: "linear-gradient(135deg,#E8CE7A,#A8841E)" },
  { label: "Sage Green", value: "linear-gradient(135deg,#C9D4C2,#9CB39A)" },
  { label: "Plum Mohair", value: "linear-gradient(135deg,#E3D6E8,#B6A4C4)" },
  { label: "Charcoal Wool", value: "linear-gradient(135deg,#6E6E6E,#3A3A3A)" },
];

const MOCKUPS = [
  { id: "dress", label: "Dress" },
  { id: "curtain", label: "Curtain" },
  { id: "sofa", label: "Sofa Cushion" },
  { id: "shirt", label: "Shirt" },
];

const NAV = ["Home", "About", "Shop", "Contact"];

function FabricFill({ product, className = "", style = {} }) {
  const bg = product.image
    ? { backgroundImage: `url(${product.image})`, backgroundSize: "cover", backgroundPosition: "center" }
    : { background: product.swatch };
  return <div className={className} style={{ ...bg, ...style }} />;
}

function Mockup({ type, product }) {
  const fillStyle = product.image
    ? { backgroundImage: `url(${product.image})`, backgroundSize: "cover", backgroundPosition: "center" }
    : { background: product.swatch };

  if (type === "dress") {
    return (
      <div className="relative w-full aspect-[3/4] flex items-center justify-center bg-[#0E2A21] rounded">
        <svg viewBox="0 0 200 260" className="w-3/4 h-3/4">
          <defs>
            <clipPath id="dressClip">
              <path d="M100 10 C 85 10 75 25 75 40 L 60 70 L 40 240 C 60 255 140 255 160 240 L 140 70 L 125 40 C 125 25 115 10 100 10 Z" />
            </clipPath>
          </defs>
          <foreignObject width="200" height="260" clipPath="url(#dressClip)">
            <div style={{ width: "200px", height: "260px", ...fillStyle }} />
          </foreignObject>
          <path d="M100 10 C 85 10 75 25 75 40 L 60 70 L 40 240 C 60 255 140 255 160 240 L 140 70 L 125 40 C 125 25 115 10 100 10 Z" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.5" />
        </svg>
      </div>
    );
  }
  if (type === "curtain") {
    return (
      <div className="relative w-full aspect-[3/4] bg-[#0E2A21] rounded overflow-hidden flex">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex-1 h-full relative" style={{ ...fillStyle, filter: i % 2 === 0 ? "brightness(0.85)" : "brightness(1.05)" }}>
            <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.15), transparent 30%, transparent 70%, rgba(0,0,0,0.15))" }} />
          </div>
        ))}
        <div className="absolute top-0 left-0 right-0 h-3 bg-[#D4AF37]/70" />
      </div>
    );
  }
  if (type === "sofa") {
    return (
      <div className="relative w-full aspect-[3/4] bg-[#0E2A21] rounded flex items-center justify-center">
        <div className="relative w-3/4 aspect-square rounded-xl shadow-2xl" style={fillStyle}>
          <div className="absolute inset-3 border border-white/10 rounded-lg" />
          <div className="absolute -bottom-3 left-4 w-6 h-6 bg-[#1B2E27] rounded-sm" />
          <div className="absolute -bottom-3 right-4 w-6 h-6 bg-[#1B2E27] rounded-sm" />
        </div>
      </div>
    );
  }
  return (
    <div className="relative w-full aspect-[3/4] flex items-center justify-center bg-[#0E2A21] rounded">
      <svg viewBox="0 0 200 200" className="w-3/4 h-3/4">
        <defs>
          <clipPath id="shirtClip">
            <path d="M70 20 L 100 35 L 130 20 L 165 45 L 150 75 L 135 65 L 135 180 L 65 180 L 65 65 L 50 75 L 35 45 Z" />
          </clipPath>
        </defs>
        <foreignObject width="200" height="200" clipPath="url(#shirtClip)">
          <div style={{ width: "200px", height: "200px", ...fillStyle }} />
        </foreignObject>
        <path d="M70 20 L 100 35 L 130 20 L 165 45 L 150 75 L 135 65 L 135 180 L 65 180 L 65 65 L 50 75 L 35 45 Z" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.5" />
      </svg>
    </div>
  );
}

export default function YaraSite() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState(null);
  const [saving, setSaving] = useState(false);
  const [detailProduct, setDetailProduct] = useState(null);
  const [mockupType, setMockupType] = useState("dress");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setIsAdmin(params.get("admin") === "1");
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setProducts(parsed.map((p) => ({ image: "", ...p })));
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PRODUCTS));
      }
    } catch (e) {
      console.error("Storage load error", e);
    } finally {
      setLoading(false);
    }
  }, []);

  const persist = async (next) => {
    setProducts(next);
    setSaving(true);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (e) {
      console.error("Storage save error", e);
    } finally {
      setSaving(false);
    }
  };
< truncated lines 149-403 >
                      <label className="text-xs text-[#A8C0B4] uppercase tracking-wider">Price per meter (USD)</label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={draft.price}
                        onChange={(e) => setDraft({ ...draft, price: parseFloat(e.target.value) || 0 })}
                        className="w-full bg-[#0E2A21] border border-[#D4AF37]/30 text-[#F4EFE2] text-sm px-2 py-2 rounded mt-1"
                      />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button onClick={saveEdit} disabled={saving} className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#F4D88C] to-[#D4AF37] text-[#0E2A21] py-2 rounded text-xs tracking-[0.15em] uppercase font-semibold disabled:opacity-60">
                        <Save className="w-3.5 h-3.5" /> {saving ? "Saving..." : "Save"}
                      </button>
                      <button onClick={cancelEdit} className="flex items-center justify-center gap-2 border border-[#A8C0B4]/40 text-[#A8C0B4] px-3 py-2 rounded text-xs tracking-[0.15em] uppercase">
                        <XCircle className="w-3.5 h-3.5" /> Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <button onClick={() => setDetailProduct({ ...p, _showVisualize: false })} className="block w-full text-left">
                      <FabricFill product={p} className="aspect-square w-full" />
                    </button>
                    <div className="p-5">
                      <button onClick={() => setDetailProduct({ ...p, _showVisualize: false })} className="text-left">
                        <h3 className="serif text-lg text-[#F4EFE2] hover:text-[#F4D88C] transition-colors">{p.name}</h3>
                      </button>
                      <p className="text-xs tracking-[0.2em] text-[#A8C0B4] uppercase mt-1">{p.origin}</p>
                      <div className="flex items-center justify-between mt-4">
                        <p className="text-[#E8D9A8] text-lg">
                          ${p.price.toFixed(2)}
                          <span className="text-xs text-[#A8C0B4]"> / meter</span>
                        </p>
                        {isAdmin ? (
                          <div className="flex gap-2">
                            <button onClick={() => startEdit(p)} className="flex items-center gap-1 text-xs tracking-[0.15em] uppercase border border-[#D4AF37]/40 text-[#E8D9A8] px-3 py-2 rounded hover:bg-[#D4AF37] hover:text-[#0E2A21] transition-colors">
                              <Pencil className="w-3.5 h-3.5" /> Edit
                            </button>
                            <button onClick={() => removeProduct(p.id)} className="flex items-center gap-1 text-xs tracking-[0.15em] uppercase border border-red-400/30 text-red-300 px-3 py-2 rounded hover:bg-red-400/20 transition-colors">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <button onClick={() => openVisualize(p)} className="flex items-center gap-1 text-xs tracking-[0.15em] uppercase border border-[#D4AF37]/40 text-[#E8D9A8] px-3 py-2 rounded hover:bg-[#D4AF37] hover:text-[#0E2A21] transition-colors">
                              <Eye className="w-3.5 h-3.5" /> Visualize
                            </button>
                            <a href={whatsappLink(p)} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs tracking-[0.15em] uppercase bg-gradient-to-r from-[#F4D88C] to-[#D4AF37] text-[#0E2A21] px-3 py-2 rounded font-semibold hover:shadow-lg hover:shadow-[#D4AF37]/30 transition-shadow">
                              <MessageCircle className="w-3.5 h-3.5" /> Inquire
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CONTACT ---------- */}
      <section id="contact" className="py-24 md:py-32 text-center" style={{ background: "linear-gradient(180deg,#ECE5D2,#F4EFE2)" }}>
        <div className="max-w-2xl mx-auto px-6">
          <p className="text-[#9C7A1B] text-xs tracking-[0.35em] uppercase mb-6 font-medium">Get in Touch</p>
          <h2 className="serif text-3xl md:text-5xl text-[#0E2A21] mb-6">Visit the Showroom</h2>
          <p className="text-[#5A6E64] leading-relaxed mb-10 max-w-xl mx-auto">
            For fabric availability, pricing, or trade inquiries, message us directly on WhatsApp — we typically reply within the day.
          </p>
          <a href={whatsappLink()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 bg-gradient-to-r from-[#25D366] to-[#1da851] text-white px-8 py-4 rounded-full text-sm tracking-[0.2em] uppercase font-semibold shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/40 hover:-translate-y-0.5 transition-all">
            <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
          </a>
        </div>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="border-t border-[#D4AF37]/20 py-10" style={{ background: "#0E2A21" }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="serif text-xl tracking-[0.25em] text-[#E8D9A8]">YARA</p>
          <p className="text-xs tracking-[0.2em] text-[#A8C0B4] uppercase">Curated Textiles &amp; Premium Fabrics</p>
          <p className="text-xs text-[#5A6E64]">© 2026 YARA. All rights reserved.</p>
        </div>
      </footer>

      {/* ---------- DETAIL / VISUALIZE MODAL ---------- */}
      {detailProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60" onClick={() => setDetailProduct(null)}>
          <div
            className="max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl"
            style={{ background: "#0E2A21" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b border-[#D4AF37]/15">
              <div>
                <h3 className="serif text-2xl text-[#F4EFE2]">{detailProduct.name}</h3>
                <p className="text-xs tracking-[0.2em] text-[#A8C0B4] uppercase mt-1">{detailProduct.origin}</p>
              </div>
              <button onClick={() => setDetailProduct(null)} className="text-[#A8C0B4] hover:text-[#F4D88C]">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-5 grid md:grid-cols-2 gap-6">
              <div>
                <FabricFill product={detailProduct} className="w-full aspect-square rounded mb-4" />
                <div className="flex items-center justify-between">
                  <p className="text-[#E8D9A8] text-xl">
                    ${detailProduct.price.toFixed(2)}
                    <span className="text-xs text-[#A8C0B4]"> / meter</span>
                  </p>
                  <a href={whatsappLink(detailProduct)} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase bg-gradient-to-r from-[#F4D88C] to-[#D4AF37] text-[#0E2A21] px-4 py-2 rounded font-semibold">
                    <MessageCircle className="w-3.5 h-3.5" /> Inquire
                  </a>
                </div>
              </div>

              <div>
                <p className="text-xs tracking-[0.25em] text-[#D4AF37] uppercase mb-3 font-medium">Visualize on</p>
                <div className="flex gap-2 mb-4 flex-wrap">
                  {MOCKUPS.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setMockupType(m.id)}
                      className={`text-xs tracking-[0.15em] uppercase px-3 py-2 rounded border transition-colors ${
                        mockupType === m.id
                          ? "bg-gradient-to-r from-[#F4D88C] to-[#D4AF37] text-[#0E2A21] border-transparent font-semibold"
                          : "border-[#D4AF37]/30 text-[#A8C0B4] hover:border-[#D4AF37]/60"
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
                <Mockup type={mockupType} product={detailProduct} />
                <p className="text-xs text-[#A8C0B4] mt-3 leading-relaxed">
                  Preview only — actual drape, texture, and color may vary slightly from real fabric. Inquire for a physical swatch sample.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

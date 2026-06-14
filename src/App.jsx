cat > /home/claude/yara-site/src/App.jsx << 'ENDOFFILE'
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight, MessageCircle, Plus, Pencil, Trash2, Save, XCircle, Lock, Eye } from "lucide-react";

const STORAGE_KEY = "yara:products";
const WHATSAPP = "971500000000";

const DEFAULTS = [
  { id:"p1", name:"Silk Charmeuse", origin:"Como, Italy", price:68, color:"#D9C9A0" },
  { id:"p2", name:"Wool Boucle", origin:"Yorkshire, UK", price:54, color:"#A89A88" },
  { id:"p3", name:"Linen Voile", origin:"Normandy, France", price:42, color:"#CFC8B4" },
  { id:"p4", name:"Velvet Cotton", origin:"Lyon, France", price:76, color:"#3A1A1E" },
  { id:"p5", name:"Cashmere Twill", origin:"Kashmir, India", price:92, color:"#9A8A70" },
  { id:"p6", name:"Jacquard Brocade", origin:"Suzhou, China", price:88, color:"#A8841E" },
];

const COLORS = ["#D9C9A0","#A89A88","#CFC8B4","#3A1A1E","#9A8A70","#A8841E","#9CB39A","#B6A4C4","#6E6E6E","#C9A227","#1B4A3A","#E8D9A8"];
const MOCKUPS = ["Dress","Curtain","Sofa","Shirt"];

function wa(p) {
  const msg = p ? `Hi YARA, I'm interested in ${p.name} (${p.origin}) — can you share more details?` : `Hi YARA, I'd like to know more about your fabrics.`;
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
}

function Swatch({ color, image, className="" }) {
  return <div className={className} style={image ? { backgroundImage:`url(${image})`, backgroundSize:"cover", backgroundPosition:"center" } : { backgroundColor: color }} />;
}

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [draft, setDraft] = useState(null);
  const [saving, setSaving] = useState(false);
  const [modal, setModal] = useState(null);
  const [mockup, setMockup] = useState("Dress");

  useEffect(() => {
    setIsAdmin(new URLSearchParams(window.location.search).get("admin") === "1");
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setProducts(JSON.parse(raw));
      else localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULTS));
    } catch(e) {}
    setLoading(false);
  }, []);

  const save = async (next) => {
    setProducts(next);
    setSaving(true);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch(e) {}
    setSaving(false);
  };

  const scroll = (id) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior:"smooth" }); };
  const addNew = () => { const p={id:`p${Date.now()}`,name:"New Fabric",origin:"Origin",price:0,color:"#C9A227",image:""}; setProducts(x=>[...x,p]); setEditId(p.id); setDraft(p); };
  const edit = (p) => { setEditId(p.id); setDraft({...p}); };
  const cancel = () => { setEditId(null); setDraft(null); };
  const saveEdit = async () => { await save(products.map(p=>p.id===editId?draft:p)); setEditId(null); setDraft(null); };
  const remove = async (id) => await save(products.filter(p=>p.id!==id));

  if (loading) return <div className="min-h-screen bg-[#0E2A21] flex items-center justify-center"><p className="text-[#E8D9A8] text-2xl tracking-widest" style={{fontFamily:"Georgia,serif"}}>YARA</p></div>;

  return (
    <div style={{fontFamily:"Inter,sans-serif"}} className="bg-[#F4EFE2] text-[#1B2E27]">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@300;400;500;600&display=swap'); .serif{font-family:'Playfair Display',serif;}`}</style>

      {isAdmin && <div className="bg-[#C9A227] text-[#0E2A21] text-center py-2 text-xs tracking-widest uppercase font-semibold flex items-center justify-center gap-2"><Lock className="w-3 h-3"/>Admin Mode — edits are saved locally</div>}

      <header className="sticky top-0 z-50 border-b border-[#C9A227]/20" style={{background:"linear-gradient(135deg,#0E2A21,#1B4A3A)"}}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={()=>scroll("home")} className="serif text-2xl tracking-[0.25em] text-[#E8D9A8] font-semibold">YARA</button>
          <nav className="hidden md:flex gap-10">
            {["Home","About","Shop","Contact"].map(n=><button key={n} onClick={()=>scroll(n.toLowerCase())} className="text-sm tracking-[0.2em] text-[#D9CFC0] hover:text-[#E8D9A8] uppercase transition-colors">{n}</button>)}
          </nav>
          <div className="flex items-center gap-3">
            <a href={wa(null)} target="_blank" rel="noreferrer" className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-xs tracking-widest uppercase font-semibold text-[#0E2A21]" style={{background:"linear-gradient(135deg,#F4D88C,#C9A227)"}}><MessageCircle className="w-3.5 h-3.5"/>Inquire</a>
            <button className="md:hidden text-[#E8D9A8]" onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X className="w-5 h-5"/>:<Menu className="w-5 h-5"/>}</button>
          </div>
        </div>
        {menuOpen && <div className="md:hidden bg-[#0E2A21] border-t border-[#C9A227]/20 px-6 py-4 flex flex-col gap-4">
          {["Home","About","Shop","Contact"].map(n=><button key={n} onClick={()=>scroll(n.toLowerCase())} className="text-sm tracking-[0.2em] text-[#D9CFC0] text-left uppercase">{n}</button>)}
        </div>}
      </header>

      <section id="home" className="relative min-h-[80vh] flex items-center" style={{background:"radial-gradient(circle at 80% 20%,rgba(212,175,55,0.18),transparent 50%),linear-gradient(135deg,#0E2A21,#1B4A3A 60%,#0E2A21)"}}>
        <div className="max-w-6xl mx-auto px-6 py-16 w-full">
          <p className="text-[#D4AF37] text-xs tracking-[0.35em] uppercase mb-6 font-medium">Curated Textiles &amp; Premium Fabrics</p>
          <h1 className="serif text-5xl md:text-7xl leading-tight text-[#F4EFE2]">Fabric,<br/><span style={{background:"linear-gradient(135deg,#F4D88C,#D4AF37)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Curated.</span></h1>
          <p className="mt-6 text-[#A8C0B4] text-lg leading-relaxed max-w-md">A refined selection of silks, wools, and weaves sourced from the world's finest mills.</p>
          <button onClick={()=>scroll("shop")} className="mt-10 inline-flex items-center gap-3 px-8 py-4 text-sm tracking-[0.2em] uppercase font-semibold text-[#0E2A21]" style={{background:"linear-gradient(135deg,#F4D88C,#D4AF37)"}}> Explore the Collection <ArrowRight className="w-4 h-4"/></button>
        </div>
      </section>

      <section id="about" className="py-24 text-center" style={{background:"linear-gradient(180deg,#F4EFE2,#ECE5D2)"}}>
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[#9C7A1B] text-xs tracking-[0.35em] uppercase mb-6 font-medium">Our Mission</p>
          <h2 className="serif text-3xl md:text-5xl leading-tight text-[#0E2A21]">We connect makers with fabrics that honor craftsmanship and timeless design.</h2>
          <div className="w-32 h-px my-10 mx-auto" style={{background:"linear-gradient(90deg,transparent,#D4AF37,transparent)"}}/>
          <p className="text-[#5A6E64] leading-relaxed">Every textile in the YARA collection is selected for its quality, origin, and feel — not for volume or trend. We work directly with heritage mills to bring a curated edit of fabrics to designers and creators who notice the difference.</p>
          <div className="flex justify-center gap-10 mt-12 flex-wrap">
            {[["✦","Quality First"],["◈","Curated Edit"],["❖","Heritage Mills"],["⬡","Trusted Sourcing"]].map(([icon,label])=>(
              <div key={label} className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-lg text-[#F4D88C]" style={{background:"linear-gradient(135deg,#2F6E54,#0E2A21)"}}>{icon}</div>
                <span className="text-xs tracking-widest uppercase text-[#0E2A21] font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="shop" className="py-24 relative" style={{background:"#0E2A21"}}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <p className="text-[#D4AF37] text-xs tracking-[0.35em] uppercase mb-3 font-medium">The Collection</p>
              <h2 className="serif text-3xl md:text-4xl text-[#F4EFE2]">Shop Fabrics</h2>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-[#A8C0B4] text-sm">Per meter · Inquire to order</p>
              {isAdmin && <button onClick={addNew} className="flex items-center gap-2 px-4 py-2 rounded text-xs tracking-widest uppercase font-semibold text-[#0E2A21]" style={{background:"linear-gradient(135deg,#F4D88C,#D4AF37)"}}><Plus className="w-4 h-4"/>Add Fabric</button>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(p=>(
              <div key={p.id} className="group relative rounded overflow-hidden border border-[#D4AF37]/15 hover:border-[#D4AF37]/50 transition-all hover:-translate-y-1" style={{background:"linear-gradient(160deg,#1B4A3A,#163C2F)"}}>
                <div className="absolute top-0 right-0 w-10 h-10 z-10 opacity-60 group-hover:opacity-100 transition-opacity" style={{background:"linear-gradient(135deg,transparent 50%,#D4AF37 50%)",clipPath:"polygon(100% 0,0 0,100% 100%)"}}/>
                {editId===p.id ? (
                  <div className="p-5 space-y-3">
                    <div>
                      <label className="text-xs text-[#A8C0B4] uppercase tracking-wider">Photo URL</label>
                      <Swatch color={draft.color} image={draft.image} className="w-full h-20 rounded mt-1 mb-2"/>
                      <input value={draft.image||""} onChange={e=>setDraft({...draft,image:e.target.value})} className="w-full bg-[#0E2A21] border border-[#D4AF37]/30 text-[#F4EFE2] text-sm px-2 py-2 rounded" placeholder="https://... (optional)"/>
                    </div>
                    <div>
                      <label className="text-xs text-[#A8C0B4] uppercase tracking-wider">Fallback Color</label>
                      <div className="flex gap-2 flex-wrap mt-1">
                        {COLORS.map(c=><button key={c} onClick={()=>setDraft({...draft,color:c})} className="w-7 h-7 rounded-full border-2 transition-all" style={{backgroundColor:c,borderColor:draft.color===c?"#F4D88C":"transparent"}}/>)}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-[#A8C0B4] uppercase tracking-wider">Name</label>
                      <input value={draft.name} onChange={e=>setDraft({...draft,name:e.target.value})} className="w-full bg-[#0E2A21] border border-[#D4AF37]/30 text-[#F4EFE2] text-sm px-2 py-2 rounded mt-1" placeholder="Fabric name"/>
                    </div>
                    <div>
                      <label className="text-xs text-[#A8C0B4] uppercase tracking-wider">Origin</label>
                      <input value={draft.origin} onChange={e=>setDraft({...draft,origin:e.target.value})} className="w-full bg-[#0E2A21] border border-[#D4AF37]/30 text-[#F4EFE2] text-sm px-2 py-2 rounded mt-1" placeholder="Country / region"/>
                    </div>
                    <div>
                      <label className="text-xs text-[#A8C0B4] uppercase tracking-wider">Price / meter (USD)</label>
                      <input type="number" min="0" value={draft.price} onChange={e=>setDraft({...draft,price:parseFloat(e.target.value)||0})} className="w-full bg-[#0E2A21] border border-[#D4AF37]/30 text-[#F4EFE2] text-sm px-2 py-2 rounded mt-1"/>
                    </div>
                    <div className="flex gap-2 pt-1">
                      <button onClick={saveEdit} disabled={saving} className="flex-1 flex items-center justify-center gap-2 py-2 rounded text-xs tracking-widest uppercase font-semibold text-[#0E2A21] disabled:opacity-60" style={{background:"linear-gradient(135deg,#F4D88C,#D4AF37)"}}><Save className="w-3.5 h-3.5"/>{saving?"Saving...":"Save"}</button>
                      <button onClick={cancel} className="flex items-center gap-1 border border-[#A8C0B4]/40 text-[#A8C0B4] px-3 py-2 rounded text-xs uppercase"><XCircle className="w-3.5 h-3.5"/>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <button onClick={()=>setModal(p)} className="block w-full"><Swatch color={p.color} image={p.image} className="aspect-square w-full"/></button>
                    <div className="p-5">
                      <button onClick={()=>setModal(p)} className="text-left"><h3 className="serif text-lg text-[#F4EFE2] hover:text-[#F4D88C] transition-colors">{p.name}</h3></button>
                      <p className="text-xs tracking-[0.2em] text-[#A8C0B4] uppercase mt-1">{p.origin}</p>
                      <div className="flex items-center justify-between mt-4">
                        <p className="text-[#E8D9A8] text-lg">${p.price.toFixed(2)}<span className="text-xs text-[#A8C0B4]"> / m</span></p>
                        {isAdmin ? (
                          <div className="flex gap-2">
                            <button onClick={()=>edit(p)} className="flex items-center gap-1 text-xs uppercase border border-[#D4AF37]/40 text-[#E8D9A8] px-3 py-2 rounded hover:bg-[#D4AF37] hover:text-[#0E2A21] transition-colors"><Pencil className="w-3.5 h-3.5"/>Edit</button>
                            <button onClick={()=>remove(p.id)} className="flex items-center gap-1 text-xs uppercase border border-red-400/30 text-red-300 px-3 py-2 rounded hover:bg-red-400/20 transition-colors"><Trash2 className="w-3.5 h-3.5"/></button>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <button onClick={()=>setModal(p)} className="flex items-center gap-1 text-xs uppercase border border-[#D4AF37]/40 text-[#E8D9A8] px-3 py-2 rounded hover:bg-[#D4AF37] hover:text-[#0E2A21] transition-colors"><Eye className="w-3.5 h-3.5"/>View</button>
                            <a href={wa(p)} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs uppercase px-3 py-2 rounded font-semibold text-[#0E2A21]" style={{background:"linear-gradient(135deg,#F4D88C,#D4AF37)"}}><MessageCircle className="w-3.5 h-3.5"/>Inquire</a>
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

      <section id="contact" className="py-24 text-center" style={{background:"linear-gradient(180deg,#ECE5D2,#F4EFE2)"}}>
        <div className="max-w-xl mx-auto px-6">
          <p className="text-[#9C7A1B] text-xs tracking-[0.35em] uppercase mb-6 font-medium">Get in Touch</p>
          <h2 className="serif text-3xl md:text-5xl text-[#0E2A21] mb-6">Visit the Showroom</h2>
          <p className="text-[#5A6E64] leading-relaxed mb-10">For availability, pricing, or trade inquiries — message us on WhatsApp and we'll reply within the day.</p>
          <a href={wa(null)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm tracking-widest uppercase font-semibold text-white shadow-lg" style={{background:"linear-gradient(135deg,#25D366,#1da851)"}}><MessageCircle className="w-5 h-5"/>Chat on WhatsApp</a>
        </div>
      </section>

      <footer className="py-10 border-t border-[#D4AF37]/20" style={{background:"#0E2A21"}}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="serif text-xl tracking-[0.25em] text-[#E8D9A8]">YARA</p>
          <p className="text-xs tracking-widest text-[#A8C0B4] uppercase">Curated Textiles &amp; Premium Fabrics</p>
          <p className="text-xs text-[#5A6E64]">© 2026 YARA. All rights reserved.</p>
        </div>
      </footer>

      {modal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60" onClick={()=>setModal(null)}>
          <div className="max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl" style={{background:"#0E2A21"}} onClick={e=>e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-[#D4AF37]/15">
              <div><h3 className="serif text-2xl text-[#F4EFE2]">{modal.name}</h3><p className="text-xs tracking-widest text-[#A8C0B4] uppercase mt-1">{modal.origin}</p></div>
              <button onClick={()=>setModal(null)} className="text-[#A8C0B4] hover:text-[#F4D88C]"><X className="w-6 h-6"/></button>
            </div>
            <div className="p-5 grid md:grid-cols-2 gap-6">
              <div>
                <Swatch color={modal.color} image={modal.image} className="w-full aspect-square rounded mb-4"/>
                <div className="flex items-center justify-between">
                  <p className="text-[#E8D9A8] text-xl">${modal.price.toFixed(2)}<span className="text-xs text-[#A8C0B4]"> / meter</span></p>
                  <a href={wa(modal)} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs uppercase px-4 py-2 rounded font-semibold text-[#0E2A21]" style={{background:"linear-gradient(135deg,#F4D88C,#D4AF37)"}}><MessageCircle className="w-3.5 h-3.5"/>Inquire</a>
                </div>
              </div>
              <div>
                <p className="text-xs tracking-widest text-[#D4AF37] uppercase mb-3 font-medium">Visualize on</p>
                <div className="flex gap-2 mb-4 flex-wrap">
                  {MOCKUPS.map(m=><button key={m} onClick={()=>setMockup(m)} className={`text-xs tracking-widest uppercase px-3 py-2 rounded border transition-colors ${mockup===m?"border-transparent font-semibold text-[#0E2A21]":"border-[#D4AF37]/30 text-[#A8C0B4]"}`} style={mockup===m?{background:"linear-gradient(135deg,#F4D88C,#D4AF37)"}:{}}>{m}</button>)}
                </div>
                <div className="rounded overflow-hidden aspect-[3/4] relative flex items-center justify-center" style={{background:"#163C2F"}}>
                  {mockup==="Curtain" ? (
                    <div className="w-full h-full flex">
                      {[0,1,2,3,4,5].map(i=><div key={i} className="flex-1 h-full" style={modal.image?{backgroundImage:`url(${modal.image})`,backgroundSize:"cover",filter:i%2===0?"brightness(0.85)":"brightness(1.05)"}:{backgroundColor:modal.color,filter:i%2===0?"brightness(0.85)":"brightness(1.05)"}}/>)}
                      <div className="absolute top-0 left-0 right-0 h-3 bg-[#D4AF37]/70"/>
                    </div>
                  ) : mockup==="Sofa" ? (
                    <div className="w-3/4 aspect-square rounded-xl shadow-2xl" style={modal.image?{backgroundImage:`url(${modal.image})`,backgroundSize:"cover"}:{backgroundColor:modal.color}}/>
                  ) : (
                    <svg viewBox="0 0 200 260" className="w-3/4 h-3/4">
                      <defs><clipPath id="mc"><path d={mockup==="Dress"?"M100 10 C85 10 75 25 75 40 L60 70 L40 240 C60 255 140 255 160 240 L140 70 L125 40 C125 25 115 10 100 10Z":"M70 20 L100 35 L130 20 L165 45 L150 75 L135 65 L135 180 L65 180 L65 65 L50 75 L35 45Z"}/></clipPath></defs>
                      <foreignObject width="200" height="260" clipPath="url(#mc)"><div style={{width:"200px",height:"260px",...(modal.image?{backgroundImage:`url(${modal.image})`,backgroundSize:"cover"}:{backgroundColor:modal.color})}}/></foreignObject>
                      <path d={mockup==="Dress"?"M100 10 C85 10 75 25 75 40 L60 70 L40 240 C60 255 140 255 160 240 L140 70 L125 40 C125 25 115 10 100 10Z":"M70 20 L100 35 L130 20 L165 45 L150 75 L135 65 L135 180 L65 180 L65 65 L50 75 L35 45Z"} fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.5"/>
                    </svg>
                  )}
                </div>
                <p className="text-xs text-[#A8C0B4] mt-3">Preview only — actual texture may vary. Request a swatch sample via WhatsApp.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
ENDOFFILE
wc -l /home/claude/yara-site/src/App.jsx

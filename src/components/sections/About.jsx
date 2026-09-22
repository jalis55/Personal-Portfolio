import { useEffect, useRef, useState } from "react";
import { Code, Lightbulb, Users, Zap, Target, Rocket } from "lucide-react";
import pp from "../../assets/imgg_tarif.png";
import ppWebp from "../../assets/imgg_tarif.webp";

function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

export default function About() {
  const [ref, visible] = useReveal(0.08);

  const highlights = [
    { icon: Code, title: "Clean Code", desc: "Writing maintainable, scalable code that stands the test of time.", color: "#0d9488" },
    { icon: Lightbulb, title: "Innovation", desc: "Exploring new technologies to solve complex problems.", color: "#14b8a6" },
    { icon: Users, title: "Collaboration", desc: "Working effectively with cross-functional teams.", color: "#f59e0b" },
    { icon: Zap, title: "Performance", desc: "Optimizing for speed, accessibility, and UX.", color: "#0d9488" },
  ];

  return (
    <>
      <style>{`
        @keyframes float-y { 0%,100%{ transform:translateY(0) } 50%{ transform:translateY(-10px) } }
        @keyframes slide-right { from{ opacity:0; transform:translateX(40px) } to{ opacity:1; transform:translateX(0) } }
        @keyframes slide-left { from{ opacity:0; transform:translateX(-40px) } to{ opacity:1; transform:translateX(0) } }
        @keyframes count-up { from{ opacity:0 } to{ opacity:1 } }
        @keyframes pulse-border { 0%,100%{ border-color:rgba(13,148,136,.2) } 50%{ border-color:rgba(13,148,136,.4) } }

        .about-section { position:relative; padding:6rem 0; background:#020617; overflow:hidden; }
        .about-grid { background-image: linear-gradient(to right, rgba(13,148,136,.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(13,148,136,.03) 1px, transparent 1px); background-size: 60px 60px; }

        .hl-card { position:relative; border-radius:20px; background:rgba(15,23,42,.5); border:1px solid rgba(30,41,59,.4); backdrop-filter:blur(16px); padding:2rem; transition:all .35s cubic-bezier(.34,1.56,.64,1); overflow:hidden; }
        .hl-card::before { content:''; position:absolute; inset:0; opacity:0; background:radial-gradient(circle at 30% 20%, rgba(13,148,136,.06), transparent 60%); transition:opacity .4s; border-radius:inherit; }
        .hl-card:hover { transform:translateY(-8px); border-color:rgba(13,148,136,.25); box-shadow:0 20px 40px rgba(13,148,136,.06); }
        .hl-card:hover::before { opacity:1; }

        .photo-container { position:relative; display:inline-block; width:260px; }
        .photo-ring { position:absolute; inset:-8px; border-radius:24px; border:2px solid rgba(13,148,136,.15); animation:pulse-border 3s ease-in-out infinite; }
        .photo-ring-2 { position:absolute; inset:-16px; border-radius:28px; border:1px solid rgba(245,158,11,.08); animation:pulse-border 4s ease-in-out infinite reverse; }
        .photo-img { position:relative; width:100%; aspect-ratio:3/4; border-radius:20px; object-fit:cover; }
        .photo-glow { position:absolute; inset:-40px; border-radius:50%; background:radial-gradient(circle, rgba(13,148,136,.1), transparent 65%); z-index:0; pointer-events:none; }

        .stat-value { font-family:'Playfair Display',Georgia,serif; font-size:2.5rem; font-weight:900; background:linear-gradient(135deg, #0d9488, #f59e0b); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .stat-label { font-size:.7rem; color:#718096; letter-spacing:.05em; }
      `}</style>

      <section id="about" ref={ref} className="about-section">
        <div className="about-grid absolute inset-0 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, rgba(13,148,136,.05), transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, rgba(245,158,11,.04), transparent 70%)" }} />

        <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-16">
          {/* Header */}
          <div className={`text-center mb-20 ${visible ? "animate-[slide-right_1s_cubic-bezier(.22,1,.36,1)_0.2s_both]" : "opacity-0"}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-900/30 bg-emerald-950/30 backdrop-blur-sm mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[10px] text-emerald-400/50 tracking-[0.2em] uppercase">Who I am</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4">
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #0d9488, #14b8a6, #f59e0b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>About Me</span>
            </h2>
            <p className="text-zinc-500 max-w-xl mx-auto text-sm md:text-base leading-relaxed font-light">Full-stack developer blending seamless UX with smart AI — from React interfaces to Python backends and LangChain agents.</p>
          </div>

          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Photo + Stats */}
            <div className={`flex flex-col items-center ${visible ? "animate-[slide-left_1s_cubic-bezier(.22,1,.36,1)_0.4s_both]" : "opacity-0"}`}>
              <div className="photo-container">
                <div className="photo-glow" />
                <div className="photo-ring" />
                <div className="photo-ring-2" />
                <picture>
                  <source srcSet={ppWebp} type="image/webp" />
                  <img src={pp} className="photo-img" alt="Jalis Mahamud" width={480} height={640} loading="lazy" />
                </picture>
                <div className="absolute -bottom-3 -right-3 px-4 py-2 rounded-xl text-xs font-medium text-slate-200 flex items-center gap-2" style={{ background: "rgba(15,23,42,.92)", border: "1px solid rgba(13,148,136,.25)", backdropFilter: "blur(10px)" }}>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" style={{ boxShadow: "0 0 0 3px rgba(20,184,166,.2)" }} />
                  Open to work
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                {[
                  { value: "3+", label: "Years" },
                  { value: "20+", label: "Projects" },
                  { value: "10+", label: "Clients" },
                ].map(({ value, label }) => (
                  <div key={label} className="text-center p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/40">
                    <div className="stat-value">{value}</div>
                    <div className="stat-label">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Journey + Highlights */}
            <div className={`space-y-8 ${visible ? "animate-[slide-right_1s_cubic-bezier(.22,1,.36,1)_0.6s_both]" : "opacity-0"}`}>
              <div>
                <p className="text-[10px] text-emerald-400/50 tracking-[0.2em] uppercase mb-3 font-medium">My Journey</p>
                <h3 className="text-2xl md:text-3xl font-bold text-white leading-snug mb-4">
                  Turning bold ideas into <span style={{ backgroundImage: "linear-gradient(135deg, #0d9488, #f59e0b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>reality</span>
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed font-light mb-3">
                  I started coding in college, sparked by a Python script that automated my study notes. What began as curiosity evolved into a career blending full-stack development with AI innovation.
                </p>
                <p className="text-zinc-500 text-sm leading-relaxed font-light">
                  Today I build scalable apps using React, Django, and FastAPI — integrating ML tools like Scikit-learn and LangChain to power intelligent features.
                </p>
              </div>

              {/* Highlight cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {highlights.map(({ icon: Icon, title, desc, color }, i) => (
                  <div key={title} className="hl-card">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
                      <Icon className="w-5 h-5" style={{ color }} />
                    </div>
                    <h4 className="text-sm font-semibold text-white mb-1">{title}</h4>
                    <p className="text-xs text-zinc-500 font-light leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

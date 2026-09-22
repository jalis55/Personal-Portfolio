import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github, Star, Eye } from "lucide-react";

import p1 from './project_images/bos.webp';
import p2 from './project_images/reserva.webp';
import p3 from './project_images/kb.webp';
import p4 from './project_images/ats.webp';
import p5 from './project_images/pricepulse.webp';
import p1Png from './project_images/bos.png';
import p2Png from './project_images/reserva.png';
import p3Png from './project_images/kb.png';
import p4Png from './project_images/ats.png';
import p5Png from './project_images/pricepulse.png';

function useReveal(threshold = 0.08) {
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

function useCardReveal(delay = 0) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setVisible(true), delay); obs.disconnect(); } }, { threshold: 0.10 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return [ref, visible];
}

function FeaturedCard({ project, index }) {
  const [ref, visible] = useCardReveal(index * 100);
  const isReversed = index % 2 !== 0;
  const [imgLoaded, setImgLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div ref={ref} className="proj-featured-card" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: "opacity 0.8s cubic-bezier(.22,1,.36,1), transform 0.8s cubic-bezier(.22,1,.36,1)" }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="proj-shimmer" />
      <div className={`proj-featured-inner ${isReversed ? "proj-reversed" : ""}`}>
        <div className="proj-img-pane">
          <div className="proj-browser-bar">
            <span className="proj-browser-dot" style={{ background: "#ef4444" }} />
            <span className="proj-browser-dot" style={{ background: "#eab308" }} />
            <span className="proj-browser-dot" style={{ background: "#22c55e" }} />
            <span className="ml-3 text-[10px] text-zinc-500 truncate font-mono hidden sm:inline">{project.liveUrl.replace("https://", "").replace("http://", "").replace(/\/$/, "") || "preview"}</span>
          </div>
          <div className="proj-img-wrap">
            <picture>
              <source srcSet={project.image} type="image/webp" />
              <img src={project.fallback || project.image} alt={project.title} width={900} height={455} loading="lazy" decoding="async" className="proj-img" style={{ opacity: imgLoaded ? 1 : 0, transition: "opacity 0.4s ease, transform 0.5s cubic-bezier(.22,1,.36,1)", transform: isHovered ? "scale(1.06)" : "scale(1)" }} onLoad={() => setImgLoaded(true)} />
            </picture>
            <div className="proj-img-overlay" />
            {isHovered && <div className="absolute inset-0 flex items-center justify-center z-20" style={{ background: "rgba(0,0,0,.25)" }}><span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500/90 text-white text-sm font-medium backdrop-blur-sm"><Eye className="w-4 h-4" /> View Live</span></div>}
          </div>
        </div>
        <div className="proj-content-pane">
          <div className="flex items-center gap-2 mb-4">
            <span className="proj-feat-badge"><Star className="w-3 h-3" /> Featured</span>
            <span className="proj-index-label">0{index + 1}</span>
          </div>
          <h3 className="proj-display text-2xl md:text-3xl font-black text-white leading-tight mb-3">{project.title}</h3>
          <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-light">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-8">
            {project.technologies.map((t) => (
              <span key={t} className="proj-tech-pill" onMouseEnter={e => { e.currentTarget.style.background = "rgba(13,148,136,.1)"; e.currentTarget.style.borderColor = "rgba(13,148,136,.25)"; e.currentTarget.style.color = "#5eead4"; }} onMouseLeave={e => { e.currentTarget.style.background = "rgba(30,41,59,.4)"; e.currentTarget.style.borderColor = "rgba(30,41,59,.45)"; e.currentTarget.style.color = "#64748b"; }}>{t}</span>
            ))}
          </div>
          <div className="flex gap-3">
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="proj-btn-primary" onMouseEnter={e => { e.currentTarget.style.background = "rgba(13,148,136,.18)"; e.currentTarget.style.borderColor = "rgba(13,148,136,.45)"; }} onMouseLeave={e => { e.currentTarget.style.background = "rgba(13,148,136,.08)"; e.currentTarget.style.borderColor = "rgba(13,148,136,.2)"; }}><ExternalLink className="w-4 h-4" />Live Demo</a>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="proj-btn-ghost" onMouseEnter={e => { e.currentTarget.style.background = "rgba(30,41,59,.85)"; e.currentTarget.style.borderColor = "rgba(100,116,139,.5)"; e.currentTarget.style.color = "#d4d8df"; }} onMouseLeave={e => { e.currentTarget.style.background = "rgba(30,41,59,.4)"; e.currentTarget.style.borderColor = "rgba(71,85,109,.4)"; e.currentTarget.style.color = "#64748b"; }}><Github className="w-4 h-4" />Code</a>
          </div>
        </div>
      </div>
    </div>
  );
}

function SmallCard({ project }) {
  const [ref, visible] = useCardReveal(0);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div ref={ref} className="proj-small-card" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)", transition: "opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1)" }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="proj-shimmer" />
      <div className="proj-small-img-wrap">
        <div className="proj-small-browser">
          <span className="proj-browser-dot" style={{ background: "#ef4444", width: 7, height: 7 }} />
          <span className="proj-browser-dot" style={{ background: "#eab308", width: 7, height: 7 }} />
          <span className="proj-browser-dot" style={{ background: "#22c55e", width: 7, height: 7 }} />
          <span className="ml-2 text-[10px] text-zinc-500 truncate font-mono hidden sm:inline">{project.liveUrl.replace("https://", "").replace("http://", "").replace(/\/$/, "").slice(0, 22) || "preview"}</span>
        </div>
        <div className="proj-small-img-area">
          <picture>
            <source srcSet={project.image} type="image/webp" />
            <img src={project.fallback || project.image} alt={project.title} width={900} height={562} loading="lazy" decoding="async" className="proj-small-img" style={{ opacity: imgLoaded ? 1 : 0, transition: "opacity 0.4s ease, transform 0.5s cubic-bezier(.22,1,.36,1)", transform: isHovered ? "scale(1.08)" : "scale(1)" }} onLoad={() => setImgLoaded(true)} />
          </picture>
          <div className="proj-small-img-overlay" />
        </div>
      </div>
      <div className="p-5">
        <h3 className="proj-display text-base font-bold text-white mb-2 leading-snug">{project.title}</h3>
        <p className="text-zinc-500 text-xs leading-relaxed mb-4 font-light">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.technologies.slice(0, 3).map((t) => <span key={t} className="proj-tech-pill-sm">{t}</span>)}
          {project.technologies.length > 3 && <span className="proj-tech-pill-sm proj-tech-overflow">+{project.technologies.length - 3}</span>}
        </div>
        <div className="flex gap-2">
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="proj-btn-sm-primary flex-1" onMouseEnter={e => { e.currentTarget.style.background = "rgba(13,148,136,.12)"; e.currentTarget.style.borderColor = "rgba(13,148,136,.35)"; }} onMouseLeave={e => { e.currentTarget.style.background = "rgba(13,148,136,.05)"; e.currentTarget.style.borderColor = "rgba(13,148,136,.15)"; }}><ExternalLink className="w-3 h-3" />Demo</a>
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="proj-btn-sm-ghost flex-1" onMouseEnter={e => { e.currentTarget.style.background = "rgba(30,41,59,.8)"; e.currentTarget.style.borderColor = "rgba(100,116,139,.45)"; e.currentTarget.style.color = "#d4d8df"; }} onMouseLeave={e => { e.currentTarget.style.background = "rgba(30,41,59,.4)"; e.currentTarget.style.borderColor = "rgba(71,85,109,.35)"; e.currentTarget.style.color = "#64748b"; }}><Github className="w-3 h-3" />Code</a>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [ref, sectionVisible] = useReveal(0.05);

  const projects = [
    { title: "Back Office Software", description: "Complete back office software for tracking mutual investment on the share market.", image: p1, fallback: p1Png, technologies: ["Django", "Django REST", "Redis", "React", "Tailwind"], liveUrl: "https://fast-inv-ltd.netlify.app/", githubUrl: "https://github.com/jalis55/FastInvestment-BOS", featured: true },
    { title: "E-Commerce Platform", description: "Full-stack e-commerce with real-time inventory, payments, and admin dashboard.", image: p3, fallback: p3Png, technologies: ["Django", "JavaScript", "PostgreSQL", "Bootstrap"], liveUrl: "https://khamari-bazar.onrender.com/", githubUrl: "https://github.com/jalis55/khamari-bazar", featured: true },
    { title: "Lunch Booking System", description: "Complete solution for managing lunch distributions and reducing wastage.", image: p2, fallback: p2Png, technologies: ["Django", "Django REST", "React", "Tailwind"], liveUrl: "#", githubUrl: "https://github.com/jalis55/reservation-app", featured: true },
    { title: "ATS Checker", description: "LLM-based application to check ATS score and recommend resume improvements.", image: p4, fallback: p4Png, technologies: ["Python", "Streamlit", "GROQ", "LangChain"], liveUrl: "https://ats-checker55.streamlit.app/", githubUrl: "https://github.com/jalis55/LLM--ATS-Checker", featured: false },
    { title: "PricePulse", description: "LLM-based app to track DSE prices via a chat interface.", image: p5, fallback: p5Png, technologies: ["Python", "Streamlit", "GROQ", "LangChain", "PostgreSQL"], liveUrl: "https://pricepulse-dse.streamlit.app/", githubUrl: "https://github.com/jalis55/LLM-PricePulse", featured: false },
  ];

  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <>
      <style>{`
        @keyframes slide-up { from{ opacity:0; transform:translateY(40px) } to{ opacity:1; transform:translateY(0) } }
        @keyframes shimmer-move { 0%{ background-position:-200% center } 100%{ background-position:200% center } }

        .proj-section { position:relative; padding:6rem 0; background:#020617; overflow:hidden; }
        .proj-grid { background-image: linear-gradient(to right, rgba(13,148,136,.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(13,148,136,.02) 1px, transparent 1px); background-size: 50px 50px; }

        .proj-featured-card { position:relative; border-radius:20px; background:rgba(15,23,42,.45); border:1px solid rgba(30,41,59,.4); backdrop-filter:blur(16px); overflow:hidden; transition:border-color .25s, box-shadow .25s; }
        .proj-featured-inner { display:grid; grid-template-columns:1fr; }
        @media(min-width:1024px) { .proj-featured-inner { grid-template-columns:1fr 1fr; } .proj-reversed .proj-img-pane { order:2; } .proj-reversed .proj-content-pane { order:1; } }

        .proj-shimmer { position:absolute; top:0; left:0; right:0; height:1px; background:linear-gradient(90deg, transparent, rgba(13,148,136,.3), rgba(20,184,166,.2), transparent); opacity:0; transition:opacity .3s; z-index:2; }
        .proj-featured-card:hover .proj-shimmer, .proj-small-card:hover .proj-shimmer { opacity:1; }

        .proj-img-pane { position:relative; overflow:hidden; background:#0f172a; min-height:240px; display:flex; flex-direction:column; }
        @media(min-width:1024px) { .proj-img-pane { min-height:360px; } }
        .proj-browser-bar { height:30px; display:flex; align-items:center; gap:6px; padding:0 14px; background:rgba(30,41,59,.95); border-bottom:1px solid rgba(30,41,59,.4); flex-shrink:0; }
        .proj-browser-dot { width:9px; height:9px; border-radius:9999px; }
        .proj-img-wrap { position:relative; flex:1; overflow:hidden; background:#020617; }
        .proj-img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:top center; transition:transform .55s cubic-bezier(.22,1,.36,1); background:#0f172a; }
        .proj-img-overlay { position:absolute; inset:0; background:linear-gradient(to bottom, transparent 65%, rgba(15,23,42,.2) 100%); pointer-events:none; }

        .proj-content-pane { padding:28px 24px; display:flex; flex-direction:column; justify-content:center; }
        @media(max-width:1023px) { .proj-content-pane { padding:24px; } }

        .proj-feat-badge { display:inline-flex; align-items:center; gap:4px; padding:2px 8px; border-radius:99px; font-size:10px; font-weight:500; background:rgba(13,148,136,.1); border:1px solid rgba(13,148,136,.18); color:#5eead4; }
        .proj-index-label { font-family:'Playfair Display',Georgia,serif; font-size:12px; font-weight:700; color:rgba(71,85,109,.5); }

        .proj-tech-pill { display:inline-flex; align-items:center; padding:3px 10px; border-radius:99px; font-size:11px; background:rgba(30,41,59,.4); border:1px solid rgba(30,41,59,.45); color:#64748b; transition:all .25s; cursor:default; }
        .proj-tech-pill:hover { transform:scale(1.05); background:rgba(13,148,136,.1); border-color:rgba(13,148,136,.25); color:#5eead4; }

        .proj-btn-primary { display:inline-flex; align-items:center; gap:6px; padding:8px 16px; border-radius:10px; font-size:12px; font-weight:500; background:rgba(13,148,136,.1); border:1px solid rgba(13,148,136,.25); color:#5eead4; text-decoration:none; transition:all .25s; }
        .proj-btn-ghost { display:inline-flex; align-items:center; gap:6px; padding:8px 16px; border-radius:10px; font-size:12px; font-weight:400; background:rgba(30,41,59,.4); border:1px solid rgba(71,85,109,.4); color:#64748b; text-decoration:none; transition:all .25s; }

        .proj-small-card { position:relative; border-radius:18px; background:rgba(15,23,42,.45); border:1px solid rgba(30,41,59,.4); backdrop-filter:blur(16px); overflow:hidden; transition:border-color .25s, box-shadow .25s, transform .28s cubic-bezier(.34,1.56,.64,1); display:flex; flex-direction:column; }
        .proj-small-img-wrap { position:relative; overflow:hidden; background:#0f172a; flex-shrink:0; display:flex; flex-direction:column; }
        .proj-small-browser { height:28px; display:flex; align-items:center; gap:5px; padding:0 12px; background:rgba(30,41,59,.95); border-bottom:1px solid rgba(30,41,59,.35); flex-shrink:0; }
        .proj-small-img-area { position:relative; aspect-ratio:16/10; overflow:hidden; background:#020617; }
        .proj-small-img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:top center; transition:transform .55s cubic-bezier(.22,1,.36,1), opacity .4s ease; background:#020617; }
        .proj-small-img-overlay { position:absolute; inset:0; background:linear-gradient(to bottom, transparent 55%, rgba(15,23,42,.4) 100%); pointer-events:none; }

        .proj-divider { height:1px; background:linear-gradient(90deg, transparent, rgba(13,148,136,.15), transparent); }
        .proj-tech-pill-sm { display:inline-flex; align-items:center; padding:1px 7px; border-radius:99px; font-size:10px; background:rgba(30,41,59,.35); border:1px solid rgba(30,41,59,.4); color:#64748b; }
        .proj-tech-overflow { color:#475569; }
      `}</style>

      <section id="projects" ref={ref} className="proj-section">
        <div className="proj-grid absolute inset-0 pointer-events-none" />
        <div className="absolute -top-32 right-1/3 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, rgba(13,148,136,.04), transparent 70%)" }} />
        <div className="absolute bottom-1/4 left-1/4 w-[350px] h-[350px] rounded-full blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, rgba(245,158,11,.03), transparent 70%)" }} />

        <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-16">
          <div className={`text-center mb-16 ${sectionVisible ? "animate-[slide-up_1s_cubic-bezier(.22,1,.36,1)_0.2s_both]" : "opacity-0"}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-900/30 bg-emerald-950/30 backdrop-blur-sm mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[10px] text-emerald-400/50 tracking-[0.2em] uppercase">What I've built</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #0d9488, #14b8a6, #f59e0b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Featured Projects</span>
            </h2>
            <p className="text-zinc-500 max-w-xl mx-auto text-sm md:text-base leading-relaxed font-light mt-4">A showcase of recent work demonstrating expertise across technologies.</p>
          </div>

          <div className={`space-y-8 mb-16 ${sectionVisible ? "" : "opacity-0"}`}>
            {featured.map((p, i) => (
              <FeaturedCard key={p.title} project={p} index={i} />
            ))}
          </div>

          {others.length > 0 && (
            <>
              <div className="proj-divider mb-12" />
              <div className="text-center mb-10">
                <h3 className="text-2xl md:text-3xl font-bold text-white">Other <span style={{ backgroundImage: "linear-gradient(135deg, #0d9488, #f59e0b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Notable Work</span></h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {others.map((p) => (
                  <SmallCard key={p.title} project={p} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}

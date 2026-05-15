import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github, Star } from "lucide-react";

import p1 from './project_images/bos.png';
import p2 from './project_images/reserva.png';
import p3 from './project_images/kb.png';
import p4 from './project_images/ats.png';
import p5 from './project_images/pricepulse.png';

function useReveal(threshold = 0.08) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
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
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setVisible(true), delay); obs.disconnect(); } },
      { threshold: 0.10 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return [ref, visible];
}

/* ── Featured project row ── */
function FeaturedCard({ project, index }) {
  const [ref, visible] = useCardReveal(index * 100);
  const isReversed = index % 2 !== 0;
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div
      ref={ref}
      className="proj-featured-card"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 0.72s cubic-bezier(.22,1,.36,1), transform 0.72s cubic-bezier(.22,1,.36,1)",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = "rgba(56,189,248,.32)";
        e.currentTarget.style.boxShadow = "0 28px 56px rgba(56,189,248,.08)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "rgba(51,65,85,.50)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* shimmer top border */}
      <div className="proj-shimmer" />

      <div className={`proj-featured-inner ${isReversed ? "proj-reversed" : ""}`}>

        {/* Image pane */}
        <div className="proj-img-pane">
          <div className="proj-img-wrap">
            <img
              src={project.image}
              alt={project.title}
              className="proj-img"
              style={{ opacity: imgLoaded ? 1 : 0, transition: "opacity 0.4s ease" }}
              onLoad={() => setImgLoaded(true)}
            />
            {/* overlay gradient */}
            <div className="proj-img-overlay" />
          </div>
        </div>

        {/* Content pane */}
        <div className="proj-content-pane">
          <div className="flex items-center gap-2 mb-4">
            <span className="proj-feat-badge">
              <Star className="w-3 h-3" />
              Featured
            </span>
            <span className="proj-index-label">0{index + 1}</span>
          </div>

          <h3 className="proj-display text-2xl md:text-3xl font-black text-slate-100 leading-tight mb-3">
            {project.title}
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-6 font-light">
            {project.description}
          </p>

          {/* tech pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.technologies.map((t) => (
              <span
                key={t}
                className="proj-tech-pill"
                onMouseEnter={e => {
                  e.currentTarget.style.background = "rgba(56,189,248,.12)";
                  e.currentTarget.style.borderColor = "rgba(56,189,248,.38)";
                  e.currentTarget.style.color = "rgb(125,211,252)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "rgba(30,41,59,.60)";
                  e.currentTarget.style.borderColor = "rgba(51,65,85,.55)";
                  e.currentTarget.style.color = "rgba(148,163,184,1)";
                }}
              >{t}</span>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex gap-3">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="proj-btn-primary"
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(56,189,248,.28)";
                e.currentTarget.style.borderColor = "rgba(56,189,248,.60)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(56,189,248,.14)";
                e.currentTarget.style.borderColor = "rgba(56,189,248,.32)";
              }}
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="proj-btn-ghost"
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(30,41,59,.90)";
                e.currentTarget.style.borderColor = "rgba(100,116,139,.65)";
                e.currentTarget.style.color = "rgba(226,232,240,1)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(30,41,59,.50)";
                e.currentTarget.style.borderColor = "rgba(71,85,105,.50)";
                e.currentTarget.style.color = "rgba(148,163,184,1)";
              }}
            >
              <Github className="w-4 h-4" />
              Code
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Small project card ── */
function SmallCard({ project, index }) {
  const [ref, visible] = useCardReveal(index * 80);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div
      ref={ref}
      className="proj-small-card"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 0.68s cubic-bezier(.22,1,.36,1), transform 0.68s cubic-bezier(.22,1,.36,1)",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = "rgba(56,189,248,.30)";
        e.currentTarget.style.boxShadow = "0 20px 40px rgba(56,189,248,.07)";
        e.currentTarget.style.transform = "translateY(-6px)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "rgba(51,65,85,.50)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div className="proj-shimmer" />

      {/* image */}
      <div className="proj-small-img-wrap">
        <img
          src={project.image}
          alt={project.title}
          className="proj-small-img"
          style={{ opacity: imgLoaded ? 1 : 0, transition: "opacity 0.4s ease" }}
          onLoad={() => setImgLoaded(true)}
        />
        <div className="proj-small-img-overlay" />
        {/* hover zoom handled via CSS */}
      </div>

      <div className="p-5">
        <h3 className="proj-display text-base font-bold text-slate-100 mb-2 leading-snug">
          {project.title}
        </h3>
        <p className="text-slate-500 text-xs leading-relaxed mb-4 font-light">
          {project.description}
        </p>

        {/* tech pills — first 3 + overflow */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.technologies.slice(0, 3).map((t) => (
            <span key={t} className="proj-tech-pill-sm">{t}</span>
          ))}
          {project.technologies.length > 3 && (
            <span className="proj-tech-pill-sm proj-tech-overflow">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="proj-btn-sm-primary flex-1"
            onMouseEnter={e => {
              e.currentTarget.style.background = "rgba(56,189,248,.18)";
              e.currentTarget.style.borderColor = "rgba(56,189,248,.50)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "rgba(56,189,248,.08)";
              e.currentTarget.style.borderColor = "rgba(56,189,248,.22)";
            }}
          >
            <ExternalLink className="w-3 h-3" />
            Demo
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="proj-btn-sm-ghost flex-1"
            onMouseEnter={e => {
              e.currentTarget.style.background = "rgba(30,41,59,.90)";
              e.currentTarget.style.borderColor = "rgba(100,116,139,.60)";
              e.currentTarget.style.color = "rgba(226,232,240,1)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "rgba(30,41,59,.50)";
              e.currentTarget.style.borderColor = "rgba(71,85,105,.45)";
              e.currentTarget.style.color = "rgba(148,163,184,1)";
            }}
          >
            <Github className="w-3 h-3" />
            Code
          </a>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   Main Section
════════════════════════════════════════ */
export function Projects() {
  const [sectionRef, sectionVisible] = useReveal(0.05);

  const projects = [
    {
      title: "Back Office Software",
      description: "A complete back office software for tracking mutual investment on the share market.",
      image: p1,
      technologies: ["Django", "Django REST Framework", "Redis", "React", "Tailwind CSS"],
      liveUrl: "https://fast-inv-ltd.netlify.app/",
      githubUrl: "https://github.com/jalis55/FastInvestment-BOS",
      featured: true,
    },
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with real-time inventory management, payment processing, and admin dashboard.",
      image: p3,
      technologies: ["Django", "JavaScript", "PostgreSQL", "Bootstrap"],
      liveUrl: "https://khamari-bazar.onrender.com/",
      githubUrl: "https://github.com/jalis55/khamari-bazar",
      featured: true,
    },
    {
      title: "Lunch Booking System",
      description: "A complete solution for managing lunch distributions and reducing wastage within organizations.",
      image: p2,
      technologies: ["Django", "Django REST Framework", "React", "Tailwind CSS"],
      liveUrl: "#",
      githubUrl: "https://github.com/jalis55/reservation-app",
      featured: true,
    },
    {
      title: "ATS Checker",
      description: "LLM-based application to check ATS score and recommend targeted resume improvements.",
      image: p4,
      technologies: ["Python", "Streamlit", "GROQ", "LangChain"],
      liveUrl: "https://ats-checker55.streamlit.app/",
      githubUrl: "https://github.com/jalis55/LLM--ATS-Checker",
      featured: false,
    },
    {
      title: "PricePulse",
      description: "LLM-based app to track historical instrument prices on Dhaka Stock Exchange via a chat interface.",
      image: p5,
      technologies: ["Python", "Streamlit", "GROQ", "LangChain", "PostgreSQL"],
      liveUrl: "https://pricepulse-dse.streamlit.app/",
      githubUrl: "https://github.com/jalis55/LLM-PricePulse",
      featured: false,
    },
  ];

  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap');

        .proj-display { font-family: 'Playfair Display', Georgia, serif; }
        .proj-body    { font-family: 'DM Sans', sans-serif; }

        .proj-reveal {
          opacity: 0; transform: translateY(26px);
          transition: opacity 0.70s cubic-bezier(.22,1,.36,1), transform 0.70s cubic-bezier(.22,1,.36,1);
        }
        .proj-reveal.in { opacity: 1; transform: translateY(0); }
        .proj-d1 { transition-delay: 0.05s; }
        .proj-d2 { transition-delay: 0.16s; }

        /* ── eyebrow ── */
        .proj-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 5px 14px; border-radius: 99px;
          background: rgba(15,23,42,.80);
          border: 1px solid rgba(56,189,248,.22);
          backdrop-filter: blur(8px);
        }
        .proj-eyebrow-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: linear-gradient(135deg, #38bdf8, #818cf8);
        }

        /* ── featured card ── */
        .proj-featured-card {
          position: relative;
          border-radius: 20px;
          background: rgba(15,23,42,.65);
          border: 1px solid rgba(51,65,85,.50);
          backdrop-filter: blur(12px);
          overflow: hidden;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .proj-featured-inner {
          display: grid;
          grid-template-columns: 1fr;
        }
        @media (min-width: 1024px) {
          .proj-featured-inner { grid-template-columns: 1fr 1fr; }
          .proj-reversed .proj-img-pane  { order: 2; }
          .proj-reversed .proj-content-pane { order: 1; }
        }

        /* shimmer */
        .proj-shimmer {
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(56,189,248,.40), rgba(129,140,248,.28), transparent);
          opacity: 0; transition: opacity 0.3s ease; z-index: 2;
        }
        .proj-featured-card:hover .proj-shimmer,
        .proj-small-card:hover .proj-shimmer { opacity: 1; }

        /* image pane */
        .proj-img-pane { position: relative; overflow: hidden; min-height: 260px; }
        @media (min-width: 1024px) { .proj-img-pane { min-height: 360px; } }
        .proj-img-wrap { position: relative; width: 100%; height: 100%; min-height: inherit; }
        .proj-img {
          width: 100%; height: 100%; object-fit: cover;
          min-height: inherit;
          transition: transform 0.55s cubic-bezier(.22,1,.36,1);
        }
        .proj-featured-card:hover .proj-img { transform: scale(1.04); }
        .proj-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(15,23,42,.35) 0%, transparent 60%);
          pointer-events: none;
        }

        /* content pane */
        .proj-content-pane {
          padding: 32px 36px;
          display: flex; flex-direction: column; justify-content: center;
        }
        @media (max-width: 1023px) { .proj-content-pane { padding: 28px; } }

        /* featured badge */
        .proj-feat-badge {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 3px 10px; border-radius: 99px; font-size: 11px; font-weight: 500;
          background: rgba(56,189,248,.10); border: 1px solid rgba(56,189,248,.25);
          color: rgba(125,211,252,1);
          font-family: 'DM Sans', sans-serif;
        }
        .proj-index-label {
          font-family: 'Playfair Display', serif;
          font-size: 13px; font-weight: 700;
          color: rgba(71,85,105,.70);
        }

        /* tech pill */
        .proj-tech-pill {
          display: inline-flex; align-items: center;
          padding: 4px 12px; border-radius: 99px; font-size: 12px;
          background: rgba(30,41,59,.60);
          border: 1px solid rgba(51,65,85,.55);
          color: rgba(148,163,184,1);
          font-family: 'DM Sans', sans-serif;
          transition: background 0.2s ease, border-color 0.2s ease,
                      color 0.2s ease, transform 0.18s cubic-bezier(.34,1.56,.64,1);
          cursor: default;
        }
        .proj-tech-pill:hover { transform: scale(1.06); }

        .proj-tech-pill-sm {
          display: inline-flex; align-items: center;
          padding: 2px 9px; border-radius: 99px; font-size: 11px;
          background: rgba(30,41,59,.55);
          border: 1px solid rgba(51,65,85,.50);
          color: rgba(100,116,139,1);
          font-family: 'DM Sans', sans-serif;
        }
        .proj-tech-overflow { color: rgba(71,85,105,1); }

        /* buttons */
        .proj-btn-primary {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 10px 20px; border-radius: 12px; font-size: 13px; font-weight: 500;
          background: rgba(56,189,248,.14); border: 1px solid rgba(56,189,248,.32);
          color: rgba(125,211,252,1); text-decoration: none;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .proj-btn-ghost {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 10px 20px; border-radius: 12px; font-size: 13px; font-weight: 400;
          background: rgba(30,41,59,.50); border: 1px solid rgba(71,85,105,.50);
          color: rgba(148,163,184,1); text-decoration: none;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
        }

        .proj-btn-sm-primary {
          display: inline-flex; align-items: center; justify-content: center; gap: 5px;
          padding: 7px 12px; border-radius: 9px; font-size: 12px; font-weight: 500;
          background: rgba(56,189,248,.08); border: 1px solid rgba(56,189,248,.22);
          color: rgba(125,211,252,1); text-decoration: none;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .proj-btn-sm-ghost {
          display: inline-flex; align-items: center; justify-content: center; gap: 5px;
          padding: 7px 12px; border-radius: 9px; font-size: 12px; font-weight: 400;
          background: rgba(30,41,59,.50); border: 1px solid rgba(71,85,105,.45);
          color: rgba(148,163,184,1); text-decoration: none;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
        }

        /* ── small card ── */
        .proj-small-card {
          position: relative;
          border-radius: 18px;
          background: rgba(15,23,42,.65);
          border: 1px solid rgba(51,65,85,.50);
          backdrop-filter: blur(12px);
          overflow: hidden;
          transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.28s cubic-bezier(.34,1.56,.64,1);
        }
        .proj-small-img-wrap {
          position: relative; overflow: hidden; height: 180px;
        }
        .proj-small-img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.55s cubic-bezier(.22,1,.36,1);
        }
        .proj-small-card:hover .proj-small-img { transform: scale(1.06); }
        .proj-small-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 40%, rgba(15,23,42,.70) 100%);
          pointer-events: none;
        }

        /* ── section divider ── */
        .proj-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(148,163,184,.15), transparent);
        }

        /* ── grid bg ── */
        .proj-grid-bg {
          background-image:
            linear-gradient(to right,  #ffffff07 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff07 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>

      <section
        id="projects"
        ref={sectionRef}
        className="proj-body py-28 bg-slate-950 relative overflow-hidden"
      >
        {/* ambient orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-1/3 w-[500px] h-[500px] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(56,189,248,.07) 0%, transparent 70%)" }} />
          <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(192,132,252,.06) 0%, transparent 70%)" }} />
        </div>
        <div className="proj-grid-bg pointer-events-none absolute inset-0" />

        <div className="relative z-10 max-w-6xl mx-auto px-6">

          {/* ── Header ── */}
          <div className={`proj-reveal proj-d1 ${sectionVisible ? "in" : ""} text-center mb-16`}>
            <div className="proj-eyebrow mb-5 mx-auto w-fit">
              <span className="proj-eyebrow-dot" />
              <span className="text-xs text-slate-400 tracking-widest uppercase font-medium">
                What I've built
              </span>
            </div>
            <h2 className="proj-display text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-slate-100 to-slate-400">
                Featured{" "}
              </span>
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #38bdf8 0%, #818cf8 60%, #c084fc 100%)" }}>
                Projects
              </span>
            </h2>
            <p className="mt-5 text-slate-500 max-w-xl mx-auto text-sm md:text-base leading-relaxed font-light">
              A showcase of recent work demonstrating expertise across different technologies
              and problem domains — from fintech to AI tooling.
            </p>
          </div>

          {/* ── Featured rows ── */}
          <div className={`proj-reveal proj-d2 ${sectionVisible ? "in" : ""} space-y-8 mb-16`}>
            {featured.map((p, i) => (
              <FeaturedCard key={p.title} project={p} index={i} />
            ))}
          </div>

          {/* ── Other projects ── */}
          {others.length > 0 && (
            <>
              <div className="proj-divider mb-12" />
              <div className="text-center mb-10">
                <h3 className="proj-display text-2xl md:text-3xl font-bold text-slate-100">
                  Other{" "}
                  <span className="text-transparent bg-clip-text"
                    style={{ backgroundImage: "linear-gradient(135deg, #38bdf8, #818cf8)" }}>
                    Notable Work
                  </span>
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {others.map((p, i) => (
                  <SmallCard key={p.title} project={p} index={i} />
                ))}
              </div>
            </>
          )}

        </div>
      </section>
    </>
  );
}
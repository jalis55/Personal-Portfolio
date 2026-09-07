import { useEffect, useRef, useState } from "react";
import {
  Globe, Server, Terminal, Brain, BookOpen
} from "lucide-react";

function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, visible];
}

export function Skills() {
  const [sectionRef, sectionVisible] = useReveal(0.06);

  const skillCategories = [
    {
      title: "Frontend",
      icon: Globe,
      accent: "rgba(56,189,248,",   // sky
      skills: ["React", "TypeScript", "JavaScript", "Tailwind CSS", "HTML5", "CSS3"],
    },
    {
      title: "Backend",
      icon: Server,
      accent: "rgba(129,140,248,",  // indigo
      skills: ["Python", "Django", "FastAPI", "Flask", "PostgreSQL", "MongoDB", "Redis", "Celery"],
    },
    {
      title: "DevOps & Tools",
      icon: Terminal,
      accent: "rgba(192,132,252,",  // purple
      skills: ["Docker", "Git", "GitHub Actions"],
    },
    {
      title: "AI / ML",
      icon: Brain,
      accent: "rgba(56,189,248,",   // sky
      skills: [
        "Scikit-learn",
        "Regression & Classification",
        "Feature Engineering",
        "Model Evaluation",
        "LangChain",
        "RAG",
        "Prompt Engineering",
        "LLMs",
      ],
    },
  ];

  const learningSkills = ["AI/ML", "Data Engineering", "Kubernetes", "AWS"];

  return (
    <>
      <style>{`
        .sk-display { font-family: 'Playfair Display', Georgia, serif; }
        .sk-body    { font-family: 'DM Sans', sans-serif; }

        .sk-reveal {
          opacity: 0;
          transform: translateY(26px);
          transition: opacity 0.70s cubic-bezier(.22,1,.36,1),
                      transform 0.70s cubic-bezier(.22,1,.36,1);
        }
        .sk-reveal.in { opacity: 1; transform: translateY(0); }
        .sk-d1 { transition-delay: 0.05s; }
        .sk-d2 { transition-delay: 0.14s; }
        .sk-d3 { transition-delay: 0.22s; }
        .sk-d4 { transition-delay: 0.30s; }
        .sk-d5 { transition-delay: 0.38s; }
        .sk-d6 { transition-delay: 0.46s; }

        /* ── skill card ── */
        .sk-card {
          position: relative;
          border-radius: 18px;
          background: rgba(15,23,42,.65);
          border: 1px solid rgba(51,65,85,.50);
          backdrop-filter: blur(12px);
          overflow: hidden;
          transition: transform 0.28s cubic-bezier(.34,1.56,.64,1),
                      border-color 0.25s ease,
                      box-shadow 0.25s ease;
        }
        .sk-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .sk-card:hover { transform: translateY(-5px); }
        .sk-card:hover::before { opacity: 1; }

        /* card top glow patch */
        .sk-card-glow {
          position: absolute;
          top: -60px; left: -60px;
          width: 200px; height: 200px;
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }
        .sk-card:hover .sk-card-glow { opacity: 1; }

        /* ── skill pill ── */
        .sk-pill {
          display: inline-flex;
          align-items: center;
          padding: 4px 12px;
          border-radius: 99px;
          font-size: 12px;
          font-weight: 400;
          letter-spacing: 0.01em;
          background: rgba(30,41,59,.60);
          border: 1px solid rgba(51,65,85,.55);
          color: rgba(148,163,184,1);
          transition: background 0.2s ease, border-color 0.2s ease,
                      color 0.2s ease, transform 0.2s cubic-bezier(.34,1.56,.64,1);
          cursor: default;
        }
        .sk-pill:hover { transform: scale(1.06); }

        /* ── icon box ── */
        .sk-icon-box {
          width: 42px; height: 42px;
          border-radius: 11px;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.25s cubic-bezier(.34,1.56,.64,1);
          flex-shrink: 0;
        }
        .sk-card:hover .sk-icon-box { transform: scale(1.1) rotate(-5deg); }

        /* ── always learning card ── */
        .sk-learning-card {
          position: relative;
          border-radius: 20px;
          background: rgba(15,23,42,.55);
          border: 1px solid rgba(51,65,85,.45);
          backdrop-filter: blur(14px);
          overflow: hidden;
        }
        .sk-learning-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(56,189,248,.35), rgba(129,140,248,.25), transparent);
        }

        /* ── learning pill ── */
        .sk-lpill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 16px;
          border-radius: 99px;
          font-size: 13px;
          background: rgba(56,189,248,.08);
          border: 1px solid rgba(56,189,248,.25);
          color: rgba(125,211,252,1);
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s cubic-bezier(.34,1.56,.64,1);
          cursor: default;
        }
        .sk-lpill:hover {
          background: rgba(56,189,248,.15);
          border-color: rgba(56,189,248,.50);
          transform: scale(1.07);
        }
        .sk-lpill-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #38bdf8;
          animation: lpulse 2s ease-in-out infinite;
        }
        @keyframes lpulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.5; transform: scale(0.8); }
        }

        /* eyebrow */
        .sk-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 5px 14px; border-radius: 99px;
          background: rgba(15,23,42,.80);
          border: 1px solid rgba(56,189,248,.22);
          backdrop-filter: blur(8px);
        }
        .sk-eyebrow-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: linear-gradient(135deg, #38bdf8, #818cf8);
        }

        .sk-grid-bg {
          background-image:
            linear-gradient(to right,  #ffffff07 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff07 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>

      <section
        id="skills"
        ref={sectionRef}
        className="sk-body py-28 bg-slate-950 relative overflow-hidden"
      >
        {/* ambient orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/3 w-[480px] h-[480px] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(56,189,248,.07) 0%, transparent 70%)" }} />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(192,132,252,.07) 0%, transparent 70%)" }} />
        </div>

        {/* grid */}
        <div className="sk-grid-bg pointer-events-none absolute inset-0" />

        <div className="relative z-10 max-w-6xl mx-auto px-6">

          {/* ── Header ── */}
          <div className={`sk-reveal sk-d1 ${sectionVisible ? "in" : ""} text-center mb-16`}>
            <div className="sk-eyebrow mb-5 mx-auto w-fit">
              <span className="sk-eyebrow-dot" />
              <span className="text-xs text-slate-400 tracking-widest uppercase font-medium">
                What I work with
              </span>
            </div>
            <h2 className="sk-display text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-slate-100 to-slate-400">
                Skills &{" "}
              </span>
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #38bdf8 0%, #818cf8 60%, #c084fc 100%)" }}>
                Technologies
              </span>
            </h2>
            <p className="mt-5 text-slate-500 max-w-xl mx-auto text-sm md:text-base leading-relaxed font-light">
              A toolkit forged through years of hands-on experience and continuous learning
              in the ever-evolving tech landscape.
            </p>
          </div>

          {/* ── Skill cards 2×2 ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {skillCategories.map(({ title, icon: IconComponent, accent, skills }, i) => (
              <div
                key={title}
                className={`sk-reveal sk-d${i + 2} ${sectionVisible ? "in" : ""} sk-card p-7`}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${accent}0.38)`;
                  e.currentTarget.style.boxShadow = `0 24px 48px ${accent}0.10)`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "rgba(51,65,85,.50)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* top-left glow patch */}
                <div className="sk-card-glow"
                  style={{ background: `radial-gradient(circle, ${accent}0.18) 0%, transparent 70%)` }} />

                {/* card top border shimmer */}
                <div className="sk-card::before" />
                <div className="absolute top-0 left-0 right-0 h-px opacity-0 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${accent}0.50), transparent)` }}
                  ref={el => {
                    if (el) {
                      const card = el.closest(".sk-card");
                      if (card) {
                        card.addEventListener("mouseenter", () => el.style.opacity = "1");
                        card.addEventListener("mouseleave", () => el.style.opacity = "0");
                      }
                    }
                  }}
                />

                {/* header row */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="sk-icon-box"
                    style={{ background: `${accent}0.10)`, border: `1px solid ${accent}0.22)` }}>
                    <IconComponent className="w-5 h-5" style={{ color: `${accent}0.85)`.replace(/,[\d.]+\)$/, ")").replace("rgba", "rgb") }} />
                  </div>
                  <h3 className="sk-display text-lg font-bold text-slate-100">{title}</h3>
                  <span className="ml-auto text-xs text-slate-600 font-light tabular-nums">
                    {skills.length} skills
                  </span>
                </div>

                {/* pill cluster */}
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="sk-pill"
                      onMouseEnter={e => {
                        e.currentTarget.style.background = `${accent}0.12)`;
                        e.currentTarget.style.borderColor = `${accent}0.38)`;
                        e.currentTarget.style.color = `${accent}0.95)`.replace(/,[\d.]+\)$/, ")").replace("rgba", "rgb");
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = "rgba(30,41,59,.60)";
                        e.currentTarget.style.borderColor = "rgba(51,65,85,.55)";
                        e.currentTarget.style.color = "rgba(148,163,184,1)";
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ── Always Learning ── */}
          <div className={`sk-reveal sk-d6 ${sectionVisible ? "in" : ""} mt-10 sk-learning-card p-8 md:p-10 text-center`}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <BookOpen className="w-4 h-4 text-sky-400/70" />
              <p className="text-xs text-sky-400/70 tracking-widest uppercase font-medium">Always Learning</p>
            </div>
            <h3 className="sk-display text-2xl md:text-3xl font-bold text-slate-100 mb-3">
              Staying ahead of{" "}
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #38bdf8, #818cf8)" }}>
                the curve
              </span>
            </h3>
            <p className="text-slate-500 text-sm max-w-lg mx-auto mb-7 font-light leading-relaxed">
              Technology evolves rapidly — and so do I. Currently deepening expertise in
              AI/ML, data engineering, and advanced cloud architectures.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {learningSkills.map((tag) => (
                <span key={tag} className="sk-lpill">
                  <span className="sk-lpill-dot" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
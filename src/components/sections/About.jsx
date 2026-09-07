import { useEffect, useRef, useState } from "react";
import { Code, Lightbulb, Users, Zap } from "lucide-react";
import pp from "../../assets/imgg_tarif.png";
import ppWebp from "../../assets/imgg_tarif.webp";

/* ── Intersection Observer hook for scroll-triggered reveals ── */
function useReveal(threshold = 0.15) {
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

const About = () => {
  const [sectionRef, sectionVisible] = useReveal(0.08);

  const highlights = [
    {
      icon: Code,
      title: "Clean Code",
      description: "Writing maintainable, scalable, and efficient code that stands the test of time.",
      accent: "rgba(56,189,248,",   // sky
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Always exploring new technologies and methodologies to solve complex problems.",
      accent: "rgba(129,140,248,",  // indigo
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Working effectively with cross-functional teams to deliver exceptional results.",
      accent: "rgba(192,132,252,",  // purple
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Optimizing applications for speed, accessibility, and user experience.",
      accent: "rgba(56,189,248,",   // sky
    },
  ];

  return (
    <>
      <style>{`
        .about-display { font-family: 'Playfair Display', Georgia, serif; }
        .about-body    { font-family: 'DM Sans', sans-serif; }

        /* ── scroll reveal ── */
        .about-reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.72s cubic-bezier(.22,1,.36,1),
                      transform 0.72s cubic-bezier(.22,1,.36,1);
        }
        .about-reveal.in { opacity: 1; transform: translateY(0); }
        .about-d1 { transition-delay: 0.05s; }
        .about-d2 { transition-delay: 0.14s; }
        .about-d3 { transition-delay: 0.23s; }
        .about-d4 { transition-delay: 0.32s; }
        .about-d5 { transition-delay: 0.41s; }
        .about-d6 { transition-delay: 0.50s; }
        .about-d7 { transition-delay: 0.59s; }

        /* ── highlight card ── */
        .hl-card {
          position: relative;
          border-radius: 16px;
          background: rgba(15,23,42,.65);
          border: 1px solid rgba(51,65,85,.50);
          backdrop-filter: blur(10px);
          transition: transform 0.28s cubic-bezier(.34,1.56,.64,1),
                      border-color 0.25s ease,
                      box-shadow 0.25s ease;
          overflow: hidden;
        }
        .hl-card::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: inherit;
        }
        .hl-card:hover { transform: translateY(-6px); }
        .hl-card:hover::before { opacity: 1; }

        /* ── icon pill ── */
        .icon-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 48px; height: 48px;
          border-radius: 12px;
          transition: transform 0.25s cubic-bezier(.34,1.56,.64,1);
        }
        .hl-card:hover .icon-pill { transform: scale(1.12) rotate(-4deg); }

        /* ── photo frame ── */
        .photo-frame {
          position: relative;
          display: inline-block;
          width: 260px;
          aspect-ratio: 3 / 4;
          border-radius: 18px;
          overflow: hidden;
          background: rgba(15,23,42,.8);
        }
        .photo-frame::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 18px;
          background: linear-gradient(135deg, rgba(56,189,248,.5), rgba(129,140,248,.3), rgba(192,132,252,.2));
          z-index: 0;
        }
        .photo-frame picture,
        .photo-frame img {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 12%;
          border-radius: 16px;
          display: block;
        }
        .photo-glow {
          position: absolute;
          inset: -40px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(56,189,248,.12) 0%, transparent 65%);
          z-index: 0;
          pointer-events: none;
        }

        /* ── section eyebrow ── */
        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 5px 14px;
          border-radius: 99px;
          background: rgba(15,23,42,.80);
          border: 1px solid rgba(56,189,248,.22);
          backdrop-filter: blur(8px);
        }
        .eyebrow-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: linear-gradient(135deg, #38bdf8, #818cf8);
        }

        /* ── hair line ── */
        .hair-line-v {
          width: 1px;
          background: linear-gradient(180deg, transparent, rgba(148,163,184,.20), transparent);
          align-self: stretch;
        }

        /* ── journey block ── */
        .journey-block {
          background: rgba(15,23,42,.50);
          border: 1px solid rgba(51,65,85,.45);
          border-radius: 20px;
          backdrop-filter: blur(12px);
          overflow: hidden;
          position: relative;
        }
        .journey-block::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(56,189,248,.35), rgba(129,140,248,.25), transparent);
        }

        /* ── stat chip ── */
        .stat-chip {
          padding: 10px 20px;
          border-radius: 12px;
          background: rgba(15,23,42,.70);
          border: 1px solid rgba(51,65,85,.50);
          backdrop-filter: blur(8px);
          text-align: center;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }
        .stat-chip:hover {
          border-color: rgba(56,189,248,.35);
          transform: translateY(-2px);
        }

        /* ── grid background ── */
        .about-grid-bg {
          background-image:
            linear-gradient(to right,  #ffffff07 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff07 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>

      <section
        id="about"
        ref={sectionRef}
        className="about-body py-28 bg-slate-950 relative overflow-hidden"
      >
        {/* ambient orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(99,102,241,.08) 0%, transparent 70%)" }} />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(14,165,233,.07) 0%, transparent 70%)" }} />
        </div>

        {/* grid */}
        <div className="about-grid-bg pointer-events-none absolute inset-0" />

        <div className="relative z-10 max-w-6xl mx-auto px-6">

          {/* ── Section header ── */}
          <div className={`about-reveal about-d1 ${sectionVisible ? "in" : ""} text-center mb-16`}>
            <div className="eyebrow mb-5 mx-auto w-fit">
              <span className="eyebrow-dot" />
              <span className="text-xs text-slate-400 tracking-widest uppercase font-medium">
                Who I am
              </span>
            </div>
            <h2 className="about-display text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-slate-100 to-slate-400">
                About{" "}
              </span>
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #38bdf8 0%, #818cf8 60%, #c084fc 100%)" }}
              >
                Me
              </span>
            </h2>
            <p className="mt-5 text-slate-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-light">
              Full-stack developer with 3+ years building products that blend seamless UX with smart AI —
              from React interfaces to Python backends, Scikit-learn models to LangChain agents.
            </p>
          </div>

          {/* ── Highlight cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {highlights.map(({ icon: IconComponent, title, description, accent }, i) => (
              <div
                key={title}
                className={`about-reveal about-d${i + 2} ${sectionVisible ? "in" : ""} hl-card p-6`}
                style={{ "--hover-shadow": `0 20px 40px ${accent}0.15)` }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${accent}0.40)`;
                  e.currentTarget.style.boxShadow = `0 20px 40px ${accent}0.12)`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "rgba(51,65,85,.50)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  className="icon-pill mb-4"
                  style={{
                    background: `${accent}0.10)`,
                    border: `1px solid ${accent}0.22)`,
                  }}
                >
                  <IconComponent className="w-5 h-5" style={{ color: `${accent}0.90)`.replace("rgba(", "rgb(").replace(/,[\d.]+\)$/, ")") }} />
                </div>
                <h3 className="text-base font-semibold text-slate-100 mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-light">{description}</p>
              </div>
            ))}
          </div>

          {/* ── Journey block ── */}
          <div className={`about-reveal about-d6 ${sectionVisible ? "in" : ""} journey-block p-8 md:p-12`}>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">

              {/* Text side */}
              <div className="lg:col-span-3 space-y-8">
                <div>
                  <p className="text-xs text-sky-400/70 tracking-widest uppercase font-medium mb-3">
                    My Journey
                  </p>
                  <h3 className="about-display text-2xl md:text-3xl font-bold text-slate-100 leading-snug">
                    Turning bold ideas{" "}
                    <span className="text-transparent bg-clip-text"
                      style={{ backgroundImage: "linear-gradient(135deg, #38bdf8, #818cf8)" }}>
                      into reality
                    </span>
                  </h3>
                </div>

                <div className="space-y-4 text-slate-400 text-sm md:text-base leading-relaxed font-light">
                  <p>
                    I started coding in college, sparked by a simple Python script that automated my study notes,
                    and quickly fell in love with crafting digital solutions that solve real problems. What began
                    as curiosity evolved into a career blending full-stack development with AI innovation.
                  </p>
                  <p>
                    Today I build scalable apps using React.js for dynamic frontends, Python with Django or
                    FastAPI for robust backends, and integrate AI/ML tools like Scikit-learn and LangChain to
                    power intelligent features — all deployed via Docker and GitHub Actions.
                  </p>
                  <p>
                    When I'm not coding, I'm contributing to open-source projects, mentoring aspiring devs, or
                    diving into the latest in LLMs and prompt engineering.
                  </p>
                </div>

                {/* Stats row */}
                <div className="flex flex-wrap gap-3 pt-2">
                  {[
                    { value: "3+", label: "Years exp." },
                    { value: "20+", label: "Projects" },
                    { value: "10+", label: "Clients" },
                  ].map(({ value, label }) => (
                    <div key={label} className="stat-chip">
                      <div
                        className="about-display text-xl font-black text-transparent bg-clip-text"
                        style={{ backgroundImage: "linear-gradient(135deg, #38bdf8, #818cf8)" }}
                      >
                        {value}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5 font-light">{label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* divider */}
              <div className="hidden lg:flex justify-center">
                <div className="hair-line-v" />
              </div>

              {/* Photo side */}
              <div className={`about-reveal about-d7 ${sectionVisible ? "in" : ""} lg:col-span-1 flex justify-center relative`}>
                <div className="photo-glow" />
                <div className="photo-frame">
                  <picture>
                    <source srcSet={ppWebp} type="image/webp" />
                    <img
                      src={pp}
                      alt="Jalis Mahamud Tarif — Full-Stack Developer"
                      width={480}
                      height={640}
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                    />
                  </picture>
                  {/* floating badge */}
                  <div
                    className="absolute -bottom-4 -right-4 px-3 py-2 rounded-xl text-xs font-medium text-slate-200 flex items-center gap-2 z-10"
                    style={{
                      background: "rgba(15,23,42,.90)",
                      border: "1px solid rgba(56,189,248,.30)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <span className="w-2 h-2 rounded-full bg-green-400"
                      style={{ boxShadow: "0 0 0 3px rgba(74,222,128,.2)" }} />
                    Open to work
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default About;
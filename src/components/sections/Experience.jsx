import { useEffect, useRef, useState } from "react";
import { Calendar, MapPin, Award, GraduationCap, ChevronDown } from "lucide-react";

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

/* individual card reveal */
function useCardReveal(delay = 0) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setVisible(true), delay); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return [ref, visible];
}

function ExperienceCard({ exp, index }) {
  const [ref, visible] = useCardReveal(index * 120);
  const [expanded, setExpanded] = useState(index === 0);
  const isLeft = index % 2 === 0;

  const isCurrent = index === 0;

  return (
    <div
      ref={ref}
      className="exp-card-wrap"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 0.70s cubic-bezier(.22,1,.36,1), transform 0.70s cubic-bezier(.22,1,.36,1)",
      }}
    >
      {/* timeline dot */}
      <div className="exp-dot-wrap">
        <div className={`exp-dot ${isCurrent ? "exp-dot-active" : ""}`} />
      </div>

      {/* card */}
      <div
        className={`exp-card ${isLeft ? "exp-left" : "exp-right"}`}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = "rgba(56,189,248,.35)";
          e.currentTarget.style.boxShadow = "0 24px 48px rgba(56,189,248,.08)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = "rgba(51,65,85,.50)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {/* shimmer top border */}
        <div className="exp-card-shimmer" />

        {/* header */}
        <div
          className="exp-card-header"
          onClick={() => setExpanded(x => !x)}
          style={{ cursor: "pointer" }}
        >
          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="exp-display text-lg font-bold text-slate-100 leading-tight">
                {exp.title}
              </h3>
              {isCurrent && (
                <span className="exp-current-badge">
                  <span className="exp-current-dot" />
                  Current
                </span>
              )}
            </div>
            <p className="text-sky-400/90 text-sm font-medium">{exp.company}</p>
            <div className="flex flex-wrap items-center gap-3 mt-1">
              <span className="exp-meta-chip">
                <Calendar className="w-3 h-3" />
                {exp.period}
              </span>
              <span className="exp-meta-chip">
                <MapPin className="w-3 h-3" />
                {exp.location}
              </span>
            </div>
          </div>
          <ChevronDown
            className="w-4 h-4 text-slate-500 shrink-0 mt-1 transition-transform duration-300"
            style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </div>

        {/* expandable body */}
        <div
          className="exp-card-body"
          style={{
            maxHeight: expanded ? "600px" : "0px",
            opacity: expanded ? 1 : 0,
            overflow: "hidden",
            transition: "max-height 0.45s cubic-bezier(.22,1,.36,1), opacity 0.35s ease",
          }}
        >
          <div style={{ paddingTop: "16px", borderTop: "1px solid rgba(51,65,85,.40)", marginTop: "16px" }}>
            <p className="text-slate-400 text-sm leading-relaxed mb-5 font-light">
              {exp.description}
            </p>

            {/* achievements */}
            <div className="mb-5">
              <p className="text-xs text-slate-500 tracking-widest uppercase font-medium mb-3">
                Key Achievements
              </p>
              <ul className="space-y-2">
                {exp.achievements.map((ach, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-400 font-light">
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: "linear-gradient(135deg, #38bdf8, #818cf8)" }}
                    />
                    {ach}
                  </li>
                ))}
              </ul>
            </div>

            {/* technologies */}
            <div>
              <p className="text-xs text-slate-500 tracking-widest uppercase font-medium mb-3">
                Technologies
              </p>
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="exp-tech-pill"
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
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Experience() {
  const [sectionRef, sectionVisible] = useReveal(0.05);

  const experiences = [
    {
      title: "Senior Software Engineer",
      company: "Leadsoft Bangladesh Limited",
      location: "Dhaka, Bangladesh",
      period: "Jan 2025 – September 2025",
      description:
        "Led cross-functional teams to resolve complex customer operations issues and collaborated with stakeholders to translate business requirements into technical specifications. Mentored junior engineers and optimized backend processes to boost support efficiency.",
      achievements: [
        "Mentored junior engineers and conducted code reviews to enforce best practices",
        "Optimized and automated SQL scripts and backend workflows, reducing response time significantly",
        "Ensured timely delivery of projects while minimizing business impact",
      ],
      technologies: ["Python", "SQL (MSSQL, MySQL)", "REST APIs", "Docker", "Mentorship", "Code Review"],
    },
    {
      title: "Software Engineer",
      company: "Leadsoft Bangladesh Limited",
      location: "Dhaka, Bangladesh",
      period: "Jun 2023 – Jan 2025",
      description:
        "Engaged with clients to analyze and implement tailored deployments. Handled complex operations issues ahead of deadlines while enhancing support with SQL tooling and API integrations.",
      achievements: [
        "Delivered custom deployments aligned with client needs",
        "Fixed critical operational issues before deadlines to maintain smooth operations",
        "Developed and improved SQL scripts to enhance customer support",
      ],
      technologies: ["SQL (MSSQL, MySQL)", "REST API integration", "Docker", "Client Analysis"],
    },
    {
      title: "Junior Software Engineer",
      company: "Leadsoft Bangladesh Limited",
      location: "Dhaka, Bangladesh",
      period: "Sep 2022 – Jun 2023",
      description:
        "Configured environments, deployed updates, and resolved SQL database errors for capital market clients. Customized report generation to enhance data accessibility and client satisfaction.",
      achievements: [
        "Deployed updates and fixed SQL database errors for seamless client operations",
        "Delivered customized reports tailored to customer requirements",
      ],
      technologies: ["SQL (MSSQL, MySQL)", "Report Customization", "Deployment Configuration"],
    },
  ];

  return (
    <>
      <style>{`
        .exp-display { font-family: 'Playfair Display', Georgia, serif; }
        .exp-body    { font-family: 'DM Sans', sans-serif; }

        .exp-reveal {
          opacity: 0; transform: translateY(26px);
          transition: opacity 0.70s cubic-bezier(.22,1,.36,1), transform 0.70s cubic-bezier(.22,1,.36,1);
        }
        .exp-reveal.in { opacity: 1; transform: translateY(0); }
        .exp-d1 { transition-delay: 0.05s; }
        .exp-d2 { transition-delay: 0.16s; }

        /* ── timeline layout ── */
        .exp-timeline {
          position: relative;
          padding: 0 0 0 36px;
        }
        @media (min-width: 768px) {
          .exp-timeline { padding: 0; }
        }

        /* vertical line */
        .exp-timeline::before {
          content: '';
          position: absolute;
          left: 12px; top: 12px; bottom: 12px; width: 1px;
          background: linear-gradient(180deg,
            rgba(56,189,248,.50) 0%,
            rgba(129,140,248,.30) 50%,
            transparent 100%
          );
        }
        @media (min-width: 768px) {
          .exp-timeline::before {
            left: 50%; transform: translateX(-50%);
          }
        }

        /* card wrapper */
        .exp-card-wrap {
          position: relative;
          margin-bottom: 40px;
        }
        @media (min-width: 768px) {
          .exp-card-wrap { display: flex; justify-content: flex-end; }
          .exp-card-wrap:nth-child(even) { justify-content: flex-start; }
        }

        /* dot */
        .exp-dot-wrap {
          position: absolute;
          left: -29px; top: 20px;
          display: flex; align-items: center; justify-content: center;
          width: 18px; height: 18px;
          z-index: 10;
        }
        @media (min-width: 768px) {
          .exp-dot-wrap {
            left: 50%; top: 24px;
            transform: translateX(-50%);
          }
        }
        .exp-dot {
          width: 10px; height: 10px; border-radius: 50%;
          background: rgba(56,189,248,.40);
          border: 2px solid rgba(56,189,248,.60);
          transition: transform 0.2s ease;
        }
        .exp-dot-active {
          background: #38bdf8;
          border-color: #38bdf8;
          box-shadow: 0 0 0 4px rgba(56,189,248,.20), 0 0 12px rgba(56,189,248,.40);
          animation: dot-pulse 2.5s ease-in-out infinite;
        }
        @keyframes dot-pulse {
          0%,100% { box-shadow: 0 0 0 4px rgba(56,189,248,.20), 0 0 12px rgba(56,189,248,.40); }
          50%      { box-shadow: 0 0 0 7px rgba(56,189,248,.10), 0 0 20px rgba(56,189,248,.25); }
        }

        /* card */
        .exp-card {
          position: relative;
          border-radius: 18px;
          background: rgba(15,23,42,.65);
          border: 1px solid rgba(51,65,85,.50);
          backdrop-filter: blur(12px);
          padding: 24px;
          overflow: hidden;
          transition: border-color 0.25s ease, box-shadow 0.25s ease,
                      transform 0.28s cubic-bezier(.34,1.56,.64,1);
          width: 100%;
        }
        .exp-card:hover { transform: translateY(-3px); }
        @media (min-width: 768px) {
          .exp-card { width: calc(50% - 32px); }
          .exp-left  { margin-right: auto; }
          .exp-right { margin-left: auto; }
        }

        /* shimmer top border */
        .exp-card-shimmer {
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(56,189,248,.40), rgba(129,140,248,.30), transparent);
          opacity: 0; transition: opacity 0.3s ease;
        }
        .exp-card:hover .exp-card-shimmer { opacity: 1; }

        /* header */
        .exp-card-header {
          display: flex; align-items: flex-start; gap: 12px;
          user-select: none;
        }

        /* current badge */
        .exp-current-badge {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 2px 9px; border-radius: 99px; font-size: 11px; font-weight: 500;
          background: rgba(56,189,248,.10); border: 1px solid rgba(56,189,248,.28);
          color: rgba(125,211,252,1);
        }
        .exp-current-dot {
          width: 5px; height: 5px; border-radius: 50%; background: #38bdf8;
          animation: dot-pulse 2s ease-in-out infinite;
        }

        /* meta chips */
        .exp-meta-chip {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: 11px; color: rgba(100,116,139,1); font-weight: 300;
        }

        /* tech pill */
        .exp-tech-pill {
          display: inline-flex; align-items: center;
          padding: 3px 11px; border-radius: 99px; font-size: 11px;
          background: rgba(30,41,59,.60);
          border: 1px solid rgba(51,65,85,.55);
          color: rgba(148,163,184,1);
          transition: background 0.2s ease, border-color 0.2s ease,
                      color 0.2s ease, transform 0.2s cubic-bezier(.34,1.56,.64,1);
          cursor: default;
        }
        .exp-tech-pill:hover { transform: scale(1.05); }

        /* edu card */
        .exp-edu-card {
          border-radius: 18px;
          background: rgba(15,23,42,.60);
          border: 1px solid rgba(51,65,85,.45);
          backdrop-filter: blur(12px);
          padding: 28px;
          position: relative; overflow: hidden;
          transition: border-color 0.25s ease, transform 0.28s cubic-bezier(.34,1.56,.64,1);
        }
        .exp-edu-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(129,140,248,.35), transparent);
        }
        .exp-edu-card:hover {
          border-color: rgba(129,140,248,.35);
          transform: translateY(-4px);
        }

        /* eyebrow */
        .exp-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 5px 14px; border-radius: 99px;
          background: rgba(15,23,42,.80);
          border: 1px solid rgba(56,189,248,.22);
          backdrop-filter: blur(8px);
        }
        .exp-eyebrow-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: linear-gradient(135deg, #38bdf8, #818cf8);
        }

        .exp-grid-bg {
          background-image:
            linear-gradient(to right,  #ffffff07 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff07 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .hair-line-h {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(148,163,184,.15), transparent);
        }
      `}</style>

      <section
        id="experience"
        ref={sectionRef}
        className="exp-body py-28 bg-slate-950 relative overflow-hidden"
      >
        {/* ambient orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-0 w-[460px] h-[460px] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(56,189,248,.07) 0%, transparent 70%)" }} />
          <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(129,140,248,.07) 0%, transparent 70%)" }} />
        </div>
        <div className="exp-grid-bg pointer-events-none absolute inset-0" />

        <div className="relative z-10 max-w-6xl mx-auto px-6">

          {/* ── Header ── */}
          <div className={`exp-reveal exp-d1 ${sectionVisible ? "in" : ""} text-center mb-20`}>
            <div className="exp-eyebrow mb-5 mx-auto w-fit">
              <span className="exp-eyebrow-dot" />
              <span className="text-xs text-slate-400 tracking-widest uppercase font-medium">
                Career path
              </span>
            </div>
            <h2 className="exp-display text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-slate-100 to-slate-400">
                Professional{" "}
              </span>
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #38bdf8 0%, #818cf8 60%, #c084fc 100%)" }}>
                Experience
              </span>
            </h2>
            <p className="mt-5 text-slate-500 max-w-xl mx-auto text-sm md:text-base leading-relaxed font-light">
              A journey of growth, learning, and delivering impactful solutions
              across industries and collaborative team environments.
            </p>
          </div>

          {/* ── Timeline ── */}
          <div className={`exp-reveal exp-d2 ${sectionVisible ? "in" : ""} exp-timeline`}>
            {experiences.map((exp, i) => (
              <ExperienceCard key={i} exp={exp} index={i} />
            ))}
          </div>

          {/* ── Education ── */}
          <div className="mt-20">
            <div className="hair-line-h mb-14" />

            <div className="text-center mb-10">
              <div className="exp-eyebrow mb-4 mx-auto w-fit">
                <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs text-slate-400 tracking-widest uppercase font-medium">
                  Education
                </span>
              </div>
              <h3 className="exp-display text-2xl md:text-3xl font-bold text-slate-100">
                Education &{" "}
                <span className="text-transparent bg-clip-text"
                  style={{ backgroundImage: "linear-gradient(135deg, #38bdf8, #818cf8)" }}>
                  Certifications
                </span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
              {[
                {
                  icon: GraduationCap,
                  title: "Bachelor of Computer Science & Engineering",
                  meta: "North South University",
                  period: "2015 – 2020",
                  location: "Dhaka, Bangladesh",
                },
              ].map((edu) => (
                <div key={edu.title} className="exp-edu-card">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "rgba(129,140,248,.10)", border: "1px solid rgba(129,140,248,.22)" }}>
                      <edu.icon className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <h4 className="exp-display text-base font-bold text-slate-100 leading-snug mb-1">
                        {edu.title}
                      </h4>
                      <p className="text-sm text-indigo-400/80 font-medium mb-2">{edu.meta}</p>
                      <div className="flex flex-wrap gap-3">
                        <span className="exp-meta-chip">
                          <Calendar className="w-3 h-3" />{edu.period}
                        </span>
                        <span className="exp-meta-chip">
                          <MapPin className="w-3 h-3" />{edu.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
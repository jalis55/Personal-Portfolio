import { useEffect, useRef, useState } from "react";
import { ArrowDown, Download, Sparkles } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  FiverrIcon,
  Github01Icon,
  Linkedin02Icon,
} from "@hugeicons/core-free-icons";

/* ─────────────────────────────────────────
   Tiny hook: cycles through role strings
───────────────────────────────────────── */
function useTypedRole(roles, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIdx];
    let timeout;

    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIdx));
        setCharIdx((c) => c + 1);
      }, speed);
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIdx - 1));
        setCharIdx((c) => c - 1);
      }, speed / 2);
    } else {
      setDeleting(false);
      setRoleIdx((r) => (r + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, roleIdx, roles, speed, pause]);

  return display;
}

/* ─────────────────────────────────────────
   Main Component
───────────────────────────────────────── */
const Hero = () => {
  const sectionRef = useRef(null);
  const orbRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  const role = useTypedRole([
    "Full-Stack Developer",
    'Python Expert',
    "Problem Solver",
    "AI/ML Enthusiast",
    'Aspiring Data Engineer',
    "Clean Code Advocate",
  ]);

  const socialLinks = [
    {
      icon: Linkedin02Icon,
      label: "LinkedIn",
      href: "https://linkedin.com/in/jalismtarif/",
    },
    {
      icon: Github01Icon,
      label: "GitHub",
      href: "https://github.com/jalis55",
    },
    {
      icon: FiverrIcon,
      label: "Fiverr",
      href: "https://fiverr.com/jalis_tarif",
    },
  ];

  /* mount → stagger-in animation trigger */
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  /* cursor-tracked radial glow — rAF throttled */
  useEffect(() => {
    const section = sectionRef.current;
    const orb = orbRef.current;
    if (!section || !orb) return;
    let raf = 0;
    let mx = 0, my = 0;
    const handleMove = (e) => {
      const rect = section.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        orb.style.transform = `translate(${mx - 320}px, ${my - 320}px)`;
      });
    };
    section.addEventListener("mousemove", handleMove);
    return () => {
      section.removeEventListener("mousemove", handleMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <style>{`
        .hero-font-display { font-family: 'Playfair Display', Georgia, serif; }
        .hero-font-body    { font-family: 'DM Sans', sans-serif; }

        /* stagger helpers */
        .reveal {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.75s cubic-bezier(.22,1,.36,1),
                      transform 0.75s cubic-bezier(.22,1,.36,1);
        }
        .reveal.in {
          opacity: 1;
          transform: translateY(0);
        }
        .reveal-d1 { transition-delay: 0.10s; }
        .reveal-d2 { transition-delay: 0.22s; }
        .reveal-d3 { transition-delay: 0.36s; }
        .reveal-d4 { transition-delay: 0.50s; }
        .reveal-d5 { transition-delay: 0.64s; }
        .reveal-d6 { transition-delay: 0.78s; }

        /* cursor orb */
        .cursor-orb {
          position: absolute;
          width: 640px;
          height: 640px;
          border-radius: 9999px;
          background: radial-gradient(circle, rgba(56,189,248,.13) 0%, transparent 70%);
          pointer-events: none;
          transition: transform 0.18s ease-out;
          will-change: transform;
        }

        /* caret blink */
        .caret {
          display: inline-block;
          width: 2px;
          height: 1em;
          background: #38bdf8;
          margin-left: 3px;
          vertical-align: text-bottom;
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          0%,100%{ opacity:1 }
          50%    { opacity:0 }
        }

        /* social icon hover lift */
        .social-btn {
          transition: transform 0.2s cubic-bezier(.34,1.56,.64,1),
                      background 0.2s ease,
                      border-color 0.2s ease,
                      color 0.2s ease;
        }
        .social-btn:hover { transform: translateY(-4px) scale(1.12); }

        /* shimmer border on CTA */
        @keyframes border-spin {
          to { --angle: 360deg; }
        }

        /* noise texture overlay */
        .noise::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }

        /* divider line */
        .hair-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(148,163,184,.25), transparent);
        }

        /* pill status badge */
        .status-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #4ade80;
          box-shadow: 0 0 0 2px rgba(74,222,128,.3);
          animation: pulse-green 2s ease-in-out infinite;
        }
        @keyframes pulse-green {
          0%,100% { box-shadow: 0 0 0 2px rgba(74,222,128,.3); }
          50%      { box-shadow: 0 0 0 5px rgba(74,222,128,.1); }
        }

        /* scroll arrow bounce */
        @keyframes float-down {
          0%,100%{ transform: translateY(0); }
          50%    { transform: translateY(7px); }
        }
        .float-down { animation: float-down 2s ease-in-out infinite; }
      `}</style>

      <section
        ref={sectionRef}
        id="home"
        className="noise hero-font-body min-h-screen flex items-center justify-center relative isolate overflow-hidden bg-slate-950"
      >
        {/* ── Cursor-tracked glow ── */}
        <div ref={orbRef} className="cursor-orb" style={{ top: 0, left: 0 }} />

        {/* ── Static ambient orbs ── */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div
            className="absolute -top-24 -left-24 w-[520px] h-[520px] rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(14,165,233,.10) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(99,102,241,.10) 0%, transparent 70%)",
              animationDelay: "1.5s",
            }}
          />
        </div>

        {/* ── Fine grid ── */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff07_1px,transparent_1px),linear-gradient(to_bottom,#ffffff07_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* ── Horizon line ── */}
        <div className="pointer-events-none absolute left-0 right-0 top-1/2 hair-line opacity-40" />

        {/* ══════════════════════════════════ CONTENT ══════════════════════════════════ */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 text-center">

          {/* Status badge */}
          <div
            className={`reveal reveal-d1 ${mounted ? "in" : ""} inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-700/60 bg-slate-900/70 backdrop-blur-sm mb-8`}
          >
            <span className="status-dot" />
            <span className="text-xs text-slate-400 tracking-widest uppercase font-medium">
              Available for opportunities
            </span>
            <Sparkles className="w-3 h-3 text-sky-400" />
          </div>

          {/* Name */}
          <h1
            className={`reveal reveal-d2 ${mounted ? "in" : ""} hero-font-display text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]`}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-slate-50 via-slate-200 to-slate-500">
              Jalis Mahamud
            </span>
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #38bdf8 0%, #818cf8 60%, #c084fc 100%)",
              }}
            >
              Tarif
            </span>
          </h1>

          {/* Typed role */}
          <div
            className={`reveal reveal-d3 ${mounted ? "in" : ""} mt-5 h-8 flex items-center justify-center`}
          >
            <p className="text-lg md:text-xl text-slate-400 font-light tracking-wide">
              {role}
              <span className="caret" />
            </p>
          </div>

          {/* Divider */}
          <div
            className={`reveal reveal-d3 ${mounted ? "in" : ""} my-7 hair-line max-w-xs mx-auto`}
          />

          {/* Bio */}
          <p
            className={`reveal reveal-d4 ${mounted ? "in" : ""} text-slate-500 text-sm md:text-base max-w-lg mx-auto leading-relaxed font-light`}
          >
            Crafting exceptional digital experiences with modern technologies —
            AI, machine learning, and elegant architecture. Passionate about
            clean code and turning bold ideas into reality.
          </p>

          {/* CTA buttons */}
          <div
            className={`reveal reveal-d5 ${mounted ? "in" : ""} mt-10 flex flex-col sm:flex-row gap-3 justify-center items-center`}
          >
            {/* Primary */}
            <a
              href="#projects"
              className="group relative px-8 py-3.5 rounded-xl text-sm font-medium text-white overflow-hidden transition-all duration-300 inline-flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, rgba(56,189,248,.20), rgba(129,140,248,.20))",
                border: "1px solid rgba(56,189,248,.35)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(135deg, rgba(56,189,248,.32), rgba(129,140,248,.32))";
                e.currentTarget.style.borderColor = "rgba(56,189,248,.65)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(135deg, rgba(56,189,248,.20), rgba(129,140,248,.20))";
                e.currentTarget.style.borderColor = "rgba(56,189,248,.35)";
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                View My Work
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </a>

            {/* Secondary */}
            <a
              href="/[CV]Jalis_Mahamud_Tarif.pdf"
              download
              className="group px-8 py-3.5 rounded-xl text-sm font-medium text-slate-400 flex items-center gap-2 transition-all duration-300 hover:text-slate-100"
              style={{
                background: "rgba(30,41,59,.55)",
                border: "1px solid rgba(71,85,105,.50)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(30,41,59,.85)";
                e.currentTarget.style.borderColor = "rgba(100,116,139,.70)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(30,41,59,.55)";
                e.currentTarget.style.borderColor = "rgba(71,85,105,.50)";
              }}
            >
              <Download className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
              Resume
            </a>
          </div>

          {/* Social links */}
          <div
            className={`reveal reveal-d6 ${mounted ? "in" : ""} mt-10 flex justify-center items-center gap-3`}
          >
            {socialLinks.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="social-btn p-3 rounded-xl text-slate-500 hover:text-slate-100"
                style={{
                  background: "rgba(30,41,59,.50)",
                  border: "1px solid rgba(51,65,85,.55)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(30,41,59,.90)";
                  e.currentTarget.style.borderColor = "rgba(56,189,248,.40)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(30,41,59,.50)";
                  e.currentTarget.style.borderColor = "rgba(51,65,85,.55)";
                }}
              >
                <HugeiconsIcon className="w-[18px] h-[18px]" icon={s.icon} />
              </a>
            ))}

            <span className="mx-2 h-5 w-px bg-slate-700/60" />

            <a
              href="mailto:jm.tarif55@gmail.com"
              className="social-btn flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs text-slate-400 hover:text-sky-300 transition-colors"
              style={{
                background: "rgba(30,41,59,.50)",
                border: "1px solid rgba(51,65,85,.55)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(30,41,59,.90)";
                e.currentTarget.style.borderColor = "rgba(56,189,248,.40)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(30,41,59,.50)";
                e.currentTarget.style.borderColor = "rgba(51,65,85,.55)";
              }}
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Say hello
            </a>
          </div>
        </div>

        {/* ── Scroll indicator ── */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 float-down">
          <span className="text-[10px] text-slate-600 tracking-widest uppercase">
            scroll
          </span>
          <ArrowDown className="w-4 h-4 text-slate-600" />
        </div>
      </section>
    </>
  );
};

export default Hero;
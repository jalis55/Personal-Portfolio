import { useEffect, useRef, useState } from "react";
import { ArrowDown, Download, Sparkles } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { FiverrIcon, Github01Icon, Linkedin02Icon } from "@hugeicons/core-free-icons";

function useTypedRole(roles, speed = 70, pause = 2000) {
  const [display, setDisplay] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = roles[roleIdx];
    let timeout;
    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => { setDisplay(current.slice(0, charIdx)); setCharIdx((c) => c + 1); }, speed);
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => { setDisplay(current.slice(0, charIdx - 1)); setCharIdx((c) => c - 1); }, speed / 2);
    } else {
      setDeleting(false);
      setRoleIdx((r) => (r + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, roleIdx, roles, speed, pause]);
  return display;
}

export default function Hero() {
  const sectionRef = useRef(null);
  const orbRef = useRef(null);
  const role = useTypedRole([
    "Full-Stack Developer", "Python Expert", "Problem Solver", "AI/ML Enthusiast", "Data Engineer", "Clean Code Advocate",
  ]);

  const socialLinks = [
    { icon: Linkedin02Icon, label: "LinkedIn", href: "https://linkedin.com/in/jalismtarif/" },
    { icon: Github01Icon, label: "GitHub", href: "https://github.com/jalis55" },
    { icon: FiverrIcon, label: "Fiverr", href: "https://fiverr.com/jalis_tarif" },
  ];

  useEffect(() => { const t = setTimeout(() => {}, 100); return () => clearTimeout(t); }, []);
  useEffect(() => {
    const section = sectionRef.current;
    const orb = orbRef.current;
    if (!section || !orb) return;
    let raf = 0; let mx = 0, my = 0;
    const handleMove = (e) => {
      const rect = section.getBoundingClientRect();
      mx = e.clientX - rect.left; my = e.clientY - rect.top;
      if (raf) return;
      raf = requestAnimationFrame(() => { raf = 0; orb.style.transform = `translate(${mx - 400}px, ${my - 400}px)`; });
    };
    section.addEventListener("mousemove", handleMove);
    return () => { section.removeEventListener("mousemove", handleMove); if (raf) cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <style>{`
        @keyframes blink { 0%,100%{ opacity:1 } 50%{ opacity:0 } }
        @keyframes float-down { 0%,100%{ transform:translateY(0) } 50%{ transform:translateY(8px) } }
        @keyframes pulse-glow { 0%,100%{ box-shadow:0 0 0 2px rgba(13,148,136,.3) } 50%{ box-shadow:0 0 0 6px rgba(13,148,136,.1) } }
        @keyframes orbit { from{ transform:rotate(0deg) } to{ transform:rotate(360deg) } }
        @keyframes pulse-ring { 0%{ transform:scale(.8); opacity:.6 } 100%{ transform:scale(2); opacity:0 } }
        @keyframes slide-left { from{ opacity:0; transform:translateX(-60px) } to{ opacity:1; transform:translateX(0) } }
        @keyframes slide-right { from{ opacity:0; transform:translateX(60px) } to{ opacity:1; transform:translateX(0) } }
        @keyframes fade-up { from{ opacity:0; transform:translateY(40px) } to{ opacity:1; transform:translateY(0) } }

        .hero-title { animation: slide-left 1s cubic-bezier(.22,1,.36,1) 0.2s both; }
        .hero-role { animation: slide-right 1s cubic-bezier(.22,1,.36,1) 0.5s both; }
        .hero-bio { animation: fade-up 1s cubic-bezier(.22,1,.36,1) 0.8s both; }

        .caret { display:inline-block; width:2px; height:1em; background:#0d9488; margin-left:3px; vertical-align:text-bottom; animation:blink 1s step-end infinite; }
        .float-down { animation: float-down 2s ease-in-out infinite; }
        .status-dot { width:7px; height:7px; border-radius:50%; background:#0d9488; box-shadow:0 0 0 2px rgba(13,148,136,.3); animation:pulse-glow 2s ease-in-out infinite; }
        .cursor-orb { position:absolute; width:600px; height:600px; border-radius:9999px; background:radial-gradient(circle, rgba(13,148,136,.1) 0%, rgba(20,184,166,.05) 40%, transparent 70%); pointer-events:none; transition:transform .18s ease-out; will-change:transform; }

        .hero-grid { background-image: linear-gradient(to right, rgba(13,148,136,.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(13,148,136,.04) 1px, transparent 1px); background-size: 60px 60px; }
        .horizon-glow { height:1px; background:linear-gradient(90deg, transparent, rgba(13,148,136,.25), rgba(245,158,11,.15), transparent); }

        .social-box { transition: all .25s cubic-bezier(.34,1.56,.64,1); }
        .social-box:hover { transform:translateY(-4px) scale(1.1); border-color:rgba(13,148,136,.4); background:rgba(30,41,59,.9); }

        .cta-glow { background:linear-gradient(135deg, rgba(13,148,136,.15), rgba(20,184,166,.1)); border:1px solid rgba(13,148,136,.3); transition:all .3s ease; }
        .cta-glow:hover { background:linear-gradient(135deg, rgba(13,148,136,.25), rgba(20,184,166,.22)); border-color:rgba(13,148,136,.55); box-shadow:0 0 30px rgba(13,148,136,.15); }
        .cta-ghost { background:rgba(30,41,59,.5); border:1px solid rgba(51,65,85,.5); transition:all .3s ease; }
        .cta-ghost:hover { background:rgba(30,41,59,.85); border-color:rgba(20,184,166,.35); box-shadow:0 0 20px rgba(13,148,136,.08); }
      `}</style>

      <section ref={sectionRef} id="home" className="relative min-h-screen flex items-center overflow-hidden bg-[#020617]">
        <div ref={orbRef} className="cursor-orb" style={{ top: 0, left: 0 }} />
        <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(13,148,136,.08) 0%, transparent 70%)" }} />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(245,158,11,.06) 0%, transparent 70%)" }} />
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(20,184,166,.04) 0%, transparent 60%)" }} />
        </div>
        <div className="pointer-events-none absolute inset-0 -z-10 hero-grid" />
        <div className="pointer-events-none absolute left-0 right-0 top-1/2 horizon-glow opacity-50" />

        {/* Orbiting decorative rings */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute" style={{ top: "20%", left: "10%", width: 200, height: 200, borderRadius: "50%", border: "1px solid rgba(13,148,136,.15)", animation: "orbit 30s linear infinite" }} />
          <div className="absolute" style={{ top: "60%", right: "15%", width: 150, height: 150, borderRadius: "50%", border: "1px solid rgba(245,158,11,.12)", animation: "orbit 25s linear infinite reverse" }} />
          <div className="absolute" style={{ bottom: "20%", left: "25%", width: 100, height: 100, borderRadius: "50%", border: "1px solid rgba(20,184,166,.1)", animation: "orbit 20s linear infinite" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Name + Role + CTA */}
            <div>
              <div className="hero-title">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-900/30 bg-emerald-950/30 backdrop-blur-sm mb-8">
                  <span className="status-dot" />
                  <span className="text-[10px] text-emerald-400/60 tracking-[0.2em] uppercase font-medium">Available for opportunities</span>
                  <Sparkles className="w-3 h-3 text-emerald-400/70" />
                </div>
              </div>

              <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] mb-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-emerald-200/40 to-emerald-500/40">Jalis</span>
                <br />
                <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-amber-400 bg-clip-text text-transparent">Mahamud Tarif</span>
              </h1>

              <div className="hero-role mt-6 h-10 flex items-center">
                <p className="text-lg md:text-xl text-zinc-500 font-light tracking-wide">
                  {role}<span className="caret" />
                </p>
              </div>

              <div className="horizon-glow w-32 my-8" />

              <p className="hero-bio text-zinc-500 text-sm md:text-base max-w-md leading-relaxed font-light mb-10">
                Crafting exceptional digital experiences with modern technologies — AI, machine learning, and elegant architecture. Turning bold ideas into reality.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <a href="#projects" className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-medium text-white overflow-hidden cta-glow">
                  View My Work
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </a>
                <a href="/[CV]Jalis_Mahamud_Tarif.pdf" download className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-medium text-zinc-400 cta-ghost">
                  <Download className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                  Resume
                </a>
              </div>

              <div className="flex items-center gap-3">
                {socialLinks.map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="social-box w-10 h-10 rounded-xl flex items-center justify-center text-zinc-500" style={{ background: "rgba(30,41,59,.4)", border: "1px solid rgba(51,65,85,.4)" }}>
                    <HugeiconsIcon className="w-[16px] h-[16px]" icon={s.icon} />
                  </a>
                ))}
                <span className="h-5 w-px bg-zinc-700/40" />
                <a href="mailto:jm.tarif55@gmail.com" className="social-box flex items-center gap-2 px-4 py-2 rounded-xl text-xs text-zinc-400" style={{ background: "rgba(30,41,59,.4)", border: "1px solid rgba(51,65,85,.4)" }}>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  Say hello
                </a>
              </div>
            </div>

            {/* Right: Visual element */}
            <div className="hero-bio relative hidden lg:flex items-center justify-center">
              <div className="relative">
                {/* Animated rings around the visual */}
                <div className="absolute inset-0 rounded-full border border-emerald-500/10" style={{ animation: "orbit 20s linear infinite", width: 300, height: 300, marginLeft: -150, marginTop: -150 }} />
                <div className="absolute inset-0 rounded-full border border-amber-500/8" style={{ animation: "orbit 15s linear infinite reverse", width: 350, height: 350, marginLeft: -175, marginTop: -175 }} />
                <div className="absolute inset-0 rounded-full" style={{ width: 280, height: 280, background: "radial-gradient(circle, rgba(13,148,136,.08) 0%, transparent 70%)", animation: "pulse-ring 3s ease-in-out infinite" }} />

                {/* Code-like visual */}
                <div className="rounded-2xl bg-zinc-900/60 border border-zinc-700/40 backdrop-blur-sm p-6 max-w-sm" style={{ boxShadow: "0 0 60px rgba(13,148,136,.05)" }}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80" />
                    <span className="ml-2 text-[10px] text-zinc-600 font-mono">portfolio.tsx</span>
                  </div>
                  <div className="space-y-2 font-mono text-xs">
                    <div><span className="text-emerald-400/60">export</span> <span className="text-emerald-300">default</span> <span className="text-zinc-300">function</span> <span className="text-amber-400">Jalis</span>() {'{'}</div>
<div className="pl-4"><span className="text-zinc-500">//</span> <span className="text-zinc-400">Building the future</span></div>
                      <div className="pl-4"><span className="text-zinc-500">return</span> <span className="text-emerald-400/80">&lt;</span><span className="text-amber-400">Experiences</span> <span className="text-zinc-500">/&gt;</span></div>
                      <div><span className="text-zinc-300">{'}'}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 float-down">
          <span className="text-[9px] text-zinc-600 tracking-[0.3em] uppercase">scroll</span>
          <ArrowDown className="w-4 h-4 text-zinc-600" />
        </div>
      </section>
    </>
  );
}

import { useEffect, useRef, useState } from "react";
import { Globe, Server, Terminal, Brain, BookOpen } from "lucide-react";

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

function CircularSkill({ label, percentage, color }) {
  const radius = 22;
  const circumference = radius * 2 * Math.PI;
  const [progress, setProgress] = useState(0);
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const startTime = Date.now();
    const duration = 1200;
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(eased * percentage);
      if (p < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [visible, percentage]);

  const offset = circumference - (progress / 100) * circumference;

  return (
    <div ref={ref} className="flex flex-col items-center gap-1">
      <svg width={52} height={52} className="-rotate-90">
        <circle cx={26} cy={26} r={radius} fill="none" stroke="rgba(30,41,59,.5)" strokeWidth={3} />
        <circle cx={26} cy={26} r={radius} fill="none" stroke={color} strokeWidth={3} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" style={{ filter: `drop-shadow(0 0 4px ${color}40)`, transition: "stroke-dashoffset 1.2s cubic-bezier(.22,1,.36,1)" }} />
      </svg>
      <span className="text-[9px] text-zinc-500 font-light">{label}</span>
    </div>
  );
}

export default function Skills() {
  const [ref, visible] = useReveal(0.06);

  const categories = [
    { title: "Frontend", icon: Globe, color: "#0d9488", skills: ["React", "TypeScript", "JavaScript", "Tailwind CSS", "HTML5", "CSS3"], progress: 85 },
    { title: "Backend", icon: Server, color: "#14b8a6", skills: ["Python", "Django", "FastAPI", "Flask", "PostgreSQL", "MongoDB", "Redis"], progress: 80 },
    { title: "DevOps", icon: Terminal, color: "#f59e0b", skills: ["Docker", "Git", "GitHub Actions"], progress: 70 },
    { title: "AI / ML", icon: Brain, color: "#0d9488", skills: ["Scikit-learn", "LangChain", "Prompt Engineering", "LLMs", "RAG"], progress: 75 },
  ];

  const learning = ["AI/ML", "Data Engineering", "Kubernetes", "AWS"];

  return (
    <>
      <style>{`
        @keyframes slide-up { from{ opacity:0; transform:translateY(40px) } to{ opacity:1; transform:translateY(0) } }
        @keyframes pulse-dot { 0%,100%{ opacity:1; transform:scale(1) } 50%{ opacity:.5; transform:scale(.8) } }
        @keyframes float-pill { 0%,100%{ transform:translateY(0) } 50%{ transform:translateY(-3px) } }

        .sk-section { position:relative; padding:6rem 0; background:#020617; overflow:hidden; }
        .sk-grid { background-image: linear-gradient(to right, rgba(13,148,136,.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(13,148,136,.02) 1px, transparent 1px); background-size: 50px 50px; }

        .sk-card { position:relative; border-radius:20px; background:rgba(15,23,42,.45); border:1px solid rgba(30,41,59,.4); backdrop-filter:blur(16px); padding:2rem; transition:all .35s cubic-bezier(.34,1.56,.64,1); overflow:hidden; }
        .sk-card::after { content:''; position:absolute; bottom:0; left:0; right:0; height:2px; background:linear-gradient(90deg, transparent, var(--sk-color, #0d9488), transparent); opacity:0; transition:opacity .4s; }
        .sk-card:hover { transform:translateY(-6px); border-color:rgba(13,148,136,.2); box-shadow:0 20px 40px rgba(13,148,136,.06); }
        .sk-card:hover::after { opacity:1; }

        .skill-pill { display:inline-flex; align-items:center; padding:4px 12px; border-radius:99px; font-size:11px; background:rgba(30,41,59,.4); border:1px solid rgba(30,41,59,.5); color:#64748b; transition:all .25s; cursor:default; }
        .skill-pill:hover { background:rgba(13,148,136,.1); border-color:rgba(13,148,136,.25); color:#5eead4; transform:scale(1.05); }

        .learn-pill { display:inline-flex; align-items:center; gap:6px; padding:6px 16px; border-radius:99px; font-size:12px; background:rgba(13,148,136,.08); border:1px solid rgba(13,148,136,.18); color:#5eead4; transition:all .25s; cursor:default; animation:float-pill 3s ease-in-out infinite; }
        .learn-pill:nth-child(2) { animation-delay:.3s; }
        .learn-pill:nth-child(3) { animation-delay:.6s; }
        .learn-pill:nth-child(4) { animation-delay:.9s; }
        .learn-dot { width:4px; height:4px; border-radius:50%; background:#0d9488; animation:pulse-dot 2s ease-in-out infinite; }

        .progress-ring-circle { transition: stroke-dashoffset 1.2s cubic-bezier(.22,1,.36,1); transform: rotate(-90deg); transform-origin: 50% 50%; }
      `}</style>

      <section id="skills" ref={ref} className="sk-section">
        <div className="sk-grid absolute inset-0 pointer-events-none" />
        <div className="absolute top-0 left-1/3 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, rgba(13,148,136,.04), transparent 70%)" }} />
        <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] rounded-full blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, rgba(245,158,11,.03), transparent 70%)" }} />

        <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-16">
          <div className={`text-center mb-16 ${visible ? "animate-[slide-up_1s_cubic-bezier(.22,1,.36,1)_0.2s_both]" : "opacity-0"}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-900/30 bg-emerald-950/30 backdrop-blur-sm mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[10px] text-emerald-400/50 tracking-[0.2em] uppercase">What I work with</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #0d9488, #14b8a6, #f59e0b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Skills &amp; Technologies</span>
            </h2>
            <p className="text-zinc-500 max-w-xl mx-auto text-sm md:text-base leading-relaxed font-light mt-4">A toolkit forged through years of hands-on experience and continuous learning.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {categories.map(({ title, icon: Icon, color, skills, progress }, i) => (
              <div key={title} className={`sk-card ${visible ? "" : "opacity-0"}`} style={{ "--sk-color": color, animation: `slide-up 0.7s cubic-bezier(.22,1,.36,1) ${0.15 + i * 0.12}s both` }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
                    <Icon className="w-5 h-5" style={{ color }} />
                  </div>
                  <h3 className="text-sm font-bold text-white">{title}</h3>
                  <span className="ml-auto text-[10px] text-zinc-600 font-light">{skills.length} skills</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-5">
                  {skills.map((s) => (
                    <span key={s} className="skill-pill" onMouseEnter={e => { e.currentTarget.style.background = `${color}12`; e.currentTarget.style.borderColor = `${color}25`; e.currentTarget.style.color = `${color}cc`; }} onMouseLeave={e => { e.currentTarget.style.background = "rgba(30,41,59,.4)"; e.currentTarget.style.borderColor = "rgba(30,41,59,.5)"; e.currentTarget.style.color = "#64748b"; }}>{s}</span>
                  ))}
                </div>
                <div className="flex justify-center">
                  <CircularSkill label={`${progress}%`} percentage={progress} color={color} />
                </div>
              </div>
            ))}
          </div>

          <div className={`mt-10 sk-card p-6 text-center ${visible ? "animate-[slide-up_1s_cubic-bezier(.22,1,.36,1)_0.6s_both]" : "opacity-0"}`}>
            <div className="flex items-center justify-center gap-2 mb-3">
              <BookOpen className="w-4 h-4 text-emerald-400/50" />
              <p className="text-[10px] text-emerald-400/50 tracking-[0.2em] uppercase">Always Learning</p>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">Staying ahead of the curve</h3>
            <p className="text-zinc-500 text-sm max-w-lg mx-auto mb-5 font-light leading-relaxed">Technology evolves rapidly — and so do I. Currently deepening expertise in AI/ML, data engineering, and cloud architectures.</p>
            <div className="flex flex-wrap justify-center gap-3">
              {learning.map((tag) => (
                <span key={tag} className="learn-pill"><span className="learn-dot" />{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

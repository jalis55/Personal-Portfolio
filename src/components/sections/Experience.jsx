import { useEffect, useRef, useState } from "react";
import { Calendar, MapPin, GraduationCap, ChevronDown } from "lucide-react";

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
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setVisible(true), delay); obs.disconnect(); } }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return [ref, visible];
}

function ExperienceCard({ exp, index }) {
  const [ref, visible] = useCardReveal(index * 120);
  const [expanded, setExpanded] = useState(index === 0);
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="exp-card-wrap" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: "opacity 0.8s cubic-bezier(.22,1,.36,1), transform 0.8s cubic-bezier(.22,1,.36,1)" }}>
      <div className="exp-dot-wrap">
        <div className={`exp-dot ${index === 0 ? "exp-dot-active" : ""}`} />
      </div>
      <div className={`exp-card ${isLeft ? "exp-left" : "exp-right"}`} onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(13,148,136,.25)"; e.currentTarget.style.boxShadow = "0 24px 48px rgba(13,148,136,.06)"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(30,41,59,.4)"; e.currentTarget.style.boxShadow = "none"; }}>
        <div className="exp-card-shimmer" />
        <div className="exp-card-header" onClick={() => setExpanded(x => !x)} style={{ cursor: "pointer" }}>
          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="exp-display text-base font-bold text-white leading-tight">{exp.title}</h3>
              {index === 0 && <span className="exp-current-badge"><span className="exp-current-dot" />Current</span>}
            </div>
            <p className="text-emerald-400/70 text-xs font-medium">{exp.company}</p>
            <div className="flex flex-wrap items-center gap-3 mt-1">
              <span className="exp-meta-chip"><Calendar className="w-3 h-3" />{exp.period}</span>
              <span className="exp-meta-chip"><MapPin className="w-3 h-3" />{exp.location}</span>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0 mt-1 transition-transform duration-300" style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }} />
        </div>
        <div className="exp-card-body" style={{ maxHeight: expanded ? "600px" : "0px", opacity: expanded ? 1 : 0, overflow: "hidden", transition: "max-height 0.45s cubic-bezier(.22,1,.36,1), opacity 0.35s ease" }}>
          <div style={{ paddingTop: "14px", borderTop: "1px solid rgba(30,41,59,.3)", marginTop: "14px" }}>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4 font-light">{exp.description}</p>
            <div className="mb-4">
              <p className="text-[10px] text-zinc-500 tracking-[0.15em] uppercase font-medium mb-2">Key Achievements</p>
              <ul className="space-y-1.5">
                {exp.achievements.map((ach, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-zinc-400 font-light">
                    <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: "linear-gradient(135deg, #0d9488, #f59e0b)" }} />
                    {ach}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[10px] text-zinc-500 tracking-[0.15em] uppercase font-medium mb-2">Technologies</p>
              <div className="flex flex-wrap gap-1.5">
                {exp.technologies.map((tech) => (
                  <span key={tech} className="exp-tech-pill" onMouseEnter={e => { e.currentTarget.style.background = "rgba(13,148,136,.1)"; e.currentTarget.style.borderColor = "rgba(13,148,136,.25)"; e.currentTarget.style.color = "#5eead4"; }} onMouseLeave={e => { e.currentTarget.style.background = "rgba(30,41,59,.4)"; e.currentTarget.style.borderColor = "rgba(30,41,59,.45)"; e.currentTarget.style.color = "#64748b"; }}>{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const [ref, sectionVisible] = useReveal(0.05);

  const experiences = [
    { title: "Senior Software Engineer", company: "Leadsoft Bangladesh Limited", location: "Dhaka", period: "Jan 2025 – Sep 2025", description: "Led cross-functional teams to resolve complex customer operations issues and collaborated with stakeholders to translate business requirements into technical specifications.", achievements: ["Mentored junior engineers and conducted code reviews", "Optimized backend processes, reducing response time", "Ensured timely delivery of projects"], technologies: ["Python", "SQL", "REST APIs", "Docker"] },
    { title: "Software Engineer", company: "Leadsoft Bangladesh Limited", location: "Dhaka", period: "Jun 2023 – Jan 2025", description: "Engaged with clients to analyze and implement tailored deployments. Handled complex operations issues ahead of deadlines.", achievements: ["Delivered custom deployments aligned with client needs", "Fixed critical operational issues before deadlines", "Developed and improved SQL scripts"], technologies: ["SQL", "REST API", "Docker", "Client Analysis"] },
    { title: "Junior Software Engineer", company: "Leadsoft Bangladesh Limited", location: "Dhaka", period: "Sep 2022 – Jun 2023", description: "Configured environments, deployed updates, and resolved SQL database errors for capital market clients.", achievements: ["Deployed updates and fixed SQL database errors", "Delivered customized reports tailored to customers"], technologies: ["SQL", "Report Customization", "Deployment"] },
  ];

  return (
    <>
      <style>{`
        @keyframes slide-up { from{ opacity:0; transform:translateY(40px) } to{ opacity:1; transform:translateY(0) } }
        @keyframes pulse-glow { 0%,100%{ box-shadow:0 0 0 3px rgba(13,148,136,.2), 0 0 10px rgba(13,148,136,.15) } 50%{ box-shadow:0 0 0 6px rgba(13,148,136,.08), 0 0 18px rgba(13,148,136,.1) } }
        @keyframes pulse-ring { 0%,100%{ box-shadow:0 0 0 3px rgba(13,148,136,.2), 0 0 10px rgba(13,148,136,.15) } 50%{ box-shadow:0 0 0 6px rgba(13,148,136,.08), 0 0 18px rgba(13,148,136,.1) } }

        .exp-section { position:relative; padding:6rem 0; background:#020617; overflow:hidden; }

        .exp-timeline { position:relative; padding:0 0 0 36px; }
        @media(min-width:768px) { .exp-timeline { padding:0; } }
        .exp-timeline::before { content:''; position:absolute; left:12px; top:12px; bottom:12px; width:1px; background:linear-gradient(180deg, rgba(13,148,136,.35), rgba(245,158,11,.2), transparent 100%); }
        @media(min-width:768px) { .exp-timeline::before { left:50%; transform:translateX(-50%); } }

        .exp-card-wrap { position:relative; margin-bottom:32px; }
        @media(min-width:768px) { .exp-card-wrap { display:flex; justify-content:flex-end; } .exp-card-wrap:nth-child(even) { justify-content:flex-start; } }

        .exp-dot-wrap { position:absolute; left:-28px; top:18px; display:flex; align-items:center; justify-content:center; width:16px; height:16px; z-index:10; }
        @media(min-width:768px) { .exp-dot-wrap { left:50%; top:22px; transform:translateX(-50%); } }
        .exp-dot { width:10px; height:10px; border-radius:50%; background:rgba(13,148,136,.25); border:2px solid rgba(13,148,136,.45); transition:transform .2s; }
        .exp-dot-active { background:#0d9488; border-color:#0d9488; animation:pulse-ring 2.5s ease-in-out infinite; }

        .exp-card { position:relative; border-radius:18px; background:rgba(15,23,42,.5); border:1px solid rgba(30,41,59,.4); backdrop-filter:blur(16px); padding:20px; overflow:hidden; transition:all .3s ease; width:100%; }
        @media(min-width:768px) { .exp-card { width:calc(50% - 32px); } .exp-left { margin-right:auto; } .exp-right { margin-left:auto; } }
        .exp-card:hover { transform:translateY(-4px); border-color:rgba(13,148,136,.2); box-shadow:0 20px 40px rgba(13,148,136,.05); }

        .exp-card-shimmer { position:absolute; top:0; left:0; right:0; height:1px; background:linear-gradient(90deg, transparent, rgba(13,148,136,.3), rgba(20,184,166,.2), transparent); opacity:0; transition:opacity .3s; }
        .exp-card:hover .exp-card-shimmer { opacity:1; }

        .exp-card-header { display:flex; align-items:flex-start; gap:12px; user-select:none; }
        .exp-current-badge { display:inline-flex; align-items:center; gap:4px; padding:2px 8px; border-radius:99px; font-size:10px; background:rgba(13,148,136,.1); border:1px solid rgba(13,148,136,.2); color:#5eead4; }
        .exp-current-dot { width:5px; height:5px; border-radius:50%; background:#0d9488; animation:pulse-ring 2s ease-in-out infinite; }
        .exp-meta-chip { display:inline-flex; align-items:center; gap:3px; font-size:10px; color:#64748b; font-weight:300; }
        .exp-tech-pill { display:inline-flex; align-items:center; padding:2px 10px; border-radius:99px; font-size:10px; background:rgba(30,41,59,.4); border:1px solid rgba(30,41,59,.45); color:#64748b; transition:all .25s; }
        .exp-tech-pill:hover { background:rgba(13,148,136,.1); border-color:rgba(13,148,136,.25); color:#5eead4; }
      `}</style>

      <section id="experience" ref={ref} className="exp-section">
        <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-16">
          <div className={`text-center mb-16 ${sectionVisible ? "animate-[slide-up_1s_cubic-bezier(.22,1,.36,1)_0.2s_both]" : "opacity-0"}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-900/30 bg-emerald-950/30 backdrop-blur-sm mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[10px] text-emerald-400/50 tracking-[0.2em] uppercase">Career path</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #0d9488, #14b8a6, #f59e0b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Professional Experience</span>
            </h2>
            <p className="text-zinc-500 max-w-xl mx-auto text-sm md:text-base leading-relaxed font-light mt-4">A journey of growth, learning, and delivering impactful solutions.</p>
          </div>

          <div className={`exp-timeline ${sectionVisible ? "" : ""}`}>
            {experiences.map((exp, i) => (
              <ExperienceCard key={i} exp={exp} index={i} />
            ))}
          </div>

          {/* Education */}
          <div className={`mt-16 ${sectionVisible ? "animate-[slide-up_1s_cubic-bezier(.22,1,.36,1)_0.6s_both]" : "opacity-0"}`}>
            <div className="hair-line mb-10" />
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-900/30 bg-emerald-950/30 backdrop-blur-sm mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400/50" />
                <span className="text-[10px] text-amber-400/50 tracking-[0.2em] uppercase">Education</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white">Education &amp; <span style={{ backgroundImage: "linear-gradient(135deg, #0d9488, #f59e0b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Certifications</span></h3>
            </div>
            <div className="max-w-md mx-auto">
              <div className="exp-card">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(13,148,136,.1)", border: "1px solid rgba(13,148,136,.2)" }}>
                    <GraduationCap className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">Bachelor of Computer Science &amp; Engineering</h4>
                    <p className="text-xs text-emerald-400/70 font-medium mb-2">North South University</p>
                    <div className="flex flex-wrap gap-3">
                      <span className="exp-meta-chip"><Calendar className="w-3 h-3" />2015 – 2020</span>
                      <span className="exp-meta-chip"><MapPin className="w-3 h-3" />Dhaka, Bangladesh</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

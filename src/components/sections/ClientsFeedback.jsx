import { useEffect, useRef, useState } from "react";
import { Star, Quote } from "lucide-react";
import { US, FR } from "country-flag-icons/react/3x2";

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

const testimonials = [
  { name: "javiersossa", country: "US", Flag: US, avatar: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/c02ce2775a79b554d75802a45c39aab8-1693576627766/5ff6adfc-8ab3-4f7c-afbf-43d670a0996d.png", content: "Jalis is amazing. His work is great and he went far and beyond to accomplish everything I needed! Thank you again!", rating: 5 },
  { name: "mkjetta4", country: "US", Flag: US, avatar: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/fbc51e27a9df5410dd6f5f5a537b5901-165650611613792734.43191/4376932A-E0AB-493C-B8C5-82F9EC0678B5", content: "The best, he is the best in his field.", rating: 5 },
  { name: "danieledery03", country: "FR", Flag: FR, avatar: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/fa521efddfb6dbf95ad39c1536a23531-1674473093653/795feca5-53a4-4351-bc27-640308f29295.JPG", content: "Very professional and very good person, the work is really good! I recommend 👍", rating: 5 },
];

function TestimonialCard({ t, index }) {
  const [ref, visible] = useCardReveal(index * 110);

  return (
    <div ref={ref} className="fb-card" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)", transition: "opacity 0.75s cubic-bezier(.22,1,.36,1), transform 0.75s cubic-bezier(.22,1,.36,1)" }}>
      <div className="fb-shimmer" />
      <div className="fb-quote-wrap">
        <Quote className="h-7 w-7 text-emerald-400/50" />
      </div>
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`h-4 w-4 ${i < t.rating ? "text-amber-400 fill-amber-400" : "text-zinc-700"}`} />
        ))}
      </div>
      <p className="text-zinc-400 text-sm leading-relaxed font-light grow mb-6">&ldquo;{t.content}&rdquo;</p>
      <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid rgba(30,41,59,.3)" }}>
        <img src={t.avatar} alt={t.name} loading="lazy" decoding="async" width={44} height={44} className="w-11 h-11 rounded-full object-cover shrink-0" style={{ border: "1px solid rgba(30,41,59,.5)" }} />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white truncate">{t.name}</p>
          <p className="text-[10px] text-zinc-500 font-light">Verified client — Fiverr</p>
        </div>
        <span className="ml-auto shrink-0 rounded overflow-hidden" style={{ border: "1px solid rgba(30,41,59,.4)" }}><t.Flag className="w-7 h-auto block" title={t.country} /></span>
      </div>
    </div>
  );
}

export default function ClientsFeedback() {
  const [ref, sectionVisible] = useReveal(0.06);

  return (
    <>
      <style>{`
        @keyframes slide-up { from{ opacity:0; transform:translateY(40px) } to{ opacity:1; transform:translateY(0) } }
        @keyframes shimmer-move { 0%{ background-position:-200% center } 100%{ background-position:200% center } }

        .fb-section { position:relative; padding:6rem 0; background:#020617; overflow:hidden; }
        .fb-grid { background-image: linear-gradient(to right, rgba(13,148,136,.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(13,148,136,.02) 1px, transparent 1px); background-size: 50px 50px; }

        .fb-card { position:relative; border-radius:20px; background:rgba(15,23,42,.45); border:1px solid rgba(30,41,59,.4); backdrop-filter:blur(16px); padding:28px; display:flex; flex-direction:column; overflow:hidden; transition:all .3s ease; }
        .fb-card:hover { border-color:rgba(13,148,136,.2); box-shadow:0 24px 48px rgba(13,148,136,.05); transform:translateY(-4px); }
        .fb-shimmer { position:absolute; top:0; left:0; right:0; height:1px; background:linear-gradient(90deg, transparent, rgba(13,148,136,.3), rgba(20,184,166,.2), transparent); opacity:0; transition:opacity .3s; }
        .fb-card:hover .fb-shimmer { opacity:1; }
        .fb-quote-wrap { width:40px; height:40px; border-radius:12px; display:flex; align-items:center; justify-content:center; background:rgba(13,148,136,.08); border:1px solid rgba(13,148,136,.15); margin-bottom:16px; }
      `}</style>

      <section id="feedback" ref={ref} className="fb-section">
        <div className="fb-grid absolute inset-0 pointer-events-none" />
        <div className="absolute -top-32 right-1/3 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, rgba(20,184,166,.04), transparent 70%)" }} />
        <div className="absolute bottom-0 left-1/4 w-[350px] h-[350px] rounded-full blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, rgba(245,158,11,.03), transparent 70%)" }} />

        <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-16">
          <div className={`text-center mb-14 ${sectionVisible ? "animate-[slide-up_1s_cubic-bezier(.22,1,.36,1)_0.2s_both]" : "opacity-0"}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-900/30 bg-emerald-950/30 backdrop-blur-sm mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[10px] text-emerald-400/50 tracking-[0.2em] uppercase">Testimonials</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #0d9488, #14b8a6, #f59e0b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Client Feedback</span>
            </h2>
            <p className="text-zinc-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-light mt-4">What people are saying about collaborating with me.</p>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${sectionVisible ? "" : "opacity-0"}`}>
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.name} t={t} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

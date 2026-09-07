import { useEffect, useRef, useState } from "react";
import { Star, Quote } from "lucide-react";
import { US, FR } from "country-flag-icons/react/3x2";

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
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return [ref, visible];
}

const testimonials = [
  {
    name: "javiersossa",
    country: "US",
    Flag: US,
    avatar:
      "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/c02ce2775a79b554d75802a45c39aab8-1693576627766/5ff6adfc-8ab3-4f7c-afbf-43d670a0996d.png",
    content:
      "Jalis is amazing. His work is great and he went far and beyond to accomplish everything I needed! Thank you again!",
    rating: 5,
  },
  {
    name: "mkjetta4",
    country: "US",
    Flag: US,
    avatar:
      "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/fbc51e27a9df5410dd6f5f5a537b5901-165650611613792734.43191/4376932A-E0AB-493C-B8C5-82F9EC0678B5",
    content: "The best, he is the best in his field.",
    rating: 5,
  },
  {
    name: "danieledery03",
    country: "FR",
    Flag: FR,
    avatar:
      "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/fa521efddfb6dbf95ad39c1536a23531-1674473093653/795feca5-53a4-4351-bc27-640308f29295.JPG",
    content: "Very professional and very good person, the work is really good! I recommend 👍",
    rating: 5,
  },
];

function TestimonialCard({ t, index }) {
  const [ref, visible] = useCardReveal(index * 110);
  return (
    <div
      ref={ref}
      className="fb-card"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 0.68s cubic-bezier(.22,1,.36,1), transform 0.68s cubic-bezier(.22,1,.36,1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(56,189,248,.30)";
        e.currentTarget.style.boxShadow = "0 24px 48px rgba(56,189,248,.07)";
        e.currentTarget.style.transform = "translateY(-6px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(51,65,85,.50)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div className="fb-shimmer" />
      <div className="fb-quote-wrap">
        <Quote className="h-7 w-7 text-sky-400/70" />
      </div>
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`h-4 w-4 ${i < t.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-600"}`} />
        ))}
      </div>
      <p className="text-slate-300 text-sm leading-relaxed font-light grow mb-6">&ldquo;{t.content}&rdquo;</p>
      <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid rgba(51,65,85,.35)" }}>
        <img
          src={t.avatar}
          alt={t.name}
          loading="lazy"
          decoding="async"
          width={44}
          height={44}
          className="w-11 h-11 rounded-full object-cover shrink-0"
          style={{ border: "1px solid rgba(51,65,85,.60)" }}
        />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-100 truncate">{t.name}</p>
          <p className="text-xs text-slate-500 font-light">Verified client — Fiverr</p>
        </div>
        <span className="ml-auto shrink-0 rounded overflow-hidden" style={{ border: "1px solid rgba(51,65,85,.40)" }}>
          <t.Flag className="w-7 h-auto block" title={t.country} />
        </span>
      </div>
    </div>
  );
}

export function ClientsFeedback() {
  const [sectionRef, sectionVisible] = useReveal(0.06);

  return (
    <>
      <style>{`
        .fb-display { font-family: 'Playfair Display', Georgia, serif; }
        .fb-body    { font-family: 'DM Sans', sans-serif; }

        .fb-reveal {
          opacity: 0; transform: translateY(26px);
          transition: opacity 0.70s cubic-bezier(.22,1,.36,1), transform 0.70s cubic-bezier(.22,1,.36,1);
        }
        .fb-reveal.in { opacity:1; transform: translateY(0); }
        .fb-d1 { transition-delay: 0.05s; }
        .fb-d2 { transition-delay: 0.16s; }

        .fb-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 5px 14px; border-radius: 99px;
          background: rgba(15,23,42,.80);
          border: 1px solid rgba(56,189,248,.22);
          backdrop-filter: blur(8px);
        }
        .fb-eyebrow-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: linear-gradient(135deg, #38bdf8, #818cf8);
        }

        .fb-card {
          position: relative;
          border-radius: 18px;
          background: rgba(15,23,42,.65);
          border: 1px solid rgba(51,65,85,.50);
          backdrop-filter: blur(12px);
          padding: 28px;
          display: flex; flex-direction: column;
          overflow: hidden;
          transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.28s cubic-bezier(.34,1.56,.64,1);
        }
        .fb-shimmer {
          position: absolute; top:0; left:0; right:0; height:1px;
          background: linear-gradient(90deg, transparent, rgba(56,189,248,.40), rgba(129,140,248,.30), transparent);
          opacity: 0; transition: opacity 0.3s ease;
        }
        .fb-card:hover .fb-shimmer { opacity: 1; }

        .fb-quote-wrap {
          width: 40px; height: 40px; border-radius: 11px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(56,189,248,.08);
          border: 1px solid rgba(56,189,248,.18);
          margin-bottom: 16px;
        }

        .fb-grid-bg {
          background-image:
            linear-gradient(to right,  #ffffff07 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff07 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>

      <section id="feedback" ref={sectionRef} className="fb-body py-28 bg-slate-950 relative overflow-hidden">
        {/* ambient orbs + grid */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-1/3 w-[520px] h-[520px] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(99,102,241,.07) 0%, transparent 70%)" }} />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(56,189,248,.06) 0%, transparent 70%)" }} />
        </div>
        <div className="fb-grid-bg pointer-events-none absolute inset-0" />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className={`fb-reveal fb-d1 ${sectionVisible ? "in" : ""} text-center mb-14`}>
            <div className="fb-eyebrow mb-5 mx-auto w-fit">
              <span className="fb-eyebrow-dot" />
              <span className="text-xs text-slate-400 tracking-widest uppercase font-medium">Testimonials</span>
            </div>
            <h2 className="fb-display text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-slate-100 to-slate-400">Clients </span>
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #38bdf8 0%, #818cf8 60%, #c084fc 100%)" }}>
                Feedback
              </span>
            </h2>
            <p className="mt-5 text-slate-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-light">
              What people are saying about collaborating with me — from Fiverr to long-term partners.
            </p>
          </div>

          <div className={`fb-reveal fb-d2 ${sectionVisible ? "in" : ""} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}>
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.name} t={t} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

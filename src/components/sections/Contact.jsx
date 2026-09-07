import { useEffect, useRef, useState } from "react";
import { Mail, Phone, MapPin, Send, MessageCircle, CheckCircle2, AlertCircle } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { FiverrIcon, Github01Icon, Linkedin02Icon } from "@hugeicons/core-free-icons";

function useReveal(threshold = 0.1) {
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

export function Contact() {
  const [sectionRef, sectionVisible] = useReveal(0.06);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // 'success' | 'error' | null

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Valid email required";
    if (!formData.subject.trim()) e.subject = "Subject is required";
    if (formData.message.trim().length < 10) e.message = "Message must be at least 10 characters";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) {
      setStatus("error");
      setTimeout(() => setStatus(null), 3000);
      return;
    }
    // TODO: wire to EmailJS / Formspree / API
    console.log("Form submitted:", formData);
    setStatus("success");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setErrors({});
    setTimeout(() => setStatus(null), 4000);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors((p) => ({ ...p, [e.target.name]: undefined }));
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "jm.tarif55@gmail.com", href: "mailto:jm.tarif55@gmail.com" },
    { icon: Phone, label: "Phone", value: "+880 1623-708711", href: "tel:+8801623708711" },
    { icon: MapPin, label: "Location", value: "Dhaka, Bangladesh", href: "https://maps.google.com/?q=Dhaka,Bangladesh" },
  ];

  const socialLinks = [
    { icon: Linkedin02Icon, label: "LinkedIn", href: "https://linkedin.com/in/jalismtarif/" },
    { icon: Github01Icon, label: "GitHub", href: "https://github.com/jalis55" },
    { icon: FiverrIcon, label: "Fiverr", href: "https://fiverr.com/jalis_tarif" },
  ];

  return (
    <>
      <style>{`
        .contact-display { font-family: 'Playfair Display', Georgia, serif; }
        .contact-body    { font-family: 'DM Sans', sans-serif; }

        .contact-reveal {
          opacity: 0; transform: translateY(26px);
          transition: opacity 0.70s cubic-bezier(.22,1,.36,1), transform 0.70s cubic-bezier(.22,1,.36,1);
        }
        .contact-reveal.in { opacity:1; transform: translateY(0); }
        .contact-d1 { transition-delay: 0.05s; }
        .contact-d2 { transition-delay: 0.14s; }
        .contact-d3 { transition-delay: 0.22s; }

        .contact-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 5px 14px; border-radius: 99px;
          background: rgba(15,23,42,.80);
          border: 1px solid rgba(56,189,248,.22);
          backdrop-filter: blur(8px);
        }
        .contact-eyebrow-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: linear-gradient(135deg, #38bdf8, #818cf8);
        }

        .contact-card {
          position: relative;
          border-radius: 18px;
          background: rgba(15,23,42,.65);
          border: 1px solid rgba(51,65,85,.50);
          backdrop-filter: blur(12px);
          overflow: hidden;
          transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.28s cubic-bezier(.34,1.56,.64,1);
        }
        .contact-card::before {
          content: ''; position: absolute; top:0; left:0; right:0; height:1px;
          background: linear-gradient(90deg, transparent, rgba(56,189,248,.35), rgba(129,140,248,.25), transparent);
          opacity: 0; transition: opacity 0.3s ease;
        }
        .contact-card:hover::before { opacity: 1; }
        .contact-card:hover { border-color: rgba(56,189,248,.28); box-shadow: 0 20px 40px rgba(56,189,248,.06); }

        .contact-input {
          width: 100%;
          background: rgba(30,41,59,.60);
          border: 1px solid rgba(51,65,85,.55);
          color: rgba(226,232,240,1);
          border-radius: 12px;
          padding: 11px 14px;
          font-size: 13px;
          outline: none;
          transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
          font-family: 'DM Sans', sans-serif;
        }
        .contact-input::placeholder { color: rgba(100,116,139,1); }
        .contact-input:focus { border-color: rgba(56,189,248,.45); background: rgba(30,41,59,.85); box-shadow: 0 0 0 3px rgba(56,189,248,.10); }
        .contact-input.input-error { border-color: rgba(248,113,113,.55); box-shadow: 0 0 0 3px rgba(248,113,113,.10); }

        .contact-grid-bg {
          background-image:
            linear-gradient(to right,  #ffffff07 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff07 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .contact-social-btn {
          display: inline-flex; align-items: center; justify-content: center;
          width: 42px; height: 42px; border-radius: 12px;
          background: rgba(30,41,59,.60);
          border: 1px solid rgba(51,65,85,.55);
          color: rgba(148,163,184,1);
          transition: transform 0.22s cubic-bezier(.34,1.56,.64,1), background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
        }
        .contact-social-btn:hover { transform: translateY(-3px) scale(1.07); background: rgba(30,41,59,.90); border-color: rgba(56,189,248,.40); color: rgba(226,232,240,1); }

        .contact-info-icon {
          width: 40px; height: 40px; border-radius: 11px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(56,189,248,.10);
          border: 1px solid rgba(56,189,248,.22);
          flex-shrink: 0;
        }
      `}</style>

      <section
        id="contact"
        ref={sectionRef}
        className="contact-body py-28 bg-slate-950 relative overflow-hidden"
      >
        {/* ambient orbs + grid */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[520px] h-[520px] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(56,189,248,.07) 0%, transparent 70%)" }} />
          <div className="absolute bottom-0 right-1/4 w-[420px] h-[420px] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(129,140,248,.07) 0%, transparent 70%)" }} />
        </div>
        <div className="contact-grid-bg pointer-events-none absolute inset-0" />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className={`contact-reveal contact-d1 ${sectionVisible ? "in" : ""} text-center mb-14`}>
            <div className="contact-eyebrow mb-5 mx-auto w-fit">
              <span className="contact-eyebrow-dot" />
              <span className="text-xs text-slate-400 tracking-widest uppercase font-medium">Get in touch</span>
            </div>
            <h2 className="contact-display text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-slate-100 to-slate-400">Let&apos;s </span>
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #38bdf8 0%, #818cf8 60%, #c084fc 100%)" }}>
                Work Together
              </span>
            </h2>
            <p className="mt-5 text-slate-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-light">
              Have a project in mind or want to discuss opportunities? I&apos;d love to hear from you and explore how we can create something amazing together.
            </p>
          </div>

          <div className={`contact-reveal contact-d2 ${sectionVisible ? "in" : ""} grid grid-cols-1 lg:grid-cols-5 gap-6`}>
            {/* Form — spans 3 */}
            <div className="lg:col-span-3 contact-card p-7 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(56,189,248,.10)", border: "1px solid rgba(56,189,248,.22)" }}>
                  <MessageCircle className="w-4 h-4 text-sky-400" />
                </div>
                <h3 className="contact-display text-lg font-bold text-slate-100">Send a Message</h3>
                <span className="ml-auto text-xs text-slate-600 font-light hidden sm:inline">Avg. reply — 24h</span>
              </div>

              {status === "success" && (
                <div className="mb-5 flex items-center gap-2 px-4 py-3 rounded-xl text-sm" style={{ background: "rgba(34,197,94,.10)", border: "1px solid rgba(34,197,94,.25)", color: "rgba(134,239,172,1)" }}>
                  <CheckCircle2 className="w-4 h-4 shrink-0" /> Message sent — I&apos;ll get back to you soon!
                </div>
              )}
              {status === "error" && (
                <div className="mb-5 flex items-center gap-2 px-4 py-3 rounded-xl text-sm" style={{ background: "rgba(248,113,113,.08)", border: "1px solid rgba(248,113,113,.25)", color: "rgba(252,165,165,1)" }}>
                  <AlertCircle className="w-4 h-4 shrink-0" /> Please fix the highlighted fields.
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="c-name" className="text-xs text-slate-400 font-medium mb-1.5 block">Your name</label>
                    <input
                      id="c-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "err-name" : undefined}
                      className={`contact-input ${errors.name ? "input-error" : ""}`}
                    />
                    {errors.name && <p id="err-name" className="text-xs text-red-400 mt-1.5">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="c-email" className="text-xs text-slate-400 font-medium mb-1.5 block">Email address</label>
                    <input
                      id="c-email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "err-email" : undefined}
                      className={`contact-input ${errors.email ? "input-error" : ""}`}
                    />
                    {errors.email && <p id="err-email" className="text-xs text-red-400 mt-1.5">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="c-subject" className="text-xs text-slate-400 font-medium mb-1.5 block">Subject</label>
                  <input
                    id="c-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? "err-subject" : undefined}
                    className={`contact-input ${errors.subject ? "input-error" : ""}`}
                  />
                  {errors.subject && <p id="err-subject" className="text-xs text-red-400 mt-1.5">{errors.subject}</p>}
                </div>

                <div>
                  <label htmlFor="c-message" className="text-xs text-slate-400 font-medium mb-1.5 block">Message</label>
                  <textarea
                    id="c-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or idea..."
                    rows={5}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "err-message" : undefined}
                    className={`contact-input resize-none ${errors.message ? "input-error" : ""}`}
                  />
                  {errors.message && <p id="err-message" className="text-xs text-red-400 mt-1.5">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-sky-200 transition-all duration-200"
                  style={{ background: "rgba(56,189,248,.14)", border: "1px solid rgba(56,189,248,.32)" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(56,189,248,.24)"; e.currentTarget.style.borderColor = "rgba(56,189,248,.55)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(56,189,248,.14)"; e.currentTarget.style.borderColor = "rgba(56,189,248,.32)"; }}
                >
                  <Send className="h-4 w-4" />
                  Send Message
                </button>
                <p className="text-xs text-slate-600 text-center font-light">By sending, you agree to be contacted about this inquiry.</p>
              </form>
            </div>

            {/* Info column — spans 2 */}
            <div className="lg:col-span-2 space-y-5">
              <div className="contact-card p-7">
                <h3 className="contact-display text-base font-bold text-slate-100 mb-5">Get in Touch</h3>
                <div className="space-y-5">
                  {contactInfo.map((item) => (
                    <a key={item.label} href={item.href} target={item.label === "Location" ? "_blank" : undefined} rel={item.label === "Location" ? "noopener noreferrer" : undefined} className="flex items-center gap-4 group">
                      <div className="contact-info-icon group-hover:scale-110 transition-transform duration-200">
                        <item.icon className="h-4 w-4 text-sky-400" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 tracking-wide font-medium">{item.label}</p>
                        <p className="text-sm text-slate-300 group-hover:text-sky-300 transition-colors">{item.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="contact-card p-7">
                <h3 className="text-sm font-semibold text-slate-100 mb-4">Follow Me</h3>
                <div className="flex gap-3">
                  {socialLinks.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="contact-social-btn"
                    >
                      <HugeiconsIcon icon={s.icon} className="w-[18px] h-[18px]" />
                    </a>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-4 font-light leading-relaxed">
                  Connect for updates on my latest projects and tech insights.
                </p>
              </div>

              <div className="contact-card p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-green-400" style={{ boxShadow: "0 0 0 3px rgba(74,222,128,.20)" }} />
                  <h3 className="text-sm font-semibold text-slate-100">Available for Freelance</h3>
                </div>
                <p className="text-sm text-slate-400 mb-3 font-light leading-relaxed">
                  Currently accepting new projects and collaborations — let&apos;s discuss your idea.
                </p>
                <span className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full" style={{ background: "rgba(34,197,94,.10)", border: "1px solid rgba(34,197,94,.22)", color: "rgba(134,239,172,1)" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Available now — 24h response
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

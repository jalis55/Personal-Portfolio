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
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

export default function Contact() {
  const [ref, sectionVisible] = useReveal(0.06);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);

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
    if (Object.keys(v).length > 0) { setStatus("error"); setTimeout(() => setStatus(null), 3000); return; }
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
        @keyframes slide-up { from{ opacity:0; transform:translateY(40px) } to{ opacity:1; transform:translateY(0) } }
        @keyframes pulse-border { 0%,100%{ border-color:rgba(13,148,136,.2) } 50%{ border-color:rgba(13,148,136,.4) } }
        @keyframes float { 0%,100%{ transform:translateY(0) } 50%{ transform:translateY(-8px) } }

        .contact-section { position:relative; padding:6rem 0; background:#020617; overflow:hidden; }

        .contact-card { position:relative; border-radius:20px; background:rgba(15,23,42,.45); border:1px solid rgba(30,41,59,.4); backdrop-filter:blur(16px); padding:2rem; transition:all .3s ease; overflow:hidden; }
        .contact-card::before { content:''; position:absolute; top:0; left:0; right:0; height:1px; background:linear-gradient(90deg, transparent, rgba(13,148,136,.25), rgba(20,184,166,.15), transparent); opacity:0; transition:opacity .3s; }
        .contact-card:hover::before { opacity:1; }
        .contact-card:hover { border-color:rgba(13,148,136,.2); box-shadow:0 20px 40px rgba(13,148,136,.05); }

        .contact-input { width:100%; background:rgba(30,41,59,.4); border:1px solid rgba(30,41,59,.45); color:#e2e8f0; border-radius:10px; padding:10px 14px; font-size:13px; outline:none; transition:all .25s; font-family:'DM Sans',sans-serif; }
        .contact-input::placeholder { color:#64748b; }
        .contact-input:focus { border-color:rgba(13,148,136,.4); background:rgba(30,41,59,.8); box-shadow:0 0 0 3px rgba(13,148,136,.08); }
        .contact-input.input-error { border-color:rgba(248,113,113,.4); box-shadow:0 0 0 3px rgba(248,113,113,.08); }

        .contact-social-btn { display:inline-flex; align-items:center; justify-content:center; width:40px; height:40px; border-radius:12px; background:rgba(30,41,59,.4); border:1px solid rgba(30,41,59,.45); color:#64748b; transition:all .25s cubic-bezier(.34,1.56,.64,1); }
        .contact-social-btn:hover { transform:translateY(-3px) scale(1.07); background:rgba(13,148,136,.1); border-color:rgba(13,148,136,.3); color:#5eead4; }

        .contact-icon-box { width:36px; height:36px; border-radius:10px; display:flex; align-items:center; justify-content:center; background:rgba(13,148,136,.1); border:1px solid rgba(13,148,136,.18); flex-shrink:0; transition:transform .2s; }
        .contact-icon-box:hover { transform:scale(1.1); }

        .contact-glow { position:absolute; width:250px; height:250px; border-radius:50%; background:radial-gradient(circle, rgba(13,148,136,.04), transparent 70%); pointer-events:none; }
      `}</style>

      <section id="contact" ref={ref} className="contact-section">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, rgba(13,148,136,.04), transparent 70%)" }} />
        <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] rounded-full blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, rgba(245,158,11,.03), transparent 70%)" }} />
        <div className="contact-glow" style={{ top: "20%", left: "5%" }} />
        <div className="contact-glow" style={{ bottom: "20%", right: "5%" }} />

        <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-16">
          <div className={`text-center mb-14 ${sectionVisible ? "animate-[slide-up_1s_cubic-bezier(.22,1,.36,1)_0.2s_both]" : "opacity-0"}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-900/30 bg-emerald-950/30 backdrop-blur-sm mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[10px] text-emerald-400/50 tracking-[0.2em] uppercase">Get in touch</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #0d9488, #14b8a6, #f59e0b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Let's Work Together</span>
            </h2>
            <p className="text-zinc-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-light mt-4">Have a project in mind? I'd love to explore how we can create something amazing together.</p>
          </div>

          <div className={`grid grid-cols-1 lg:grid-cols-5 gap-6 ${sectionVisible ? "animate-[slide-up_1s_cubic-bezier(.22,1,.36,1)_0.4s_both]" : "opacity-0"}`}>
            <div className="lg:col-span-3 contact-card p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="contact-icon-box"><MessageCircle className="w-4 h-4 text-emerald-400" /></div>
                <h3 className="text-base font-bold text-white">Send a Message</h3>
                <span className="ml-auto text-[10px] text-zinc-600 font-light hidden sm:inline">Avg. reply — 24h</span>
              </div>

              {status === "success" && <div className="mb-4 flex items-center gap-2 px-4 py-3 rounded-xl text-sm" style={{ background: "rgba(13,148,136,.08)", border: "1px solid rgba(13,148,136,.18)", color: "#5eead4" }}><CheckCircle2 className="w-4 h-4 shrink-0" /> Message sent — I'll get back soon!</div>}
              {status === "error" && <div className="mb-4 flex items-center gap-2 px-4 py-3 rounded-xl text-sm" style={{ background: "rgba(248,113,113,.06)", border: "1px solid rgba(248,113,113,.18)", color: "#fca5a5" }}><AlertCircle className="w-4 h-4 shrink-0" /> Please fix the highlighted fields.</div>}

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-zinc-400 font-medium mb-1.5 block">Your name</label>
                    <input id="c-name" name="name" value={formData.name} onChange={handleChange} placeholder="Jane Doe" className={`contact-input ${errors.name ? "input-error" : ""}`} />
                    {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="text-[10px] text-zinc-400 font-medium mb-1.5 block">Email</label>
                    <input id="c-email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="jane@company.com" className={`contact-input ${errors.email ? "input-error" : ""}`} />
                    {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-zinc-400 font-medium mb-1.5 block">Subject</label>
                  <input id="c-subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="What's this about?" className={`contact-input ${errors.subject ? "input-error" : ""}`} />
                  {errors.subject && <p className="text-xs text-red-400 mt-1">{errors.subject}</p>}
                </div>
                <div>
                  <label className="text-[10px] text-zinc-400 font-medium mb-1.5 block">Message</label>
                  <textarea id="c-message" name="message" value={formData.message} onChange={handleChange} placeholder="Tell me about your project..." rows={5} className={`contact-input resize-none ${errors.message ? "input-error" : ""}`} />
                  {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
                </div>
                <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-emerald-200 transition-all duration-200" style={{ background: "rgba(13,148,136,.1)", border: "1px solid rgba(13,148,136,.25)" }} onMouseEnter={e => { e.currentTarget.style.background = "rgba(13,148,136,.18)"; e.currentTarget.style.borderColor = "rgba(13,148,136,.45)"; }} onMouseLeave={e => { e.currentTarget.style.background = "rgba(13,148,136,.1)"; e.currentTarget.style.borderColor = "rgba(13,148,136,.25)"; }}><Send className="h-4 w-4" /> Send Message</button>
              </form>
            </div>

            <div className="lg:col-span-2 space-y-5">
              <div className="contact-card p-6">
                <h3 className="text-sm font-bold text-white mb-4">Get in Touch</h3>
                <div className="space-y-4">
                  {contactInfo.map((item) => (
                    <a key={item.label} href={item.href} target={item.label === "Location" ? "_blank" : undefined} className="flex items-center gap-3 group">
                      <div className="contact-icon-box group-hover:scale-110 transition-transform"><item.icon className="h-4 w-4 text-emerald-400" /></div>
                      <div>
                        <p className="text-[10px] text-zinc-500 tracking-wide font-medium">{item.label}</p>
                        <p className="text-sm text-zinc-300 group-hover:text-emerald-300 transition-colors">{item.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="contact-card p-6">
                <h3 className="text-xs font-semibold text-white mb-3">Follow Me</h3>
                <div className="flex gap-3">
                  {socialLinks.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="contact-social-btn"><HugeiconsIcon icon={s.icon} className="w-[16px] h-[16px]" /></a>
                  ))}
                </div>
              </div>

              <div className="contact-card p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" style={{ animation: "pulse-glow 2s ease-in-out infinite" }} />
                  <h3 className="text-xs font-semibold text-white">Available for Freelance</h3>
                </div>
                <p className="text-xs text-zinc-400 mb-2 font-light">Currently accepting new projects and collaborations.</p>
                <span className="inline-flex items-center gap-2 text-[10px] font-medium px-3 py-1 rounded-full" style={{ background: "rgba(13,148,136,.08)", border: "1px solid rgba(13,148,136,.18)", color: "#5eead4" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ animation: "float 2s ease-in-out infinite" }} /> Available now
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

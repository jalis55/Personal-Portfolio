import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = ["#home", "#about", "#skills", "#experience", "#projects", "#feedback", "#contact"];
const NAV_LABELS = ["Home", "About", "Skills", "Exp", "Work", "Clients", "Contact"];

export default function FloatingNav() {
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for active section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = NAV_LINKS.indexOf(`#${entry.target.id}`);
            if (idx >= 0) setActive(idx);
          }
        });
      },
      { threshold: 0.4 }
    );
    NAV_LINKS.forEach((href) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Top bar */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#020617]/80 backdrop-blur-xl" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#home" className="text-emerald-400 font-bold text-lg tracking-tight" style={{ textShadow: "0 0 20px rgba(13,148,136,.3)" }}>
            &lt;JMT/&gt;
          </a>
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LABELS.map((label, i) => (
              <a
                key={label}
                href={NAV_LINKS[i]}
                onClick={(e) => { e.preventDefault(); document.querySelector(NAV_LINKS[i])?.scrollIntoView({ behavior: "smooth" }); }}
                className={`relative px-3 py-1.5 text-xs tracking-wider uppercase transition-all duration-300 ${i === active ? "text-emerald-400" : "text-zinc-500 hover:text-zinc-300"}`}
              >
                {label}
                {i === active && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-emerald-400 rounded-full" />
                )}
              </a>
            ))}
          </nav>
          <button className="md:hidden text-zinc-400" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#020617]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-6">
          {NAV_LABELS.map((label, i) => (
            <a
              key={label}
              href={NAV_LINKS[i]}
              onClick={() => { setMenuOpen(false); document.querySelector(NAV_LINKS[i])?.scrollIntoView({ behavior: "smooth" }); }}
              className="text-2xl text-zinc-300 hover:text-emerald-400 transition-colors font-light tracking-wider"
            >
              {label}
            </a>
          ))}
        </div>
      )}

      {/* Floating side dots */}
      <div className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col gap-4">
        {NAV_LINKS.map((href, i) => (
          <button
            key={href}
            onClick={() => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === active ? "bg-emerald-400 w-6" : "bg-zinc-700 hover:bg-zinc-500"}`}
            title={NAV_LABELS[i]}
          />
        ))}
      </div>
    </>
  );
}

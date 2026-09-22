import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#feedback", label: "Feedback" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-[#020617]/85 backdrop-blur-xl border-b border-zinc-800/40" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="#home" className="font-bold text-xl text-emerald-400 transition-all duration-300 hover:text-emerald-300" style={{ textShadow: "0 0 20px rgba(13,148,136,.3)" }}>
            {"<JMT />"}
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map(({ href, label }) => (
              <a key={href} href={href} className="text-zinc-400 hover:text-emerald-400 transition-all duration-200 font-medium text-sm px-3 py-2 rounded-lg hover:bg-emerald-950/30 relative group">
                {label}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-3/4" />
              </a>
            ))}
          </div>

          <Button variant="ghost" size="icon" className="md:hidden text-zinc-400 hover:text-emerald-400" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {isOpen && (
          <div className="md:hidden border-t border-zinc-800/40 bg-[#020617]/95 backdrop-blur-xl">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map(({ href, label }) => (
                <a key={href} href={href} onClick={() => setIsOpen(false)} className="block px-3 py-2.5 text-zinc-300 hover:text-emerald-400 transition-all duration-200 rounded-lg hover:bg-emerald-950/30">{label}</a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

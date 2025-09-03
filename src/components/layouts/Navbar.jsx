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
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300
        ${scrolled
          ? "bg-slate-900/70 backdrop-blur-lg border-b border-slate-800"
          : "bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="#home" className="font-bold text-xl text-sky-400">
            {"<Dev />"}
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            {navItems.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="text-slate-300 hover:text-sky-400 transition-colors duration-200 font-medium"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-slate-300 hover:text-sky-400"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-slate-800 bg-slate-900/90 backdrop-blur-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-slate-200 hover:text-sky-400 transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
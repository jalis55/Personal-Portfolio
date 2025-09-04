import { Button } from "@/components/ui/button";
import { Mail, ArrowDown } from "lucide-react";
import { HugeiconsIcon } from '@hugeicons/react';
import { FiverrIcon, Github01Icon, Linkedin02Icon } from '@hugeicons/core-free-icons';

const Hero = () => {

  const socialLinks = [
    { icon: Linkedin02Icon, label: "GitHub", href: "https://github.com/jalis55" },
    { icon: Github01Icon, label: "LinkedIn", href: "https://linkedin.com/in/jalismtarif/" },
    { icon: FiverrIcon, label: "Twitter", href: "https://fiverr.com/jalis_tarif" },
  ];

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative isolate overflow-hidden bg-slate-950"
    >
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse [animation-delay:2s]" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:36px_36px]" />

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-slate-50 via-slate-200 to-slate-400">
          Hi, I’m <span className="text-sky-400">Jalis Mahamud Tarif</span>
        </h1>

        <p className="mt-4 text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Full-Stack Developer & Problem Solver
        </p>

        <p className="mt-6 text-slate-500 max-w-xl mx-auto">
          I craft exceptional digital experiences with modern technologies.
          Passionate about clean code, innovative solutions, and turning ideas
          into reality.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="px-8 py-6 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-400/30 hover:bg-sky-500/30 hover:text-sky-100 transition-all duration-300"
          >
            View My Work
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="px-8 py-6 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-400/30 hover:bg-sky-500/30 hover:text-sky-100 transition-all duration-300"
          >
            Download Resume
          </Button>
        </div>

        <div className="mt-12 flex justify-center space-x-5">
          {socialLinks.map((s, i) => (
            <a
              key={i}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              href={s.href}
              className="p-3 rounded-full bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:bg-slate-700/50 hover:text-slate-100 transition-all duration-300"
            >

              <HugeiconsIcon className="w-5 h-5" icon={s.icon} />
            </a>
          ))}
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-5 h-5 text-slate-500" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
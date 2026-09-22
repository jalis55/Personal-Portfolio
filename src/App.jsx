import FloatingNav from './components/layouts/FloatingNav';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Contact from './components/sections/Contact';
import ClientsFeedback from './components/sections/ClientsFeedback';

function App({ loaded }) {
  return (
    <div className="min-h-screen bg-[#020617]">
      <FloatingNav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <ClientsFeedback />
        <Contact />
      </main>
      <footer className="relative z-10 border-t border-zinc-800/30 bg-[#020617]/50 backdrop-blur-sm py-10 text-center">
        <p className="text-[10px] text-zinc-700 tracking-wider">
          © {new Date().getFullYear()} Jalis Mahamud Tarif
        </p>
        <p className="text-[9px] text-zinc-800 mt-1 tracking-wider">Crafted with intention, built with code</p>
      </footer>
    </div>
  );
}

export default App;

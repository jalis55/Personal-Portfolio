import Navbar from './components/layouts/Navbar'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import { Skills } from './components/sections/Skills'
import { Projects } from './components/sections/Projects'
import { Experience } from './components/sections/Experience'
import { Contact } from './components/sections/Contact'
import { ClientsFeedback } from './components/sections/ClientsFeedback'



function App() {
  return (



    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <ClientsFeedback />
        <Contact />
      </main>
      <footer className="border-t border-slate-800/60 bg-slate-950 py-8 text-center">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} Jalis Mahamud Tarif. Built with React, Vite & Tailwind CSS.
        </p>
        <p className="text-xs text-slate-600 mt-1">Crafted with care in Dhaka, Bangladesh</p>
      </footer>
    </div>

  )
}

export default App

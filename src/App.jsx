import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'
import Navbar from './components/layouts/Navbar'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import { Skills } from './components/sections/Skills'
import { Projects } from './components/sections/Projects'
import { Experience } from './components/sections/Experience'
import { Contact } from './components/sections/Contact'
import { ClientsFeedback } from './components/sections/ClientsFeedback'



function App() {
  const [count, setCount] = useState(0)

  return (



    <div className="min-h-screen bg-background">
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
    </div>

  )
}

export default App

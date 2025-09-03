import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X,Github,Linkedin,Mail,ArrowDown } from "lucide-react"




const Hero = () => {
  return (
 <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      {/* <div className="absolute inset-0 bg-[url('/abstract-geometric-pattern.png')] opacity-5 bg-repeat" /> */}


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance">
              <span className="text-foreground">Hi, I'm </span>
              <span className="text-primary">Alex Johnson</span>
            </h1>
            <h2 className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-medium">
              Full-Stack Developer & Problem Solver
            </h2>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            I craft exceptional digital experiences with modern technologies. Passionate about clean code, innovative
            solutions, and turning ideas into reality.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="text-lg px-8 py-6">
              View My Work
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
              Download Resume
            </Button>
          </div>

          <div className="flex justify-center space-x-6 pt-8">
            <Button variant="ghost" size="icon" className="h-12 w-12">
              <Github className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="h-12 w-12">
              <Linkedin className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="h-12 w-12">
              <Mail className="h-6 w-6" />
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-6 w-6 text-muted-foreground" />
        </div>
      </div>
    </section>
  )
}

export default Hero;

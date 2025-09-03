import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"

export function Projects() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "A full-stack e-commerce solution with real-time inventory management, payment processing, and admin dashboard.",
      image: "/modern-ecommerce-dashboard.png",
      technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Tailwind CSS"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    {
      title: "Task Management App",
      description: "Collaborative project management tool with real-time updates, team chat, and advanced analytics.",
      image: "/task-management-interface.png",
      technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Material-UI"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    {
      title: "AI Content Generator",
      description:
        "SaaS platform that leverages AI to generate marketing content, blog posts, and social media captions.",
      image: "/ai-content-generation-interface.png",
      technologies: ["Next.js", "OpenAI API", "Supabase", "Stripe", "Framer Motion"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    {
      title: "Weather Dashboard",
      description: "Beautiful weather application with location-based forecasts, interactive maps, and weather alerts.",
      image: "/weather-dashboard-interface.png",
      technologies: ["Vue.js", "Express", "Weather API", "Chart.js"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
    },
    {
      title: "Fitness Tracker",
      description: "Mobile-first fitness application with workout planning, progress tracking, and social features.",
      image: "/fitness-tracking-app.png",
      technologies: ["React Native", "Firebase", "Redux", "Expo"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
    },
    {
      title: "Portfolio Website",
      description: "Responsive portfolio website with dynamic content management and contact form integration.",
      image: "/portfolio-website-design.png",
      technologies: ["Gatsby", "GraphQL", "Netlify CMS", "SCSS"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
    },
  ]

  const featuredProjects = projects.filter((project) => project.featured)
  const otherProjects = projects.filter((project) => !project.featured)

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
            A showcase of my recent work, demonstrating expertise across different technologies and problem domains.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="space-y-12 mb-20">
          {featuredProjects.map((project, index) => (
            <Card key={index} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
              >
                <div className={`relative overflow-hidden ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <div className={`p-8 lg:p-12 flex flex-col justify-center ${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                  <CardHeader className="p-0 mb-6">
                    <CardTitle className="text-2xl mb-3">{project.title}</CardTitle>
                    <p className="text-muted-foreground text-lg leading-relaxed">{project.description}</p>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <Button asChild>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                      <Button variant="outline" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          Code
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Other Projects Grid */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-12">Other Notable Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherProjects.map((project, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" asChild className="flex-1 bg-transparent">
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Demo
                      </a>
                    </Button>
                    <Button size="sm" variant="outline" asChild className="flex-1 bg-transparent">
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-3 w-3 mr-1" />
                        Code
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

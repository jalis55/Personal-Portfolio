import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import p1 from './project_images/bos.png';
import p2 from './project_images/reserva.png';
import p3 from './project_images/kb.png'


export function Projects() {
  const projects = [
    {
      
      title: "Back Office Software",
      description: "A complete back office software for tracking mutual investment on share market",
      image: p1,
      technologies: ["Djanog", "Django Rest Framework", "Redis", "React", "TailwindCss"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    {
      title: "E-Commerce Platform",
      description:
        "A full-stack e-commerce solution with real-time inventory management, payment processing, and admin dashboard.",
      image: p3,
      technologies: ["Dango", "Javascript", "PostgreSQL", "Bootstrap"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
    },

    {
      title: "Organizations Lunch Booking System",
      description:
        "A complete solution for manaing lunch distributins and reduce wastage.",
      image: p2,
      technologies: ["Django", "Django Rest Framework", "Javascript", "React", "TailwindCss"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    // {
    //   title: "Weather Dashboard",
    //   description: "Beautiful weather application with location-based forecasts, interactive maps, and weather alerts.",
    //   image: "/weather-dashboard-interface.png",
    //   technologies: ["Vue.js", "Express", "Weather API", "Chart.js"],
    //   liveUrl: "#",
    //   githubUrl: "#",
    //   featured: false,
    // },
    // {
    //   title: "Fitness Tracker",
    //   description: "Mobile-first fitness application with workout planning, progress tracking, and social features.",
    //   image: "/fitness-tracking-app.png",
    //   technologies: ["React Native", "Firebase", "Redux", "Expo"],
    //   liveUrl: "#",
    //   githubUrl: "#",
    //   featured: false,
    // },
    // {
    //   title: "Portfolio Website",
    //   description: "Responsive portfolio website with dynamic content management and contact form integration.",
    //   image: "/portfolio-website-design.png",
    //   technologies: ["Gatsby", "GraphQL", "Netlify CMS", "SCSS"],
    //   liveUrl: "#",
    //   githubUrl: "#",
    //   featured: false,
    // },
  ];

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">
            Featured Projects
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            A showcase of my recent work, demonstrating expertise across
            different technologies and problem domains.
          </p>
        </div>

        {/* Featured projects */}
        <div className="space-y-12 mb-20">
          {featuredProjects.map((p, i) => (
            <Card
              key={p.title}
              className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden
                         hover:border-sky-400/40 transition-all duration-300"
            >
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 ${i % 2 ? "lg:grid-flow-col-dense" : ""}`}
              >
                {/* Image */}
                <div
                  className={`relative overflow-hidden ${i % 2 ? "lg:col-start-2" : ""}`}
                >
                  <img
                    src={p.image || "/placeholder.svg"}
                    alt={p.title}
                    className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div
                  className={`p-8 lg:p-10 flex flex-col justify-center ${i % 2 ? "lg:col-start-1" : ""}`}
                >
                  <h3 className="text-2xl font-bold text-slate-100 mb-3">{p.title}</h3>
                  <p className="text-slate-400 mb-6 leading-relaxed">{p.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {p.technologies.map((t) => (
                      <Badge
                        key={t}
                        variant="outline"
                        className="border-slate-700 text-slate-300 text-sm
                                   hover:bg-sky-400/20 hover:border-sky-400/60 hover:text-sky-300"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <Button
                      asChild
                      className="bg-sky-500/20 text-sky-300 border border-sky-400/30 
               hover:bg-sky-500/30 hover:text-sky-100"
                    >
                      <a href={p.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>

                    <Button
                      variant="outline"
                      asChild
                      className="border-slate-600 bg-transparent text-slate-300 
               hover:bg-slate-800 hover:border-slate-400"
                    >
                      <a href={p.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Other projects grid */}
        <div>
          {/* <h3 className="text-2xl font-bold text-center text-slate-100 mb-10">
            Other Notable Projects
          </h3> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((p) => (
              <Card
                key={p.title}
                className="bg-slate-900/50 border border-slate-800 rounded-2xl
                           hover:border-sky-400/40 hover:-translate-y-1 transition-all"
              >
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img
                    src={p.image || "/placeholder.svg"}
                    alt={p.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg text-slate-100">{p.title}</CardTitle>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {p.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {p.technologies.slice(0, 3).map((t) => (
                      <Badge
                        key={t}
                        variant="outline"
                        className="border-slate-700 text-slate-400 text-xs
                                   hover:bg-sky-400/20 hover:border-sky-400/60"
                      >
                        {t}
                      </Badge>
                    ))}
                    {p.technologies.length > 3 && (
                      <Badge variant="outline" className="border-slate-700 text-slate-400 text-xs">
                        +{p.technologies.length - 3}
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      asChild
                      className="flex-1 bg-transparent border-slate-600 text-slate-300
               hover:bg-slate-800 hover:text-slate-100"
                    >
                      <a href={p.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Demo
                      </a>
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      asChild
                      className="flex-1 bg-transparent border-slate-600 text-slate-300
               hover:bg-slate-800 hover:text-slate-100"
                    >
                      <a href={p.githubUrl} target="_blank" rel="noopener noreferrer">
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
  );
}
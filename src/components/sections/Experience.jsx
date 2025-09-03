import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin } from "lucide-react"

export function Experience() {
  const experiences = [
    {
      title: "Senior Full-Stack Developer",
      company: "TechCorp Solutions",
      location: "San Francisco, CA",
      period: "2022 - Present",
      description:
        "Lead development of scalable web applications serving 100K+ users. Architected microservices infrastructure and mentored junior developers.",
      achievements: [
        "Reduced application load time by 40% through optimization",
        "Led team of 5 developers on major product redesign",
        "Implemented CI/CD pipeline reducing deployment time by 60%",
      ],
      technologies: ["React", "Node.js", "AWS", "PostgreSQL", "Docker"],
    },
    {
      title: "Full-Stack Developer",
      company: "StartupXYZ",
      location: "Austin, TX",
      period: "2020 - 2022",
      description:
        "Developed MVP and scaled platform from 0 to 50K users. Built responsive web applications and RESTful APIs.",
      achievements: [
        "Built entire frontend from scratch using React",
        "Designed and implemented user authentication system",
        "Integrated payment processing with Stripe",
      ],
      technologies: ["React", "Express", "MongoDB", "Stripe", "Heroku"],
    },
    {
      title: "Frontend Developer",
      company: "Digital Agency Pro",
      location: "Remote",
      period: "2019 - 2020",
      description:
        "Created responsive websites and web applications for various clients. Collaborated with designers to implement pixel-perfect UIs.",
      achievements: [
        "Delivered 20+ client projects on time and budget",
        "Improved website performance scores by average 35%",
        "Established component library for team efficiency",
      ],
      technologies: ["Vue.js", "SCSS", "WordPress", "Figma", "Git"],
    },
  ]

  return (
    <section id="experience" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Professional Experience</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
            A journey of growth, learning, and delivering impactful solutions across different industries and team
            environments.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-border"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative flex items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 w-3 h-3 bg-primary rounded-full border-4 border-background z-10"></div>

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                  <Card className="group hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                          {exp.title}
                        </CardTitle>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          {exp.period}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-semibold text-lg text-accent">{exp.company}</h4>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-1" />
                          {exp.location}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4 leading-relaxed">{exp.description}</p>

                      <div className="mb-4">
                        <h5 className="font-semibold mb-2">Key Achievements:</h5>
                        <ul className="space-y-1">
                          {exp.achievements.map((achievement, achIndex) => (
                            <li key={achIndex} className="text-sm text-muted-foreground flex items-start">
                              <span className="text-primary mr-2 mt-1">•</span>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-semibold mb-2">Technologies:</h5>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, techIndex) => (
                            <Badge key={techIndex} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="mt-20 pt-16 border-t border-border">
          <h3 className="text-2xl font-bold text-center mb-12">Education & Certifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg">Bachelor of Computer Science</CardTitle>
                <p className="text-muted-foreground">University of Technology • 2015-2019</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Graduated Magna Cum Laude with focus on Software Engineering and Web Development.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg">AWS Certified Solutions Architect</CardTitle>
                <p className="text-muted-foreground">Amazon Web Services • 2023</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Professional certification in designing distributed systems on AWS platform.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

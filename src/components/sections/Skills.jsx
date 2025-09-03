import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function Skills() {
  const skillCategories = [
    {
      title: "Frontend",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js", "HTML5", "CSS3", "JavaScript"],
    },
    {
      title: "Backend",
      skills: ["Node.js", "Express", "Python", "Django", "PostgreSQL", "MongoDB", "Redis", "GraphQL"],
    },
    {
      title: "DevOps & Tools",
      skills: ["Docker", "AWS", "Vercel", "Git", "GitHub Actions", "Jest", "Cypress", "Figma"],
    },
    {
      title: "Mobile & Other",
      skills: ["React Native", "Flutter", "Firebase", "Supabase", "Stripe", "Socket.io", "REST APIs", "Microservices"],
    },
  ]

  return (
    <section id="skills" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Skills & Technologies</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
            A comprehensive toolkit built through years of hands-on experience and continuous learning in the
            ever-evolving tech landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl text-primary group-hover:text-accent transition-colors duration-300">
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge
                      key={skillIndex}
                      variant="secondary"
                      className="hover:bg-primary hover:text-primary-foreground transition-colors duration-200 cursor-default"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">Always Learning</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Technology evolves rapidly, and so do I. Currently exploring AI/ML integration, Web3 technologies, and
              advanced cloud architectures to stay ahead of the curve.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="outline" className="border-primary text-primary">
                AI/ML
              </Badge>
              <Badge variant="outline" className="border-primary text-primary">
                Web3
              </Badge>
              <Badge variant="outline" className="border-primary text-primary">
                Kubernetes
              </Badge>
              <Badge variant="outline" className="border-primary text-primary">
                Rust
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

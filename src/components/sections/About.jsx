import { Card, CardContent } from "@/components/ui/card"
import { Code, Lightbulb, Users, Zap } from "lucide-react"

const About=()=> {
  const highlights = [
    {
      icon: Code,
      title: "Clean Code",
      description: "Writing maintainable, scalable, and efficient code that stands the test of time.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Always exploring new technologies and methodologies to solve complex problems.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Working effectively with cross-functional teams to deliver exceptional results.",
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Optimizing applications for speed, accessibility, and user experience.",
    },
  ]

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">About Me</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
            I'm a passionate full-stack developer with 5+ years of experience building web applications that make a
            difference. I love turning complex problems into simple, beautiful solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {highlights.map((item, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <item.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-card rounded-lg p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6">My Journey</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Started my coding journey in college, where I discovered my passion for creating digital solutions.
                  What began as curiosity quickly evolved into a career dedicated to crafting exceptional user
                  experiences.
                </p>
                <p>
                  Today, I specialize in modern web technologies including React, Node.js, and cloud platforms. I've had
                  the privilege of working with startups and established companies, helping them bring their visions to
                  life.
                </p>
                <p>
                  When I'm not coding, you'll find me contributing to open source projects, mentoring aspiring
                  developers, or exploring the latest in tech innovation.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="/professional-developer-portrait.png"
                alt="Alex Johnson"
                className="rounded-lg shadow-lg max-w-sm w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default About;
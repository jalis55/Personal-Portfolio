import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
  ];

  return (
    <section id="skills" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">
            Skills & Technologies
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            A comprehensive toolkit forged through years of hands-on experience
            and continuous learning in the ever-evolving tech landscape.
          </p>
        </div>

        {/* 4 skill cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map(({ title, skills }) => (
            <Card
              key={title}
              className="bg-slate-900/50 border border-slate-800 rounded-2xl 
                         hover:border-sky-400/40 transition-all duration-300"
            >
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-100">
                  {title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="border-slate-700 text-slate-300 
                                 hover:bg-sky-400/20 hover:border-sky-400/60 
                                 hover:text-sky-300 transition-all duration-200"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Always Learning block */}
        <div className="mt-20 max-w-3xl mx-auto">
          <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 md:p-10 text-center">
            <h3 className="text-2xl font-bold text-slate-100 mb-4">
              Always Learning
            </h3>
            <p className="text-slate-400 mb-6">
              Technology evolves rapidly—and so do I. Currently exploring
              AI/ML integration, Web3 technologies, and advanced cloud
              architectures to stay ahead of the curve.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {["AI/ML", "Web3", "Kubernetes", "Rust"].map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="border-sky-400 text-sky-400 
                             hover:bg-sky-400/20 transition-colors"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
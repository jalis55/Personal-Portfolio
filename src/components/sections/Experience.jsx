import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";

export function Experience() {
  const experiences = [
    {
      title: "Senior Full-Stack Developer",
      company: "TechCorp Solutions",
      location: "San Francisco, CA",
      period: "2022 - Present",
      description:
        "Lead development of scalable web applications serving 100K+ users. Architected micro-services and mentored juniors.",
      achievements: [
        "Reduced load time by 40 % through optimization",
        "Led 5-developer team on major product redesign",
        "CI/CD pipeline cut deployment time by 60 %",
      ],
      technologies: ["React", "Node.js", "AWS", "PostgreSQL", "Docker"],
    },
    {
      title: "Full-Stack Developer",
      company: "StartupXYZ",
      location: "Austin, TX",
      period: "2020 - 2022",
      description:
        "Built MVP and scaled platform from 0 to 50 K users. Implemented responsive UIs and robust REST APIs.",
      achievements: [
        "React SPA from scratch with 95 % Lighthouse score",
        "JWT auth & role-based access control",
        "Stripe integration handling $500k+ revenue",
      ],
      technologies: ["React", "Express", "MongoDB", "Stripe", "Heroku"],
    },
    {
      title: "Frontend Developer",
      company: "Digital Agency Pro",
      location: "Remote",
      period: "2019 - 2020",
      description:
        "Delivered pixel-perfect websites for 20+ clients; improved performance & established reusable component library.",
      achievements: [
        "Average 35 % faster load times across projects",
        "Reusable Vue component library adopted by 6 teams",
        "Perfect Lighthouse scores on 90 % of launches",
      ],
      technologies: ["Vue.js", "SCSS", "WordPress", "Figma", "Git"],
    },
  ];

  return (
    <section id="experience" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">
            Professional Experience
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            A journey of growth, learning, and delivering impactful solutions
            across industries and team environments.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-700 md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-16">
            {experiences.map((exp, i) => (
              <div
                key={i}
                className="relative flex items-start md:items-center"
              >
                {/* dot */}
                <div className="absolute left-4 top-2 w-3 h-3 rounded-full bg-sky-400 ring-4 ring-slate-950 z-10 md:left-1/2 md:-translate-x-1/2" />

                {/* content card */}
                <div
                  className={`ml-14 md:w-1/2 md:ml-0 ${i % 2 === 0 ? "md:pr-10" : "md:pl-10 md:ml-auto"}`}
                >
                  <Card className="bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-sky-400/40 transition-all">
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <CardTitle className="text-xl font-semibold text-slate-100">
                          {exp.title}
                        </CardTitle>
                        <div className="flex items-center text-sm text-slate-400 shrink-0">
                          <Calendar className="h-4 w-4 mr-1 text-sky-400" />
                          {exp.period}
                        </div>
                      </div>
                      <p className="text-lg font-medium text-sky-300">{exp.company}</p>
                      <div className="flex items-center text-sm text-slate-400">
                        <MapPin className="h-4 w-4 mr-1 text-sky-400" />
                        {exp.location}
                      </div>
                    </CardHeader>

                    <CardContent>
                      <p className="text-slate-300 mb-4 leading-relaxed">{exp.description}</p>

                      <div className="mb-4">
                        <h5 className="font-semibold text-sm text-slate-200 mb-2">Key Achievements</h5>
                        <ul className="space-y-1.5">
                          {exp.achievements.map((ach, idx) => (
                            <li key={idx} className="text-sm text-slate-400 flex items-start">
                              <span className="text-sky-400 mr-2 mt-1">•</span>
                              {ach}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-semibold text-sm text-slate-200 mb-2">Technologies</h5>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech) => (
                            <Badge
                              key={tech}
                              variant="outline"
                              className="border-slate-700 text-slate-300 text-xs
                                         hover:bg-sky-400/20 hover:border-sky-400/60"
                            >
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

        {/* Education & Certs */}
        <div className="mt-24 pt-16 border-t border-slate-800">
          <h3 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400 mb-10">
            Education & Certifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Bachelor of Computer Science",
                meta: "University of Technology • 2015 – 2019",
                note: "Magna Cum Laude, focus on Software Engineering & Web Dev",
              },
              {
                title: "AWS Certified Solutions Architect",
                meta: "Amazon Web Services • 2023",
                note: "Professional cert in distributed-system design on AWS",
              },
            ].map((edu) => (
              <Card
                key={edu.title}
                className="bg-slate-900/50 border border-slate-800 rounded-2xl"
              >
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-slate-100">
                    {edu.title}
                  </CardTitle>
                  <p className="text-sm text-sky-300">{edu.meta}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-400">{edu.note}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
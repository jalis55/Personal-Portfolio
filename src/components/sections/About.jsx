import { Card, CardContent } from "@/components/ui/card";
import { Code, Lightbulb, Users, Zap } from "lucide-react";
import pp from '../../assets/imgg_tarif.png';

const About = () => {
  const highlights = [
    {
      icon: Code,
      title: "Clean Code",
      description:
        "Writing maintainable, scalable, and efficient code that stands the test of time.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "Always exploring new technologies and methodologies to solve complex problems.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description:
        "Working effectively with cross-functional teams to deliver exceptional results.",
    },
    {
      icon: Zap,
      title: "Performance",
      description:
        "Optimizing applications for speed, accessibility, and user experience.",
    },
  ];

  return (
    <section id="about" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">
            About Me
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            I’m a full-stack developer with 3+ years of experience building products that blend seamless UX with smart AI. From React-powered interfaces styled with Tailwind CSS to Python backends handling PostgreSQL and Redis for high-performance data flows, I love dissecting complex challenges—like predictive modeling with Scikit-learn or agentic workflows in LangChain—and distilling them into elegant, intuitive solutions that scale.
          </p>
        </div>

        {/* 4-column cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {highlights.map(({ icon: Icon, title, description }) => (
            <Card
              key={title}
              className="bg-slate-900/50 border border-slate-800 rounded-2xl 
                         hover:border-sky-400/40 hover:-translate-y-1 transition-all duration-300"
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-4 p-3 rounded-xl bg-sky-400/10 border border-sky-400/20">
                  <Icon className="w-6 h-6 text-sky-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                  {description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Journey block */}
        <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
            <div className="lg:col-span-3">
              <h3 className="text-2xl font-bold text-slate-100 mb-5">
                My Journey
              </h3>
              <div className="space-y-4 text-slate-400 text-base">
                <p>
                  I started coding in college, sparked by a simple Python script that automated my study notes, and quickly fell in love with crafting digital solutions that solve real problems. What began as curiosity evolved into a career blending full-stack development with AI innovation, always chasing exceptional user experiences.
                </p>
                <p>
                  Today, I build scalable apps using React.js for dynamic frontends, Python with Django or FastAPI for robust backends, and integrate AI/ML tools like Scikit-learn and LangChain to power intelligent features—all deployed via Docker and GitHub Actions. Whether it's helping startups launch MVPs or enterprises optimize with RAG-enhanced systems, I thrive on turning bold ideas into reality.
                </p>
                <p>
                  When I’m not coding, I’m contributing to open-source projects, mentoring aspiring devs, or diving into the latest in LLMs and prompt engineering.
                </p>
              </div>
            </div>

            <div className="lg:col-span-2 flex justify-center">
              <img
                src={pp}
                alt="Alex Johnson"
                className="rounded-xl shadow-2xl shadow-slate-900/60 w-full max-w-[280px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
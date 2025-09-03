import { Star, Quote } from "lucide-react";

export function ClientsFeedback() {
  const testimonials = [
    {
      name: "Sarah Williams",
      role: "Product Manager, TechCorp",
      avatar: "/avatars/sarah-w.jpg",
      content:
        "Alex delivered a rock-solid platform that cut our onboarding time in half. His ability to translate complex requirements into clean, scalable code is second to none.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "CEO, StartupXYZ",
      avatar: "/avatars/michael-c.jpg",
      content:
        "From MVP to 50 k users, Alex was the backbone of our engineering team. Always proactive, always reliable—he’s the kind of developer every startup dreams of.",
      rating: 5,
    },
    {
      name: "Jessica Lee",
      role: "Marketing Director, Digital Agency Pro",
      avatar: "/avatars/jessica-l.jpg",
      content:
        "Working with Alex was a breeze. He turned our Figma files into pixel-perfect, lightning-fast sites and improved our Core Web Vitals by 40 %.",
      rating: 5,
    },
  ];

  const StarRating = (rating ) => (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-current" : "text-slate-600"}`}
        />
      ))}
    </div>
  );

  return (
    <section id="feedback" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">
            Clients Feedback
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            What people are saying about collaborating with me.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 flex flex-col
                         hover:border-sky-400/40 transition-all duration-300"
            >
              {/* Quote icon */}
              <Quote className="h-8 w-8 text-sky-400 mb-4" />

              {/* Stars */}
              <StarRating rating={t.rating} />

              {/* Content */}
              <p className="text-slate-300 mt-4 mb-6 leading-relaxed grow">
                {t.content}
              </p>

              {/* Avatar + Meta */}
              <div className="flex items-center gap-4">
                <img
                  src={t.avatar || "/placeholder-avatar.png"}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border border-slate-700"
                />
                <div>
                  <p className="font-semibold text-slate-100">{t.name}</p>
                  <p className="text-sm text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
import { Star, Quote } from "lucide-react";
import { US, FR } from "country-flag-icons/react/3x2";

export function ClientsFeedback() {
  const testimonials = [
    {
      name: "javiersossa",
      country: <US className='w-6 h-auto rounded' title='United States' />,
      avatar: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/c02ce2775a79b554d75802a45c39aab8-1693576627766/5ff6adfc-8ab3-4f7c-afbf-43d670a0996d.png",
      content:
        "Jalis is amazing. His work is great and he went far and beyond to accomplish everything I needed! Thank you again!",
      rating: 5,
    },
    {
      name: "mkjetta4",
      country: <US className='w-6 h-auto rounded' title='United States' />,
      avatar: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/fbc51e27a9df5410dd6f5f5a537b5901-165650611613792734.43191/4376932A-E0AB-493C-B8C5-82F9EC0678B5",

      content:
        "The best, he is the best in his field.",
      rating: 5,
    },
    {
      name: "danieledery03",
      country: <FR className='w-6 h-auto rounded' title='France' />,
      avatar: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/fa521efddfb6dbf95ad39c1536a23531-1674473093653/795feca5-53a4-4351-bc27-640308f29295.JPG",
      content:
        "Very professional and very good person, the work is really good ! I recommand👍",
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
                  {t.country}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
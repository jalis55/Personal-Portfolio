import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from "lucide-react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "alex.johnson@email.com", href: "mailto:alex.johnson@email.com" },
    { icon: Phone, label: "Phone", value: "+1 (555) 123-4567", href: "tel:+15551234567" },
    { icon: MapPin, label: "Location", value: "San Francisco, CA", href: "#" },
  ];

  const socialLinks = [
    { icon: Github, label: "GitHub", href: "https://github.com" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
    { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
  ];

  return (
    <section id="contact" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">
            Let&apos;s Work Together
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            Have a project in mind or want to discuss opportunities? I'd love to
            hear from you and explore how we can create something amazing together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Form */}
          <Card className="bg-slate-900/50 border border-slate-800 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-slate-100">Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="bg-slate-800/60 border-slate-700 text-slate-100 placeholder-slate-500 rounded-lg"
                  />
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                    className="bg-slate-800/60 border-slate-700 text-slate-100 placeholder-slate-500 rounded-lg"
                  />
                </div>
                <Input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  required
                  className="bg-slate-800/60 border-slate-700 text-slate-100 placeholder-slate-500 rounded-lg"
                />
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or idea..."
                  rows={5}
                  required
                  className="bg-slate-800/60 border-slate-700 text-slate-100 placeholder-slate-500 rounded-lg resize-none"
                />
                <Button
                  type="submit"
                  className="w-full bg-sky-500/20 text-sky-300 border border-sky-400/30
                             hover:bg-sky-500/30 hover:text-sky-100 rounded-lg"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info & Social */}
          <div className="space-y-8">
            <Card className="bg-slate-900/50 border border-slate-800 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-slate-100">Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-center space-x-4">
                    <div className="p-2.5 bg-sky-400/10 rounded-lg">
                      <item.icon className="h-5 w-5 text-sky-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-300">{item.label}</p>
                      <a
                        href={item.href}
                        className="text-sm text-slate-400 hover:text-sky-400 transition-colors"
                      >
                        {item.value}
                      </a>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border border-slate-800 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-100">Follow Me</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-3">
                  {socialLinks.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="p-2.5 bg-slate-800/60 rounded-lg text-slate-400
                                 hover:bg-sky-400/20 hover:text-sky-400 transition-all"
                    >
                      <s.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-3">
                  Connect for updates on my latest projects and tech insights.
                </p>
              </CardContent>
            </Card>

            {/* Availability badge */}
            <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
              <h3 className="font-semibold text-slate-100 mb-2">Available for Freelance</h3>
              <p className="text-sm text-slate-400 mb-3">
                Currently accepting new projects and collaborations—let’s discuss your idea.
              </p>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="font-medium text-green-400">Available Now</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-24 pt-10 border-t border-slate-800 text-center">
          <p className="text-sm text-slate-500">
            © 2024 Alex Johnson. Built with Next.js, TypeScript & Tailwind CSS.
          </p>
          <p className="text-xs text-slate-600 mt-2">
            Designed and developed with ❤️ in San Francisco
          </p>
        </footer>
      </div>
    </section>
  );
}
import Link from "next/link";
import { Cpu, GitBranch, ExternalLink, Link2, Mail } from "lucide-react";

export default function Footer() {
  const footerLinks = {
    Platform: [
      { label: "Find Talent", href: "/freelancers" },
      { label: "Browse Jobs", href: "/jobs" },
      { label: "Data Tasks", href: "/tasks" },
      { label: "Post a Job", href: "/jobs/post" },
    ],
    "For Freelancers": [
      { label: "Create Profile", href: "/auth/signup" },
      { label: "How It Works", href: "/#how-it-works" },
      { label: "Skill Categories", href: "/#categories" },
      { label: "Data Contributor Guide", href: "/contributor-guide" },
    ],
    Resources: [
      { label: "Help Center", href: "/help" },
      { label: "Blog", href: "/blog" },
      { label: "API Docs", href: "/docs" },
      { label: "Trust & Safety", href: "/trust" },
    ],
    Company: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  };

  return (
    <footer className="border-t border-white/5 bg-navy-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-white">AI</span>
                <span className="gradient-text">Hire</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 mb-6 max-w-[200px]">
              The premier marketplace for AI talent and training data services.
            </p>
            <div className="flex gap-3">
              {[ExternalLink, GitBranch, Link2, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-600">
            © {new Date().getFullYear()} AIHire. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-slate-600 hover:text-slate-400">Privacy</Link>
            <Link href="/terms" className="text-sm text-slate-600 hover:text-slate-400">Terms</Link>
            <Link href="/cookies" className="text-sm text-slate-600 hover:text-slate-400">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

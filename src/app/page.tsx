"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Search, ArrowRight, Star, CheckCircle, Users, Briefcase,
  Database, BarChart3, MessageSquare, Bot, Settings, Eye,
  Mic, Lightbulb, ThumbsUp, Sparkles, Zap, Shield, Clock,
  ChevronRight, Play
} from "lucide-react";
import { CATEGORIES, STATS } from "@/lib/constants";

const iconMap: Record<string, any> = {
  MessageSquare, Bot, Settings, Eye, Mic, Lightbulb, Database, ThumbsUp, Sparkles,
};

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="relative overflow-hidden">
      {/* Background effects */}
      <div className="orb-blue" style={{ top: "-200px", right: "-100px" }} />
      <div className="orb-purple" style={{ top: "300px", left: "-150px" }} />
      <div className="orb-teal" style={{ bottom: "200px", right: "10%" }} />

      {/* ── HERO SECTION ── */}
      <section className="relative min-h-[90vh] flex items-center bg-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Announcement badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-medium mb-8 animate-fade-in-up">
              <Database className="w-4 h-4" />
              New: AI Training Data Collection Hub
              <ArrowRight className="w-3 h-3" />
            </div>

            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-6 animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              Hire the World&apos;s Best{" "}
              <span className="gradient-text">AI Talent</span>
            </h1>

            <p
              className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              From prompt engineering to training data collection — find elite AI
              freelancers or contribute to cutting-edge datasets. The future of AI
              starts here.
            </p>

            {/* Search bar */}
            <div
              className="max-w-2xl mx-auto animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 rounded-2xl opacity-20 group-hover:opacity-40 blur transition-all" />
                <div className="relative flex items-center bg-white rounded-2xl border border-gray-200">
                  <Search className="w-5 h-5 text-gray-500 ml-5" />
                  <input
                    type="text"
                    placeholder='Try "Prompt Engineer", "Data Labeler", "RAG Developer"...'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent px-4 py-4 text-gray-900 placeholder:text-slate-600 outline-none text-base"
                  />
                  <Link
                    href={`/freelancers?q=${encodeURIComponent(searchQuery)}`}
                    className="btn-primary mr-2 flex items-center gap-2"
                  >
                    Search
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {["Prompt Engineering", "Fine-tuning", "RAG", "Data Labeling", "Audio Recording", "RLHF"].map((tag) => (
                  <Link
                    key={tag}
                    href={`/freelancers?q=${encodeURIComponent(tag)}`}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-all border border-gray-200"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Social proof */}
            <div
              className="flex items-center justify-center gap-6 mt-12 animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="flex -space-x-2">
                {[
                  "bg-green-100 text-green-700",
                  "bg-green-200 text-green-800",
                  "bg-amber-100 text-amber-700",
                  "bg-amber-200 text-amber-800",
                  "bg-teal-100 text-teal-700",
                ].map((gradient, i) => (
                  <div
                    key={i}
                    className={`w-10 h-10 rounded-full ${gradient} border-2 border-white flex items-center justify-center text-xs font-bold`}
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  Trusted by <span className="text-gray-900 font-semibold">12,500+</span> AI professionals
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Gradient fade at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-950 to-transparent" />
      </section>

      {/* ── STATS BAR ── */}
      <section className="relative py-12 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl lg:text-4xl font-black text-gray-900">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section id="categories" className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Explore AI Specializations
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse top categories across AI development and training data collection
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATEGORIES.map((cat, idx) => {
              const Icon = iconMap[cat.icon] || Sparkles;
              const isFeatured = 'featured' in cat && cat.featured;
              return (
                <Link
                  key={cat.name}
                  href={`/freelancers?category=${encodeURIComponent(cat.name)}`}
                  className={`group relative p-6 rounded-2xl transition-all duration-300 ${
                    isFeatured
                      ? "glass-card border-teal-500/20 hover:border-teal-500/40"
                      : "glass-card"
                  }`}
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  {isFeatured && (
                    <div className="absolute top-3 right-3">
                      <span className="badge badge-primary text-xs">
                        <Sparkles className="w-3 h-3" /> Featured
                      </span>
                    </div>
                  )}
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6 text-gray-900" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:gradient-text transition-all">
                    {cat.name}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 group-hover:text-gray-600">
                    Browse talent <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── DATA COLLECTION HIGHLIGHT ── */}
      <section className="relative py-24 overflow-hidden">
        <div className="orb-teal" style={{ top: "50%", right: "-10%", transform: "translateY(-50%)" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-3xl border-teal-500/20 p-8 lg:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-teal-500/10 to-transparent rounded-bl-full" />
            <div className="grid lg:grid-cols-2 gap-12 items-center relative">
              <div>
                <span className="badge badge-primary mb-6">
                  <Database className="w-3 h-3" /> AI Training Data Platform
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                  Power AI with{" "}
                  <span className="gradient-text-teal">Human Data</span>
                </h2>
                <p className="text-gray-600 mb-8 text-lg">
                  Our dedicated Data Collection Hub connects you with verified contributors
                  worldwide for text labeling, audio recording, image annotation, RLHF, and more.
                </p>
                <div className="space-y-4 mb-8">
                  {[
                    "5,000+ verified data contributors across 50+ languages",
                    "Quality-controlled with multi-reviewer consensus",
                    "In-platform task workspace — no external tools needed",
                    "Real-time progress tracking and dataset export",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-teal-400 mt-0.5 shrink-0" />
                      <p className="text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Link href="/tasks" className="btn-primary flex items-center gap-2">
                    Explore Data Tasks <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link href="/jobs/post?type=data" className="btn-secondary flex items-center gap-2 !border-teal-500/30 !text-teal-400">
                    Post a Data Job
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: MessageSquare, label: "Text Labeling", count: "2.4M tasks", color: "blue" },
                  { icon: Mic, label: "Audio Recording", count: "500K hours", color: "purple" },
                  { icon: Eye, label: "Image Annotation", count: "1.2M images", color: "teal" },
                  { icon: ThumbsUp, label: "RLHF Ranking", count: "800K pairs", color: "amber" },
                ].map((item, i) => (
                  <div key={i} className={`glass-card p-5 rounded-xl text-center`}>
                    <div className={`w-10 h-10 mx-auto mb-3 rounded-lg bg-${item.color}-500/10 flex items-center justify-center`}>
                      <item.icon className={`w-5 h-5 text-${item.color}-400`} />
                    </div>
                    <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.count}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get started in minutes — whether you&apos;re hiring AI talent or contributing data
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* For Clients */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-400" /> For Clients
              </h3>
              <div className="space-y-8">
                {[
                  { step: "1", title: "Post Your Project", desc: "Describe your AI project or data collection needs. Set budget, timeline, and requirements." },
                  { step: "2", title: "Review Proposals", desc: "Receive proposals from vetted AI freelancers and data contributors. Compare skills, rates, and reviews." },
                  { step: "3", title: "Get Results", desc: "Work together through our platform. Track milestones, manage data batches, and download datasets." },
                ].map((item) => (
                  <div key={item.step} className="flex gap-5">
                    <div className="w-10 h-10 shrink-0 rounded-xl bg-green-100 flex items-center justify-center text-green-700 font-bold text-sm">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* For Freelancers/Contributors */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                <Users className="w-5 h-5 text-teal-400" /> For Freelancers & Data Contributors
              </h3>
              <div className="space-y-8">
                {[
                  { step: "1", title: "Create Your Profile", desc: "Showcase your AI skills, languages, and specializations. Complete verification for data tasks." },
                  { step: "2", title: "Find Work", desc: "Browse AI projects or pick up data collection micro-tasks from our task board. Start earning immediately." },
                  { step: "3", title: "Build Your Reputation", desc: "Complete tasks, earn reviews, and increase your accuracy score. Higher scores unlock premium tasks." },
                ].map((item) => (
                  <div key={item.step} className="flex gap-5">
                    <div className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-gray-900 font-bold text-sm">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Secure Payments", desc: "Milestone-based escrow system ensures safe transactions for every project." },
              { icon: Zap, title: "AI-Powered Matching", desc: "Our algorithms match you with the perfect talent based on skills and project needs." },
              { icon: Clock, title: "24/7 Support", desc: "Dedicated support team available around the clock to help with any issues." },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-center">
                  <item.icon className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-green-50">
            <div className="absolute inset-0 bg-grid opacity-30" />
            <div className="relative px-8 py-16 lg:py-20 text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Ready to Shape the Future of AI?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
                Join thousands of AI professionals and data contributors building the
                next generation of intelligent systems.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/signup?role=CLIENT" className="btn-primary text-base py-3 px-8 flex items-center gap-2 justify-center">
                  Hire AI Talent <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/auth/signup?role=FREELANCER" className="btn-primary text-base py-3 px-8 flex items-center gap-2 justify-center">
                  Start Earning <Zap className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

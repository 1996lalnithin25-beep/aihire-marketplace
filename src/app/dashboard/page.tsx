"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LayoutDashboard, Briefcase, Database, MessageSquare, FileText, DollarSign, Star, Users, BarChart3, TrendingUp, Clock, CheckCircle, Plus, ChevronRight, Zap, ArrowUpRight } from "lucide-react";

const clientStats = [
  { label: "Posted Jobs", value: "5", icon: Briefcase, color: "text-blue-400", bg: "bg-blue-500/10" },
  { label: "Data Campaigns", value: "3", icon: Database, color: "text-teal-400", bg: "bg-teal-500/10" },
  { label: "Active Contracts", value: "4", icon: FileText, color: "text-purple-400", bg: "bg-purple-500/10" },
  { label: "Total Spent", value: "$12,450", icon: DollarSign, color: "text-green-400", bg: "bg-green-500/10" },
];

const freelancerStats = [
  { label: "Jobs Applied", value: "12", icon: Briefcase, color: "text-blue-400", bg: "bg-blue-500/10" },
  { label: "Active Tasks", value: "3", icon: Database, color: "text-teal-400", bg: "bg-teal-500/10" },
  { label: "Total Earned", value: "$8,200", icon: DollarSign, color: "text-green-400", bg: "bg-green-500/10" },
  { label: "Accuracy Score", value: "96%", icon: Star, color: "text-amber-400", bg: "bg-amber-500/10" },
];

const recentJobs = [
  { title: "RAG Pipeline Development", type: "STANDARD", status: "OPEN", proposals: 8, budget: "$3,000-5,000" },
  { title: "Sentiment Data Labeling", type: "DATA_COLLECTION", status: "IN_PROGRESS", proposals: 15, budget: "$0.05/item" },
  { title: "Voice AI Fine-tuning", type: "STANDARD", status: "COMPLETED", proposals: 12, budget: "$8,000" },
];

const recentMessages = [
  { from: "Sarah Chen", msg: "Thanks for the update on the labeling batch...", time: "2h ago", unread: true },
  { from: "Alex Kumar", msg: "The fine-tuning results look great!", time: "5h ago", unread: false },
  { from: "Maria Garcia", msg: "I've completed 500 more recordings", time: "1d ago", unread: false },
];

export default function DashboardPage() {
  const { data: session, status } = useSession();
  if (status === "loading") return <div className="min-h-screen flex items-center justify-center"><div className="skeleton w-32 h-8 rounded-lg" /></div>;
  
  const role = (session?.user as any)?.role || "CLIENT";
  const stats = role === "CLIENT" ? clientStats : freelancerStats;
  const userName = session?.user?.name || "User";

  return (
    <div className="min-h-screen py-8 bg-grid relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Welcome back, {userName.split(" ")[0]} 👋</h1>
            <p className="text-slate-400">Here&apos;s what&apos;s happening with your {role === "CLIENT" ? "projects" : "work"}</p>
          </div>
          <div className="flex gap-3">
            {role === "CLIENT" ? (
              <Link href="/jobs/post" className="btn-primary flex items-center gap-2"><Plus className="w-4 h-4" /> Post a Job</Link>
            ) : (
              <Link href="/tasks" className="btn-teal flex items-center gap-2"><Zap className="w-4 h-4" /> Find Tasks</Link>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map(stat => (
            <div key={stat.label} className="glass-card rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <ArrowUpRight className="w-4 h-4 text-green-400" />
              </div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Jobs/Applications */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">{role === "CLIENT" ? "My Jobs" : "Applications"}</h2>
                <Link href="/jobs" className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1">View All <ChevronRight className="w-4 h-4" /></Link>
              </div>
              <div className="space-y-3">
                {recentJobs.map((job, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${job.status === "OPEN" ? "bg-green-400" : job.status === "IN_PROGRESS" ? "bg-amber-400" : "bg-slate-500"}`} />
                      <div>
                        <p className="text-sm font-medium text-white">{job.title}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className={`text-xs ${job.type === "DATA_COLLECTION" ? "text-teal-400" : "text-blue-400"}`}>{job.type === "DATA_COLLECTION" ? "Data Task" : "AI Project"}</span>
                          <span className="text-xs text-slate-600">•</span>
                          <span className="text-xs text-slate-500">{job.proposals} proposals</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-white">{job.budget}</p>
                      <span className={`badge text-xs ${job.status === "OPEN" ? "badge-green" : job.status === "IN_PROGRESS" ? "badge-amber" : "badge-blue"}`}>{job.status.replace("_", " ")}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dataset Progress (Client) or Earnings Chart placeholder */}
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">{role === "CLIENT" ? "Dataset Progress" : "Earnings Overview"}</h2>
              {role === "CLIENT" ? (
                <div className="space-y-4">
                  {[
                    { name: "Sentiment Labels", progress: 65, items: "3,250 / 5,000" },
                    { name: "Audio Recordings", progress: 22, items: "440 / 2,000" },
                    { name: "RLHF Rankings", progress: 45, items: "1,350 / 3,000" },
                  ].map(d => (
                    <div key={d.name}>
                      <div className="flex justify-between text-sm mb-1"><span className="text-slate-300">{d.name}</span><span className="text-teal-400">{d.items}</span></div>
                      <div className="w-full h-3 rounded-full bg-white/5"><div className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-400 transition-all progress-bar" style={{width:`${d.progress}%`}} /></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-48 flex items-center justify-center text-slate-500">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 mx-auto mb-2 text-slate-600" />
                    <p className="text-sm">Earnings chart will render with Recharts</p>
                    <p className="text-xs text-slate-600 mt-1">$2,400 this month</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Messages */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">Messages</h2>
                <Link href="/messages" className="text-sm text-blue-400 hover:text-blue-300">View All</Link>
              </div>
              <div className="space-y-3">
                {recentMessages.map((m, i) => (
                  <div key={i} className={`p-3 rounded-xl transition-all cursor-pointer ${m.unread ? "bg-blue-500/5 border border-blue-500/10" : "bg-white/[0.02] border border-white/5"} hover:border-blue-500/20`}>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">{m.from[0]}</div>
                      <span className="text-sm font-medium text-white">{m.from}</span>
                      {m.unread && <div className="w-2 h-2 rounded-full bg-blue-400" />}
                      <span className="text-xs text-slate-600 ml-auto">{m.time}</span>
                    </div>
                    <p className="text-xs text-slate-500 truncate">{m.msg}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
              <div className="space-y-2">
                {(role === "CLIENT" ? [
                  { label: "Post a New Job", href: "/jobs/post", icon: Plus },
                  { label: "Create Data Campaign", href: "/jobs/post?type=data", icon: Database },
                  { label: "View Proposals", href: "/dashboard", icon: FileText },
                  { label: "Download Datasets", href: "/dashboard", icon: BarChart3 },
                ] : [
                  { label: "Browse Data Tasks", href: "/tasks", icon: Zap },
                  { label: "Browse AI Jobs", href: "/jobs", icon: Briefcase },
                  { label: "Update Profile", href: "/settings", icon: Users },
                  { label: "View Earnings", href: "/dashboard", icon: DollarSign },
                ]).map(a => (
                  <Link key={a.label} href={a.href} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
                    <a.icon className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-300">{a.label}</span>
                    <ChevronRight className="w-4 h-4 text-slate-600 ml-auto" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

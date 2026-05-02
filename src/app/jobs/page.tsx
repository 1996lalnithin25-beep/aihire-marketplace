"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search, Briefcase, Database, Clock, DollarSign, MapPin,
  Tag, Filter, ChevronRight, Zap, Globe, Mic, Eye,
  MessageSquare, ThumbsUp, SlidersHorizontal, X, Plus
} from "lucide-react";

interface Job {
  id: string;
  title: string;
  description: string;
  type: "STANDARD" | "DATA_COLLECTION";
  status: string;
  budgetMin: number | null;
  budgetMax: number | null;
  budgetType: string | null;
  duration: string | null;
  createdAt: string;
  client: { name: string; image: string | null };
  skills: Array<{ id: string; name: string; category: string }>;
  campaign: {
    dataType: string;
    taskType: string;
    languagesRequired: string[];
    budgetPerTask: number | null;
    budgetPerItem: number | null;
  } | null;
  _count?: { proposals: number };
}

const taskTypeIcons: Record<string, any> = {
  TEXT: MessageSquare,
  AUDIO: Mic,
  IMAGE: Eye,
  VIDEO: Eye,
  MULTILINGUAL: Globe,
  BEHAVIORAL: ThumbsUp,
};

function JobCard({ job }: { job: Job }) {
  const isData = job.type === "DATA_COLLECTION";
  const Icon = isData && job.campaign ? (taskTypeIcons[job.campaign.dataType] || Database) : Briefcase;

  return (
    <Link href={`/jobs/${job.id}`} className="glass-card rounded-2xl p-6 block group">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl ${
            isData ? "bg-teal-500/10" : "bg-blue-500/10"
          } flex items-center justify-center`}>
            <Icon className={`w-5 h-5 ${isData ? "text-teal-400" : "text-blue-400"}`} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-400 transition-colors line-clamp-1">
              {job.title}
            </h3>
            <p className="text-sm text-gray-500">{job.client.name}</p>
          </div>
        </div>
        <span className={`badge text-xs shrink-0 ${isData ? "badge-primary" : "badge-primary"}`}>
          {isData ? "Data Task" : "AI Project"}
        </span>
      </div>

      <p className="text-sm text-gray-600 line-clamp-2 mb-4">{job.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {isData && job.campaign && (
          <>
            <span className="badge badge-primary text-xs">{job.campaign.dataType}</span>
            <span className="badge badge-purple text-xs">{job.campaign.taskType.replace("_", " ")}</span>
            {job.campaign.languagesRequired.slice(0, 2).map((l) => (
              <span key={l} className="badge badge-amber text-xs">{l}</span>
            ))}
          </>
        )}
        {job.skills.slice(0, 3).map((s) => (
          <span key={s.id} className="px-2 py-0.5 rounded-md bg-gray-100 text-xs text-gray-600 border border-gray-200">
            {s.name}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          {(job.budgetMin || job.budgetMax) && (
            <span className="flex items-center gap-1 text-gray-900 font-semibold">
              <DollarSign className="w-3.5 h-3.5 text-green-400" />
              {job.budgetMin && job.budgetMax
                ? `$${job.budgetMin} - $${job.budgetMax}`
                : `$${job.budgetMin || job.budgetMax}`}
            </span>
          )}
          {isData && job.campaign?.budgetPerTask && (
            <span className="flex items-center gap-1 text-teal-400 font-semibold">
              <Zap className="w-3.5 h-3.5" /> ${job.campaign.budgetPerTask}/task
            </span>
          )}
          {job.duration && (
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {job.duration}
            </span>
          )}
        </div>
        <span className="text-xs text-slate-600">
          {new Date(job.createdAt).toLocaleDateString()}
        </span>
      </div>
    </Link>
  );
}

export default function BrowseJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "standard" | "data">("all");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetch("/api/jobs")
      .then((r) => r.json())
      .then(setJobs)
      .finally(() => setLoading(false));
  }, []);

  const filtered = jobs
    .filter((j) => {
      if (activeTab === "standard") return j.type === "STANDARD";
      if (activeTab === "data") return j.type === "DATA_COLLECTION";
      return true;
    })
    .filter((j) => {
      if (!search) return true;
      const q = search.toLowerCase();
      return j.title.toLowerCase().includes(q) || j.description.toLowerCase().includes(q) ||
        j.skills.some((s) => s.name.toLowerCase().includes(q));
    });

  return (
    <div className="min-h-screen py-8 bg-grid">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Jobs</h1>
            <p className="text-gray-600">Find AI projects and data collection tasks</p>
          </div>
          <Link href="/jobs/post" className="btn-primary flex items-center gap-2 shrink-0">
            <Plus className="w-4 h-4" /> Post a Job
          </Link>
        </div>

        {/* Tab toggle */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-gray-100 mb-6 w-fit">
          {[
            { key: "all", label: "All Jobs" },
            { key: "standard", label: "AI Projects", icon: Briefcase },
            { key: "data", label: "Data Tasks", icon: Database },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? tab.key === "data"
                    ? "bg-teal-500/20 text-teal-400"
                    : "bg-blue-500/20 text-blue-400"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.icon && <tab.icon className="w-4 h-4" />}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, skill, or keyword..."
              className="input-dark pl-11 py-3"
            />
          </div>
        </div>

        {/* Results */}
        <p className="text-sm text-gray-500 mb-4">
          {loading ? "Loading..." : `${filtered.length} jobs found`}
        </p>

        <div className="space-y-4">
          {loading
            ? Array(4).fill(0).map((_, i) => (
                <div key={i} className="glass-card rounded-2xl p-6">
                  <div className="flex gap-3 mb-4">
                    <div className="skeleton w-10 h-10 rounded-xl" />
                    <div>
                      <div className="skeleton h-5 w-48 mb-2" />
                      <div className="skeleton h-4 w-32" />
                    </div>
                  </div>
                  <div className="skeleton h-4 w-full mb-2" />
                  <div className="skeleton h-4 w-3/4 mb-4" />
                  <div className="flex gap-2">
                    <div className="skeleton h-6 w-16 rounded-full" />
                    <div className="skeleton h-6 w-20 rounded-full" />
                  </div>
                </div>
              ))
            : filtered.map((job) => <JobCard key={job.id} job={job} />)
          }
        </div>

        {!loading && filtered.length === 0 && (
          <div className="text-center py-20">
            <Briefcase className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-500">Try adjusting your filters or check back later</p>
          </div>
        )}
      </div>
    </div>
  );
}

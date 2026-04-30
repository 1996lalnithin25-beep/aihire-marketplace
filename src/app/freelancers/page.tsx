"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search, Filter, Star, MapPin, Clock, ChevronDown, Database,
  SlidersHorizontal, X, Globe, DollarSign
} from "lucide-react";
import { SKILLS } from "@/lib/constants";

interface Freelancer {
  id: string;
  user: { name: string; image: string | null };
  tagline: string | null;
  hourlyRate: number | null;
  availability: string;
  location: string | null;
  languages: string[];
  isDataContributor: boolean;
  skills: { id: string; name: string; category: string }[];
  _count?: { portfolioItems: number };
}

function FreelancerCard({ freelancer }: { freelancer: Freelancer }) {
  const initials = freelancer.user.name
    ?.split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase() || "??";
  const gradients = [
    "from-blue-500 to-indigo-600",
    "from-purple-500 to-pink-600",
    "from-teal-500 to-emerald-600",
    "from-orange-500 to-red-600",
    "from-cyan-500 to-blue-600",
  ];
  const gradient = gradients[freelancer.user.name?.charCodeAt(0) % gradients.length || 0];

  return (
    <Link href={`/freelancers/${freelancer.id}`} className="glass-card rounded-2xl p-6 block group">
      <div className="flex items-start gap-4 mb-4">
        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-lg shrink-0`}>
          {initials}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-white truncate group-hover:text-blue-400 transition-colors">
              {freelancer.user.name}
            </h3>
            {freelancer.isDataContributor && (
              <span className="badge badge-teal text-xs shrink-0">
                <Database className="w-3 h-3" /> Data
              </span>
            )}
          </div>
          <p className="text-sm text-slate-400 truncate">{freelancer.tagline || "AI Professional"}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {freelancer.skills.slice(0, 4).map((skill) => (
          <span key={skill.id} className="px-2 py-0.5 rounded-md bg-white/5 text-xs text-slate-400 border border-white/5">
            {skill.name}
          </span>
        ))}
        {freelancer.skills.length > 4 && (
          <span className="px-2 py-0.5 rounded-md bg-white/5 text-xs text-slate-500">
            +{freelancer.skills.length - 4}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <div className="flex items-center gap-4">
          {freelancer.hourlyRate && (
            <span className="text-sm font-semibold text-white">
              ${freelancer.hourlyRate}<span className="text-slate-500 font-normal">/hr</span>
            </span>
          )}
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-sm text-slate-400">4.9</span>
          </div>
        </div>
        <span className={`badge text-xs ${
          freelancer.availability === "available" ? "badge-green" :
          freelancer.availability === "busy" ? "badge-amber" : "badge-red"
        }`}>
          {freelancer.availability}
        </span>
      </div>
    </Link>
  );
}

function SkeletonCard() {
  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-start gap-4 mb-4">
        <div className="skeleton w-14 h-14 rounded-xl" />
        <div className="flex-1">
          <div className="skeleton h-5 w-32 mb-2" />
          <div className="skeleton h-4 w-48" />
        </div>
      </div>
      <div className="flex gap-2 mb-4">
        <div className="skeleton h-6 w-20 rounded-md" />
        <div className="skeleton h-6 w-24 rounded-md" />
        <div className="skeleton h-6 w-16 rounded-md" />
      </div>
      <div className="skeleton h-px w-full mb-4" />
      <div className="flex justify-between">
        <div className="skeleton h-5 w-20" />
        <div className="skeleton h-5 w-16 rounded-full" />
      </div>
    </div>
  );
}

function BrowseContent() {
  const searchParams = useSearchParams();
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [minRate, setMinRate] = useState("");
  const [maxRate, setMaxRate] = useState("");
  const [availability, setAvailability] = useState("");
  const [sortBy, setSortBy] = useState("rating");

  useEffect(() => {
    fetchFreelancers();
  }, []);

  const fetchFreelancers = async () => {
    try {
      const res = await fetch("/api/freelancers");
      const data = await res.json();
      setFreelancers(data);
    } catch {
      console.error("Failed to fetch freelancers");
    } finally {
      setLoading(false);
    }
  };

  const filtered = freelancers
    .filter((f) => {
      if (search) {
        const q = search.toLowerCase();
        return (
          f.user.name?.toLowerCase().includes(q) ||
          f.tagline?.toLowerCase().includes(q) ||
          f.skills.some((s) => s.name.toLowerCase().includes(q))
        );
      }
      return true;
    })
    .filter((f) => {
      if (selectedCategory && selectedCategory !== "all") {
        return f.skills.some((s) => s.category === selectedCategory);
      }
      return true;
    })
    .filter((f) => {
      if (minRate && f.hourlyRate && f.hourlyRate < Number(minRate)) return false;
      if (maxRate && f.hourlyRate && f.hourlyRate > Number(maxRate)) return false;
      return true;
    })
    .filter((f) => {
      if (availability) return f.availability === availability;
      return true;
    });

  return (
    <div className="min-h-screen py-8 bg-grid relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Browse AI Talent</h1>
          <p className="text-slate-400">Find the perfect AI professional for your project</p>
        </div>

        {/* Search & Filter bar */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, skill, or keyword..."
              className="input-dark pl-11 py-3"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`btn-secondary flex items-center gap-2 ${showFilters ? "!bg-blue-500/20 !border-blue-500/40" : ""}`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-dark w-44 py-3"
          >
            <option value="rating">Top Rated</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>

        {/* Filters panel */}
        {showFilters && (
          <div className="glass rounded-xl p-6 mb-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-dark"
              >
                <option value="">All Categories</option>
                {Object.keys(SKILLS).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Hourly Rate</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={minRate}
                  onChange={(e) => setMinRate(e.target.value)}
                  placeholder="Min"
                  className="input-dark"
                />
                <input
                  type="number"
                  value={maxRate}
                  onChange={(e) => setMaxRate(e.target.value)}
                  placeholder="Max"
                  className="input-dark"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Availability</label>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="input-dark"
              >
                <option value="">Any</option>
                <option value="available">Available</option>
                <option value="busy">Busy</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSelectedCategory("");
                  setMinRate("");
                  setMaxRate("");
                  setAvailability("");
                  setSearch("");
                }}
                className="btn-secondary w-full flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" /> Clear All
              </button>
            </div>
          </div>
        )}

        {/* Results count */}
        <p className="text-sm text-slate-500 mb-4">
          {loading ? "Loading..." : `${filtered.length} freelancers found`}
        </p>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading
            ? Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
            : filtered.map((f) => <FreelancerCard key={f.id} freelancer={f} />)
          }
        </div>

        {!loading && filtered.length === 0 && (
          <div className="text-center py-20">
            <Search className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No freelancers found</h3>
            <p className="text-slate-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BrowseFreelancersPage() {
  return (
    <Suspense fallback={<div className="min-h-screen py-8 bg-grid"><div className="max-w-7xl mx-auto px-4"><div className="skeleton h-8 w-48 mb-8" /></div></div>}>
      <BrowseContent />
    </Suspense>
  );
}

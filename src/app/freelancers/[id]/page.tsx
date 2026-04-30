"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import {
  Star, MapPin, Clock, Globe, DollarSign, Calendar,
  ExternalLink, Mail, Database, Shield, Award, BarChart3,
  CheckCircle, ChevronRight, Briefcase, ArrowLeft
} from "lucide-react";

interface Profile {
  id: string;
  tagline: string | null;
  bio: string | null;
  hourlyRate: number | null;
  availability: string;
  location: string | null;
  languages: string[];
  isDataContributor: boolean;
  user: {
    name: string;
    image: string | null;
    email: string;
    createdAt: string;
    reviewsReceived: Array<{
      rating: number;
      comment: string | null;
      accuracyRating: number | null;
      createdAt: string;
      reviewer: { name: string };
    }>;
    contributorProfile: {
      tasksCompleted: number;
      languagesSpoken: string[];
      accuracyScore: number;
      datasetsContributed: number;
      isVerified: boolean;
    } | null;
  };
  skills: Array<{ id: string; name: string; category: string }>;
  portfolioItems: Array<{
    id: string;
    title: string;
    description: string | null;
    link: string | null;
    thumbnail: string | null;
  }>;
}

export default function FreelancerProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/freelancers/${id}`)
      .then((r) => r.json())
      .then(setProfile)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen py-8 bg-grid">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="skeleton h-8 w-32 mb-8 rounded-lg" />
          <div className="glass rounded-2xl p-8">
            <div className="flex gap-6">
              <div className="skeleton w-24 h-24 rounded-2xl" />
              <div className="flex-1">
                <div className="skeleton h-7 w-48 mb-3" />
                <div className="skeleton h-5 w-72 mb-4" />
                <div className="flex gap-2">
                  <div className="skeleton h-7 w-20 rounded-full" />
                  <div className="skeleton h-7 w-24 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Profile Not Found</h2>
          <p className="text-slate-400 mb-4">This freelancer profile doesn&apos;t exist.</p>
          <Link href="/freelancers" className="btn-primary">Browse Freelancers</Link>
        </div>
      </div>
    );
  }

  const avgRating = profile.user.reviewsReceived.length > 0
    ? (profile.user.reviewsReceived.reduce((sum, r) => sum + r.rating, 0) / profile.user.reviewsReceived.length).toFixed(1)
    : "0.0";
  const initials = profile.user.name?.split(" ").map(n => n[0]).join("").toUpperCase() || "??";
  const gradients = ["from-blue-500 to-indigo-600", "from-purple-500 to-pink-600", "from-teal-500 to-emerald-600"];
  const gradient = gradients[profile.user.name?.charCodeAt(0) % gradients.length || 0];
  const cp = profile.user.contributorProfile;

  return (
    <div className="min-h-screen py-8 bg-grid relative">
      <div className="orb-blue" style={{ top: "10%", right: "-5%" }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <Link href="/freelancers" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Browse
        </Link>

        {/* Profile Header */}
        <div className="glass rounded-2xl p-8 mb-6">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-3xl font-bold shrink-0`}>
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-white">{profile.user.name}</h1>
                {profile.isDataContributor && (
                  <span className="badge badge-teal"><Database className="w-3 h-3" /> Data Contributor</span>
                )}
                {cp?.isVerified && (
                  <span className="badge badge-green"><Shield className="w-3 h-3" /> Verified</span>
                )}
                <span className={`badge text-xs ${
                  profile.availability === "available" ? "badge-green" :
                  profile.availability === "busy" ? "badge-amber" : "badge-red"
                }`}>
                  {profile.availability}
                </span>
              </div>
              <p className="text-lg text-slate-400 mb-4">{profile.tagline || "AI Professional"}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                {profile.location && (
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{profile.location}</span>
                )}
                {profile.hourlyRate && (
                  <span className="flex items-center gap-1 text-white font-semibold">
                    <DollarSign className="w-4 h-4 text-green-400" />${profile.hourlyRate}/hr
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> {avgRating} ({profile.user.reviewsReceived.length} reviews)
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Member since {new Date(profile.user.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                </span>
              </div>
            </div>
            <button className="btn-primary flex items-center gap-2 shrink-0">
              <Briefcase className="w-4 h-4" /> Hire Me
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio */}
            {profile.bio && (
              <div className="glass rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-white mb-4">About</h2>
                <p className="text-slate-300 whitespace-pre-line">{profile.bio}</p>
              </div>
            )}

            {/* Skills */}
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className={`badge ${
                      skill.category === "Data Collection" ? "badge-teal" :
                      skill.category === "Specialties" ? "badge-purple" : "badge-blue"
                    }`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Portfolio */}
            {profile.portfolioItems.length > 0 && (
              <div className="glass rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Portfolio</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {profile.portfolioItems.map((item) => (
                    <div key={item.id} className="glass-card rounded-xl p-4">
                      <div className="w-full h-32 rounded-lg bg-gradient-to-br from-navy-800 to-navy-700 mb-3 flex items-center justify-center">
                        <Briefcase className="w-8 h-8 text-slate-600" />
                      </div>
                      <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                      <p className="text-sm text-slate-400 line-clamp-2">{item.description}</p>
                      {item.link && (
                        <a href={item.link} target="_blank" className="inline-flex items-center gap-1 text-sm text-blue-400 mt-2 hover:underline">
                          View <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">
                Reviews ({profile.user.reviewsReceived.length})
              </h2>
              {profile.user.reviewsReceived.length > 0 ? (
                <div className="space-y-4">
                  {profile.user.reviewsReceived.map((review, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                          {review.reviewer.name?.[0]?.toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{review.reviewer.name}</p>
                          <div className="flex items-center gap-1">
                            {Array(5).fill(0).map((_, j) => (
                              <Star key={j} className={`w-3 h-3 ${j < review.rating ? "fill-amber-400 text-amber-400" : "text-slate-700"}`} />
                            ))}
                          </div>
                        </div>
                      </div>
                      {review.comment && <p className="text-sm text-slate-400">{review.comment}</p>}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-sm">No reviews yet</p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Languages */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-400" /> Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.languages.length > 0 ? (
                  profile.languages.map((lang) => (
                    <span key={lang} className="px-3 py-1 rounded-full bg-white/5 text-sm text-slate-300 border border-white/5">
                      {lang}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-slate-500">Not specified</p>
                )}
              </div>
            </div>

            {/* Data Contributor Stats */}
            {cp && (
              <div className="glass rounded-2xl p-6 border-teal-500/20">
                <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                  <Database className="w-4 h-4 text-teal-400" /> Data Contributor Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-400">Tasks Completed</span>
                    <span className="font-semibold text-white">{cp.tasksCompleted}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-400">Accuracy Score</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 rounded-full bg-white/10">
                        <div className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-400 progress-bar" style={{ width: `${cp.accuracyScore}%` }} />
                      </div>
                      <span className="font-semibold text-teal-400 text-sm">{cp.accuracyScore}%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-400">Datasets</span>
                    <span className="font-semibold text-white">{cp.datasetsContributed}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-400">Languages</span>
                    <span className="font-semibold text-white">{cp.languagesSpoken.length}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Contact */}
            <div className="glass rounded-2xl p-6">
              <button className="w-full btn-primary flex items-center justify-center gap-2 mb-3">
                <Briefcase className="w-4 h-4" /> Hire {profile.user.name?.split(" ")[0]}
              </button>
              <button className="w-full btn-secondary flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" /> Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useState, use } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowLeft, Briefcase, Database, DollarSign, Clock, Globe, Star, MapPin, Calendar, Shield, Send, Paperclip } from "lucide-react";

export default function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [showProposal, setShowProposal] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [proposedRate, setProposedRate] = useState("");
  const [timeline, setTimeline] = useState("");

  // Demo job data
  const job = {
    title: "RAG Pipeline Development for Legal AI Platform",
    description: "We're building a legal AI assistant that needs a robust RAG (Retrieval-Augmented Generation) pipeline. The system should be able to ingest legal documents, create embeddings, store them in a vector database, and retrieve relevant context for LLM queries.\n\nRequirements:\n- Design and implement a RAG pipeline using LangChain or LlamaIndex\n- Set up a vector database (Pinecone or Weaviate)\n- Implement document chunking strategies\n- Build evaluation metrics for retrieval quality\n- Optimize for latency and accuracy",
    type: "STANDARD" as const,
    budget: "$3,000 - $5,000",
    duration: "2-4 weeks",
    skills: ["RAG", "LangChain", "Vector Databases", "LLM Evaluation"],
    client: "TechCorp AI",
    posted: "3 days ago",
    proposals: 8,
  };

  return (
    <div className="min-h-screen py-8 bg-grid">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/jobs" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Jobs
        </Link>

        <div className="glass rounded-2xl p-8 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="badge badge-primary">{job.type === "STANDARD" ? "AI Project" : "Data Task"}</span>
                <span className="text-sm text-gray-500">Posted {job.posted}</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h1>
              <p className="text-gray-600">by {job.client}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-6 text-sm">
            <span className="flex items-center gap-1 text-gray-900 font-semibold"><DollarSign className="w-4 h-4 text-green-400" />{job.budget}</span>
            <span className="flex items-center gap-1 text-gray-600"><Clock className="w-4 h-4" />{job.duration}</span>
            <span className="flex items-center gap-1 text-gray-600"><Briefcase className="w-4 h-4" />{job.proposals} proposals</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {job.skills.map(s => <span key={s} className="badge badge-primary">{s}</span>)}
          </div>

          <div className="prose prose-invert max-w-none">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
            <p className="text-gray-700 whitespace-pre-line text-sm leading-relaxed">{job.description}</p>
          </div>
        </div>

        {/* Proposal Form */}
        {!showProposal ? (
          <button onClick={() => setShowProposal(true)} className="btn-primary flex items-center gap-2 w-full py-3 justify-center text-base">
            <Send className="w-5 h-5" /> Submit Proposal
          </button>
        ) : (
          <div className="glass rounded-2xl p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Submit Your Proposal</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Cover Letter *</label>
                <textarea value={coverLetter} onChange={e => setCoverLetter(e.target.value)} className="input-dark min-h-[150px] resize-y" placeholder="Explain why you're the best fit for this project..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Proposed Rate ($)</label>
                  <input type="number" value={proposedRate} onChange={e => setProposedRate(e.target.value)} className="input-dark" placeholder="4000" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Estimated Timeline (days)</label>
                  <input type="number" value={timeline} onChange={e => setTimeline(e.target.value)} className="input-dark" placeholder="14" /></div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Attachments</label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-blue-500/30 transition-colors">
                  <Paperclip className="w-6 h-6 text-slate-600 mx-auto mb-1" />
                  <p className="text-sm text-gray-600">Attach portfolio samples</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowProposal(false)} className="btn-secondary py-3 px-6">Cancel</button>
                <button onClick={() => { toast.success("Proposal submitted! (Demo)"); setShowProposal(false); }} className="flex-1 btn-primary py-3">Submit Proposal</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

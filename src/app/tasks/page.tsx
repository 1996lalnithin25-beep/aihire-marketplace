"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Database, Clock, DollarSign, Globe, Mic, Eye, MessageSquare, ThumbsUp, Zap, Users, Play, Search, Filter } from "lucide-react";

const DEMO_TASKS = [
  { id: "1", title: "Sentiment Labeling - Product Reviews", taskType: "LABELING", dataType: "TEXT", payPerItem: 0.05, estTime: 15, totalItems: 5000, completed: 1200, deadline: "2026-05-15", languages: ["English"], device: "Any" },
  { id: "2", title: "Voice Recording - Navigation Commands", taskType: "RECORDING", dataType: "AUDIO", payPerItem: 0.25, estTime: 30, totalItems: 2000, completed: 450, deadline: "2026-05-20", languages: ["English", "Spanish"], device: "Mobile" },
  { id: "3", title: "RLHF Preference Ranking - Chatbot Responses", taskType: "PREFERENCE_RANKING", dataType: "TEXT", payPerItem: 0.15, estTime: 45, totalItems: 3000, completed: 800, deadline: "2026-06-01", languages: ["English"], device: "Any" },
  { id: "4", title: "Image Classification - Street Signs", taskType: "LABELING", dataType: "IMAGE", payPerItem: 0.08, estTime: 20, totalItems: 10000, completed: 3500, deadline: "2026-05-25", languages: ["Any"], device: "Desktop" },
  { id: "5", title: "Medical Text Transcription", taskType: "TRANSCRIPTION", dataType: "AUDIO", payPerItem: 0.50, estTime: 120, totalItems: 500, completed: 120, deadline: "2026-06-10", languages: ["English"], device: "Desktop" },
  { id: "6", title: "Multilingual Survey - AI Usage Patterns", taskType: "SURVEY", dataType: "TEXT", payPerItem: 1.00, estTime: 300, totalItems: 1000, completed: 200, deadline: "2026-05-30", languages: ["English", "French", "German", "Japanese"], device: "Any" },
];

const typeIcons: Record<string, any> = { TEXT: MessageSquare, AUDIO: Mic, IMAGE: Eye, VIDEO: Eye };
const typeColors: Record<string, string> = { LABELING: "badge-primary", RECORDING: "badge-purple", PREFERENCE_RANKING: "badge-amber", TRANSCRIPTION: "badge-green", SURVEY: "badge-primary", ANNOTATION: "badge-primary" };

export default function TaskBoardPage() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const tasks = DEMO_TASKS.filter(t => {
    if (search && !t.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterType && t.taskType !== filterType) return false;
    return true;
  });

  return (
    <div className="min-h-screen py-8 bg-grid relative">
      <div className="orb-teal" style={{ top: "10%", right: "-5%" }} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Database className="w-6 h-6 text-teal-400" />
              <h1 className="text-3xl font-bold text-gray-900">Data Task Hub</h1>
            </div>
            <p className="text-gray-600">Browse and start data collection micro-tasks</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="badge badge-primary"><Zap className="w-3 h-3" /> 6 tasks available</span>
          </div>
        </div>

        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tasks..." className="input-dark pl-11 py-3" />
          </div>
          <select value={filterType} onChange={e => setFilterType(e.target.value)} className="input-dark w-48">
            <option value="">All Types</option>
            <option value="LABELING">Labeling</option>
            <option value="RECORDING">Recording</option>
            <option value="PREFERENCE_RANKING">RLHF Ranking</option>
            <option value="TRANSCRIPTION">Transcription</option>
            <option value="SURVEY">Survey</option>
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {tasks.map(task => {
            const Icon = typeIcons[task.dataType] || Database;
            const pct = Math.round((task.completed / task.totalItems) * 100);
            const remaining = task.totalItems - task.completed;
            return (
              <div key={task.id} className="glass-card rounded-2xl p-6 group">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-teal-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">{task.title}</h3>
                      <div className="flex gap-1.5 mt-1">
                        <span className={`badge text-xs ${typeColors[task.taskType] || "badge-primary"}`}>{task.taskType.replace(/_/g, " ")}</span>
                        <span className="badge badge-primary text-xs">{task.dataType}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 my-4 text-center">
                  <div className="p-2 rounded-lg bg-white/[0.02]">
                    <p className="text-lg font-bold text-teal-400">${task.payPerItem}</p>
                    <p className="text-xs text-gray-500">per item</p>
                  </div>
                  <div className="p-2 rounded-lg bg-white/[0.02]">
                    <p className="text-lg font-bold text-gray-900">{task.estTime}s</p>
                    <p className="text-xs text-gray-500">est. time</p>
                  </div>
                  <div className="p-2 rounded-lg bg-white/[0.02]">
                    <p className="text-lg font-bold text-gray-900">{remaining.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">remaining</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500">Progress</span>
                    <span className="text-teal-400">{pct}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gray-100">
                    <div className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-400 progress-bar" style={{ width: `${pct}%` }} />
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {task.languages.map(l => <span key={l} className="px-2 py-0.5 rounded-md bg-gray-100 text-xs text-gray-600 border border-gray-200"><Globe className="w-3 h-3 inline mr-1" />{l}</span>)}
                  <span className="px-2 py-0.5 rounded-md bg-gray-100 text-xs text-gray-600 border border-gray-200">{task.device}</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-xs text-gray-500">Due {new Date(task.deadline).toLocaleDateString()}</span>
                  <Link href={`/tasks/${task.id}/workspace`} className="btn-primary text-sm py-2 px-4 flex items-center gap-1.5">
                    <Play className="w-3 h-3" /> Start Task
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

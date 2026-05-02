"use client";
import { useState } from "react";
import { Shield, Users, Briefcase, Database, BarChart3, Ban, Search, ChevronRight, TrendingUp, FileText, AlertTriangle } from "lucide-react";

const ADMIN_USERS = [
  { id: 1, name: "Sarah Chen", email: "sarah@example.com", role: "CLIENT", status: "active", jobs: 5, joined: "2025-11-15" },
  { id: 2, name: "Alex Kumar", email: "alex@example.com", role: "FREELANCER", status: "active", jobs: 12, joined: "2025-10-20" },
  { id: 3, name: "Maria Garcia", email: "maria@example.com", role: "FREELANCER", status: "active", jobs: 8, joined: "2025-12-01" },
  { id: 4, name: "James Wilson", email: "james@example.com", role: "CLIENT", status: "suspended", jobs: 2, joined: "2026-01-10" },
  { id: 5, name: "Priya Patel", email: "priya@example.com", role: "FREELANCER", status: "active", jobs: 20, joined: "2025-09-05" },
];

const stats = [
  { label: "Total Users", value: "12,543", change: "+5.2%", icon: Users, color: "text-blue-400", bg: "bg-blue-500/10" },
  { label: "Active Jobs", value: "1,284", change: "+12.1%", icon: Briefcase, color: "text-purple-400", bg: "bg-purple-500/10" },
  { label: "Data Campaigns", value: "342", change: "+18.7%", icon: Database, color: "text-teal-400", bg: "bg-teal-500/10" },
  { label: "Datasets Delivered", value: "3,200", change: "+8.3%", icon: BarChart3, color: "text-green-400", bg: "bg-green-500/10" },
];

export default function AdminPage() {
  const [tab, setTab] = useState<"users" | "jobs" | "campaigns">("users");
  const [searchQ, setSearchQ] = useState("");

  const filteredUsers = ADMIN_USERS.filter(u => u.name.toLowerCase().includes(searchQ.toLowerCase()) || u.email.toLowerCase().includes(searchQ.toLowerCase()));

  return (
    <div className="min-h-screen py-8 bg-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center">
            <Shield className="w-5 h-5 text-gray-900" />
          </div>
          <div><h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1><p className="text-gray-600 text-sm">Manage users, jobs, and platform</p></div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map(s => (
            <div key={s.label} className="glass-card rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}><s.icon className={`w-5 h-5 ${s.color}`} /></div>
                <span className="text-xs text-green-400 font-semibold flex items-center gap-1"><TrendingUp className="w-3 h-3" />{s.change}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-sm text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-xl bg-gray-100 mb-6 w-fit">
          {(["users", "jobs", "campaigns"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${tab === t ? "bg-blue-500/20 text-blue-400" : "text-gray-500 hover:text-gray-700"}`}>{t}</button>
          ))}
        </div>

        {/* Users Table */}
        {tab === "users" && (
          <div className="glass rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Search users..." className="input-dark pl-10 py-2 text-sm" />
              </div>
            </div>
            <table className="w-full">
              <thead><tr className="border-b border-gray-200">
                <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Activity</th>
                <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Joined</th>
                <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr></thead>
              <tbody>
                {filteredUsers.map(u => (
                  <tr key={u.id} className="border-b border-gray-200 hover:bg-white/[0.02] transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-gray-900 text-xs font-bold">{u.name[0]}</div>
                        <div><p className="text-sm font-medium text-gray-900">{u.name}</p><p className="text-xs text-gray-500">{u.email}</p></div>
                      </div>
                    </td>
                    <td className="p-4"><span className={`badge text-xs ${u.role === "CLIENT" ? "badge-primary" : "badge-purple"}`}>{u.role}</span></td>
                    <td className="p-4"><span className={`badge text-xs ${u.status === "active" ? "badge-green" : "badge-red"}`}>{u.status}</span></td>
                    <td className="p-4"><p className="text-sm text-gray-600">{u.jobs} jobs</p></td>
                    <td className="p-4"><p className="text-sm text-gray-500">{new Date(u.joined).toLocaleDateString()}</p></td>
                    <td className="p-4">
                      <button className={`text-xs font-medium px-3 py-1 rounded-lg transition-all ${u.status === "active" ? "text-red-400 hover:bg-red-500/10" : "text-green-400 hover:bg-green-500/10"}`}>
                        {u.status === "active" ? "Suspend" : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "jobs" && (
          <div className="glass rounded-2xl p-8 text-center">
            <Briefcase className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-gray-600">Job management view — all active and completed jobs</p>
          </div>
        )}

        {tab === "campaigns" && (
          <div className="glass rounded-2xl p-8 text-center">
            <Database className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-gray-600">Data campaign management — track all collection campaigns</p>
          </div>
        )}
      </div>
    </div>
  );
}

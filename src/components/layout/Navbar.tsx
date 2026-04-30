"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  Cpu, Menu, X, ChevronDown, LogOut, User, LayoutDashboard,
  Briefcase, MessageSquare, Settings, Database
} from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  const navLinks = [
    { href: "/freelancers", label: "Find Talent" },
    { href: "/jobs", label: "Browse Jobs" },
    { href: "/tasks", label: "Data Tasks", icon: Database, teal: true },
  ];

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">
              <span className="text-white">AI</span>
              <span className="gradient-text">Hire</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(link.href)
                    ? link.teal
                      ? "bg-teal-500/10 text-teal-400"
                      : "bg-blue-500/10 text-blue-400"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.icon && <link.icon className="w-4 h-4" />}
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                    {session.user?.name?.[0]?.toUpperCase() || "U"}
                  </div>
                  <span className="text-sm font-medium text-slate-300">
                    {session.user?.name || "User"}
                  </span>
                  <ChevronDown className="w-4 h-4 text-slate-500" />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 glass rounded-xl border border-white/10 py-2 shadow-2xl">
                    <div className="px-4 py-2 border-b border-white/5">
                      <p className="text-sm font-medium text-white">{session.user?.name}</p>
                      <p className="text-xs text-slate-500">{session.user?.email}</p>
                      <span className="badge badge-blue mt-1 text-xs">
                        {(session.user as any)?.role || "USER"}
                      </span>
                    </div>
                    <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all" onClick={() => setProfileOpen(false)}>
                      <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </Link>
                    <Link href="/messages" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all" onClick={() => setProfileOpen(false)}>
                      <MessageSquare className="w-4 h-4" /> Messages
                    </Link>
                    <Link href="/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all" onClick={() => setProfileOpen(false)}>
                      <Settings className="w-4 h-4" /> Settings
                    </Link>
                    <div className="border-t border-white/5 mt-1 pt-1">
                      <button
                        onClick={() => signOut()}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-all"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/auth/login" className="btn-secondary text-sm py-2 px-4">
                  Log In
                </Link>
                <Link href="/auth/signup" className="btn-primary text-sm py-2 px-4">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/5 text-slate-400"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass border-t border-white/5">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isActive(link.href)
                    ? "bg-blue-500/10 text-blue-400"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.icon && <link.icon className="w-4 h-4" />}
                {link.label}
              </Link>
            ))}
            <div className="border-t border-white/5 pt-3 mt-3 space-y-2">
              {session ? (
                <>
                  <Link href="/dashboard" className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5" onClick={() => setMobileOpen(false)}>
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </Link>
                  <button onClick={() => signOut()} className="flex items-center gap-2 w-full px-4 py-3 rounded-lg text-sm text-red-400 hover:bg-red-500/10">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="block w-full text-center btn-secondary text-sm py-2.5" onClick={() => setMobileOpen(false)}>
                    Log In
                  </Link>
                  <Link href="/auth/signup" className="block w-full text-center btn-primary text-sm py-2.5" onClick={() => setMobileOpen(false)}>
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

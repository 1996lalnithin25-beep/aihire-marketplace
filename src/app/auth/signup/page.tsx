"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import {
  Cpu, Mail, Lock, Eye, EyeOff, User, Globe,
  Briefcase, Code, Database, ChevronRight
} from "lucide-react";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultRole = searchParams.get("role") === "CLIENT" ? "CLIENT" : "FREELANCER";

  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"CLIENT" | "FREELANCER">(defaultRole);
  const [specialization, setSpecialization] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role, specialization }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error);
        setLoading(false);
        return;
      }
      toast.success("Account created! Signing you in...");
      await signIn("credentials", { email, password, redirect: false });
      router.push("/dashboard");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-grid relative py-20">
      <div className="orb-blue" style={{ top: "20%", right: "10%" }} />
      <div className="orb-teal" style={{ bottom: "20%", left: "10%" }} />

      <div className="w-full max-w-lg relative">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">
              <span className="text-white">AI</span>
              <span className="gradient-text">Hire</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">Create Your Account</h1>
          <p className="text-slate-400">Join the AI talent marketplace</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all ${
                s <= step ? "w-12 bg-blue-500" : "w-8 bg-white/10"
              }`}
            />
          ))}
        </div>

        <div className="glass rounded-2xl p-8">
          {step === 1 && (
            <>
              <button
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all mb-6"
              >
                <Globe className="w-5 h-5" />
                Continue with Google
              </button>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-navy-900 text-slate-500">or sign up with email</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input-dark pl-10"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input-dark pl-10"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input-dark pl-10 pr-10"
                      placeholder="Min 6 characters"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (!name || !email || !password || password.length < 6) {
                      toast.error("Please fill all fields (password min 6 chars)");
                      return;
                    }
                    setStep(2);
                  }}
                  className="w-full btn-primary py-3 flex items-center justify-center gap-2"
                >
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">I want to...</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole("CLIENT")}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      role === "CLIENT"
                        ? "border-blue-500/50 bg-blue-500/10"
                        : "border-white/10 bg-white/5 hover:border-white/20"
                    }`}
                  >
                    <Briefcase className={`w-6 h-6 mb-2 ${role === "CLIENT" ? "text-blue-400" : "text-slate-500"}`} />
                    <p className="font-semibold text-white text-sm">Hire Talent</p>
                    <p className="text-xs text-slate-500 mt-1">Post jobs & manage projects</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("FREELANCER")}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      role === "FREELANCER"
                        ? "border-purple-500/50 bg-purple-500/10"
                        : "border-white/10 bg-white/5 hover:border-white/20"
                    }`}
                  >
                    <Code className={`w-6 h-6 mb-2 ${role === "FREELANCER" ? "text-purple-400" : "text-slate-500"}`} />
                    <p className="font-semibold text-white text-sm">Work as Freelancer</p>
                    <p className="text-xs text-slate-500 mt-1">Find projects & earn</p>
                  </button>
                </div>
              </div>

              {role === "FREELANCER" && (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">Specialization</label>
                  <div className="space-y-2">
                    {[
                      { value: "ai_developer", label: "AI Developer", desc: "Build AI apps, agents, fine-tune models", icon: Code },
                      { value: "ai_consultant", label: "AI Consultant", desc: "Strategy, evaluation, implementation", icon: Briefcase },
                      { value: "data_contributor", label: "Data Contributor", desc: "Labeling, recording, annotation, RLHF", icon: Database },
                    ].map((spec) => (
                      <button
                        key={spec.value}
                        type="button"
                        onClick={() => setSpecialization(spec.value)}
                        className={`w-full p-3 rounded-xl border text-left transition-all flex items-center gap-3 ${
                          specialization === spec.value
                            ? spec.value === "data_contributor"
                              ? "border-teal-500/50 bg-teal-500/10"
                              : "border-blue-500/50 bg-blue-500/10"
                            : "border-white/10 bg-white/5 hover:border-white/20"
                        }`}
                      >
                        <spec.icon className={`w-5 h-5 ${
                          specialization === spec.value
                            ? spec.value === "data_contributor" ? "text-teal-400" : "text-blue-400"
                            : "text-slate-500"
                        }`} />
                        <div>
                          <p className="font-medium text-white text-sm">{spec.label}</p>
                          <p className="text-xs text-slate-500">{spec.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn-secondary py-3 px-6"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 btn-primary py-3 disabled:opacity-50"
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </div>
            </form>
          )}
        </div>

        <p className="text-center text-sm text-slate-500 mt-6">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-400 hover:text-blue-300 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="skeleton w-32 h-8 rounded-lg" /></div>}>
      <SignupForm />
    </Suspense>
  );
}

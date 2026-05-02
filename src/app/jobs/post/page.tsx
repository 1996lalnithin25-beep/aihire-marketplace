"use client";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Briefcase, Database, ChevronRight, ChevronLeft, Upload, Shield } from "lucide-react";
import { SKILLS, DATA_TYPES, TASK_TYPES, LANGUAGES } from "@/lib/constants";

function PostJobForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultType = searchParams.get("type") === "data" ? "DATA_COLLECTION" : "STANDARD";
  const [jobType, setJobType] = useState<"STANDARD"|"DATA_COLLECTION">(defaultType);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [budgetType, setBudgetType] = useState("fixed");
  const [duration, setDuration] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [dataType, setDataType] = useState("TEXT");
  const [taskType, setTaskType] = useState("LABELING");
  const [volumeDesc, setVolumeDesc] = useState("");
  const [langRequired, setLangRequired] = useState<string[]>([]);
  const [qualityAccuracy, setQualityAccuracy] = useState("95");
  const [reviewRounds, setReviewRounds] = useState("3");
  const [contribReq, setContribReq] = useState("");
  const [budgetPerTask, setBudgetPerTask] = useState("");
  const [ndaRequired, setNdaRequired] = useState(false);

  const toggleSkill = (s: string) => setSelectedSkills(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s]);
  const toggleLang = (l: string) => setLangRequired(p => p.includes(l) ? p.filter(x => x !== l) : [...p, l]);
  const handleSubmit = () => { setLoading(true); toast.success("Job posted successfully! (Demo)"); setTimeout(() => { setLoading(false); router.push("/jobs"); }, 1000); };
  const totalSteps = jobType === "DATA_COLLECTION" ? 3 : 2;
  const accent = jobType === "DATA_COLLECTION";

  return (
    <div className="min-h-screen py-8 bg-grid relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Post a Job</h1>
          <p className="text-gray-600">Find the perfect AI talent for your project</p>
        </div>
        <div className="flex items-center gap-2 mb-8">
          {Array(totalSteps).fill(0).map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all flex-1 ${i+1 <= step ? (accent ? "bg-teal-500" : "bg-blue-500") : "bg-gray-200"}`} />
          ))}
        </div>

        <div className="glass rounded-2xl p-8">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Job Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <button type="button" onClick={() => setJobType("STANDARD")} className={`p-4 rounded-xl border text-left transition-all ${jobType==="STANDARD"?"border-blue-500/50 bg-blue-500/10":"border-gray-200 bg-gray-100"}`}>
                    <Briefcase className={`w-6 h-6 mb-2 ${jobType==="STANDARD"?"text-blue-400":"text-gray-500"}`} />
                    <p className="font-semibold text-gray-900 text-sm">Standard AI Job</p>
                    <p className="text-xs text-gray-500 mt-1">Development, consulting, fine-tuning</p>
                  </button>
                  <button type="button" onClick={() => setJobType("DATA_COLLECTION")} className={`p-4 rounded-xl border text-left transition-all ${jobType==="DATA_COLLECTION"?"border-teal-500/50 bg-teal-500/10":"border-gray-200 bg-gray-100"}`}>
                    <Database className={`w-6 h-6 mb-2 ${jobType==="DATA_COLLECTION"?"text-teal-400":"text-gray-500"}`} />
                    <p className="font-semibold text-gray-900 text-sm">Data Collection Job</p>
                    <p className="text-xs text-gray-500 mt-1">Labeling, recording, annotation, RLHF</p>
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Job Title *</label>
                <input value={title} onChange={e => setTitle(e.target.value)} className="input-dark" placeholder="e.g. Senior Prompt Engineer for Healthcare AI" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Description *</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} className="input-dark min-h-[150px] resize-y" placeholder="Describe requirements, deliverables..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Required Skills</label>
                {Object.entries(SKILLS).map(([cat, skills]) => (
                  <div key={cat} className="mb-3">
                    <p className="text-xs font-medium text-gray-500 mb-1.5">{cat}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.map(skill => (
                        <button key={skill} type="button" onClick={() => toggleSkill(skill)} className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${selectedSkills.includes(skill) ? (cat==="Data Collection"?"bg-teal-500/20 text-teal-400 border border-teal-500/30":"bg-blue-500/20 text-blue-400 border border-blue-500/30") : "bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200"}`}>
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => setStep(2)} disabled={!title||!description} className={`w-full py-3 flex items-center justify-center gap-2 rounded-xl font-semibold disabled:opacity-50 ${accent?"btn-primary":"btn-primary"}`}>
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              {jobType === "STANDARD" ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Budget Type</label>
                    <select value={budgetType} onChange={e => setBudgetType(e.target.value)} className="input-dark">
                      <option value="fixed">Fixed Price</option><option value="hourly">Hourly Rate</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Min ($)</label><input type="number" value={budgetMin} onChange={e => setBudgetMin(e.target.value)} className="input-dark" placeholder="500" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Max ($)</label><input type="number" value={budgetMax} onChange={e => setBudgetMax(e.target.value)} className="input-dark" placeholder="5000" /></div>
                  </div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Duration</label>
                    <select value={duration} onChange={e => setDuration(e.target.value)} className="input-dark">
                      <option value="">Select</option><option value="1-2 weeks">1-2 weeks</option><option value="2-4 weeks">2-4 weeks</option><option value="1-3 months">1-3 months</option><option value="3-6 months">3-6 months</option>
                    </select>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Data Type</label>
                      <select value={dataType} onChange={e => setDataType(e.target.value)} className="input-dark">{DATA_TYPES.map(t => <option key={t} value={t.toUpperCase()}>{t}</option>)}</select></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Task Type</label>
                      <select value={taskType} onChange={e => setTaskType(e.target.value)} className="input-dark">{TASK_TYPES.map(t => <option key={t} value={t.split(" ")[0].toUpperCase()}>{t}</option>)}</select></div>
                  </div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Volume</label>
                    <input value={volumeDesc} onChange={e => setVolumeDesc(e.target.value)} className="input-dark" placeholder='"5,000 labeled images"' /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Languages Required</label>
                    <div className="flex flex-wrap gap-1.5">{LANGUAGES.map(l => (
                      <button key={l} type="button" onClick={() => toggleLang(l)} className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${langRequired.includes(l)?"bg-teal-500/20 text-teal-400 border border-teal-500/30":"bg-gray-100 text-gray-600 border border-gray-200"}`}>{l}</button>
                    ))}</div></div>
                </>
              )}
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="btn-secondary py-3 px-6 flex items-center gap-2"><ChevronLeft className="w-4 h-4" /> Back</button>
                {jobType === "DATA_COLLECTION" ? (
                  <button onClick={() => setStep(3)} className="flex-1 btn-primary py-3 flex items-center justify-center gap-2">Continue <ChevronRight className="w-4 h-4" /></button>
                ) : (
                  <button onClick={handleSubmit} disabled={loading} className="flex-1 btn-primary py-3 disabled:opacity-50">{loading?"Posting...":"Post Job"}</button>
                )}
              </div>
            </div>
          )}

          {step === 3 && jobType === "DATA_COLLECTION" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Quality Accuracy (%)</label><input type="number" value={qualityAccuracy} onChange={e => setQualityAccuracy(e.target.value)} className="input-dark" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Review Rounds</label><input type="number" value={reviewRounds} onChange={e => setReviewRounds(e.target.value)} className="input-dark" /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Contributor Requirements</label>
                <textarea value={contribReq} onChange={e => setContribReq(e.target.value)} className="input-dark min-h-[80px] resize-y" placeholder="Native English speaker, US-based..." /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Budget Per Task ($)</label>
                <input type="number" value={budgetPerTask} onChange={e => setBudgetPerTask(e.target.value)} className="input-dark" placeholder="0.50" /></div>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-teal-500/30 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-slate-600 mx-auto mb-2" /><p className="text-sm text-gray-600">Drop sample files here</p><p className="text-xs text-slate-600 mt-1">CSV, JSON, ZIP</p>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-gray-200">
                <div className="flex items-center gap-3"><Shield className="w-5 h-5 text-amber-400" /><div><p className="text-sm font-medium text-gray-900">NDA Required</p><p className="text-xs text-gray-500">Contributors must sign NDA</p></div></div>
                <button type="button" onClick={() => setNdaRequired(!ndaRequired)} className={`w-12 h-6 rounded-full transition-all ${ndaRequired?"bg-teal-500":"bg-gray-200"} relative`}>
                  <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all ${ndaRequired?"left-6":"left-0.5"}`} />
                </button>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="btn-secondary py-3 px-6 flex items-center gap-2"><ChevronLeft className="w-4 h-4" /> Back</button>
                <button onClick={handleSubmit} disabled={loading} className="flex-1 btn-primary py-3 disabled:opacity-50">{loading?"Posting...":"Post Data Collection Job"}</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PostJobPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="skeleton w-32 h-8 rounded-lg" /></div>}>
      <PostJobForm />
    </Suspense>
  );
}

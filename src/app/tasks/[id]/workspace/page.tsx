"use client";
import { useState, use } from "react";
import { toast } from "sonner";
import { ArrowLeft, Flag, DollarSign, CheckCircle, SkipForward, ThumbsUp, ThumbsDown, Mic, Square, Play } from "lucide-react";
import Link from "next/link";

const DEMO_ITEMS = [
  { id: 1, text: "This product exceeded my expectations. The quality is amazing and shipping was fast.", labels: ["Positive", "Negative", "Neutral"] },
  { id: 2, text: "Terrible customer service. They never responded to my emails.", labels: ["Positive", "Negative", "Neutral"] },
  { id: 3, text: "The item works as described. Nothing special but does the job.", labels: ["Positive", "Negative", "Neutral"] },
  { id: 4, text: "I love this! Best purchase I've made this year. Highly recommend!", labels: ["Positive", "Negative", "Neutral"] },
  { id: 5, text: "Package arrived damaged. Very disappointed with the packaging.", labels: ["Positive", "Negative", "Neutral"] },
];

const RLHF_PAIRS = [
  { id: 1, prompt: "Explain quantum computing", a: "Quantum computing uses qubits that can exist in superposition, allowing them to process multiple states simultaneously. This enables quantum computers to solve certain problems exponentially faster than classical computers.", b: "Quantum computing is like having a super powerful computer that uses tiny particles. It's really fast and can do lots of things at once, which makes it better than regular computers for some tasks." },
  { id: 2, prompt: "How to make a good coffee?", a: "Start by grinding fresh beans. Use filtered water heated to 195-205°F. Use a ratio of 1:16 coffee to water. Brew for 4-5 minutes with a pour-over method.", b: "To make good coffee, you need beans, water, and a coffee maker. Put the beans in, add water, and press the button. Wait a few minutes and enjoy!" },
];

function TextLabelingWorkspace() {
  const [current, setCurrent] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [earnings, setEarnings] = useState(0);
  const item = DEMO_ITEMS[current];

  const handleLabel = (label: string) => {
    toast.success(`Labeled as "${label}"`);
    setCompleted(c => c + 1);
    setEarnings(e => e + 0.05);
    if (current < DEMO_ITEMS.length - 1) setCurrent(c => c + 1);
    else toast.success("All tasks completed! 🎉");
  };

  return (
    <div>
      <div className="glass rounded-2xl p-8 mb-6">
        <p className="text-xs text-gray-500 mb-2">Item {current + 1} of {DEMO_ITEMS.length}</p>
        <div className="p-6 rounded-xl bg-white/[0.03] border border-gray-200 mb-6">
          <p className="text-lg text-gray-900 leading-relaxed">&ldquo;{item?.text}&rdquo;</p>
        </div>
        <p className="text-sm text-gray-600 mb-4">Select the sentiment of this review:</p>
        <div className="flex flex-wrap gap-3">
          {item?.labels.map(label => (
            <button key={label} onClick={() => handleLabel(label)} className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
              label === "Positive" ? "bg-green-500/10 text-green-400 border border-green-500/30 hover:bg-green-500/20" :
              label === "Negative" ? "bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20" :
              "bg-slate-500/10 text-gray-600 border border-slate-500/30 hover:bg-slate-500/20"
            }`}>{label}</button>
          ))}
        </div>
      </div>
      <div className="flex gap-3">
        <button onClick={() => current < DEMO_ITEMS.length - 1 && setCurrent(c => c+1)} className="btn-secondary flex items-center gap-2"><SkipForward className="w-4 h-4" /> Skip</button>
        <button onClick={() => toast.info("Task flagged for review")} className="btn-secondary flex items-center gap-2 !text-amber-400 !border-amber-500/30"><Flag className="w-4 h-4" /> Flag</button>
      </div>
    </div>
  );
}

function RLHFWorkspace() {
  const [current, setCurrent] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [earnings, setEarnings] = useState(0);
  const pair = RLHF_PAIRS[current];

  const handleSelect = (choice: "a" | "b") => {
    toast.success(`Selected Response ${choice.toUpperCase()}`);
    setCompleted(c => c + 1);
    setEarnings(e => e + 0.15);
    if (current < RLHF_PAIRS.length - 1) setCurrent(c => c + 1);
    else toast.success("All comparisons completed! 🎉");
  };

  return (
    <div className="glass rounded-2xl p-8">
      <p className="text-xs text-gray-500 mb-4">Comparison {current + 1} of {RLHF_PAIRS.length}</p>
      <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 mb-6">
        <p className="text-xs text-blue-400 mb-1">Prompt</p>
        <p className="text-gray-900 font-medium">{pair?.prompt}</p>
      </div>
      <p className="text-sm text-gray-600 mb-4">Which response is better?</p>
      <div className="grid md:grid-cols-2 gap-4">
        <button onClick={() => handleSelect("a")} className="p-5 rounded-xl bg-white/[0.02] border border-gray-200 text-left hover:border-teal-500/30 hover:bg-teal-500/5 transition-all group">
          <p className="text-xs text-teal-400 mb-2 font-semibold">Response A</p>
          <p className="text-sm text-gray-700">{pair?.a}</p>
          <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity"><span className="badge badge-primary text-xs"><ThumbsUp className="w-3 h-3" /> Select</span></div>
        </button>
        <button onClick={() => handleSelect("b")} className="p-5 rounded-xl bg-white/[0.02] border border-gray-200 text-left hover:border-purple-500/30 hover:bg-purple-500/5 transition-all group">
          <p className="text-xs text-purple-400 mb-2 font-semibold">Response B</p>
          <p className="text-sm text-gray-700">{pair?.b}</p>
          <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity"><span className="badge badge-purple text-xs"><ThumbsUp className="w-3 h-3" /> Select</span></div>
        </button>
      </div>
    </div>
  );
}

function AudioRecordingWorkspace() {
  const [recording, setRecording] = useState(false);
  const [recorded, setRecorded] = useState(false);
  const prompts = ["Please say: 'Navigate to the nearest gas station'", "Please say: 'Set a timer for 10 minutes'", "Please say: 'Call Mom on speaker'"];
  const [current, setCurrent] = useState(0);

  return (
    <div className="glass rounded-2xl p-8">
      <p className="text-xs text-gray-500 mb-4">Recording {current + 1} of {prompts.length}</p>
      <div className="p-6 rounded-xl bg-purple-500/5 border border-purple-500/10 mb-6 text-center">
        <Mic className="w-8 h-8 text-purple-400 mx-auto mb-3" />
        <p className="text-lg text-gray-900 font-medium">{prompts[current]}</p>
      </div>
      <div className="flex justify-center gap-4">
        {!recording && !recorded && (
          <button onClick={() => { setRecording(true); setTimeout(() => { setRecording(false); setRecorded(true); }, 2000); }} className="btn-primary flex items-center gap-2 py-3 px-8 !bg-gradient-to-r !from-red-500 !to-pink-600">
            <Mic className="w-5 h-5" /> Start Recording
          </button>
        )}
        {recording && (
          <button onClick={() => { setRecording(false); setRecorded(true); }} className="btn-primary flex items-center gap-2 py-3 px-8 !bg-gradient-to-r !from-red-600 !to-red-700 animate-pulse">
            <Square className="w-5 h-5" /> Stop Recording
          </button>
        )}
        {recorded && (
          <div className="flex gap-3">
            <button onClick={() => { setRecorded(false); }} className="btn-secondary flex items-center gap-2"><Mic className="w-4 h-4" /> Re-record</button>
            <button onClick={() => { toast.success("Recording submitted!"); setRecorded(false); if (current < prompts.length - 1) setCurrent(c => c + 1); }} className="btn-primary flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Submit</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TaskWorkspacePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [completed, setCompleted] = useState(0);
  const [earnings, setEarnings] = useState(0);
  const taskTypes: Record<string, string> = { "1": "labeling", "2": "recording", "3": "rlhf", "4": "labeling", "5": "transcription", "6": "survey" };
  const taskNames: Record<string, string> = { "1": "Sentiment Labeling", "2": "Voice Recording", "3": "RLHF Preference Ranking", "4": "Image Classification", "5": "Transcription", "6": "Survey" };
  const type = taskTypes[id] || "labeling";

  return (
    <div className="workspace-focus min-h-screen">
      {/* Top bar */}
      <div className="glass border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-16 z-40">
        <div className="flex items-center gap-4">
          <Link href="/tasks" className="text-gray-600 hover:text-gray-900 transition-colors"><ArrowLeft className="w-5 h-5" /></Link>
          <div><p className="text-sm font-semibold text-gray-900">{taskNames[id] || "Task"}</p><p className="text-xs text-gray-500">Task Workspace</p></div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-center"><p className="text-xs text-gray-500">Completed</p><p className="text-sm font-bold text-teal-400">{completed} / 10</p></div>
          <div className="text-center"><p className="text-xs text-gray-500">Earned</p><p className="text-sm font-bold text-green-400"><DollarSign className="w-3 h-3 inline" />{earnings.toFixed(2)}</p></div>
          <div className="w-32"><div className="flex justify-between text-xs mb-1"><span className="text-gray-500">Progress</span><span className="text-teal-400">{Math.round((completed/10)*100)}%</span></div>
            <div className="w-full h-2 rounded-full bg-gray-100"><div className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-400 transition-all" style={{width:`${(completed/10)*100}%`}} /></div>
          </div>
        </div>
      </div>

      {/* Workspace content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {type === "labeling" && <TextLabelingWorkspace />}
        {type === "rlhf" && <RLHFWorkspace />}
        {type === "recording" && <AudioRecordingWorkspace />}
        {(type === "transcription" || type === "survey") && (
          <div className="glass rounded-2xl p-8 text-center">
            <p className="text-gray-600">Transcription / Survey workspace coming soon</p>
            <div className="mt-4"><textarea className="input-dark min-h-[200px] resize-y" placeholder="Type your transcription here..." /></div>
            <button className="btn-primary mt-4" onClick={() => toast.success("Submitted!")}>Submit</button>
          </div>
        )}
      </div>
    </div>
  );
}

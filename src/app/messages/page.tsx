"use client";
import { useState } from "react";
import { Send, Paperclip, Search, Phone, Video, MoreVertical } from "lucide-react";

const THREADS = [
  { id: "1", name: "Sarah Chen", role: "Client", lastMsg: "Thanks for the update on the labeling batch...", time: "2h ago", unread: 2, avatar: "S" },
  { id: "2", name: "Alex Kumar", role: "Freelancer", lastMsg: "The fine-tuning results look great!", time: "5h ago", unread: 0, avatar: "A" },
  { id: "3", name: "Maria Garcia", role: "Data Contributor", lastMsg: "I've completed 500 more recordings", time: "1d ago", unread: 0, avatar: "M" },
  { id: "4", name: "James Wilson", role: "Client", lastMsg: "Can we schedule a call to discuss the RLHF task?", time: "2d ago", unread: 1, avatar: "J" },
];

const MESSAGES = [
  { id: 1, sender: "them", text: "Hi! I saw your profile and I'm interested in hiring you for a data labeling project.", time: "10:30 AM" },
  { id: 2, sender: "me", text: "Thank you for reaching out! I'd love to hear more about the project. What kind of data needs to be labeled?", time: "10:32 AM" },
  { id: 3, sender: "them", text: "We need sentiment analysis labeling for about 5,000 product reviews. We have the dataset ready and need someone with high accuracy.", time: "10:35 AM" },
  { id: 4, sender: "me", text: "That's right up my alley! I have a 96% accuracy score on similar tasks. What's the timeline and budget per item?", time: "10:38 AM" },
  { id: 5, sender: "them", text: "Great! We're looking at $0.05 per item with a 2-week deadline. Does that work for you?", time: "10:40 AM" },
  { id: 6, sender: "me", text: "That works perfectly. I can start right away and should be done well before the deadline.", time: "10:42 AM" },
  { id: 7, sender: "them", text: "Thanks for the update on the labeling batch. The quality is excellent so far!", time: "2:15 PM" },
];

export default function MessagesPage() {
  const [activeThread, setActiveThread] = useState(THREADS[0]);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(MESSAGES);
  const [searchQ, setSearchQ] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, { id: messages.length + 1, sender: "me", text: newMessage, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
    setNewMessage("");
  };

  const gradients = ["from-blue-500 to-indigo-600", "from-purple-500 to-pink-600", "from-teal-500 to-emerald-600", "from-orange-500 to-red-600"];

  return (
    <div className="min-h-screen bg-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-white mb-6">Messages</h1>
        <div className="glass rounded-2xl overflow-hidden" style={{ height: "calc(100vh - 200px)" }}>
          <div className="grid grid-cols-12 h-full">
            {/* Thread list */}
            <div className="col-span-4 border-r border-white/5 flex flex-col">
              <div className="p-4 border-b border-white/5">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Search messages..." className="input-dark pl-10 py-2 text-sm" />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto workspace-scroll">
                {THREADS.map((t, i) => (
                  <button key={t.id} onClick={() => setActiveThread(t)} className={`w-full p-4 text-left transition-all flex items-center gap-3 border-b border-white/5 ${activeThread.id === t.id ? "bg-blue-500/5" : "hover:bg-white/[0.02]"}`}>
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center text-white font-bold text-sm shrink-0`}>{t.avatar}</div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-white truncate">{t.name}</p>
                        <span className="text-xs text-slate-600 shrink-0">{t.time}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-slate-500 truncate">{t.lastMsg}</p>
                        {t.unread > 0 && <span className="w-5 h-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center shrink-0">{t.unread}</span>}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat area */}
            <div className="col-span-8 flex flex-col">
              {/* Chat header */}
              <div className="p-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">{activeThread.avatar}</div>
                  <div><p className="text-sm font-semibold text-white">{activeThread.name}</p><p className="text-xs text-slate-500">{activeThread.role}</p></div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg hover:bg-white/5 text-slate-400"><Phone className="w-4 h-4" /></button>
                  <button className="p-2 rounded-lg hover:bg-white/5 text-slate-400"><Video className="w-4 h-4" /></button>
                  <button className="p-2 rounded-lg hover:bg-white/5 text-slate-400"><MoreVertical className="w-4 h-4" /></button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto workspace-scroll p-6 space-y-4">
                {messages.map(m => (
                  <div key={m.id} className={`flex ${m.sender === "me" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm ${
                      m.sender === "me" ? "bg-blue-500/20 text-blue-100 rounded-br-md" : "bg-white/5 text-slate-300 rounded-bl-md"
                    }`}>
                      <p>{m.text}</p>
                      <p className={`text-xs mt-1 ${m.sender === "me" ? "text-blue-400/50" : "text-slate-600"}`}>{m.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <button className="p-2 rounded-lg hover:bg-white/5 text-slate-400"><Paperclip className="w-5 h-5" /></button>
                  <input value={newMessage} onChange={e => setNewMessage(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSend()} placeholder="Type a message..." className="input-dark flex-1 py-2.5" />
                  <button onClick={handleSend} className="btn-primary p-2.5 !rounded-xl"><Send className="w-5 h-5" /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const SKILLS = {
  "AI Development": [
    "Prompt Engineering",
    "LangChain",
    "LlamaIndex",
    "RAG",
    "AI Agents",
    "Fine-tuning (LoRA/QLoRA)",
    "LLM Evaluation",
    "Embedding Models",
    "Vector Databases",
    "MLOps",
  ],
  "Data Collection": [
    "Text Annotation",
    "Image Labeling",
    "Audio Recording",
    "Video Annotation",
    "Transcription",
    "Translation",
    "RLHF / Preference Ranking",
    "Data Cleaning",
    "Synthetic Data Generation",
    "Sentiment Labeling",
    "Named Entity Recognition (NER)",
    "Bounding Box Annotation",
    "Keypoint Annotation",
    "Optical Character Recognition (OCR)",
  ],
  Specialties: [
    "Native Speaker",
    "Accent Variety",
    "Domain Expert (Medical)",
    "Domain Expert (Legal)",
    "Domain Expert (Finance)",
    "Domain Expert (Tech)",
  ],
} as const;

export const ALL_SKILLS = Object.values(SKILLS).flat();

export const CATEGORIES = [
  { name: "Prompt Engineering", icon: "MessageSquare", color: "from-blue-500 to-indigo-600" },
  { name: "AI Agent Development", icon: "Bot", color: "from-purple-500 to-violet-600" },
  { name: "LLM Fine-tuning", icon: "Settings", color: "from-orange-500 to-red-600" },
  { name: "Computer Vision", icon: "Eye", color: "from-cyan-500 to-blue-600" },
  { name: "Voice AI", icon: "Mic", color: "from-pink-500 to-rose-600" },
  { name: "AI Consulting", icon: "Lightbulb", color: "from-amber-500 to-yellow-600" },
  { name: "Data Collection & Labeling", icon: "Database", color: "from-teal-400 to-emerald-600", featured: true },
  { name: "Human Feedback & RLHF", icon: "ThumbsUp", color: "from-green-400 to-teal-600", featured: true },
  { name: "Synthetic Data Generation", icon: "Sparkles", color: "from-emerald-400 to-cyan-600", featured: true },
] as const;

export const STATS = [
  { label: "AI Freelancers", value: 12500, suffix: "+" },
  { label: "Projects Completed", value: 48000, suffix: "+" },
  { label: "Datasets Delivered", value: 3200, suffix: "+" },
  { label: "Client Satisfaction", value: 98, suffix: "%" },
] as const;

export const DATA_TYPES = [
  "Text", "Audio", "Image", "Video", "Multilingual", "Behavioral"
] as const;

export const TASK_TYPES = [
  "Labeling", "Annotation", "Transcription", "Translation", 
  "Recording", "Preference Ranking (RLHF)", "Survey/Questionnaire", "Web Scraping & Cleaning"
] as const;

export const LANGUAGES = [
  "English", "Spanish", "French", "German", "Chinese (Mandarin)", 
  "Japanese", "Korean", "Hindi", "Arabic", "Portuguese",
  "Russian", "Italian", "Dutch", "Swedish", "Turkish"
] as const;

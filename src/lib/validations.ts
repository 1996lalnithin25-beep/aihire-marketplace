import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["CLIENT", "FREELANCER"]),
  specialization: z.string().optional(),
});

export const jobSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  type: z.enum(["STANDARD", "DATA_COLLECTION"]),
  budgetMin: z.number().min(0).optional(),
  budgetMax: z.number().min(0).optional(),
  budgetType: z.string().optional(),
  duration: z.string().optional(),
  skills: z.array(z.string()).min(1, "Select at least one skill"),
});

export const dataCollectionSchema = z.object({
  dataType: z.enum(["TEXT", "AUDIO", "IMAGE", "VIDEO", "MULTILINGUAL", "BEHAVIORAL"]),
  taskType: z.enum([
    "LABELING", "ANNOTATION", "TRANSCRIPTION", "TRANSLATION",
    "RECORDING", "PREFERENCE_RANKING", "SURVEY", "WEB_SCRAPING",
  ]),
  volumeDescription: z.string().min(1, "Volume description is required"),
  languagesRequired: z.array(z.string()),
  qualityAccuracy: z.number().min(0).max(100).optional(),
  qualityReviewRounds: z.number().min(1).max(10).optional(),
  contributorRequirements: z.string().optional(),
  budgetPerTask: z.number().min(0).optional(),
  budgetPerItem: z.number().min(0).optional(),
  flatFee: z.number().min(0).optional(),
  ndaRequired: z.boolean().default(false),
});

export const proposalSchema = z.object({
  coverLetter: z.string().min(50, "Cover letter must be at least 50 characters"),
  proposedRate: z.number().min(1, "Rate must be at least $1"),
  estimatedDays: z.number().min(1).optional(),
});

export const messageSchema = z.object({
  content: z.string().min(1, "Message cannot be empty"),
  receiverId: z.string(),
});

export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
  accuracyRating: z.number().min(1).max(5).optional(),
  reliabilityScore: z.number().min(1).max(5).optional(),
});

export const profileSchema = z.object({
  tagline: z.string().max(100).optional(),
  bio: z.string().max(2000).optional(),
  hourlyRate: z.number().min(0).optional(),
  availability: z.enum(["available", "busy", "unavailable"]).optional(),
  location: z.string().optional(),
  languages: z.array(z.string()),
  skills: z.array(z.string()),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type JobInput = z.infer<typeof jobSchema>;
export type DataCollectionInput = z.infer<typeof dataCollectionSchema>;
export type ProposalInput = z.infer<typeof proposalSchema>;
export type MessageInput = z.infer<typeof messageSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clean
  await prisma.taskSubmission.deleteMany();
  await prisma.taskItem.deleteMany();
  await prisma.taskBatch.deleteMany();
  await prisma.dataCollectionCampaign.deleteMany();
  await prisma.milestone.deleteMany();
  await prisma.review.deleteMany();
  await prisma.contract.deleteMany();
  await prisma.proposal.deleteMany();
  await prisma.message.deleteMany();
  await prisma.payout.deleteMany();
  await prisma.accuracyScore.deleteMany();
  await prisma.portfolioItem.deleteMany();
  await prisma.contributorProfile.deleteMany();
  await prisma.freelancerProfile.deleteMany();
  await prisma.job.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  // Create skills
  const skillData = [
    { name: "Prompt Engineering", category: "AI Development" },
    { name: "LangChain", category: "AI Development" },
    { name: "RAG", category: "AI Development" },
    { name: "AI Agents", category: "AI Development" },
    { name: "Fine-tuning (LoRA/QLoRA)", category: "AI Development" },
    { name: "LLM Evaluation", category: "AI Development" },
    { name: "Vector Databases", category: "AI Development" },
    { name: "MLOps", category: "AI Development" },
    { name: "Text Annotation", category: "Data Collection" },
    { name: "Image Labeling", category: "Data Collection" },
    { name: "Audio Recording", category: "Data Collection" },
    { name: "Transcription", category: "Data Collection" },
    { name: "Translation", category: "Data Collection" },
    { name: "RLHF / Preference Ranking", category: "Data Collection" },
    { name: "Data Cleaning", category: "Data Collection" },
    { name: "Sentiment Labeling", category: "Data Collection" },
    { name: "NER", category: "Data Collection" },
    { name: "Bounding Box Annotation", category: "Data Collection" },
  ];

  const skills = await Promise.all(
    skillData.map((s) => prisma.skill.create({ data: s }))
  );
  const skillMap = Object.fromEntries(skills.map((s) => [s.name, s.id]));

  const hashedPw = await bcrypt.hash("password123", 12);

  // ── AI Freelancers ──
  const freelancers = [
    { name: "Alex Kumar", email: "alex@demo.com", tagline: "Senior RAG & LangChain Developer", bio: "5+ years building production AI systems.", rate: 95, skills: ["RAG", "LangChain", "AI Agents", "Vector Databases"], loc: "San Francisco, US", langs: ["English"] },
    { name: "Sophia Zhang", email: "sophia@demo.com", tagline: "Prompt Engineering Expert", bio: "Specialized in GPT-4, Claude prompt optimization.", rate: 85, skills: ["Prompt Engineering", "LLM Evaluation", "Fine-tuning (LoRA/QLoRA)"], loc: "Toronto, CA", langs: ["English", "Chinese"] },
    { name: "Marcus Johnson", email: "marcus@demo.com", tagline: "MLOps & AI Infrastructure", bio: "Building scalable ML pipelines.", rate: 120, skills: ["MLOps", "Vector Databases", "AI Agents"], loc: "London, UK", langs: ["English"] },
    { name: "Priya Patel", email: "priya@demo.com", tagline: "Computer Vision & Fine-tuning", bio: "Deep learning specialist.", rate: 100, skills: ["Fine-tuning (LoRA/QLoRA)", "LLM Evaluation"], loc: "Mumbai, IN", langs: ["English", "Hindi"] },
    { name: "Daniel Kim", email: "daniel@demo.com", tagline: "AI Agent Developer", bio: "Building autonomous AI agents.", rate: 110, skills: ["AI Agents", "LangChain", "Prompt Engineering"], loc: "Seoul, KR", langs: ["English", "Korean"] },
    { name: "Emma Wilson", email: "emma@demo.com", tagline: "NLP & LLM Consultant", bio: "Strategic AI consulting.", rate: 150, skills: ["LLM Evaluation", "Prompt Engineering", "RAG"], loc: "New York, US", langs: ["English"] },
    { name: "Carlos Rivera", email: "carlos@demo.com", tagline: "Full-Stack AI Developer", bio: "End-to-end AI applications.", rate: 90, skills: ["RAG", "MLOps", "AI Agents"], loc: "Madrid, ES", langs: ["English", "Spanish"] },
    { name: "Yuki Tanaka", email: "yuki@demo.com", tagline: "Voice AI Specialist", bio: "Building voice interfaces.", rate: 105, skills: ["Prompt Engineering", "Fine-tuning (LoRA/QLoRA)"], loc: "Tokyo, JP", langs: ["English", "Japanese"] },
    { name: "Ahmed Hassan", email: "ahmed@demo.com", tagline: "AI Security & Evaluation", bio: "AI safety research.", rate: 130, skills: ["LLM Evaluation", "AI Agents"], loc: "Dubai, AE", langs: ["English", "Arabic"] },
    { name: "Lisa Anderson", email: "lisa@demo.com", tagline: "RAG & Embedding Expert", bio: "Search and retrieval systems.", rate: 95, skills: ["RAG", "Vector Databases", "LangChain"], loc: "Berlin, DE", langs: ["English", "German"] },
  ];

  for (const f of freelancers) {
    const user = await prisma.user.create({
      data: { name: f.name, email: f.email, hashedPassword: hashedPw, role: "FREELANCER" },
    });
    await prisma.freelancerProfile.create({
      data: {
        userId: user.id, tagline: f.tagline, bio: f.bio, hourlyRate: f.rate,
        availability: "available", location: f.loc, languages: f.langs,
        skills: { connect: f.skills.filter(s => skillMap[s]).map(s => ({ id: skillMap[s] })) },
        portfolioItems: {
          create: [
            { title: `${f.name.split(" ")[0]}'s AI Project`, description: "A production AI system built for enterprise clients." },
          ],
        },
      },
    });
  }

  // ── Data Contributors ──
  const contributors = [
    { name: "Rosa Martinez", email: "rosa@demo.com", langs: ["English", "Spanish"], skills: ["Text Annotation", "Sentiment Labeling", "Translation"], accuracy: 97, tasks: 1250, datasets: 8 },
    { name: "Wei Chen", email: "wei@demo.com", langs: ["English", "Chinese"], skills: ["Text Annotation", "NER", "Translation"], accuracy: 95, tasks: 980, datasets: 6 },
    { name: "Fatima Al-Rashid", email: "fatima@demo.com", langs: ["English", "Arabic"], skills: ["Audio Recording", "Transcription"], accuracy: 98, tasks: 750, datasets: 4 },
    { name: "Jean-Pierre Dubois", email: "jean@demo.com", langs: ["English", "French"], skills: ["RLHF / Preference Ranking", "Text Annotation"], accuracy: 94, tasks: 2100, datasets: 12 },
    { name: "Kenji Yamamoto", email: "kenji@demo.com", langs: ["English", "Japanese"], skills: ["Image Labeling", "Bounding Box Annotation"], accuracy: 96, tasks: 3200, datasets: 15 },
    { name: "Anya Petrova", email: "anya@demo.com", langs: ["English", "Russian"], skills: ["Transcription", "Data Cleaning", "Translation"], accuracy: 93, tasks: 560, datasets: 3 },
    { name: "Oluwaseun Adeyemi", email: "olu@demo.com", langs: ["English", "Yoruba"], skills: ["Audio Recording", "Sentiment Labeling"], accuracy: 91, tasks: 420, datasets: 2 },
    { name: "Ingrid Svensson", email: "ingrid@demo.com", langs: ["English", "Swedish"], skills: ["RLHF / Preference Ranking", "Text Annotation", "NER"], accuracy: 99, tasks: 4500, datasets: 20 },
  ];

  for (const c of contributors) {
    const user = await prisma.user.create({
      data: { name: c.name, email: c.email, hashedPassword: hashedPw, role: "FREELANCER" },
    });
    await prisma.freelancerProfile.create({
      data: {
        userId: user.id, tagline: `Data Contributor — ${c.langs.join(", ")}`,
        bio: `Experienced data contributor specializing in ${c.skills.join(", ")}.`,
        hourlyRate: 25, availability: "available", languages: c.langs,
        isDataContributor: true,
        skills: { connect: c.skills.filter(s => skillMap[s]).map(s => ({ id: skillMap[s] })) },
      },
    });
    await prisma.contributorProfile.create({
      data: {
        userId: user.id, tasksCompleted: c.tasks, languagesSpoken: c.langs,
        accuracyScore: c.accuracy, datasetsContributed: c.datasets, isVerified: true, onboardingComplete: true,
      },
    });
  }

  // ── Clients ──
  const client1 = await prisma.user.create({ data: { name: "TechCorp AI", email: "client1@demo.com", hashedPassword: hashedPw, role: "CLIENT" } });
  const client2 = await prisma.user.create({ data: { name: "DataVerse Labs", email: "client2@demo.com", hashedPassword: hashedPw, role: "CLIENT" } });

  // ── Admin ──
  await prisma.user.create({ data: { name: "Admin User", email: "admin@demo.com", hashedPassword: hashedPw, role: "ADMIN" } });

  // ── Standard Jobs ──
  const jobsData = [
    { title: "RAG Pipeline for Legal AI", desc: "Build a production RAG pipeline for legal document retrieval.", min: 3000, max: 5000, skills: ["RAG", "LangChain", "Vector Databases"] },
    { title: "Prompt Engineering for Customer Support Bot", desc: "Optimize prompts for a customer support chatbot.", min: 1500, max: 3000, skills: ["Prompt Engineering", "LLM Evaluation"] },
    { title: "Fine-tune LLaMA for Medical Domain", desc: "Fine-tune an open-source LLM on medical data.", min: 5000, max: 10000, skills: ["Fine-tuning (LoRA/QLoRA)", "MLOps"] },
    { title: "AI Agent for Data Analysis", desc: "Build an autonomous agent that can analyze CSV datasets.", min: 2000, max: 4000, skills: ["AI Agents", "LangChain"] },
    { title: "Vector Search Implementation", desc: "Implement semantic search with embeddings.", min: 2500, max: 4500, skills: ["Vector Databases", "RAG"] },
  ];

  for (const j of jobsData) {
    await prisma.job.create({
      data: {
        title: j.title, description: j.desc, type: "STANDARD", budgetMin: j.min, budgetMax: j.max,
        budgetType: "fixed", duration: "2-4 weeks", clientId: client1.id,
        skills: { connect: j.skills.filter(s => skillMap[s]).map(s => ({ id: skillMap[s] })) },
      },
    });
  }

  // ── Data Collection Campaigns ──
  // 1. Text Labeling
  const textJob = await prisma.job.create({
    data: { title: "Sentiment Labeling - Product Reviews", description: "Label 5,000 product reviews as Positive, Negative, or Neutral.", type: "DATA_COLLECTION", budgetMin: 250, budgetMax: 500, clientId: client2.id, skills: { connect: [{ id: skillMap["Sentiment Labeling"] }] } },
  });
  const textCampaign = await prisma.dataCollectionCampaign.create({
    data: { jobId: textJob.id, clientId: client2.id, dataType: "TEXT", taskType: "LABELING", volumeDescription: "5,000 labeled reviews", languagesRequired: ["English"], qualityAccuracy: 95, qualityReviewRounds: 3, budgetPerTask: 0.05 },
  });
  const textBatch = await prisma.taskBatch.create({ data: { campaignId: textCampaign.id, name: "Batch 1 - Electronics Reviews", totalItems: 100, reviewsPerItem: 3 } });
  for (let i = 0; i < 10; i++) {
    await prisma.taskItem.create({ data: { batchId: textBatch.id, data: JSON.stringify({ text: `Sample review ${i+1}: This product is ${ i%3===0?'great':i%3===1?'terrible':'okay'}.`, labels: ["Positive","Negative","Neutral"] }), payPerItem: 0.05, estimatedTime: 15 } });
  }

  // 2. Audio Recording
  const audioJob = await prisma.job.create({
    data: { title: "Voice Recording - Navigation Commands", description: "Record 2,000 voice navigation commands.", type: "DATA_COLLECTION", budgetMin: 500, budgetMax: 1000, clientId: client2.id, skills: { connect: [{ id: skillMap["Audio Recording"] }] } },
  });
  await prisma.dataCollectionCampaign.create({
    data: { jobId: audioJob.id, clientId: client2.id, dataType: "AUDIO", taskType: "RECORDING", volumeDescription: "2,000 voice recordings", languagesRequired: ["English", "Spanish"], qualityAccuracy: 90, budgetPerTask: 0.25 },
  });

  // 3. RLHF
  const rlhfJob = await prisma.job.create({
    data: { title: "RLHF Preference Ranking - Chatbot", description: "Rank 3,000 chatbot response pairs.", type: "DATA_COLLECTION", budgetMin: 450, budgetMax: 900, clientId: client1.id, skills: { connect: [{ id: skillMap["RLHF / Preference Ranking"] }] } },
  });
  await prisma.dataCollectionCampaign.create({
    data: { jobId: rlhfJob.id, clientId: client1.id, dataType: "TEXT", taskType: "PREFERENCE_RANKING", volumeDescription: "3,000 response pairs", languagesRequired: ["English"], qualityAccuracy: 92, budgetPerTask: 0.15 },
  });

  console.log("✅ Seed complete!");
}

main().catch(console.error).finally(() => prisma.$disconnect());

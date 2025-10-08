export interface ProfileGeneratorExample {
  id: string;
  title: string;
  description: string;
  prompt: string;
}

export const profileGeneratorExamples: ProfileGeneratorExample[] = [
  {
    id: "ai-researcher",
    title: "AI Researcher Bio",
    description: "Technical yet approachable intro for a research profile.",
    prompt:
      "You are an AI researcher focused on multi-modal systems. Summarize your breakthroughs, highlight collaboration style, and invite peers to reach out for joint experiments.",
  },
  {
    id: "ux-designer",
    title: "UX Designer Tagline",
    description: "Warm, user-centered copy for a portfolio landing page.",
    prompt:
      "Craft a short first-person bio for a senior UX designer who loves turning complex requirements into calm interfaces. Mention experience with accessibility and rapid prototyping.",
  },
  {
    id: "founder",
    title: "Startup Founder Intro",
    description: "Concise overview for founders pitching investors.",
    prompt:
      "Write a confident yet humble self-introduction for a climate-tech founder. Include mission focus, recent traction, and a call to connect with investors interested in sustainability.",
  },
];

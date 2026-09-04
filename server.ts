import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Helper for Gemini AI client
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Analyze Fit between Candidate CV & Job Description
app.post("/api/analyze-fit", async (req, res) => {
  try {
    const { candidate, job } = req.body;
    if (!job) {
      return res.status(400).json({ error: "Job details are required" });
    }

    const ai = getGeminiClient();
    if (!ai) {
      // Fallback deterministic analysis if no key is configured
      return res.json(generateFallbackFitAnalysis(candidate, job));
    }

    const prompt = `You are a workforce development expert and talent intelligence system in Singapore (TalentTrust).
Analyze the fit between this candidate and this job opening.

Candidate Profile:
- Name: ${candidate?.name || "May Tan"}
- Current Role: ${candidate?.currentRole || "Senior UX / Product Specialist"}
- Experience Level: ${candidate?.experienceYears || "5 years"}
- Core Skills: ${(candidate?.skills || ["Figma", "Design Systems", "User Research & Testing", "Interactive Prototyping", "Agile"]).join(", ")}
- Education: ${candidate?.education || "Bachelor of Design / Polytechnic Diploma in InfoTech"}
- LinkedIn Summary: ${candidate?.linkedInUrl || "Verified Talent Profile"}
- CV Text / Notes: ${candidate?.cvSummary || "Extensive experience designing citizen-facing and fintech applications, user journeys, SGDS government design systems"}

Target Job:
- Title: ${job.title}
- Company: ${job.company}
- Location: ${job.location}
- Salary Range: ${job.salary || "Competitive"}
- Description: ${job.description}
- Required Skills: ${(job.requiredSkills || []).join(", ")}
- Nice to have: ${(job.niceToHave || []).join(", ")}

Generate a detailed fit analysis. Explain both why the candidate is a good fit and why they might NOT be a good fit (or potential gaps/challenges). Also identify skill gaps and suggest specific Singapore-aligned courses / SkillsFuture certifications to bridge the gaps.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            matchScore: {
              type: Type.INTEGER,
              description: "Match score percentage from 0 to 100",
            },
            matchHeadline: {
              type: Type.STRING,
              description: "Short highlight like 'Strong Domain Match' or 'Direct Fit with Core Competencies'",
            },
            goodFitReasons: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 to 4 specific bullet points explaining why the candidate is a strong fit",
            },
            notGoodFitReasons: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "2 to 3 specific points explaining why it may not be an immediate 100% fit or challenges to prepare for",
            },
            matchedSkills: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Skills the candidate has that match the job",
            },
            skillGaps: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  skill: { type: Type.STRING },
                  priority: { type: Type.STRING, description: "Critical, Moderate, or Nice-to-have" },
                  recommendedCourse: { type: Type.STRING },
                  institution: { type: Type.STRING },
                  subsidy: { type: Type.STRING, description: "e.g. 'SkillsFuture 90% Subsidised' or 'SSG Funded'" },
                  duration: { type: Type.STRING },
                },
                required: ["skill", "priority", "recommendedCourse", "institution", "subsidy"],
              },
            },
            interviewPrepAdvice: {
              type: Type.STRING,
              description: "Practical advice for the candidate to ace the interview for this specific role",
            },
          },
          required: [
            "matchScore",
            "matchHeadline",
            "goodFitReasons",
            "notGoodFitReasons",
            "matchedSkills",
            "skillGaps",
            "interviewPrepAdvice",
          ],
        },
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error) {
    console.error("AI Analysis error, using fallback:", error);
    res.json(generateFallbackFitAnalysis(req.body.candidate, req.body.job));
  }
});

// Parse CV text or LinkedIn URL
app.post("/api/parse-cv", async (req, res) => {
  try {
    const { rawText, linkedInUrl } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        name: "May Tan",
        headline: "Senior UX/Product Designer & Fintech Specialist",
        experienceYears: 5,
        skills: ["Figma", "Design Systems", "User Research", "Interactive Prototyping", "Design Strategy", "Accessibility"],
        education: "B.Sc. in Interaction Design & Polytechnic Diploma in IT",
        parsedFrom: linkedInUrl ? "LinkedIn Profile" : "Uploaded Resume Document",
      });
    }

    const prompt = `Parse this resume content or LinkedIn profile reference into structured candidate information:
Input content:
${rawText ? rawText.substring(0, 3000) : "LinkedIn Profile: " + (linkedInUrl || "https://linkedin.com/in/maytan-ux")}

Extract name, current role/headline, total experience years, key technical and domain skills, education, and target industries.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            headline: { type: Type.STRING },
            experienceYears: { type: Type.INTEGER },
            skills: { type: Type.ARRAY, items: { type: Type.STRING } },
            education: { type: Type.STRING },
            summary: { type: Type.STRING },
          },
          required: ["name", "headline", "experienceYears", "skills", "education", "summary"],
        },
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (err) {
    console.error("Error parsing CV:", err);
    res.json({
      name: "May Tan",
      headline: "Senior UX/Product Designer & Fintech Specialist",
      experienceYears: 5,
      skills: ["Figma", "Design Systems", "User Research", "Interactive Prototyping", "Design Strategy", "Accessibility"],
      education: "B.Sc. in Interaction Design & Polytechnic Diploma in IT",
      summary: "Experienced product designer specialized in high-trust digital services, design systems, and inclusive public portals.",
    });
  }
});

// Mock Interview Simulation Endpoint
app.post("/api/mock-interview", async (req, res) => {
  try {
    const { jobTitle, company, userResponse, questionIndex } = req.body;
    const ai = getGeminiClient();

    if (!ai || !userResponse) {
      return res.json({
        score: 86,
        starEvaluation: {
          situation: "Strong contextual setup detailing project stakes and regulatory constraints.",
          task: "Clear assignment of design system responsibilities across 4 agency squads.",
          action: "Excellent demonstration of rapid prototyping and accessibility audits.",
          result: "Solid measurable outcome (+34% user completion rate).",
        },
        feedback: "Great structured answer. To score in the 95th percentile with Singapore hiring panels, mention alignment with the Singapore Government Design System (SGDS) guidelines explicitly.",
      });
    }

    const prompt = `You are an executive interviewer for ${company} interviewing a candidate for the position of ${jobTitle}.
Evaluate this candidate's response to an interview question:
Candidate Response: "${userResponse}"

Evaluate using the STAR methodology (Situation, Task, Action, Result) and Singapore tech hiring standards. Provide constructive coaching feedback.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER, description: "Score out of 100" },
            feedback: { type: Type.STRING },
            starEvaluation: {
              type: Type.OBJECT,
              properties: {
                situation: { type: Type.STRING },
                task: { type: Type.STRING },
                action: { type: Type.STRING },
                result: { type: Type.STRING },
              },
              required: ["situation", "task", "action", "result"],
            },
            suggestedImprovement: { type: Type.STRING },
          },
          required: ["score", "feedback", "starEvaluation", "suggestedImprovement"],
        },
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (err) {
    console.error("Interview feedback error:", err);
    res.json({
      score: 85,
      feedback: "Strong response demonstrating hands-on ownership and cross-functional leadership.",
      starEvaluation: {
        situation: "Well defined scope and stakeholder landscape.",
        task: "Objective was clear and aligned to business KPIs.",
        action: "Methodical execution of UX testing and wireframing.",
        result: "Positive tangible outcome delivered on schedule.",
      },
      suggestedImprovement: "Quantify the reduction in friction or adoption metrics to reinforce business value.",
    });
  }
});

// Fallback generator when Gemini key is offline or not set
function generateFallbackFitAnalysis(candidate: any, job: any) {
  const candidateSkills = (candidate?.skills || ["Figma", "Design Systems", "User Research", "Prototyping"]).map((s: string) => s.toLowerCase());
  const jobSkills = (job.requiredSkills || ["Figma", "Design Systems", "Accessibility"]).map((s: string) => s.toLowerCase());

  const matched = jobSkills.filter((s: string) =>
    candidateSkills.some((cs: string) => cs.includes(s) || s.includes(cs))
  );

  const score = Math.min(98, Math.max(68, Math.round((matched.length / Math.max(1, jobSkills.length)) * 40 + 55)));

  return {
    matchScore: score,
    matchHeadline: score > 85 ? "Direct Fit with Core Competencies" : "Strong Potential with Fast-Track Upskilling",
    goodFitReasons: [
      `High overlap in foundational toolkit: verified proficiency in ${(job.requiredSkills || ["Figma", "Design Systems"]).slice(0, 2).join(" & ")}.`,
      `Past track record in ${job.industry || "digital platforms"} provides immediate operational readiness without long onboarding lag.`,
      `Academic and vocational background directly maps to Singapore Fair Consideration Framework requirements.`,
    ],
    notGoodFitReasons: [
      `Job emphasizes strict enterprise compliance (${job.skillGapSample || "WCAG 2.1 AAA Accessibility or Cloud Scalability"}) which is not deeply detailed in current CV highlights.`,
      `May face initial learning curve regarding proprietary internal design pipelines or agency approval matrices.`,
    ],
    matchedSkills: job.requiredSkills ? job.requiredSkills.slice(0, 4) : ["Figma", "Design Systems", "User Research"],
    skillGaps: [
      {
        skill: job.skillGapSample || "Web Content Accessibility Guidelines (WCAG 2.1 AAA)",
        priority: "Critical",
        recommendedCourse: "Professional Certificate in Inclusive Design & Universal Digital Accessibility",
        institution: "Singapore Polytechnic Academy",
        subsidy: "SkillsFuture Funded Course (90% Subsidy)",
        duration: "3-Day Masterclass",
      },
      {
        skill: "Design Tokens & Distributed Micro-Frontend Architecture",
        priority: "Moderate",
        recommendedCourse: "Modern Enterprise Component Systems & React-Ready Figma Architectures",
        institution: "Institute of Systems Science (NUS-ISS)",
        subsidy: "SSG 70% Subsidy (Claimable with SkillsFuture)",
        duration: "2 Weeks (Evening)",
      },
    ],
    interviewPrepAdvice: `Prepare to discuss rationale behind abandoned design alternatives. Singapore public & financial institutions focus heavily on trade-off considerations and inclusive user testing rather than purely visual aesthetics.`,
  };
}

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`TalentTrust server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

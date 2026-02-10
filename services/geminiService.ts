
import { GoogleGenAI, Type } from "@google/genai";
import { ResumeAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const ANALYSIS_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    score: { type: Type.NUMBER, description: "Overall resume score out of 100" },
    summary: { type: Type.STRING, description: "Professional summary of the profile" },
    strengths: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Key strengths found" },
    weaknesses: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Areas for improvement" },
    skills: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          level: { type: Type.STRING, enum: ['Beginner', 'Intermediate', 'Advanced'] }
        },
        required: ["name", "level"]
      }
    },
    improvements: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          category: { type: Type.STRING },
          suggestion: { type: Type.STRING }
        },
        required: ["category", "suggestion"]
      }
    },
    suggestedJobs: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          matchPercentage: { type: Type.NUMBER },
          why: { type: Type.STRING }
        },
        required: ["title", "matchPercentage", "why"]
      }
    }
  },
  required: ["score", "summary", "strengths", "weaknesses", "skills", "improvements", "suggestedJobs"]
};

export async function analyzeResume(content: string | { base64: string, mimeType: string }): Promise<ResumeAnalysis> {
  const model = "gemini-3-flash-preview";
  
  const prompt = `You are a world-class career coach and HR expert specializing in fresher resumes. 
  Analyze the provided resume content. Be critical but constructive.
  1. Evaluate the skills mentioned.
  2. Identify specific improvements for freshers (e.g., project descriptions, action verbs, layout).
  3. Match the profile to modern job roles suitable for freshers.
  4. Provide a score from 0-100.`;

  let parts: any[] = [{ text: prompt }];
  
  if (typeof content === 'string') {
    parts.push({ text: content });
  } else {
    parts.push({
      inlineData: {
        data: content.base64,
        mimeType: content.mimeType
      }
    });
  }

  const response = await ai.models.generateContent({
    model,
    contents: { parts },
    config: {
      responseMimeType: "application/json",
      responseSchema: ANALYSIS_SCHEMA,
    }
  });

  const text = response.text;
  if (!text) throw new Error("Empty response from AI");
  
  return JSON.parse(text) as ResumeAnalysis;
}

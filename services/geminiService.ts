
import { GoogleGenAI } from "@google/genai";

// Always use the recommended initialization pattern and obtain API key directly from environment variables.
// API key is optional for demo purposes
const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateDebateOpening = async (topic: string, config?: { difficulty?: string, userRole?: string }): Promise<string> => {
  try {
    // Check if AI is available
    if (!ai) {
      return "AI opponent is currently unavailable. Please configure API key to enable AI debates.";
    }

    // For general text tasks, gemini-3-flash-preview is the recommended model.
    const model = 'gemini-3-flash-preview';
    // If user is Pro, AI is Con (Against). If user is Con, AI is Pro (For).
    // Default to 'AGAINST' if not specified.
    const aiStance = config?.userRole === 'Pro' ? 'AGAINST' : 'FOR';
    const difficulty = config?.difficulty || 'medium';
    
    const prompt = `You are an expert debater in a ${difficulty} difficulty match. Generate a short, provocative, and intelligent opening statement (max 60 words) arguing ${aiStance} the following topic: "${topic}". The tone should be professional yet challenging.`;
    
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    // Directly access the .text property of GenerateContentResponse.
    return response.text || "I'm ready to debate whenever you are.";
  } catch (error) {
    console.error("Error generating debate opening:", error);
    return "Could not connect to the debate engine. Please check your connection.";
  }
};

export const generateInterviewQuestion = async (jobRole: string): Promise<string> => {
  try {
    // Check if AI is available
    if (!ai) {
      return "AI interviewer is currently unavailable. Please configure API key to enable AI interviews.";
    }

    // For general text tasks, gemini-3-flash-preview is the recommended model.
    const model = 'gemini-3-flash-preview';
    const prompt = `You are a strict hiring manager. Generate one difficult behavioral interview question for a candidate applying for a "${jobRole}" position. Keep it concise (max 40 words).`;
    
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    // Directly access the .text property of GenerateContentResponse.
    return response.text || "Tell me about yourself.";
  } catch (error) {
    console.error("Error generating interview question:", error);
    return "Could not connect to the interview engine. Please check your connection.";
  }
};

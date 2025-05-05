import { GoogleGenAI } from "@google/genai";

// Initialize Gemini API with your API key
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API });

export async function getGeminiResponse(prompt, model = "gemini-2.0-flash") {
  try {
    const result = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    console.log(result.text);
    const text = result.text;
    // const response = await result.response;
    // const text = await response.text();
    return text;
  } 
  
  catch (err) {
    console.error("Gemini API Error:", err);
    return "Something went wrong while fetching the response.";
  }
}

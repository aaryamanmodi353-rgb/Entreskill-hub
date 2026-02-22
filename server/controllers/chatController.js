import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const chatWithAI = async (req, res) => {
  const { message } = req.body;

  try {
    // --- FIX: Use a valid model from your list ---
    // 'gemini-2.5-flash' is the best balance of speed and intelligence
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      You are an expert Startup Consultant for the 'EntreSkill Hub' platform. 
      Your goal is to help students with entrepreneurship, coding (MERN stack), marketing, and business strategy.
      Keep answers concise, encouraging, and professional.
      
      Student Question: ${message}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ 
        reply: "I'm having trouble connecting to the brain server right now.",
        details: error.message 
    });
  }
};
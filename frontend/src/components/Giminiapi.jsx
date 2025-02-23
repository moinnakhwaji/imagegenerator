import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const PromptGenerator = async () => {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [{ role: "user", parts: [{ text: "Generate a random image prompt for me" }] }],
    });

    const result = await chatSession.sendMessage("Give me a random image prompt");
    return result.response.text(); // Return the generated text
  } catch (error) {
    console.error("Error generating prompt:", error);
    return "Failed to generate prompt. Try again!";
  }
};

export default PromptGenerator;

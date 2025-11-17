
import { GoogleGenAI, Type } from "@google/genai";
import { OutputType } from '../types';

if (!process.env.API_KEY) {
    // This is a placeholder for environments where the key is not set.
    // In a real deployed environment, the key should be securely provided.
    console.warn("API_KEY environment variable not set. Using a placeholder.");
    process.env.API_KEY = "YOUR_API_KEY"; 
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getPrompt = (inputText: string, outputType: OutputType): string => {
    const commonInstruction = `You are an expert project manager and assistant for a high-end web development agency. Your audience is professional frontend developers. Analyze the following meeting notes/project description and generate the requested document. The output must be well-structured, clear, and concise. Format the entire response in Markdown.`;

    switch (outputType) {
        case OutputType.Budget:
            return `${commonInstruction}\n\nGenerate a detailed budget breakdown. Structure it by phase (e.g., Discovery, Design, Development, Deployment) and include estimated hours or cost ranges. Use a Markdown table for clarity.\n\nInput:\n\`\`\`\n${inputText}\n\`\`\``;
        case OutputType.Milestones:
            return `${commonInstruction}\n\nDefine the key project milestones with estimated timelines. Present it as a clear, ordered list in Markdown.\n\nInput:\n\`\`\`\n${inputText}\n\`\`\``;
        case OutputType.UserStories:
            return `${commonInstruction}\n\nFormulate user stories based on the input. Use the format 'As a [user type], I want [goal] so that [benefit]'. Group them by feature or epic using Markdown headings.\n\nInput:\n\`\`\`\n${inputText}\n\`\`\``;
        case OutputType.Summary:
        default:
            return `${commonInstruction}\n\nProvide a concise summary of the key decisions, action items, and next steps. Use Markdown lists and bold text to highlight important information.\n\nInput:\n\`\`\`\n${inputText}\n\`\`\``;
    }
};

export const generateDocument = async (
    inputText: string,
    outputType: OutputType,
    useFastModel: boolean
): Promise<string> => {
    const model = useFastModel ? 'gemini-2.5-flash-lite' : 'gemini-2.5-flash';
    const prompt = getPrompt(inputText, outputType);

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to generate content from AI. Check your API key and network connection.");
    }
};


import { GoogleGenAI, Type } from "@google/genai";
import { RiskLevel } from "./types";

// Always use the named parameter and direct process.env.API_KEY for initialization.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getRiskAssessment = async (customerData: any): Promise<{ risk: RiskLevel, justification: string }> => {
  try {
    const response = await ai.models.generateContent({
      // Use gemini-3-pro-preview for complex reasoning tasks like financial risk analysis.
      model: 'gemini-3-pro-preview',
      contents: `Analyze the following customer data for MFI Business Loan onboarding and assign a risk rating (LOW, MEDIUM, HIGH) based on RBI AML/KYC guidelines. 
      Data: ${JSON.stringify(customerData)}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            risk: { type: Type.STRING, description: "Risk level: LOW, MEDIUM, or HIGH" },
            justification: { type: Type.STRING, description: "Detailed reasoning for the risk rating" }
          },
          required: ["risk", "justification"]
        }
      }
    });

    // Access the .text property directly from the response.
    const result = JSON.parse(response.text.trim());
    return {
      risk: result.risk as RiskLevel,
      justification: result.justification
    };
  } catch (error) {
    console.error("Gemini assessment failed:", error);
    return { risk: RiskLevel.MEDIUM, justification: "Defaulting to medium risk due to assessment error." };
  }
};

export const generateKFS = async (loanDetails: any) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a Key Fact Statement (KFS) content for an RBI-compliant MFI business loan based on these details: ${JSON.stringify(loanDetails)}. Include APR, cooling-off period, and grievance redressal info.`,
    });
    // Access the .text property directly from the response.
    return response.text;
  } catch (error) {
    console.error("KFS generation failed:", error);
    return "Error generating KFS details. Please try again.";
  }
};


import { GoogleGenAI } from "@google/genai";

// Fix: Initialize GoogleGenAI using the exact structure required by the guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateCampaignDescription = async (title: string, type: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a compelling, culturally appropriate fundraising campaign description for a ${type} titled "${title}" in East Africa. Focus on community spirit and urgency.`
    });
    // Fix: Access the text property directly on the response object as per the SDK documentation
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Failed to generate AI description. Please write manually.";
  }
};

export const generateReminderMessage = async (name: string, amount: number, campaignTitle: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a polite, persuasive WhatsApp reminder message for ${name} who pledged UGX ${amount.toLocaleString()} to the "${campaignTitle}" campaign. Keep it friendly but firm.`
    });
    // Fix: Access the text property directly on the response object
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return `Hello ${name}, this is a reminder for your UGX ${amount.toLocaleString()} pledge for ${campaignTitle}. Tap to pay now.`;
  }
};

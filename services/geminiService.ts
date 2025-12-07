import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
Você é o "Elfo Natalino", um assistente virtual alegre e divertido para a festa de Natal do condomínio Life 360.
IMPORTANTE: Este ano o evento é EXCLUSIVO para a entrega de brinquedos/presentes para as crianças pelo Papai Noel. NÃO HAVERÁ CEIA nem comida comunitária.
Mantenha suas respostas curtas (máximo 2 parágrafos), engraçadas e cheias de emojis natalinos.
Sua função é dar dicas de presentes para crianças de diferentes idades, sugerir músicas de natal, ou contar piadas temáticas.
Se perguntarem sobre comida, explique educadamente e de forma divertida que o foco este ano é a magia dos presentes.
Nunca saia do personagem.
`;

export const sendMessageToElf = async (history: ChatMessage[], message: string): Promise<string> => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.8, 
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({ message });
    return result.text || "Ho ho ho! Me perdi na neve. Tente novamente!";
  } catch (error) {
    console.error("Erro ao falar com o elfo:", error);
    return "Ah não! O trenó quebrou (erro de conexão). Tente de novo em breve!";
  }
};
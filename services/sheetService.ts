import { RsvpData } from "../types";

// ⚠️ ATENÇÃO: Substitua a URL abaixo pela URL do seu Google Apps Script Web App implantado
// Siga as instruções fornecidas para gerar essa URL na sua planilha.
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwXdc3hMdXz7NN4m0r7pvRyBB5sauYPy1-hq9UfFxZwq36IsYIHs-GfLhoh30EQ0OaBDQ/exec';

export const submitToSheet = async (data: RsvpData): Promise<void> => {
  if (GOOGLE_SCRIPT_URL.includes('INSERT_YOUR')) {
    console.warn("Integração com Planilha: URL do Script não configurada.");
    console.log("Dados que seriam enviados:", data);
    // Simulando delay de rede para experiência do usuário
    await new Promise(resolve => setTimeout(resolve, 1500));
    return;
  }

  try {
    // Usamos mode: 'no-cors' porque o Google Apps Script não suporta CORS padrão facilmente para POSTs simples
    // Isso significa que não saberemos se deu erro no servidor, mas o envio é realizado.
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Erro ao enviar para planilha:", error);
    throw error;
  }
};

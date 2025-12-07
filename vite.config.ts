import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Carrega variáveis de ambiente baseadas no modo atual (development/production)
  // O prefixo '' permite carregar todas, mas filtramos o uso abaixo por segurança ou usamos VITE_
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [react()],
    define: {
      // Define process.env.API_KEY globalmente no código do navegador
      // Pegando o valor de VITE_API_KEY que você configurou na Vercel
      'process.env.API_KEY': JSON.stringify(process.env.VITE_API_KEY || env.VITE_API_KEY)
    }
  }
})
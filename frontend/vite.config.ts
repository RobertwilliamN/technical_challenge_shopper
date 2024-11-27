import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 80, 
    host: "0.0.0.0", // Escuta em todas as interfaces de rede
    hmr: {
      overlay: false, // Desativa a sobreposição de erro no navegador
    },
  },
});


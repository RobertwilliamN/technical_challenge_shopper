# Usando uma imagem oficial do Node.js para frontend
FROM node:18-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json e o package-lock.json (se disponível) para o container
COPY package*.json ./

# Instala as dependências do frontend
RUN npm install

# Copia o restante dos arquivos da aplicação
COPY . .

# Faz o build do frontend para produção (opcional)
RUN npm run build

# Expondo a porta 8081 para o frontend
EXPOSE 80

# Comando para rodar o Vite no modo de produção
CMD ["npm", "run", "start"]

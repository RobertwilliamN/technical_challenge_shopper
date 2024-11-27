# Usando uma imagem oficial do Node.js para frontend
FROM node:18-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json e o package-lock.json para o container
COPY package*.json ./

# Remove possíveis resíduos e força a instalação limpa
RUN rm -rf /app/node_modules && \
    npm cache clean --force && \
    npm install

# Copia o restante dos arquivos da aplicação
COPY . .

# Faz o build do frontend para produção
RUN npm run build

# Expondo a porta para o frontend
EXPOSE 80

# Comando para rodar o Vite no modo de produção
CMD ["npm", "run", "start"]

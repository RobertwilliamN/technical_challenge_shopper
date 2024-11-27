# Use a imagem oficial do Node.js
FROM node:18-bullseye

RUN apt-get update && apt-get install -y libc6-dev

# Define o diretório de trabalho 
WORKDIR /app

# Copia o package.json e o package-lock.json 
COPY package*.json ./

# Instala as dependências 
RUN npm install

# Copia os arquivos
COPY . .

# Faz o build do TypeScript
RUN npm run build

# Expondo a porta 8081 para o backend
EXPOSE 8081

# Comando para iniciar o servidor backend
CMD ["node", "dist/index.js"]

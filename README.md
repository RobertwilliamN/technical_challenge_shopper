# TESTE TÉCNICO SHOPPER

Este repositório contém o código de uma aplicação que possui um **frontend** e um **backend**, ambos configurados para serem executados em containers Docker. Abaixo estão as instruções para configurar e subir a aplicação corretamente.

## Requisitos

- **Docker**: Certifique-se de ter o Docker instalado na sua máquina.
- **Chave da API do Google**: Você precisará de uma chave da API do Google para o mapa estático.

## Como Subir a Aplicação

### 1. Clonar o Repositório

Clone o repositório para sua máquina local utilizando o comando:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio

- 2. Criar o Arquivo .env
Na raiz do projeto, crie um arquivo chamado .env e adicione a chave da API do Google para que o frontend consiga gerar os mapas corretamente:

env
Copiar código
GOOGLE_API_KEY=SUA_CHAVE_DA_API

- 3. Subir os Containers com Docker
Após configurar o arquivo .env, você pode subir os containers utilizando o Docker. Execute o comando abaixo:

bash
Copiar código
docker-compose up

- 4. Acessar a Aplicação
Após os containers estarem rodando, você pode acessar a aplicação:

O Frontend estará disponível em http://localhost (porta 80).
O Backend estará disponível em http://localhost:8080 (porta 8080).

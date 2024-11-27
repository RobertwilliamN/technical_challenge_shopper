# TESTE TÉCNICO SHOPPER

Este repositório contém o código de uma aplicação que possui um **frontend** e um **backend**, ambos configurados para serem executados em containers Docker. Abaixo estão as instruções para configurar e subir a aplicação corretamente.

## Requisitos

- **Docker**: Certifique-se de ter o Docker instalado na sua máquina.
- **Chave da API do Google**: Você precisará de uma chave da API do Google para o mapa estático.

## Como Subir a Aplicação

### 1. Clonar o Repositório

Clone o repositório para sua máquina local utilizando o comando:
'git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/RobertwilliamN/technical_challenge_shopper.git)'
'cd technical_challenge_shopper'

- 2. Criar o Arquivo .env 
Na raiz do projeto, crie um arquivo chamado .env e adicione a chave da API do Google para que o frontend consiga gerar os mapas corretamente:

Copiar código
'GOOGLE_API_KEY=SUA_CHAVE_DA_API'

- 3. Subir os Containers com Docker
Após configurar o arquivo .env, você pode subir os containers utilizando o Docker. Execute o comando abaixo:

'docker-compose up'

4. Acessar a Aplicação
Após os containers estarem rodando, você pode acessar a aplicação:

O Frontend estará disponível em http://localhost (porta 80). -> Rotas / and /history
O Backend estará disponível em http://localhost:8080 (porta 8080).

- 5. Demonstração do Funcionamento

Formulário para solicitação de corrida:
![image](https://github.com/user-attachments/assets/dc1ab0e5-af4a-42dd-aeb1-c58298535fbf)


Retorno das opções de motoristas:
![image](https://github.com/user-attachments/assets/f1b1d7b4-1985-46ed-b183-35086e60afae)

Filtros de Busca de Corridas:
![image](https://github.com/user-attachments/assets/0bb0edb4-69ce-4873-ad6d-415542ee002a)








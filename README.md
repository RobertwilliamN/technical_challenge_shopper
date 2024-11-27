# TESTE TÉCNICO SHOPPER

Este repositório contém o código de uma aplicação que possui um **frontend** e um **backend**, ambos configurados para serem executados em containers Docker. Abaixo estão as instruções para configurar e subir a aplicação corretamente.

## Requisitos

- **Docker**: Certifique-se de ter o Docker instalado na sua máquina.
- **Chave da API do Google**: Você precisará de uma chave da API do Google para o calculo de rota e geração do mapa.

## Como Subir a Aplicação

### 1. Clonar o Repositório

Clone o repositório para sua máquina local utilizando o comando: </br>
<br>'git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/RobertwilliamN/technical_challenge_shopper.git)' </br>
<br> 'cd technical_challenge_shopper'</br>

- 2. Criar o Arquivo .env  </br>
<br> Na raiz do projeto, crie um arquivo chamado .env e adicione a chave da API do Google para que o frontend consiga gerar as rotas corretamente: </br>

Copiar código
<br>'GOOGLE_API_KEY=SUA_CHAVE_DA_API' </br>

<br>- 3. Subir os Containers com Docker </br>
<br>Após configurar o arquivo .env, você pode subir os containers utilizando o Docker. Execute o comando abaixo: </br>

<br>'docker-compose up' </br>

4. Acessar a Aplicação
<br>Após os containers estarem rodando, você pode acessar a aplicação:</br>

<br>O Frontend estará disponível em http://localhost (porta 80). -> Rotas / and /history </br>
<br>O Backend estará disponível em http://localhost:8080 (porta 8080). </br>

- 5. Demonstração do Funcionamento

Formulário para solicitação de corrida:
![image](https://github.com/user-attachments/assets/dc1ab0e5-af4a-42dd-aeb1-c58298535fbf)


Retorno das opções de motoristas:
![image](https://github.com/user-attachments/assets/f1b1d7b4-1985-46ed-b183-35086e60afae)

Filtros de Busca de Corridas:
![image](https://github.com/user-attachments/assets/0bb0edb4-69ce-4873-ad6d-415542ee002a)








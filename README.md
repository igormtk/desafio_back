# DESAFIO BACK-END

Neste desafio foi criado uma aplicação básica nos moldes de um microserviço.

Ela apresenta as seguintes funcionalidades para as entidades usuários e pedidos:

- Rotas de listagem, exibição, criação, alteração e exclusão de usuários (CRUD);

Uma tabela de usuários que deverá conter os campos:
- id
- nome
- cpf
- email
- telefone
- created_at
- updated_at

Uma tabela de pedidos que deverá conter os campos:
- id
- usuario_id
- descricao
- quantidade
- preco
- valor
- created_at
- updated_at

- Documentação API:
Acesse o postman aqui 👉 https://documenter.getpostman.com/view/18386394/Uyr4L1JG

## Desenvolvedor

- Igor Eiiji Avelar Matsuoka

## Tecnologias utilizadas: 
- Typescript
- Node.JS
- SQL
- MySQL
- Express
- Cors
- Dotenv
- Knex
- UUID
- json
- jest

## Funcionalidades:
#### Usuários:

#### Pedidos:

## Testes para os 100m:
- Erro ao passar algum input vazio na hora de cadastrar
- Erro ao passar unidade diferente de "s" na hora de cadastrar
- Erro ao tentar cadastrar em uma competição finalizada
- Erro ao cadastrar competidor já que já terminou a competição
- Teste de sucesso ao cadastrar
- Teste ao passar alguma competição inexistente na hora de terminar uma competição
- Teste de sucesso ao finalizar competição
- Teste ao passar alguma competição inexistente na hora pegar o ranking da competição
- Teste de sucesso ao pegar ranking da corrida

## Testes para o arremesso de dardo:
- Erro ao passar algum input vazio na hora de cadastrar
- Erro ao passar unidade diferente de "m" na hora de cadastrar
- Erro ao tentar cadastrar em uma competição finalizada
- Erro ao cadastrar competidor já que realizou os 3 lançamentos
- Teste de sucesso ao cadastrar
- Teste ao passar alguma competição inexistente na hora de terminar uma competição
- Teste de sucesso ao finalizar competição
- Teste ao passar alguma competição inexistente na hora pegar o ranking da competição
- Teste de sucesso ao pegar ranking da corrida
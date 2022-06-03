# DESAFIO BACK-END

Neste desafio foi criado uma aplicação básica nos moldes de um micro serviço.

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
- Crypto

## Funcionalidades:

## Usuários:

#### Criar Usuário
- Pode-se criar um usuário a partir do recebimento das seguintes informações pelo body: nome, cpf, email, telefone.

#### Pegar Usuário
- Pode-se pegar as informações de um usuário através de um "id" passado pelo body, ou simplesmente retorna todos os usuários se o "id" do usuário estiver vazio.

#### Atualizar Usuário
- Pode-se atualizar um usuário através de um id, nome e telefone, onde você deve passar as 3 informações pelo body para serem atualizadas. Caso você queira atualizar apenas uma, deve-se repetir a informação que estava salva (não é possível atualizar o id).

#### Deletar Usuário
- É possível deletar um usuário passando um id pelo body.

## Pedidos:

#### Criar Pedido
- Pode-se criar um pedido a partir do recebimento das seguintes informações: id de um usuário cadastrado, descricao, quantidade, preco pelo body.

#### Pegar Pedido
- Pode-se pegar as informações de um pedido através de um "id" passado pelo body, ou simplesmente retorna todos os pedidos se o "id" for passado vazio.

#### Atualizar Pedido
- Pode-se atualizar um usuário através de um id de usuário, descrição, quantidade, onde você deve passar todas essas informações pelo body para serem atualizadas. Caso você queira atualizar apenas uma, deve-se repetir as informações que estavam salvas (não é possível atualizar o id).

#### Deletar Pedido
- É possível deletar um pedido passando um id pelo body.



## Como usar

Teste o código pelo postman seguindo a documentação:

- Documentação API:
Acesse o postman aqui 👉 https://documenter.getpostman.com/view/18386394/Uz5GobJo

ou pelo seu computador assim: 
- Clone o código para seu computador. 
- Junto dos arquivos clonados crie outro arquivo com nome .env (para acessar seu banco de dados), seu arquivo deve estar da seguinte maneira:

Ex.:

    DB_USER = seu_usuario

    DB_PASSWORD = sua_senha

    DB_HOST = seu_host

    DB_PORT = sua_posrt

    DB_DATABASE_NAME = nome_database

Dentro da pasta clonada, execute no terminal os comandos:
-> npm install (para instalar as dependencias).

-> npm migrations (para criar a polular tabela).

-> npm run test (para rodar os tests dos enpoints).

-> npm run dev ou npm run start (para rodar o servidor e utilizar os endpoints).

Utilize o postman trocando o link pelo seu localhost mantendo os endpoints, seguindo documentação do postman.

- DEPLOY no HEROKU: https://desafio-back-igor.herokuapp.com

Exemplo:

de: https://desafio-back-igor.herokuapp.com/

para: http://localhost:3003/
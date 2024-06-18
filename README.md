
# API TypeScript e Knex

Nesta API feita para servir a um aplicação Front-End Web/Mobile chamada Daily Diet(Rocketseat).
Nesta aplicação, podemos cadastrar um usuário e com ele cadastrado, é possível cadastrar as refeições feitas pelo mesmo. Junto com informações, como:
    - Nome
    - Descrição
    - Data e Hora
    - Se está dentro da dieta

Além de conseguir ver uma única refeição cadastrada, como também, atualizar ou deletar.
O usuário também consegue visualizar suas métricas, ele recebe informações, como:
    - Quantidade total de refeições registradas
    - Quantidade total de refeições dentro da dieta
    - Quantidade total de refeições fora da dieta
    - Sequência de refeições dentro da dieta

O usuário só pode alterar, remover ou listar as refeições que foram cadastradas por ele. Cada usuário ao ser cadastrado, possui um Cookie, que o identifica em cada requisição. Sendo assim, o usuário só consegue listar ou fazer algum tipo de alteração, nas refeições por ele cadastradas.
Um usuário sem Cookie, não consegue realizar nenhuma ação na aplicação.

Esta aplicação possui testes automatizados. Por sua fácil integração com TypeScript, utilizei o Vitest como ferramenta de testes. Além de utilizar o Supertest, para simular requisições HTTP.

## Regras da aplicação

- Deve ser possível criar um usuário
- Deve ser possível identificar o usuário entre as requisições
- Deve ser possível registrar uma refeição feita, com as seguintes informações:
    *As refeições devem ser relacionadas a um usuário.*
    - Nome
    - Descrição
    - Data e Hora
    - Está dentro ou não da dieta
- Deve ser possível editar uma refeição, podendo alterar todos os dados acima
- Deve ser possível apagar uma refeição
- Deve ser possível listar todas as refeições de um usuário
- Deve ser possível visualizar uma única refeição
- Deve ser possível recuperar as métricas de um usuário
    - Quantidade total de refeições registradas
    - Quantidade total de refeições dentro da dieta
    - Quantidade total de refeições fora da dieta
    - Melhor sequência de refeições dentro da dieta
- O usuário só pode visualizar, editar e apagar as refeições o qual ele criou

## Stack utilizada

**Back-end:** TypeScript, Fastify, SQLite, Knex, Zod, Vitest, Supertest. 


## Funcionalidades

- Cadastro de usuário;
- Consulta de todas os usuários cadastrados;
- Consulta de informações de um único usuário cadastrados;
- Cadastro de refeição;
- Consulta de todas as refeições de um usuário;
- Consulta de uma refeição específica de um usuário;
- Atualização de uma refeição;
- Remoção de uma refeição;
- Consulta de métrica.

## Documentação da API

#### Cadastro de Usuário

```http
  POST /users
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
|  | `string` | **Obrigatório**. Cadastra um usuário no banco de dados. |

#### Leitura de todos os Usuários cadastrados no Banco de Dados

```http
  GET /all-users
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
|       | `string` | **Obrigatório**. Retorna todos os usuáros cadastrados no banco. |

#### Leitura de Usuário específico

```http
  GET /users
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
|      | `string` | **Obrigatório**. Retorna as informações do usuário. |

#### Cadastro de Refeição

```http
  POST /meals
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
|     | `string` | **Obrigatório**. Cadastra uma refeição no Banco de Dados. |

#### Consulta de todas as Refeições

```http
  GET /meals
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
|     | `string` | **Obrigatório**. Retorna todas as refeições de um usuário. |

#### Consulta de uma única Refeição

```http
  GET /meals/:id
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
|   `ID`  | `string` | **Obrigatório**. Retorna uma determinada refeição. |

#### Atualização de uma Refeição

```http
  PATCH /meals/:id
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
|   `ID`   | `string` | **Obrigatório**. Permite ao usuário atualizar alguma informação da refeição. |

#### Remoção de Refeição

```http
  DELETE /task/:id
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
|   `ID`   | `string` | **Obrigatório**. Remove uma determinada refeição. |

#### Consulta de Métricas

```http
  GET /meals/metrics
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
|      | `string` | **Obrigatório**. Retornar ao usuário as suas métricas. |

## Aprendizados

Neste projeto, pude colocar a mão na massa com o Knex, é a primeira vez que utilizo um Query Builder. Ele se assemelha um pouco com uma ORM, mas não deixa de facilitar o desenvolvimento, quando envolve banco relacional.

Pude praticar testes E2E também, foi a primeira vez que fiz testes E2E sozinho. Simular requisições HTTP foi o que mais me chamou atenção.

## Instalação

Instale a aplicação com npm ou yarn

```bash
  git clone git@github.com:Cr-Israel/api-fatify-knex.git
  npm/yarn install
  npm run dev || yarn dev
```
    
## Licença

[MIT](https://choosealicense.com/licenses/mit/)


## Autores

- [@Cr-Israel](https://www.github.com/Cr-Israel)


## Feedback

Feedbacks são sempre bem-vindos.
Se você tiver algum feedback, por favor me deixe saber: carlosisrael08@hotmail.com
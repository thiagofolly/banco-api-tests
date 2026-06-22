# banco-api-tests

Projeto de automacao de testes de API REST para validar os endpoints do projeto [banco-api](https://github.com/thiagofolly/banco-api).

Os testes foram desenvolvidos em JavaScript com Mocha, Supertest e Chai. O projeto tambem utiliza `dotenv` para configuracao de ambiente e Mochawesome para geracao de relatorios HTML.

## Objetivo

Este repositorio tem como objetivo apoiar a validacao automatizada da API `banco-api`, garantindo que fluxos importantes respondam conforme o esperado.

Atualmente, os testes cobrem:

- Login com credenciais validas.
- Criacao de transferencia com valor valido.
- Validacao de transferencia com valor abaixo do minimo permitido.
- Consulta de transferencia por ID.
- Listagem paginada de transferencias.

## Stack utilizada

- JavaScript
- Node.js
- npm
- Mocha
- Supertest
- Chai
- dotenv
- Mochawesome

## Estrutura do projeto

```text
banco-api-tests/
|-- fixtures/
|   |-- postLogin.json
|   `-- postTransferencias.json
|-- helpers/
|   `-- autenticacao.js
|-- test/
|   |-- login.test.js
|   `-- transferencia.test.js
|-- .gitignore
|-- package.json
|-- package-lock.json
`-- README.md
```

### Principais diretorios e arquivos

| Caminho | Descricao |
| --- | --- |
| `fixtures/` | Armazena massas de dados usadas nas requisicoes dos testes. |
| `fixtures/postLogin.json` | Modelo do corpo da requisicao de login. |
| `fixtures/postTransferencias.json` | Modelo do corpo da requisicao de transferencia. |
| `helpers/` | Armazena funcoes auxiliares reutilizadas pelos testes. |
| `helpers/autenticacao.js` | Realiza login e retorna o token de autenticacao. |
| `test/` | Armazena os arquivos de teste automatizado. |
| `test/login.test.js` | Testes do endpoint `POST /login`. |
| `test/transferencia.test.js` | Testes dos endpoints de transferencias. |
| `.env` | Arquivo local de variaveis de ambiente. Deve ser criado pelo usuario e nao deve ser versionado. |
| `package.json` | Define dependencias, metadados e scripts do projeto. |
| `mochawesome-report/` | Diretorio gerado apos a execucao dos testes com o relatorio HTML. |

## Pre-requisitos

Antes de executar os testes, verifique se voce possui:

- Node.js instalado.
- npm instalado.
- API do projeto [banco-api](https://github.com/thiagofolly/banco-api) em execucao.
- Banco de dados da API preparado com os dados esperados pelos testes.
- Variavel `BASE_URL` configurada no arquivo `.env`.

## Instalacao

Clone o repositorio e instale as dependencias:

```bash
git clone https://github.com/thiagofolly/banco-api-tests.git
cd banco-api-tests
npm install
```

## Configuracao

Crie um arquivo chamado `.env` na raiz do projeto:

```env
BASE_URL=http://localhost:3000
```

A variavel `BASE_URL` deve apontar para a URL base onde a API `banco-api` esta em execucao.

Exemplos:

```env
BASE_URL=http://localhost:3000
```

```env
BASE_URL=https://sua-api-homologacao.com
```

O arquivo `.env` esta listado no `.gitignore` e nao deve ser enviado para o repositorio.

## Execucao dos testes

Para executar todos os testes automatizados:

```bash
npm test
```

Esse comando executa o script configurado no `package.json`:

```bash
mocha ./test/**/*.test.js --timeout 200000 --reporter mochawesome
```

O Mocha executa todos os arquivos dentro do diretorio `test/` que terminam com `.test.js`.

## Cenarios automatizados

| Arquivo | Endpoint | Validacao principal |
| --- | --- | --- |
| `test/login.test.js` | `POST /login` | Deve retornar status `200` e token em formato string para credenciais validas. |
| `test/transferencia.test.js` | `POST /transferencias` | Deve retornar status `201` para transferencia com valor maior ou igual a `10`. |
| `test/transferencia.test.js` | `POST /transferencias` | Deve retornar status `422` para transferencia com valor menor que `10`. |
| `test/transferencia.test.js` | `GET /transferencias/1` | Deve retornar status `200` e os dados esperados da transferencia. |
| `test/transferencia.test.js` | `GET /transferencias?page=1&limit=10` | Deve retornar status `200`, limite `10` e lista com `10` transferencias. |

## Autenticacao nos testes

Os testes de transferencia precisam de token JWT.

O helper `helpers/autenticacao.js` centraliza o login na API usando o endpoint `POST /login` e retorna o token para ser enviado no header:

```http
Authorization: Bearer <token>
```

As credenciais usadas atualmente nos testes sao:

```text
usuario: julio.lima
senha: 123456
```

Essas credenciais precisam existir na base de dados usada pela API durante a execucao dos testes.

## Relatorios de teste

O projeto utiliza o reporter `mochawesome` para gerar relatorios da execucao dos testes.

Apos executar:

```bash
npm test
```

sera criado o diretorio:

```text
mochawesome-report/
```

O relatorio HTML fica disponivel em:

```text
mochawesome-report/mochawesome.html
```

Esse diretorio tambem esta listado no `.gitignore`, pois e um artefato gerado durante a execucao dos testes.

## Dependencias

| Dependencia | Uso |
| --- | --- |
| `mocha` | Framework de execucao dos testes. |
| `supertest` | Cliente HTTP usado para chamar a API nos testes. |
| `chai` | Biblioteca de assercoes. |
| `dotenv` | Carregamento de variaveis de ambiente a partir do arquivo `.env`. |
| `mochawesome` | Geracao de relatorio HTML da execucao dos testes. |

## Repositorios relacionados

- Projeto de testes: [banco-api-tests](https://github.com/thiagofolly/banco-api-tests)
- API testada: [banco-api](https://github.com/thiagofolly/banco-api)

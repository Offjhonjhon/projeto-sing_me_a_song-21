# <p align = "center"> Projeto Sing me a song</p>

<p align="center">
   <img src="https://user-images.githubusercontent.com/72531277/178094665-f46c6a55-c821-42a0-bb9c-d5dd5f2d69fa.png"/>
</p>

<p align = "center">
   <img src="https://img.shields.io/badge/author-João Araujp-4dae71?style=flat-square" />
   <img src="https://img.shields.io/github/languages/count/SEU_NOME/NOME_DO_PROJETO?color=4dae71&style=flat-square" />
</p>


##  :clipboard: Descrição
Aplicação para disponibilização de videos do you tube.


***

## :computer:	 Tecnologias e Conceitos

- REST APIs
- Node.js
- TypeScript
- SQL with postegres and prisma

***

## :rocket: Rotas

```yml
POST /recommendations
    - Rota para adicionar uma nova recomendação
    - headers: {}
    - body:{
        "name": "Link Park - In the end",
        "youtubeLink": "https://www.youtube.com/watch?v=eVTXPUF4Oz4"
}
```
    
```yml 
POST /recommendations/:id/upvote
    - Rota para aumentar em um os votos da recomendação
    - headers: {}
    - body: {}
```
    
```yml 
POST /recommendations/:id/downvote
    - Rota para diminuir em 1 os votos da recomendação
    - headers: {}
    - body: {}
```

```yml
GET /recommendations
    - Rota para listar as ultimas 10 recomendações
    - headers: {}
    - body: {}
``` 

```yml
GET /recommendations/:id
    - Rota para listar a recomendação
    - headers: {}
    - body: {}
```
 
```yml
DELETE /recommendations/random
    - Rota para listar uma recomendação aleatoria
    - headers: {}
    - body: {}
```

```yml
GET /recommendations/top/:amount
    - Rota para listar as top amount recomendações
    - headers: {}
    - body: {}
```
***

## 🏁 Rodando a aplicação do back-end

Este projeto foi inicializado com o [Create React App](https://github.com/facebook/create-react-app), então certifique-se que voce tem a ultima versão estável do [Node.js](https://nodejs.org/en/download/) e [npm](https://www.npmjs.com/) rodando localmente.

Primeiro, faça o clone desse repositório na sua maquina:

```
git clone https://github.com/Offjhonjhon/projeto-sing_me_a_song-21.git
```

Para acessar o arquivo do back-end
```
cd back-end
```
E então instalar as dependências
```
npm install
```
Finalizado o processo, é só inicializar o servidor
```
npm run dev
```
Para realizar os testes unitarios rode o comando
```
npm run test:unit
```
Para realizar os testes integrados rode o comando
```
npm run test
```

## 🏁 Rodando a aplicação do front-end

Para acessar o arquivo do front-end
```
cd front-end
```
E então instalar as dependências
```
npm install
```
Finalizado o processo, é só inicializar a aplicação
```
npm start
```
Para realizar os testes e2e do cypress, com o servidor do back e o do front levantados, rode o comando
```
npx cypress open
```


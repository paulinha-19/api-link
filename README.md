<h1>API gerenciar links</h1>

Descrição do projeto
=================
<p>O projeto trata-se de um sistema para salvar, editar, listar e deletar links de artigos.</p>

Status do projeto
=================
<h4 align="center"> 
    :construction:  Projeto em construção  :construction:
</h4>

# :hammer: Funcionalidades do projeto
- [x] API para gerenciar links, com a URL e um título. Os links também podem ser editados e excluídos.
- [x] Interface para que um usuário possa ver e gerenciar os links manualmente. 
- [ ] Automatização do processo de salvar links com um web crawler que importe artigos dos blogs favoritos, como a devGo.

Pré-requisitos e como rodar a aplicação
=================

### 🎲 Back-end
```bash
$ git clone <https://github.com/paulinha-19/api-link.git>

### Acesse a pasta do projeto no terminal/cmd
$ cd api-link

### Vá para a pasta server
$ cd api

### Instale node_modules
$ npm install

### Execute a aplicação
$ npm node index.js

### O servidor inciará na porta:4000 - acesse <http://localhost:4000/api/links/>
```
OBS: Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas: [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), [MySql](https://dev.mysql.com/downloads/windows/installer/8.0.html). Nesse projeto utilizei o [VSCode](https://code.visualstudio.com/) para editar o código.
Após instalar o MySql você deve criar um banco de dados e criar um arquivo .env na raiz do pasta /api para armazenar os dados passados para o arquivo db.js. Segue abaixo modelo do .env:

```
DB_NAME=//nome do banco de dados
DB_USER=root
DB_PASSWORD=//senha do banco
DB_HOST=localhost
```

### Front-end
```bash
### Acesse a pasta do projeto no terminal/cmd
$ cd api-link

### Vá para a pasta server
$ cd client

### Instale o node_modules
$ npm install

### Execute a aplicação
$ npm run dev
```

🛠 Tecnologias utilizadas
=================
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [MySql](https://www.mysql.com/)
- [React](https://pt-br.reactjs.org/)
- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [Material-Ui](https://mui.com/)

Autor
=================
 <img style="border-radius: 50%;" src="https://user-images.githubusercontent.com/32405554/218635417-51dbfd99-1047-4f02-94ca-1a9d2c81ea41.jpg" width="100px;" alt=""/>
 <br />

[![Linkedin Badge](https://img.shields.io/badge/-Paula-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/paulaso/)](https://www.linkedin.com/in/paulaso/) 
[![Gmail Badge](https://img.shields.io/badge/-paulafabianasoares@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:paulafabianasoares@gmail.com)](mailto:paulafabianasoares@gmail.com)

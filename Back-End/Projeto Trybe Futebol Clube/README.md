# Boas vindas ao repositório do Trybe Futebol Clube!

Para realizar o projeto, atente-se a cada passo descrito a seguir, e se tiver qualquer dúvida, nos envie por _Slack_! #vqv 🚀

Aqui você vai encontrar os detalhes de como estruturar o desenvolvimento do seu projeto a partir deste repositório, utilizando uma branch específica e um _Pull Request_ para colocar seus códigos.

# Termos e acordos

Ao iniciar este projeto, você concorda com as diretrizes do Código de Conduta e do Manual da Pessoa Estudante da Trybe.

# Entregáveis

Aqui você terá acesso ao contexto geral do projeto, ou seja, seu tema central e o prazo de entrega.

<details>
  <summary><strong>🤷🏽‍♀️ Como entregar</strong></summary><br />

  Para entregar o seu projeto você deverá criar um *Pull Request* neste repositório.

  Lembre-se que você pode consultar nosso conteúdo sobre [Git & GitHub](https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/fc998c60-386e-46bc-83ca-4269beb17e17/section/fe827a71-3222-4b4d-a66f-ed98e09961af/day/35e03d5e-6341-4a8c-84d1-b4308b2887ef/lesson/573db55d-f451-455d-bdb5-66545668f436) e nosso [Blog - Git & GitHub](https://blog.betrybe.com/tecnologia/git-e-github/) sempre que precisar!
</details>

<details>
<summary><strong>👨‍💻 O que deverá ser desenvolvido</strong></summary><br />

  ![Exemplo app front](assets/front-example.png)

  O `TFC` é um site informativo sobre partidas e classificações de futebol! ⚽️

  No time de desenvolvimento do `TFC`, seu *squad* ficou responsável por desenvolver uma API (utilizando o método `TDD`) e também integrar *- através do docker-compose -* as aplicações para que elas funcionem consumindo um banco de dados.

  Nesse projeto, você vai construir **um back-end dockerizado utilizando modelagem de dados através do Sequelize**. Seu desenvolvimento deve **respeitar regras de negócio** providas no projeto e **sua API deve ser capaz de ser consumida por um front-end já provido nesse projeto**.

  Para adicionar uma partida é necessário ter um _token_, portanto a pessoa deverá estar logada para fazer as alterações. Teremos um relacionamento entre as tabelas `teams` e `matches` para fazer as atualizações das partidas.

  O seu back-end deverá implementar regras de negócio para popular adequadamente a tabela disponível no front-end que será exibida para a pessoa usuária do sistema.

</details>

<details>
<summary><strong> Estrutura do projeto</strong></summary><br />

O projeto é composto de 4 entidades importantes para sua estrutura:

1️⃣ **Banco de dados:**
  - Será um container docker MySQL já configurado no docker-compose através de um serviço definido como `db`.
  - Tem o papel de fornecer dados para o serviço de _backend_.
  - Durante a execução dos testes sempre vai ser acessado pelo `sequelize` e via porta `3002` do `localhost`;
  - Você também pode conectar a um Cliente MySQL (Workbench, Beekeeper, DBeaver e etc), colocando as credenciais configuradas no docker-compose no serviço `db`.

2️⃣ **Back-end:**
 - Será o ambiente que você realizará a maior parte das implementações exigidas.
 - Deve rodar na porta `3001`, pois o front-end faz requisições para ele nessa porta por padrão;
 - Sua aplicação deve ser inicializada a partir do arquivo `app/backend/src/server.ts`;
 - Garanta que o `express` é executado e a aplicação ouve a porta que vem das variáveis de ambiente;
 - Todas as dependências extras (tal como `joi`, `boom`, `express-async-errors`...) devem ser listadas em `app/backend/packages.npm`.

3️⃣ **Front-end:**
  - O front já está concluído, não é necessário realizar modificações no mesmo. A única exceção será seu Dockerfile que precisará ser configurado.
  - Todos os testes a partir do requisito de login usam o `puppeteer` para simular uma pessoa acessando o site `http://localhost:3000/`;
  - O front se comunica com serviço de back-end pela url `http://localhost:3001` através dos endpoints que você deve construir nos requisitos.
  - Recomendamos que sempre que implementar um requisito no back-end acesse a página no front-end que consome a implementação para validar se está funcionando como esperado.

4️⃣ **Docker:**
  - O `docker-compose` tem a responsabilidade de unir todos os serviços conteinerizados (backend, frontend e db) e subir o projeto completo com o comando `npm run compose:up` ou `npm run compose:up:dev`;
  - Você **deve** configurar as `Dockerfiles` corretamente nas raízes do `front-end` e `back-end`, para conseguir inicializar a aplicação;

</details>

<details>
  <summary><strong> 🗓 Data de Entrega</strong></summary><br />

  * Projeto individual;
  * Serão `6` dias de projeto;
  * Data de entrega para avaliação final do projeto: `21/11/2022 14:00`.

</details>

# Orientações

## Antes de começar a desenvolver
Leia essa parte atentamente, pois aqui você encontrará informações importantes para preparar corretamente o setup do projeto.

<details>
<summary><strong> 🔰 Iniciando o projeto</strong></summary><br />

  1. Clone o repositório `Usar link SSH`

- Entre na pasta do repositório que você acabou de clonar:
  * `cd pasta-do-repositório`

  2. Instale as dependências [**Caso existam**]
  *`npm install`

  3. Crie uma branch a partir da branch `main`
 - Verifique se você está na branch `main`
  * Exemplo: `git branch`
- Se não estiver, mude para a branch `main`
  * Exemplo: `git checkout main`
- Agora crie uma branch à qual você vai submeter os `commits` do seu projeto

- Você deve criar uma branch no seguinte formato: `nome-de-usuario-nome-do-projeto`
  * Exemplo: `git checkout -b maria-sd-021-a-trybe-futebol-clube`

  4. Adicione as mudanças ao _stage_ do Git e faça um `commit`
- Verifique que as mudanças ainda não estão no _stage_
  * Exemplo: `git status` (deve aparecer listada a pasta _maria_ em vermelho)
- Adicione o novo arquivo ao _stage_ do Git
        * Exemplo:
          * `git add .` (adicionando todas as mudanças - _que estavam em vermelho_ - ao stage do Git)
          * `git status` (deve aparecer listado o arquivo _maria/README.md_ em verde)
- Faça o `commit` inicial
  * Exemplo:
          * `git commit -m 'iniciando o projeto x'` (fazendo o primeiro commit)
          * `git status` (deve aparecer uma mensagem tipo _nothing to commit_ )

  5. Adicione a sua branch com o novo `commit` ao repositório remoto
- Usando o exemplo anterior: `git push -u origin joaozinho-sd-021-a-trybe-futebol-clube`

  6. Crie um novo `Pull Request` _(PR)_
- Vá até a página de _Pull Requests_ do [repositório no GitHub](https://github.com/tryber/sd-0x-project-[nome-do-projeto]/pulls)
- Clique no botão verde _"New pull request"_
- Clique na caixa de seleção _"Compare"_ e escolha a sua branch **com atenção**
- Clique no botão verde _"Create pull request"_
- Adicione uma descrição para o _Pull Request_ e clique no botão verde _"Create pull request"_
- Volte até a [página de _Pull Requests_ do repositório](https://github.com/tryber/sd-0x-project-[nome-do-projeto]/pulls) e confira que o seu _Pull Request_ está criado

</details>

<details>
<summary><strong>🕵️ Linter</strong></summary><br />

Para garantir a qualidade do código, usaremos o [ESLint](https://eslint.org/) para fazer a sua análise estática.

Este projeto já vem com as dependências relacionadas ao _linter_ configuradas nos arquivos `package.json` nos seguintes caminhos:

- `sd-021-a-trybe-futebol-clube/app/backend/package.json`

Para rodar o `ESLint` em um projeto, basta executar o comando `npm install` dentro do projeto e depois `npm run lint`. Se a análise do `ESLint` encontrar problemas no seu código, tais problemas serão mostrados no seu terminal. Se não houver problema no seu código, nada será impresso no seu terminal.

Você também pode instalar o plugin do `ESLint` no `VSCode`: bastar ir em extensions e baixar o [plugin `ESLint`](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

⚠️**Atenção:** Pull Requests com issues de linter não serão avaliadas. Atente-se para resolvê-las antes de finalizar o desenvolvimento.

</details>



<details>
<summary><strong> ⚠️ Configurações mínimas para execução do projeto</strong></summary><br />

Na sua máquina você deve ter:

 - Sistema Operacional Distribuição Unix
 - Node versão 16
 - Docker
 - Docker-compose versão >=1.29.2

➡️ O `node` deve ter versão igual ou superior à `16.14.0 LTS`:
  - Para instalar o nvm, [acesse esse link](https://github.com/nvm-sh/nvm#installing-and-updating);
  - Rode os comandos abaixo para instalar a versão correta de `node` e usá-la:
    - `nvm install 16.14 --lts`
    - `nvm use 16.14`
    - `nvm alias default 16.14`

➡️ O`docker-compose` deve ter versão igual ou superior à`ˆ1.29.2`:
  * Use esse [link de referência para realizar a instalação corretamente no ubuntu](https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/94d0e996-1827-4fbc-bc24-c99fb592925b/section/5987fa2d-0d04-45b2-9d91-1c2ffce09862/day/2f1a5c4d-74b1-488a-8d9b-408682c93724/lesson/b883b81d-21f6-4b60-aa62-8508f6017ea0);
  * Acesse o [link da documentação oficial com passos para desinstalar](https://docs.docker.com/compose/install/#uninstallation) caso necessário.

</details>

<details>
<summary><strong>🐳 Configuração Docker</strong></summary><br />

  ### Docker e Docker-compose

  ⚠ O seu docker-compose precisa estar na versão 1.29 ou superior.  ⚠
[Veja aqui a documentação para atualizar o docker-compose.](https://docs.docker.com/compose/install/)

⚠️ **Crie os arquivos dockerfile:**

  - As pastas `frontend/` e `backend/` devem possuir um arquivo `Dockerfile` cada, configurados corretamente para a aplicação começar a rodar. Sem essa etapa concluída o _docker-compose_ não irá funcionar.

⚠️ **Atenção:**

- Seu projeto vai conter um arquivo `docker-compose.yml` que será utilizado pelo avaliador para realizar o _build_ da aplicação, você **não** deve alterá-lo ou excluí-lo.
- O arquivo `docker-compose.yml` também pode ser utilizado para executar a aplicação na sua máquina local, para isso é necessário executar o comando `npm run compose:up` na raiz do projeto.
- Recomendamos que enquanto desenvolve o projeto prefira o usar o comando `npm run compose:up:dev` pois, diferente do comando anterior, este comando está configurado para compartilhar volumes com o _docker_ e também utiliza o _script_ que realiza o _live-reload_ ao fazer modificações no _back-end_. Somente quando instalar uma nova dependência ou alterar algum arquivo na raiz do backend, você deverá realizar o re-build do seu compose, pois o volume está mapeando somente alterações dentro da pasta `src` Você pode verificar essas configurações explorando o arquivo `docker-compose.dev.yml` e comparar com `docker-compose.yml`


>  👀 **De olho na dica:**
> Lembre-se, você pode revisitar os conteúdos sobre Docker:
> - [Comandos básicos do Docker](https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/94d0e996-1827-4fbc-bc24-c99fb592925b/section/5987fa2d-0d04-45b2-9d91-1c2ffce09862/day/a852c0dd-0602-4357-88e8-707352e97927/lesson/0ad2e27d-e6d6-459d-8f1b-ad8ddc7ca046)
> - [Criando nossa primeira imagem Docker](https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/94d0e996-1827-4fbc-bc24-c99fb592925b/section/5987fa2d-0d04-45b2-9d91-1c2ffce09862/day/da25fd46-8818-4234-8603-a442b047370f/lesson/822be635-e9da-4b46-8042-cbf537013935)
> - [Criando nosso primeiro arquivo Compose](https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/94d0e996-1827-4fbc-bc24-c99fb592925b/section/5987fa2d-0d04-45b2-9d91-1c2ffce09862/day/2f1a5c4d-74b1-488a-8d9b-408682c93724/lesson/1ad977dd-5f74-4ff0-a2db-119b30242d32)
</details>

<details>
  <summary><strong>⚠️ Pré-requisitos para uma boa avaliação</strong></summary><br />



 ▶️ **Premissas gerais:**

Considere que para TODOS OS REQUISITOS, EXCETO os de testes de cobertura:
 - Dentro do container `app_backend`, o avaliador irá verificar:
    - **Que é possível rodar o `tsc` ("TypeScript Compiler") sem erros**, através do script `npm run build`, da própria aplicação back-end;
      - **Que o `tsc` deve gerar um arquivo `./build/database/config/database.js`** dentro do container `app_backend`;
      - Considere a leitura da seção `Model com Sequelize` no conteúdo de *TypeScript*: `Tipagem Estática e Generics` [nesse link](https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/94d0e996-1827-4fbc-bc24-c99fb592925b/section/4e3b7d3a-94a1-4fce-9545-0f2b04f8ccd9/day/55580b57-6754-49bc-83bf-465967e0d2a1/lesson/70a59622-f05f-44cc-b3ce-6e5c28435f25).
    - **Que é possível restaurar e popular o banco de dados** utilizando o `sequelize-cli`, a partir do arquivo de configuração `./build/database/config/database.js`, utilizando o script `npm run db:reset`, da própria aplicação back-end.
      - ⚠️ Note:
        -  Os seeds já foram providos em `./app/backend/src/database/seeders`, **porém, precisam ser renomeados** *(remoção do underline (`_`), do final do arquivo)* para que possam ser reconhecidos pelo `sequelize-cli`, a medida que as respectivas `migrations` forem criadas;
        - Existe uma `migration` com nome `./app/backend/src/database/migrations/99999999999999-create-z.js` responsável por indicar que o banco foi criado corretamente e está funcionando. **Não apague ou renomeie essa migration**;

⚠️ Configurar o `Dockerfile`, do _front-end_ e _back-end_, **não** será suficientes para que a aplicação execute corretamente. Também será necessário criar as _migrations_ e descomentar o underscore (`_`) nas _seeders_, para que seu projeto seja executável via Docker.

⚠️ **A partir do 3º requisito**, a aplicação de front-end deve estar **rodando em um container**, de forma que a mesma tentará consumir sua aplicação back-end (**que deve estar saudável**, considerando os pontos anteriores).

⚠️ Para que esse projeto seja avaliado corretamente, **sua aplicação deve ter um funcionamento mínimo**. Isso porque o avaliador **vai executar um teste de usabilidade E2E** (End-to-end, ou Ponto a ponto).

> Leia mais sobre esse tipo de teste [nesse link](https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/f04cdb21-382e-4588-8950-3b1a29afd2dd/section/6d4da8fa-cc73-4bb8-9fb1-22f300dc24e7/lesson/98ae2ef9-4965-40e8-82c3-2e79e88a5dd1)*, acompanhado de validações adicionais *(Compilação do TypeScript e inicialização do Sequelize)* que podem ser acompanhados pelo uso do script `npm run test:debug`;

</details>

## Durante o desenvolvimento

Aqui você encontrará orientações e dicas que ajudarão muito no desenvolvimento do projeto. Sempre que tiver dúvidas ou bugs aparecerem, dê uma olhada aqui. 👀

<details>
<summary><strong> ⌨️ Boas práticas </strong></summary><br/>

* Versione seu projeto

  * Faça `commits` das alterações que você fizer no código regularmente;

  * Lembre-se de sempre após um (ou alguns) `commits` atualizar o repositório remoto.

  * Os comandos que você utilizará com mais frequência são:
    1. `git status` _(para verificar o que está em vermelho - fora do stage - e o que está em verde - no stage)_;
    2. `git add` _(para adicionar arquivos ao stage do Git)_;
    3. `git commit` _(para criar um commit com os arquivos que estão no stage do Git)_;
    4. `git push -u nome-da-branch` _(para enviar o commit para o repositório remoto na primeira vez que fizer o `push` de uma nova branch)_;
    5. `git push` _(para enviar o commit para o repositório remoto após o passo anterior)_.

</details>

<details>
<summary><strong> ⚠️ Inicialização do compose e verificação dos logs das aplicações </strong></summary><br />

- Considerando o uso do parâmetro `healthcheck` em cada container do seu `docker-compose.yml`, a inicialização dos containers deve aguardar o comando de status de saúde (o que valida se aquele container está operacional ou não):
  - No container `db`, representado por um comando `ping` no banco de dados;
  - No back-end, representado por um comando `lsof`, que vai procurar aplicações ativas na porta definida (por padrão, no caso `3001`);
  - No front-end, representado por um comando `lsof`, que vai procurar aplicações ativas na porta definida (por padrão, no caso `3000`).

- Caso os containers respeitem as premissas anteriores, os mesmos devem ser criados sem maiores problemas:

![Criação dos containers concluída com sucesso!](assets/compose-status-01.png)

- Em caso de algum problema (no back-end, por exemplo), você deve se deparar com alguma mensagem do tipo:

![Erro no status de saúde do container do back-end](assets/compose-status-03.png)

> ⚠️ Lembre-se, não cabe ao avaliador de usabilidade dizer qual é o problema específico na sua aplicação, **portanto, cabe aqui investigar o problema**, sempre considerando as premissas anteriores.
- Nesse caso, a partir da pasta `./app` (onde está seu *docker-compose*), é possível rodar o comando `docker-compose logs` (Para ver todos os status) ou `docker-compose logs <nome-do-seu-serviço>` (Para mostrar somente o de um escopo específico).
  - ⚠️ é indicado remover o parâmetro `restart: 'always'` do seu serviço, para que o mesmo não polua seus logs;
  - No nosso contexto, rodando o comando `docker-compose logs backend`:

![docker-compose logs backend](assets/compose-status-04.png)

> Aqui não houve problema com o `tsc`, porém a senha para acesso ao banco pelo sequelize estava errada.

 #### ⚠️ **Inicie seu `docker-compose` antes de testar localmente!** ⚠️

  Os testes vão utilizar a sua aplicação do compose para fazer as validações, portanto **é essencial que ela esteja funcionando corretamente** para que os testes passem!

  - Para isso, garanta que as aplicações, tanto do back, quanto do front-end, possuem arquivos `Dockerfile` válidos;
  - Utilize os scripts de apoio `npm run compose:up` / `npm run compose:down`, para facilitar a execução do seu *compose*.

</details>

<details id='Variaveis-de-ambiente'>
<summary><strong> ⚙️ Variáveis de ambiente </strong></summary><br />

  **No diretório `app/backend/` renomeie o arquivo `.env.example` para `.env` e configure os valores de acordo com o cenário do seu ambiente (credenciais de banco de dados, secrets desejadas e etc)**. Isso vai permitir que você inicialize a aplicação fora do _container_ e ela se conecte com seu banco local caso deseje.
 > `./app/backend/.env.example`
  ```txt
  JWT_SECRET=jwt_secret
  APP_PORT=3001
  DB_USER=seu_user
  DB_PASS=sua_senha
  DB_HOST=localhost
  DB_PORT=3306
  ```

  **⚠️ Variáveis de ambiente além das especificadas acima não são suportadas, pois não são esperadas pelo avaliador do projeto. ⚠️**

  **⚠️ Não defina variável de ambiente para o nome do banco, o mesmo deve se manter com o nome `TRYBE_FUTEBOL_CLUBE`. ⚠️**

</details>

<details>
<summary><strong> 📦 Pacotes externos</strong></summary><br />

* ⚠️ **As alterações que você fizer no arquivo `app/backend/packages.json` serão descartadas no momento da avaliação, caso queira instalar pacotes adicionais ao back-end, utilize o arquivo `app/backend/packages.npm`, separando os pacotes por espaços ou quebras de linha.** Exemplo:

  ```text
  joi
  cors
  @types/cors
  ```

</br>

</details>

<details id='Criptografia-de-senhas'>
<summary><strong>🔐 Criptografia de senhas </strong></summary><br />

⚠️ A biblioteca utilizada para criptografar a senha no banco de dados é a `bcryptjs` [bcryptjs npm](https://www.npmjs.com/package/bcryptjs) e que já vem instalada no projeto e não deve ser alterada ou substituída. Recomendamos que explore os recursos da biblioteca na documentação para implementar no projeto ao cadastrar um usuário e ao realizar login ⚠️

</details>

<details id='sequelize'>
  <summary><strong>🎲 Sequelize</strong></summary>
  <br/>

  Para o desenvolvimento, o time de produto disponibilizou um *Diagrama de Entidade-Relacionamento (DER)* para construir a modelagem do banco de dados. Com essa imagem você já consegue saber:
  - Como nomear suas tabelas e colunas;
  - Quais são os tipos de suas colunas;
  - Relações entre tabelas.

    ![Exemplo banco de dados](assets/er-diagram.png)

  ⚠️ O `package.json` do diretório `app/backend` contém um script `db:reset` que é responsável por "dropar" o banco, recriar e executar as _migrations_ e _seeders_. Você pode executá-lo com o commando `npm run db:reset` se por algum motivo precisar recriar a base de dados;

  ⚠️ Já existem _seeders_ prontas em `app/backend/src/database/seeders`. Você também pode usá-las como referência para criar suas _migrations_ de acordo com os campos e tabelas que as _seeders_ irão popular.  Assim que criar uma _migration_ você deve renomear a _seeder_ correspondente retirando o underline (`_`) ao fim dela, assim o script `db:reset` vai usá-la nos testes e você se certificará se sua _migration_ funcionou como o esperado.

  ⚠️ Quaisquer execução referente ao sequelize-cli deve ser realizada dentro do diretório `app/backend`. Certifique-se de que antes de rodar comandos do sequelize já exista uma versão compilada do back-end (diretório `app/build`), caso contrário basta executar `npm run build` para compilar. O sequelize só funcionará corretamente se o projeto estiver compilado.

  ⚠️ **O sequelize já foi inicializado, portanto NÃO é necessário executar o `sequelize init` novamente**

</details>


<details id='testes-de-cobertura'>
  <summary><strong> Testes de cobertura </strong></summary><br/>

  A construção de testes de cobertura no back-end deve ser feita em *TypeScript*, utilizando `mocha`, `chai` e `sinon`, na pasta `app/backend/src/tests/`, conforme o exemplo em `app/backend/src/tests/change.me.test.ts` *(aqui considerando um teste de integração)*:

  ```typescript
  import * as sinon from 'sinon';
  import * as chai from 'chai';
  // @ts-ignore
  import chaiHttp = require('chai-http');

  import { app } from '../app';
  import Example from '../database/models/ExampleModel';

  import { Response } from 'superagent';

  chai.use(chaiHttp);

  const { expect } = chai;

  describe('Seu teste', () => {
    /**
     * Exemplo do uso de stubs com tipos
     */

    // let chaiHttpResponse: Response;

    // before(async () => {
    //   sinon
    //     .stub(Example, "findOne")
    //     .resolves({
    //       ...<Seu mock>
    //     } as Example);
    // });

    // after(()=>{
    //   (Example.findOne as sinon.SinonStub).restore();
    // })

    // it('...', async () => {
    //   chaiHttpResponse = await chai
    //      .request(app)
    //      ...

    //   expect(...)
    // });

    it('Seu sub-teste', () => {
      expect(false).to.be.eq(true);
    });
  });
  ```

  Os testes devem cobrir todos os arquivos contidos em `app/backend/src`, com exceção daqueles que já foram entregues com o projeto.

  Para rodar testes de cobertura no seu back-end, utilize o comando: `npm run test:coverage`.

</details>

<details>
  <summary><strong>ℹ️ Status HTTP</strong></summary><br />

  Tenha em mente que todas as "respostas" devem respeitar os [status do protocolo HTTP](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status), com base no que o REST prega.

  Alguns exemplos:

  - Requisições que precisam de token mas não o receberam devem retornar um código de `status 401`;

  - Requisições que não seguem o formato pedido pelo servidor devem retornar um código de `status 400`;

  - Um problema inesperado no servidor deve retornar um código de `status 500`;

  - Um acesso ao criar um recurso, no nosso caso usuário ou partida, deve retornar um código de `status 201`.

  - Quando solicitado algo que não existe no banco, deve retornar um código de `status 404`.

</details>


<details>
  <summary><strong> 👀 Dicas e comandos úteis </strong></summary><br />

  - Quando um Workspace é inicializado na raiz do projeto, são apresentados alguns erros no Typescript. Para que o editor consiga sincronizar corretamente as configurações do `tsconfig.json`, é necessário iniciar um novo Workspace dentro do diretório `backend`.  Sempre que o VSCode apresentar algum erro de configuração do Typescript, certifique-se de que está usando o Workspace correto.
  - Ao rodar o comando `npm install` na pasta raiz do projeto você automaticamente estará **instalando suas aplicações (front e back)**;
  - Você pode **instalar suas aplicações (front e back)** rodando o comando `npm run install:apps` na pasta raiz do projeto;
  - Você pode rodar o avaliador **mostrando as operações que o navegador vai fazer no front-end** durante os testes E2E utilizando o comando `npm run test:browser`;
  - Você pode **debugar alguns erros do avaliador** (como por exemplo a validação do banco de dados, ou da compilação do TS), onde são *printadas* na tela algumas infos adicionais, utilizando o comando `npm run test:debug`;
  - Você pode **subir ou descer uma aplicação do compose**, utilizando `npm run` com os scripts `compose:up`, `compose:down`, ou `compose:up:dev`, `compose:down:dev`;
  - Os comando de _compose_ anteriores estão configurados para executar o _docker-compose_ com o terminal desanexado (detached mode `-d`). Caso queira acompanhar os logs de um serviço em tempo real pelo terminal, basta executar `npm run logs [nome_do_servico]` onde _nome_do_servico_ é opcional e pode receber os serviços _backend_, _frontend_ ou _db_
  - Para criação da API com TS + POO, **recomenda-se fazer ou relembrar os exercícios** do conteúdo de POO e SOLID, especificamente o do dia de `SOLID - Introdução e Princípios S, O e D`, [nesse link](https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/94d0e996-1827-4fbc-bc24-c99fb592925b/section/62c97d81-c729-445d-9e9f-f636a5c24231/day/d5d5de7d-7f64-4317-928c-1981fe076cd9/lesson/397a316e-f4a4-4516-9b61-389af92b019a).

</details>

## Depois de terminar o desenvolvimento

Aqui você encontra orientações opcionais para seguir após o desenvolvimento do projeto e finalizar com "chave de ouro". 🔑

<details>
  <summary><strong>🤝 Como entregar o projeto?</strong></summary><br/>

  Para "entregar" seu projeto, siga os passos a seguir:

  - Vá até a página DO SEU Pull Request, adicione a label de "code-review" e marque seus colegas
    - No menu à direita, clique no *link* "Labels" e escolha a label code-review
    - No menu à direita, clique no *link* "Assignees" e escolha o seu usuário
    - No menu à direita, clique no *link* "Reviewers" e digite students, selecione o time tryber/students-sd-021-a

 ➡️ Se ainda houver alguma dúvida sobre como entregar seu projeto, [aqui tem um video explicativo](https://vimeo.com/362189205).

⚠️**Atenção:** lembre-se de garantir que todas as _issues_ comentadas pelo Linter estão resolvidas!

</details>

<details>
  <summary><strong>🗣 Nos dê feedbacks sobre o projeto!</strong></summary><br />

Ao finalizar e submeter o projeto, não se esqueça de avaliar sua experiência preenchendo o formulário.
**Leva menos de 3 minutos!**

[FORMULÁRIO DE AVALIAÇÃO DE PROJETO](https://be-trybe.typeform.com/to/ZTeR4IbH)

⚠️**Atenção** o avaliador automático não necessariamente avalia seu projeto na ordem em que os requisitos aparecem no readme. Isso acontece para deixar o processo de avaliação mais rápido. Então, não se assuste se isso acontecer, ok?

</details>

<details>
  <summary><strong>🗂 Compartilhe seu portfólio!</strong></summary><br />

  Você sabia que o LinkedIn é a principal rede social profissional e compartilhar o seu aprendizado lá é muito importante para quem deseja construir uma carreira de sucesso? Compartilhe esse projeto no seu LinkedIn, marque o perfil da Trybe (@trybe) e mostre para a sua rede toda a sua evolução.


<br/>
</details>
</details>

# Sobre os Requisitos

Esse projeto é composto de 4 seções principais:
1. Users e Login
2. Times
3. Partidas
4. Placar

## Database
  - Comece rodando o comando `npm run build` na pasta do `back-end` para fazer o _build_ da aplicação;
  - [Nessa seção](#sequelize) temos o diagrama de entidades;
  - Mantenha o arquivo `/app/backend/src/database/migrations/99999999999999-create-z.js`, pois ele é necessário para a avaliação dos requisitos dessa seção;
  - A leitura da seção `Model com Sequelize` no conteúdo de `TypeScript: Tipagem Estática e Generics`, contido [nesse link](https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/94d0e996-1827-4fbc-bc24-c99fb592925b/section/4e3b7d3a-94a1-4fce-9545-0f2b04f8ccd9/day/55580b57-6754-49bc-83bf-465967e0d2a1/lesson/70a59622-f05f-44cc-b3ce-6e5c28435f25), é recomendável!

## Seção 1: Users e Login

<details>
  <summary><strong> Introdução </strong></summary>

- A rota utilizada deve ser (`/login`);

- A rota deve receber os campos `email` e `password` e esses campos devem ser validados no banco de dados:
  - O campo `email` deve receber um email válido;
  - O Campo `password` deve ter mais de 6 caracteres.

- O body da requisição deve conter o seguinte formato:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

</details>

<details>
  <summary><strong> Requisitos </strong></summary>

### 1 - Desenvolva em `/app/backend/src/database` nas pastas correspondentes, uma migration e um model para a tabela `users`

  - O avaliador consultará os dados da tabela `users`, verificando se ela contém os dados iniciais corretos. [Nessa seção](#sequelize) temos o diagrama de entidades;

### 2 - (`TDD`) Desenvolva testes que cubram no mínimo 5% dos arquivos back-end em `/src`, com um mínimo de 7 linhas cobertas

  **Sugestões:**
  - Baseando-se no contrato do endpoint `/login` **do próximo requisito**, inicie um teste de integração utilizando a metodologia `TDD` com a implementação do requisito seguinte;
  - Nesse primeiro momento, foque em desenvolver o que pede o requisito, progredindo gradualmente a partir disso;
  - Para tanto, utilize/altere o arquivo de referência `app/backend`/src`/tests/change.me.test.ts`;
  - Veja a seção de [Testes de cobertura](#testes-de-cobertura) para mais detalhes.

### 3 - Desenvolva o endpoint `/login` no back-end de maneira que ele permita o acesso com dados válidos no front-end

  - A rota de ser do tipo `POST`;

  - O avaliador verificará se é possível fazer o login com dados corretos e que, após o acesso, será redirecionado para a tela de jogos.

- As senhas que existem no banco de dados estão encriptadas. Veja a [seção de Criptografia de Senhas](#Criptografia-de-senhas) para mais detalhes de como comparar a senha do banco com a senha do corpo da requisição.

- Se o login foi feito com sucesso, o resultado retornado deverá ser similar ao exibido abaixo, com um status http `200`:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc" // Aqui deve ser o token gerado pelo backend.
  }
  ```

### 4 - (`TDD`) Desenvolva testes que cubram no mínimo 10% dos arquivos back-end em `/src`, com um mínimo de 19 linhas cobertas

  **Sugestão:**
  - Evolua os testes de integração da sua rota `/login`, utilizando o método `TDD`, agora considerando **o contrato do próximo requisito**.

### 5 - Desenvolva o endpoint `/login` no back-end de maneira que ele não permita o acesso sem informar um email no front-end

  - O avaliador verificará se fazer o login sem um email, haverá o retorno de status _bad request_.

  - Se o login não tiver o campo "email", o resultado retornado deverá ser a mensagem abaixo, com um status http `400`:
  ```json
    { "message": "All fields must be filled" }
  ```

### 6 - (`TDD`) Desenvolva testes que cubram no mínimo 15% dos arquivos back-end em `/src`, com um mínimo de 25 linhas cobertas

  **Sugestão:**
  - Evolua os testes de integração da sua rota `/login`, utilizando o método `TDD`, agora considerando **o contrato do próximo requisito**.

### 7 - Desenvolva o endpoint `/login` no back-end de maneira que ele não permita o acesso sem informar uma senha no front-end

  - O avaliador verificará se fazer login sem senha, o retorno será status _bad request_.

  - Se o login não tiver o campo "password", o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:
  ```json
    { "message": "All fields must be filled" }
  ```


### 8 - (`TDD`) Desenvolva testes que cubram no mínimo 20% dos arquivos back-end em `/src`, com um mínimo de 35 linhas cobertas

  **Sugestão:**
  - Evolua os testes de integração da sua rota `/login`, utilizando o método `TDD`, agora considerando **o contrato do próximo requisito**.

### 9 - Desenvolva o endpoint `/login` no back-end de maneira que ele não permita o acesso com um email inválido no front-end

  - O avaliador verificará se fazer o login com um email incorreto retornará status não-autorizado.

  - Se o login tiver o "email" **inválido**, o resultado retornado será similar ao exibido abaixo, com um status http `401`:
  ```json
    { "message": "Incorrect email or password" }
  ```


### 10 - (`TDD`) Desenvolva testes que cubram no mínimo 30% dos arquivos back-end em `/src`, com um mínimo de 45 linhas cobertas

  **Sugestão:**
  - Evolua os testes de integração da sua rota `/login`, utilizando o método `TDD`, agora considerando **os contratos dos próximos dois requisitos**.

### 11 - Desenvolva o endpoint `/login` no back-end de maneira que ele não permita o acesso com uma senha inválida no front-end

  - O avaliador verificará se fazer o login com uma senha incorreta retornará status não-autorizado.

  - Se o login tiver a "senha" **inválida**, o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`:
  ```json
    { "message": "Incorrect email or password" }
  ```

### 12 - Desenvolva o endpoint `/login/validate` no back-end de maneira que ele retorne os dados corretamente no front-end

  - Deve ser uma rota `GET` que receba um `header` com parâmetro `authorization`, onde ficará armazenado o token gerado no login;

  - O avaliador verificará se ao tentar bater na rota com um token válido, o mesmo retornará o tipo de usuário.

  A resposta deve ser de status `200` com um `objeto` contendo a `role` do *user*:
  ```json
    { "role": "admin" }
  ```

</details>

## Seção 2: Times

<details>
  <summary><strong> Introdução </strong></summary>

 - Os requisitos a seguir consideram o consumo da rota `/teams` para retornar os nomes dos times associados à partida na renderização do front-end

</details>

<details>
  <summary><strong> Requisitos </strong></summary>

### 13 - (`TDD`) Desenvolva testes que cubram no mínimo 45% dos arquivos back-end em `/src`, com um mínimo de 70 linhas cobertas

  **Sugestão:**
  - Crie um novo teste de integração, agora da sua rota `/teams`, utilizando o método `TDD`, considerando **os contratos dos próximos dois requisitos**. [Nessa seção](#sequelize) temos o diagrama de entidades.

### 14 - Desenvolva em `/app/backend/src/database` nas pastas correspondentes, uma migration e um model para a tabela de `teams`

  - O avaliador consultará os dados da tabela `teams`, verificando se ela contém os dados iniciais corretos. [Nessa seção](#sequelize) temos o diagrama de entidades.

### 15 - Desenvolva o endpoint `/teams` no back-end de forma que ele possa retornar todos os times corretamente

  - Deve ser uma rota `GET` com resposta com status `200` e com um `json` contendo o retorno no seguinte modelo:

```json
[
  {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
  {
    "id": 2,
    "teamName": "Bahia"
  },
  {
    "id": 3,
    "teamName": "Botafogo"
  },
  ...
]
```

### 16 - Desenvolva o endpoint `/teams/:id` no back-end de forma que ele possa retornar dados de um time específico

  - Deve ser uma rota `GET` com resposta com status `200` e com um `json` contendo o retorno no seguinte modelo:

```json
{
  "id": 5,
  "teamName": "Cruzeiro"
}
```

### 17 - (`TDD`) Desenvolva testes que cubram no mínimo 60% dos arquivos back-end em `/src`, com um mínimo de 80 linhas cobertas

  **Sugestão:**
  - Crie um novo teste de integração, agora da sua rota `/matches`, utilizando o método `TDD`, agora considerando **os contratos dos próximos três requisitos**.

</details>

## Seção 3: Partidas

<details>
  <summary><strong> Introdução </strong></summary>

  - Para os requisitos de criação de partidas, será necessário implementar o model e algumas rotas relacionadas a entidade Match.

</details>

<details>
  <summary><strong> Requisitos </strong></summary>

### 18 - Desenvolva em `/app/backend/src/database` nas pastas correspondentes, uma migration e um model para a tabela de `matches`

  - O avaliador consultará os dados da tabela `matches`, verificando se ela contém os dados iniciais corretos. [Nessa seção](#sequelize) temos o diagrama de entidades.

### 19 - Desenvolva o endpoint `/matches` de forma que os dados apareçam corretamente na tela de partidas no front-end.

  - A rota deve ser um `GET` e retorna uma lista de partidas;

  - Será validado que a página apresentará todos os dados de partidas sem nenhum filtro.

    Exemplo de retorno:
    ```json
    [
      {
        "id": 1,
        "homeTeam": 16,
        "homeTeamGoals": 1,
        "awayTeam": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "teamHome": {
          "teamName": "São Paulo"
        },
        "teamAway": {
          "teamName": "Grêmio"
        }
      },
      ...
      {
        "id": 41,
        "homeTeam": 16,
        "homeTeamGoals": 2,
        "awayTeam": 9,
        "awayTeamGoals": 0,
        "inProgress": true,
        "teamHome": {
          "teamName": "São Paulo"
        },
        "teamAway": {
          "teamName": "Internacional"
        }
      }
    ]
    ```

  - **OBS:** Você deverá definir os relacionamentos para ```teamHome``` e ```teamAway``` somente na model de partidas.

### 20 - Desenvolva o endpoint `/matches` de forma que seja possível filtrar as partidas em andamento na tela de partidas do front-end

  - A rota deverá ser do tipo `GET` e retornar uma lista de partidas filtradas;

  - Será validado que, ao escolher a opção de partidas em andamento, serão filtradas todas as partidas em andamento;

  - Essa requisição deverá usar `query string` para definir o parâmetro:
    ex: `matches?inProgress=true`

  Exemplo de retorno da requisição:
  ```json
  [
    {
      "id": 41,
      "homeTeam": 16,
      "homeTeamGoals": 2,
      "awayTeam": 9,
      "awayTeamGoals": 0,
      "inProgress": true,
      "teamHome": {
        "teamName": "São Paulo"
      },
      "teamAway": {
        "teamName": "Internacional"
      }
    },
    {
      "id": 42,
      "homeTeam": 6,
      "homeTeamGoals": 1,
      "awayTeam": 1,
      "awayTeamGoals": 0,
      "inProgress": true,
      "teamHome": {
        "teamName": "Ferroviária"
      },
      "teamAway": {
        "teamName": "Avaí/Kindermann"
      }
    }
  ]
  ```

### 21 - Desenvolva o endpoint `/matches` de forma que seja possível filtrar as partidas finalizadas na tela de partidas do front-end

  - A rota deverá ser do tipo `GET` e retornar uma lista de partidas filtradas;

  - Será validado que,ao escolher a opção de partidas finalizadas, serão filtradas todas as partidas finalizadas;

  - Essa requisição deverá usar `query string` para definir o parâmetro.
    ex: `matches?inProgress=false`

  Exemplo de retorno da requisição:
  ```json
  [
    {
      "id": 1,
      "homeTeam": 16,
      "homeTeamGoals": 1,
      "awayTeam": 8,
      "awayTeamGoals": 1,
      "inProgress": false,
      "teamHome": {
        "teamName": "São Paulo"
      },
      "teamAway": {
        "teamName": "Grêmio"
      }
    },
    {
      "id": 2,
      "homeTeam": 9,
      "homeTeamGoals": 1,
      "awayTeam": 14,
      "awayTeamGoals": 1,
      "inProgress": false,
      "teamHome": {
        "teamName": "Internacional"
      },
      "teamAway": {
        "teamName": "Santos"
      }
    }
  ]
  ```

### 22 - (`Bônus`; `TDD`) Desenvolva testes que cubram no mínimo 80% dos arquivos back-end em `/src`, com um mínimo de 100 linhas cobertas

  **Sugestão:**
  - Evolua os testes de integração da sua rota `/matches`, utilizando o método `TDD`, agora considerando **o contrato dos próximos requisitos**.

### 23 - Desenvolva o endpoint `/matches` de modo que seja possível salvar uma partida com o status de inProgress como true no banco de dados

  - A rota deverá ser do tipo `POST` e retornar a partida inserida no banco de dados;

  - Será validado que é possível salvar um jogo no banco de dados e ver o jogo na página de jogos;

  - A partida só pode ser criada com token JWT validado;

  - O corpo da requisição terá o seguinte formato:
  ```json
  {
    "homeTeam": 16, // O valor deve ser o id do time
    "awayTeam": 8, // O valor deve ser o id do time
    "homeTeamGoals": 2,
    "awayTeamGoals": 2,
  }
  ```

  - Caso a partida seja inserida com sucesso, deve-se retornar os dados da partida, com _status_ `201`:

  ```json
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 8,
    "awayTeamGoals": 2,
    "inProgress": true,
  }
  ```

### 24 - Desenvolva o endpoint `/matches/:id/finish` de modo que seja possível alterar o status inProgress de uma partida para false no banco de dados

  - A rota deve ser do tipo `PATCH`;

  - Será recebido o `id` pelo parâmetro da URL;

  - Será validado que, ao finalizar uma partida, a alteração é feita no banco de dados e na página.

  - Deve-se retornar, com um status `200`, a seguinte mensagem:

  ```json
  { "message": "Finished" }
  ```

### 25 - Desenvolva o endpoint `/matches` de forma que não seja possível inserir uma partida com times iguais

  - Será validado que não é possível inserir uma partida em que o `homeTeam` e o `awayTeam` sejam iguais, por exemplo: Barcelona x Barcelona;

  - Caso isso ocorra, deve-se retornar, com um status `422`, a seguinte mensagem::

  ```json
  { "message": "It is not possible to create a match with two equal teams" }
  ```

### 26 - Desenvolva o endpoint `/matches` de forma que não seja possível inserir uma partida com um time que não existe na tabela teams

  - Será validado que não é possível inserir uma partida com um time que não existe na tabela teams;

  - Caso algum dos times não esteja cadastrado no banco de dados, deve-se retornar, com um status `404,` a seguinte mensagem:

  ```json
  { "message": "There is no team with such id!" }
  ```

### 27 - Desenvolva o endpoint `/matches` de forma que não seja possível inserir uma partida sem um token válido

  - Será validado que não é possível inserir uma partida com um token inválido;

  - Caso o token informado não seja válido, deve-se retornar, com um status `401`, a seguinte mensagem:

  ```json
  { "message": "Token must be a valid token" }
  ```

### 28 - Desenvolva o endpoint `/matches/:id` de forma que seja possível atualizar partidas em andamento

  - O endpoint deve ser do tipo `PATCH`;

  - Será recebido o `id` pelo parâmetro da URL;

  - Será avaliado que é possível alterar o resultado de uma partida.

  - O corpo da requisição terá o seguinte formato:
  ```json
  {
    "homeTeamGoals": 3,
    "awayTeamGoals": 1
  }
  ```
  - Será avaliado que é o endpoint responde à requisição com um status `200` e qualquer corpo.

</details>

## Seção 4: Leaderboards (placares)

<details>
  <summary><strong> Introdução </strong></summary>

  ▶️ Para construir a classificação dos times, devem ser seguidas as seguintes regras de negócios:

    - `Classificação`: Posição na classificação;
    - `Time`: Nome do time;
    - `P`: Total de Pontos;
    - `J`: Total de Jogos;
    - `V`: Total de Vitórias;
    - `E`: Total de Empates;
    - `D`: Total de Derrotas;
    - `GP`: Gols marcados a favor;
    - `GC`: Gols sofridos;
    - `SG`: Saldo total de gols;
    - `%`: Aproveitamento do time.

    <br/>

  - Todas as regras de negócio e cálculos necessários deverão ser realizados no seu back-end. A aplicação front-end apenas renderizará essas informações.

  - Para calcular o `Total de Pontos`, você deve levar em consideração que:

    - O time `vitorioso`: marcará +3 pontos;
    - O time `perdedor`: marcará 0 pontos;
    - Em caso de `empate`: ambos os times marcam +1 ponto.

  - Para o campo `Aproveitamento do time (%)`, que é a porcentagem de jogos ganhos, use a seguinte fórmula: `[P / (J * 3)] * 100`, onde:

    - `P`: Total de Pontos;
    - `J`: Total de Jogos.

    Obs.: O seu resultado deverá ser limitado a `duas casas decimais`.

  - Para calcular `Saldo de Gols` use a seguinte fórmula: `GP - GC`, onde:

    - `GP`: Gols marcados a favor;
    - `GC`: Gols sofridos.

  - O resultado deverá ser ordenado sempre de forma decrescente, levando em consideração a quantidade de pontos que o time acumulou. Em caso de empate no `Total de Pontos`, você deve levar em consideração os seguintes critérios para desempate:

  **Ordem para desempate**

  1º Total de Vitórias;
  2º Saldo de gols;
  3º Gols a favor;
  4º Gols sofridos.


  ⚠️ **Atenção:** ⚠️

  - Por padrão, as respostas de todos os seus endpoints deverão estar em inglês, mesmo que a renderização no front-end seja em português.
  - A sua tabela deverá renderizar **somente** as PARTIDAS que já foram FINALIZADAS!
**Os seguintes pontos serão avaliados:**

  ```
  - Se a lista de classificação está correta;
  - Se a regra de classificação se mantém mesmo com mudanças na classificação;
  - Se a tabela de classificação tem 10 colunas;
  - Se a tabela tem uma linha para cada time.
  ```

**Exemplo de retorno esperado:**

```json
[
  {
    "name": "Palmeiras",
    "totalPoints": 13,
    "totalGames": 5,
    "totalVictories": 4,
    "totalDraws": 1,
    "totalLosses": 0,
    "goalsFavor": 17,
    "goalsOwn": 5,
    "goalsBalance": 12,
    "efficiency": 86.67
  },
  {
    "name": "Corinthians",
    "totalPoints": 12,
    "totalGames": 5,
    "totalVictories": 4,
    "totalDraws": 0,
    "totalLosses": 1,
    "goalsFavor": 12,
    "goalsOwn": 3,
    "goalsBalance": 9,
    "efficiency": 80
  },
  {
    "name": "Santos",
    "totalPoints": 11,
    "totalGames": 5,
    "totalVictories": 3,
    "totalDraws": 2,
    "totalLosses": 0,
    "goalsFavor": 12,
    "goalsOwn": 6,
    "goalsBalance": 6,
    "efficiency": 73.33
  },
  ...
]
```

  - Os endpoints dessa seção, irão alimentar uma tabela idêntica ao exemplo abaixo no front-end:

    | Classificação | Time        | P   | J   | V   | E   | D   | GP  | GC  | SG  | %    |
    | ------------- | ----------- | --- | --- | --- | --- | --- | --- | --- | --- | ---- |
    | 1             | Ferroviária | 38  | 15  | 12  | 2   | 1   | 44  | 13  | 31  | 84.4 |

</details>

<details>
  <summary><strong> Requisitos </strong></summary>

## Leaderboard Home

### 29 - Desenvolva o endpoint `/leaderboard/home` de forma que seja possível filtrar as classificações dos times `da casa` na tela de classificação do front-end com os dados iniciais do banco de dados

  - O endpoint deverá ser do tipo `GET`;

  - Será avaliado que ao fazer a requisição ao endpoint `/leaderboard/home` serão retornados os campos e valores corretos, considerando os dados iniciais do banco de dados;

  - Partidas que estiverem em andamento (não foram finalizadas) não devem ser consideradas.

 <details>
<summary><strong> Retorno esperado: </strong></summary> <br/>

```json
[
  {
    "name": "Santos",
    "totalPoints": 9,
    "totalGames": 3,
    "totalVictories": 3,
    "totalDraws": 0,
    "totalLosses": 0,
    "goalsFavor": 9,
    "goalsOwn": 3,
    "goalsBalance": 6,
    "efficiency": "100.00"
  },
  {
    "name": "Palmeiras",
    "totalPoints": 7,
    "totalGames": 3,
    "totalVictories": 2,
    "totalDraws": 1,
    "totalLosses": 0,
    "goalsFavor": 10,
    "goalsOwn": 5,
    "goalsBalance": 5,
    "efficiency": "77.78"
  },
  {
    "name": "Corinthians",
    "totalPoints": 6,
    "totalGames": 2,
    "totalVictories": 2,
    "totalDraws": 0,
    "totalLosses": 0,
    "goalsFavor": 6,
    "goalsOwn": 1,
    "goalsBalance": 5,
    "efficiency": "100.00"
  },
  {
    "name": "Grêmio",
    "totalPoints": 6,
    "totalGames": 2,
    "totalVictories": 2,
    "totalDraws": 0,
    "totalLosses": 0,
    "goalsFavor": 4,
    "goalsOwn": 1,
    "goalsBalance": 3,
    "efficiency": "100.00"
  },
  {
    "name": "Real Brasília",
    "totalPoints": 6,
    "totalGames": 2,
    "totalVictories": 2,
    "totalDraws": 0,
    "totalLosses": 0,
    "goalsFavor": 2,
    "goalsOwn": 0,
    "goalsBalance": 2,
    "efficiency": "100.00"
  },
  {
    "name": "São Paulo",
    "totalPoints": 4,
    "totalGames": 2,
    "totalVictories": 1,
    "totalDraws": 1,
    "totalLosses": 0,
    "goalsFavor": 4,
    "goalsOwn": 1,
    "goalsBalance": 3,
    "efficiency": "66.67"
  },
  {
    "name": "Internacional",
    "totalPoints": 4,
    "totalGames": 3,
    "totalVictories": 1,
    "totalDraws": 1,
    "totalLosses": 1,
    "goalsFavor": 4,
    "goalsOwn": 6,
    "goalsBalance": -2,
    "efficiency": "44.44"
  },
  {
    "name": "Botafogo",
    "totalPoints": 4,
    "totalGames": 3,
    "totalVictories": 1,
    "totalDraws": 1,
    "totalLosses": 1,
    "goalsFavor": 2,
    "goalsOwn": 4,
    "goalsBalance": -2,
    "efficiency": "44.44"
  },
  {
    "name": "Ferroviária",
    "totalPoints": 3,
    "totalGames": 2,
    "totalVictories": 1,
    "totalDraws": 0,
    "totalLosses": 1,
    "goalsFavor": 3,
    "goalsOwn": 2,
    "goalsBalance": 1,
    "efficiency": "50.00"
  },
  {
    "name": "Napoli-SC",
    "totalPoints": 2,
    "totalGames": 2,
    "totalVictories": 0,
    "totalDraws": 2,
    "totalLosses": 0,
    "goalsFavor": 2,
    "goalsOwn": 2,
    "goalsBalance": 0,
    "efficiency": "33.33"
  },
  {
    "name": "Cruzeiro",
    "totalPoints": 1,
    "totalGames": 2,
    "totalVictories": 0,
    "totalDraws": 1,
    "totalLosses": 1,
    "goalsFavor": 2,
    "goalsOwn": 3,
    "goalsBalance": -1,
    "efficiency": "16.67"
  },
  {
    "name": "Flamengo",
    "totalPoints": 1,
    "totalGames": 2,
    "totalVictories": 0,
    "totalDraws": 1,
    "totalLosses": 1,
    "goalsFavor": 1,
    "goalsOwn": 2,
    "goalsBalance": -1,
    "efficiency": "16.67"
  },
  {
    "name": "Minas Brasília",
    "totalPoints": 1,
    "totalGames": 3,
    "totalVictories": 0,
    "totalDraws": 1,
    "totalLosses": 2,
    "goalsFavor": 3,
    "goalsOwn": 6,
    "goalsBalance": -3,
    "efficiency": "11.11"
  },
  {
    "name": "Avaí/Kindermann",
    "totalPoints": 1,
    "totalGames": 3,
    "totalVictories": 0,
    "totalDraws": 1,
    "totalLosses": 2,
    "goalsFavor": 3,
    "goalsOwn": 7,
    "goalsBalance": -4,
    "efficiency": "11.11"
  },
  {
    "name": "São José-SP",
    "totalPoints": 0,
    "totalGames": 3,
    "totalVictories": 0,
    "totalDraws": 0,
    "totalLosses": 3,
    "goalsFavor": 2,
    "goalsOwn": 5,
    "goalsBalance": -3,
    "efficiency": "0.00"
  },
  {
    "name": "Bahia",
    "totalPoints": 0,
    "totalGames": 3,
    "totalVictories": 0,
    "totalDraws": 0,
    "totalLosses": 3,
    "goalsFavor": 0,
    "goalsOwn": 4,
    "goalsBalance": -4,
    "efficiency": "0.00"
  }
]
```
</details>

### 30 - Desenvolva o endpoint `/leaderboard/home` de forma que seja possível filtrar as classificações dos times da casa na tela de classificação do front-end, e atualizar a tabela ao inserir a partida Corinthians 2 X 1 Internacional

  - Será avaliado que após acrescentar a partida Corinthians 2 X 1 Internacional e fazer a requisição ao endpoint `/leaderboard/home`, serão retornados os campos e valores corretos.

<details>
<summary><strong> Retorno esperado: </strong></summary> <br/>

```json
[
  {
    "name": "Santos",
    "totalPoints": 9,
    "totalGames": 3,
    "totalVictories": 3,
    "totalDraws": 0,
    "totalLosses": 0,
    "goalsFavor": 9,
    "goalsOwn": 3,
    "goalsBalance": 6,
    "efficiency": "100.00"
  },
  {
    "name": "Corinthians",
    "totalPoints": 9,
    "totalGames": 3,
    "totalVictories": 3,
    "totalDraws": 0,
    "totalLosses": 0,
    "goalsFavor": 8,
    "goalsOwn": 2,
    "goalsBalance": 6,
    "efficiency": "100.00"
  },
  {
    "name": "Palmeiras",
    "totalPoints": 7,
    "totalGames": 3,
    "totalVictories": 2,
    "totalDraws": 1,
    "totalLosses": 0,
    "goalsFavor": 10,
    "goalsOwn": 5,
    "goalsBalance": 5,
    "efficiency": "77.78"
  },
  {
    "name": "Grêmio",
    "totalPoints": 6,
    "totalGames": 2,
    "totalVictories": 2,
    "totalDraws": 0,
    "totalLosses": 0,
    "goalsFavor": 4,
    "goalsOwn": 1,
    "goalsBalance": 3,
    "efficiency": "100.00"
  },
  {
    "name": "Real Brasília",
    "totalPoints": 6,
    "totalGames": 2,
    "totalVictories": 2,
    "totalDraws": 0,
    "totalLosses": 0,
    "goalsFavor": 2,
    "goalsOwn": 0,
    "goalsBalance": 2,
    "efficiency": "100.00"
  },
  {
    "name": "São Paulo",
    "totalPoints": 4,
    "totalGames": 2,
    "totalVictories": 1,
    "totalDraws": 1,
    "totalLosses": 0,
    "goalsFavor": 4,
    "goalsOwn": 1,
    "goalsBalance": 3,
    "efficiency": "66.67"
  },
  {
    "name": "Internacional",
    "totalPoints": 4,
    "totalGames": 3,
    "totalVictories": 1,
    "totalDraws": 1,
    "totalLosses": 1,
    "goalsFavor": 4,
    "goalsOwn": 6,
    "goalsBalance": -2,
    "efficiency": "44.44"
  },
  {
    "name": "Botafogo",
    "totalPoints": 4,
    "totalGames": 3,
    "totalVictories": 1,
    "totalDraws": 1,
    "totalLosses": 1,
    "goalsFavor": 2,
    "goalsOwn": 4,
    "goalsBalance": -2,
    "efficiency": "44.44"
  },
  {
    "name": "Ferroviária",
    "totalPoints": 3,
    "totalGames": 2,
    "totalVictories": 1,
    "totalDraws": 0,
    "totalLosses": 1,
    "goalsFavor": 3,
    "goalsOwn": 2,
    "goalsBalance": 1,
    "efficiency": "50.00"
  },
  {
    "name": "Napoli-SC",
    "totalPoints": 2,
    "totalGames": 2,
    "totalVictories": 0,
    "totalDraws": 2,
    "totalLosses": 0,
    "goalsFavor": 2,
    "goalsOwn": 2,
    "goalsBalance": 0,
    "efficiency": "33.33"
  },
  {
    "name": "Cruzeiro",
    "totalPoints": 1,
    "totalGames": 2,
    "totalVictories": 0,
    "totalDraws": 1,
    "totalLosses": 1,
    "goalsFavor": 2,
    "goalsOwn": 3,
    "goalsBalance": -1,
    "efficiency": "16.67"
  },
  {
    "name": "Flamengo",
    "totalPoints": 1,
    "totalGames": 2,
    "totalVictories": 0,
    "totalDraws": 1,
    "totalLosses": 1,
    "goalsFavor": 1,
    "goalsOwn": 2,
    "goalsBalance": -1,
    "efficiency": "16.67"
  },
  {
    "name": "Minas Brasília",
    "totalPoints": 1,
    "totalGames": 3,
    "totalVictories": 0,
    "totalDraws": 1,
    "totalLosses": 2,
    "goalsFavor": 3,
    "goalsOwn": 6,
    "goalsBalance": -3,
    "efficiency": "11.11"
  },
  {
    "name": "Avaí/Kindermann",
    "totalPoints": 1,
    "totalGames": 3,
    "totalVictories": 0,
    "totalDraws": 1,
    "totalLosses": 2,
    "goalsFavor": 3,
    "goalsOwn": 7,
    "goalsBalance": -4,
    "efficiency": "11.11"
  },
  {
    "name": "São José-SP",
    "totalPoints": 0,
    "totalGames": 3,
    "totalVictories": 0,
    "totalDraws": 0,
    "totalLosses": 3,
    "goalsFavor": 2,
    "goalsOwn": 5,
    "goalsBalance": -3,
    "efficiency": "0.00"
  },
  {
    "name": "Bahia",
    "totalPoints": 0,
    "totalGames": 3,
    "totalVictories": 0,
    "totalDraws": 0,
    "totalLosses": 3,
    "goalsFavor": 0,
    "goalsOwn": 4,
    "goalsBalance": -4,
    "efficiency": "0.00"
  }
]
```
</details>

## Leaderboard away

### 31 - Desenvolva o endpoint `/leaderboard/away`, de forma que seja possível filtrar as classificações dos times quando visitantes na tela de classificação do front-end, com os dados iniciais do banco de dados

  - O endpoint deverá ser do tipo `GET`;

  - Será avaliado que ao fazer a requisição ao endpoint `/leaderboard/away`, serão retornados os campos e valores corretos considerando os dados iniciais do banco de dados;

  - Partidas que estiverem em andamento (não foram finalizadas) não devem ser consideradas.

<details>
<summary><strong> Retorno esperado: </strong></summary> <br/>

```json
[
  {
    "name": "Palmeiras",
    "totalPoints": 6,
    "totalGames": 2,
    "totalVictories": 2,
    "totalDraws": 0,
    "totalLosses": 0,
    "goalsFavor": 7,
    "goalsOwn": 0,
    "goalsBalance": 7,
    "efficiency": "100.00"
  },
  {
    "name": "Corinthians",
    "totalPoints": 6,
    "totalGames": 3,
    "totalVictories": 2,
    "totalDraws": 0,
    "totalLosses": 1,
    "goalsFavor": 6,
    "goalsOwn": 2,
    "goalsBalance": 4,
    "efficiency": "66.67"
  },
  {
    "name": "Internacional",
    "totalPoints": 6,
    "totalGames": 2,
    "totalVictories": 2,
    "totalDraws": 0,
    "totalLosses": 0,
    "goalsFavor": 3,
    "goalsOwn": 0,
    "goalsBalance": 3,
    "efficiency": "100.00"
  },
  {
    "name": "São José-SP",
    "totalPoints": 6,
    "totalGames": 2,
    "totalVictories": 2,
    "totalDraws": 0,
    "totalLosses": 0,
    "goalsFavor": 3,
    "goalsOwn": 1,
    "goalsBalance": 2,
    "efficiency": "100.00"
  },
  {
    "name": "São Paulo",
    "totalPoints": 4,
    "totalGames": 3,
    "totalVictories": 1,
    "totalDraws": 1,
    "totalLosses": 1,
    "goalsFavor": 5,
    "goalsOwn": 5,
    "goalsBalance": 0,
    "efficiency": "44.44"
  },
  {
    "name": "Ferroviária",
    "totalPoints": 4,
    "totalGames": 3,
    "totalVictories": 1,
    "totalDraws": 1,
    "totalLosses": 1,
    "goalsFavor": 4,
    "goalsOwn": 5,
    "goalsBalance": -1,
    "efficiency": "44.44"
  },
  {
    "name": "Real Brasília",
    "totalPoints": 4,
    "totalGames": 3,
    "totalVictories": 1,
    "totalDraws": 1,
    "totalLosses": 1,
    "goalsFavor": 3,
    "goalsOwn": 4,
    "goalsBalance": -1,
    "efficiency": "44.44"
  },
  {
    "name": "Grêmio",
    "totalPoints": 4,
    "totalGames": 3,
    "totalVictories": 1,
    "totalDraws": 1,
    "totalLosses": 1,
    "goalsFavor": 5,
    "goalsOwn": 7,
    "goalsBalance": -2,
    "efficiency": "44.44"
  },
  {
    "name": "Flamengo",
    "totalPoints": 4,
    "totalGames": 3,
    "totalVictories": 1,
    "totalDraws": 1,
    "totalLosses": 1,
    "goalsFavor": 1,
    "goalsOwn": 3,
    "goalsBalance": -2,
    "efficiency": "44.44"
  },
  {
    "name": "Avaí/Kindermann",
    "totalPoints": 3,
    "totalGames": 2,
    "totalVictories": 1,
    "totalDraws": 0,
    "totalLosses": 1,
    "goalsFavor": 1,
    "goalsOwn": 1,
    "goalsBalance": 0,
    "efficiency": "50.00"
  },
  {
    "name": "Cruzeiro",
    "totalPoints": 3,
    "totalGames": 3,
    "totalVictories": 1,
    "totalDraws": 0,
    "totalLosses": 2,
    "goalsFavor": 6,
    "goalsOwn": 7,
    "goalsBalance": -1,
    "efficiency": "33.33"
  },
  {
    "name": "Santos",
    "totalPoints": 2,
    "totalGames": 2,
    "totalVictories": 0,
    "totalDraws": 2,
    "totalLosses": 0,
    "goalsFavor": 3,
    "goalsOwn": 3,
    "goalsBalance": 0,
    "efficiency": "33.33"
  },
  {
    "name": "Bahia",
    "totalPoints": 2,
    "totalGames": 2,
    "totalVictories": 0,
    "totalDraws": 2,
    "totalLosses": 0,
    "goalsFavor": 2,
    "goalsOwn": 2,
    "goalsBalance": 0,
    "efficiency": "33.33"
  },
  {
    "name": "Minas Brasília",
    "totalPoints": 1,
    "totalGames": 2,
    "totalVictories": 0,
    "totalDraws": 1,
    "totalLosses": 1,
    "goalsFavor": 1,
    "goalsOwn": 3,
    "goalsBalance": -2,
    "efficiency": "16.67"
  },
  {
    "name": "Botafogo",
    "totalPoints": 0,
    "totalGames": 2,
    "totalVictories": 0,
    "totalDraws": 0,
    "totalLosses": 2,
    "goalsFavor": 1,
    "goalsOwn": 4,
    "goalsBalance": -3,
    "efficiency": "0.00"
  },
  {
    "name": "Napoli-SC",
    "totalPoints": 0,
    "totalGames": 3,
    "totalVictories": 0,
    "totalDraws": 0,
    "totalLosses": 3,
    "goalsFavor": 1,
    "goalsOwn": 10,
    "goalsBalance": -9,
    "efficiency": "0.00"
  }
]
```
</details>

### 32 - Desenvolva o endpoint `/leaderboard/away` de forma que seja possível filtrar as classificações dos times quando visitantes na tela de classificação do front-end e atualizar a tabela ao inserir a partida Corinthians 2 X 1 Internacional

  - Será avaliado que após acrescentar a partida Corinthians 2 X 1 Internacional e fazer a requisição ao endpoint `/leaderboard/away`, serão retornados os campos e valores corretos.

<details>
<summary><strong> Retorno esperado: </strong></summary> <br/>

```json
[
  {
    "name": "Palmeiras",
    "totalPoints": 6,
    "totalGames": 2,
    "totalVictories": 2,
    "totalDraws": 0,
    "totalLosses": 0,
    "goalsFavor": 7,
    "goalsOwn": 0,
    "goalsBalance": 7,
    "efficiency": "100.00"
  },
  {
    "name": "Corinthians",
    "totalPoints": 6,
    "totalGames": 3,
    "totalVictories": 2,
    "totalDraws": 0,
    "totalLosses": 1,
    "goalsFavor": 6,
    "goalsOwn": 2,
    "goalsBalance": 4,
    "efficiency": "66.67"
  },
  {
    "name": "Internacional",
    "totalPoints": 6,
    "totalGames": 3,
    "totalVictories": 2,
    "totalDraws": 0,
    "totalLosses": 1,
    "goalsFavor": 4,
    "goalsOwn": 2,
    "goalsBalance": 2,
    "efficiency": "66.67"
  },
  {
    "name": "São José-SP",
    "totalPoints": 6,
    "totalGames": 2,
    "totalVictories": 2,
    "totalDraws": 0,
    "totalLosses": 0,
    "goalsFavor": 3,
    "goalsOwn": 1,
    "goalsBalance": 2,
    "efficiency": "100.00"
  },
  {
    "name": "São Paulo",
    "totalPoints": 4,
    "totalGames": 3,
    "totalVictories": 1,
    "totalDraws": 1,
    "totalLosses": 1,
    "goalsFavor": 5,
    "goalsOwn": 5,
    "goalsBalance": 0,
    "efficiency": "44.44"
  },
  {
    "name": "Ferroviária",
    "totalPoints": 4,
    "totalGames": 3,
    "totalVictories": 1,
    "totalDraws": 1,
    "totalLosses": 1,
    "goalsFavor": 4,
    "goalsOwn": 5,
    "goalsBalance": -1,
    "efficiency": "44.44"
  },
  {
    "name": "Real Brasília",
    "totalPoints": 4,
    "totalGames": 3,
    "totalVictories": 1,
    "totalDraws": 1,
    "totalLosses": 1,
    "goalsFavor": 3,
    "goalsOwn": 4,
    "goalsBalance": -1,
    "efficiency": "44.44"
  },
  {
    "name": "Grêmio",
    "totalPoints": 4,
    "totalGames": 3,
    "totalVictories": 1,
    "totalDraws": 1,
    "totalLosses": 1,
    "goalsFavor": 5,
    "goalsOwn": 7,
    "goalsBalance": -2,
    "efficiency": "44.44"
  },
  {
    "name": "Flamengo",
    "totalPoints": 4,
    "totalGames": 3,
    "totalVictories": 1,
    "totalDraws": 1,
    "totalLosses": 1,
    "goalsFavor": 1,
    "goalsOwn": 3,
    "goalsBalance": -2,
    "efficiency": "44.44"
  },
  {
    "name": "Avaí/Kindermann",
    "totalPoints": 3,
    "totalGames": 2,
    "totalVictories": 1,
    "totalDraws": 0,
    "totalLosses": 1,
    "goalsFavor": 1,
    "goalsOwn": 1,
    "goalsBalance": 0,
    "efficiency": "50.00"
  },
  {
    "name": "Cruzeiro",
    "totalPoints": 3,
    "totalGames": 3,
    "totalVictories": 1,
    "totalDraws": 0,
    "totalLosses": 2,
    "goalsFavor": 6,
    "goalsOwn": 7,
    "goalsBalance": -1,
    "efficiency": "33.33"
  },
  {
    "name": "Santos",
    "totalPoints": 2,
    "totalGames": 2,
    "totalVictories": 0,
    "totalDraws": 2,
    "totalLosses": 0,
    "goalsFavor": 3,
    "goalsOwn": 3,
    "goalsBalance": 0,
    "efficiency": "33.33"
  },
  {
    "name": "Bahia",
    "totalPoints": 2,
    "totalGames": 2,
    "totalVictories": 0,
    "totalDraws": 2,
    "totalLosses": 0,
    "goalsFavor": 2,
    "goalsOwn": 2,
    "goalsBalance": 0,
    "efficiency": "33.33"
  },
  {
    "name": "Minas Brasília",
    "totalPoints": 1,
    "totalGames": 2,
    "totalVictories": 0,
    "totalDraws": 1,
    "totalLosses": 1,
    "goalsFavor": 1,
    "goalsOwn": 3,
    "goalsBalance": -2,
    "efficiency": "16.67"
  },
  {
    "name": "Botafogo",
    "totalPoints": 0,
    "totalGames": 2,
    "totalVictories": 0,
    "totalDraws": 0,
    "totalLosses": 2,
    "goalsFavor": 1,
    "goalsOwn": 4,
    "goalsBalance": -3,
    "efficiency": "0.00"
  },
  {
    "name": "Napoli-SC",
    "totalPoints": 0,
    "totalGames": 3,
    "totalVictories": 0,
    "totalDraws": 0,
    "totalLosses": 3,
    "goalsFavor": 1,
    "goalsOwn": 10,
    "goalsBalance": -9,
    "efficiency": "0.00"
  }
]
```
</details>

## Leaderboard

### 33 - Desenvolva o endpoint `/leaderboard` de forma que seja possível filtrar a classificação geral dos times na tela de classificação do front-end com os dados iniciais do banco de dados

  - O endpoint deverá ser do tipo `GET`;

  - Será avaliado que ao fazer a requisição ao endpoint `/leaderboard`, serão retornados os campos e valores corretos considerando os dados iniciais do banco de dados.

  - Partidas que estiverem em andamento (não foram finalizadas) não devem ser consideradas.

<details>
<summary><strong> Retorno esperado: </strong></summary> <br/>

```json
[
  {
    "name": "Palmeiras",
    "totalPoints": 13,
    "totalGames": 5,
    "totalVictories": 4,
    "totalDraws": 1,
    "totalLosses": 0,
    "goalsFavor": 17,
    "goalsOwn": 5,
    "goalsBalance": 12,
    "efficiency": "86.67"
  },
  {
    "name": "Corinthians",
    "totalPoints": 12,
    "totalGames": 5,
    "totalVictories": 4,
    "totalDraws": 0,
    "totalLosses": 1,
    "goalsFavor": 12,
    "goalsOwn": 3,
    "goalsBalance": 9,
    "efficiency": "80.00"
  },
  {
    "name": "Santos",
    "totalPoints": 11,
    "totalGames": 5,
    "totalVictories": 3,
    "totalDraws": 2,
    "totalLosses": 0,
    "goalsFavor": 12,
    "goalsOwn": 6,
    "goalsBalance": 6,
    "efficiency": "73.33"
  },
  {
    "name": "Grêmio",
    "totalPoints": 10,
    "totalGames": 5,
    "totalVictories": 3,
    "totalDraws": 1,
    "totalLosses": 1,
    "goalsFavor": 9,
    "goalsOwn": 8,
    "goalsBalance": 1,
    "efficiency": "66.67"
  },
  {
    "name": "Internacional",
    "totalPoints": 10,
    "totalGames": 5,
    "totalVictories": 3,
    "totalDraws": 1,
    "totalLosses": 1,
    "goalsFavor": 7,
    "goalsOwn": 6,
    "goalsBalance": 1,
    "efficiency": "66.67"
  },
  {
    "name": "Real Brasília",
    "totalPoints": 10,
    "totalGames": 5,
    "totalVictories": 3,
    "totalDraws": 1,
    "totalLosses": 1,
    "goalsFavor": 5,
    "goalsOwn": 4,
    "goalsBalance": 1,
    "efficiency": "66.67"
  },
  {
    "name": "São Paulo",
    "totalPoints": 8,
    "totalGames": 5,
    "totalVictories": 2,
    "totalDraws": 2,
    "totalLosses": 1,
    "goalsFavor": 9,
    "goalsOwn": 6,
    "goalsBalance": 3,
    "efficiency": "53.33"
  },
  {
    "name": "Ferroviária",
    "totalPoints": 7,
    "totalGames": 5,
    "totalVictories": 2,
    "totalDraws": 1,
    "totalLosses": 2,
    "goalsFavor": 7,
    "goalsOwn": 7,
    "goalsBalance": 0,
    "efficiency": "46.67"
  },
  {
    "name": "São José-SP",
    "totalPoints": 6,
    "totalGames": 5,
    "totalVictories": 2,
    "totalDraws": 0,
    "totalLosses": 3,
    "goalsFavor": 5,
    "goalsOwn": 6,
    "goalsBalance": -1,
    "efficiency": "40.00"
  },
  {
    "name": "Flamengo",
    "totalPoints": 5,
    "totalGames": 5,
    "totalVictories": 1,
    "totalDraws": 2,
    "totalLosses": 2,
    "goalsFavor": 2,
    "goalsOwn": 5,
    "goalsBalance": -3,
    "efficiency": "33.33"
  },
  {
    "name": "Cruzeiro",
    "totalPoints": 4,
    "totalGames": 5,
    "totalVictories": 1,
    "totalDraws": 1,
    "totalLosses": 3,
    "goalsFavor": 8,
    "goalsOwn": 10,
    "goalsBalance": -2,
    "efficiency": "26.67"
  },
  {
    "name": "Avaí/Kindermann",
    "totalPoints": 4,
    "totalGames": 5,
    "totalVictories": 1,
    "totalDraws": 1,
    "totalLosses": 3,
    "goalsFavor": 4,
    "goalsOwn": 8,
    "goalsBalance": -4,
    "efficiency": "26.67"
  },
  {
    "name": "Botafogo",
    "totalPoints": 4,
    "totalGames": 5,
    "totalVictories": 1,
    "totalDraws": 1,
    "totalLosses": 3,
    "goalsFavor": 3,
    "goalsOwn": 8,
    "goalsBalance": -5,
    "efficiency": "26.67"
  },
  {
    "name": "Bahia",
    "totalPoints": 2,
    "totalGames": 5,
    "totalVictories": 0,
    "totalDraws": 2,
    "totalLosses": 3,
    "goalsFavor": 2,
    "goalsOwn": 6,
    "goalsBalance": -4,
    "efficiency": "13.33"
  },
  {
    "name": "Minas Brasília",
    "totalPoints": 2,
    "totalGames": 5,
    "totalVictories": 0,
    "totalDraws": 2,
    "totalLosses": 3,
    "goalsFavor": 4,
    "goalsOwn": 9,
    "goalsBalance": -5,
    "efficiency": "13.33"
  },
  {
    "name": "Napoli-SC",
    "totalPoints": 2,
    "totalGames": 5,
    "totalVictories": 0,
    "totalDraws": 2,
    "totalLosses": 3,
    "goalsFavor": 3,
    "goalsOwn": 12,
    "goalsBalance": -9,
    "efficiency": "13.33"
  }
]
```
</details>

### 34 - Desenvolva o endpoint /leaderboard de forma que seja possível filtrar a classificação geral dos times na tela de classificação do front-end e atualizar a tabela ao inserir a partida Flamengo 3 X 0 Napoli-SC

  - Será avaliado que após acrescentar a partida Flamengo 3 X 0 Napoli-SC e fazer a requisição ao endpoint /leaderboard, serão retornados os campos e valores corretos.

<details>
<summary><strong> Retorno esperado: </strong></summary> <br/>

```json
[
  {
    "name": "Palmeiras",
    "totalPoints": 13,
    "totalGames": 5,
    "totalVictories": 4,
    "totalDraws": 1,
    "totalLosses": 0,
    "goalsFavor": 17,
    "goalsOwn": 5,
    "goalsBalance": 12,
    "efficiency": "86.67"
  },
  {
    "name": "Corinthians",
    "totalPoints": 12,
    "totalGames": 5,
    "totalVictories": 4,
    "totalDraws": 0,
    "totalLosses": 1,
    "goalsFavor": 12,
    "goalsOwn": 3,
    "goalsBalance": 9,
    "efficiency": "80.00"
  },
  {
    "name": "Santos",
    "totalPoints": 11,
    "totalGames": 5,
    "totalVictories": 3,
    "totalDraws": 2,
    "totalLosses": 0,
    "goalsFavor": 12,
    "goalsOwn": 6,
    "goalsBalance": 6,
    "efficiency": "73.33"
  },
  {
    "name": "Grêmio",
    "totalPoints": 10,
    "totalGames": 5,
    "totalVictories": 3,
    "totalDraws": 1,
    "totalLosses": 1,
    "goalsFavor": 9,
    "goalsOwn": 8,
    "goalsBalance": 1,
    "efficiency": "66.67"
  },
  {
    "name": "Internacional",
    "totalPoints": 10,
    "totalGames": 5,
    "totalVictories": 3,
    "totalDraws": 1,
    "totalLosses": 1,
    "goalsFavor": 7,
    "goalsOwn": 6,
    "goalsBalance": 1,
    "efficiency": "66.67"
  },
  {
    "name": "Real Brasília",
    "totalPoints": 10,
    "totalGames": 5,
    "totalVictories": 3,
    "totalDraws": 1,
    "totalLosses": 1,
    "goalsFavor": 5,
    "goalsOwn": 4,
    "goalsBalance": 1,
    "efficiency": "66.67"
  },
  {
    "name": "São Paulo",
    "totalPoints": 8,
    "totalGames": 5,
    "totalVictories": 2,
    "totalDraws": 2,
    "totalLosses": 1,
    "goalsFavor": 9,
    "goalsOwn": 6,
    "goalsBalance": 3,
    "efficiency": "53.33"
  },
  {
    "name": "Flamengo",
    "totalPoints": 8,
    "totalGames": 6,
    "totalVictories": 2,
    "totalDraws": 2,
    "totalLosses": 2,
    "goalsFavor": 5,
    "goalsOwn": 5,
    "goalsBalance": 0,
    "efficiency": "44.44"
  },
  {
    "name": "Ferroviária",
    "totalPoints": 7,
    "totalGames": 5,
    "totalVictories": 2,
    "totalDraws": 1,
    "totalLosses": 2,
    "goalsFavor": 7,
    "goalsOwn": 7,
    "goalsBalance": 0,
    "efficiency": "46.67"
  },
  {
    "name": "São José-SP",
    "totalPoints": 6,
    "totalGames": 5,
    "totalVictories": 2,
    "totalDraws": 0,
    "totalLosses": 3,
    "goalsFavor": 5,
    "goalsOwn": 6,
    "goalsBalance": -1,
    "efficiency": "40.00"
  },
  {
    "name": "Cruzeiro",
    "totalPoints": 4,
    "totalGames": 5,
    "totalVictories": 1,
    "totalDraws": 1,
    "totalLosses": 3,
    "goalsFavor": 8,
    "goalsOwn": 10,
    "goalsBalance": -2,
    "efficiency": "26.67"
  },
  {
    "name": "Avaí/Kindermann",
    "totalPoints": 4,
    "totalGames": 5,
    "totalVictories": 1,
    "totalDraws": 1,
    "totalLosses": 3,
    "goalsFavor": 4,
    "goalsOwn": 8,
    "goalsBalance": -4,
    "efficiency": "26.67"
  },
  {
    "name": "Botafogo",
    "totalPoints": 4,
    "totalGames": 5,
    "totalVictories": 1,
    "totalDraws": 1,
    "totalLosses": 3,
    "goalsFavor": 3,
    "goalsOwn": 8,
    "goalsBalance": -5,
    "efficiency": "26.67"
  },
  {
    "name": "Bahia",
    "totalPoints": 2,
    "totalGames": 5,
    "totalVictories": 0,
    "totalDraws": 2,
    "totalLosses": 3,
    "goalsFavor": 2,
    "goalsOwn": 6,
    "goalsBalance": -4,
    "efficiency": "13.33"
  },
  {
    "name": "Minas Brasília",
    "totalPoints": 2,
    "totalGames": 5,
    "totalVictories": 0,
    "totalDraws": 2,
    "totalLosses": 3,
    "goalsFavor": 4,
    "goalsOwn": 9,
    "goalsBalance": -5,
    "efficiency": "13.33"
  },
  {
    "name": "Napoli-SC",
    "totalPoints": 2,
    "totalGames": 6,
    "totalVictories": 0,
    "totalDraws": 2,
    "totalLosses": 4,
    "goalsFavor": 3,
    "goalsOwn": 15,
    "goalsBalance": -12,
    "efficiency": "11.11"
  }
]
```
</details>

### 35 - Desenvolva o endpoint /leaderboard de forma que seja possível filtrar a classificação geral dos times na tela de classificação do front-end e atualizar a tabela ao inserir a partida Minas Brasília 1 X 0 Ferroviária

  - Será avaliado que após acrescentar a partida Minas Brasília 1 X 0 Ferroviária e fazer a requisição ao endpoint /leaderboard, serão retornados os campos e valores corretos.

<details>
<summary><strong> Retorno esperado: </strong></summary> <br/>

```json
[
  {
    "name": "Palmeiras",
    "totalPoints": 13,
    "totalGames": 5,
    "totalVictories": 4,
    "totalDraws": 1,
    "totalLosses": 0,
    "goalsFavor": 17,
    "goalsOwn": 5,
    "goalsBalance": 12,
    "efficiency": "86.67"
  },
  {
    "name": "Corinthians",
    "totalPoints": 12,
    "totalGames": 5,
    "totalVictories": 4,
    "totalDraws": 0,
    "totalLosses": 1,
    "goalsFavor": 12,
    "goalsOwn": 3,
    "goalsBalance": 9,
    "efficiency": "80.00"
  },
  {
    "name": "Santos",
    "totalPoints": 11,
    "totalGames": 5,
    "totalVictories": 3,
    "totalDraws": 2,
    "totalLosses": 0,
    "goalsFavor": 12,
    "goalsOwn": 6,
    "goalsBalance": 6,
    "efficiency": "73.33"
  },
  {
    "name": "Grêmio",
    "totalPoints": 10,
    "totalGames": 5,
    "totalVictories": 3,
    "totalDraws": 1,
    "totalLosses": 1,
    "goalsFavor": 9,
    "goalsOwn": 8,
    "goalsBalance": 1,
    "efficiency": "66.67"
  },
  {
    "name": "Internacional",
    "totalPoints": 10,
    "totalGames": 5,
    "totalVictories": 3,
    "totalDraws": 1,
    "totalLosses": 1,
    "goalsFavor": 7,
    "goalsOwn": 6,
    "goalsBalance": 1,
    "efficiency": "66.67"
  },
  {
    "name": "Real Brasília",
    "totalPoints": 10,
    "totalGames": 5,
    "totalVictories": 3,
    "totalDraws": 1,
    "totalLosses": 1,
    "goalsFavor": 5,
    "goalsOwn": 4,
    "goalsBalance": 1,
    "efficiency": "66.67"
  },
  {
    "name": "São Paulo",
    "totalPoints": 8,
    "totalGames": 5,
    "totalVictories": 2,
    "totalDraws": 2,
    "totalLosses": 1,
    "goalsFavor": 9,
    "goalsOwn": 6,
    "goalsBalance": 3,
    "efficiency": "53.33"
  },
  {
    "name": "Ferroviária",
    "totalPoints": 7,
    "totalGames": 6,
    "totalVictories": 2,
    "totalDraws": 1,
    "totalLosses": 3,
    "goalsFavor": 7,
    "goalsOwn": 8,
    "goalsBalance": -1,
    "efficiency": "38.89"
  },
  {
    "name": "São José-SP",
    "totalPoints": 6,
    "totalGames": 5,
    "totalVictories": 2,
    "totalDraws": 0,
    "totalLosses": 3,
    "goalsFavor": 5,
    "goalsOwn": 6,
    "goalsBalance": -1,
    "efficiency": "40.00"
  },
  {
    "name": "Flamengo",
    "totalPoints": 5,
    "totalGames": 5,
    "totalVictories": 1,
    "totalDraws": 2,
    "totalLosses": 2,
    "goalsFavor": 2,
    "goalsOwn": 5,
    "goalsBalance": -3,
    "efficiency": "33.33"
  },
  {
    "name": "Minas Brasília",
    "totalPoints": 5,
    "totalGames": 6,
    "totalVictories": 1,
    "totalDraws": 2,
    "totalLosses": 3,
    "goalsFavor": 5,
    "goalsOwn": 9,
    "goalsBalance": -4,
    "efficiency": "27.78"
  },
  {
    "name": "Cruzeiro",
    "totalPoints": 4,
    "totalGames": 5,
    "totalVictories": 1,
    "totalDraws": 1,
    "totalLosses": 3,
    "goalsFavor": 8,
    "goalsOwn": 10,
    "goalsBalance": -2,
    "efficiency": "26.67"
  },
  {
    "name": "Avaí/Kindermann",
    "totalPoints": 4,
    "totalGames": 5,
    "totalVictories": 1,
    "totalDraws": 1,
    "totalLosses": 3,
    "goalsFavor": 4,
    "goalsOwn": 8,
    "goalsBalance": -4,
    "efficiency": "26.67"
  },
  {
    "name": "Botafogo",
    "totalPoints": 4,
    "totalGames": 5,
    "totalVictories": 1,
    "totalDraws": 1,
    "totalLosses": 3,
    "goalsFavor": 3,
    "goalsOwn": 8,
    "goalsBalance": -5,
    "efficiency": "26.67"
  },
  {
    "name": "Bahia",
    "totalPoints": 2,
    "totalGames": 5,
    "totalVictories": 0,
    "totalDraws": 2,
    "totalLosses": 3,
    "goalsFavor": 2,
    "goalsOwn": 6,
    "goalsBalance": -4,
    "efficiency": "13.33"
  },
  {
    "name": "Napoli-SC",
    "totalPoints": 2,
    "totalGames": 5,
    "totalVictories": 0,
    "totalDraws": 2,
    "totalLosses": 3,
    "goalsFavor": 3,
    "goalsOwn": 12,
    "goalsBalance": -9,
    "efficiency": "13.33"
  }
]
```
</details>

</details>

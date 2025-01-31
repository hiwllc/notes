# overnotes
> Desafio técnico

## Sobre a aplicação
Overnotes é uma aplicação de gerenciamento de notas, onde os usuários podem criar, editar, exlcuir, as notas podem ser públicas ou privadas
também é possível o compartilhamento de notas privadas com outros usuários.

## Observações
Vou deixar algumas observações mais pontuais sobre algumas decisões de estrutura e organização do projeto.

1. Començando pelas actions, idealmente eu manteria elas próximas da rota em que elas são utilizadas no contexto desse projeto teriamos algo
como: `/app/notes/actions/*` porém como eu optei por deixar as notas em `/` e `/me` para evitar deixar as actions separadas eu preferi agrupa-lás.
2. Ainda sobre as actions, olhando o código é possível perceber que eu utilizei 3 formas diferentes, em algumas eu recebo apenas um objeto como argumento,
em outro caso eu recebo dois argumentos `(_: unknown, formData: FormData)` e em outros apenas o FormData, eu fiz dessa forma porque em cada contexto utilizado
acredito que sirva melhor, explico:
  - No action de [tema](./actions/theme.ts) eu não preciso de um feedback direto do client pois eu uso o valor do cookie para definir entre tema claro/escuro, então
esse feedback já existe, e como eu não preciso de um formulário para gerenciar dados complexos, apenas passando a action direto pro form já resolve o problema.
  - Nos actions de [criar](./actions/create-note.ts) e [editar](./actions/update-note.ts) as notas eu recebo como argumento apenas um objeto definido com um,
schema do zod (eu uso ele pra validação de dados com react-hook-form e para validação de erros no server com o `safeParse`) neste caso como eu preciso lidar com dados
em teoria mais 'complexos' eu preferi usar o react-hook-form para gerenciar o estado do formulário e facilitar a validação, como boa prática essas actions não
retornam _(com execessão a action de criar, explico no item 3)_ e em apenas fazem um redirect para o recurso criado/alterado.
  - As actions de [publicar](./actions/publish-note.ts), [deletar](./actions/delete-note.ts) e [gerar o link de compartilhamento](./actions/create-note-link.ts)
eu recebo apenas o FormData como argumento, elas não necessitam de dados complexos, porém diferente da action que lida com o tema, eu preciso de um feedback para
o usuário indicando que alguma ação está ocorrendo, por isso utilizei o `useFormState` (agora renomeado para useActionState no React 15), porque assim consigo
lidar com o estado de `pending` (ou loading) enquanto a ação ocorre.
3. A action de criar a nota, eu uso um `upsert` porque achei melhor do que criar um action que faria a mesma coisa para utilizar no autosave.
4. No componente do [Editor](./components/editor.tsx) eu utilizei o hook `useImperativeHandler` pra poder chamar uma função do `editor` (`useEditor` do TipTap) no
componente de pai (formulário), o problema é que quando eu (ou um usuário) acesso o `/create` para criar uma nova nota, e existe uma com o status de `DRAFT`
(nota que foi salva pelo auto save), eu queria usar os valores dessa nota já disponível no formulário, porém, se o usuário quiser descartar essa e começar outra eu
precisava resetar os valores do form, porém o Editor não lidava com essa mudança e não resetava o seu value, a solução que eu encontrei foi usar o `useImperativeHandler`
deixando como ref uma função `update` que chama o `editor.commands.setValue()` (não sei se consegui explicar direito essa parte.)
5. Em último só queria explicar o uso da dependência `@paralleldrive/cuid2`, bem eu poderia escrever uma função que só retornasse um texto de 8 caracteres com
strings aleatórias, mas ai eu precisaria manualmente lidar com possíveis duplicidade, como a biblioteca já trata isso, achei melhor e mais simples optar por ela.

Agora eu gostaria de falar o que eu acredito que falta, ou que eu gostaria de implementar para deixar essa aplicação pronta para produção.

Acredito que a primeira coisa que eu faria seria escrever testes e2e com playwright, dessa forma seria simples validar o fluxo do usuário e poderia detectar,
possíveis bugs e problemas de usabilidade, além de validar a acessibilidade da aplicação, eu também tentaria abstrair melhor o uso de queries para tentar
evitar algumas repetições, talvez centralizar todas as queries em algo como `models/notes.ts` e aqui deixar os tipos e queries.

Além dos testes eu também adicionaria mais funcionalidades no editor (eu deixei poucas opções de formatação apenas para não tomar muito tempo do desenvolvimento), mas
certamente gostaria de ter um editor com mais funcionalidades, links, tabela, imagems, código, etc.

Eu também acredito que seria interessante, curtir e comentar notas públicas ou compartilhadas.

Enfim, era isso, qualquer dúvida fico a disposição.

### Executando localmente
1. Clone o repositório
2. Copie o arquivo `.env.example` para `.env`: `cp .env.example .env`
3. Se necessário altere os valores das váriaves de ambiente, como estamos usando docker para o banco de dados as informações já devem estar corretas.
3. Rode o comando `npm install` para instalar as dependências
4. Rode o comando `docker-compose up -d` para subir o banco de dados em um container
5. Rode o comando `npx prisma migrate dev` para executar as migrations do banco de dados
6. Rode o comando `npm run dev` para executar a aplicação
7. Sua aplicação deve estar disponível em http://localhost:3000

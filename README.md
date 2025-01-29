# Como executar a aplicação

1. Clone o repositório
2. Rode o comando `npm install` para instalar as dependências
3. Copie o arquivo `.env.example` para `.env` e preencha com as informações do seu ambiente
4. Rode o comando `docker-compose up -d` para subir o banco de dados em um container
5. Rode o comando `npx prisma migrate dev` para executar as migrations do banco de dados
6. Rode o comando `npm run dev` para executar a aplicação

# Desafio Técnico Dev Fullstack - Overlens

Disponível em: [desafio-tecnico.md](./desafio-tecnico.md)

Caso precisem de ajuda, ou tenham alguma sugestão, podem entrar em contato através:

- Email: [pessoas@overlens.com.br](mailto:pessoas@overlens.com.br)
- WhatsApp: [+5531996191047](https://wa.me/5531996191047)

## TODO
Editor Rich Text WYSIWYG
Autosave durante edição
Feed de anotações geral
Feed de anotações do usuário
Visibilidade pública/privada
Link de acesso público para a anotação

-> Rotas
 -> / lista o feed público
 -> /login
 -> /signup
 -> /me (perfil do usuário com as notas dele)
 -> /:id (id publico de uma nota)

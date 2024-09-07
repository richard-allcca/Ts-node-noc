# NOC

Network Operation Center

> Permite mantener escucha de un servicio en este caso una url, emite un mensaje cada tiempo definido con mensajes de ok o error

## Run project

`Node 18.17.1`

- Clonar .example.env a .env
- Configurar variables de entorno
- Levantar los contenedores ***docker compose up -a***
- Prisma reset:

```bash
      # DB en carpetas locales
      npx prisma migrate dev
```

## Ejemplos de formato ISO  para temporizador

```js
      '* * * * * *', // cronTime
      `*/3 * * * * *`, // Esto significa "cada 3 segundos"
      '0 * * * *', // Esto significa "al inicio de cada hora"
      '/25 * * * *', // Esto significa "cada 25 minutos"
      '0 4 * * *', // Esto significa "a las 4 horas del día"
```

[More Examples of cron](https://github.com/kelektiv/node-cron/tree/main/examples)

## Configuración de Prisma

```bash
      npm install prisma --save-dev

      npx prisma init --datasource-provider postgres

      # crea tu schema en /schema.prisma

      npx prisma migrate dev --name init
```

## Resources

- Node mailer [Documentación](https://nodemailer.com/)
- Mongoose [Documentación](https://mongoosejs.com/)
- Prisma [Documentación](https://www.prisma.io/docs/getting-started/quickstart)

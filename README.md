# NOC

Network Operation Center

> Permite mantener escucha de un servicio en este caso una url, emite un mensaje cada tiempo definido con mensajes de ok o error

## Run project

`Node 18.17.1`
Clonar .example.env a .env
Configurar variables de entorno

> Para trabajar con mongo necesitas correr el comando ***docker compose up -a***
> También necesitas activar la conexión a la db en app.ts

## Ejemplos de formato ISO  para temporizador

```js
      '* * * * * *', // cronTime
      `*/3 * * * * *`, // Esto significa "cada 3 segundos"
      '0 * * * *', // Esto significa "al inicio de cada hora"
      '/25 * * * *', // Esto significa "cada 25 minutos"
      '0 4 * * *', // Esto significa "a las 4 horas del día"
```

[More Examples of cron](https://github.com/kelektiv/node-cron/tree/main/examples)

## Resources

- Node mailer [Link](https://nodemailer.com/)
- Mongoose [Link](https://mongoosejs.com/)

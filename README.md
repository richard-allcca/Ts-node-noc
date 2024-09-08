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

## Test

Pasos para configurar Jest con TypeScript, en Node

```bash
      npm install -D jest @types/jest ts-jest supertest
```

Crear archivo de configuración de Jest

```bash
      npm jest --init
```

crear script 'yes'
usar typescript 'yes'
elegir entorno de desarrollo 'node'
quieres agregar reportes de coverage 'yes'
proveedor para código de cobertura 'v8'
limpiar los mocks en automático 'no'

En el archivo jest.config.js configurar

```js
      preset: 'ts-jest',
      testEnvironment: "jest-environment-node",
```
<!--
Opcional - The paths to modules that run some code to configure or set up the testing
      environment before each test
      setupFiles: ['dotenv/config']
-->

Crear scripts

```json
      "test": "jest",
      "test:watch": "jest --watch",
      "test:coverage": "jest --coverage"
```

Crear base de datos para test

- Duplicar .env
- Crear docker.compose.test

Modificar scripts para tests

```json
"scripts": {
    "dev": "tsnd --respawn --clear src/app.ts",
    "build": "rimraf ./dist && tsc",
    "start": "npm run build && node dist/app.js",
    "docker:test": "docker compose -f docker-compose.test.yml --env-file .env.test up -d",
    "test": "npm run docker:test && jest",
    "test:watch": "npm run docker:test && jest --watch",
    "test:coverage": "npm run docker:test && jest --coverage"
  },
```

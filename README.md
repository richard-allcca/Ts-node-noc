# NOC

Network Operation Center

> Permite mantener escucha de un servicio en este caso una URL, emite un mensaje cada tiempo definido con mensajes de ok o error.

## Run project

`Node 18.17.1`

- Clonar `.example.env` a `.env`
- Configurar variables de entorno
- Levantar los contenedores para las bases de datos

```bash
      # Levanta los contenedores
      docker compose -f docker-compose-local.yml up

      # Detener los contenedores
      docker compose down
      docker compose -f docker-compose-local.yml down
```

- Prisma reset:

> Este comando aplica las migraciones definidas en el esquema de Prisma a la base de datos, asegurando que la estructura de la base de datos esté actualizada con los cambios definidos en el código.

```bash
# DB en carpetas locales
npx prisma migrate dev
```

- Correr el proyecto con

```bash
npm run dev
```

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

## Configuración de Test

Pasos para configurar Jest con TypeScript, en Node

```bash
npm install -D jest @types/jest ts-jest supertest
```

### Crear archivo de configuración de Jest

```bash
npm jest --init
npx jest --init
```

- Crear script 'yes'
- Usar TypeScript 'yes'
- Elegir entorno de desarrollo 'node'
- Quieres agregar reportes de coverage 'yes'
- Proveedor para código de cobertura 'v8'
- Limpiar los mocks en automático 'no'

> En el archivo `jest.config.js` configurar

```js
preset: 'ts-jest',
testEnvironment: "jest-environment-node",
```
<!--
Opcional - The paths to modules that run some code to configure or set up the testing
environment before each test
setupFiles: ['dotenv/config']
-->

### Crear scripts

```json
"scripts": {
  "test": "jest", // Ejecuta todos los tests una vez
  "test:watch": "jest --watch", // Ejecuta los tests en modo observador
  "test:coverage": "jest --coverage" // Genera un reporte de cobertura de código
}
```

### Crear base de datos para test

- Hacer una copia `.env` con el nombre de `.env.test`
- Crear `docker-compose.test.yml`

Modificar scripts para tests

```json
"scripts": {
  "dev": "tsnd --respawn --clear src/app.ts",
  "build": "rimraf ./dist && tsc",
  "start": "npm run build && node dist/app.js",
  "docker:test": "docker compose -f docker-compose.test.yml --env-file .env.test up -d", // Levanta los contenedores para el entorno de test
  "test": "npm run docker:test && jest", // Levanta los contenedores y ejecuta los tests
  "test:watch": "npm run docker:test && jest --watch", // Levanta los contenedores y ejecuta los tests en modo observador
  "test:coverage": "npm run docker:test && jest --coverage" // Levanta los contenedores y genera un reporte de cobertura de código
}
```

## Docker

Para levantar los contenedores de Docker, ejecutar:

```bash
docker-compose up -d
```

Para detener los contenedores de Docker, ejecutar:

```bash
docker-compose down
```

## Ejemplos de formato ISO para temporizador

```js
'* * * * * *', // cronTime
`*/3 * * * * *`, // Esto significa "cada 3 segundos"
'0 * * * *', // Esto significa "al inicio de cada hora"
'/25 * * * *', // Esto significa "cada 25 minutos"
'0 4 * * *', // Esto significa "a las 4 horas del día"
```

[More Examples of cron](https://github.com/kelektiv/node-cron/tree/main/examples)

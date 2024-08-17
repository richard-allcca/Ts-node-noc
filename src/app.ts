import { envs } from "./config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server";


(async () => {

  main();


})();


async function main() {
  console.log('envs', envs )

  await MongoDatabase.connect(
    {
      mongoUrl: envs.MONGO_URL,
      dbName: envs.MONGO_DB_NAME
    }
  )

  // Crear una colección = tabla, documento = registro
  // const newLog = await LogModel.create({
  //   message: 'Test message from MongoDB',
  //   origin: 'Test origin',
  //   level: 'high'
  // })

  // await newLog.save();

  // console.log(newLog)

  // Obtener todos los documentos
  const logs = await LogModel.find();
  console.log(logs)

  // Server.start();
}
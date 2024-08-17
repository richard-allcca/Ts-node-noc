import { envs } from "./config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server";
import { LogRepositoryImpl } from './infrastructure/repository/log.repository.impl';
import { FileSystemDatasourceImpl } from "./infrastructure/datasources/file-system.datasource.Impl";


(async () => {

  main();


})();


async function main() {
  console.log('envs', envs )

  // Connection to mongoDb
  // await MongoDatabase.connect(
  //   {
  //     mongoUrl: envs.MONGO_URL,
  //     dbName: envs.MONGO_DB_NAME
  //   }
  // )

  Server.start();
}
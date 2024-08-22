import { envs } from "../../config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "../../data/mongo";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";



export class MongoLogDatasourceImpl implements LogDatasource {


  async saveLog(log: LogEntity): Promise<void> {

    // Connection to mongoDb
    await MongoDatabase.connect(
      {
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
      }
    );

    try {
      // Crear una colección = tabla, documento = registro
      const newLog = await LogModel.create(log);
      await newLog.save();
      console.log('Mongo Log created', newLog.id);
    } catch (error) {
      console.log(error);
    }
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

    try {
      // Obtener todos los documentos
      const logs = await LogModel.find({ level: severityLevel });
      // console.log( 'Mongo Logs',logs)
      return logs.map(el => LogEntity.fromObject(el));
    } catch (error) {
      console.log(error);
      throw new Error('Error getting logs');
    }
  }

}
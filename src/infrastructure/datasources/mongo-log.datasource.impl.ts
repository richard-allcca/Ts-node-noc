import { envs } from "../../config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "../../data/mongo";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";



export class MongoLogDatasourceImpl implements LogDatasource {
  private static isConnected: boolean = false;

  private static async connect() {
    if (!this.isConnected) {
      await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
      });
      this.isConnected = true;
    }
  }

  async saveLog(log: LogEntity): Promise<void> {
    await MongoLogDatasourceImpl.connect();

    try {
      const newLog = await LogModel.create(log);
      await newLog.save();
      console.log('Mongo --> saveLog -->', newLog.id);
    } catch (error) {
      console.log(error);
    }
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    await MongoLogDatasourceImpl.connect();

    try {
      const logs = await LogModel.find({ level: severityLevel });
      return logs.map(el => LogEntity.fromObject(el));
    } catch (error) {
      console.log(error);
      throw new Error('Error getting logs');
    }
  }
}

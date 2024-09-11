import mongoose from "mongoose";
import { envs } from "../../config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "../../data/mongo";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { MongoLogDatasourceImpl } from "./mongo-log.datasource.impl";

describe('Pruebas en MongoLogDatasource', () => {

  const logDataSource = new MongoLogDatasourceImpl();

  const log = new LogEntity({
    level: LogSeverityLevel.MEDIUM,
    message: 'test message',
    origin: 'mongo-log.datasource.ts'
  })


  beforeAll(async() => {

    await MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL,
    })

  })

  afterEach(async() => {
    await LogModel.deleteMany();
  })

  afterAll(async() => {

    mongoose.connection.close();
  })


  test('should create a log', async() => {

    const logSpy = jest.spyOn(console, 'log');

    await logDataSource.saveLog(log);

    expect( logSpy ).toHaveBeenCalled();
    expect( logSpy ).toHaveBeenCalledWith("Mongo --> saveLog -->", expect.any(String) );


  });

  test('should get logs', async()=>{

    await logDataSource.saveLog(log);
    await logDataSource.saveLog(log);

    const logs = await logDataSource.getLogs( LogSeverityLevel.MEDIUM );

    expect(logs.length).toBe(2);
    expect(logs[0].level).toBe(LogSeverityLevel.MEDIUM);


  });

});
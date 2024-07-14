import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";


export class LogRepositoryImpl extends LogRepository {

  constructor(
    private readonly logDataSource: LogDatasource,
  ) {
    super()
  }

  saveLog(log: LogEntity): Promise<void> {
    return this.logDataSource.saveLog(log)
  }

  getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    return this.logDataSource.getLogs(severityLevel)
  }

}
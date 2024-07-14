import fs from "fs";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class FileSystemDatasource implements LogDatasource {
  private readonly logPath: string = "logs/";
  private readonly allLogsPath: string = this.logPath + "logs-all.log";
  private readonly infoLogsPath: string = this.logPath + "logs-info.log";
  private readonly warningLogsPath: string = this.logPath + "logs-warning.log";
  private readonly errorLogsPath: string = this.logPath + "logs-error.log";

  constructor() {
    this.createLogsFiles();
  }

  private createLogsFiles = async () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
      console.log("Logs directory created successfully!");
    }

    const listOfPaths = [
      this.allLogsPath,
      this.infoLogsPath,
      this.warningLogsPath,
      this.errorLogsPath,
    ];

    listOfPaths.forEach((path) => {
      if (fs.existsSync(path)) return;
      fs.writeFileSync(path, "");
      console.log(`Path ${path} created successfully!`);
    });
  };

  async saveLog(newLog: LogEntity): Promise<void> {

    const logJson = `${JSON.stringify(newLog)}\n`;

    // Agrega todos los nuevos logs en esta ruta
    fs.appendFileSync(this.allLogsPath, logJson);

    // Agrega los logs según su severidad
    switch (newLog.level) {
      case LogSeverityLevel.INFO:
        fs.appendFileSync(this.infoLogsPath, logJson);
        break;
      case LogSeverityLevel.WARNING:
        fs.appendFileSync(this.warningLogsPath, logJson);
        break;
      case LogSeverityLevel.ERROR:
        fs.appendFileSync(this.errorLogsPath, logJson);
        break;
      default:
        break;
    }
  }

  private getLogsFromFile(path: string): LogEntity[] {
    const content = fs.readFileSync(path, 'utf-8');
    const logs = content.toString().split("\n").map(log => LogEntity.fromJson(log));
    // logs.pop();
    // const logsJson = logs.map((log) => JSON.parse(log));
    return logs;
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

    switch (severityLevel) {
      case LogSeverityLevel.INFO:
        // logsPath = this.infoLogsPath;
        return this.getLogsFromFile(this.infoLogsPath);
      case LogSeverityLevel.WARNING:
        // logsPath = this.warningLogsPath;
        return this.getLogsFromFile(this.warningLogsPath);
      case LogSeverityLevel.ERROR:
        return this.getLogsFromFile(this.errorLogsPath);
      default:
        throw new Error(`Invalid severity level ${severityLevel}`);
    }

    // return new Promise((resolve, reject) => {
    //   let logsPath = this.allLogsPath;

    //   switch (severityLevel) {
    //     case LogSeverityLevel.INFO:
    //       logsPath = this.infoLogsPath;
    //       break;
    //     case LogSeverityLevel.WARNING:
    //       logsPath = this.warningLogsPath;
    //       break;
    //     case LogSeverityLevel.ERROR:
    //       logsPath = this.errorLogsPath;
    //       break;
    //     default:
    //       break;
    //   }

    //   fs.readFile(logsPath, (err, data) => {
    //     if (err) {
    //       reject(err);
    //     } else {
    //       const logs = data.toString().split("\n");
    //       logs.pop();
    //       const logsJson = logs.map((log) => JSON.parse(log));
    //       resolve(logsJson);
    //     }
    //   });
    // });
  }
}

import fs from "fs";
import * as fsSync from "fs/promises"; // Para manejo asíncrono de archivos
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class FileSystemDatasourceImpl implements LogDatasource {
  private readonly logPath: string = "logs/";
  private readonly allLogsPath: string = this.logPath + "logs-all.log";
  private readonly infoLogsPath: string = this.logPath + "logs-info.log";
  private readonly warningLogsPath: string = this.logPath + "logs-warning.log";
  private readonly errorLogsPath: string = this.logPath + "logs-error.log";

  constructor() {
    this.createLogsFiles();
  }

  /**
   * Create logs directory and files if they don't exist
   * @async
   */
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

  // Función auxiliar para obtener la ruta según la severidad
  private getLogFilePathBySeverity(level: LogSeverityLevel): string | null {
    switch (level) {
      case LogSeverityLevel.LOW:
        return this.infoLogsPath;
      case LogSeverityLevel.MEDIUM:
        return this.warningLogsPath;
      case LogSeverityLevel.HIGH:
        return this.errorLogsPath;
      default:
        return null; // Si no coincide con ningún nivel, no hace nada
    }
  }

  /**
   * Save a new log in the file system
   * @async
   * @param {LogEntity} newLog
   */
  async saveLog(newLog: LogEntity): Promise<void> {
    const logJson = `${JSON.stringify(newLog)}\n`;

    try {
      // Agrega todos los nuevos logs en la ruta general
      await fsSync.appendFile(this.allLogsPath, logJson);

      // Agrega los logs según su severidad
      const logFilePath = this.getLogFilePathBySeverity(newLog.level);

      if (logFilePath) {
        await fsSync.appendFile(logFilePath, logJson);
      }
    } catch (error: any) {
      console.error("Error saving log:", error);
      throw new Error(`Failed to save log: ${error.message}`);
    }
  }

  private getLogsFromFile(path: string): LogEntity[] {
    const content = fs.readFileSync(path, 'utf-8');
    const logs = content
      .toString()
      .split("\n")
      .filter(el => el !== '')
      .map(log => LogEntity.fromJson(log));
    // logs.pop();
    // const logsJson = logs.map((log) => JSON.parse(log));
    return logs;
  }

  /**
   * Get all logs from the file system
   * @async
   * @param {LogSeverityLevel} severityLevel
   * @returns {Promise<LogEntity[]>}
   */
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

    switch (severityLevel) {
      case LogSeverityLevel.LOW:
        // logsPath = this.infoLogsPath;
        return this.getLogsFromFile(this.infoLogsPath);
      case LogSeverityLevel.MEDIUM:
        // logsPath = this.warningLogsPath;
        return this.getLogsFromFile(this.warningLogsPath);
      case LogSeverityLevel.HIGH:
        return this.getLogsFromFile(this.errorLogsPath);
      default:
        throw new Error(`Invalid severity level ${severityLevel}`);
    }
  }
}

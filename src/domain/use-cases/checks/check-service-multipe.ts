import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

export interface CheckServiceMultiple {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

/**
 * Clase que implementa la interfaz CheckService.
 * Esta clase se encarga de verificar si un servicio está disponible.
 * @class CheckService
 * @implements {CheckServiceMultiple}
 */
export class CheckServiceMultiple implements CheckServiceMultiple {

  constructor(
    private readonly logRepository: LogRepository[],
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  private callLogs(log: LogEntity) {
    this.logRepository.forEach(logRepository => {
      logRepository.saveLog(log);
    });
  }

  public async execute(url: string): Promise<boolean> {

    try {

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error on check service ${url}`);
      }

      const optionsLogEntity = {
        level: LogSeverityLevel.LOW,
        message: `Service ${url} is OK`,
        origin: 'CheckService.ts'
      };

      const log = new LogEntity(optionsLogEntity);
      this.callLogs(log);
      this.successCallback();
      return true;

    } catch (error) {
      const errorMessage = `${url} is not ok. ${error}`;
      const optionsLogEntity = {
        level: LogSeverityLevel.HIGH,
        message: errorMessage,
        origin: 'CheckService.ts'
      };
      const log = new LogEntity(optionsLogEntity);
      this.callLogs(log);
      this.errorCallback(errorMessage);
      return false;

    }

  }
}
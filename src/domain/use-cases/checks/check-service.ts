import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

export interface CheckService {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckService {

  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  public async execute(url: string): Promise<boolean> {

    try {

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error on check service ${url}`);
      }

      const optionsLogEntity = {
        level: LogSeverityLevel.INFO,
        message: `Service ${url} is OK`,
        origin: 'CheckService.ts'
      };

      const log = new LogEntity(optionsLogEntity);
      this.logRepository.saveLog(log)
      this.successCallback();
      return true;

    } catch (error) {
      const errorMessage = `${url} is not ok. ${error}`
      const optionsLogEntity = {
        level: LogSeverityLevel.ERROR,
        message: errorMessage,
        origin: 'CheckService.ts'
      }
      const log = new LogEntity(optionsLogEntity);
      this.logRepository.saveLog(log);
      this.errorCallback(errorMessage);
      return false;

    }

  }
}
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

      const log = new LogEntity(LogSeverityLevel.INFO, `Service ${url} is OK`);
      this.logRepository.saveLog(log)
      this.successCallback();
      return true;

    } catch (error) {
      const errorMessage = `${error}`
      const log = new LogEntity(LogSeverityLevel.ERROR, errorMessage);
      this.logRepository.saveLog(log);
      this.errorCallback(errorMessage);
      return false;

    }

  }
}
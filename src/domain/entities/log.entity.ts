
export enum LogSeverityLevel {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

export interface ILogEntity {
  level: LogSeverityLevel;
  message: string;
  createAt?: Date;
  origin: string;
}

export class LogEntity {

  public level: LogSeverityLevel;
  public message: string;
  public createAt: Date;
  public origin: string;

  constructor(options: ILogEntity) {
    const { level, message, origin, createAt = new Date() } = options;
    this.level = level;
    this.message = message;
    this.createAt = createAt;
    this.origin = origin;
  }

  static fromJson = (json: string): LogEntity => {
    const { message, level, createAt } = JSON.parse(json);

    const log = new LogEntity({ level, message,createAt, origin });
    return log;
  };
}
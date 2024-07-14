
export enum LogSeverityLevel {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

export class LogEntity {

  public level: LogSeverityLevel;
  public message: string;
  public createAt: Date;

  constructor(level: LogSeverityLevel, message: string) {
    this.level = level;
    this.message = message;
    this.createAt = new Date();
  }

  static fromJson = (json: string): LogEntity => {
    const { message, level, createAt } = JSON.parse(json);

    const log = new LogEntity(level, message);
    log.createAt = new Date(createAt);
    return log;
  }
}
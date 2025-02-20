export enum LogSeverityLevel {
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
    this.createAt = createAt ? new Date(createAt) : new Date();
    this.origin = origin;
  }

  /**
   * Factory constructor
   * Maps elements from the file system to create logs
   * @param json - JSON string to parse
   * @returns LogEntity instance
   */
  static fromJson = (json: string): LogEntity => {
    const { message, level, createAt, origin } = JSON.parse(json);
    const log = new LogEntity({ level, message, createAt, origin });
    return log;
  };

  /**
   * Converts objects from MongoDB to logs
   * @param object - Object to convert
   * @returns LogEntity instance
   */
  static fromObject = (object: { [key: string]: any }): LogEntity => {
    const { message, level, createAt, origin } = object;
    const log = new LogEntity({ level, message, createAt, origin });
    return log;
  }
}
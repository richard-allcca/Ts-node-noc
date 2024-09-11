import fs from 'fs';
import path from "path";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { FileSystemDatasourceImpl } from "./file-system.datasource.Impl";

describe('FileSystemDatasource', () => {

  const logPath = path.join(__dirname, '../../../logs')

  // NOTE - cemented for causing conflicts
  // beforeEach(() => {
  //   fs.rmSync( logPath, { recursive: true, force: true });
  // })

  beforeAll(() => {
    fs.rmSync(logPath, { recursive: true, force: true });
  })

  test('should create log files if they do not exists', () => {

    new FileSystemDatasourceImpl();
    const files = fs.readdirSync( logPath );
    expect(files).toEqual(['logs-all.log', 'logs-error.log', 'logs-info.log', 'logs-warning.log'])

  })

  test('should save a log in logs-all.log', async () => {

    const logDatasource = new FileSystemDatasourceImpl();
    const log = new LogEntity({
      message: 'test',
      level: LogSeverityLevel.LOW,
      origin: 'file-system.datasource.test.ts'
    });

    await logDatasource.saveLog(log);
    const allLogsPath = path.join(logPath, 'logs-all.log');
    const allLogs = fs.readFileSync(allLogsPath, 'utf-8');
    expect(allLogs).toContain( JSON.stringify(log) );

  });

  test('should save a log in logs-all.log and logs-medium.log', async () => {

    const logDatasource = new FileSystemDatasourceImpl();
    const log = new LogEntity({
      message: 'test',
      level: LogSeverityLevel.MEDIUM,
      origin: 'file-system.datasource.test.ts'
    });

    await logDatasource.saveLog(log);
    const allLogs = fs.readFileSync(`${ logPath }/logs-all.log`, 'utf-8');
    const mediumLogs = fs.readFileSync(`${ logPath }/logs-warning.log`, 'utf-8');

    expect(allLogs).toContain( JSON.stringify(log) );
    expect(mediumLogs).toContain( JSON.stringify(log) );

  });

  test('should save a log in logs-all.log and logs-error.log', async () => {

    const logDatasource = new FileSystemDatasourceImpl();
    const log = new LogEntity({
      message: 'test',
      level: LogSeverityLevel.HIGH,
      origin: 'file-system.datasource.ts'
    });

    await logDatasource.saveLog(log);

    const allLogs = fs.readFileSync(`${ logPath }/logs-all.log`, 'utf-8');
    const highLogs = fs.readFileSync(`${ logPath }/logs-error.log`, 'utf-8');

    expect(allLogs).toContain( JSON.stringify(log) );
    expect(highLogs).toContain( JSON.stringify(log) );

  });


  test('should return all logs', async() => {

    const logDatasource = new FileSystemDatasourceImpl();
    const logLow = new LogEntity({
      message: 'test',
      level: LogSeverityLevel.LOW,
      origin: 'file-system.datasource.ts'
    });

    const logMedium = new LogEntity({
      message: 'log-medium',
      level: LogSeverityLevel.MEDIUM,
      origin: 'medium'
    });

    const logHigh = new LogEntity({
      message: 'log-high',
      level: LogSeverityLevel.HIGH,
      origin: 'high'
    });

    await logDatasource.saveLog(logLow);
    await logDatasource.saveLog(logMedium);
    await logDatasource.saveLog(logHigh);

    const logsLow = await logDatasource.getLogs(LogSeverityLevel.LOW);
    const logsMedium = await logDatasource.getLogs(LogSeverityLevel.MEDIUM);
    const logsHigh = await logDatasource.getLogs(LogSeverityLevel.HIGH);

    expect( logsLow ).toEqual( expect.arrayContaining([ logLow ]) )
    expect( logsMedium ).toEqual( expect.arrayContaining([ logMedium ]) )
    expect( logsHigh ).toEqual( expect.arrayContaining([ logHigh ]) )

  });


  test('should not throw an error if path exists', () => {

    new FileSystemDatasourceImpl();
    new FileSystemDatasourceImpl();

    expect(true).toBeTruthy();
  })


  test('should throw an error if severity level is not defined', async() => {

    const logDatasource = new FileSystemDatasourceImpl();
    const customSeverityLevel = 'SUPER_MEGA_HIGH' as LogSeverityLevel;

    try {
      await logDatasource.getLogs(customSeverityLevel);
      expect(true).toBeFalsy();
    } catch (error) {
      const errorString = `${ error }`;

      expect(errorString).toContain(`Invalid severity level ${ customSeverityLevel }`);
    }
  })

})
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepositoryImpl } from "./log.repository.impl";



describe('LogRepositoryImpl', () => {

  const mockLogDataSource = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  }


  const logRepository = new LogRepositoryImpl(mockLogDataSource);

  beforeEach(()=> {
    jest.clearAllMocks();
  })


  test('saveLog should call the datasource with arguments', async() => {

    const log = { level: LogSeverityLevel.HIGH, message: 'hola' } as LogEntity;
    await logRepository.saveLog(log);

    expect( mockLogDataSource.saveLog ).toHaveBeenCalledWith( log );
  });

  test('getLogs should call the datasource with arguments', async() => {

    const lowSeverity = LogSeverityLevel.LOW;

    await logRepository.getLogs( lowSeverity );

    expect( mockLogDataSource.getLogs ).toBeCalledWith(lowSeverity)
  });

})
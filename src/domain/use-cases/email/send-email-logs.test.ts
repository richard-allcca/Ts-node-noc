import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";
import { SendEmailLogs } from "./send-email-logs";


describe( 'SendEmailLogs', () => {

  const mockEmailService = {
    sendMailWithAttachments: jest.fn().mockResolvedValue(true), // Cambiado el nombre del método
  };

  const mockLogRepository: LogRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const sendEmailLogs = new SendEmailLogs(
    mockEmailService as any,
    mockLogRepository,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  })

  test('should call sendEmail and saveLog', async () => {
    const result = await sendEmailLogs.execute('rallcca28@gmail.com');

    expect(result).toBe(true);
    expect(mockEmailService.sendMailWithAttachments).toBeCalledTimes(1); // Cambiado el nombre del método
    expect(mockLogRepository.saveLog).toBeCalledWith(expect.any(LogEntity));
    expect(mockLogRepository.saveLog).toBeCalledWith(expect.objectContaining({
      level: LogSeverityLevel.MEDIUM, // Asegúrate de que el nivel sea el correcto
      message: `Email not sent to rallcca28@gmail.com`, // Asegúrate de que el mensaje sea el correcto
      origin: 'SendEmailLogs.ts',
    }));
  });

  test( 'should log in case of error', async () => {
    mockEmailService.sendMailWithAttachments.mockResolvedValue(false);

    const result = await sendEmailLogs.execute('fernando@google.com');

    expect(result).toBe(false);
    expect(mockEmailService.sendMailWithAttachments).toBeCalledTimes(1);
    expect(mockLogRepository.saveLog).toBeCalledWith(expect.any(LogEntity));
    expect(mockLogRepository.saveLog).toBeCalledWith(expect.objectContaining({
      level: LogSeverityLevel.HIGH,
      message: expect.stringContaining('Error: Email not sent'),
      origin: 'SendEmailLogs.ts',
    }));
  } );
} );

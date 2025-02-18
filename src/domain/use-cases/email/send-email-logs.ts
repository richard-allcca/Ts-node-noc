import { EmailService } from "../../../presentation/services/email/email.service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

/**
 * Interface for the Send Log Email Use Case
 */
interface ISendLogEmailUseCase {
  /**
   * Executes the use case to send email logs
   * @param to - Recipient email address or addresses
   * @returns Promise<boolean> - Returns true if email sent successfully, otherwise false
   */
  execute: (to: string | string[]) => Promise<boolean>;
}

/**
 * Use case for sending email with logs
 */
export class SendEmailLogs implements ISendLogEmailUseCase {

  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository
  ) {}

  /**
   * Executes the use case to send email logs
   * @param to - Recipient email address or addresses
   * @returns Promise<boolean> - Returns true if email sent successfully, otherwise false
   */
  async execute(to: string | string[]) {
    try {
      // Send mails
      const sent = await this.emailService.sendMailWithAttachments(to);
      if (!sent) {
        throw new Error('Email not sent');
      }

      const optionsLogEntity = {
        level: LogSeverityLevel.MEDIUM,
        message: `Email successfully sent to ${to}`,
        origin: 'SendEmailLogs.ts',
      };

      const log = new LogEntity(optionsLogEntity);
      this.logRepository.saveLog(log);

      // Show logs in console
      const logs = await this.logRepository.getLogs(LogSeverityLevel.HIGH);
      console.log(logs);

      return true;
    } catch (error) {
      const optionsLogEntity = {
        level: LogSeverityLevel.HIGH,
        message: `${error}`,
        origin: 'SendEmailLogs.ts',
      };
      const log = new LogEntity(optionsLogEntity);
      this.logRepository.saveLog(log);

      return false;
    }
  }

}
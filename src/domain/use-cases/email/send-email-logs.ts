import { EmailService } from "../../../presentation/services/email/email.service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface ISendLogEmailUseCase {
  execute: (to: '' | ''[]) => Promise<boolean>;
}

export class SendEmailLogs implements ISendLogEmailUseCase {

  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository
  ) {}

  async execute(to: string | string[]) {
    try {
      // Send mails
      const sent = await this.emailService.sendMailWithAttachments(to);
      if (!sent) {
        throw new Error('Email not sent');
      };

      const optionsLogEntity = {
        level: LogSeverityLevel.MEDIUM,
        message: `Email not sent to ${to}`,
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
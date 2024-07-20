import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repository/log.repository.impl";
import { CronService } from "./services/cron/cron-service";
import { EmailService } from "./services/email/email.service";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource(), // Data source - inyecta la dependencia
)

export class Server {

  static executeCheckService(url: string) {
    new CheckService(
      fileSystemLogRepository,
      () => console.log(`Url: ${url} - status: Ok`),
      (error) => console.error('Error', error)
    ).execute(url);
  }

  public static start() {
    console.log('Server started.....');

    const emailService = new EmailService(
      fileSystemLogRepository
    )

    // - Send mails single
    // emailService.sendMail({
    //   to: 'richard_allcca_llano@hotmail.com',
    //   subject: 'Test email',
    //   htmlBody: '<h1>Test email</h1>',
    // })

    // - Send mails with attachments
    emailService.sendMailWithAttachments([
      '"Richard A." <richard_allcca_llano@hotmail.com>',
      '"Thouma dev" <rallcca28@gmail.com>',
    ])

    // - Create logs
    const url = 'https://www.google.com';
    // const url = 'http://localhost:3000/';// localhost de el proyecto json-server

    CronService.createJob(
      `*/5 * * * * *`, // Esto significa "cada 5 segundos"
      () => {
        Server.executeCheckService(url);
      }
    );
  }
}
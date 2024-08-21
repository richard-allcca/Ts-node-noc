import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasourceImpl } from "../infrastructure/datasources/file-system.datasource.Impl";
import { LogRepositoryImpl } from "../infrastructure/repository/log.repository.impl";
import { CronService } from "./services/cron/cron-service";
import { EmailService } from "./services/email/email.service";
import { PostgresLogDatasourceImpl } from './../infrastructure/datasources/postgres-log.datasource.Impl';

const emailService = new EmailService();

const logRepository = new LogRepositoryImpl(
  // new FileSystemDatasourceImpl(), // inyección de data source con file system
  // new MongoLogDatasourceImpl(), // inyección de data source con mongo db
  new PostgresLogDatasourceImpl(), // inyección de data source con Postgres
);

export class Server {

  static executeCheckService(url: string) {
    new CheckService(
      logRepository,
      () => console.log(`Url: ${url} - status: Ok`),
      (error) => console.error('Error', error)
    ).execute(url);
  }

  public static start() {
    console.log('Server started.....');

    // Send mails single
    // emailService.sendMail({
    //   to: 'richard_allcca_llano@hotmail.com',
    //   subject: 'Test email',
    //   htmlBody: '<h1>Test email</h1>',
    // });

    // Send mails with case use 'service and repository'
    // new SendEmailLogs(
    //   emailService,
    //   logRepository
    // ).execute([
    //   '"Richard A." <richard_allcca_llano@hotmail.com>',
    //   '"Thouma dev" <rallcca28@gmail.com>',
    // ]);

    // - Url for job with 'cron'
    const url = 'https://www.google.com';
    // const url = 'http://localhost:3000/';// localhost de el proyecto json-server

    CronService.createJob(
      `*/5 * * * * *`, // Esto significa "cada 5 segundos"
      () => Server.executeCheckService(url)
    );
  }
}
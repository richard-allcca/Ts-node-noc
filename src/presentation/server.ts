import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repository/log.repository.impl";
import { CronService } from "./cron/cron-service";

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
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";



export class Server {

  static executeCheckService(url: string) {
    new CheckService(
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
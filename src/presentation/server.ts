import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";



export class Server {


  public static start() {
    console.log('Server started.....');
    const url = 'http://localhost:3000/';

    CronService.createJob(
      `*/5 * * * * *`, // Esto significa "cada 5 segundos"
      () => {
        Server.executeCheckService(url);
      }
    );
  }

  static executeCheckService(url: string) {
    new CheckService(
      () => console.log(`Url: ${url} - status: Ok`),
      (error) => console.error(error)
    ).execute(url);
  }

}
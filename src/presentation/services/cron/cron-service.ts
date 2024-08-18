import { CronJob } from "cron";


type CronTime = string | Date;
type OnTick = () => void;

/**
 * Clase que representa un servicio de cron
 * @export
 * @class CronService
 */
export class CronService {

  /**
 * Crea un trabajo de cron con el tiempo especificado.
 * @param {CronTime} cronTime - El tiempo en formato cron.
 * @param {OnTick} onTick - La función a ejecutar en cada tick.
 * @returns {CronJob} - El trabajo de cron creado.
 */
  static createJob(cronTime: CronTime, onTick: OnTick): CronJob {

    const job = new CronJob(cronTime, onTick);

    job.start();

    return job;
  }
}
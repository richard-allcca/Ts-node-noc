import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

// Cliente basado en el scheme creado
const prismaClient = new PrismaClient();

const severityEnum = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH,
};

export class PostgresLogDatasourceImpl implements LogDatasource {

  async saveLog(log: LogEntity): Promise<void> {
    try {
      const level = severityEnum[log.level];

      // create new log
      const newLog = await prismaClient.logModel.create({
        data: {
          ...log,
          level: level,
        }
      });

      console.log('PostgresLogDatasource -> saveLog ->', newLog.createAt);
    } catch (error) {
      console.log('PostgresLogDatasource -> saveLog -> error', error);
      throw new Error("Error saving log");
    }
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

    const level = severityEnum[severityLevel];

    try {
      const dbLogs = prismaClient.logModel.findMany({
        where: { level: level },
      });

      return (await dbLogs).map(el => LogEntity.fromObject(el));
    } catch (error) {
      throw new Error("Error getting logs");
    }
  }

  async getEmailDomains(): Promise<any[]> {
    try {
      const result = await prismaClient.$queryRaw`
        SELECT
          *
        FROM
          (
            SELECT
              count(*) as total_users,
              SUBSTRING(
                email
                FROM
                  POSITION('@' IN email) + 1
              ) AS dominio,
              'Richard' AS nombre,
              37 AS edad
            FROM
              users
            GROUP BY
              dominio
            HAVING count(*) > 1
          ) AS emails_domains;
      `;
      return result as any[];
    } catch (error) {
      console.log('PostgresLogDatasource -> getEmailDomains -> error', error);
      throw new Error("Error executing query");
    }
  }
}
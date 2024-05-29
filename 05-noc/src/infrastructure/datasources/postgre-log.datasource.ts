import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogDatasource } from "../../domain/datasources/log.datasource";


const prismaClient = new PrismaClient();

const serverityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH
}

export class PostgresLogDatasource implements LogDatasource {

    
    async saveLog(log: LogEntity): Promise<void> {

        const level = serverityEnum[log.level]

        const newLog = await prismaClient.logModel.create({
            data: {
                ...log,
                level: level,
            }
        });
    }


    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

        const level = serverityEnum[severityLevel]
        
        const dbLogs = await prismaClient.logModel.findMany({
                where: { level }
            })

        return dbLogs.map( log => LogEntity.fromObject( log ))
    }


}
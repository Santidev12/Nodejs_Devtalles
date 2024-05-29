
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log-impl.respository";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";
import { PostgresLogDatasource } from '../infrastructure/datasources/postgre-log.datasource';
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";

const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource(),
)

const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDatasource(),
)

const postgresLogRepository = new LogRepositoryImpl(
    new PostgresLogDatasource(),
)

const emailService = new EmailService()

export class Server {

    public static async start() {

        console.log('Server started...');
        // console.log(envs);

        // Mandar email
        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository
        // ).execute(
        //     ['spulido411@gmail.com', 'santiagopulido12@gmail.com' ]
        // )
        
        // const emailService = new EmailService()
        // emailService.sendEmailWithFileSystemLogs(
        //     ['spulido411@gmail.com', 'santiagopulido12@gmail.com' ]
        // )

        // const logs = await mongoLogRepository.getLogs(LogSeverityLevel.high);
        // console.log(logs)

        CronService.createJob( 
            '*/5 * * * * *', 
            () => {
                const url = 'http://google.com'
                new CheckServiceMultiple(
                    [
                        fsLogRepository,
                        mongoLogRepository,
                        postgresLogRepository
                    ],
                    () => console.log(`${ url } is ok!`),
                    ( error ) => console.log( error )
                ).execute( url );
        });
        
    }
}
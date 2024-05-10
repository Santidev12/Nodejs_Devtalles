import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log-impl.respository";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const logRepository = new LogRepositoryImpl(
    // new FileSystemDatasource(),
    new MongoLogDatasource(),
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

        const logs = await logRepository.getLogs(LogSeverityLevel.high);
        console.log(logs)

        // CronService.createJob( 
        //     '*/5 * * * * *', 
        //     () => {
        //         const url = 'http://google.com'
        //         new CheckService(
        //             mongoLogRepository,
        //             () => console.log(`${ url } is ok!`),
        //             ( error ) => console.log( error )
        //             // o
        //             // undefined,
        //             // undefined
        //         ).execute( url );
        //         // new CheckService().execute( 'http://localhost:3000' );
        // });
        
    }
}
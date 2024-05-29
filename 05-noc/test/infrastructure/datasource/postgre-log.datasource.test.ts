// import { PrismaClient, SeverityLevel } from '@prisma/client';
// import { envs } from '../../src/config/plugins/envs.plugin';
// import { LogEntity, LogSeverityLevel } from '../../src/domain/entities/log.entity';
// import { PostgresLogDatasource } from '../../src/infrastructure/datasources/postgre-log.datasource';

// describe('Pruebas en postgre-log.datasource.ts', () => {
    
//     let logDatasource: PostgresLogDatasource;
//     let prismaClient: PrismaClient;
  
//     beforeAll(() => {
//       // Crear instancia del PrismaClient mockeado
//       prismaClient = new PrismaClient() as jest.Mocked<PrismaClient>;
//       // Crear instancia de la fuente de datos
//       logDatasource = new PostgresLogDatasource();
//     });

//     const log = new LogEntity({
//         level: LogSeverityLevel.medium,
//         message: 'test-message',
//         origin: 'postgre-log.datasource.test.ts',
//     })

//     afterAll(async () => {
//         // Cerrar conexión del PrismaClient
//         await prismaClient.$disconnect();
//     });

//     afterEach(async () => {
//         // Restaurar el mock de PrismaClient
//         jest.clearAllMocks();
//     });
   
//     test('should create a log', async() => {
        
//         prismaClient.logModel.create({
//             data: {
//                 ...log,
//                 level: SeverityLevel.HIGH
//             }
//         })
//         const logSpy = jest.spyOn(console, 'log')

//         await logDatasource.saveLog(log)

//     });

//     // test('should get logs', async() => {

//     //     await logDatasource.saveLog(log);
        
//     //     const logs = await logDatasource.getLogs( LogSeverityLevel.medium )

//     //     expect(logs.length).toBe(1)
//     //     expect(logs[0].level).toBe(LogSeverityLevel.medium)
//     // });
// });
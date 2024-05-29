import { MongoDatabase } from '../../../src/data/mongodb/init';
import { envs } from '../../../src/config/plugins/envs.plugin';
import mongoose from 'mongoose';
import { MongoLogDatasource } from '../../../src/infrastructure/datasources/mongo-log.datasource';
import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity';
import { LogModel } from '../../../src/data/mongodb';

describe('Pruebas en mongo-log.datasource.ts', () => {
    
    const logDatasource = new MongoLogDatasource();

    const log = new LogEntity({
        level: LogSeverityLevel.medium,
        message: 'test-message',
        origin: 'mongo-log.datasource.test.ts',
    })

    beforeAll(async() => {
        await MongoDatabase.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoUrl: envs.MONGO_URL
        })
    })

    afterEach(async() => {
        await LogModel.deleteMany()
    })

    afterAll(() => {

        mongoose.connection.close();
    })
   
    test('should create a log', async() => {
        
        const logSpy = jest.spyOn(console, 'log')

        await logDatasource.saveLog(log)

        expect(logSpy).toHaveBeenCalled()
        expect(logSpy).toHaveBeenCalledWith('Mongo Log created', expect.any(String))

    });

    test('should get logs', async() => {

        await logDatasource.saveLog(log);
        
        const logs = await logDatasource.getLogs( LogSeverityLevel.medium )

        expect(logs.length).toBe(1)
        expect(logs[0].level).toBe(LogSeverityLevel.medium)
    });
});
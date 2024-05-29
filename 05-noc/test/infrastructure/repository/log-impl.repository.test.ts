import { mock } from 'node:test';
import { LogDatasource } from '../../../src/domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity';
import { LogRepositoryImpl } from '../../../src/infrastructure/repositories/log-impl.respository';


describe('prueba en log-impl.repository.ts', () => {
    const mockLogDatasourse = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }
    const logRepository = new LogRepositoryImpl(mockLogDatasourse)

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('saveLog should call the datasource with arguments', async() => {
        
        const log = { level: LogSeverityLevel.high , message: 'hola' } as LogEntity

        await logRepository.saveLog(log)

        expect(mockLogDatasourse.saveLog).toHaveBeenCalledWith(log)
    });

    test('getLogs should call teh datasource with arguments', async() => {
        
        await logRepository.getLogs(LogSeverityLevel.high)

        expect(mockLogDatasourse.getLogs).toHaveBeenCalledWith(LogSeverityLevel.high)
    });
});
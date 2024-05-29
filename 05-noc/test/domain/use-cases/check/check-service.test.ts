import { CheckService } from '../../../../src/domain/use-cases/checks/check-service';
import { LogEntity, LogSeverityLevel } from '../../../../src/domain/entities/log.entity';


describe('Pruebas en check-service.ts', () => {
    
    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const successCallback = jest.fn();
    const errorCallback = jest.fn();


    const checkService = new CheckService(
        mockRepository,
        successCallback,
        errorCallback
    );

    beforeEach(() => {
        jest.clearAllMocks();
    })


    test('should call successCallback when fetch return true', async() => {
        
        const wasOk = await checkService.execute('https://google.com')

        expect(wasOk).toBe(true)
        expect(successCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();

        expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    });

    test('should call errorCallback when fetch return false', async() => {
        
        const wasOk = await checkService.execute('https://googlesasS.com')

        expect(wasOk).toBe(false)
        expect(errorCallback).toHaveBeenCalled();
        expect(successCallback).not.toHaveBeenCalled();

        expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.objectContaining({
            level: LogSeverityLevel.high
        }))

        expect(mockRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
    });
});
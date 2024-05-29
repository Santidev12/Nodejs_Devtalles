import { LogEntity, LogSeverityLevel } from '../../../../src/domain/entities/log.entity';
import { LogRepository } from '../../../../src/domain/repository/log.repository';
import { SendEmailLogs } from '../../../../src/domain/use-cases/email/send-email-logs';

describe('Pruebas en send-email-logs.ts', () => {
    
    const mockLogRepository: LogRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const mockEmailService = {
        sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true)
    }

    const sendEmailLogs = new SendEmailLogs(
        mockEmailService as any,
        mockLogRepository
    )

    beforeEach( () => {
        jest.clearAllMocks();
    })

    test('should call sendEmail and saveLog', async() => {
        

        const result = await sendEmailLogs.execute('santi@mail.com')
        expect(result).toBe(true)
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1)
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
            createdAt: expect.any(Date),
            level: LogSeverityLevel.low,
            message: 'Log email sent',
            origin: 'send-email-logs.ts',
        })

    });

   
    test('should log in case of error', async() => {
        
        mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue(false)

        const result = await sendEmailLogs.execute('santi@mail.com')

        expect(result).toBe(false)
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1)
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
            createdAt: expect.any(Date),
            level: LogSeverityLevel.high,
            message: 'Error: Email log not sent',
            origin: 'send-email-logs.ts',
        })

    });
});
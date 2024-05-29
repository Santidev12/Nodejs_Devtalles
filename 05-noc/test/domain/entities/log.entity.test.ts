import { LogEntity, LogSeverityLevel } from "../../../src/domain/entities/log.entity";

describe('Pruebas en LogEntity', () => {
    
    const dataObj = {
        message: 'Hola mundo',
        origin: 'log.entity.test.ts',
        level: LogSeverityLevel.high
    }

    test('should create a LogEntity instance', () => {

        
        const log = new LogEntity(dataObj)

        expect(log).toBeInstanceOf( LogEntity )
        expect(log.message ).toBe( dataObj.message )
        expect(log.level).toBe( dataObj.level )
        expect(log.origin).toBe( dataObj.origin )
        expect(log.createdAt).toBeInstanceOf( Date )
    });

    test('should create a LogEntity instance fromJson', () => {
        
        const json = `{"message":"Service http://google.com working","level":"low","createdAt":"2024-05-11T13:33:35.435Z","origin":"check-service"}`;

        const log = LogEntity.fromJson(json);

        expect(log).toBeInstanceOf( LogEntity )
        expect(log.message).toBe( "Service http://google.com working" )
        expect(log.level).toBe( LogSeverityLevel.low )
        expect(log.origin).toBe( "check-service" )
        expect(log.createdAt).toBeInstanceOf( Date )

    });

    test('should create a LogEntity instace fromObj', () => {
        
        const log = LogEntity.fromObject(dataObj)

        expect(log).toBeInstanceOf( LogEntity )
        expect(log.message ).toBe( dataObj.message )
        expect(log.level).toBe( dataObj.level )
        expect(log.origin).toBe( dataObj.origin )
        expect(log.createdAt).toBeInstanceOf( Date )

    });
});
import { CreateTable } from '../../src/domain/use-cases/create-table.use-case';
import { SaveFile } from '../../src/domain/use-cases/save-file.use-case';
import { ServerApp } from '../../src/presentation/server-app';


describe('Pruebas en el server-app', () => {

    const options = {
        base: 2,
        limit: 10,
        showTable: false,
        fileDestination: 'test-destination',
        fileName: 'test-name'
    }

    test('should create serve app instance', () => {
        
        const serverApp = new ServerApp();
        expect( serverApp ).toBeInstanceOf(ServerApp);
        expect(typeof ServerApp.run ).toBe('function')
    });

    test('should run ServerApp with options', () => {

        const logSpy = jest.spyOn(console, 'log');
        const createTableSpy = jest.spyOn( CreateTable.prototype, 'execute');
        const saveFileSpy = jest.spyOn( SaveFile.prototype, 'execute');

        ServerApp.run(options)
        console.log(ServerApp.run(options))

        expect( logSpy ).toHaveBeenCalledTimes(5);
        expect( logSpy ).toHaveBeenCalledWith('Server running...');
        expect( logSpy ).toHaveBeenCalledWith('File created!');

        expect( createTableSpy ).toHaveBeenCalledTimes(2);
        expect( createTableSpy ).toHaveBeenCalledWith({ 
            base: options.base, limit: options.limit 
        });

        expect( saveFileSpy ).toHaveBeenCalledTimes(2);
        expect( saveFileSpy ).toHaveBeenCalledWith({ fileContent: expect.any(String), fileDestination: options.fileDestination, fileName: options.fileName });

        
    });
    
    test('should run with custom values mocked', () => {
        
        const logMock = jest.fn();
        const logError = jest.fn();
        const createMock = jest.fn().mockReturnValue('2 x 2 = 2');
        const saveFileMock = jest.fn().mockReturnValue(true);

        console.log = logMock;
        console.error = logError;
        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute = saveFileMock;

        ServerApp.run(options)

        expect( logMock ).toHaveBeenCalledWith('Server running...')
        expect( createMock ).toHaveBeenCalledWith({ "base": options.base, "limit": options.limit })
        expect( saveFileMock ).toHaveBeenCalledWith({
            fileContent: '2 x 2 = 2',
            "fileDestination": options.fileDestination, 
            "fileName": options.fileName
        });
        expect( logMock ).toHaveBeenCalledWith('File created!')
        expect( logError ).not.toHaveBeenCalledWith();

    });
});
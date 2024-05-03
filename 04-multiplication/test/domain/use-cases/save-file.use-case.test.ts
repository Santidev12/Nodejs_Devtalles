import fs from 'fs';
import { SaveFile } from '../../../src/domain/use-cases/save-file.use-case';

describe('SaveFileUseCase', () => {
    const clean = () => {

        const outputFolderExists = fs.existsSync('outputs');
    
        if ( outputFolderExists ) fs.rmSync('outputs', { recursive: true });
    
        const customOutputFolderExists = fs.existsSync('custom-output');
    
        if ( customOutputFolderExists ) fs.rmSync('custom-output', { recursive: true });
    
        const outputErrorFolderExists = fs.existsSync('output-error');
    
        if ( outputErrorFolderExists ) fs.rmSync('output-error', { recursive: true });
    
      }
    
      afterAll(() => {
    
        clean();
    
      });

    const customOptions = {
        fileContent: 'custom content',
        fileDestination: 'custom-outputs/file-destination',
        fileName: 'custom-table-name',
    }

    const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`


    

    test('should save file with default values', () => {
        
        const saveFile = new SaveFile();
        const filePath = 'outputs/table.txt';
        const options = {
          fileContent: 'test content'
        }

        const result = saveFile.execute( options )
        const fileExist = fs.existsSync(filePath)
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' })
        
        expect( result ).toBe( true );
        expect( fileExist ).toBe( true );
        expect( fileContent ).toBe( options.fileContent );

    });

    test('should save file with custom values', () => {

        const saveFile = new SaveFile();
    
        const result = saveFile.execute(customOptions);
        const fileExists = fs.existsSync(customFilePath);
        const fileContent = fs.readFileSync(customFilePath, { encoding: 'utf-8' });
        
        expect( result ).toBe( true );
        expect( fileExists ).toBe( true );
        expect( fileContent ).toBe( customOptions.fileContent );
        
    });

    test('should return false if directory could not be created', () => {
        
        const saveFile = new SaveFile();

        const mkdirMockSpy  = jest.spyOn(fs, 'mkdirSync').mockImplementation(
            () => { throw new Error('custom error message mkdir')}
        );

        const result = saveFile.execute(customOptions);

        expect( result ).toBe( false )

        mkdirMockSpy.mockRestore();
    });

    test('should return false if file could not be created', () => {
        
        const saveFile = new SaveFile();

        const writeFileMockSpy  = jest.spyOn(fs, 'writeFileSync').mockImplementation(
            () => { throw new Error('custom error message for writeFile')}
        );

        const result = saveFile.execute({ fileContent: 'Hola'});

        expect( result ).toBe( false );

        writeFileMockSpy.mockRestore();

    });
});
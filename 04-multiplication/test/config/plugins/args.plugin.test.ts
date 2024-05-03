// import { yarg } from '../../../src/config/plugins/args.plugin';

const runComando = async( args: string[] ) => {
    process.argv = [ ...process.argv, ...args]

    const { yarg } = await import('../../../src/config/plugins/args.plugin')

    return yarg
}

describe('Test args.plugins.ts', () => {

    const originArray = process.argv;

    beforeEach(() => {
        process.argv = originArray;
        jest.resetModules();
    })
    
    test('should return default values', async() => {
        
       const argv = await runComando(['-b', '5'])
       

       expect( argv ).toEqual(expect.objectContaining({
        b: 5,
        l: 10,
        s: false,
        n: 'multiplication-table',
        d: 'outputs',
       }))

    });

    test('should return configuration custom values', async() => {
        
        const argv = await runComando(['-b', '10', '-l', '15', '-s', '-n', 'mi-nombre', '-d', 'mi-direccion'])
        
 
        expect( argv ).toEqual(expect.objectContaining({
         b: 10,
         l: 15,
         s: true,
         n: 'mi-nombre',
         d: 'mi-direccion',
        }))
 
     });
});
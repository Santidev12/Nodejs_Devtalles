import fs from 'fs';


export interface SaveFileUseCase {
    execute: ( options: Options ) => boolean;
}

export interface Options {
    fileContent     : string;
    fileDestination?: string;
    fileName?       : string
}

export class SaveFile implements SaveFileUseCase {

    constructor(
        // respository: StorageRopository
    ){}

    execute({ 
        fileContent, 
        fileDestination = 'outputs', 
        fileName = 'table'
     }: Options): boolean {

         try {
    
            fs.mkdirSync( fileDestination, { recursive: true })
    
            fs.writeFile(`${fileDestination}/${fileName}.txt`, fileContent, (err) => {
                if(err) throw err;    
            })
            return true;
        } catch (error) {
            console.log(error)
            return false;
        }
    }
}
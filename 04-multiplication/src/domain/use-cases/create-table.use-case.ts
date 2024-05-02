export interface CreateTableUseCase {

    execute: ( options: CreateTableOptions) => string
}

export interface CreateTableOptions{
    base: number;
    limit?: number;
}

export class CreateTable implements CreateTableUseCase {

    constructor(
        // DI - Dependency Injection
    ){}

    execute({ base, limit = 10 }: CreateTableOptions){

        let table = ''
        for (let i = 0; i <= limit ; i++) {
            table += `${base} x ${i} = ${base * i}\n`
        }

        return table;
    }
}
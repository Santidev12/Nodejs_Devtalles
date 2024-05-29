import mongoose from "mongoose";
import { CustomError } from "../../domain/errors/custom.error";


interface Options {
    mongoUrl: string;
    dbName: string;
}

export class MongoDatabase {

    static async connect( options: Options ) {
        const { dbName, mongoUrl } = options
        
        try {
            await mongoose.connect( mongoUrl, {
                dbName: dbName
            })

            return true;

        } catch (error) {
            console.log('Mongo connection error');
            throw CustomError.internalServer('Internal Server Error')
        }
    }
}
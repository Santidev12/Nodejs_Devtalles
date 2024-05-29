import { MongoDatabase } from '../../src/data/mongodb/init';
import mongoose from 'mongoose';


describe('Pruebas en init.ts MongoDB', () => {

    afterAll(() => {
        mongoose.connection.close()
    })
   
    test('should connect to MongoDB', async() => {

        // console.log(process.env.MONGO_URL, process.env.MONGO_DB_NAME)
        
        const connected = await MongoDatabase.connect({
            dbName: process.env.MONGO_DB_NAME!,
            mongoUrl: process.env.MONGO_URL!
        })
        expect(connected).toBe(true);       
    });

    test('should throw an error', async() => {

        try {
            const connected = await MongoDatabase.connect({
                dbName: process.env.MONGO_DB_NAME!,
                mongoUrl: 'mongodb://santiago:123456789@localhostsdadaaas:27018'
            })
            expect(true).toBe(false);
        } catch (error) {
        }


    });
});
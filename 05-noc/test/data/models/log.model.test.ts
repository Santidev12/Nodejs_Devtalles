import { MongoDatabase } from "../../../src/data/mongodb/init";
import { envs } from '../../../src/config/plugins/envs.plugin';
import mongoose from "mongoose";
import { LogModel } from '../../../src/data/mongodb/models/log.model';

describe('Pruebas en LogModel Mongo', () => {

    beforeAll(async() => {
        await MongoDatabase.connect({
            mongoUrl: envs.MONGO_URL,
            dbName: envs.MONGO_DB_NAME
        })
    })

    afterAll( () => {
        mongoose.connection.close()
    })
    
    test('should return LogModel', async() => {
        
        const logData = {
            origin: 'log.model.test.tes',
            message: 'test-message',
            level: 'low'
        }

        const log = await LogModel.create( logData );
        
        expect(log).toEqual( expect.objectContaining({
            ...logData,
            createdAt: expect.any(Date),
            id: expect.any(String)
        }))

        await LogModel.findByIdAndDelete( log.id )


    });

    test('should return the schema object', () => {
        
        const schema = LogModel.schema.obj;

        expect( schema ).toEqual( expect.objectContaining(
            {
                message: { type: expect.any(Function), require: true },
                origin: { type: expect.any(Function) },
                level: {
                  type: expect.any(Function),
                  enum: [ 'low', 'medium', 'high' ],
                  default: 'low'
                },
                createdAt: expect.any(Object)
              }
        ))

    });
});
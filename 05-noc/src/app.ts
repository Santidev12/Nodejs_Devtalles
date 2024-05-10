import { Server } from "./presentation/server";
import { LogModel, MongoDatabase } from "./data/mongodb";
import { envs } from "./config/plugins/envs.plugin";
import { PrismaClient } from "@prisma/client";


(async() => {
    main();
})();

async function main() {


    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    })

    const prisma = new PrismaClient();
    const newLog = await prisma.logModel.create({
        data: {
            level: 'HIGH',
            message: 'Test message',
            origin: 'App.ts'
        }
    });

    console.log({ newLog })

  
    // Server.start();    
}





  // Crear una coleccion = tables, y un documento = registro

    // const newLog = await LogModel.create({
    //     message: 'Test message desde mongo',
    //     origin: 'App.ts',
    //     level: 'low'
    // })

    // await newLog.save();
    // console.log(newLog);

    // Obtener los logs

    // const logs = await LogModel.find();
    // console.log(logs)
    
    
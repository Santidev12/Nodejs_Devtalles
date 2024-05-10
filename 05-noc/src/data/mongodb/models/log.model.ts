import mongoose from "mongoose";
/*
    level: LogSeverityLevel; // enum
    message: string; 
    createdAt?: Date;
    origin: string;
*/

 
const logSchema = new mongoose.Schema({
    message: {
        type: String,
        require: true,
    }, 
    origin: {
        type: String,
    },
    level: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default:  'low'
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

export const LogModel = mongoose.model('Log', logSchema)
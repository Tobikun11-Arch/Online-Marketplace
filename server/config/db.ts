import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Ensure that MONGO_URI is defined
const uri: string = process.env.MONGO_URI!;
if (!uri) {
    throw new Error('MONGO_URI is not defined in the environment variables');
}

const connectToMongoDB = async (): Promise<void> => {
    try {
        const options: ConnectOptions = {
            serverSelectionTimeoutMS: 10000, 
            maxPoolSize: 10, 
        };

        await mongoose.connect(uri, options);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('Connection error:', error);
        throw error;
    }
};

export default connectToMongoDB;
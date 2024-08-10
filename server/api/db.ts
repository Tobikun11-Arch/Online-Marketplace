import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI!;

const connectToMongoDB = async () => {
    try {
        const connection = await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000, // Set a timeout limit
        });
        console.log('MongoDB Connected:', connection.connection.host);
    } catch (error) {
        console.error('Connection error:', error);
        process.exit(1); // Exit the process with failure
    }
};

export default connectToMongoDB;

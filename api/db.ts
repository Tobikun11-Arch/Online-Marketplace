// db.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.Mongo_Uri!;

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('Connection error:', error);
        process.exit(1); // Exit the process with failure
    }
};

export default connectToMongoDB;
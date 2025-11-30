import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

// Loads env vars from dotenv
dotenv.config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

let dbConnection;

export const connectDB = async () => {
    try {
        await client.connect();
        dbConnection = client.db('orders_db');
        console.log('Conected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    }
};

export const getDB = () => {
    if (!dbConnection) {
        throw new Error('Database not initialized!');
    }
    return dbConnection;
};
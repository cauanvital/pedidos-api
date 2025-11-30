import { getDB } from '../config/db.js';

const collection = () => getDB().collection('users');

export const UserModel = {
    create: async (username, passwordHash) => {
        const result = await collection().insertOne({ 
            username, 
            password: passwordHash 
        });
        return result;
    },

    findByUsername: async (username) => {
        return await collection().findOne({ username });
    }
};
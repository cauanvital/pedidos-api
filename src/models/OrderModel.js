import { getDB } from '../config/db.js';

const collection = () => getDB().collection('orders');

export const OrderModel = {
    
    // List all orders
    findAll: async () => {
        return await collection().find().project({ _id: 0 }).toArray();
    },

    // Get order by numeroPedido
    findByNumeroPedido: async (numeroPedido) => {
        return await collection().findOne(
            { numeroPedido: numeroPedido },
            { projection: { _id: 0 } }
        );
    },

    // Insert new order
    create: async (data) => {
        const exists = await collection().findOne({ numeroPedido: data.numeroPedido });
        if (exists) {
            throw new Error(`Pedido ${data.numeroPedido} já existe.`);
        }

        const orderData = {
            numeroPedido: data.numeroPedido,
            valorTotal: data.valorTotal,
            dataCriacao: data.dataCriacao || new Date().toISOString(),
            items: data.items || []
        };

        await collection().insertOne(orderData);
        return orderData;
    },

    // Update by numeroPedido
    update: async (numeroPedido, data) => {
        delete data.numeroPedido; 
        delete data._id;

        const result = await collection().updateOne(
            { numeroPedido: numeroPedido },
            { $set: data }
        );
        return result.matchedCount > 0;
    },

    // Delete by numeroPedido
    delete: async (numeroPedido) => {
        const result = await collection().deleteOne({ numeroPedido: numeroPedido });
        return result.deletedCount > 0;
    }
};
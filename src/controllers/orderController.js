import { OrderModel } from '../models/OrderModel.js';

export const orderController = {

    // POST /order
    createOrder: async (req, res) => {
        try {
            const { numeroPedido, valorTotal, items, dataCriacao } = req.body;

            if (!numeroPedido || !valorTotal || !items) {
                return res.status(400).json({ 
                    error: "Mandatory fields: numeroPedido, valorTotal e items." 
                });
            }

            const newOrder = await OrderModel.create({ 
                numeroPedido, 
                valorTotal, 
                items, 
                dataCriacao 
            });
            
            return res.status(201).json({
                message: "Order created successfully.",
                order: newOrder
            });
        } catch (error) {
            if (error.message.includes('already exists')) {
                return res.status(409).json({ error: error.message }); // 409 Conflict
            }
            return res.status(500).json({ error: "Internal error", details: error.message });
        }
    },

    // GET /order/list
    listOrders: async (req, res) => {
        try {
            const orders = await OrderModel.findAll();
            return res.status(200).json(orders);
        } catch (error) {
            return res.status(500).json({ error: "Failed to list orders." });
        }
    },

    // GET /order/:id
    getOrderById: async (req, res) => {
        try {
            const { id } = req.params;

            const order = await OrderModel.findByNumeroPedido(id);

            if (!order) {
                return res.status(404).json({ error: "Order not found." });
            }

            return res.status(200).json(order);
        } catch (error) {
            return res.status(500).json({ error: "Failed to find order." });
        }
    },

    // PUT /order/:id
    updateOrder: async (req, res) => {
        try {
            const { id } = req.params;
            const updateData = req.body;

            const success = await OrderModel.update(id, updateData);

            if (!success) {
                return res.status(404).json({ error: "Order not found for update." });
            }

            const updatedOrder = await OrderModel.findByNumeroPedido(id);
            return res.status(200).json({
                message: "Order updated.",
                order: updatedOrder
            });
        } catch (error) {
            return res.status(500).json({ error: "Failed to update order." });
        }
    },

    // DELETE /order/:id
    deleteOrder: async (req, res) => {
        try {
            const { id } = req.params;

            const success = await OrderModel.delete(id);

            if (!success) {
                return res.status(404).json({ error: "Order not found for delete." });
            }

            return res.status(200).json({ message: "Order successfully deleted." });
        } catch (error) {
            return res.status(500).json({ error: "Failed to delete order." });
        }
    }

};
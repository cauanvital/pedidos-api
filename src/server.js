import express from 'express';
import { connectDB } from './config/db.js';
import orderRoutes from './routes/orderRoutes.js';

const port = process.env.PORT;
const app = express();

app.use(express.json());

// Rotas
app.use('/order', orderRoutes);

// Inicia conexão com DB e depois o servidor
const startServer = async () => {
    await connectDB();
    
    app.listen(port, () => {
        console.log(`Runing server on http://localhost:${port}`);
    });
};

startServer();
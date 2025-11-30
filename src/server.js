import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { connectDB } from './config/db.js';
import orderRoutes from './routes/orderRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { swaggerSpec } from './config/swagger.js';

const port = process.env.PORT;
const app = express();

app.use(express.json());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/auth', authRoutes);
app.use('/order', orderRoutes);

// Start server connection
const startServer = async () => {
    await connectDB();
    
    app.listen(port, () => {
        console.log(`Runing server on http://localhost:${port}`);
        console.log(`Documentation on http://localhost:${port}/api-docs`);
    });
};

startServer();
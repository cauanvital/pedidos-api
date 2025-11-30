import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Pedidos',
      version: '1.0.0',
      description: 'API para gerenciamento de pedidos',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor Local',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          required: ['username', 'password'],
          properties: {
            username: {
              type: 'string',
              description: 'Nome de usuário',
              example: 'admin',
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'Senha do usuário',
              example: '123456',
            },
          },
        },
        Order: {
          type: 'object',
          required: ['numeroPedido', 'valorTotal', 'items'],
          properties: {
            numeroPedido: {
              type: 'string',
              description: 'Identificador único do pedido',
              example: 'v10089015vdb-01',
            },
            valorTotal: {
              type: 'number',
              description: 'Valor total do pedido',
              example: 10000,
            },
            dataCriacao: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação do pedido (Automático se não enviado)',
              example: '2023-07-19T12:24:11.5299601+00:00',
            },
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  idItem: { type: 'string', example: '2434' },
                  quantidadeItem: { type: 'number', example: 1 },
                  valorItem: { type: 'number', example: 1000 },
                },
              },
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'], 
};

export const swaggerSpec = swaggerJsdoc(options);
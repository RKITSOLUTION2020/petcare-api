import express, { urlencoded } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import petsroute from './routes/pets.routes.js';
import connectDB from './lib/db.js';

const app = express();
const PORT = 8000;
connectDB();

//data understanding middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Pets API',
      version: '1.0.0',
      description: 'API to manage pets',
    },
    servers: [
      {
        url: 'http://localhost:8000',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/pets', petsroute);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
});

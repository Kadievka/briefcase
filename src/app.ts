import bodyParser from 'body-parser';
import express from 'express';
import getLogger from './utils/logger';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { privateUserRouter, publicUserRouter } from './routes/users.route';
import authRoutes from './routes/auth.route';
import { authMiddleware } from './middlewares/auth.middleware';

const log = getLogger('app.js');

/*--- App ---*/
const app = express();
const port = process.env.PORT;

/*--- Swagger ---*/
const swaggerDefinition = {
    basePath: '/',
    host: 'localhost:3000',
    info: {
        description: 'My project briefcase',
        title: 'Briefcase',
        version: '1.0.0',
    },
    openapi: '3.0.3',
    schemes: ['http'],
};
const options = {
    apis: ['./src/docs/**/*.yaml'],
    swaggerDefinition,
};
const swaggerSpec = swaggerJSDoc(options);

// APP
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', authRoutes);

app.use('/users', publicUserRouter);

app.use('/users', authMiddleware, privateUserRouter);

app.get('/', (_req, res) => {
    res.send('Welcome');
});

app.listen(port, () => {
    log.info(() => `Briefcase app listen on port ${port}!`);
});

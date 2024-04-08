require('dotenv').config();

// Swagger imports
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

// APP imports
import express from 'express';
const app = express();
const port = process.env.PORT;

// Swagger
const swaggerDefinition = {
    "openapi": "3.0.3",
    "info": {
        "version": "1.0.0",
        "title": "Briefcase",
        "description": "My project briefcase"
    },
    "schemes": ["http"],
    "host": "localhost:3000",
    "basePath": "/"
};

const options = {
    swaggerDefinition,
    apis: ['./src/docs/**/*.yaml'], // path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

// APP
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/users', require('./routes/users'));

app.get('/', function (req, res) {
    res.send('Welcome');
});

app.listen(port, function () {
    console.log(`Briefcase app listening on port ${port}!`);
});

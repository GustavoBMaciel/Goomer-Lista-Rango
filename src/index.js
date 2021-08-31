const express = require('express');
const swaggerUi = require('swagger-ui-express')
const cors = require('cors');
const path = require('path');

const routes = require('./routes');
const swaggerFile = require('./swagger.json');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor on em 127.0.0.1:${port}`);
});

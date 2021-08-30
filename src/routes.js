const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const RestauranteController = require('./controllers/RestauranteController');

const routes = express.Router();
const upload = multer(uploadConfig);

routes.get('/restaurantes', RestauranteController.index);
routes.get('/restaurantes/:id_Restaurante', RestauranteController.show);
routes.post('/restaurantes', upload.single('file'), RestauranteController.create);
routes.put('/restaurantes/:id_Restaurante', upload.single('file'), RestauranteController.update);
routes.delete('/restaurantes/:id_Restaurante', RestauranteController.delete);


module.exports = routes;

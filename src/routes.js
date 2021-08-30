const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const RestauranteController = require('./controllers/RestauranteController');
const ProdutoController = require('./controllers/ProdutoController');

const routes = express.Router();
const upload = multer(uploadConfig);

//Restaurante
routes.get('/restaurantes', RestauranteController.index);
routes.get('/restaurantes/:id_Restaurante', RestauranteController.show);
routes.post('/restaurantes', upload.single('file'), RestauranteController.create);
routes.put('/restaurantes/:id_Restaurante', upload.single('file'), RestauranteController.update);
routes.delete('/restaurantes/:id_Restaurante', RestauranteController.delete);
//Produto
routes.get('/produtos', ProdutoController.index);
routes.get('/produtos/:id_Produto', ProdutoController.show);
routes.post('/produtos', upload.single('file'), ProdutoController.create);
routes.put('/produtos/:id_Produto', upload.single('file'), ProdutoController.update);
routes.delete('/produtos/:id_Produto', ProdutoController.delete);


module.exports = routes;

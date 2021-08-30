const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const RestauranteController = require('./controllers/RestauranteController');

const routes = express.Router();
const upload = multer(uploadConfig);

routes.post('/restaurantes', upload.single('file'), RestauranteController.create);

module.exports = routes;

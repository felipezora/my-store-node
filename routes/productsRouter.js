// desde este archivo no tenemos acceso a la aplicación, por tanto creamos un router propio
const express = require('express');

const ProductsService = require('./../services/productsService');
const validatorHandler = require('./../middlewares/validatorHandler');
const {createProductSchema, updateProductSchema, getProductSchema} = require('./../schemas/productsSchema');

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

// si esta ruta la declarara debajo del rouder de products/:productId, chocaría pues va a asumir que filter es un id
// recordar regla de oro: todos los endpoints estáticos deben ir declarados antes de los endpoints dinámicos
router.get('/filter', (req, res) => {
  res.send('Yo soy un filtro');
});

router.post('/',
validatorHandler(createProductSchema, 'body'),
async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct);
});

router.patch('/:productId',
validatorHandler(getProductSchema, 'params'), // valida el id
validatorHandler(updateProductSchema, 'body'), // puedo usar tantos middlewares como quiera
async (req, res, next) => {
  try {
  const { productId } = req.params;
  const body = req.body;
  const product = await service.update(productId, body);
  res.json(product);
  } catch (error) {
    next(error); // next es un método reservado para el uso de los middlewares, salió de la nada xd
  }
});

router.delete('/:productId', async (req, res) => {
  const { productId } = req.params;
  const serviceResponse = await ervice.delete(productId);
  res.json(serviceResponse);
});

router.get('/:productId',
validatorHandler(getProductSchema,'params'), // los middlewares de schemas no se ejecutan por defecto, toca correrlos acá en la ruta
async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await service.findOne(productId);
    res.json(product);
  } catch(err){
    next(err); // next es un método reservado para el uso de los middlewares, salió de la nada xd
  }
});

module.exports = router;

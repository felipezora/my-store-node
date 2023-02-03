const Joi = require('joi');

// REGLA DE ORO: EL VALOR DE LOS ATRIBUTOS DEBE LLEVAR EL MISMO NOMBRE DEL PARÁMETRO EN LOS ROUTERS PARA EVITAR CONFLICTOS
// YA LO EXPERIMENTÉ POR CARNE PROPIA QUE EN REQ.PARAMS NO SABÍA A CUAL PROPIEDAD ACCEDER YA QUE TENÍA ID Y NO PRODUCTID

const productId = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required()
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image
});

const getProductSchema = Joi.object({
  productId: productId.required()
});

module.exports = {createProductSchema, updateProductSchema, getProductSchema};

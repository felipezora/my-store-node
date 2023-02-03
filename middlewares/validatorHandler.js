const boom = require('@hapi/boom');

// no lleva el parámetro de error porque no es un middleware de error
function validatorHandler(schema, property){
  // este handler está retornando un middleware (estamos creando un middleware de forma dinámica)
  return (req, res, next) => {
    // dependiendo del tipo de request, la info puede venir en req.body (post), req.params (get), req.query(get), por tanto vamos a tratar de hacerlo dinámico para todas las request
    const data = req[property]; // en property viene especificado si cogeremos del body, del params, del query, etc
    // console.log(data);
    const {error} = schema.validate(data, {abortEarly: false}); // devolverá error como una propiedad, por eso usamos destructuring. El abortEarly para que arroje todos los errores y no el primero que encuentre
    if(error){
      next(boom.badRequest(error));
    }
    next();
  }
}

module.exports = validatorHandler;

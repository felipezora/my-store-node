// middleware de tipo error
function logErrors (err, req, res, next){
  console.error(err);
  next(err);
}

function errorHandler(err, req, res, next){
  res.status(500).json({
    message: err.message,
    stack: err.stack
  });
}

function boomErrorHandler(err, req, res, next){
  if(err.isBoom){ // valida si es un error de tipo boom, el que generamos con el módulo boom
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}

module.exports = {logErrors, errorHandler, boomErrorHandler};

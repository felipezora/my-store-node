const express = require('express');
const routerApi = require('./routes'); // el va a buscar el index.js por defecto dentro de ./routes
const cors = require('cors');

const { logErrors, errorHandler, boomErrorHandler} = require('./middlewares/errorHandler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // middleware que me permite recibir información POST en formato JSON
//app.use(cors()); // da la posibilidad de hacer request a cualquier origen

const whitelist = ['http://localhost:8080','https://myapp.com'];
const options = {
  origin: (origin, callback) => {
    if(whitelist.includes(origin) || !origin){
      callback(null, true); // error null, true acceso permitido
    } else {
      callback(new Error('Acceso no permitido'));
    }
  }
}
app.use(cors(options)); // así solo se da la posibilidad de hacer requests a los orígenes que yo meto en la whitelist

app.get('/', (req, res) => {
  res.send('Hello mi server en express');
});

routerApi(app);

// recordar que los middlewares se deben usar después del routing
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Servidor corriendo en el puerto ' + port);
});

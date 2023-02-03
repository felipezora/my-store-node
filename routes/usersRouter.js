// desde este archivo no tenemos acceso a la aplicación, por tanto creamos un router propio
const express = require('express');
const router = express.Router();

// otro tipo de endpoint usando query parameters los cuales se usan cuando el parámetro no es obligatorio
router.get('/', (req, res) => {
  const {limit, offset} = req.query;
  // si no definen parámetros, limit y offset serán de tipo undefined
  if(limit && offset) {
    res.json({
      limit,
      offset
    });
  } else {
    res.send('No parameters');
  }
});

module.exports = router;

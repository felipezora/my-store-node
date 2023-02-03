// desde este archivo no tenemos acceso a la aplicación, por tanto creamos un router propio
const express = require('express');
const router = express.Router();

router.get('/:categoryId/products/:productId', (req,res) => {
  const {categoryId, productId} = req.params;
  res.json({
    categoryId,
    productId
  });
});

module.exports = router;

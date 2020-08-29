const express = require('express');

const productsRepo = require('../repositiories/products');
const productsTemplate = require('../views/products/index');

const router = express.Router();

router.get('/', async (req, res) => {
  const products = await productsRepo.getAll();
  return res.send(productsTemplate({ products }));
});

module.exports = router;

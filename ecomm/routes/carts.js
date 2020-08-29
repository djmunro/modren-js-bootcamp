const express = require('express');

const cartsRepo = require('../repositiories/carts');
const productsRepo = require('../repositiories/products');
const cartShowTemplate = require('../views/carts/show');

const router = express.Router();

router.post('/cart/products', async (req, res) => {
  let cart;

  if (!req.session.cartId) {
    // We don't have a cart and need to create one
    // and store the card id on req.session.cartId
    cart = await cartsRepo.create({ items: [] });
    req.session.cartId = cart.id;
  } else {
    // We have a cart, let's get it from the repository
    cart = await cartsRepo.getOne(req.session.cartId);
  }

  // Either increment quantity for existing product
  // Or add new product to items array
  const existingItem = cart.items.find((item) => item.id === req.body.productId);
  if (existingItem) {
    // increatment quantity and save cart
    existingItem.quantity += 1;
  } else {
    // add new product id to items array
    cart.items.push({ id: req.body.productId, quantity: 1 });
  }

  await cartsRepo.update(cart.id, {
    items: cart.items,
  });

  return res.redirect('/cart');
});

router.get('/cart', async (req, res) => {
  if (!req.session.cartId) {
    return res.redirect('/');
  }

  const cart = await cartsRepo.getOne(req.session.cartId);

  for (const item of cart.items) {
    const product = await productsRepo.getOne(item.id);

    item.product = product;
  }

  res.send(cartShowTemplate({ items: cart.items }));
});

router.post('/cart/products/delete', async (req, res) => {
  const { itemId } = req.body;
  const cart = await cartsRepo.getOne(req.session.cartId);

  const items = cart.items.filter((item) => item.id !== itemId);
  await cartsRepo.update(req.session.cartId, { items });

  return res.redirect('/cart');
});

module.exports = router;

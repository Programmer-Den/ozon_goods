const express = require('express');
const router  = express.Router();
const Product = require('./product');

router.post('/product/import', async (req, res) => { // Cre | Upd
  if (req.body.id) {
    try {
      const product = await Product.findById(req.body.id);

      product.name   = req.body.name;
      product.weight = req.body.weight;
      product.price  = req.body.price;
      product.vat    = req.body.vat;

      const updatedProduct = await product.save();

      return res.status(200).json({ result: updatedProduct });
    }
    catch {
      return res.status(404).json({
        message: `В БД отсутствует товар с id ${req.body.id}`
      });
    }
  } // это сейчас всё был случай обновления, ниже — кейс создания

  const product = new Product({
    name:   req.body.name,
    weight: req.body.weight,
    price:  req.body.price,
    vat:    req.body.vat
  });

  try {
    const newProduct = await product.save();

    return res.status(201).json({ result: newProduct });
/*
    res.status(201).json({
      result: {
        taskId: Math.floor(Math.random() * 10**10)
      }
    });
*/} catch(err) {
    return res.status(400).json({ message: err.message })
  }
});

router.post('/product/info', (req, res) => { // Read
  let message404 = `В БД отсутствует товар с id ${req.body.id}`;

  return Product.findById(req.body.id)
    .then(product => {
      if (product != null) return res.status(200).json(product);

      throw new Error(message404); // пробросим в довесок к catch
    })
    .catch(err => res.status(404).json({ message: message404 }))
});

router.post('/products/delete', async (req, res) => { // Delete
  try {
    const status = [];

    for (let product of req.body.products) {      
      const foundProduct   = await Product?.findById(product.id);
      const deletedProduct = await foundProduct?.deleteOne();

      if (deletedProduct?.acknowledged === true) { // удалено ли
        status.push({ id: product.id, isDeleted: true });
        
        continue // переходит к след.товару, НЕ выполняя код ниже
      }
      status.push({ id: product.id, isDeleted: false, error:
        'Пожалуйста, по форме введите id сущ. в БД товара'
      });
      res.statusCode = 400;  //  а по умолчанию, если что, 200
    }
    return res.status(res.statusCode).json({ status });
  }
  catch(err) { res.status(400).json({ message: err.message }) }
});

module.exports = router;

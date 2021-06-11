import { Router } from 'express';
import models from '../../db/index.js';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const Product = models.Product;
const Review = models.Review;

const productRoute = Router();
const cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'strive-shop',
  },
});

productRoute.get('/', async (req, res, next) => {
  try {
    const data = await Product.findAll();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});
productRoute.get('/:id', async (req, res, next) => {
  try {
    const data = await Product.findByPk(req.params.id);
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

productRoute.get('/:id/reviews', async (req, res, next) => {
  try {
    const data = await Review.findAll({
      where: { productId: req.params.id },
    });
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});
productRoute.post('/', async (req, res, next) => {
  try {
    const data = await Product.create(req.body);
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

productRoute.post(
  '/:id/upload',
  multer({ storage: cloudinaryStorage }).single('upload'),
  async (req, res, next) => {
    try {
      const productId = req.params.id;
      const newUrl = `${req.file.path}`;
      const productToUpdate = await Product.findByPk(productId);
      const updatedProduct = await Product.update(
        { ...productToUpdate, imageUrl: newUrl },
        {
          where: { id: productId },
          returning: true,
        }
      );

      res.send(updatedProduct);
    } catch (error) {
      console.log(error);
    }
  }
);
productRoute.put('/:id', async (req, res, next) => {
  try {
    const data = await Product.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    res.send(data[1][0]);
  } catch (error) {
    console.log(error);
  }
});
productRoute.delete('/:id', async (req, res, next) => {
  try {
    const row = await Product.destroy({
      where: { id: req.params.id },
    });
    if (row > 0) {
      res.send('Succesfully deleted!');
    } else {
      res.status(404).send('Product with given ID not found');
    }
  } catch (error) {
    console.log(error);
  }
});

export default productRoute;

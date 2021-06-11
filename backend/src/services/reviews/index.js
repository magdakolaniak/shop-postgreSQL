import { Router } from 'express';
import models from '../../db/index.js';

const Review = models.Review;

const reviewRoute = Router();

reviewRoute.get('/', async (req, res, next) => {
  try {
    const data = await Review.findAll();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});
reviewRoute.get('/:id', async (req, res, next) => {
  try {
    const data = await Review.findByPk(req.params.id);
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});
reviewRoute.post('/', async (req, res, next) => {
  try {
    const data = await Review.create(req.body);
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});
reviewRoute.put('/:id', async (req, res, next) => {
  try {
    const data = await Review.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    res.send(data[1][0]);
  } catch (error) {
    console.log(error);
  }
});
reviewRoute.delete('/:id', async (req, res, next) => {
  try {
    const row = await Review.destroy({
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

export default reviewRoute;

import { Router } from 'express';
import { ProductsService } from '../services/products.service.js';
import { validatorHandler } from '../middlewares/validator.handler.js';
import {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} from '../schemas/product.schema.js';

export const router = Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  },
);

router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedProduct = await service.update(id, body);
      res.json(updatedProduct);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedProductId = await service.delete(id);
      res.json({ id: deletedProductId });
    } catch (error) {
      next(error);
    }
  },
);

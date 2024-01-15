import { Router } from 'express';
import { router as productsRouter } from './products.router.js';
import { router as usersRouter } from './users.router.js';
import { router as categoriesRouter } from './categories.router.js';

export function routerApi(app) {
  const router = Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
}

import { Router } from 'express';

export const router = Router();

router.get('/:categoryId/products/:productId', (req, res) => {
  const { category_id, product_id } = req.params;
  res.json();
});

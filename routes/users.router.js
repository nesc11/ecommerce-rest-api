import { Router } from 'express';

export const router = Router();

router.get('/', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({ limit, offset });
  }
  res.json({ message: 'no query params' });
});

import express from 'express';
import { routerApi } from './routes/index.js';
import {
  logErrors,
  errorHandler,
  boomErrorHandler,
} from './middlewares/error.handler.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

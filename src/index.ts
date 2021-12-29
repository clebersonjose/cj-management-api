import express from 'express';
import routes from './routes';
import logger from './helpers/logger';

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(routes);
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  logger.info(`Server is running at http://localhost:${PORT}`);
});

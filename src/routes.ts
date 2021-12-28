import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => res.send('CJ Andrade Management API'));

export default routes;

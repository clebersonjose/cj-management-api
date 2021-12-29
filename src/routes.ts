import { Router } from 'express';
import createUser from './controllers/createUser';

const routes = Router();

routes.get('/', (request, response) => response.send('CJ Andrade Management API'));
routes.post('/create-user', createUser);

export default routes;

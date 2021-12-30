import { Router } from 'express';
import createUser from './controllers/createUser';
import getUserByEmail from './controllers/getUserByEmail';

const routes = Router();

routes.post('/create-user', createUser);
routes.post('/get-user-by-email', getUserByEmail);

export default routes;

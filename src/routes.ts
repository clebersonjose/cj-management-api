import { Router } from 'express';

import authentication from './middlewares/authentication';

import createUser from './controllers/createUser';
import getUserByEmail from './controllers/getUserByEmail';
import userLogin from './controllers/userLogin';
import userLogout from './controllers/userLogout';
import refreshToken from './controllers/refreshToken';

const routes = Router();

routes.post('/create-user', createUser);
routes.post('/get-user-by-email', authentication, getUserByEmail);
routes.post('/login', userLogin);
routes.get('/logout', authentication, userLogout);
routes.post('/refresh-token', refreshToken);

export default routes;

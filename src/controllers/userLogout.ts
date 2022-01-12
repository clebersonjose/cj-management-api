import { Request, Response } from 'express';
import User from '../models/user';

const userLogout = async (request: Request, response: Response): Promise<void> => {
  try {
    const authHeader: any = request.headers.authorization;
    const accessToken: any = authHeader.split(' ')[1];
    User.logout(accessToken);

    response.status(200).json();
  } catch (error: any) {
    response.status(401).send({ 'error': error.message });
  }
};
export default userLogout;
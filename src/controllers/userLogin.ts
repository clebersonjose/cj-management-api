import { Request, Response } from 'express';
import User from '../models/user';

/**
 * @access public
 * @desc Controller for user login.
 * @param  {Request} request The request object.
 * @param {JSON} request.body The request's body.
 * @param {string} request.body.email The user's email.
 * @param {string} request.body.password The user's password.
 * @param  {Response} response The response object.
 * @returns {Promise<void>} Promise that resolves to void.
 */
const userLogin = async (request: Request, response: Response): Promise<void> => {
  try {
    const { email, password }: { email: string, password: string } = request.body;
    const tokens: string = await User.login(email, password);
    const { accessToken, refreshToken }: { accessToken: string, refreshToken: string } = JSON.parse(tokens);

    response.set('Authorization', accessToken);
    response.status(200).json({ refreshToken });
  } catch (error: any) {
    response.status(401).send({ 'error': error.message });
  }
};

export default userLogin;
import { Request, Response } from 'express';
import User from '../models/user';

/**
 * @access public
 * @desc Controller for create a new user.
 * @param  {Request} request The request object.
 * @param  {Response} response The response object.
 * @returns {Promise<void>} Promise that resolves to void.
 */
const createUser = async (request: Request, response: Response): Promise<void> => {
  const { name, email, password }: {name: string, email: string, password: string} = request.body;
  const newUser: string = await User.createUser(name, email, password);

  response.send(newUser);
};

export default createUser;

import { Request, Response } from 'express';
import User from '../models/user';

/**
 * @access public
 * @desc Controller for create a new user.
 * @param {Request} request The request object.
 * @param {Object} request.body The request's body.
 * @param {string} request.body.name The user's name.
 * @param {string} request.body.email The user's email.
 * @param {string} request.body.password The user's password.
 * @param  {Response} response The response object.
 * @returns {Promise<void>} Promise that resolves to void.
 */
const createUser = async (request: Request, response: Response): Promise<void> => {
  try {
    const { name, email, password }: { name: string, email: string, password: string } = request.body;
    const newUser: string = await User.createUser(name, email, password);

    response.status(201).send(newUser);
  } catch (error: any) {
    response.status(400).send({ 'error': error.message });
  }
};

export default createUser;

import { Request, Response } from 'express';
import User from '../models/user';

/**
 * @access public
 * @desc Controller for get a user by email.
 * @param {Request} request The request object.
 * @param {JSON} request.body The request's body.
 * @param {string} request.body.email The user's email.
 * @param  {Response} response The response object.
 * @returns {Promise<void>} Promise that resolves to void.
 */
const getUserByEmail = async (request: Request, response: Response) => {
  try {
    const { email }: {email: string} = request.body;
    const user: string = await User.getUserByEmail(email);

    response.status(200).send(user);
  } catch (error: any) {
    response.status(400).send({'error': error.message});
  }
}

export default getUserByEmail;
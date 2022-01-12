import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import logger from '../helpers/logger';

/**
 * @access public
 * @desc Authenticate user by token.
 * @param  {Request} request The request object.
 * @param {IncomingHttpHeaders} request.headers The request's headers.
 * @param {string} request.headers.authorization The user's token.
 * @param  {Response} response The response object.
 * @param  {NextFunction} next Go to the next function.
 * @returns {void} Promise that resolves to void.
 * @property {string} userId Add the user id to the request's body object.
 * @throws {Error} If the token is invalid.
 */
const authentication = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  try {
    const dataBaseConection = new PrismaClient();
    const authHeader: any = request.headers.authorization;
    const token: any = authHeader.split(' ')[1];
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const verifyToken: any = jwt.verify(token, String(secret));

    const accessTokenIsInBlockList = await dataBaseConection.blockListAccessToken.count({
      where: {
        token: token
      }
    });

    if (accessTokenIsInBlockList > 0) {
      throw new Error('Invalid token');
    }

    request.body.userId = verifyToken.id;
    return next();
  } catch (error: any) {
    logger.error(error.message);
    response.status(401).send({ 'error': error.message });
  }
}

export default authentication;
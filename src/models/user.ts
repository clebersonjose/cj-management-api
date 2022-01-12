import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

import blockListAccessToken from './blockListAccessToken';

import hashPassword from '../services/hashPassword';
import validatePassword from '../services/validatePassword';
import checkIfTheEmailExists from '../services/checkIfTheEmailExists';
import validateEmail from '../services/validateEmail';
import validateName from '../services/validateName';

import logger from '../helpers/logger';

/**
 * @class User
 * @access public
 * @desc Class representing a user.
 */
class User {
  private static dataBaseConection = new PrismaClient();

  /**
   * @access public
   * @desc Create a new user.
   * @param  {string} name The user's full name.
   * @param  {string} email The user's email.
   * @param  {string} password The user's password.   
   * @returns {JSON} Promise that resolves to JSON with user's full name and email.
   * @property {string} name The user's full name.
   * @property {string} email The user's email.   
   * @throws {Error} If the user's email is already in use.
   * @throws {Error} If the database connection or transaction fails.
   */
  public static async createUser(name: string, email: string, password: string): Promise<string> {
    try {
      const validatedName = await validateName(name);
      const validatedEmail = await validateEmail(email);
      const checkIfEmailExists = await checkIfTheEmailExists(validatedEmail, this.dataBaseConection);

      if (checkIfEmailExists !== 0) {
        throw new Error('Email already exists');
      }

      const validatedPassword = await validatePassword(password);
      const hashedPassword = await hashPassword(validatedPassword);


      const user = await this.dataBaseConection.user.create({
        data: {
          name: validatedName,
          email: validatedEmail,
          passwordHash: hashedPassword,
          createdAt: new Date(),
        },
      });

      logger.info(`User ${user.id} has been created`);
      return JSON.stringify({ name: user.name, email: user.email });
    } catch (error: any) {
      logger.error(error.message);
      throw new Error(error.message);
    }
  }

  /**
   * @access public
   * @desc Get user by email.
   * @param  {string} email The user's email.   
   * @returns {JSON} Promise that resolves to JSON with user's id, full name, email and role.
   * @property {number} id The user's id.
   * @property {string} name The user's full name.
   * @property {string} email The user's email.
   * @property {string} role The user's role.   
   * @throws {Error} If the user not found.
   */
  public static async getUserByEmail(email: string): Promise<string> {
    try {
      const validatedEmail = await validateEmail(email);
      const user: any = await this.dataBaseConection.user.findUnique({
        where: {
          email: validatedEmail,
        },
      });

      if (user === null) {
        throw new Error('User not found');
      }

      logger.info(`Get user ${user.id} by email`);
      return JSON.stringify({ id: user.id, name: user.name, email: user.email, role: user.role });
    } catch (error: any) {
      logger.error(error.message);
      throw new Error(error.message);
    }
  }

  public static async login(email: string, password: string): Promise<string> {
    try {
      const validatedEmail = await validateEmail(email);
      const emailExists = await checkIfTheEmailExists(validatedEmail, this.dataBaseConection);

      if (emailExists == 0) {
        throw new Error('User not found');
      }

      const validatedPassword = await validatePassword(password);

      const user: any = await this.dataBaseConection.user.findUnique({
        where: {
          email: validatedEmail,
        }
      });

      const isPasswordValid = await bcrypt.compare(validatedPassword, user.passwordHash);
      if (!isPasswordValid) {
        throw new Error('Password is invalid');
      }

      const payload = { id: user.id };
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const accessToken = jwt.sign(payload, String(secret), { expiresIn: '15m' });
      const refreshToken = crypto.randomBytes(64).toString('hex');

      logger.info(`User ${user.id} login`);
      return JSON.stringify({ accessToken: accessToken, refreshToken: refreshToken });
    } catch (error: any) {
      logger.error(error.message);
      throw new Error(error.message);
    }
  }

  public static async logout(accessToken: string): Promise<boolean> {
    blockListAccessToken.add(accessToken);
    return true;
  }
}

export default User;

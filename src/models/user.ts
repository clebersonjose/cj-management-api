import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import logger from '../helpers/logger';

/**
 * @desc Class representing a user.
 */
class User {
  /**
   * @access public
   * @desc Create a new user.
   * @param  {string} name The user's name.
   * @param  {string} email The user's email.
   * @param  {string} password The user's password.
   * @returns {JSON} Promise that resolves to JSON with user's full name and email.
   */
  static async createUser(name: string, email: string, password: string): Promise<string> {
    try {
      const validateName = await this.validateName(name);
      const validateEmail = await this.validateEmail(email);
      const validatePassword = await this.validatePassword(password);
      const hashedPassword = await this.hashedPassword(validatePassword);

      const prisma = new PrismaClient();
      const user = await prisma.user.create({
        data: {
          name: validateName,
          email: validateEmail,
          password: hashedPassword,
          createdAt: new Date(),
        },
      });

      logger.info(`User ${user.id} has been created`);
      return JSON.stringify({ name: user.name, email: user.email });
    } catch (error: any) {
      logger.error(error.message);
      return JSON.stringify({ error: error.message });
    }
  }

  /**
   * @access private
   * @desc Validate user's full name.
   * @param  {string} name The user's full name.
   * @returns {string} The validated user's full name.
   * @throws {Error} If the user's full name is empty or null.
   * @throws {Error} If the user's full name length is less than 4 characters.
   */
  private static async validateName(name: string): Promise<string> {
    const validateName = String(name);

    if (validateName === '' || validateName === null || validateName === undefined) {
      throw new Error('Name is required');
    }

    if (validateName.length <= 3) {
      throw new Error('Name must be at least 4 characters');
    }

    return validateName;
  }

  /**
   * @access private
   * @desc Validate user's email.
   * @param  {string} email The user's email.
   * @returns {string} The validated user's email.
   * @throws {Error} If the user's email is empty or null.
   * @throws {Error} If the user's email is not a valid email.
   * @throws {Error} If the user's email is already in use.
   */
  private static async validateEmail(email: string): Promise<string> {
    const validateEmail = String(email).toLowerCase();

    if (validateEmail === '' || validateEmail === null || validateEmail === undefined) {
      throw new Error('Email is required');
    }

    const matcher = (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (!validateEmail.match(matcher)) {
      throw new Error('Email format is invalid');
    }

    const prisma = new PrismaClient();
    const findEmail = await prisma.user.findUnique({
      where: {
        email: validateEmail,
      },
    });

    if (findEmail !== null) {
      throw new Error('Email already exists');
    }

    return validateEmail;
  }

  /**
   * @access private
   * @desc Validate user's password.
   * @param  {string} password The user's password.
   * @returns {string} The validated user's password.
   * @throws {Error} If the user's password is empty or null.
   * @throws {Error} If the user's password not contains at least one uppercase letter.
   * @throws {Error} If the user's password not contains at least one lowercase letter.
   * @throws {Error} If the user's password not contains at least one number.
   * @throws {Error} If the user's password not contains at least one special character.
   * @throws {Error} If the user's password not be between 8 and 24 characters.
   */
  private static async validatePassword(password: string): Promise<string> {
    const validatePassword = String(password);

    if (validatePassword === '' || validatePassword === null || validatePassword === undefined) { throw new Error('Password is required'); }

    if (!validatePassword.match(/(?=.*[A-Z])/)) { throw new Error('Password must contain at least one uppercase letter'); }

    if (!validatePassword.match(/^(?=.*[a-z])/)) { throw new Error('Password must contain at least one lowercase letter'); }

    if (!validatePassword.match(/^(?=.*[0-9])/)) { throw new Error('Password must contain at least one number'); }

    if (!validatePassword.match('([`~\\!@#\\$%\\^\\&\\*\\(\\)\\-_\\=\\+\\[\\\\{\\}\\]\\\\\\|;:\\\'",<.>\\/\\?€£¥₹§±].*)')) { throw new Error('Password must contain at least one special character'); }

    if (validatePassword.length < 8 || validatePassword.length > 24) { throw new Error('Password must be between 8 and 24 characters'); }

    return validatePassword;
  }

  /**
   * @access private
   * @desc Hash user's password.
   * @param  {string} password The user's password.
   * @returns {string} The hashed user's password.
   */
  private static async hashedPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  }
}

export default User;
